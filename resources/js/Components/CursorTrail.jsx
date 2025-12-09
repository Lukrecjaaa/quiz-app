import { useEffect, useRef } from 'react';

export default function CursorTrail() {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });
    const lastSpawn = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            // Throttle particle spawning
            const now = Date.now();
            if (now - lastSpawn.current < 50) return;
            lastSpawn.current = now;

            for (let i = 0; i < 2; i++) {
                particles.current.push({
                    x: e.clientX + (Math.random() - 0.5) * 20,
                    y: e.clientY + (Math.random() - 0.5) * 20,
                    size: Math.random() * 4 + 2,
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: (Math.random() - 0.5) * 2,
                    life: 1,
                    decay: Math.random() * 0.03 + 0.02,
                    color: ['#ec4899', '#f472b6', '#a78bfa', '#c4b5fd', '#fbbf24', '#fcd5b5', '#b5f5f5', '#e5c5f5'][
                        Math.floor(Math.random() * 8)
                    ],
                    rotation: Math.random() * Math.PI * 2,
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.current = particles.current.filter(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.life -= particle.decay;
                particle.rotation += 0.1;

                if (particle.life <= 0) return false;

                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                ctx.globalAlpha = particle.life;

                ctx.fillStyle = particle.color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = particle.color;

                // Star shape
                ctx.beginPath();
                for (let i = 0; i < 4; i++) {
                    const angle = (Math.PI / 2) * i;
                    const x = Math.cos(angle) * particle.size;
                    const y = Math.sin(angle) * particle.size;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fill();

                // Add center glow
                ctx.beginPath();
                ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();

                return true;
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-20"
            style={{ mixBlendMode: 'normal', willChange: 'transform', transform: 'translate3d(0,0,0)' }}
        />
    );
}
