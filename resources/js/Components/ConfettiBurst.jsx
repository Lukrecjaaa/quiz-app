import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const ConfettiBurst = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    const particles = useRef([]);

    useImperativeHandle(ref, () => ({
        burst: (x, y) => {
            createBurst(x, y);
        },
    }));

    const createBurst = (x, y) => {
        const particleCount = 50; // MAXIMUM CONFETTI!!

        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = Math.random() * 8 + 4;

            particles.current.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity - Math.random() * 5, // Upward bias
                size: Math.random() * 8 + 4,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.3,
                gravity: 0.3,
                life: 1,
                decay: Math.random() * 0.015 + 0.01,
                color: ['#ec4899', '#f472b6', '#a78bfa', '#c4b5fd', '#fbbf24', '#f97316', '#ef4444', '#8b5cf6'][
                    Math.floor(Math.random() * 8)
                ],
                shape: Math.random() > 0.5 ? 'circle' : 'square',
            });
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current = particles.current.filter(particle => {
                // Physics
                particle.vy += particle.gravity;
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.rotation += particle.rotationSpeed;
                particle.life -= particle.decay;

                if (particle.life <= 0 || particle.y > canvas.height) return false;

                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                ctx.globalAlpha = particle.life;

                // Draw confetti
                ctx.fillStyle = particle.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = particle.color;

                if (particle.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
                }

                ctx.restore();

                return true;
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
            className="fixed inset-0 pointer-events-none z-30"
            style={{ mixBlendMode: 'normal' }}
        />
    );
});

ConfettiBurst.displayName = 'ConfettiBurst';

export default ConfettiBurst;
