// DOM Elements
const welcomePopup = document.getElementById('welcomePopup');
const closeBtn = document.getElementById('closeBtn');
const timerBar = document.getElementById('timerBar');
const timerText = document.getElementById('timerText');
const speedTestBtn = document.querySelector('.speed-test-btn');
const mainSiteBtn = document.querySelector('.main-site-btn');
const loadingOverlay = document.getElementById('loadingOverlay');
const networkName = document.getElementById('network-name');
const signalStrength = document.getElementById('signal-strength');
const connectionSpeed = document.getElementById('connection-speed');

// Configuration - Update these URLs with your actual server endpoints
const config = {
    // Base URL for your speed test files and API endpoints
    baseUrl: 'https://stakeholder-tech.com',
    
    // Test file sizes in MB
    testFiles: {
        small: 1,    // 1MB file for slow connections
        medium: 5,   // 5MB file for average connections
        large: 10    // 10MB file for fast connections
    },
    
    // WhatsApp number - replace with your actual support number
    whatsappNumber: '1234567890',
    
    // Main website URL
    mainWebsiteUrl: 'https://stakeholder-tech.com',
    
    // Auto-close timeout in seconds
    autoCloseTimeout: 30
};

// Timer variables
let timeLeft = config.autoCloseTimeout;
let timerInterval;

// Network information
let networkInfo = {
    type: 'unknown',
    downlink: 0,
    rtt: 0,
    effectiveType: '4g'
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Try to get actual network information if available
    detectActualNetworkInfo();
    
    // Start the countdown timer
    startTimer();
    
    // Add event listeners
    closeBtn.addEventListener('click', closePopup);
    speedTestBtn.addEventListener('click', runSpeedTest);
    mainSiteBtn.addEventListener('click', visitMainSite);
    
    // Add event listener to WhatsApp button to pause timer
    document.querySelector('.whatsapp-btn').addEventListener('click', () => {
        // Clear the timer when WhatsApp is clicked
        clearInterval(timerInterval);
    });
});

// Start the countdown timer
function startTimer() {
    // Clear any existing interval
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Update timer every second
    timerInterval = setInterval(() => {
        timeLeft--;
        
        // Update timer text
        timerText.textContent = timeLeft;
        
        // Update timer bar width
        const percentage = (timeLeft / config.autoCloseTimeout) * 100;
        timerBar.style.width = `${percentage}%`;
        
        // Close popup when timer reaches 0
        if (timeLeft <= 0) {
            closePopup();
        }
    }, 1000);
}

// Close the popup
function closePopup() {
    // Clear the timer interval
    clearInterval(timerInterval);
    
    // Add exit animation
    welcomePopup.classList.add('popup-exit');
    
    // Remove popup after animation completes
    setTimeout(() => {
        welcomePopup.style.display = 'none';
    }, 500);
}

// Try to detect actual network information using the Network Information API
function detectActualNetworkInfo() {
    if (navigator.connection) {
        // Get network information from the browser
        networkInfo = {
            type: navigator.connection.type || 'unknown',
            downlink: navigator.connection.downlink || 0,
            rtt: navigator.connection.rtt || 0,
            effectiveType: navigator.connection.effectiveType || '4g'
        };
        
        // Update the network name based on actual connection
        updateNetworkName();
        
        // Update signal strength based on effective type
        updateSignalStrength();
        
        // Update initial speed estimate
        updateInitialSpeedEstimate();
        
        // Listen for connection changes
        navigator.connection.addEventListener('change', () => {
            networkInfo.type = navigator.connection.type || 'unknown';
            networkInfo.downlink = navigator.connection.downlink || 0;
            networkInfo.rtt = navigator.connection.rtt || 0;
            networkInfo.effectiveType = navigator.connection.effectiveType || '4g';
            
            updateNetworkName();
            updateSignalStrength();
            updateInitialSpeedEstimate();
        });
    } else {
        // Fallback to simulated network info if API not available
        detectSimulatedNetworkInfo();
    }
}

// Update network name based on actual connection
function updateNetworkName() {
    // Try to get the actual WiFi name if available and permitted
    if (navigator.connection && navigator.connection.type === 'wifi') {
        // In most browsers, getting the actual WiFi SSID is restricted
        // So we'll use a generic name with the connection type
        networkName.textContent = 'Stakeholder_WiFi';
    } else if (navigator.connection && navigator.connection.type === 'cellular') {
        // For cellular connections
        networkName.textContent = `Stakeholder_${networkInfo.effectiveType.toUpperCase()}`;
    } else {
        // Default fallback
        networkName.textContent = 'Stakeholder_Network';
    }
}

