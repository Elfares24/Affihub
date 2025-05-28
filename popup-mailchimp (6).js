document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.getElementById('newsletterPopupOverlay');
    const popupCloseButton = document.getElementById('newsletterPopupClose');
    const mailchimpForm = document.getElementById('mc-embedded-subscribe-form');
    const formContainer = document.getElementById('formContainer');
    const successMessage = document.getElementById('newsletterSuccess');

    // --- Configuration ---
    const POPUP_DELAY = 3000; // 3 seconds
    // Note: Showing popup *every* visit is handled by not setting a cookie.

    // Function to show the popup
    function showPopup() {
        if (popupOverlay) {
            popupOverlay.classList.add('active');
            document.body.classList.add('popup-open'); // Optional: Prevent background scroll
        }
    }

    // Function to hide the popup
    function hidePopup() {
        if (popupOverlay) {
            popupOverlay.classList.remove('active');
            document.body.classList.remove('popup-open');
        }
    }

    // Show popup after delay
    setTimeout(showPopup, POPUP_DELAY);

    // Hide popup when close button is clicked
    if (popupCloseButton) {
        popupCloseButton.addEventListener('click', hidePopup);
    }

    // Hide popup when clicking outside the popup content (on the overlay)
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(event) {
            // Check if the click is directly on the overlay, not the popup itself
            if (event.target === popupOverlay) {
                hidePopup();
            }
        });
    }

    // Optional: Handle Mailchimp success message display
    // Mailchimp's mc-validate.js might handle this, but we can add custom logic if needed.
    // This basic example assumes you might want to show a custom success message
    // within the popup after a successful submission *if* Mailchimp doesn't redirect.
    // Mailchimp forms often redirect or show messages within their own structure.
    // We'll monitor the Mailchimp response div for changes.

    const mailchimpResponseDiv = document.getElementById('mce-success-response');

    if (mailchimpForm && mailchimpResponseDiv && formContainer && successMessage) {
        // Use MutationObserver to detect when Mailchimp adds success message
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mailchimpResponseDiv.style.display !== 'none' && mailchimpResponseDiv.innerHTML.trim() !== '') {
                    // Mailchimp success message is visible
                    formContainer.style.display = 'none'; // Hide the form
                    successMessage.style.display = 'block'; // Show our custom success message

                    // Optional: Automatically close popup after a few seconds
                    // setTimeout(hidePopup, 5000); // Close after 5 seconds
                }
            });
        });

        // Configure and start the observer
        const config = { attributes: true, childList: true, characterData: true, subtree: true };
        observer.observe(mailchimpResponseDiv, config);
    }

});

