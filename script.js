document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    
    menuBtn.addEventListener('click', function() {
        // Create mobile menu
        if (!document.querySelector('.mobile-nav')) {
            const mobileNav = document.createElement('div');
            mobileNav.className = 'mobile-nav';
            
            // Add navigation links
            const navLinks = [
                { text: 'Home', url: 'index.html' },
                { text: 'Plans', url: 'https://www.stakeholdertechnologies.com/plans' },
                { text: 'About', url: 'https://www.stakeholdertechnologies.com/about' },
                { text: 'Contact', url: 'https://www.stakeholdertechnologies.com/contact' },
            ];
            
            navLinks.forEach(link => {
                const anchor = document.createElement('a');
                anchor.href = link.url;
                anchor.textContent = link.text;
                mobileNav.appendChild(anchor);
                
                // Add click event to close menu when a link is clicked
                anchor.addEventListener('click', function() {
                    document.body.removeChild(mobileNav);
                });
            });
            
            // Add contact options to mobile menu
            const contactDiv = document.createElement('div');
            contactDiv.style.display = 'flex';
            contactDiv.style.gap = '20px';
            contactDiv.style.marginTop = '20px';
            
            const phoneLink = document.createElement('a');
            phoneLink.href = 'tel:+254797254329';
            phoneLink.innerHTML = '<i class="fas fa-phone-alt"></i>';
            phoneLink.style.color = 'white';
            phoneLink.style.fontSize = '24px';
            
            const whatsappLink = document.createElement('a');
            whatsappLink.href = 'https://wa.me/254797254329';
            whatsappLink.innerHTML = '<i class="fab fa-whatsapp"></i>';
            whatsappLink.style.color = 'white';
            whatsappLink.style.fontSize = '24px';
            
            contactDiv.appendChild(phoneLink);
            contactDiv.appendChild(whatsappLink);
            mobileNav.appendChild(contactDiv);
            
            // Add close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-btn';
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(mobileNav);
            });
            
            mobileNav.appendChild(closeBtn);
            document.body.appendChild(mobileNav);
        } else {
            document.querySelector('.mobile-nav').remove();
        }
    });

    // Partner logos animation
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    function revealPartners() {
        partnerLogos.forEach((logo, index) => {
            setTimeout(() => {
                logo.style.opacity = '1';
                logo.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Initialize partner logos with fade effect
    partnerLogos.forEach(logo => {
        logo.style.transition = 'all 0.5s ease';
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
    });
    
    // Trigger partner logos animation when they come into view
    const partnersSection = document.querySelector('.partners');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealPartners();
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );
    
    observer.observe(partnersSection);

    // Add page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
    
    // Add floating animation to buttons
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn');
    buttons.forEach((button, index) => {
        button.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
    });
});