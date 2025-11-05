// Counter Animation - Optimized for performance
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.counter');
        this.duration = 2000; // 2 seconds - faster
        this.hasAnimated = false;
    }

    init() {
        // Check if counters are in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    this.hasAnimated = true;
                    this.animateCounters();
                    observer.disconnect(); // Stop observing after animation
                }
            });
        }, { threshold: 0.3 });

        const metricsSection = document.querySelector('.influence-metrics');
        if (metricsSection) {
            observer.observe(metricsSection);
        }
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.parentElement.parentElement.dataset.target);
            const startTime = Date.now();
            
            const updateCounter = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / this.duration, 1);
                
                // Easing function
                const easeOutQuad = 1 - Math.pow(1 - progress, 2);
                const current = Math.floor(target * easeOutQuad);
                
                counter.textContent = current.toLocaleString('tr-TR');
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString('tr-TR');
                }
            };

            updateCounter();
        });
    }
}

// Smooth Scroll
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Theme Switcher (Future Enhancement)
class ThemeSwitcher {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
    }

    init() {
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
}

// WebP Support Check
function checkWebPSupport() {
    const webP = new Image();
    webP.onload = webP.onerror = function() {
        const isSupported = webP.height === 2;
        if (isSupported) {
            document.documentElement.classList.add('webp');
        } else {
            document.documentElement.classList.add('no-webp');
        }
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check WebP support
    checkWebPSupport();

    const counter = new CounterAnimation();
    counter.init();

    const smoothScroll = new SmoothScroll();
    smoothScroll.init();

    const theme = new ThemeSwitcher();
    theme.init();
});