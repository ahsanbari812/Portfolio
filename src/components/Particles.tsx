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
      particles = Array.from({ length: 50 }, createParticle); // Reduced from 100 to 50
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
      ctx.fill();
    };

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) { // Reduced connection distance from 120 to 80
            const opacity = (1 - distance / 80) * 0.2; // Reduced opacity and updated calculation
            ctx.beginPath();
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            // Use the actual particle colors for the connecting lines
            const color1 = particles[i].color.replace(/[^,]+(?=\))/, `${opacity}`);
            const color2 = particles[j].color.replace(/[^,]+(?=\))/, `${opacity}`);
            
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      
      // Only update every other frame for better performance
      if (frameCount % 2 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          updateParticle(particle);
          drawParticle(particle);
        });

        connectParticles();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    let mouseMoveThrottle: number;
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse move events to reduce conflicts
      if (mouseMoveThrottle) return;
      
      mouseMoveThrottle = requestAnimationFrame(() => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        mouseMoveThrottle = 0;
      });
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseMoveThrottle) {
        cancelAnimationFrame(mouseMoveThrottle);
      }
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