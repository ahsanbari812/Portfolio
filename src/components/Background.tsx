import React from 'react';

const Background: React.FC = () => {
  return (
    <div
      className="fixed inset-0 w-full h-full"
      style={{ 
        background: '#09090b',
        zIndex: -10
      }}
    />
  );
};

export default Background; 