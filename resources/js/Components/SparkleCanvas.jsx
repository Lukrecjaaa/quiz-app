import { useEffect, useRef } from 'react';

export default function SparkleCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 80; // LOTS OF SPARKLES!!

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Sparkle particle class
        class Sparkle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 4 + 2;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.8 + 0.2;
                this.fadeSpeed = Math.random() * 0.02 + 0.01;
                this.growing = Math.random() > 0.5;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = Math.random() * 0.05 - 0.025;

                // Random sparkle colors - pink, purple, lavender, white
                const colors = [
                    '#ec4899', // pink
                    '#f472b6', // lighter pink
                    '#a78bfa', // purple
                    '#c4b5fd', // lavender
                    '#ffffff', // white
                    '#fbbf24', // gold
                    '#fde047', // yellow
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotationSpeed;

                // Twinkle effect
                if (this.growing) {
                    this.opacity += this.fadeSpeed;
                    if (this.opacity >= 1) this.growing = false;
                } else {
                    this.opacity -= this.fadeSpeed;
                    if (this.opacity <= 0.1) this.growing = true;
                }

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.globalAlpha = this.opacity;

                // Draw sparkle star shape
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;

                // 4-pointed star
                ctx.beginPath();
                for (let i = 0; i < 4; i++) {
                    const angle = (Math.PI / 2) * i;
                    const x = Math.cos(angle) * this.size;
                    const y = Math.sin(angle) * this.size;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fill();

                // Add a center glow
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }
        }

        // Create sparkles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Sparkle());
        }

        // Animation loop
        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-10"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
