import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  color: string;
}

const Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const getRandomColor = () => {
      const colors = [
        'rgba(168, 85, 247, 1)',    // Purple (from-purple-500)
        'rgba(236, 72, 153, 1)',    // Pink (via-pink-500)
        'rgba(249, 115, 22, 1)'     // Orange (to-orange-500)
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1.5,  // Slightly larger base size
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.4, // Range from 0.4 to 0.8
      fadeSpeed: Math.random() * 0.01 - 0.005, // Slower fading
      color: getRandomColor()
    });

    const initParticles = () => {
      particles = Array.from({ length: 100 }, createParticle);
    };

    const updateParticle = (particle: Particle) => {
      // Add slight mouse attraction
      const dx = mouseX - particle.x;
      const dy = mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        const force = (200 - distance) / 10000;
        particle.speedX += dx * force;
        particle.speedY += dy * force;
      }

      // Apply speed limits
      particle.speedX = Math.min(Math.max(particle.speedX, -0.8), 0.8);
      particle.speedY = Math.min(Math.max(particle.speedY, -0.8), 0.8);

      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.opacity += particle.fadeSpeed;

      if (particle.opacity <= 0.3 || particle.opacity >= 0.8) {
        particle.fadeSpeed = -particle.fadeSpeed;
      }

      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
    };

    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -5 }}
    />
  );
};

export default Particles; 