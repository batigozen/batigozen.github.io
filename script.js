// ============================================
// BATI GOZEN — PORTFOLIO SCRIPTS
// ============================================

// ---- Year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Mobile menu toggle ----
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

navToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll('span');
    if (menuOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// ---- Typing animation ----
const roles = [
    'Penetration Tester',
    'CS Student',
    'Problem Solver',
    'Software Engineer',
    'Tech Enthusiast'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function type() {
    const current = roles[roleIndex];
    const typed = document.getElementById('typed');
    if (!typed) return;

    if (isDeleting) {
        typed.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typed.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) {
        delay = 1800;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 300;
    }

    typingTimeout = setTimeout(type, delay);
}

// Start typing after hero loads
setTimeout(type, 1000);

// ---- Scroll reveal ----
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger children if they exist
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ---- Add reveal class to section children ----
document.querySelectorAll('.section').forEach(section => {
    const children = section.querySelectorAll(
        '.about-grid, .skills-grid, .skill-category, .timeline-item, .cv-cta, .contact-layout'
    );
    children.forEach(child => {
        if (!child.classList.contains('reveal')) {
            child.classList.add('reveal');
            revealObserver.observe(child);
        }
    });
});

// ---- Smooth active nav highlight ----
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinksAll.forEach(link => link.classList.remove('active'));
            const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));

// ---- Skill tags subtle hover shimmer ----
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transition = 'all 0.2s ease';
    });
});

// ---- Parallax orbs on mouse move ----
const orbs = document.querySelectorAll('.orb');
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.4;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});
