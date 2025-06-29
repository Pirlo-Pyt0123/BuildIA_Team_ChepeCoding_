import { motion } from 'framer-motion';
import { Coins, Star, TrendingUp } from 'lucide-react';

interface StudentStatsProps {
  coins: number;
  level: number;
  experience: number;
  maxExperience: number;
  weeklyProgress: number;
}

export default function StudentStats({ 
  coins, 
  level, 
  experience, 
  maxExperience, 
  weeklyProgress 
}: StudentStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Coins */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-effect rounded-lg p-4 text-center"
      >
        <Coins className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
        <p className="text-2xl font-bold text-yellow-400">{coins}</p>
        <p className="text-sm text-gray-400">Monedas</p>
      </motion.div>

      {/* Level */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-effect rounded-lg p-4 text-center"
      >
        <Star className="w-8 h-8 mx-auto mb-2 text-neon-400" />
        <p className="text-2xl font-bold text-neon-400">{level}</p>
        <p className="text-sm text-gray-400">Nivel</p>
      </motion.div>

      {/* Weekly Progress */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-effect rounded-lg p-4 text-center"
      >
        <TrendingUp className="w-8 h-8 mx-auto mb-2 text-cyber-400" />
        <p className="text-2xl font-bold text-cyber-400">{weeklyProgress}%</p>
        <p className="text-sm text-gray-400">Esta Semana</p>
      </motion.div>
    </div>
  );
}
