// JavaScript untuk halaman detail produk

document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk tab
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus kelas active dari semua tombol dan konten
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Tambahkan kelas active ke tombol yang diklik
            button.classList.add('active');
            
            // Tampilkan konten yang sesuai
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Aktifkan tab pertama secara default
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');
    }
    
    // Highlight halaman aktif di navigasi
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') || 
            (currentPage === '/' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});
