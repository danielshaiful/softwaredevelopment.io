document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. LOGIK MOD GELAP (DARK MODE) - Berfungsi untuk Desktop & Mobile
    // ==========================================================================
    const htmlElement = document.documentElement;
    const themeToggleBtns = document.querySelectorAll('#themeToggleBtn, #mobileThemeToggleBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    // Fungsi untuk tukar tema
    const toggleTheme = () => {
        htmlElement.classList.toggle('dark');
        const isDark = htmlElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Auto-tutup menu mobile bila tema ditukar
        if (mobileMenu) mobileMenu.style.display = 'none';
    };

    // Set tema asal semasa halaman dimuatkan
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlElement.classList.add('dark');
    }

    // Pasang listener pada semua butang tema
    themeToggleBtns.forEach(btn => btn.addEventListener('click', toggleTheme));


    // ==========================================================================
    // 2. LOGIK MENU NAVIGASI MUDAH ALIH (MOBILE MENU)
    // ==========================================================================
    const menuToggleBtn = document.getElementById('menuToggleBtn');

    if (menuToggleBtn && mobileMenu) {
        menuToggleBtn.addEventListener('click', () => {
            const isVisible = mobileMenu.style.display === 'flex';
            mobileMenu.style.display = isVisible ? 'none' : 'flex';
        });

        // Auto-tutup menu apabila link ditekan
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.display = 'none';
            });
        });
    }


    // ==========================================================================
    // 3. LOGIK POPUP DIALOG ARTIKEL BLOG (BLOG MODAL)
    // ==========================================================================
    const articleModal  = document.getElementById('articleModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalDate     = document.getElementById('modalDate');
    const modalTitle    = document.getElementById('modalTitle');
    const modalBody     = document.getElementById('modalBody');
    const readButtons   = document.querySelectorAll('.read-post-btn');

    if (articleModal && closeModalBtn && readButtons.length > 0) {
        articleModal.style.display = 'none';

        readButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.blog-card');
                if (!card) return;

                const dateEl    = card.querySelector('.post-date');
                const titleEl   = card.querySelector('.post-title');
                const contentEl = card.querySelector('.full-content');

                if (dateEl && titleEl && contentEl) {
                    modalDate.innerText  = dateEl.innerText;
                    modalTitle.innerText = titleEl.innerText;
                    modalBody.innerHTML  = contentEl.innerHTML;
                    articleModal.style.display   = 'flex';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeModal = () => {
            articleModal.style.display   = 'none';
            document.body.style.overflow = 'auto';
        };

        closeModalBtn.addEventListener('click', closeModal);
        articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && articleModal.style.display === 'flex') closeModal();
        });
    }
});