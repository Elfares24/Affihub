// JavaScript untuk halaman blog
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk filter kategori
    window.filterCategory = function(category) {
        const postCards = document.querySelectorAll('.post-card');
        const categoryTabs = document.querySelectorAll('.category-tab');
        
        // Hapus kelas active dari semua tab
        categoryTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Tambahkan kelas active ke tab yang dipilih
        document.querySelector(`.category-tab[onclick="filterCategory('${category}')"]`).classList.add('active');
        
        // Filter post berdasarkan kategori
        if (category === 'all') {
            postCards.forEach(card => {
                card.style.display = 'block';
            });
        } else {
            postCards.forEach(card => {
                if (card.dataset.category.includes(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    };
    
    // Fungsi untuk form newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Dalam implementasi nyata, ini akan mengirim email ke server
                alert('Terima kasih telah berlangganan newsletter kami!');
                emailInput.value = '';
                
                // Simpan email ke localStorage untuk demo
                const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
                subscribers.push({
                    email: email,
                    date: new Date().toISOString()
                });
                localStorage.setItem('subscribers', JSON.stringify(subscribers));
            }
        });
    }
    
    // Fungsi untuk form pencarian
    const searchForm = document.querySelector('.search-container');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input');
            const searchTerm = searchInput.value.toLowerCase();
            
            if (searchTerm) {
                // Dalam implementasi nyata, ini akan mengarahkan ke halaman hasil pencarian
                alert(`Mencari artikel dengan kata kunci: "${searchTerm}"`);
                
                // Simulasi pencarian sederhana
                const postCards = document.querySelectorAll('.post-card');
                let found = false;
                
                postCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const content = card.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || content.includes(searchTerm)) {
                        card.style.display = 'block';
                        found = true;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                if (!found) {
                    alert('Tidak ada artikel yang sesuai dengan kata kunci Anda.');
                    // Reset tampilan
                    postCards.forEach(card => {
                        card.style.display = 'block';
                    });
                }
            }
        });
    }
    
    // Animasi scroll
    const scrollElements = document.querySelectorAll('.post-card, .featured-post-card');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Inisialisasi animasi saat halaman dimuat
    handleScrollAnimation();
});
