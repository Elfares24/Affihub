// JavaScript untuk halaman produk
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk filter produk
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (categoryFilter && priceFilter && sortFilter) {
        // Event listener untuk perubahan filter
        categoryFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);
        sortFilter.addEventListener('change', sortProducts);
    }
    
    // Fungsi untuk mencari produk
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchBox && searchButton) {
        searchButton.addEventListener('click', function() {
            searchProducts(searchBox.value);
        });
        
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts(searchBox.value);
            }
        });
    }
    
    // Fungsi untuk filter produk berdasarkan kategori dan harga
    function filterProducts() {
        const category = categoryFilter.value;
        const price = priceFilter.value;
        
        console.log(`Filtering products - Category: ${category}, Price: ${price}`);
        
        // Implementasi nyata akan menggunakan AJAX untuk memfilter produk dari server
        // atau memfilter produk yang sudah ada di halaman
        
        // Contoh simulasi filter
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const cardCategory = card.querySelector('.product-category').textContent.toLowerCase();
            const cardPrice = card.querySelector('.current-price').textContent;
            let showCard = true;
            
            // Filter kategori
            if (category !== 'all' && !cardCategory.includes(category.toLowerCase())) {
                showCard = false;
            }
            
            // Filter harga
            if (price === 'free' && !cardPrice.includes('Gratis')) {
                showCard = false;
            } else if (price === 'paid' && cardPrice.includes('Gratis')) {
                showCard = false;
            }
            
            // Tampilkan atau sembunyikan kartu produk
            card.style.display = showCard ? 'block' : 'none';
        });
    }
    
    // Fungsi untuk mengurutkan produk
    function sortProducts() {
        const sortBy = sortFilter.value;
        console.log(`Sorting products by: ${sortBy}`);
        
        // Implementasi nyata akan menggunakan AJAX untuk mengurutkan produk dari server
        // atau mengurutkan produk yang sudah ada di halaman
        
        // Contoh simulasi pengurutan
        const productGrid = document.querySelector('.product-grid');
        const productCards = Array.from(document.querySelectorAll('.product-card'));
        
        // Urutkan kartu produk berdasarkan kriteria
        productCards.sort((a, b) => {
            if (sortBy === 'price-low') {
                const priceA = extractPrice(a.querySelector('.current-price').textContent);
                const priceB = extractPrice(b.querySelector('.current-price').textContent);
                return priceA - priceB;
            } else if (sortBy === 'price-high') {
                const priceA = extractPrice(a.querySelector('.current-price').textContent);
                const priceB = extractPrice(b.querySelector('.current-price').textContent);
                return priceB - priceA;
            } else if (sortBy === 'rating') {
                const ratingA = parseFloat(a.querySelector('.rating-count').textContent);
                const ratingB = parseFloat(b.querySelector('.rating-count').textContent);
                return ratingB - ratingA;
            }
            
            // Default: sort by popularity or newest
            return 0;
        });
        
        // Hapus semua kartu produk dari grid
        productCards.forEach(card => {
            productGrid.removeChild(card);
        });
        
        // Tambahkan kembali kartu produk yang sudah diurutkan
        productCards.forEach(card => {
            productGrid.appendChild(card);
        });
    }
    
    // Fungsi untuk mencari produk
    function searchProducts(query) {
        console.log(`Searching for: ${query}`);
        
        if (!query.trim()) {
            // Jika query kosong, tampilkan semua produk
            resetSearch();
            return;
        }
        
        // Implementasi nyata akan menggunakan AJAX untuk mencari produk dari server
        // atau mencari produk yang sudah ada di halaman
        
        // Contoh simulasi pencarian
        const productCards = document.querySelectorAll('.product-card');
        const searchTerm = query.toLowerCase();
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDesc = card.querySelector('.product-description').textContent.toLowerCase();
            
            // Cek apakah produk cocok dengan query pencarian
            if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Fungsi untuk reset pencarian
    function resetSearch() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.style.display = 'block';
        });
    }
    
    // Fungsi untuk mengekstrak angka harga dari string
    function extractPrice(priceString) {
        if (priceString.includes('Gratis')) {
            return 0;
        }
        
        // Ekstrak angka dari string harga (misalnya "Rp 1.499.000" menjadi 1499000)
        const matches = priceString.match(/[\d.]+/g);
        if (matches && matches.length > 0) {
            return parseFloat(matches.join('').replace(/\./g, ''));
        }
        
        return 0;
    }
    
    // Fungsi untuk accordion FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
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
        }
    });
    
    // Fungsi untuk animasi smooth scroll
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
    
    // Fungsi untuk tracking klik pada link affiliate
    const affiliateLinks = document.querySelectorAll('.btn-primary[target="_blank"]');
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Dalam implementasi nyata, ini akan melacak klik untuk analitik
            console.log(`Affiliate link clicked: ${this.href}`);
            
            // Contoh kode untuk melacak klik (dalam implementasi nyata akan menggunakan AJAX)
            // trackAffiliateClick(this.href, this.closest('.product-card').querySelector('h3').textContent);
        });
    });
});
