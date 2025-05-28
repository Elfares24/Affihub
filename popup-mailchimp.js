document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const popupOverlay = document.getElementById('newsletterPopupOverlay');
    const popupCloseBtn = document.getElementById('newsletterPopupClose');
    const popupForm = document.getElementById('mc-embedded-subscribe-form');
    const formContainer = document.getElementById('formContainer');
    const successMessage = document.getElementById('newsletterSuccess');

    let popupShown = false; // Flag to track if popup logic has run
    let scrollTimeout; // Timeout variable for debounce

    // --- Helper Functions ---
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

    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }

    function showPopup() {
        // Only run logic if it hasn't run before
        if (popupShown) return;

        // Check cookies
        if (!getCookie('newsletter_popup_closed') && !getCookie('newsletter_subscribed')) {
            if (popupOverlay) {
                popupOverlay.classList.add('active');
                popupShown = true; // Set flag: popup logic has run
            }
        } else {
             // If cookies prevent showing, still mark as shown to prevent future checks
             popupShown = true;
        }
    }

    function hidePopup() {
        if (popupOverlay) {
            popupOverlay.classList.remove('active');
        }
    }

    // --- Event Listeners & Triggers ---

    // Trigger 1: Show popup after 5 seconds
    setTimeout(showPopup, 5000);

    // Trigger 2: Show popup when user scrolls near bottom (debounced)
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            // Check if near bottom and popup logic hasn't run yet
            if (!popupShown && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
                showPopup();
            }
        }, 250); // Debounce delay: 250ms
    });

    // Close popup when clicking close button
    if (popupCloseBtn) {
        popupCloseBtn.addEventListener('click', function() {
            hidePopup();
            setCookie('newsletter_popup_closed', 'true', 7);
            popupShown = true; // Mark as shown/interacted to prevent re-triggering
        });
    }

    // Close popup when clicking outside
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                hidePopup();
                setCookie('newsletter_popup_closed', 'true', 7);
                popupShown = true; // Mark as shown/interacted to prevent re-triggering
            }
        });
    }

    // Handle form submission
    if (popupForm) {
        popupForm.addEventListener('submit', function(e) {
            // Set cookie to remember user subscribed
            setCookie('newsletter_subscribed', 'true', 30);
            popupShown = true; // Mark as shown/interacted

            // Hide form and show success message after a short delay
            setTimeout(function() {
                if (formContainer) formContainer.classList.add('hidden');
                if (successMessage) successMessage.classList.add('active');

                // Close popup after 3 seconds
                setTimeout(function() {
                    hidePopup();
                    // Reset form state for potential future logic (though cookie prevents showing)
                    setTimeout(function() {
                        if (formContainer) formContainer.classList.remove('hidden');
                        if (successMessage) successMessage.classList.remove('active');
                    }, 1000);
                }, 3000);
            }, 1000);
        });
    }
});
