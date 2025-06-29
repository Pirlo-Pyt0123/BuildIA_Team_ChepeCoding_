import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      'rgba(59, 130, 246, 0.6)',   // blue
      'rgba(139, 92, 246, 0.6)',   // purple
      'rgba(16, 185, 129, 0.6)',   // emerald
      'rgba(236, 72, 153, 0.6)',   // pink
    ];

    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Efectos de conexión entre partículas */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgba(59, 130, 246, 0.3)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(139, 92, 246, 0.3)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        <motion.line
          x1="20%"
          y1="30%"
          x2="80%"
          y2="70%"
          stroke="url(#connectionGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
          transition={{ duration: 8, repeat: Infinity, repeatDelay: 2 }}
        />
        
        <motion.line
          x1="70%"
          y1="20%"
          x2="30%"
          y2="80%"
          stroke="url(#connectionGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatDelay: 4, delay: 2 }}
        />
      </svg>
    </div>
  );
}
