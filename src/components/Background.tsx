import React, { useEffect, useRef, useCallback } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }, []);

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, t: number) => {
    const { width, height } = ctx.canvas;

    // Create base gradient with reduced opacity
    const gradient = ctx.createRadialGradient(
      width * 0.5, height * 0.5, 0,
      width * 0.5, height * 0.5, height * 0.8
    );

    gradient.addColorStop(0, 'rgba(168, 85, 247, 0.02)');  // Purple
    gradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.015)'); // Pink
    gradient.addColorStop(1, 'rgba(249, 115, 22, 0.02)');  // Orange

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add subtle animated overlay gradient
    const angle = t * 0.0001; // Reduced animation speed
    const x1 = width * 0.5 + Math.cos(angle) * width * 0.2;
    const y1 = height * 0.5 + Math.sin(angle) * height * 0.2;
    const x2 = width * 0.5 + Math.cos(angle + Math.PI) * width * 0.2;
    const y2 = height * 0.5 + Math.sin(angle + Math.PI) * height * 0.2;

    const overlayGradient = ctx.createLinearGradient(x1, y1, x2, y2);
    overlayGradient.addColorStop(0, 'rgba(168, 85, 247, 0.015)');
    overlayGradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.01)');
    overlayGradient.addColorStop(1, 'rgba(249, 115, 22, 0.015)');

    ctx.fillStyle = overlayGradient;
    ctx.fillRect(0, 0, width, height);
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    frameRef.current++;
    
    // Clear with no trail
    ctx.fillStyle = 'rgba(9, 9, 11, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the animated background
    drawBackground(ctx, frameRef.current);
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [drawBackground]);

  useEffect(() => {
    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resize, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full transform-gpu"
      style={{ 
        background: '#09090b',
        zIndex: -10
      }}
    />
  );
};

export default Background; 