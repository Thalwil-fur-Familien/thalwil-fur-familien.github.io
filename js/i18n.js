document.addEventListener('DOMContentLoaded', () => {
    const defaultLang = 'de';
    const supportedLangs = ['de', 'en'];

    // 1. Detect Language
    function getInitialLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && supportedLangs.includes(savedLang)) {
            return savedLang;
        }
        const browserLang = navigator.language.slice(0, 2);
        return supportedLangs.includes(browserLang) ? browserLang : defaultLang;
    }

    let currentLang = getInitialLanguage();

    // 2. Update Content
    function updateContent(lang) {
        document.documentElement.lang = lang;

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Handle inputs/placeholders if necessary, but mostly textContent
                element.textContent = translations[lang][key];
            }
        });

        // Update active state of language switcher if it exists
        document.querySelectorAll('.lang-switch').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
            // Optional: Visual style for active state (e.g., bold or different color)
            if (btn.dataset.lang === lang) {
                btn.style.fontWeight = 'bold';
                btn.style.opacity = '1';
            } else {
                btn.style.fontWeight = 'normal';
                btn.style.opacity = '0.7';
            }
        });
    }

    // 3. Switch Language Function
    window.switchLanguage = function (lang) {
        if (!supportedLangs.includes(lang)) return;
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        updateContent(lang);
    };

    // Initialize
    updateContent(currentLang);
});
