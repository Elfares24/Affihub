// JavaScript untuk halaman ulasan
document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function startCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
        
        // Set target date to 24 hours from now
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 1);
        
        function updateCountdown() {
            const currentDate = new Date();
            const difference = targetDate - currentDate;
            
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
            
            if (difference < 0) {
                clearInterval(interval);
                document.getElementById('countdown').innerHTML = '<p>Penawaran telah berakhir!</p>';
            }
        }
        
        // Update the countdown every second
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
    }
    
    // Category Tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Here you would typically filter the reviews based on the category
                // For demo purposes, we'll just log the category
                console.log('Category selected:', this.textContent.trim());
                
                // You can implement actual filtering logic here
                // For example:
                // const category = this.dataset.category;
                // filterReviewsByCategory(category);
            });
        });
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Initialize countdown
    startCountdown();
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Here you would typically send the email to your server
                // For demo purposes, we'll just show a success message
                alert('Terima kasih telah berlangganan newsletter kami!');
                emailInput.value = '';
            } else {
                alert('Silakan masukkan alamat email yang valid.');
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Smooth scrolling for anchor links
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
    
    // Affiliate link tracking
    const affiliateLinks = document.querySelectorAll('a[data-affiliate="true"]');
    if (affiliateLinks.length > 0) {
        affiliateLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Here you would typically track the click for analytics
                // For demo purposes, we'll just log the product
                const productName = this.dataset.product || 'Unknown Product';
                console.log('Affiliate link clicked:', productName);
                
                // You can implement actual tracking logic here
                // For example:
                // trackAffiliateClick(productName, this.href);
            });
        });
    }
});
