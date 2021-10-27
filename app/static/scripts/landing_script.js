const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const delay = 0.15;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;


// Mouse pos
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 1000) * (canvas.width / 1000)
}

// Particle
class Particle {
    constructor(x, y, dirX, dirY, size, color) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
    }

    // Draw particles.
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#190061';
        ctx.fill();
    }

    // Check particle and mouse pos, move particle. and draw it.
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.dirX = -this.dirX;
        }
        if (this.y  > canvas.height || this.y < 0) {
            this.dirY = -this.dirY;
        }
        
        // Move particle & draw it.
        this.x += this.dirX * delay;
        this.y += this.dirY * delay;
        this.draw();
    }
}

// Particle array.
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    
    for (let i = 0; i < numberOfParticles * 0.75; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dirX = (Math.random() * 5) - 2.5;
        let dirY = (Math.random() * 5) - 2.5;
        let color = '#190061';

        particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
    }
}

// Animation loop.
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();

}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(25,0,97,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
                ctx.stroke();
            }
        }
    }
}

// Resize check.
window.addEventListener('resize',
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight; 
        mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
        init();
    }
);

// Mouse of out window.
window.addEventListener('mouseout', 
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    }
);

init();
animate();