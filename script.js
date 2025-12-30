// ========================================
// ILM Possible Education - Optimized JavaScript
// ========================================

// ========================================
// THEME MANAGEMENT
// ========================================

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.setupToggle();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.theme = theme;
        localStorage.setItem('theme', theme);

        // Update toggle button icon
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    }

    toggle() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    setupToggle() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
    }
}

// Initialize Theme Manager
const themeManager = new ThemeManager();

// ========================================
// NAVBAR SCROLL EFFECTS
// ========================================

const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar?.classList.add('scrolled', 'shadow-xl');
    } else {
        navbar?.classList.remove('scrolled', 'shadow-xl');
    }
}, { passive: true });

// ========================================
// MOBILE MENU
// ========================================

class MobileMenu {
    constructor() {
        this.menuButton = document.getElementById('mobile-menu-button');
        this.menu = document.getElementById('mobile-menu');
        this.overlay = document.getElementById('mobile-menu-overlay');
        this.closeButton = document.getElementById('mobile-menu-close');
        this.init();
    }

    init() {
        this.menuButton?.addEventListener('click', () => this.open());
        this.closeButton?.addEventListener('click', () => this.close());
        this.overlay?.addEventListener('click', () => this.close());

        // Close menu when clicking on a link
        this.menu?.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }

    open() {
        this.menu?.classList.add('active');
        this.overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.menu?.classList.remove('active');
        this.overlay?.classList.remove('active');
        document.body.style.overflow = '';
    }
}

new MobileMenu();

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

class ScrollReveal {
    constructor() {
        this.init();
    }

    init() {
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, options);

        document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
            observer.observe(el);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ScrollReveal();
});

// ========================================
// ANIMATED COUNTER
// ========================================

class AnimatedCounter {
    constructor(element) {
        this.element = element;
        this.target = parseFloat(element.dataset.target);
        this.suffix = element.dataset.suffix || '';
        this.duration = 2000;
        this.hasAnimated = false;
        this.setupObserver();
    }

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.animate();
                    this.hasAnimated = true;
                }
            });
        }, { threshold: 0.5 });
        observer.observe(this.element);
    }

    animate() {
        const startTime = performance.now();
        const startValue = 0;

        const update = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / this.duration, 1);

            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentValue = startValue + (this.target - startValue) * easeProgress;

            if (this.target % 1 === 0) {
                this.element.textContent = Math.floor(currentValue) + this.suffix;
            } else {
                this.element.textContent = currentValue.toFixed(1) + this.suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                this.element.textContent = this.target + this.suffix;
            }
        };

        requestAnimationFrame(update);
    }
}

document.querySelectorAll('.stat-number').forEach(el => {
    new AnimatedCounter(el);
});

// ========================================
// PARTICLE BACKGROUND
// ========================================

class ParticleBackground {
    constructor() {
        this.container = document.getElementById('particles-container');
        if (!this.container) return;
        this.particleCount = window.innerWidth < 768 ? 20 : 50;
        this.init();
    }

    init() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            fragment.appendChild(particle);
        }
        this.container.appendChild(fragment);
    }
}

new ParticleBackground();

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    notification.className = `fixed top-20 right-4 px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in-right ${bgClass} text-white font-semibold`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// EMAILJS INTEGRATION
// ========================================

function initEmailJS() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    if (window.emailjs) {
        emailjs.init('usOgKak_u4v48JbBS');
    }
}

function handleContactForm(e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    const form = e.target;

    if (!window.emailjs) {
        showNotification('Message service unavailable. Please try again later.', 'error');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        school_name: document.getElementById('school_name').value || 'Not specified',
        message: document.getElementById('message').value
    };

    emailjs.send('service_57oukya', 'template_xk0n3bm', params)
        .then(() => {
            formMessage.classList.remove('hidden');
            formMessage.className = 'p-4 rounded-lg text-sm font-medium bg-green-50 text-green-800 border border-green-200';
            formMessage.textContent = '✓ Message sent successfully!';
            form.reset();
            setTimeout(() => formMessage.classList.add('hidden'), 5000);
        })
        .catch((err) => {
            console.error('EmailJS error:', err);
            showNotification('Error sending message. Please try again.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
}

// ========================================
// INITIALIZATION
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    initEmailJS();
});

// Konami Code Easter Egg
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    if (konamiCode.join('') === konamiPattern.join('')) {
        showNotification('🎉 Easter Egg Found! Premium active!', 'success');
        document.body.style.animation = 'gradientShift 3s ease infinite';
    }
});


