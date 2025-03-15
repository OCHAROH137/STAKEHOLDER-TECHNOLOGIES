document.addEventListener("DOMContentLoaded", () => {
    // WhatsApp Button Click Handler
    const whatsappBtn = document.getElementById("whatsapp-btn")
  
    whatsappBtn.addEventListener("click", () => {
      // Replace with your WhatsApp number
      window.open("https://wa.me/254797254329", "_blank")
    })
  
    // Mobile Menu Toggle
    const menuBtn = document.querySelector(".menu-btn")
    const mainNav = document.querySelector(".main-nav")
  
    menuBtn.addEventListener("click", () => {
      // Create mobile menu
      if (!document.querySelector(".mobile-nav")) {
        const mobileNav = document.createElement("div")
        mobileNav.className = "mobile-nav"
  
        // Clone navigation links
        const navLinks = mainNav.querySelectorAll(".nav-link")
        navLinks.forEach((link) => {
          const newLink = link.cloneNode(true)
          mobileNav.appendChild(newLink)
        })
  
        // Add close button
        const closeBtn = document.createElement("button")
        closeBtn.className = "close-btn"
        closeBtn.innerHTML = "&times;"
        closeBtn.addEventListener("click", () => {
          document.body.removeChild(mobileNav)
        })
  
        mobileNav.appendChild(closeBtn)
        document.body.appendChild(mobileNav)
  
        // Add styles for mobile nav
        const style = document.createElement("style")
        style.textContent = `
                  .mobile-nav {
                      position: fixed;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      background-color: #0056b3;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      gap: 30px;
                      z-index: 1000;
                      animation: slideIn 0.3s ease;
                  }
                  
                  @keyframes slideIn {
                      from { opacity: 0; transform: translateY(-20px); }
                      to { opacity: 1; transform: translateY(0); }
                  }
                  
                  .mobile-nav .nav-link {
                      color: white;
                      font-size: 1.5rem;
                  }
                  
                  .close-btn {
                      position: absolute;
                      top: 20px;
                      right: 20px;
                      background: none;
                      border: none;
                      color: white;
                      font-size: 2rem;
                      cursor: pointer;
                  }
              `
        document.head.appendChild(style)
      } else {
        document.querySelector(".mobile-nav").remove()
      }
    })
  
    // Button Click Handlers
    const primaryBtn = document.querySelector(".primary-btn")
    const secondaryBtn = document.querySelector(".secondary-btn")
  
    primaryBtn.addEventListener("click", () => {
      // Add your "Get Connected" functionality here
      alert("Get Connected clicked! Add your implementation here.")
    })
  
    secondaryBtn.addEventListener("click", () => {
      // Add your "View Plans" functionality here
      alert("View Plans clicked! Add your implementation here.")
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80, // Adjust for header height
            behavior: "smooth",
          })
        }
      })
    })
  
    // Animation for package cards
    const packageCards = document.querySelectorAll(".package-card")
  
    function checkVisibility() {
      packageCards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const isVisible = rect.top <= window.innerHeight * 0.8
  
        if (isVisible) {
          card.style.opacity = "1"
          card.style.transform = card.classList.contains("featured") ? "scale(1.05)" : "translateY(0)"
        }
      })
    }
  
    // Initialize package cards with fade effect
    packageCards.forEach((card) => {
      card.style.transition = "all 0.5s ease"
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"
    })
  
    // Check visibility on scroll and on load
    window.addEventListener("scroll", checkVisibility)
    checkVisibility()
  
    // Partner logos animation
    const partnerLogos = document.querySelectorAll(".partner-logo")
  
    function revealPartners() {
      partnerLogos.forEach((logo, index) => {
        setTimeout(() => {
          logo.style.opacity = "1"
          logo.style.transform = "translateY(0)"
        }, index * 200)
      })
    }
  
    // Initialize partner logos with fade effect
    partnerLogos.forEach((logo) => {
      logo.style.transition = "all 0.5s ease"
      logo.style.opacity = "0"
      logo.style.transform = "translateY(20px)"
    })
  
    // Trigger partner logos animation when they come into view
    const partnersSection = document.querySelector(".partners")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealPartners()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )
  
    observer.observe(partnersSection)
  })
  
  