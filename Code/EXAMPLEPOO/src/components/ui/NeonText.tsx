import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NeonTextProps {
  children: ReactNode;
  className?: string;
  color?: 'blue' | 'purple' | 'emerald' | 'pink' | 'cyan';
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

export default function NeonText({ 
  children, 
  className = '', 
  color = 'blue',
  intensity = 'medium',
  animated = true 
}: NeonTextProps) {
  const colors = {
    blue: {
      text: 'text-blue-400',
      shadow: 'rgba(59, 130, 246, 0.8)',
      glow: 'rgba(59, 130, 246, 0.4)',
    },
    purple: {
      text: 'text-purple-400',
      shadow: 'rgba(139, 92, 246, 0.8)',
      glow: 'rgba(139, 92, 246, 0.4)',
    },
    emerald: {
      text: 'text-emerald-400',
      shadow: 'rgba(16, 185, 129, 0.8)',
      glow: 'rgba(16, 185, 129, 0.4)',
    },
    pink: {
      text: 'text-pink-400',
      shadow: 'rgba(236, 72, 153, 0.8)',
      glow: 'rgba(236, 72, 153, 0.4)',
    },
    cyan: {
      text: 'text-cyan-400',
      shadow: 'rgba(34, 211, 238, 0.8)',
      glow: 'rgba(34, 211, 238, 0.4)',
    },
  };

  const intensityLevels = {
    low: {
      blur1: '2px',
      blur2: '4px',
      blur3: '6px',
      opacity1: '0.3',
      opacity2: '0.2',
      opacity3: '0.1',
    },
    medium: {
      blur1: '4px',
      blur2: '8px',
      blur3: '12px',
      opacity1: '0.5',
      opacity2: '0.3',
      opacity3: '0.15',
    },
    high: {
      blur1: '6px',
      blur2: '12px',
      blur3: '18px',
      opacity1: '0.8',
      opacity2: '0.5',
      opacity3: '0.2',
    },
  };

  const currentColor = colors[color];
  const currentIntensity = intensityLevels[intensity];

  const neonStyle = {
    textShadow: `
      0 0 ${currentIntensity.blur1} ${currentColor.shadow},
      0 0 ${currentIntensity.blur2} ${currentColor.glow},
      0 0 ${currentIntensity.blur3} ${currentColor.glow}
    `,
  };

  const Component = animated ? motion.span : 'span';
  const animationProps = animated ? {
    animate: {
      textShadow: [
        `0 0 ${currentIntensity.blur1} ${currentColor.shadow}, 0 0 ${currentIntensity.blur2} ${currentColor.glow}, 0 0 ${currentIntensity.blur3} ${currentColor.glow}`,
        `0 0 ${parseInt(currentIntensity.blur1) * 1.5}px ${currentColor.shadow}, 0 0 ${parseInt(currentIntensity.blur2) * 1.5}px ${currentColor.glow}, 0 0 ${parseInt(currentIntensity.blur3) * 1.5}px ${currentColor.glow}`,
        `0 0 ${currentIntensity.blur1} ${currentColor.shadow}, 0 0 ${currentIntensity.blur2} ${currentColor.glow}, 0 0 ${currentIntensity.blur3} ${currentColor.glow}`,
      ],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  } : {};

  return (
    <Component
      className={`${currentColor.text} ${className}`}
      style={neonStyle}
      {...animationProps}
    >
      {children}
    </Component>
  );
}
