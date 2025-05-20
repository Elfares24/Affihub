// JavaScript untuk halaman kontak
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk menangani form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validasi form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Mohon lengkapi semua field yang wajib diisi.');
                return;
            }
            
            // Simulasi pengiriman form (dalam implementasi nyata, ini akan mengirim data ke server)
            alert('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi Anda segera.');
            contactForm.reset();
        });
    }
    
    // Fungsi untuk accordion FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', function() {
            // Toggle active class
            const isActive = item.classList.contains('active');
            
            // Tutup semua accordion item terlebih dahulu
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
            });
            
            // Buka item yang diklik jika sebelumnya belum active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Animasi smooth scroll untuk link internal
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validasi real-time
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateInput(this);
            }
        });
    });
    
    function validateInput(input) {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('invalid');
            input.classList.remove('valid');
        } else if (input.type === 'email' && input.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                input.classList.add('invalid');
                input.classList.remove('valid');
            } else {
                input.classList.add('valid');
                input.classList.remove('invalid');
            }
        } else {
            input.classList.add('valid');
            input.classList.remove('invalid');
        }
    }
    
    // Tambahkan style untuk validasi
    const style = document.createElement('style');
    style.textContent = `
        input.invalid, textarea.invalid {
            border-color: #e74c3c !important;
        }
        input.valid, textarea.valid {
            border-color: #2ecc71 !important;
        }
    `;
    document.head.appendChild(style);
});
