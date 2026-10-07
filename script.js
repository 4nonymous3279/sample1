/* --- High-End Interactive Script & Parallax --- */
document.addEventListener('DOMContentLoaded', () => {
    
    // View Management
    const views = {
        landing: document.getElementById('landing-view'),
        login: document.getElementById('login-view'),
        register: document.getElementById('register-view')
    };

    const navLinks = document.querySelectorAll('.nav-link');
    const loginBtn = document.getElementById('nav-login-btn');
    const registerBtn = document.getElementById('nav-register-btn');
    const heroGetStarted = document.getElementById('hero-get-started');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const brandLogo = document.querySelector('.nav-brand');

    function switchView(viewName) {
        Object.keys(views).forEach(key => {
            if (key === viewName) {
                views[key].classList.add('active');
            } else {
                views[key].classList.remove('active');
            }
        });

        // Update active nav links
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === viewName) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Navigation Events
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            if (target === 'hero' || target === 'features') {
                switchView('landing');
                setTimeout(() => {
                    const el = document.getElementById(target);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            }
        });
    });

    brandLogo.addEventListener('click', () => switchView('landing'));
    loginBtn.addEventListener('click', () => switchView('login'));
    registerBtn.addEventListener('click', () => switchView('register'));
    heroGetStarted.addEventListener('click', () => switchView('register'));
    switchToRegister.addEventListener('click', (e) => { e.preventDefault(); switchView('register'); });
    switchToLogin.addEventListener('click', (e) => { e.preventDefault(); switchView('login'); });

    // Toast Notification helper
    function showToast(msg, icon = '✨') {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toast-msg');
        const toastIcon = document.getElementById('toast-icon');

        toastMsg.innerText = msg;
        toastIcon.innerText = icon;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Form Submissions
    document.getElementById('submit-login').addEventListener('click', () => {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-password').value;
        if (!email || !pass) {
            showToast('Please fill in all fields', '⚠️');
            return;
        }
        showToast('Successfully signed in! Redirecting...', '🚀');
        setTimeout(() => switchView('landing'), 1500);
    });

    document.getElementById('submit-register').addEventListener('click', () => {
        const fname = document.getElementById('reg-firstname').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-password').value;
        if (!fname || !email || !pass) {
            showToast('Please complete all required fields', '⚠️');
            return;
        }
        showToast('Account created successfully!', '🎉');
        setTimeout(() => switchView('login'), 1500);
    });

    // Parallax Scrolling & Mouse Parallax Text Effect
    const parallaxElements = document.querySelectorAll('.parallax-text, .hero-content, .hero-visual');
    const backgroundOrbs = document.querySelectorAll('.orb');

    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            let speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // Mouse move parallax and 3D card tilt
    const heroCard = document.querySelector('.quantum-card-3d');
    
    document.addEventListener('mousemove', (e) => {
        let x = (e.clientX / window.innerWidth - 0.5);
        let y = (e.clientY / window.innerHeight - 0.5);

        // Parallax background orbs movement
        backgroundOrbs.forEach((orb, index) => {
            let factor = (index + 1) * 15;
            orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });

        // 3D Tilt on quantum card
        if (heroCard && views.landing.classList.contains('active')) {
            let rx = -y * 20;
            let ry = x * 20;
            heroCard.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
        }
    });

    if (heroCard) {
        heroCard.addEventListener('mouseleave', () => {
            heroCard.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
        });
    }

});
