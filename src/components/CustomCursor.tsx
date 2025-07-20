import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Simple mouse position update
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Only add mouse events on desktop
    if (!isMobile) {
      window.addEventListener('mousemove', updateMousePosition, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (!isMobile) {
        window.removeEventListener('mousemove', updateMousePosition);
      }
    };
  }, [isMobile]);

  // Don't render cursor on mobile
  if (isMobile) return null;

  return (
    <div
      className="fixed top-0 left-0 w-3 h-3 bg-orange-500 rounded-full pointer-events-none z-50 mix-blend-difference"
      style={{
        transform: `translate(${mousePosition.x - 6}px, ${mousePosition.y - 6}px)`,
      }}
    />
  );
};

export default CustomCursor; 