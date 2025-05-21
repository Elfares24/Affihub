// JavaScript untuk halaman beranda
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Testimonial Slider Auto-scroll
    const testimonialSlider = document.querySelector('.testimonial-slider');
    let scrollAmount = 0;
    const scrollSpeed = 2;
    let isScrolling = false;
    
    if (testimonialSlider) {
        // Start scrolling when mouse enters
        testimonialSlider.addEventListener('mouseenter', function() {
            isScrolling = true;
            autoScroll();
        });
        
        // Stop scrolling when mouse leaves
        testimonialSlider.addEventListener('mouseleave', function() {
            isScrolling = false;
        });
        
        // Auto scroll function
        function autoScroll() {
            if (!isScrolling) return;
            
            scrollAmount += scrollSpeed;
            testimonialSlider.scrollLeft = scrollAmount;
            
            // Reset scroll when reaching the end
            if (scrollAmount >= testimonialSlider.scrollWidth - testimonialSlider.clientWidth) {
                scrollAmount = 0;
            }
            
            requestAnimationFrame(autoScroll);
        }
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Success message
                alert('Terima kasih telah berlangganan newsletter kami!');
                emailInput.value = '';
            } else {
                // Error message
                alert('Mohon masukkan alamat email yang valid.');
            }
        });
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Countdown Timer for CTA
    const ctaSection = document.querySelector('.cta');
    
    if (ctaSection) {
        // Create countdown element
        const countdownContainer = document.createElement('div');
        countdownContainer.className = 'countdown-container';
        countdownContainer.innerHTML = `
            <p class="countdown-text">Penawaran berakhir dalam:</p>
            <div class="countdown">
                <div class="countdown-item">
                    <span id="countdown-hours">24</span>
                    <span>Jam</span>
                </div>
                <div class="countdown-item">
                    <span id="countdown-minutes">00</span>
                    <span>Menit</span>
                </div>
                <div class="countdown-item">
                    <span id="countdown-seconds">00</span>
                    <span>Detik</span>
                </div>
            </div>
        `;
        
        // Insert countdown before CTA button
        const ctaContent = ctaSection.querySelector('.cta-content');
        const ctaButton = ctaContent.querySelector('.btn-cta');
        ctaContent.insertBefore(countdownContainer, ctaButton);
        
        // Style countdown
        const style = document.createElement('style');
        style.textContent = `
            .countdown-container {
                margin-bottom: 20px;
            }
            .countdown-text {
                font-size: 1rem;
                margin-bottom: 10px;
                opacity: 0.9;
            }
            .countdown {
                display: flex;
                justify-content: center;
                gap: 15px;
            }
            .countdown-item {
                background-color: rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                padding: 10px 15px;
                text-align: center;
                min-width: 80px;
            }
            .countdown-item span:first-child {
                font-size: 1.8rem;
                font-weight: 700;
                display: block;
            }
            .countdown-item span:last-child {
                font-size: 0.8rem;
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
        
        // Countdown timer function
        let hours = 24;
        let minutes = 0;
        let seconds = 0;
        
        function updateCountdown() {
            if (seconds > 0) {
                seconds--;
            } else {
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    if (hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    } else {
                        // Reset countdown when it reaches zero
                        hours = 24;
                        minutes = 0;
                        seconds = 0;
                    }
                }
            }
            
            document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
            
            setTimeout(updateCountdown, 1000);
        }
        
        updateCountdown();
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
