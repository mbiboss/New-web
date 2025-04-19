// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme',
        document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
});

// Matrix Rain
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
const drops = Array(Math.floor(canvas.width / 10)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = '15px monospace';

    drops.forEach((drop, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 10, drop * 10);
        drops[i] = drop > canvas.height / 10 || Math.random() > 0.95 ? 0 : drop + 1;
    });
}

setInterval(drawMatrix, 50);

// Particles
document.addEventListener('mousedown', (e) => {
    for(let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        document.querySelector('.particles-container').appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 2;
        
        requestAnimationFrame(function move() {
            const x = parseFloat(particle.style.left);
            const y = parseFloat(particle.style.top);
            particle.style.left = `${x + Math.cos(angle) * velocity}px`;
            particle.style.top = `${y + Math.sin(angle) * velocity}px`;
            particle.style.opacity = y / window.innerHeight;

            if (y < window.innerHeight) {
                requestAnimationFrame(move);
            } else {
                particle.remove();
            }
        });
    }
});

// SPA Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        document.querySelector('.content-section.active').classList.remove('active');
        document.querySelector(target).classList.add('active');
        document.querySelector('.nav-link.active').classList.remove('active');
        link.classList.add('active');
    });
});

// Initial Glitch
window.addEventListener('load', () => {
    document.querySelector('.glitch-overlay').style.opacity = '1';
    setTimeout(() => {
        document.querySelector('.glitch-overlay').remove();
    }, 2000);
});

// Responsive Canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