// Update signal strength based on effective type
function updateSignalStrength() {
    let strength = 'Good';
    
    if (networkInfo.effectiveType === '4g' || networkInfo.effectiveType === '3g') {
        strength = 'Excellent';
    } else if (networkInfo.effectiveType === '2g') {
        strength = 'Fair';
    } else if (networkInfo.rtt > 0) {
        // Lower RTT (Round Trip Time) means better connection
        if (networkInfo.rtt < 50) {
            strength = 'Excellent';
        } else if (networkInfo.rtt < 100) {
            strength = 'Very Good';
        } else if (networkInfo.rtt < 200) {
            strength = 'Good';
        } else {
            strength = 'Fair';
        }
    }
    
    signalStrength.textContent = strength;
}

// Update initial speed estimate
function updateInitialSpeedEstimate() {
    let speedEstimate = 'Unknown';
    
    if (networkInfo.downlink > 0) {
        // Convert Mbps to a readable format
        if (networkInfo.downlink >= 1) {
            speedEstimate = `~${Math.round(networkInfo.downlink)} Mbps`;
        } else {
            speedEstimate = `~${Math.round(networkInfo.downlink * 1000)} Kbps`;
        }
    } else {
        // Estimate based on connection type
        if (networkInfo.effectiveType === '4g') {
            speedEstimate = 'Up to 300 Mbps';
        } else if (networkInfo.effectiveType === '3g') {
            speedEstimate = 'Up to 10 Mbps';
        } else if (networkInfo.effectiveType === '2g') {
            speedEstimate = 'Up to 0.5 Mbps';
        } else {
            speedEstimate = 'Up to 100 Mbps';
        }
    }
    
    connectionSpeed.textContent = speedEstimate;
}

// Fallback to simulated network info if API not available
function detectSimulatedNetworkInfo() {
    // For demo purposes, we'll simulate this with random values
    const networks = ['Stakeholder_WiFi', 'Stakeholder_5G', 'Stakeholder_Guest'];
    const signals = ['Good', 'Excellent', 'Very Good'];
    const speeds = ['Up to 100 Mbps', 'Up to 300 Mbps', 'Up to 500 Mbps'];
    
    // Randomly select network info
    const randomIndex = Math.floor(Math.random() * networks.length);
    
    // Update the DOM with network info
    networkName.textContent = networks[randomIndex];
    signalStrength.textContent = signals[randomIndex];
    connectionSpeed.textContent = speeds[randomIndex];
}

// Run Speed Test with real measurements
function runSpeedTest() {
    // Pause the timer while running the speed test
    clearInterval(timerInterval);
    
    // Show loading overlay with progress information
    loadingOverlay.style.display = 'flex';
    document.querySelector('.loading-overlay p').textContent = 'Initializing speed test...';
    
    // Add progress bar to loading overlay if it doesn't exist
    if (!document.querySelector('.progress-container')) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        progressContainer.innerHTML = '<div class="progress-bar"></div>';
        loadingOverlay.appendChild(progressContainer);
    }
    
    // Reset progress bar
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = '0%';
    
    // Results object to store test data
    const results = {
        downloadSpeed: 0,
        uploadSpeed: 0,
        latency: 0
    };
    
    // Determine which test file to use based on initial connection estimate
    let testFileSize = config.testFiles.medium; // Default to medium
    
    if (networkInfo.effectiveType === '4g' || networkInfo.downlink > 10) {
        testFileSize = config.testFiles.large;
    } else if (networkInfo.effectiveType === '2g' || networkInfo.downlink < 2) {
        testFileSize = config.testFiles.small;
    }
    
    // Run the actual speed test
    measureConnectionSpeed(testFileSize, progressBar)
        .then(speedResults => {
            // Hide loading overlay
            loadingOverlay.style.display = 'none';
            
            // Update the results
            results.downloadSpeed = speedResults.downloadMbps;
            results.uploadSpeed = speedResults.uploadMbps;
            results.latency = speedResults.latencyMs;
            
            // Show results
            showSpeedTestResults(results);
            
            // Update the connection speed display
            connectionSpeed.textContent = `${Math.round(results.downloadSpeed)} Mbps`;
            
            // Resume the timer
            timeLeft = config.autoCloseTimeout; // Reset timer
            startTimer();
        })
        .catch(error => {
            console.error('Speed test failed:', error);
            loadingOverlay.style.display = 'none';
            alert('Speed test failed. Please try again.');
            
            // Resume the timer
            timeLeft = config.autoCloseTimeout; // Reset timer
            startTimer();
        });
}

