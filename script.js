// =======================================
// LOADING MANAGER
// =======================================
class LoadingManager {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.init();
    }

    init() {
        // Simulate loading process
        setTimeout(() => {
            this.hideLoading();
        }, 2000);
    }

    hideLoading() {
        this.loadingScreen.style.opacity = '0';
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
        }, 500);
    }
}

// =======================================
// THEME MANAGER
// =======================================
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.htmlElement = document.documentElement;
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.updateToggleIcon();
    }

    setTheme(theme) {
        this.htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateToggleIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateToggleIcon() {
        const icon = this.themeToggle.querySelector('i');
        icon.className = this.currentTheme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
    }
}

// =======================================
// TYPING ANIMATION
// =======================================
class TypingAnimation {
    constructor() {
        this.typingElement = document.querySelector('.typing-text');
        this.words = ['Web Developer', 'Laravel Developer', 'UI/UX Designer', 'Problem Solver'];
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;

        this.init();
    }

    init() {
        setTimeout(() => this.type(), 1000);
    }

    type() {
        const currentWord = this.words[this.wordIndex];

        if (this.isDeleting) {
            this.charIndex--;
            this.typeSpeed = this.deleteSpeed;
        } else {
            this.charIndex++;
            this.typeSpeed = 100;
        }

        this.typingElement.textContent = currentWord.substring(0, this.charIndex);

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            this.typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            this.typeSpeed = 500;
        }

        setTimeout(() => this.type(), this.typeSpeed);
    }
}

// =======================================
// NAVIGATION MANAGER
// =======================================
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.menuToggle.addEventListener('click', this.toggleMenu.bind(this));
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });
    }

    handleScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                this.navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            }
        } else {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                this.navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            }
        }

        this.highlightActiveSection();
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        const icon = this.menuToggle.querySelector('i');
        icon.className = this.navMenu.classList.contains('active') ? 'bx bx-x' : 'bx bx-menu';
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const navbarHeight = this.navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu
            if (window.innerWidth <= 768) {
                this.navMenu.classList.remove('active');
                this.menuToggle.querySelector('i').className = 'bx bx-menu';
            }
        }
    }

    highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
            }
        });
    }
}

// =======================================
// ANIMATION MANAGER
// =======================================
class AnimationManager {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupSkillAnimations();
        this.setupCounterAnimations();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        const animateElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
        animateElements.forEach(el => this.observer.observe(el));
    }

    setupSkillAnimations() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width + '%';
                    }, 300);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        let start = 0;
        const increment = target / (duration / 16);

        const updateCounter = () => {
            start += increment;
            if (start < target) {
                counter.textContent = Math.ceil(start);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    }
}

// =======================================
// CONTACT FORM MANAGER
// =======================================
class ContactFormManager {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', this.handleSubmit.bind(this));
            this.setupFormInteractions();
        }
    }

    setupFormInteractions() {
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        if (this.validateForm(data)) {
            this.showLoading();
            this.submitForm(data);
        }
    }

    validateForm(data) {
        // Simple validation
        if (!data.name || data.name.length < 2) {
            this.showError('Please enter a valid name');
            return false;
        }
        if (!data.email || !this.isValidEmail(data.email)) {
            this.showError('Please enter a valid email');
            return false;
        }
        if (!data.message || data.message.length < 10) {
            this.showError('Please enter a message with at least 10 characters');
            return false;
        }
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(message) {
        // Simple error display - you can enhance this
        alert(message);
    }

    showLoading() {
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        submitButton.disabled = true;

        setTimeout(() => {
            this.showSuccess();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            this.contactForm.reset();
        }, 2000);
    }

    showSuccess() {
        // Simple success message - you can enhance this
        alert('Message sent successfully! I will get back to you soon.');
    }

    submitForm(data) {
        console.log('Form data:', data);
        // Here you would typically send the data to a server
        // fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
    }
}

// =======================================
// INITIALIZATION
// =======================================
document.addEventListener('DOMContentLoaded', function () {
    const loadingManager = new LoadingManager();
    const themeManager = new ThemeManager();
    const typingAnimation = new TypingAnimation();
    const navigationManager = new NavigationManager();
    const animationManager = new AnimationManager();
    const contactFormManager = new ContactFormManager();

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .skill-card, .project-card, .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .skill-card.animate-in, 
        .project-card.animate-in, 
        .contact-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-link.active {
            color: var(--primary-color);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);

    console.log('🚀 Portfolio loaded successfully!');
});

// =======================================
// GLOBAL FUNCTIONS
// =======================================
window.PortfolioApp = {
    version: '1.0.0',
    author: 'Dzaky Perwira Yasig'
};