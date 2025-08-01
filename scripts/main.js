// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lottie Animation for Hero
function initLottieAnimation() {
    const lottieContainer = document.getElementById('lottie-hero');
    if (lottieContainer && typeof lottie !== 'undefined') {
        // Create a simple animated SVG since we can't load external Lottie files
        lottieContainer.innerHTML = `
            <svg width="400" height="300" viewBox="0 0 400 300" class="hero-svg">
                <defs>
                    <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#6366f1"/>
                        <stop offset="100%" style="stop-color:#8b5cf6"/>
                    </linearGradient>
                    <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#10b981"/>
                        <stop offset="100%" style="stop-color:#06b6d4"/>
                    </linearGradient>
                </defs>
                
                <!-- Phone -->
                <rect x="150" y="50" width="100" height="180" rx="15" fill="url(#phoneGradient)" class="phone animate-float">
                    <animate attributeName="y" values="50;45;50" dur="3s" repeatCount="indefinite"/>
                </rect>
                <rect x="160" y="70" width="80" height="120" rx="5" fill="#ffffff"/>
                
                <!-- Credit Card -->
                <rect x="80" y="120" width="120" height="75" rx="8" fill="url(#cardGradient)" class="card animate-slide">
                    <animateTransform attributeName="transform" type="translate" values="0,0;10,0;0,0" dur="4s" repeatCount="indefinite"/>
                </rect>
                <rect x="90" y="130" width="60" height="8" rx="4" fill="#ffffff" opacity="0.8"/>
                <rect x="90" y="145" width="40" height="6" rx="3" fill="#ffffff" opacity="0.6"/>
                
                <!-- Money Transfer Animation -->
                <circle cx="100" cy="100" r="8" fill="#10b981" class="money-dot">
                    <animate attributeName="cx" values="100;300;100" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
                </circle>
                
                <!-- Dollar Signs -->
                <text x="50" y="80" font-family="Arial" font-size="24" fill="#6366f1" opacity="0.7">$</text>
                <text x="320" y="120" font-family="Arial" font-size="24" fill="#8b5cf6" opacity="0.7">$</text>
                <text x="180" y="250" font-family="Arial" font-size="20" fill="#10b981" opacity="0.8">$</text>
                
                <!-- Floating elements -->
                <circle cx="70" cy="180" r="4" fill="#ec4899" opacity="0.6">
                    <animate attributeName="cy" values="180;170;180" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="330" cy="80" r="6" fill="#f59e0b" opacity="0.6">
                    <animate attributeName="cy" values="80;70;80" dur="3.5s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
    }
}

// Initialize hero animation when page loads
document.addEventListener('DOMContentLoaded', initLottieAnimation);

// Floating CTA buttons animation
function animateFloatingCTA() {
    const floatingButtons = document.querySelectorAll('.floating-cta');
    floatingButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize floating CTA animations
document.addEventListener('DOMContentLoaded', animateFloatingCTA);

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progress = progressBar.querySelector('.progress-bar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        progress.style.transform = `scaleX(${scrollPercent / 100})`;
    });
}

// Add scroll progress styles
const progressStyles = `
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    z-index: 9999;
    background: rgba(255, 255, 255, 0.1);
}
.progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.1s ease;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = progressStyles;
document.head.appendChild(styleSheet);

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Intersection Observer for additional animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add stagger animation for feature cards
            if (entry.target.classList.contains('features-grid')) {
                const cards = entry.target.querySelectorAll('.feature-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.6s ease forwards`;
                    }, index * 200);
                });
            }
            
            // Add stagger animation for partner cards
            if (entry.target.classList.contains('partners-grid')) {
                const cards = entry.target.querySelectorAll('.partner-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `zoomIn 0.5s ease forwards`;
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for additional animations
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll('.features-grid, .partners-grid, .steps-container');
    elementsToObserve.forEach(el => observer.observe(el));
});

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation styles
const rippleStyles = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleStyles;
document.head.appendChild(rippleStyleSheet);

// Initialize ripple effect
document.addEventListener('DOMContentLoaded', addRippleEffect);

// Form validation and submission (if needed)
function handleFormSubmission() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            console.log('Form submitted');
        });
    });
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', handleFormSubmission);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
