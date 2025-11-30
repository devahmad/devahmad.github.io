// Language Switching Functionality
let currentLang = 'fa';
const languages = ['fa', 'ar', 'en'];
const langNames = {
    'fa': 'فارسی',
    'ar': 'العربية', 
    'en': 'English'
};

function getNextLanguage() {
    const currentIndex = languages.indexOf(currentLang);
    return languages[(currentIndex + 1) % languages.length];
}

function renderLanguage() {
    const body = document.body;
    const langText = document.getElementById('langText');
    const langTextMobile = document.getElementById('langTextMobile');

    body.setAttribute('lang', currentLang);
    body.dir = (currentLang === 'fa' || currentLang === 'ar') ? 'rtl' : 'ltr';

    const nextLangName = langNames[getNextLanguage()];
    if (langText) langText.textContent = nextLangName;
    if (langTextMobile) langTextMobile.textContent = nextLangName;

    const title = document.querySelector('title');
    if (title) {
        if (currentLang === 'en') {
            title.textContent = 'Ahmad Fazeli - Business Developer & Programmer';
        } else if (currentLang === 'ar') {
            title.textContent = 'أحمد فاضلي - مطور أعمال ومبرمج';
        } else {
            title.textContent = 'احمد فاضلی - توسعه دهنده کسب و کار و برنامه نویس';
        }
    }

    const translatableElements = document.querySelectorAll('[data-fa][data-en][data-ar]');
    translatableElements.forEach(element => {
        const newText = element.getAttribute(`data-${currentLang}`);
        if (newText) {
            element.style.opacity = '0';
            setTimeout(() => {
                element.textContent = newText;
                element.style.opacity = '1';
            }, 120);
        }
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        if (currentLang === 'en') {
            metaDescription.content = 'Ahmad Fazeli - Business Developer & Programmer with international project experience in web development, blockchain, and system analysis.';
        } else if (currentLang === 'ar') {
            metaDescription.content = 'أحمد فاضلي - مطور أعمال ومبرمج ذو خبرة في المشاريع الدولية في تطوير الويب، البلوكشين وتحليل النظم.';
        } else {
            metaDescription.content = 'احمد فاضلی - توسعه دهنده کسب و کار و برنامه نویس با تجربه در پروژه‌های بین‌المللی در توسعه وب، بلاکچین و تحلیل سیستم.';
        }
    }

    localStorage.setItem('preferredLanguage', currentLang);
}

function switchLanguage() {
    currentLang = getNextLanguage();
    renderLanguage();
}

// Initialize language switcher
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('langToggle');
    const langToggleMobile = document.getElementById('langToggleMobile');
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get('lang');
    if (paramLang && languages.includes(paramLang)) {
        currentLang = paramLang;
        try { localStorage.setItem('preferredLanguage', currentLang); } catch {}
    } else {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            currentLang = savedLang;
        }
    }
    renderLanguage();
    
    // Add click event listener
    if (langToggle) langToggle.addEventListener('click', switchLanguage);
    if (langToggleMobile) langToggleMobile.addEventListener('click', switchLanguage);
    
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                if (entry.target.id) {
                    const navLinks = document.querySelectorAll('.side-nav .nav-link, .mobile-nav .nav-link');
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        link.classList.toggle('active', href === `#${entry.target.id}`);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    const aboutEl = document.getElementById('about');
    if (aboutEl) {
        aboutEl.style.opacity = '0';
        aboutEl.style.transform = 'translateY(30px)';
        aboutEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(aboutEl);
    }
    
    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to portfolio links
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a subtle animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Add typing effect to profile title
    const profileTitle = document.querySelector('.profile-title');
    if (profileTitle) {
        const originalText = profileTitle.textContent;
        profileTitle.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < originalText.length) {
                profileTitle.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 50);
    }
    
    // Add dynamic background effect
    const profileSection = document.querySelector('.profile-section');
    if (profileSection) {
        profileSection.addEventListener('mousemove', (e) => {
            const rect = profileSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            let rotateX = (y - centerY) / 1000;
            let rotateY = (centerX - x) / 1000;
            rotateX = Math.max(-0.1, Math.min(0.1, rotateX));
            rotateY = Math.max(-0.1, Math.min(0.1, rotateY));
            profileSection.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        profileSection.addEventListener('mouseleave', () => {
            profileSection.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }
    const printNav = document.getElementById('printNav');
    const printNavMobile = document.getElementById('printNavMobile');
    const downloadBtn = document.getElementById('downloadCV') || document.querySelector('.cta-btn.primary');
    const handlePrint = (e) => { e.preventDefault(); printResume(); };
    if (printNav) printNav.addEventListener('click', handlePrint);
    if (printNavMobile) printNavMobile.addEventListener('click', handlePrint);
    if (downloadBtn) downloadBtn.addEventListener('click', handlePrint);
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Alt + L to switch language
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        switchLanguage();
    }
});

// Add print functionality
function printResume() {
    window.print();
}

// Add a print button functionality (can be called from anywhere)
function addPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '<i class="fas fa-print"></i> چاپ رزومه';
    printBtn.className = 'print-btn';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    printBtn.addEventListener('click', printResume);
    printBtn.addEventListener('mouseenter', () => {
        printBtn.style.transform = 'translateY(-2px)';
    });
    printBtn.addEventListener('mouseleave', () => {
        printBtn.style.transform = 'translateY(0)';
    });
    
    document.body.appendChild(printBtn);
}

