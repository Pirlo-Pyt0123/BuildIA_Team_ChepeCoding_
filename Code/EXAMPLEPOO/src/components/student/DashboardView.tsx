import { motion } from 'framer-motion';
import {
    Check,
    Clock,
    Coins,
    Crown,
    Medal,
    ShoppingBag,
    Star,
    Target,
    Trophy,
    User
} from 'lucide-react';
import { ActiveTab, StudentData } from './types';

interface DashboardViewProps {
  studentData: StudentData;
  playerCoins: number;
  selectedFrame: string;
  selectedBanner: string;
  setActiveTab: (tab: ActiveTab) => void;
  getFrameClassName: (frameId: string) => string;
}

export default function DashboardView({
  studentData,
  playerCoins,
  selectedFrame,
  setActiveTab,
  getFrameClassName
}: DashboardViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Hero Section - Welcome Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/50 via-purple-900/30 to-cyan-900/50 backdrop-blur-xl border border-white/20 p-8"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
            {/* Welcome Content */}
            <div className="flex items-center space-x-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className={`w-20 h-20 rounded-2xl p-1 ${getFrameClassName(selectedFrame)}`}
              >
                <div className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center text-3xl font-bold">
                  {studentData.avatar}
                </div>
              </motion.div>
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  ¡Hola, {studentData.name}! 👋
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-300 text-lg mt-1"
                >
                  Nivel {studentData.level} • {studentData.experience.toLocaleString()}/{studentData.maxExperience.toLocaleString()} XP
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-1">
                    <Coins className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300 font-semibold">{playerCoins.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Crown className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 font-semibold">Nivel {studentData.level}</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-blue-500/20 backdrop-blur-md rounded-xl p-4 text-center border border-blue-500/30"
              >
                <Trophy className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <p className="text-2xl font-bold text-blue-300">#{studentData.ranking.course}</p>
                <p className="text-xs text-blue-200">Curso</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-cyan-500/20 backdrop-blur-md rounded-xl p-4 text-center border border-cyan-500/30"
              >
                <Medal className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                <p className="text-2xl font-bold text-cyan-300">#{studentData.ranking.school}</p>
                <p className="text-xs text-cyan-200">Colegio</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                className="bg-emerald-500/20 backdrop-blur-md rounded-xl p-4 text-center border border-emerald-500/30"
              >
                <Star className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                <p className="text-2xl font-bold text-emerald-300">#{studentData.ranking.country}</p>
                <p className="text-xs text-emerald-200">Nacional</p>
              </motion.div>
            </div>
          </div>

          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold text-white">Progreso Semanal</span>
              <span className="text-lg text-blue-400 font-bold">{studentData.weeklyProgress}%</span>
            </div>
            <div className="relative">
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${studentData.weeklyProgress}%` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </motion.div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Inicio de semana</span>
                <span>Meta semanal</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Recent Activity & Achievements Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Actividad Reciente</h3>
                <p className="text-gray-400 text-sm">Últimas 24 horas</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: '🎯', text: 'Completaste el desafío de Matemáticas', time: '2h', color: 'blue' },
              { icon: '🏆', text: 'Alcanzaste una nueva racha de 7 victorias', time: '4h', color: 'yellow' },
              { icon: '💰', text: 'Ganaste 150 monedas por puntuación perfecta', time: '6h', color: 'green' },
              { icon: '📚', text: 'Desbloqueaste el Certificado de Ciencias', time: '1d', color: 'purple' },
              { icon: '⭐', text: 'Subiste al puesto #3 en tu curso', time: '1d', color: 'cyan' }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${activity.color}-500/20 border border-${activity.color}-500/30`}>
                  <span className="text-lg">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm group-hover:text-gray-200 transition-colors">
                    {activity.text}
                  </p>
                  <p className="text-gray-400 text-xs">{activity.time} ago</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="w-full mt-6 text-center text-green-400 hover:text-green-300 transition-colors text-sm font-semibold"
          >
            Ver historial completo →
          </motion.button>
        </motion.div>

        {/* Achievements & Badges */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Logros Recientes</h3>
                <p className="text-gray-400 text-sm">{studentData.achievements.length} desbloqueados</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {studentData.achievements.slice(-4).reverse().map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-yellow-500/25 transition-shadow">
                  <span className="text-xl">{achievement.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white group-hover:text-yellow-300 transition-colors">
                    {achievement.name}
                  </h4>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                  <p className="text-yellow-400 text-xs mt-1">{achievement.date}</p>
                </div>
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="w-full mt-6 text-center text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-semibold"
          >
            Ver todos los logros →
          </motion.button>
        </motion.div>
      </div>

      {/* Quick Actions Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-gradient-to-br from-gray-900/80 via-gray-800/50 to-gray-900/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Acciones Rápidas</h3>
              <p className="text-gray-400 text-sm">Herramientas y funciones frecuentes</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { 
              icon: Target, 
              label: 'Nuevo Desafío', 
              description: 'Buscar desafío', 
              color: 'from-blue-500 to-cyan-500',
              action: () => setActiveTab('challenges')
            },
            { 
              icon: ShoppingBag, 
              label: 'Ir a Tienda', 
              description: 'Comprar recompensas', 
              color: 'from-green-500 to-emerald-500',
              action: () => setActiveTab('shop')
            },
            { 
              icon: Trophy, 
              label: 'Ver Rankings', 
              description: 'Mi posición', 
              color: 'from-yellow-500 to-orange-500',
              action: () => setActiveTab('rankings')
            },
            { 
              icon: User, 
              label: 'Mi Perfil', 
              description: 'Personalizar', 
              color: 'from-purple-500 to-pink-500',
              action: () => setActiveTab('profile')
            }
          ].map((action, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.action}
              className={`relative group p-6 bg-gradient-to-br ${action.color}/20 backdrop-blur-md rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 text-center overflow-hidden`}
            >
              {/* Background Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color}/0 group-hover:${action.color.replace('/20', '/10')} transition-all duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1 group-hover:text-gray-100 transition-colors">
                  {action.label}
                </h4>
                <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors">
                  {action.description}
                </p>
              </div>

              {/* Hover Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700"></div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
