import { motion } from 'framer-motion';
import { HelpCircle, RotateCcw } from 'lucide-react';

interface FloatingHelpButtonProps {
  onClick: () => void;
  hasSeenGuide: boolean;
  onResetGuide?: () => void;
}

export default function FloatingHelpButton({ onClick, hasSeenGuide, onResetGuide }: FloatingHelpButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col space-y-2">
      {/* Botón principal de ayuda */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
      >
        <HelpCircle className="w-6 h-6 text-white group-hover:animate-pulse" />
        
        {/* Indicador de nueva guía */}
        {!hasSeenGuide && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-white rounded-full"
            />
          </motion.div>
        )}
      </motion.button>

      {/* Botón para repetir guía (solo si ya la vio) */}
      {hasSeenGuide && onResetGuide && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onResetGuide}
          className="w-10 h-10 bg-gray-700/80 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group backdrop-blur-sm border border-gray-600/50"
          title="Repetir guía"
        >
          <RotateCcw className="w-4 h-4 text-gray-300 group-hover:text-white" />
        </motion.button>
      )}

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900/90 text-white text-sm rounded-lg backdrop-blur-sm border border-gray-700/50 pointer-events-none"
      >
        <div className="flex items-center space-x-2">
          <span className="font-rajdhani">¿Necesitas ayuda?</span>
        </div>
        
        {/* Arrow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-gray-900 border-r border-b border-gray-700/50 transform rotate-45" />
      </motion.div>
    </div>
  );
}
