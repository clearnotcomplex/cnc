/* ==========================================================================
   Clear, not complex. — Main JavaScript
   ========================================================================== */

(function() {
    'use strict';

    // ==========================================================================
    // Theme Toggle
    // ==========================================================================
    
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    function toggleTheme() {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // ==========================================================================
    // Mobile Navigation
    // ==========================================================================
    
    function initMobileNav() {
        const toggle = document.querySelector('.nav__toggle');
        const menu = document.querySelector('.nav__menu');
        
        if (!toggle || !menu) return;
        
        toggle.addEventListener('click', function() {
            const isOpen = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', isOpen);
            
            // Animate hamburger
            const spans = toggle.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                const spans = toggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }

    // ==========================================================================
    // Scroll-Hide Navigation
    // ==========================================================================
    
    function initScrollNav() {
        const nav = document.querySelector('.nav');
        if (!nav) return;
        
        let lastScroll = 0;
        let ticking = false;
        
        function updateNav() {
            const currentScroll = window.pageYOffset;
            
            // Add shadow when scrolled
            if (currentScroll > 10) {
                nav.classList.add('is-scrolled');
            } else {
                nav.classList.remove('is-scrolled');
            }
            
            // Hide/show on scroll direction
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down & past threshold
                nav.classList.add('is-hidden');
            } else {
                // Scrolling up
                nav.classList.remove('is-hidden');
            }
            
            lastScroll = currentScroll;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateNav);
                ticking = true;
            }
        }, { passive: true });
    }

    // ==========================================================================
    // Reading Progress Indicator
    // ==========================================================================
    
    function initReadingProgress() {
        // Only on article pages
        const article = document.querySelector('.article');
        if (!article) return;
        
        // Create progress bar
        const progress = document.createElement('div');
        progress.className = 'reading-progress';
        document.body.appendChild(progress);
        
        function updateProgress() {
            const articleRect = article.getBoundingClientRect();
            const articleTop = articleRect.top + window.pageYOffset;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrolled = window.pageYOffset;
            
            // Calculate progress through article
            const start = articleTop - windowHeight;
            const end = articleTop + articleHeight - windowHeight;
            const current = scrolled - start;
            const total = end - start;
            
            let percent = (current / total) * 100;
            percent = Math.max(0, Math.min(100, percent));
            
            progress.style.width = percent + '%';
        }
        
        window.addEventListener('scroll', function() {
            requestAnimationFrame(updateProgress);
        }, { passive: true });
        
        updateProgress();
    }

    // ==========================================================================
    // Active Nav Link
    // ==========================================================================
    
    function setActiveNavLink() {
        const path = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav__link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Handle both relative and absolute paths
            if (path.endsWith(href) || path.includes(href.replace('.html', '/'))) {
                link.classList.add('is-active');
            }
        });
    }

    // ==========================================================================
    // Contact Form
    // ==========================================================================
    
    function initContactForm() {
        const form = document.querySelector('.form');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            // Let Netlify handle it if data-netlify is present
            if (form.hasAttribute('data-netlify')) return;
            
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted:', data);
            
            // Show success state
            const btn = form.querySelector('.form__submit');
            const originalText = btn.textContent;
            btn.textContent = 'Message sent!';
            btn.disabled = true;
            
            setTimeout(() => {
                form.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 3000);
        });
    }

    // ==========================================================================
    // Dynamic Year
    // ==========================================================================
    
    function setYear() {
        const yearEl = document.getElementById('year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    // ==========================================================================
    // Smooth Scroll for Anchors
    // ==========================================================================
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ==========================================================================
    // Image Loading
    // ==========================================================================
    
    function initImageLoading() {
        const images = document.querySelectorAll('.card__image img, .article__hero img, .visual-single__image img');
        
        images.forEach(img => {
            // Add loaded class when image loads
            if (img.complete) {
                img.classList.add('is-loaded');
            } else {
                img.addEventListener('load', function() {
                    img.classList.add('is-loaded');
                });
            }
        });
    }

    // ==========================================================================
    // Page Transitions
    // ==========================================================================
    
    function initPageTransitions() {
        // Get all internal links
        const links = document.querySelectorAll('a[href^="/"]:not([target]), a[href^="."]:not([target]), a[href$=".html"]:not([target])');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip external links, anchors, and special links
                if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) {
                    return;
                }
                
                e.preventDefault();
                
                // Add leaving class to trigger exit animation
                document.body.classList.add('is-leaving');
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 200);
            });
        });
    }

    // ==========================================================================
    // Initialize
    // ==========================================================================
    
    function init() {
        // Theme must be initialized before DOM ready
        initTheme();
        
        document.addEventListener('DOMContentLoaded', function() {
            // Bind theme toggle
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', toggleTheme);
            }
            
            initMobileNav();
            initScrollNav();
            initReadingProgress();
            setActiveNavLink();
            initContactForm();
            setYear();
            initSmoothScroll();
            initImageLoading();
            initPageTransitions();
        });
    }

    init();
})();
