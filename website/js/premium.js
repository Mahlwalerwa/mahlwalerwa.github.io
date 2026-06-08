/* =====================================================
   MAHLWALERWA PREMIUM JS
   Navigation, animations & interactive features
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ─── AOS Init ───
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            disable: window.innerWidth < 768
        });
    }

    // ─── Mobile Nav Toggle ───
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== '0px';
            if (isOpen) {
                mobileMenu.style.maxHeight = '0px';
                navToggle.classList.remove('active');
            } else {
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
                navToggle.classList.add('active');
            }
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.maxHeight = '0px';
                navToggle.classList.remove('active');
            });
        });
    }

    // ─── Sticky Nav Shadow ───
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ─── Smooth Scroll for anchor links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const yOffset = -80;
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // ─── EmailJS config — fill in your credentials from emailjs.com ───
    const EMAILJS_PUBLIC_KEY  = 'uruTCcFmpu9auP73Q';   // Account → API Keys
    const EMAILJS_SERVICE_ID  = 'service_8hnr44c';   // Email Services → Service ID
    const EMAILJS_TEMPLATE_ID = 'template_nmjg94v';  // Email Templates → Template ID

    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    // ─── Contact Form ───
    const contactForm = document.getElementById('contactForm');
    const submitBtn   = document.getElementById('submitBtn');
    const submitIcon  = document.getElementById('submitIcon');
    const submitLabel = document.getElementById('submitLabel');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Loading state
            submitBtn.disabled = true;
            submitIcon.className = 'fas fa-spinner fa-spin text-xs';
            submitLabel.textContent = 'Sending…';

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                from_name: data.name,
                from_email: data.email,
                phone:      data.phone || 'Not provided',
                subject:    data.subject || 'General Enquiry',
                message:    data.message
            })
            .then(() => {
                showNotification('Message sent! We\'ll be in touch soon.', 'success');
                contactForm.reset();
            })
            .catch((err) => {
                console.error('EmailJS error:', err);
                showNotification('Failed to send. Please email us directly at info@mahlwalerwa.co.za', 'error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitIcon.className = 'fas fa-paper-plane text-xs';
                submitLabel.textContent = 'Send Message';
            });
        });
    }

    // ─── Notification Toast ───
    function showNotification(message, type = 'success') {
        const existing = document.querySelector('.notification-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.style.cssText = `
            position: fixed; top: 24px; right: 24px; z-index: 9999;
            padding: 16px 24px; border-radius: 12px; max-width: 360px;
            font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500;
            color: white; box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            transform: translateX(120%); transition: transform .4s cubic-bezier(.16,1,.3,1);
            ${type === 'success'
                ? 'background: linear-gradient(135deg, #1B1F5E, #2B4FA3);'
                : 'background: linear-gradient(135deg, #C42127, #9B1B20);'}
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
            toast.style.transform = 'translateX(120%)';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    // ─── Scroll Reveal (if AOS is not loaded) ───
    if (typeof AOS === 'undefined') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ─── Active nav highlighting ───
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 120;
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { passive: true });
    }

});