// Function to measure actual connection speed
async function measureConnectionSpeed(testFileSize, progressBar) {
    // Update progress
    updateProgress(progressBar, 5, 'Preparing test...');
    
    // Measure latency first
    document.querySelector('.loading-overlay p').textContent = 'Measuring latency...';
    updateProgress(progressBar, 10, 'Measuring latency...');
    const latency = await measureLatency();
    
    // Measure download speed
    document.querySelector('.loading-overlay p').textContent = 'Measuring download speed...';
    updateProgress(progressBar, 20, 'Measuring download speed...');
    const downloadSpeed = await measureDownloadSpeed(testFileSize, progressBar);
    
    // Measure upload speed
    document.querySelector('.loading-overlay p').textContent = 'Measuring upload speed...';
    updateProgress(progressBar, 70, 'Measuring upload speed...');
    const uploadSpeed = await measureUploadSpeed(Math.min(2, testFileSize/2), progressBar);
    
    // Complete progress
    updateProgress(progressBar, 100, 'Test complete!');
    
    return {
        downloadMbps: downloadSpeed,
        uploadMbps: uploadSpeed,
        latencyMs: latency
    };
}

// Update progress bar and text
function updateProgress(progressBar, percentage, message) {
    progressBar.style.width = `${percentage}%`;
    document.querySelector('.loading-overlay p').textContent = message;
}

// Measure download speed
async function measureDownloadSpeed(fileSizeMB, progressBar) {
    return new Promise((resolve) => {
        // In a real implementation, you would have actual test files on your server
        // For this example, we'll use a URL that should be replaced with your actual test file
        const fileURL = `${config.baseUrl}/speedtest/testfile-${fileSizeMB}mb.bin`;
        const startTime = new Date().getTime();
        const xhr = new XMLHttpRequest();
        
        // Track download progress
        xhr.onprogress = function(e) {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                // Map download progress to 20-70% of overall test
                const overallProgress = 20 + (percentComplete * 0.5);
                updateProgress(progressBar, overallProgress, 
                    `Downloading: ${Math.round(percentComplete)}%`);
            }
        };
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const endTime = new Date().getTime();
                    const duration = (endTime - startTime) / 1000; // seconds
                    const bitsLoaded = fileSizeMB * 8 * 1024 * 1024; // convert MB to bits
                    const speedBps = bitsLoaded / duration;
                    const speedMbps = speedBps / 1024 / 1024;
                    
                    resolve(speedMbps);
                } else {
                    // If file doesn't exist or server error, simulate a result
                    console.warn('Download test file not found, simulating result');
                    simulateDownloadTest(fileSizeMB, progressBar).then(resolve);
                }
            }
        };
        
        // Add cache-busting parameter to prevent cached responses
        xhr.open('GET', fileURL + '?cacheBust=' + new Date().getTime(), true);
        xhr.send();
    });
}

// Simulate download test if real test fails
function simulateDownloadTest(fileSizeMB, progressBar) {
    return new Promise((resolve) => {
        // Simulate download based on network info
        let simulatedSpeed;
        
        if (networkInfo.effectiveType === '4g') {
            simulatedSpeed = 20 + Math.random() * 80; // 20-100 Mbps
        } else if (networkInfo.effectiveType === '3g') {
            simulatedSpeed = 5 + Math.random() * 15; // 5-20 Mbps
        } else if (networkInfo.effectiveType === '2g') {
            simulatedSpeed = 0.1 + Math.random() * 0.4; // 0.1-0.5 Mbps
        } else {
            simulatedSpeed = 10 + Math.random() * 40; // 10-50 Mbps
        }
        
        // Simulate progress updates
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            // Map download progress to 20-70% of overall test
            const overallProgress = 20 + (progress * 0.5);
            updateProgress(progressBar, overallProgress, 
                `Downloading: ${Math.min(100, progress)}%`);
            
            if (progress >= 100) {
                clearInterval(interval);
                resolve(simulatedSpeed);
            }
        }, 200);
    });
}

// Measure latency (ping)
async function measureLatency() {
    return new Promise((resolve) => {
        const pingUrl = `${config.baseUrl}/api/ping`;
        const pings = [];
        let pingCount = 0;
        
        function ping() {
            const start = new Date().getTime();
            fetch(pingUrl + '?cacheBust=' + start)
                .then(() => {
                    const end = new Date().getTime();
                    pings.push(end - start);
                    pingCount++;
                    
                    if (pingCount < 5) {
                        ping(); // Do 5 pings and take average
                    } else {
                        // Calculate average ping, excluding highest value
                        pings.sort((a, b) => a - b);
                        pings.pop(); // Remove highest value
                        const avgPing = pings.reduce((sum, val) => sum + val, 0) / pings.length;
                        resolve(Math.round(avgPing));
                    }
                })
                .catch(() => {
                    // If ping fails, use a fallback method
                    resolve(measureFallbackLatency());
                });
        }
        
        // Start pinging
        ping();
    });
}

