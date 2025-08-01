// GSAP Animations for enhanced interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP ScrollTrigger if available
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        try {
            gsap.registerPlugin(ScrollTrigger);
        } catch (e) {
            console.log('ScrollTrigger not available, using alternative animations');
        }
    }

    // Hero section animations
    function initHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');
        const heroAnimation = document.querySelector('.hero-animation');

        if (typeof gsap !== 'undefined') {
            // GSAP Timeline for hero
            const heroTl = gsap.timeline({ delay: 0.5 });
            
            heroTl
                .from(heroTitle, {
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    ease: "power3.out"
                })
                .from(heroSubtitle, {
                    duration: 0.8,
                    y: 30,
                    opacity: 0,
                    ease: "power3.out"
                }, "-=0.5")
                .from(heroButtons, {
                    duration: 0.6,
                    y: 20,
                    opacity: 0,
                    ease: "back.out(1.7)"
                }, "-=0.3")
                .from(heroAnimation, {
                    duration: 1,
                    x: 100,
                    opacity: 0,
                    ease: "power3.out"
                }, "-=0.8");
        } else {
            // Fallback CSS animations
            setTimeout(() => {
                heroTitle.style.animation = 'fadeInUp 1s ease forwards';
            }, 500);
            setTimeout(() => {
                heroSubtitle.style.animation = 'fadeInUp 0.8s ease forwards';
            }, 700);
            setTimeout(() => {
                heroButtons.style.animation = 'fadeInUp 0.6s ease forwards';
            }, 900);
            setTimeout(() => {
                heroAnimation.style.animation = 'slideInRight 1s ease forwards';
            }, 600);
        }
    }

    // Feature cards stagger animation
    function initFeatureAnimations() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            featureCards.forEach((card, index) => {
                gsap.from(card, {
                    duration: 0.6,
                    y: 50,
                    opacity: 0,
                    ease: "power3.out",
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        } else {
            // Fallback intersection observer
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                        }, index * 200);
                    }
                });
            }, { threshold: 0.1 });

            featureCards.forEach(card => cardObserver.observe(card));
        }
    }

    // Steps animation with enhanced effects
    function initStepsAnimations() {
        const steps = document.querySelectorAll('.step');
        
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            steps.forEach((step, index) => {
                const isEven = index % 2 === 1;
                
                gsap.from(step, {
                    duration: 0.8,
                    x: isEven ? 100 : -100,
                    opacity: 0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: step,
                        start: "top 75%",
                        end: "bottom 25%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Animate step number
                gsap.from(step.querySelector('.step-number'), {
                    duration: 0.6,
                    scale: 0,
                    rotation: 180,
                    ease: "back.out(1.7)",
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: step,
                        start: "top 75%",
                        end: "bottom 25%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        } else {
            // Fallback animation
            const stepObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'slideInLeft 0.8s ease forwards';
                    }
                });
            }, { threshold: 0.3 });

            steps.forEach(step => stepObserver.observe(step));
        }
    }

    // Partners section stagger animation
    function initPartnersAnimations() {
        const partnerCards = document.querySelectorAll('.partner-card');
        
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.from(partnerCards, {
                duration: 0.5,
                scale: 0.8,
                opacity: 0,
                ease: "back.out(1.7)",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.partners-grid',
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        } else {
            // Fallback animation
            const partnersObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.partner-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.animation = 'zoomIn 0.5s ease forwards';
                            }, index * 100);
                        });
                    }
                });
            }, { threshold: 0.2 });

            const partnersGrid = document.querySelector('.partners-grid');
            if (partnersGrid) {
                partnersObserver.observe(partnersGrid);
            }
        }
    }

    // Floating elements animation
    function initFloatingAnimations() {
        const floatingElements = document.querySelectorAll('.floating-cta, .shape');
        
        if (typeof gsap !== 'undefined') {
            floatingElements.forEach((element, index) => {
                gsap.to(element, {
                    y: "random(-20, 20)",
                    x: "random(-10, 10)",
                    rotation: "random(-5, 5)",
                    duration: "random(3, 6)",
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: index * 0.5
                });
            });
        }
    }

    // Text reveal animation
    function initTextAnimations() {
        const sectionTitles = document.querySelectorAll('.section-title');
        const sectionSubtitles = document.querySelectorAll('.section-subtitle');
        
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            [...sectionTitles, ...sectionSubtitles].forEach(element => {
                gsap.from(element, {
                    duration: 0.8,
                    y: 30,
                    opacity: 0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        }
    }

    // Navbar animation on scroll
    function initNavbarAnimations() {
        const navbar = document.querySelector('.navbar');
        let lastScrollY = window.scrollY;
        
        if (typeof gsap !== 'undefined') {
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    // Scrolling down
                    gsap.to(navbar, {
                        duration: 0.3,
                        y: -100,
                        ease: "power3.out"
                    });
                } else {
                    // Scrolling up
                    gsap.to(navbar, {
                        duration: 0.3,
                        y: 0,
                        ease: "power3.out"
                    });
                }
                
                lastScrollY = currentScrollY;
            });
        }
    }

    // Mouse follower effect
    function initMouseFollower() {
        if (typeof gsap !== 'undefined') {
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            cursor.innerHTML = '<div class="cursor-dot"></div>';
            document.body.appendChild(cursor);
            
            const cursorStyles = `
                .custom-cursor {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 20px;
                    height: 20px;
                    z-index: 9999;
                    pointer-events: none;
                    mix-blend-mode: difference;
                }
                .cursor-dot {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: #6366f1;
                    transform: scale(0);
                    transition: transform 0.3s ease;
                }
                @media (max-width: 768px) {
                    .custom-cursor { display: none; }
                }
            `;
            
            const cursorStyleSheet = document.createElement('style');
            cursorStyleSheet.textContent = cursorStyles;
            document.head.appendChild(cursorStyleSheet);
            
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            gsap.to(cursor, {
                duration: 0.3,
                x: () => mouseX - 10,
                y: () => mouseY - 10,
                ease: "power3.out",
                repeat: -1
            });
            
            // Scale cursor on hover
            document.addEventListener('mouseenter', (e) => {
                if (e.target && e.target.matches && e.target.matches('button, a, .feature-card, .partner-card')) {
                    gsap.to('.cursor-dot', {
                        duration: 0.3,
                        scale: 1.5,
                        ease: "back.out(1.7)"
                    });
                }
            });
            
            document.addEventListener('mouseleave', (e) => {
                if (e.target && e.target.matches && e.target.matches('button, a, .feature-card, .partner-card')) {
                    gsap.to('.cursor-dot', {
                        duration: 0.3,
                        scale: 1,
                        ease: "back.out(1.7)"
                    });
                }
            });
        }
    }

    // Parallax effect for background shapes
    function initParallaxEffects() {
        const shapes = document.querySelectorAll('.shape');
        
        if (typeof gsap !== 'undefined') {
            shapes.forEach((shape, index) => {
                gsap.to(shape, {
                    yPercent: -50 * (index + 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: shape,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        }
    }

    // Initialize all animations
    function initAllAnimations() {
        initHeroAnimations();
        initFeatureAnimations();
        initStepsAnimations();
        initPartnersAnimations();
        initFloatingAnimations();
        initTextAnimations();
        initNavbarAnimations();
        initMouseFollower();
        initParallaxEffects();
    }

    // Start animations after a brief delay
    setTimeout(initAllAnimations, 100);
    
    // Refresh animations on window resize
    window.addEventListener('resize', debounce(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 250));
});

// Utility function for debouncing
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

// Performance optimization: Reduce animations on low-end devices
function optimizeForPerformance() {
    const isLowEndDevice = navigator.hardwareConcurrency < 4 || 
                          navigator.deviceMemory < 4 ||
                          window.innerWidth < 768;
    
    if (isLowEndDevice) {
        // Reduce animation complexity
        const reducedMotionStyle = `
            * {
                animation-duration: 0.5s !important;
                transition-duration: 0.3s !important;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = reducedMotionStyle;
        document.head.appendChild(styleSheet);
    }
}

// Initialize performance optimization
document.addEventListener('DOMContentLoaded', optimizeForPerformance);

// Intersection Observer for performance
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    const animatableElements = document.querySelectorAll(
        '.feature-card, .step, .partner-card, .section-title, .section-subtitle'
    );
    animatableElements.forEach(el => animationObserver.observe(el));
});
