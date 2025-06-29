import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glassEffect?: boolean;
  neonGlow?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  glassEffect = false,
  neonGlow = false 
}) => {
  const baseStyles = 'rounded-xl p-6 border transition-all duration-300';
  const glassStyles = glassEffect ? 'glass-effect' : 'bg-gray-800 border-gray-700';
  const glowStyles = neonGlow ? 'neon-glow' : '';

  return (
    <div className={`${baseStyles} ${glassStyles} ${glowStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
