document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector(".menu-btn");
    const mainNav = document.querySelector(".main-nav");
    
    menuBtn.addEventListener("click", () => {
      // Create mobile menu
      if (!document.querySelector(".mobile-nav")) {
        const mobileNav = document.createElement("div");
        mobileNav.className = "mobile-nav";
        
        // Clone navigation links
        const navLinks = mainNav.querySelectorAll(".nav-link");
        navLinks.forEach((link) => {
          const newLink = link.cloneNode(true);
          mobileNav.appendChild(newLink);
          
          // Add click event to close menu when a link is clicked
          newLink.addEventListener('click', function() {
            document.body.removeChild(mobileNav);
          });
        });
        
        // Add close button
        const closeBtn = document.createElement("button");
        closeBtn.className = "close-btn";
        closeBtn.innerHTML = "&times;";
        closeBtn.addEventListener("click", () => {
          document.body.removeChild(mobileNav);
        });
        
        mobileNav.appendChild(closeBtn);
        document.body.appendChild(mobileNav);
      } else {
        document.querySelector(".mobile-nav").remove();
      }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80, // Adjust for header height
            behavior: "smooth",
          });
        }
      });
    });
    
    // Animation for package cards
    const packageCards = document.querySelectorAll(".package-card");
    
    if (packageCards.length > 0) {
      function checkVisibility() {
        packageCards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const isVisible = rect.top <= window.innerHeight * 0.8;
          
          if (isVisible) {
            card.style.opacity = "1";
            card.style.transform = card.classList.contains("featured") && window.innerWidth > 768
              ? "scale(1.05)"
              : "translateY(0)";
          }
        });
      }
      
      // Initialize package cards with fade effect
      packageCards.forEach((card) => {
        card.style.transition = "all 0.5s ease";
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
      });
      
      // Check visibility on scroll and on load
      window.addEventListener("scroll", checkVisibility);
      window.addEventListener('resize', checkVisibility);
      checkVisibility();
      
      // Package button click handlers
      const packageBtns = document.querySelectorAll('.package-btn');
      packageBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const packageName = this.closest('.package-card').querySelector('h3').textContent;
          alert(`You've selected the ${packageName} package! We'll contact you shortly to complete your subscription.`);
        });
      });
    }
    
    // Partner logos animation
    const partnerLogos = document.querySelectorAll(".partner-logo");
    
    if (partnerLogos.length > 0) {
      function revealPartners() {
        partnerLogos.forEach((logo, index) => {
          setTimeout(() => {
            logo.style.opacity = "1";
            logo.style.transform = "translateY(0)";
          }, index * 200);
        });
      }
      
      // Initialize partner logos with fade effect
      partnerLogos.forEach((logo) => {
        logo.style.transition = "all 0.5s ease";
        logo.style.opacity = "0";
        logo.style.transform = "translateY(20px)";
      });
      
      // Trigger partner logos animation when they come into view
      const partnersSection = document.querySelector(".partners");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealPartners();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 },
      );
      
      observer.observe(partnersSection);
    }
  });