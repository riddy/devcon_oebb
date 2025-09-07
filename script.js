// Matrix rain effect
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

    document.querySelector('.matrix-bg').appendChild(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px JetBrains Mono';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);
}

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);

    // Debug: log the current sequence (remove this in production)
    console.log('Key pressed:', e.code, 'Current sequence:', konamiCode);

    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        console.log('🎉 Konami code activated!');
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Create floating ÖBB-themed elements
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createFloatingDuck();
        }, i * 300);
    }

    // Show secret message with dad joke
    const itJokes = [
        "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25. 🎃🎄",
        "Why did the programmer quit his job? Because he didn’t get arrays. 😕🧮",
        "Why did the JavaScript developer leave the restaurant? Because he couldn’t ‘callback’ the waiter! 🍽️📞",
        "There are 10 types of people in the world: those who understand binary and those who don’t. 💻🔢",
        "How many programmers does it take to change a lightbulb? None, that’s a hardware problem. 💡🧑‍💻",
        "A SQL query walks into a bar, walks up to two tables and asks, ‘Can I join you?’ 🍻🗃️"
    ];

    const randomJoke = itJokes[Math.floor(Math.random() * itJokes.length)];

    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #0c1116;
            border: 3px solid #e30613;
            border-radius: 12px;
            padding: 35px;
            text-align: center;
            z-index: 9999;
            font-family: 'JetBrains Mono', monospace;
            color: #00ff41;
            box-shadow: 0 0 50px rgba(227, 6, 19, 0.4);
            max-width: 500px;
        ">
            <div style="font-size: 2rem; margin-bottom: 15px;">🚂💻</div>
            <h2 style="color: #e30613; margin-bottom: 20px;">ÖBB EASTER EGG UNLOCKED!</h2>
            <div style="
                background: #161b22;
                padding: 20px;
                border-radius: 8px;
                margin: 15px 0;
                border-left: 4px solid #e30613;
            ">
                <p style="color: #f0f6fc; font-size: 1rem; line-height: 1.4;">${randomJoke}</p>
            </div>
            <p style="color: #7d8590; font-size: 0.9rem;">console.log('Welcome to the ÖBB Tech Community!');</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                margin-top: 20px;
                padding: 12px 25px;
                background: linear-gradient(45deg, #e30613, #b8050f);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-family: 'JetBrains Mono', monospace;
                font-weight: bold;
                transition: transform 0.2s;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">All aboard! 🚂</button>
        </div>
    `;
    document.body.appendChild(message);

    setTimeout(() => {
        if (message.parentElement) {
            message.remove();
        }
    }, 5000);
}

function createFloatingDuck() {
    const trainEmojis = ['🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '💻', '⚙️'];
    const randomEmoji = trainEmojis[Math.floor(Math.random() * trainEmojis.length)];

    const element = document.createElement('div');
    element.innerHTML = randomEmoji;
    element.style.position = 'fixed';
    element.style.fontSize = '2rem';
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 'px';
    element.style.zIndex = '9998';
    element.style.pointerEvents = 'none';
    element.style.transition = 'all 3s ease-out';
    element.style.filter = 'drop-shadow(0 0 5px #e30613)';

    document.body.appendChild(element);

    setTimeout(() => {
        element.style.top = '-100px';
        element.style.transform = 'rotate(360deg)';
    }, 100);

    setTimeout(() => {
        element.remove();
    }, 3000);
}

// Copy to clipboard functionality
function copyToClipboard() {
    const codeContent = document.querySelector('.code-content').textContent;
    navigator.clipboard.writeText(codeContent).then(() => {
        showNotification('Event details copied to clipboard! 📋');
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary-color);
        color: var(--bg-dark);
        padding: 10px 20px;
        border-radius: 4px;
        font-family: 'JetBrains Mono', monospace;
        z-index: 9999;
        animation: slideDown 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Registration URL - update this when you have the actual link
const REGISTRATION_URL = 'https://your-registration-link.com';

// Register button functionality
function handleRegistration(e) {
    e.preventDefault();

    // Show a fun loading message first
    const btn = e.target.closest('.register-btn');
    const originalText = btn.querySelector('.btn-text').innerHTML;

    btn.querySelector('.btn-text').innerHTML = '<code>git push origin registration...</code>';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        // Uncomment the next line and add your registration URL
        // window.open(REGISTRATION_URL, '_blank');

        // For demo purposes, show a message
        showNotification('Registration link would open here! 🚀');

        btn.querySelector('.btn-text').innerHTML = originalText;
        btn.style.pointerEvents = 'auto';
    }, 1500);
}

// Add event listeners to both register buttons
function handleHeroRegistration(e) {
    e.preventDefault();

    // Show a fun loading message first
    const btn = e.target.closest('.hero-register-btn');
    const originalText = btn.querySelector('.btn-text').innerHTML;

    btn.querySelector('.btn-text').innerHTML = '<code>git push origin registration...</code>';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        // Uncomment the next line and add your registration URL
        // window.open(REGISTRATION_URL, '_blank');

        // For demo purposes, show a message
        showNotification('Registration link would open here! 🚀');

        btn.querySelector('.btn-text').innerHTML = originalText;
        btn.style.pointerEvents = 'auto';
    }, 1500);
}

document.getElementById('registerBtn').addEventListener('click', handleRegistration);
document.getElementById('heroRegisterBtn').addEventListener('click', handleHeroRegistration);

// Terminal typing effect
function typeInTerminal() {
    const lines = document.querySelectorAll('.loading-sequence .line');
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, index * 500);
    });
}

// Glitch effect on scroll
let glitchTimeout;
window.addEventListener('scroll', () => {
    const glitch = document.querySelector('.glitch');
    glitch.style.animation = 'none';

    clearTimeout(glitchTimeout);
    glitchTimeout = setTimeout(() => {
        glitch.style.animation = '';
    }, 100);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translate(-50%, -100%); }
        to { transform: translate(-50%, 0); }
    }
    
    @keyframes slideUp {
        from { transform: translate(-50%, 0); }
        to { transform: translate(-50%, -100%); }
    }
`;
document.head.appendChild(style);

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    createMatrixRain();
    typeInTerminal();

    // Add some random console messages for fun
    console.log('%c🚂 Welcome to ÖBB Tech Community!', 'color: #00ff41; font-size: 16px; font-weight: bold;');
    console.log('%cLooks like someone knows how to use dev tools! 😎', 'color: #ff6b35;');
    console.log('%cFirst meetup on 24.10 - be part of history!', 'color: #7d8590;');
    console.log('%cTry the Konami code: ↑↑↓↓←→←→BA', 'color: #7d8590;');
});

