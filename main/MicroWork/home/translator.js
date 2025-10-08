document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            // Shared
            'nav-create-resume': 'Create Resume',
            'nav-sign-in': 'Sign In',
            'search-placeholder': 'Type of work, task or payment',
            'search-button': 'Find',
            
            // index.html
            'hero-title': 'Find Your Dream Gig',
            'employee-link': "I'm looking for an employee",

            // search.html
            'filters-title': 'Filters',
            'exclude-label': 'Exclude words',
            'exclude-placeholder': 'e.g., recruiter, agency...',
            'income-label': 'Income Level',
            'income-from-placeholder': 'from',
            'period-label': 'Payment Period',
            'period-option-hour': 'Per hour',
            'period-option-project': 'Per project',
            'period-option-day': 'Per day',
            'experience-label': 'Experience',
            'experience-option-none': 'No experience',
            'experience-option-1-3': '1-3 years',
            'experience-option-3-6': '3-6 years',
            'experience-option-6+': 'More than 6 years',
            'reset-filters-button': 'Reset Filters',
            'found-gigs-text': 'Found',
            'gigs-text': 'gigs',
            'sort-by-label': 'Sort by:',
            'sort-relevance': 'Relevance',
            'sort-date': 'Date',
            'apply-button': 'Apply',
            'pagination-prev': 'Previous',
            'pagination-next': 'Next'
        },
        ru: {
            // Shared
            'nav-create-resume': 'Создать резюме',
            'nav-sign-in': 'Войти',
            'search-placeholder': 'Тип работы, задача, или оплата',
            'search-button': 'Найти',
            
            // index.html
            'hero-title': 'Найди разовую работу по душе',
            'employee-link': 'Я ищу сотрудника',

            // search-result.html
            'filters-title': 'Фильтры',
            'exclude-label': 'Исключить слова',
            'exclude-placeholder': 'например, рекрутер...',
            'income-label': 'Уровень дохода',
            'income-from-placeholder': 'от',
            'period-label': 'Период выплат',
            'period-option-hour': 'За час',
            'period-option-project': 'За проект',
            'period-option-day': 'За день',
            'experience-label': 'Опыт работы',
            'experience-option-none': 'Нет опыта',
            'experience-option-1-3': '1-3 года',
            'experience-option-3-6': '3-6 лет',
            'experience-option-6+': 'Более 6 лет',
            'reset-filters-button': 'Сбросить фильтры',
            'found-gigs-text': 'Найдено',
            'gigs-text': 'вакансий',
            'sort-by-label': 'Сортировать по:',
            'sort-relevance': 'Релевантности',
            'sort-date': 'Дате',
            'apply-button': 'Откликнуться',
            'pagination-prev': 'Назад',
            'pagination-next': 'Вперед'
        },
        kk: {
            // Shared
            'nav-create-resume': 'Түйіндеме жасау',
            'nav-sign-in': 'Кіру',
            'search-placeholder': 'Мамандық, лауазым немесе компания',
            'search-button': 'Іздеу',
            
            // index.html
            'hero-title': 'Армандаған жұмысыңды тап',
            'employee-link': 'Мен қызметкер іздеймін',

            // search.html
            'filters-title': 'Сүзгілер',
            'exclude-label': 'Сөздерді алып тастау',
            'exclude-placeholder': 'мысалы, рекрутер...',
            'income-label': 'Табыс деңгейі',
            'income-from-placeholder': 'бастап',
            'period-label': 'Төлем кезеңі',
            'period-option-hour': 'Сағатына',
            'period-option-project': 'Жоба үшін',
            'period-option-day': 'Күніне',
            'experience-label': 'Жұмыс тәжірибесі',
            'experience-option-none': 'Тәжірибесіз',
            'experience-option-1-3': '1-3 жыл',
            'experience-option-3-6': '3-6 жыл',
            'experience-option-6+': '6 жылдан астам',
            'reset-filters-button': 'Сүзгілерді тазалау',
            'found-gigs-text': 'Табылды',
            'gigs-text': 'бос жұмыс орны',
            'sort-by-label': 'Сұрыптау:',
            'sort-relevance': 'Сәйкестігі',
            'sort-date': 'Күні',
            'apply-button': 'Өтініш беру',
            'pagination-prev': 'Алдыңғы',
            'pagination-next': 'Келесі'
        }
    };

    const setLanguage = (lang) => {
        const t = translations[lang];

        // Function to update text if element exists
        const updateText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };

        // Function to update placeholder if element exists
        const updatePlaceholder = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.placeholder = value;
        };
        
        // Function to update multiple elements with a class
        const updateAllByClass = (className, value) => {
            document.querySelectorAll(`.${className}`).forEach(el => el.textContent = value);
        };

        // Shared elements
        updateText('nav-create-resume', t['nav-create-resume']);
        updateText('nav-sign-in', t['nav-sign-in']);
        updatePlaceholder('search-input', t['search-placeholder']);
        updateText('search-button', t['search-button']);

        // Index page specific
        updateText('hero-title', t['hero-title']);
        updateText('employee-link', t['employee-link']);
        
        // Search page specific
        updateText('filters-title', t['filters-title']);
        updateText('exclude-label', t['exclude-label']);
        updatePlaceholder('exclude', t['exclude-placeholder']);
        updateText('income-label', t['income-label']);
        updatePlaceholder('income-from', t['income-from-placeholder']);
        updateText('period-label', t['period-label']);
        updateText('period-option-hour', t['period-option-hour']);
        updateText('period-option-project', t['period-option-project']);
        updateText('period-option-day', t['period-option-day']);
        updateText('experience-label', t['experience-label']);
        updateText('experience-option-none', t['experience-option-none']);
        updateText('experience-option-1-3', t['experience-option-1-3']);
        updateText('experience-option-3-6', t['experience-option-3-6']);
        updateText('experience-option-6+', t['experience-option-6+']);
        updateText('reset-filters-button', t['reset-filters-button']);
        updateText('sort-by-label', t['sort-by-label']);
        updateText('sort-relevance', t['sort-relevance']);
        updateText('sort-date', t['sort-date']);
        updateText('pagination-prev', t['pagination-prev']);
        updateText('pagination-next', t['pagination-next']);
        updateAllByClass('apply-button', t['apply-button']);
        
        const foundGigsEl = document.getElementById('found-gigs');
        if (foundGigsEl) {
            const count = foundGigsEl.dataset.count;
            foundGigsEl.textContent = `${t['found-gigs-text']} ${count} ${t['gigs-text']}`;
        }

        // Style Adjustment Logic
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            // Reset classes to a known state before applying new ones
            heroTitle.classList.remove('text-4xl', 'md:text-6xl', 'text-3xl', 'md:text-5xl');

            if (lang === 'ru' || lang === 'kk') {
                // Apply smaller font sizes for longer text in Russian and Kazakh
                heroTitle.classList.add('text-3xl', 'md:text-5xl');
            } else {
                // Default font sizes for English
                heroTitle.classList.add('text-4xl', 'md:text-6xl');
            }
        }
        
        // Update language switcher display
        const currentLangSpan = document.getElementById('current-lang');
        if (currentLangSpan) currentLangSpan.textContent = lang.toUpperCase();
        
        const langMenu = document.getElementById('lang-menu');
        if (langMenu) langMenu.classList.add('hidden');

        // Store preference
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang; // Also set on HTML tag
    };

    const langSwitcher = document.getElementById('lang-switcher');
    if (langSwitcher) {
        const langButton = document.getElementById('lang-button');
        const langMenu = document.getElementById('lang-menu');

        langButton.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('hidden');
        });

        langMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.dataset.lang) {
                e.preventDefault();
                setLanguage(e.target.dataset.lang);
            }
        });
    }

    document.addEventListener('click', (e) => {
        const langMenu = document.getElementById('lang-menu');
        if (langSwitcher && langMenu && !langSwitcher.contains(e.target)) {
            langMenu.classList.add('hidden');
        }
    });

    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
});