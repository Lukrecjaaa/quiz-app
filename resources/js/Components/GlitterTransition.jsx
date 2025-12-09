import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function GlitterTransition({ children, transitionKey, onTransitionComplete }) {
    const canvasRef = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !isTransitioning) return;

        const ctx = canvas.getContext('2d');
        const particles = [];

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Create glitter particles
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 6 + 3,
                speedX: Math.random() * 4 - 2,
                speedY: Math.random() * 4 - 2,
                life: 1,
                color: ['#ec4899', '#f472b6', '#a78bfa', '#c4b5fd', '#fbbf24', '#ffffff'][
                    Math.floor(Math.random() * 6)
                ],
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
            });
        }

        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.rotation += particle.rotationSpeed;
                particle.life -= 0.015;

                if (particle.life <= 0) {
                    particles.splice(index, 1);
                    return;
                }

                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation);
                ctx.globalAlpha = particle.life;

                ctx.fillStyle = particle.color;
                ctx.shadowBlur = 15;
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

                ctx.restore();
            });

            if (particles.length > 0) {
                animationId = requestAnimationFrame(animate);
            }
        };

        animate();

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [isTransitioning]);

    return (
        <div className="relative">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-50"
                style={{ width: '100%', height: '100%' }}
            />
            <AnimatePresence
                mode="wait"
                onExitComplete={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                        setIsTransitioning(false);
                        if (onTransitionComplete) onTransitionComplete();
                    }, 500);
                }}
            >
                <motion.div
                    key={transitionKey}
                    initial={{ x: 100, opacity: 0, rotate: 5 }}
                    animate={{ x: 0, opacity: 1, rotate: 0 }}
                    exit={{ x: -100, opacity: 0, rotate: -5 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
