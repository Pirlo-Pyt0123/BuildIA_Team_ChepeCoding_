import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'emerald' | 'pink';
}

export default function HolographicCard({ children, className = '', glowColor = 'blue' }: HolographicCardProps) {
  const glowColors = {
    blue: 'rgba(59, 130, 246, 0.4)',
    purple: 'rgba(139, 92, 246, 0.4)',
    emerald: 'rgba(16, 185, 129, 0.4)',
    pink: 'rgba(236, 72, 153, 0.4)',
  };

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        rotateX: 5,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Holographic background effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-70"
        style={{
          background: `linear-gradient(45deg, 
            ${glowColors[glowColor]} 0%,
            transparent 25%,
            transparent 75%,
            ${glowColors[glowColor]} 100%)`,
          backgroundSize: '200% 200%',
          animation: 'holographic-shift 3s ease-in-out infinite',
        }}
      />
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 glass-3d rounded-xl" />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line rounded-xl" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-blue-400/60 rounded-tl-lg" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-blue-400/60 rounded-tr-lg" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-blue-400/60 rounded-bl-lg" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-blue-400/60 rounded-br-lg" />
    </motion.div>
  );
}
