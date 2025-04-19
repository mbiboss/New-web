// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Add transition effect
    document.body.style.transition = 'background 0.5s';
    setTimeout(() => document.body.style.transition = '', 500);
});

// Matrix Rain Effect
const matrixCanvas = document.getElementById('matrix');
const ctx = matrixCanvas.getContext('2d');
matrixCanvas.width = window.innerWidth;
matrixCanvas.height = window.innerHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
const fontSize = 14;
const columns = matrixCanvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i] = drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975 ? 0 : drops[i] + 1;
    }
}
setInterval(drawMatrix, 50);

// Interactive Particles
document.addEventListener('mousedown', (e) => {
    for(let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.querySelector('.particles-container').appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 8 + 2;
        const life = 1.5 + Math.random();
        
        particle.animate([
            { transform: `scale(1)`, opacity: 1 },
            { transform: `scale(0.2)`, opacity: 0 }
        ], {
            duration: life * 1000,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
        }).onfinish = () => particle.remove();
    }
});

// SPA Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Update active states
        document.querySelector('.nav-link.active').classList.remove('active');
        document.querySelector('.content-section.active').classList.remove('active');
        
        this.classList.add('active');
        document.querySelector(targetId).classList.add('active');
        
        // Smooth scroll to section
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Initial Load Effects
window.addEventListener('load', () => {
    // Initial glitch effect
    const glitchOverlay = document.querySelector('.glitch-overlay');
    glitchOverlay.style.animation = 'glitch 2s forwards';
    setTimeout(() => glitchOverlay.remove(), 2000);
    
    // Initialize matrix canvas
    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    });
});

// Form Interaction
document.querySelector('.cyber-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('.cyber-button');
    button.classList.add('loading');
    
    setTimeout(() => {
        button.classList.remove('loading');
        // Add success effect
        const successPulse = document.createElement('div');
        successPulse.className = 'success-pulse';
        button.appendChild(successPulse);
        setTimeout(() => successPulse.remove(), 1000);
    }, 2000);
});
