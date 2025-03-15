document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-btn');
    const timeLeftElement = document.getElementById('time-left');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const callBtn = document.getElementById('call-btn');
    const packagesBtn = document.getElementById('packages-btn');
    const packagesModal = document.getElementById('packages-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const selectPackageBtns = document.querySelectorAll('.select-package-btn');
    
    // Set initial time (45 minutes in seconds)
    let timeLeft = 45 * 60;
    
    // Format time function
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    
    // Update timer display
    function updateTimer() {
        timeLeftElement.textContent = `Auto-close in ${formatTime(timeLeft)}`;
    }
    
    // Start the timer
    const timer = setInterval(function() {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            closePopup();
        }
    }, 1000);
    
    // Initial timer display
    updateTimer();
    
    // Close popup function
    function closePopup() {
        popup.style.display = 'none';
        // You can redirect to home page or close window here
        // window.location.href = 'https://yourhomepage.com'; // Redirect to home page
        // or window.close(); // Close the window
    }
    
    // Open packages modal
    function openPackagesModal() {
        packagesModal.classList.add('active');
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    // Close packages modal
    function closePackagesModal() {
        packagesModal.classList.remove('active');
        // Restore body scrolling
        document.body.style.overflow = '';
    }
    
    // Handle package selection
    function selectPackage(packageName) {
        // You can implement package selection logic here
        alert(`You've selected the ${packageName} package. Our team will contact you shortly to complete the setup.`);
        closePackagesModal();
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closePopup);
    
    whatsappBtn.addEventListener('click', function() {
        window.open('https://wa.me/254797254329', '_blank');
    });
    
    callBtn.addEventListener('click', function() {
        window.location.href = 'tel:+254797254329';
    });
    
    packagesBtn.addEventListener('click', openPackagesModal);
    
    closeModalBtn.addEventListener('click', closePackagesModal);
    
    // Close modal when clicking outside the modal content
    packagesModal.addEventListener('click', function(event) {
        if (event.target === packagesModal) {
            closePackagesModal();
        }
    });
    
    // Package selection buttons
    selectPackageBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const packageName = this.getAttribute('data-package');
            selectPackage(packageName);
        });
    });
    
    // Prevent closing when clicking inside modal content
    document.querySelector('.modal-content').addEventListener('click', function(event) {
        event.stopPropagation();
    });
    
    // Handle keyboard accessibility
    document.addEventListener('keydown', function(event) {
        // Close modal on Escape key
        if (event.key === 'Escape' && packagesModal.classList.contains('active')) {
            closePackagesModal();
        }
    });
    
    // Fix for iOS devices to handle viewport height correctly
    function setVhProperty() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set the property on initial load
    setVhProperty();
    
    // Update on resize
    window.addEventListener('resize', setVhProperty);
    
    // Handle orientation change on mobile devices
    window.addEventListener('orientationchange', function() {
        // Small timeout to ensure the browser has completed the orientation change
        setTimeout(setVhProperty, 100);
    });
    
    // Ensure buttons are accessible via keyboard
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(function(button) {
        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                button.click();
            }
        });
    });
});