document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            mobileToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMobileMenu && mobileMenu) {
        closeMobileMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Mobile dropdown toggle
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    if (mobileDropdownToggle) {
        mobileDropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const content = e.currentTarget.nextElementSibling;
            const icon = e.currentTarget.querySelector('.fa-chevron-down, .fa-chevron-up');
            
            content.classList.toggle('active');
            if (icon) {
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            }
        });
    }

    // Desktop dropdown hover with delay
    const dropdown = document.querySelector('.dropdown');
    let dropdownTimeout;
    
    if (dropdown) {
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(dropdownTimeout);
            const menu = dropdown.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.display = 'block';
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            dropdownTimeout = setTimeout(() => {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.display = 'none';
                }
            }, 200);
        });
    }

    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (slides[index]) slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Initialize slider
    if (slides.length > 0) {
        showSlide(0);
        startSlideshow();

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlideshow();
                showSlide(index);
                setTimeout(startSlideshow, 3000); // Restart after 3 seconds
            });
        });

        // Pause on hover
        const sliderContainer = document.querySelector('.fabkart-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlideshow);
            sliderContainer.addEventListener('mouseleave', startSlideshow);
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.step-card, .value-card, .mem-card, .service-card, .six-item, .voice-card'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // FAQ functionality
    const faqCards = document.querySelectorAll('.faq-card');
    
    faqCards.forEach(card => {
        const toggle = card.querySelector('.faq-toggle');
        const head = card.querySelector('.faq-head');
        
        if (toggle && head) {
            head.addEventListener('click', () => {
                const isOpen = card.getAttribute('data-open') === 'true';
                
                // Close all other cards
                faqCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.setAttribute('data-open', 'false');
                        const otherToggle = otherCard.querySelector('.faq-toggle');
                        if (otherToggle) {
                            otherToggle.textContent = '+';
                            otherToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
                
                // Toggle current card
                if (isOpen) {
                    card.setAttribute('data-open', 'false');
                    toggle.textContent = '+';
                    toggle.setAttribute('aria-expanded', 'false');
                } else {
                    card.setAttribute('data-open', 'true');
                    toggle.textContent = '−';
                    toggle.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    // Testimonials reveal animation
    const voiceCards = document.querySelectorAll('.voice-card');
    const voiceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                voiceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    
    voiceCards.forEach(card => voiceObserver.observe(card));

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add loading states for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            img.style.opacity = '0.5';
            console.warn('Failed to load image:', img.src);
        });
    });

    // Keyboard navigation for mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Performance optimization: Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate any layout-dependent elements
            const slider = document.querySelector('.fabkart-slider');
            if (slider && window.innerWidth <= 768) {
                slider.style.height = '45vh';
            } else if (slider) {
                slider.style.height = '70vh';
            }
        }, 250);
    });
});

// Pricing page filter functionality
(function() {
    const grid = document.querySelector('.pricing-grid');
    if (!grid) return;

    const tabs = document.querySelectorAll('.pricing-tabs .chip');
    const cards = grid.querySelectorAll('.price-card');

    function applyFilter(category) {
        cards.forEach(card => {
            const shouldShow = (category === 'all') || card.dataset.cat === category;
            card.style.display = shouldShow ? '' : 'none';
            
            if (shouldShow) {
                card.style.animation = 'slideUp 0.4s ease';
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            applyFilter(tab.dataset.cat);
        });
    });

    // Initialize with 'all' filter
    if (tabs[0]) {
        tabs[0].click();
    }

    // Animate cards on load
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
})();

// Services page filter functionality
(function() {
    const grid = document.querySelector('.services-grid');
    if (!grid) return;

    const chips = document.querySelectorAll('.chip');
    const cards = grid.querySelectorAll('.service-card');
    
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            const category = chip.dataset.filter;
            cards.forEach(card => {
                const shouldShow = category === 'all' || card.dataset.cat === category;
                card.style.display = shouldShow ? '' : 'none';
                
                if (shouldShow) {
                    card.style.animation = 'slideUp 0.4s ease';
                }
            });
        });
    });

    // Animate service cards on scroll
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    const serviceObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                serviceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => serviceObserver.observe(card));
})();

// Form validation and enhancement
(function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    input.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
                } else {
                    input.style.borderColor = var(--light-mint-green);
                    input.style.boxShadow = 'none';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
})();

// Performance monitoring
(function() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        if (loadTime > 3000) {
            console.warn('Page load time is slow:', loadTime + 'ms');
        }
    });
    
    // Monitor scroll performance
    let ticking = false;
    
    function updateScrollElements() {
        // Add any scroll-dependent updates here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    });
})();