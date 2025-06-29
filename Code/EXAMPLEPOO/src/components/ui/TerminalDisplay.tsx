import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TerminalDisplayProps {
  title?: string;
  data: Array<{
    label: string;
    value: string | number;
    color?: 'green' | 'blue' | 'purple' | 'yellow' | 'red';
  }>;
  className?: string;
}

export default function TerminalDisplay({ title = "SYSTEM_STATUS", data, className = "" }: TerminalDisplayProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const blinkTimer = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(blinkTimer);
    };
  }, []);

  const getColorClass = (color?: string) => {
    switch (color) {
      case 'green': return 'text-green-400';
      case 'blue': return 'text-blue-400';
      case 'purple': return 'text-purple-400';
      case 'yellow': return 'text-yellow-400';
      case 'red': return 'text-red-400';
      default: return 'text-green-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`dark-glass rounded-lg p-4 font-jetbrains text-sm ${className}`}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-3 border-b border-gray-700/30 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-blue-400 ml-3 font-orbitron tracking-wider text-xs">
            {title}
          </span>
        </div>
        <span className="text-gray-500 text-xs">
          {currentTime.toLocaleTimeString()}
        </span>
      </div>

      {/* Terminal Content */}
      <div className="space-y-1">
        <div className="text-green-400">
          <span className="text-gray-500">root@eduplatform:</span>
          <span className="text-blue-400">~$ </span>
          <span className="text-white">system_monitor --status</span>
        </div>
        
        <div className="text-gray-400 text-xs mb-2">
          Iniciando monitoreo del sistema...
        </div>

        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center"
          >
            <span className="text-gray-300">
              <span className="text-blue-400">[</span>
              {item.label}
              <span className="text-blue-400">]</span>
            </span>
            <span className={`font-bold ${getColorClass(item.color)}`}>
              {item.value}
            </span>
          </motion.div>
        ))}

        {/* Blinking Cursor */}
        <div className="mt-2 flex items-center">
          <span className="text-gray-500">root@eduplatform:</span>
          <span className="text-blue-400">~$ </span>
          <span className={`${isBlinking ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
            ▊
          </span>
        </div>
      </div>
    </motion.div>
  );
}
