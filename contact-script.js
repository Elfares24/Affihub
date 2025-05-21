// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission (in a real implementation, this would send data to a server)
            setTimeout(function() {
                contactForm.style.display = 'none';
                formSuccess.classList.remove('hidden');
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds and show form again
                setTimeout(function() {
                    formSuccess.classList.add('hidden');
                    contactForm.style.display = 'block';
                }, 5000);
            }, 1000);
        });
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Activate first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    // Live chat functionality
    const openChatBtn = document.getElementById('openChat');
    const closeChatBtn = document.getElementById('closeChat');
    const chatContainer = document.getElementById('chatContainer');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    
    if (openChatBtn && closeChatBtn && chatContainer) {
        // Open chat
        openChatBtn.addEventListener('click', function() {
            chatContainer.style.display = 'block';
            openChatBtn.style.display = 'none';
        });
        
        // Close chat
        closeChatBtn.addEventListener('click', function() {
            chatContainer.style.display = 'none';
            openChatBtn.style.display = 'flex';
        });
        
        // Send message
        function sendMessage() {
            const message = chatInput.value.trim();
            
            if (message !== '') {
                // Add user message
                const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const messageHTML = `
                    <div class="message sent">
                        <p>${message}</p>
                        <span class="time">${currentTime}</span>
                    </div>
                `;
                
                chatMessages.innerHTML += messageHTML;
                chatInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate response after 1 second
                setTimeout(function() {
                    const responseHTML = `
                        <div class="message received">
                            <p>Terima kasih atas pesan Anda. Tim kami akan segera menghubungi Anda.</p>
                            <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                    `;
                    
                    chatMessages.innerHTML += responseHTML;
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }
        
        sendMessageBtn.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Newsletter subscription
    const subscribeBtn = document.getElementById('subscribeNewsletter');
    const newsletterEmail = document.getElementById('newsletterEmail');
    
    if (subscribeBtn && newsletterEmail) {
        subscribeBtn.addEventListener('click', function() {
            const email = newsletterEmail.value.trim();
            
            if (email !== '' && isValidEmail(email)) {
                alert('Terima kasih telah berlangganan newsletter kami!');
                newsletterEmail.value = '';
            } else {
                alert('Silakan masukkan alamat email yang valid.');
            }
        });
    }
    
    // Callback request
    const requestCallbackBtn = document.getElementById('requestCallback');
    const callbackPhone = document.getElementById('callbackPhone');
    
    if (requestCallbackBtn && callbackPhone) {
        requestCallbackBtn.addEventListener('click', function() {
            const phone = callbackPhone.value.trim();
            
            if (phone !== '' && isValidPhone(phone)) {
                alert('Permintaan panggilan balik Anda telah diterima. Tim kami akan menghubungi Anda segera.');
                callbackPhone.value = '';
            } else {
                alert('Silakan masukkan nomor telepon yang valid.');
            }
        });
    }
    
    // Helper functions
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function isValidPhone(phone) {
        const regex = /^[0-9+\-\s]{10,15}$/;
        return regex.test(phone);
    }
});
