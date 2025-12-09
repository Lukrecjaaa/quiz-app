import { useEffect, useRef } from 'react';

export default function ClickRipple() {
    const canvasRef = useRef(null);
    const ripples = useRef([]);

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

        const handleClick = (e) => {
            for (let i = 0; i < 2; i++) {
                setTimeout(() => {
                    ripples.current.push({
                        x: e.clientX,
                        y: e.clientY,
                        radius: 0,
                        maxRadius: Math.random() * 100 + 80,
                        life: 1,
                        color: ['#ec4899', '#a78bfa', '#fbbf24', '#f472b6'][Math.floor(Math.random() * 4)],
                        lineWidth: Math.random() * 3 + 2,
                    });
                }, i * 50);
            }

            for (let i = 0; i < 10; i++) {
                const angle = (Math.PI * 2 * i) / 15;
                const speed = Math.random() * 3 + 2;
                ripples.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    radius: Math.random() * 3 + 2,
                    life: 1,
                    isParticle: true,
                    color: ['#ec4899', '#a78bfa', '#fbbf24', '#f472b6', '#ffffff'][Math.floor(Math.random() * 5)],
                });
            }
        };

        window.addEventListener('click', handleClick);

        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ripples.current = ripples.current.filter(ripple => {
                if (ripple.isParticle) {
                    // Particle behavior
                    ripple.x += ripple.vx;
                    ripple.y += ripple.vy;
                    ripple.life -= 0.02;

                    if (ripple.life <= 0) return false;

                    ctx.save();
                    ctx.globalAlpha = ripple.life;
                    ctx.fillStyle = ripple.color;
                    ctx.shadowBlur = 6;
                    ctx.shadowColor = ripple.color;
                    ctx.beginPath();
                    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();

                    return true;
                } else {
                    // Ripple behavior
                    ripple.radius += 5;
                    ripple.life -= 0.02;

                    if (ripple.life <= 0 || ripple.radius > ripple.maxRadius) return false;

                    ctx.save();
                    ctx.globalAlpha = ripple.life;
                    ctx.strokeStyle = ripple.color;
                    ctx.lineWidth = ripple.lineWidth;
                    ctx.shadowBlur = 12;
                    ctx.shadowColor = ripple.color;
                    ctx.beginPath();
                    ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();

                    return true;
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-25"
            style={{ mixBlendMode: 'screen', willChange: 'transform', transform: 'translate3d(0,0,0)' }}
        />
    );
}
