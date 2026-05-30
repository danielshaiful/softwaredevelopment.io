document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. LOGIK MOD GELAP (DARK MODE TOGGLE)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;

    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }

        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
        });
    }

    // ==========================================================================
    // 2. LOGIK MENU NAVIGASI MUDAH ALIH (MOBILE MENU)
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu    = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.style.display === 'flex';
            mobileMenu.style.display = isOpen ? 'none' : 'flex';
            mobileMenuBtn.textContent = isOpen ? 'Menu' : 'Close';
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.display = 'none';
                mobileMenuBtn.textContent = 'Menu';
            });
        });
    }

    // ==========================================================================
    // 3. LOGIK POPUP DIALOG ARTIKEL BLOG (BLOG MODAL)
    // ==========================================================================
    const articleModal   = document.getElementById('articleModal');
    const closeModalBtn  = document.getElementById('closeModalBtn');
    const modalBox       = document.getElementById('modalBox');
    const modalDate      = document.getElementById('modalDate');
    const modalTitle     = document.getElementById('modalTitle');
    const modalBody      = document.getElementById('modalBody');
    const readButtons    = document.querySelectorAll('.read-post-btn');

    // Hanya jalankan logik modal jika semua elemen wujud di halaman ini
    if (articleModal && closeModalBtn && modalDate && modalTitle && modalBody && readButtons.length > 0) {

        // Sembunyikan modal pada mulanya
        articleModal.style.display = 'none';

        // --- Buka Modal ---
        readButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.blog-card');
                if (!card) return;

                const dateEl        = card.querySelector('.post-date');
                const titleEl       = card.querySelector('.post-title');
                const contentEl     = card.querySelector('.full-content');

                if (!dateEl || !titleEl || !contentEl) return;

                modalDate.innerText  = dateEl.innerText;
                modalTitle.innerText = titleEl.innerText;
                modalBody.innerHTML  = contentEl.innerHTML;

                articleModal.style.display  = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        // --- Tutup Modal ---
        const closeModal = () => {
            articleModal.style.display   = 'none';
            document.body.style.overflow = 'auto';
        };

        // Butang X
        closeModalBtn.addEventListener('click', closeModal);

        // Klik pada overlay luar kotak modal
        articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) closeModal();
        });

        // Kekunci Escape pada papan kekunci
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && articleModal.style.display === 'flex') closeModal();
        });
    }

});