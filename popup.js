// Newsletter Popup JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const popupOverlay = document.getElementById('newsletterPopupOverlay');
    const popupCloseBtn = document.getElementById('newsletterPopupClose');
    const popupForm = document.getElementById('newsletterPopupForm');
    const successMessage = document.getElementById('newsletterSuccess');
    
    // Show popup after 5 seconds
    setTimeout(function() {
        showPopup();
    }, 5000);
    
    // Show popup when user scrolls to bottom
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            showPopup();
        }
    });
    
    // Close popup when clicking close button
    if (popupCloseBtn) {
        popupCloseBtn.addEventListener('click', function() {
            hidePopup();
            // Set cookie to remember user closed popup
            setCookie('newsletter_popup_closed', 'true', 7);
        });
    }
    
    // Close popup when clicking outside
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                hidePopup();
                setCookie('newsletter_popup_closed', 'true', 7);
            }
        });
    }
    
    // Handle form submission
    if (popupForm) {
        popupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email value
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput ? emailInput.value : '';
            
            // Simple validation
            if (email && isValidEmail(email)) {
                // Here you would normally send the data to your server
                console.log('Newsletter subscription for:', email);
                
                // Show success message
                if (successMessage) {
                    popupForm.classList.add('hidden');
                    successMessage.classList.add('active');
                    
                    // Set cookie to remember user subscribed
                    setCookie('newsletter_subscribed', 'true', 30);
                    
                    // Close popup after 3 seconds
                    setTimeout(function() {
                        hidePopup();
                    }, 3000);
                }
            }
        });
    }
    
    // Helper functions
    function showPopup() {
        // Only show if user hasn't closed it before or already subscribed
        if (!getCookie('newsletter_popup_closed') && !getCookie('newsletter_subscribed')) {
            if (popupOverlay) {
                popupOverlay.classList.add('active');
            }
        }
    }
    
    function hidePopup() {
        if (popupOverlay) {
            popupOverlay.classList.remove('active');
        }
    }
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }
    
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});
