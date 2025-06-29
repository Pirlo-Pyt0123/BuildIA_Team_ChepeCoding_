import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Trophy, Users } from 'lucide-react';

interface ClassStatsProps {
  totalStudents: number;
  activeChallenges: number;
  averagePerformance: number;
  onlineStudents: number;
}

export default function ClassStats({ 
  totalStudents, 
  activeChallenges, 
  averagePerformance, 
  onlineStudents 
}: ClassStatsProps) {
  const stats = [
    {
      label: 'Total Estudiantes',
      value: totalStudents,
      icon: Users,
      color: 'cyber',
      gradient: 'from-cyber-500 to-cyber-600'
    },
    {
      label: 'Desafíos Activos',
      value: activeChallenges,
      icon: Trophy,
      color: 'neon',
      gradient: 'from-neon-500 to-neon-600'
    },
    {
      label: 'Promedio General',
      value: `${averagePerformance}%`,
      icon: BarChart3,
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      label: 'Estudiantes Online',
      value: onlineStudents,
      icon: TrendingUp,
      color: 'matrix',
      gradient: 'from-matrix-500 to-matrix-600'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          className="glass-effect rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className={`text-2xl font-bold text-${stat.color}-400`}>
                {stat.value}
              </p>
            </div>
            <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-lg flex items-center justify-center opacity-80`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