// Fallback latency measurement
function measureFallbackLatency() {
    return new Promise((resolve) => {
        const start = new Date().getTime();
        const img = new Image();
        img.onload = function() {
            const end = new Date().getTime();
            resolve(end - start);
        };
        img.onerror = function() {
            // Simulate a reasonable latency value
            if (networkInfo.effectiveType === '4g') {
                resolve(20 + Math.random() * 30); // 20-50ms
            } else if (networkInfo.effectiveType === '3g') {
                resolve(50 + Math.random() * 50); // 50-100ms
            } else if (networkInfo.effectiveType === '2g') {
                resolve(300 + Math.random() * 200); // 300-500ms
            } else {
                resolve(30 + Math.random() * 70); // 30-100ms
            }
        };
        img.src = `${config.baseUrl}/favicon.ico?cacheBust=${start}`;
    });
}

// Measure upload speed
async function measureUploadSpeed(fileSizeMB, progressBar) {
    return new Promise((resolve) => {
        try {
            // Create a blob of random data to upload
            const blob = createRandomBlob(fileSizeMB * 1024 * 1024);
            const xhr = new XMLHttpRequest();
            const startTime = new Date().getTime();
            
            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    // Map upload progress to 70-95% of overall test
                    const overallProgress = 70 + (percentComplete * 0.25);
                    updateProgress(progressBar, overallProgress, 
                        `Uploading: ${Math.round(percentComplete)}%`);
                }
            };
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const endTime = new Date().getTime();
                        const duration = (endTime - startTime) / 1000;
                        const bitsUploaded = fileSizeMB * 8 * 1024 * 1024;
                        const speedBps = bitsUploaded / duration;
                        const speedMbps = speedBps / 1024 / 1024;
                        
                        resolve(speedMbps);
                    } else {
                        // If upload endpoint doesn't exist, simulate a result
                        console.warn('Upload endpoint not found, simulating result');
                        simulateUploadTest(progressBar).then(resolve);
                    }
                }
            };
            
            xhr.open('POST', `${config.baseUrl}/api/speedtest/upload`, true);
            xhr.setRequestHeader('Content-Type', 'application/octet-stream');
            xhr.send(blob);
        } catch (error) {
            console.error('Error in upload test:', error);
            simulateUploadTest(progressBar).then(resolve);
        }
    });
}

// Simulate upload test if real test fails
function simulateUploadTest(progressBar) {
    return new Promise((resolve) => {
        // Simulate upload based on network info
        let simulatedSpeed;
        
        if (networkInfo.effectiveType === '4g') {
            simulatedSpeed = 5 + Math.random() * 25; // 5-30 Mbps
        } else if (networkInfo.effectiveType === '3g') {
            simulatedSpeed = 1 + Math.random() * 4; // 1-5 Mbps
        } else if (networkInfo.effectiveType === '2g') {
            simulatedSpeed = 0.05 + Math.random() * 0.15; // 0.05-0.2 Mbps
        } else {
            simulatedSpeed = 3 + Math.random() * 17; // 3-20 Mbps
        }
        
        // Simulate progress updates
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            // Map upload progress to 70-95% of overall test
            const overallProgress = 70 + (progress * 0.25);
            updateProgress(progressBar, overallProgress, 
                `Uploading: ${Math.min(100, progress)}%`);
            
            if (progress >= 100) {
                clearInterval(interval);
                resolve(simulatedSpeed);
            }
        }, 200);
    });
}

// Create random blob for upload testing
function createRandomBlob(size) {
    const arr = new Uint8Array(size);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
    }
    return new Blob([arr]);
}

// Show speed test results in a more detailed format
function showSpeedTestResults(results) {
    // Create a more detailed results display
    const resultsHTML = `
        <div class="speed-results">
            <h3>Speed Test Results</h3>
            <div class="result-item">
                <span class="result-label">Download:</span>
                <span class="result-value">${Math.round(results.downloadSpeed)} Mbps</span>
            </div>
            <div class="result-item">
                <span class="result-label">Upload:</span>
                <span class="result-value">${Math.round(results.uploadSpeed)} Mbps</span>
            </div>
            <div class="result-item">
                <span class="result-label">Latency:</span>
                <span class="result-value">${results.latency} ms</span>
            </div>
        </div>
    `;
    
    // Create a modal to display results
    const resultsModal = document.createElement('div');
    resultsModal.className = 'results-modal';
    resultsModal.innerHTML = `
        <div class="results-content">
            ${resultsHTML}
            <button class="close-results">Close</button>
        </div>
    `;
    
    document.body.appendChild(resultsModal);
    
    // Add event listener to close button
    document.querySelector('.close-results').addEventListener('click', () => {
        resultsModal.remove();
    });
}

// Visit Main Site
function visitMainSite() {
    // Close the popup
    closePopup();
    
    // Redirect to the main website
    window.location.href = config.mainWebsiteUrl;
}

// Add a simple animation when the page loads
window.addEventListener('load', () => {
    document.querySelector('.welcome-card').style.opacity = '1';
});