// Smooth scroll do sekcji galerii
function scrollToSection() {
    const target = document.getElementById('gift');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Funkcja inicjalizująca galerie (REUSABLE)
function initGallery(galleryId) {
    const container = document.getElementById(galleryId);
    if (!container) return;

    // Szukamy slajdów i przycisków wewnątrz kontenera galerii
    const slides = container.querySelectorAll('.mySlides');
    const prev = container.querySelector('.prev');
    const next = container.querySelector('.next');
    
    let slideIndex = 1;

    if (slides.length === 0) return;

    function showSlides(n) {
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;

        // Ukrywamy wszystkie slajdy
        slides.forEach(slide => {
            slide.style.display = "none";
        });

        // Pokazujemy aktywny slajd
        slides[slideIndex - 1].style.display = "flex";
    }

    // Event Listenery dla przycisków
    if (prev) {
        prev.onclick = function() {
            showSlides(slideIndex -= 1);
        };
    }
    if (next) {
        next.onclick = function() {
            showSlides(slideIndex += 1);
        };
    }

    // Inicjalizacja pierwszego slajdu
    showSlides(slideIndex);
}

// Start po załadowaniu DOM
document.addEventListener('DOMContentLoaded', () => {
    // Inicjalizacja AOS (animacje wejścia)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }

    // Obsługa Sticky Headera
    const header = document.querySelector('.sticky-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // URUCHOMIENIE GALERII
    initGallery('gallery');      // Główna galeria
    initGallery('galleryInsta'); // Galeria Insta
});

function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];

    const colors = ['#ff477e', '#5e17eb', '#ffbe0b', '#3a86ff', '#7ae582', '#ffffff'];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height;
            this.size = Math.random() * 7 + 4;
            this.speed = Math.random() * 3 + 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.angle = Math.random() * 360;
            this.spin = Math.random() * 0.2 - 0.1;
        }

        update() {
            this.y += this.speed;
            this.angle += this.spin;
            if (this.y > height) {
                this.y = -20;
                this.x = Math.random() * width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// Wywołaj funkcję po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    initConfetti();
});