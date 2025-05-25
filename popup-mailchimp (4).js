// Newsletter Popup JavaScript with Mailchimp Integration
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const popupOverlay = document.getElementById('newsletterPopupOverlay');
    const popupCloseBtn = document.getElementById('newsletterPopupClose');
    const popupForm = document.getElementById('mc-embedded-subscribe-form');
    
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
    
    // Handle successful form submission
    window.addEventListener('message', function(event) {
        if (event.data.type === 'mailchimp:subscribe:success') {
            setCookie('newsletter_subscribed', 'true', 30);
            
            // Show success message
            const successMessage = document.getElementById('newsletterSuccess');
            if (successMessage) {
                successMessage.classList.add('active');
                
                // Hide the form
                if (popupForm) {
                    popupForm.style.display = 'none';
                }
                
                // Close popup after 3 seconds
                setTimeout(function() {
                    hidePopup();
                }, 3000);
            }
        }
    });
});
