// ========================================
// ILM Possible Education - Enhanced JavaScript
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
        
        // Add animation to body
        document.body.style.transition = 'background-color 0.3s ease';
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
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECTS
// ========================================

let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar?.classList.add('scrolled', 'shadow-xl');
    } else {
        navbar?.classList.remove('scrolled', 'shadow-xl');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar?.style.setProperty('transform', 'translateY(-100%)');
    } else {
        navbar?.style.setProperty('transform', 'translateY(0)');
    }
    
    lastScroll = currentScroll;
});

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
        if (this.menuButton) {
            this.menuButton.addEventListener('click', () => this.open());
        }
        
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.close());
        }
        
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        // Close menu when clicking on a link
        const menuLinks = this.menu?.querySelectorAll('a');
        menuLinks?.forEach(link => {
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

// Initialize Mobile Menu
const mobileMenu = new MobileMenu();

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
        this.init();
    }

    init() {
        // Initial check for elements already in viewport
        this.checkElements();

        // Setup Intersection Observer
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, options);

        this.elements.forEach(el => this.observer.observe(el));
    }

    checkElements() {
        this.elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add('revealed');
            }
        });
    }
    
    refresh() {
        // Re-query elements and observe them
        this.elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
        this.elements.forEach(el => this.observer.observe(el));
        this.checkElements();
    }
}

// Store scroll reveal instance globally
let scrollRevealInstance;

// Initialize Scroll Reveal
document.addEventListener('DOMContentLoaded', () => {
    scrollRevealInstance = new ScrollReveal();
});

// ========================================
// ANIMATED COUNTER
// ========================================

class AnimatedCounter {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
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
        const start = 0;
        const increment = this.target / (this.duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= this.target) {
                this.element.textContent = this.target + (this.element.dataset.suffix || '');
                clearInterval(timer);
            } else {
                this.element.textContent = Math.floor(current) + (this.element.dataset.suffix || '');
            }
        }, 16);
    }
}

// Initialize Counters
document.querySelectorAll('.stat-number').forEach(el => {
    const target = el.textContent.replace(/\D/g, '');
    const suffix = el.textContent.replace(/\d/g, '');
    el.dataset.suffix = suffix;
    new AnimatedCounter(el, target);
});

// ========================================
// FEATURE CARDS ANIMATION
// ========================================

// Feature cards animation - wait for DOM
window.addEventListener('load', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        // Only add scroll-reveal to cards that are below the fold
        const rect = card.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
            card.classList.add('scroll-reveal');
            card.style.transitionDelay = `${index * 0.1}s`;
        } else {
            // Cards already visible - show them with animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
    
    // Refresh scroll reveal to pick up new elements
    if (scrollRevealInstance) {
        setTimeout(() => {
            scrollRevealInstance.refresh();
        }, 100);
    }
});

// ========================================
// PARALLAX EFFECT
// ========================================

class ParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            this.elements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Initialize Parallax
new ParallaxEffect();

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
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        this.container.appendChild(particle);
    }
}

// Initialize Particles
new ParticleBackground();

// ========================================
// CONTACT FORM
// ========================================
// Contact form is handled by EmailJS integration below
// No need for backend API endpoint

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in-right ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    } text-white font-semibold`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// TYPED TEXT EFFECT (for hero section)
// ========================================

class TypedText {
    constructor(element, words, typeSpeed = 100, deleteSpeed = 50, delayBetween = 2000) {
        this.element = element;
        this.words = words;
        this.typeSpeed = typeSpeed;
        this.deleteSpeed = deleteSpeed;
        this.delayBetween = delayBetween;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            this.charIndex--;
        } else {
            this.charIndex++;
        }
        
        this.element.textContent = currentWord.substring(0, this.charIndex);
        
        let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.charIndex === currentWord.length) {
            speed = this.delayBetween;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
        }
        
        setTimeout(() => this.type(), speed);
    }
}

// Initialize typed text if element exists
const typedElement = document.getElementById('typed-text');
if (typedElement) {
    new TypedText(typedElement, ['Education', 'Success', 'Excellence', 'Future']);
}

// ========================================
// LAZY LOADING IMAGES
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// EASTER EGG (Konami Code)
// ========================================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiPattern.length);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        showNotification('🎉 Easter Egg Found! You unlocked premium features!', 'success');
        document.body.style.animation = 'gradientShift 3s ease infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }
});

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

// Skip to main content
document.addEventListener('DOMContentLoaded', () => {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-primary-600';
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// ========================================
// INITIALIZATION COMPLETE
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    initEmailJS();
});

// ========================================
// EMAILJS INTEGRATION
// ========================================

function initEmailJS() {
    // Initialize EmailJS with your public key
    // Get your public key from: https://dashboard.emailjs.com/admin/account
    emailjs.init('usOgKak_u4v48JbBS');
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    const form = e.target;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formMessage.classList.add('hidden');
    
    // Prepare template parameters
    const templateParams = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        school_name: document.getElementById('school_name').value || 'Not specified',
        message: document.getElementById('message').value
    };
    
    // Send email using EmailJS with existing template
    emailjs.send('service_57oukya', 'template_xk0n3bm', templateParams)
        .then((response) => {
            // Show success message
            formMessage.classList.remove('hidden');
            formMessage.className = 'p-4 rounded-lg text-sm font-medium bg-green-50 text-green-800 border border-green-200';
            formMessage.textContent = '✓ Message sent successfully! We\'ll get back to you soon.';
            
            // Reset form
            form.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        })
        .catch((error) => {
            // Show error message
            formMessage.classList.remove('hidden');
            formMessage.className = 'p-4 rounded-lg text-sm font-medium bg-red-50 text-red-800 border border-red-200';
            formMessage.textContent = '✗ Error sending message. Please try again or contact us directly.';
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
}

