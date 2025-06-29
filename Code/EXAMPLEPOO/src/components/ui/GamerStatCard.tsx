import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface GamerStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'blue' | 'purple' | 'green' | 'yellow' | 'red';
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  className?: string;
}

export default function GamerStatCard({ 
  title, 
  value, 
  subtitle,
  icon: Icon, 
  color = 'blue',
  trend,
  trendValue,
  className = "" 
}: GamerStatCardProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      glow: 'shadow-blue-500/20'
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30', 
      text: 'text-purple-400',
      glow: 'shadow-purple-500/20'
    },
    green: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      text: 'text-green-400',
      glow: 'shadow-green-500/20'
    },
    yellow: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      glow: 'shadow-yellow-500/20'
    },
    red: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      glow: 'shadow-red-500/20'
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendSymbol = () => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`dark-glass rounded-xl p-6 border-l-4 ${colorClasses[color].border} hover:${colorClasses[color].glow} hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${colorClasses[color].bg} border ${colorClasses[color].border} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colorClasses[color].text}`} />
        </div>
        
        {trend && trendValue && (
          <div className={`flex items-center space-x-1 text-xs ${getTrendColor()}`}>
            <span>{getTrendSymbol()}</span>
            <span className="font-jetbrains">{trendValue}</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="space-y-2">
        <h3 className="text-gray-400 text-sm font-orbitron tracking-wider uppercase">
          {title}
        </h3>
        
        <div className={`text-3xl font-bold ${colorClasses[color].text} font-orbitron tracking-wider`}>
          {value}
        </div>
        
        {subtitle && (
          <p className="text-gray-500 text-xs font-jetbrains">
            {subtitle}
          </p>
        )}
      </div>

      {/* Scan Line Effect */}
      <div className="scan-line mt-4"></div>
    </motion.div>
  );
}
