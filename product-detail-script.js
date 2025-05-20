// JavaScript untuk halaman detail produk
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk tab produk
    function openTab(evt, tabName) {
        // Sembunyikan semua konten tab
        const tabContents = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove("active");
        }
        
        // Hapus kelas active dari semua tombol tab
        const tabButtons = document.getElementsByClassName("tab-btn");
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove("active");
        }
        
        // Tampilkan tab yang dipilih dan tambahkan kelas active ke tombol
        document.getElementById(tabName).classList.add("active");
        evt.currentTarget.classList.add("active");
    }
    
    // Tambahkan event listener ke tombol tab
    const tabButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].addEventListener("click", function(event) {
            const tabId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            openTab(event, tabId);
        });
    }
    
    // Fungsi untuk mengubah gambar utama saat thumbnail diklik
    window.changeImage = function(element) {
        const mainImage = document.getElementById("mainImage");
        mainImage.src = element.src;
        
        // Hapus kelas active dari semua thumbnail
        const thumbnails = document.getElementsByClassName("thumbnail");
        for (let i = 0; i < thumbnails.length; i++) {
            thumbnails[i].classList.remove("active");
        }
        
        // Tambahkan kelas active ke thumbnail yang dipilih
        element.classList.add("active");
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
    
    // Fungsi untuk countdown timer
    function updateCountdown() {
        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(endDate.getDate() + 2); // 2 hari dari sekarang
        endDate.setHours(endDate.getHours() + 12); // + 12 jam
        endDate.setMinutes(endDate.getMinutes() + 45); // + 45 menit
        
        const diff = endDate - now;
        
        if (diff <= 0) {
            // Penawaran berakhir
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown setiap detik
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Fungsi untuk tombol wishlist
    const wishlistButton = document.querySelector('.btn-wishlist');
    if (wishlistButton) {
        wishlistButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                // Tambahkan ke wishlist
                icon.classList.remove('far');
                icon.classList.add('fas');
                alert('Produk ditambahkan ke wishlist!');
            } else {
                // Hapus dari wishlist
                icon.classList.remove('fas');
                icon.classList.add('far');
                alert('Produk dihapus dari wishlist!');
            }
        });
    }
    
    // Fungsi untuk tombol share
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productUrl = window.location.href;
            const productTitle = document.querySelector('.product-header h1').textContent;
            
            if (this.classList.contains('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`, 'facebook-share', 'width=580,height=296');
            } else if (this.classList.contains('twitter')) {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(productTitle)}&url=${encodeURIComponent(productUrl)}`, 'twitter-share', 'width=550,height=235');
            } else if (this.classList.contains('whatsapp')) {
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(productTitle + ' ' + productUrl)}`, 'whatsapp-share', 'width=580,height=296');
            }
        });
    });
    
    // Fungsi untuk tracking klik pada link affiliate
    const affiliateLinks = document.querySelectorAll('a[target="_blank"]');
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Dalam implementasi nyata, ini akan melacak klik untuk analitik
            console.log(`Affiliate link clicked: ${this.href}`);
            
            // Contoh kode untuk melacak klik (dalam implementasi nyata akan menggunakan AJAX)
            // trackAffiliateClick(this.href, document.querySelector('.product-header h1').textContent);
        });
    });
});
