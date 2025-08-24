console.log('Js Connected');

// Enhanced Portfolio JavaScript with Custom Animations and Effects
 const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");


  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".nav-link");
  const bars = toggle.querySelectorAll("span");

  toggle.addEventListener("click", () => {
    // Toggle menu visibility
    menu.classList.toggle("max-h-0");
    menu.classList.toggle("opacity-0");
    menu.classList.toggle("invisible");

    // Animate hamburger → X
    bars[0].classList.toggle("rotate-45", !menu.classList.contains("invisible"));
    bars[0].classList.toggle("translate-y-2", !menu.classList.contains("invisible"));
    
    bars[1].classList.toggle("opacity-0", !menu.classList.contains("invisible"));
    
    bars[2].classList.toggle("-rotate-45", !menu.classList.contains("invisible"));
    bars[2].classList.toggle("-translate-y-2", !menu.classList.contains("invisible"));

    // Animate nav links
    if (!menu.classList.contains("invisible")) {
      links.forEach((link, i) => {
        setTimeout(() => {
          link.classList.remove("opacity-0", "translate-y-2");
        }, i * 100); // stagger effect
      });
    } else {
      links.forEach((link) => {
        link.classList.add("opacity-0", "translate-y-2");
      });
    }
  });



class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initAOS();
        this.initScrollAnimations();
        this.initActiveNavigation();
        this.initTypewriterEffects();
        this.initSmoothScrolling();
    }

    // Initialize AOS with custom settings
    initAOS() {
        AOS.init({
            offset: 50,
            duration: 1000,
            easing: 'ease-in-out',
            delay: 0,
            once: false, // Animation repeats when scrolling up and down
            mirror: true, // Elements animate when scrolling past them
            anchorPlacement: 'top-bottom'
        });

        // Refresh AOS on scroll to ensure animations work both ways
        window.addEventListener('scroll', () => {
            AOS.refresh();
        });
    }

    
    // Custom scroll animations for elements
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    entry.target.classList.remove('animate-out');
                } else {
                    entry.target.classList.add('animate-out');
                    entry.target.classList.remove('animate-in');
                }
            });
        }, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => observer.observe(section));

        // Observe skill cards
        const skillCards = document.querySelectorAll('#skills > div');
        skillCards.forEach(card => observer.observe(card));
    }

    // Active navigation highlighting
    initActiveNavigation() {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        const sections = document.querySelectorAll('section[id]');

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-20px 0px -80% 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.getAttribute('id');
                    
                    // Remove active class from all nav links
                    navLinks.forEach(link => {
                        link.classList.remove('active-nav');
                    });

                    // Add active class to current nav link
                    const activeLink = document.querySelector(`nav a[href="#${activeId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active-nav');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Typewriter effects
    initTypewriterEffects() {
        this.initRoleTypewriter();
        this.initNameTypewriter();
    }

    // Typewriter effect for roles
    initRoleTypewriter() {
        const roleElement = document.getElementById('role-typewriter');
        if (!roleElement) return;

        const roles = [
            'Python Backend Developer',
            'GIS Specialist',
            'Programming Educator'
        ];

        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        let deleteSpeed = 50;
        let delayBetweenRoles = 2000;

        const typeRole = () => {
            const currentRole = roles[currentRoleIndex];
            
            if (isDeleting) {
                // Deleting characters
                roleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typeSpeed = deleteSpeed;

                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                    typeSpeed = 500; // Pause before starting next role
                }
            } else {
                // Typing characters
                roleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typeSpeed = 100;

                if (currentCharIndex === currentRole.length) {
                    isDeleting = true;
                    typeSpeed = delayBetweenRoles; // Pause before deleting
                }
            }

            setTimeout(typeRole, typeSpeed);
        };

        // Start the typewriter effect
        setTimeout(typeRole, 1000);
    }

    // Typewriter effect for name
    initNameTypewriter() {
        const nameElement = document.getElementById('name-typewriter');
        if (!nameElement) return;

        const names = ['Jude Adeyemi', 'SupremePraiz'];
        let currentNameIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typeSpeed = 120;
        let deleteSpeed = 60;
        let delayBetweenNames = 3000;

        const typeName = () => {
            const currentName = names[currentNameIndex];
            
            if (isDeleting) {
                // Deleting characters
                nameElement.textContent = currentName.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typeSpeed = deleteSpeed;

                if (currentCharIndex === 0) {
                    isDeleting = false;
                    currentNameIndex = (currentNameIndex + 1) % names.length;
                    typeSpeed = 500; // Pause before starting next name
                }
            } else {
                // Typing characters
                nameElement.textContent = currentName.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typeSpeed = 120;

                if (currentCharIndex === currentName.length) {
                    isDeleting = true;
                    typeSpeed = delayBetweenNames; // Pause before deleting
                }
            }

            setTimeout(typeName, typeSpeed);
        };

        // Start the typewriter effect
        setTimeout(typeName, 2000);
    }

    // Smooth scrolling enhancement
    initSmoothScrolling() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Utility functions for enhanced animations
class AnimationUtils {
    static fadeInOnScroll(elements) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                } else {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                }
            });
        });

        elements.forEach(el => observer.observe(el));
    }

    static staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * delay}ms`;
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();

    // Additional custom animations
    const skillCards = document.querySelectorAll('#skills > div');
    AnimationUtils.staggerAnimation(skillCards, 200);

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});

// Add custom CSS keyframes for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fadeInUp {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    .active-nav {
        color: #8b5cf6 !important;
        font-weight: bold;
        transform: scale(1.1);
        text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        position: relative;
    }

    .active-nav::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, #8b5cf6, #a855f7);
        border-radius: 1px;
    }

    .animate-in {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.6s ease-out;
    }

    .animate-out {
        opacity: 0.3;
        transform: translateY(10px);
        transition: all 0.6s ease-out;
    }

    /* Ensure nav links are always visible */
    nav a {
        opacity: 1 !important;
        visibility: visible !important;
        transition: all 0.3s ease;
        color: #60a5fa;
        font-weight: 500;
    }

    nav a:hover {
        transform: translateY(-2px);
        color: #a855f7;
    }

    #role-typewriter::after,
    #name-typewriter::after {
        content: '|';
        color: #8b5cf6;
        animation: blink 1s infinite;
    }

    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }

    .typewriter-container {
        min-height: 1.2em;
        display: flex;
        align-items: center;
    }

    /* Enhanced hover effects */
    nav a {
        opacity: 1 !important;
        visibility: visible !important;
        transition: all 0.3s ease;
        color: #60a5fa !important;
        font-weight: 500;
        display: inline-block;
    }

    nav a:hover {
        transform: translateY(-2px);
        color: #a855f7 !important;
    }

    /* Skill cards enhanced animation */
    #skills > div {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }

    #skills > div.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);