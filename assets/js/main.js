document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- Vanta.js NET Background ---
        if (typeof VANTA !== 'undefined') {
            VANTA.NET({
                el: "#home",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0xa3e635, // Lima 400
                backgroundColor: 0x030303,
                points: 16.00,
                maxDistance: 22.00,
                spacing: 15.00,
                showDots: true
            });
        }

        // --- GSAP Reveals ---
        const revealElements = document.querySelectorAll('.gsap-reveal');
        revealElements.forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0, y: 40 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.2, 
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // --- Section Title Letters/Words Scrub ---
        const scrubElements = document.querySelectorAll('.gsap-text-scrub');
        scrubElements.forEach(el => {
            // Split text by word to scrub opacity
            const text = el.innerText;
            el.innerHTML = text.split(' ').map(word => `<span class="scrub-word" style="opacity: 0.15; transition: opacity 0.4s ease;">${word}</span>`).join(' ');
            
            const words = el.querySelectorAll('.scrub-word');
            gsap.to(words, {
                opacity: 1,
                stagger: 0.05,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    end: 'bottom 40%',
                    scrub: true
                }
            });
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-panel').style.maxHeight = null;
            });
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
                const panel = item.querySelector('.faq-panel');
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });

    // --- Language Switcher Hash Preservation ---
    const updateLanguageSwitcherLinks = () => {
        const hash = window.location.hash || '';
        const enSwitcher = document.querySelector('.lang-link-en');
        const esSwitcher = document.querySelector('.lang-link-es');
        
        if (enSwitcher) {
            enSwitcher.setAttribute('href', `../en/${hash}`);
        }
        if (esSwitcher) {
            esSwitcher.setAttribute('href', `../es/${hash}`);
        }
    };

    updateLanguageSwitcherLinks();
    window.addEventListener('hashchange', updateLanguageSwitcherLinks);
});
