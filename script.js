// Terminal Loading Animation
const loadingTexts = [
    'Initializing system...',
    'Loading modules...',
    'Connecting to server...',
    'Authenticating user...',
    'Loading portfolio data...',
    'Rendering interface...',
    'System ready!'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
const loadingTextElement = document.getElementById('loading-text');
const loadingScreen = document.getElementById('loading-screen');

function typeLoadingText() {
    if (currentTextIndex < loadingTexts.length) {
        const currentText = loadingTexts[currentTextIndex];
        
        if (currentCharIndex < currentText.length) {
            loadingTextElement.textContent += currentText[currentCharIndex];
            currentCharIndex++;
            setTimeout(typeLoadingText, 50);
        } else {
            setTimeout(() => {
                loadingTextElement.textContent += '\n';
                currentTextIndex++;
                currentCharIndex = 0;
                if (currentTextIndex < loadingTexts.length) {
                    setTimeout(typeLoadingText, 200);
                } else {
                    setTimeout(hideLoadingScreen, 1000);
                }
            }, 500);
        }
    }
}

function hideLoadingScreen() {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        startHeroTyping();
    }, 500);
}

// Start loading animation
window.addEventListener('load', () => {
    setTimeout(typeLoadingText, 500);
});

// Hero Terminal Typing Animation
const commands = [
    'cat welcome.txt',
    'ls -la projects/',
    'git status',
    'npm run dev',
    'echo "Ready to code!"'
];

let commandIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById('typing-command');

function startHeroTyping() {
    if (typingElement) {
        typeCommand();
    }
}

function typeCommand() {
    if (commandIndex < commands.length) {
        const currentCommand = commands[commandIndex];
        
        if (charIndex < currentCommand.length) {
            typingElement.textContent += currentCommand[charIndex];
            charIndex++;
            setTimeout(typeCommand, 100);
        } else {
            setTimeout(() => {
                typingElement.textContent = '';
                commandIndex++;
                charIndex = 0;
                if (commandIndex >= commands.length) {
                    commandIndex = 0; // Loop back to start
                }
                setTimeout(typeCommand, 1000);
            }, 2000);
        }
    }
}

// Uptime Counter
function updateUptime() {
    const startTime = new Date('2021-01-01'); // Adjust to your actual start date
    const now = new Date();
    const diff = now - startTime;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    const uptimeElement = document.getElementById('uptime');
    if (uptimeElement) {
        uptimeElement.textContent = `${days}d ${hours}h ${minutes}m`;
    }
}

// Update uptime every minute
setInterval(updateUptime, 60000);
updateUptime();

// Year updates
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('year-output').textContent = new Date().getFullYear();

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 204, 51, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling with terminal-style feedback
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !subject || !message) {
        showTerminalAlert('Error: All fields are required!', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showTerminalAlert('Error: Invalid email format!', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Executing...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showTerminalAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Terminal-style alert system
function showTerminalAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `terminal-alert ${type}`;
    alertDiv.innerHTML = `
        <div class="terminal-window">
            <div class="terminal-header">
                <div class="terminal-buttons">
                    <span class="btn-close"></span>
                    <span class="btn-minimize"></span>
                    <span class="btn-maximize"></span>
                </div>
                <span class="terminal-title">system-alert.sh</span>
            </div>
            <div class="terminal-body">
                <div class="alert-content">
                    <span class="prompt">system@alert:~$</span>
                    <span class="command">echo "${message}"</span>
                </div>
                <div class="alert-output">${message}</div>
                <button class="close-alert" onclick="this.parentElement.parentElement.parentElement.remove()">
                    [Press any key to continue]
                </button>
            </div>
        </div>
    `;
    
    // Style the alert
    alertDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
        max-width: 500px;
        width: 90%;
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.remove();
        }
    }, 5000);
}

// Matrix rain effect (optional - can be enabled for extra cyberpunk feel)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00cc33';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Uncomment the line below to enable matrix rain effect
// createMatrixRain();

// Intersection Observer for terminal window animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe terminal windows for animation
document.querySelectorAll('.terminal-window').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add some terminal sound effects (optional)
function playTerminalSound() {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Add click sound to buttons (optional)
document.querySelectorAll('button, .action-btn, .nav-link').forEach(element => {
    element.addEventListener('click', () => {
        // Uncomment to enable sound effects
        // playTerminalSound();
    });
});

// Add CSS for active nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        background: #00cc33 !important;
        color: #0a0a0a !important;
        box-shadow: 0 0 10px #00cc33 !important;
    }
    
    .terminal-alert .close-alert {
        background: transparent;
        border: 1px solid #00cc33;
        color: #00cc33;
        padding: 8px 16px;
        margin-top: 15px;
        cursor: pointer;
        font-family: 'JetBrains Mono', monospace;
        border-radius: 4px;
        transition: all 0.3s ease;
    }
    
    .terminal-alert .close-alert:hover {
        background: #00cc33;
        color: #0a0a0a;
    }
    
    .alert-content {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
    }
    
    .alert-output {
        color: #00cc33;
        margin-bottom: 15px;
        padding-left: 20px;
    }
`;
document.head.appendChild(style);