// Add print styles
const printStyles = `
    @page { size: A4; margin: 12mm; }
    @media print {
        .language-switcher, .print-btn, .social-links { display: none !important; }
        body { background: white !important; color: black !important; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        .container { box-shadow: none !important; margin: 0 !important; padding: 20px !important; background: white !important; overflow: visible !important; }
        .profile-section { background: #f5f5f5 !important; color: black !important; -webkit-print-color-adjust: exact; }
        .skill-tag { background: #e0e0e0 !important; color: black !important; border: 1px solid #ccc; }
        a { color: black !important; text-decoration: none !important; }
        .timeline-marker { background: #666 !important; -webkit-print-color-adjust: exact; }
        .certificate-icon { background: #666 !important; -webkit-print-color-adjust: exact; }
        section, .timeline-item, .certificate-item, .skill-category, .brand-item, .portfolio-item { break-inside: avoid; page-break-inside: avoid; opacity: 1 !important; transform: none !important; }
    }
`;

// Add print styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = printStyles;
document.head.appendChild(styleSheet);

// Initialize print button after DOM loads (removed floating button)

// Service Worker Registration for offline functionality and caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Performance monitoring
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
            if (entry.entryType === 'first-input-delay') {
                console.log('FID:', entry.processingStart - entry.startTime);
            }
        }
    });
    perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'first-input-delay'] });

    // CLS Monitoring
    let clsValue = 0;
    let clsEntries = [];
    
    const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
                clsEntries.push(entry);
                clsValue += entry.value;
                console.log('CLS:', clsValue.toFixed(4), 'Shift detected:', entry.sources);
            }
        }
    });
    
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    
    // Report CLS on page unload
    window.addEventListener('beforeunload', () => {
        console.log('Final CLS Score:', clsValue.toFixed(4));
    });
}

// Ensure all sections are visible before printing
window.addEventListener('beforeprint', () => {
    document.querySelectorAll('section, .timeline-item, .certificate-item, .skill-category, .brand-item, .portfolio-item').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const thumbs = document.querySelectorAll('.portfolio-thumb');
    thumbs.forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
        }
        img.addEventListener('load', () => {
            img.classList.remove('loading');
        });
        img.addEventListener('error', () => {
            img.classList.remove('loading');
        });
    });

    const cards = document.querySelectorAll('.portfolio-item');
    cards.forEach(card => {
        const link = card.querySelector('.portfolio-link');
        if (link) {
            card.setAttribute('tabindex', '0');
            card.addEventListener('click', () => {
                window.open(link.href, '_blank', 'noopener,noreferrer');
            });
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    window.open(link.href, '_blank', 'noopener,noreferrer');
                }
            });
        }
    });

    const valueCovers = document.querySelectorAll('.value-cover');
    valueCovers.forEach(img => {
        if (!img.complete) {
            img.classList.add('loading');
        }
        img.addEventListener('load', () => {
            img.classList.remove('loading');
        });
        img.addEventListener('error', () => {
            img.classList.remove('loading');
        });
    });
});
