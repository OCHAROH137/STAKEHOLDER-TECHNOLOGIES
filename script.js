document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp Button Click Handler
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    whatsappBtn.addEventListener('click', function() {
        // Replace with your WhatsApp number
        window.open('https://wa.me/254797254329', '_blank');
    });

    // Menu Button Click Handler
    const menuBtn = document.querySelector('.menu-btn');
    
    menuBtn.addEventListener('click', function() {
        // Add your menu functionality here
        alert('Menu clicked! Add your menu implementation here.');
    });

    // Button Click Handlers
    const primaryBtn = document.querySelector('.primary-btn');
    const secondaryBtn = document.querySelector('.secondary-btn');

    primaryBtn.addEventListener('click', function() {
        // Add your "Get Connected" functionality here
        alert('Get Connected clicked! Add your implementation here.');
    });

    secondaryBtn.addEventListener('click', function() {
        // Add your "View Plans" functionality here
        alert('View Plans clicked! Add your implementation here.');
    });

    // Add smooth scrolling for better user experience
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Optional: Add animation on scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll('.partner-logo');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize partner logos with fade effect
    const partnerLogos = document.querySelectorAll('.partner-logo');
    partnerLogos.forEach(logo => {
        logo.style.transition = 'all 0.5s ease';
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
    });

    // Listen for scroll events
    window.addEventListener('scroll', revealOnScroll);
    // Initial check for visible elements
    revealOnScroll();
});