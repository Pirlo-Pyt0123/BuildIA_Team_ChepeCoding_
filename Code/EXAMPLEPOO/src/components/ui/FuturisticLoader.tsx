import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FuturisticLoader() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 10 + 5;
      });
    }, 200);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo animado */}
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl border border-blue-500/50 flex items-center justify-center"
        >
          <span className="text-3xl font-orbitron font-bold text-blue-400">E</span>
        </motion.div>
        
        {/* Texto de carga */}
        <div className="space-y-2">
          <h2 className="text-2xl font-orbitron font-bold text-blue-400">
            Inicializando Sistema
          </h2>
          <div className="font-jetbrains text-green-400 text-sm">
            {progress < 30 && "Cargando módulos de seguridad..."}
            {progress >= 30 && progress < 60 && "Conectando con servidores..."}
            {progress >= 60 && progress < 90 && "Verificando credenciales..."}
            {progress >= 90 && "Sistema listo."}
          </div>
        </div>
        
        {/* Barra de progreso futurista */}
        <div className="w-80 mx-auto">
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-blue-500/30">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs font-jetbrains text-gray-400">
            <span>0%</span>
            <span className="text-blue-400">{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>
        
        {/* Efectos de partículas de carga */}
        <div className="flex justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