// Fun console commands
window.oebb = {
    join: () => {
        console.log('%c✓ Joining ÖBB Tech Community!', 'color: #00ff41;');
        document.getElementById('registerBtn').click();
    },

    coffee: () => {
        console.log('%c☕ Brewing premium coffee... Please wait...', 'color: #ff6b35;');
        setTimeout(() => {
            console.log('%c☕ Coffee ready! Perfect for barcamp discussions!', 'color: #00ff41;');
        }, 2000);
    },

    barcamp: () => {
        console.log('%c🎯 Barcamp topics loading...', 'color: #ff6b35;');
        setTimeout(() => {
            console.log('%c🎯 Ready! What topic will you propose?', 'color: #00ff41;');
        }, 1500);
    },

    community: () => {
        console.log('%c🚂 ÖBB Tech Community - Built by engineers, for engineers!', 'color: #00ff41;');
    },

    help: () => {
        console.log(`%cAvailable commands:
- oebb.join() - Join the community
- oebb.coffee() - Get virtual coffee
- oebb.barcamp() - Learn about barcamp format
- oebb.community() - About our community
- oebb.matrix() - Toggle matrix effect
- oebb.konami() - Trigger easter egg`, 'color: #7d8590;');
    },

    matrix: () => {
        const matrix = document.querySelector('.matrix-bg canvas');
        if (matrix) {
            matrix.style.opacity = matrix.style.opacity === '0' ? '0.1' : '0';
            console.log('%cMatrix effect toggled!', 'color: #00ff41;');
        }
    },

    konami: () => {
        console.log('%c🎮 Activating easter egg manually!', 'color: #ff6b35;');
        activateEasterEgg();
    }
};

console.log('%cType oebb.help() for available commands!', 'color: #7d8590;');