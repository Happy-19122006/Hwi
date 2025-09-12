// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        // Add smooth animation delay
        setTimeout(() => {
            navMenu.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        }, 10);
    } else {
        document.body.style.overflow = '';
        navMenu.style.transition = 'left 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, visibility 0.3s ease';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}));

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(255, 0, 51, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations - IMPROVED to prevent overlap
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            // Ensure proper z-index to prevent overlap
            entry.target.style.zIndex = '10';
        } else {
            // Reset z-index when not visible
            entry.target.style.zIndex = '';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.detail-card, .rule-item, .section-title');
    animateElements.forEach(el => observer.observe(el));
});

// Parallax effect for hero section - DISABLED to prevent overlap
// window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroLogo = document.querySelector('.hero-logo');
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroLogo) {
        const originalLogoText = heroLogo.textContent;
        setTimeout(() => {
            typeWriter(heroLogo, originalLogoText, 100);
        }, 500);
    }
    
    if (heroTitle) {
        const originalTitleText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalTitleText, 120);
        }, 1500);
    }
});

// Button hover effects
document.querySelectorAll('.cta-button, .register-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// CTA button functionality
document.querySelector('.cta-button').addEventListener('click', function() {
    // Add a pulse effect
    this.style.animation = 'pulse 0.6s ease-in-out';
    
    // Scroll to registration section
    setTimeout(() => {
        document.querySelector('#register').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        this.style.animation = '';
    }, 600);
});

// Card hover effects with glow
document.querySelectorAll('.detail-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 40px rgba(255, 0, 51, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 30px rgba(255, 0, 51, 0.3)';
    });
});

// Registration button functionality
document.querySelector('.register-button').addEventListener('click', function() {
    // Add a pulse effect
    this.style.animation = 'pulse 0.6s ease-in-out';
    
    // Show registration modal or redirect (placeholder)
    setTimeout(() => {
        alert('Registration will open soon! Stay tuned for updates.');
        this.style.animation = '';
    }, 600);
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

// Observe counter elements
document.querySelectorAll('.detail-value').forEach(counter => {
    if (!isNaN(parseInt(counter.textContent))) {
        counterObserver.observe(counter);
    }
});

// Glitch effect for title
function addGlitchEffect(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    setInterval(() => {
        if (Math.random() < 0.1) {
            let glitchText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.1) {
                    glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchText += originalText[i];
                }
            }
            element.textContent = glitchText;
            
            setTimeout(() => {
                element.textContent = originalText;
            }, 100);
        }
    }, 2000);
}

// Apply glitch effect to main logo
document.addEventListener('DOMContentLoaded', () => {
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) {
        setTimeout(() => {
            addGlitchEffect(heroLogo);
        }, 4000);
    }
});

// Particle effect background
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 0, 51, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particleContainer.appendChild(particle);
    }
}

// Add floating animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(floatStyle);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Form validation (if registration form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollButton.className = 'scroll-to-top';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-red);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(255, 0, 51, 0.3);
`;

document.body.appendChild(scrollButton);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.transform = 'translateY(0)';
    } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.transform = 'translateY(20px)';
    }
});

scrollButton.addEventListener('click', scrollToTop);

// Loading screen (optional)
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--dark-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const loaderText = document.createElement('div');
    loaderText.textContent = 'ENTERING THE UPSIDE DOWN...';
    loaderText.style.cssText = `
        font-family: 'Orbitron', monospace;
        font-size: 1.5rem;
        color: var(--primary-red);
        text-shadow: 0 0 10px var(--primary-red);
        animation: pulse 1s infinite;
    `;
    
    loader.appendChild(loaderText);
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 2000);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Space to scroll down
    if (e.key === ' ' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        window.scrollBy(0, window.innerHeight);
    }
});

// Mobile-specific improvements
function isMobile() {
    return window.innerWidth <= 768;
}

// Disable parallax completely to prevent overlap issues
// window.addEventListener('scroll', () => {
//     if (!isMobile()) {
//         const scrolled = window.pageYOffset;
//         const hero = document.querySelector('.hero');
//         if (hero) {
//             hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//         }
//     }
// });

// Improve touch interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add touch-friendly classes
    if (isMobile()) {
        document.body.classList.add('mobile-device');
    }
    
    // Improve button interactions on mobile
    document.querySelectorAll('.cta-button, .register-button').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Your scroll handling code here
}, 16)); // ~60fps
