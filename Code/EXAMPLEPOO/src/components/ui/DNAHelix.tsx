import { motion } from 'framer-motion';

export default function DNAHelix() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Definir gradientes */}
        <defs>
          <linearGradient id="helixGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgba(59, 130, 246, 0.8)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(139, 92, 246, 0.8)', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="helixGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgba(16, 185, 129, 0.8)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgba(34, 211, 238, 0.8)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Hélice 1 */}
        <motion.path
          d="M100,400 Q300,200 500,400 T900,400 Q1100,200 1300,400"
          stroke="url(#helixGradient1)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: [0, 1, 0.7],
            strokeWidth: [1, 4, 2]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
        
        {/* Hélice 2 */}
        <motion.path
          d="M100,400 Q300,600 500,400 T900,400 Q1100,600 1300,400"
          stroke="url(#helixGradient2)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: [0, 1, 0.7],
            strokeWidth: [1, 4, 2]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
            delay: 2
          }}
        />
        
        {/* Conexiones entre hélices */}
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1={150 + i * 150}
            y1={400 + Math.sin(i * 0.5) * 200}
            x2={150 + i * 150}
            y2={400 - Math.sin(i * 0.5) * 200}
            stroke="rgba(236, 72, 153, 0.6)"
            strokeWidth="2"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scaleY: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Partículas orbitando */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            r="4"
            fill={i % 2 === 0 ? "rgba(59, 130, 246, 0.8)" : "rgba(16, 185, 129, 0.8)"}
            initial={{ opacity: 0 }}
            animate={{
              cx: [100, 1300],
              cy: [
                400 + Math.sin(i * 0.8) * 200,
                400 + Math.sin((i * 0.8) + Math.PI) * 200
              ],
              opacity: [0, 1, 0],
              r: [2, 6, 2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "linear"
            }}
          />
        ))}
      </svg>
    </div>
  );
}
