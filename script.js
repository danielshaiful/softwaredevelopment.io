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
        }

        themeToggleBtn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', htmlElement.classList.contains('dark') ? 'dark' : 'light');
        });
    }

    // ==========================================================================
    // 2. LOGIK MENU NAVIGASI MUDAH ALIH (MOBILE MENU)
    // ==========================================================================
    // Pastikan ID ini sama dengan ID di HTML anda (contoh: 'menuToggleBtn')
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggleBtn && mobileMenu) {
        menuToggleBtn.addEventListener('click', () => {
            // Tukar antara 'none' dan 'flex'
            if (mobileMenu.style.display === 'none' || mobileMenu.style.display === '') {
                mobileMenu.style.display = 'flex';
            } else {
                mobileMenu.style.display = 'none';
            }
        });
    }

    // ==========================================================================
    // 3. LOGIK POPUP DIALOG ARTIKEL BLOG (BLOG MODAL)
    // ==========================================================================
    const articleModal   = document.getElementById('articleModal');
    const closeModalBtn  = document.getElementById('closeModalBtn');
    const modalDate      = document.getElementById('modalDate');
    const modalTitle     = document.getElementById('modalTitle');
    const modalBody      = document.getElementById('modalBody');
    const readButtons    = document.querySelectorAll('.read-post-btn');

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