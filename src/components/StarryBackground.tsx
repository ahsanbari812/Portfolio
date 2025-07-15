import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  element: HTMLDivElement;
}

const StarryBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const particles: Particle[] = [];
    const numParticles = 150;
    
    container.innerHTML = '';
    
    // Create particles
    for (let i = 0; i < numParticles; i++) {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const speedY = Math.random() * 0.8 + 0.4; // Significantly increased speed (0.4 to 1.2)
      const opacity = Math.random() * 0.6 + 0.4;
      
      const element = document.createElement('div');
      element.classList.add('particle');
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.backgroundColor = '#fff';
      element.style.opacity = opacity.toString();
      // Add motion blur effect for faster particles
      element.style.boxShadow = `0 ${size * 2}px ${size * 4}px rgba(255, 255, 255, ${opacity * 0.6})`;
      element.style.borderRadius = '50%';
      
      container.appendChild(element);
      
      particles.push({
        x,
        y,
        size,
        speedY,
        opacity,
        element
      });
    }
    
    particlesRef.current = particles;
    
    // Animation function
    const animate = () => {
      particles.forEach(particle => {
        particle.y += particle.speedY * 1.5; // Additional speed multiplier
        
        if (particle.y > window.innerHeight + particle.size) {
          particle.y = -particle.size * 4; // Start slightly higher for smoother transition
          particle.x = Math.random() * window.innerWidth;
          particle.opacity = Math.random() * 0.6 + 0.4;
          particle.element.style.opacity = particle.opacity.toString();
        }
        
        // Faster twinkling effect
        const opacityPulse = Math.sin(Date.now() * 0.003 + particle.x) * 0.15;
        particle.element.style.opacity = (particle.opacity + opacityPulse).toString();
        
        particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0)`;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      particles.forEach(particle => {
        if (particle.x > window.innerWidth) {
          particle.x = Math.random() * window.innerWidth;
        }
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden z-0"
      style={{ 
        background: 'linear-gradient(to bottom, #000000, #0a0a0a)',
        perspective: '1000px'
      }}
    />
  );
};

export default StarryBackground;