import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawBackground = (t: number) => {
      // Create base gradient
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.height * 0.8
      );

      // Very subtle gradient with low opacity
      gradient.addColorStop(0, 'rgba(168, 85, 247, 0.03)');  // Purple
      gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.02)'); // Pink
      gradient.addColorStop(1, 'rgba(249, 115, 22, 0.03)');  // Orange

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add very subtle animated overlay gradient
      const angle = t * 0.0002;
      const x1 = canvas.width * 0.5 + Math.cos(angle) * canvas.width * 0.3;
      const y1 = canvas.height * 0.5 + Math.sin(angle) * canvas.height * 0.3;
      const x2 = canvas.width * 0.5 + Math.cos(angle + Math.PI) * canvas.width * 0.3;
      const y2 = canvas.height * 0.5 + Math.sin(angle + Math.PI) * canvas.height * 0.3;

      const overlayGradient = ctx.createLinearGradient(x1, y1, x2, y2);
      overlayGradient.addColorStop(0, 'rgba(168, 85, 247, 0.02)');
      overlayGradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.01)');
      overlayGradient.addColorStop(1, 'rgba(249, 115, 22, 0.02)');

      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      frame++;
      
      // Almost black background
      ctx.fillStyle = 'rgba(9, 9, 11, 0.99)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw the animated background
      drawBackground(frame);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ 
        background: '#09090b',
        zIndex: -10
      }}
    />
  );
};

export default Background; 