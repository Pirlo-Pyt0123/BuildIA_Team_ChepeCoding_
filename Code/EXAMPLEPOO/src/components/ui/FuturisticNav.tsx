import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number;
}

interface FuturisticNavProps {
  items: NavItem[];
  activeItem: string;
  onItemSelect: (id: string) => void;
  className?: string;
}

export default function FuturisticNav({ items, activeItem, onItemSelect, className = "" }: FuturisticNavProps) {
  return (
    <nav className={`flex space-x-1 ${className}`}>
      {items.map((item, index) => {
        const isActive = activeItem === item.id;
        
        return (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onItemSelect(item.id)}
            className={`relative group flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 font-orbitron ${
              isActive 
                ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400' 
                : 'dark-glass hover:bg-gray-800/40 text-gray-400 hover:text-blue-400'
            }`}
          >
            {/* Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 border border-blue-500/30 rounded-lg"
                style={{
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              />
            )}
            
            {/* Content */}
            <div className="relative z-10 flex items-center space-x-2">
              <item.icon className="w-4 h-4" />
              <span className="text-sm tracking-wider">{item.label}</span>
              
              {/* Count Badge */}
              {item.count !== undefined && (
                <span className={`px-2 py-1 rounded-full text-xs font-jetbrains ${
                  isActive ? 'bg-blue-500/30 text-blue-300' : 'bg-gray-700/50 text-gray-400'
                }`}>
                  {item.count}
                </span>
              )}
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 border border-blue-500/20 rounded-lg"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
            </div>
          </motion.button>
        );
      })}
    </nav>
  );
}
