import { motion } from 'framer-motion';
import { Award, TrendingUp } from 'lucide-react';
import { ClassStats } from './types';

interface StudentsOverviewProps {
  classStats: ClassStats[];
}

export default function StudentsOverview({ classStats }: StudentsOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Estadísticas por Clase */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classStats.map((classData, index) => (
          <motion.div
            key={classData.class}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="teacher-card glass-effect rounded-xl p-6 hover-lift"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold font-orbitron text-purple-300">{classData.class}</h3>
              <span className="text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full font-rajdhani">
                {classData.totalStudents} estudiantes
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400 font-orbitron">{classData.activeToday}</p>
                <p className="text-xs text-gray-400">Activos Hoy</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400 font-orbitron">{classData.avgPerformance}%</p>
                <p className="text-xs text-gray-400">Promedio</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Completadas:</span>
                <span className="text-green-400 font-jetbrains">{classData.completedTasks}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Pendientes:</span>
                <span className="text-yellow-400 font-jetbrains">{classData.pendingTasks}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Mejor estudiante:</span>
                <span className="text-purple-400 font-jetbrains">{classData.topStudent}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${classData.avgPerformance}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                  className="progress-bar h-2 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Estadísticas Semanales */}
      <div className="teacher-card glass-effect rounded-xl p-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold flex items-center space-x-3 font-orbitron">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl flex items-center justify-center professional-glow">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="gradient-text-accent">Resumen Semanal</span>
            </h3>
            <div className="flex items-center space-x-2 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-purple-300 font-rajdhani">Última semana</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold font-orbitron text-green-300 mb-1">Actividad Total</h4>
              <p className="text-2xl font-bold font-jetbrains text-white">324</p>
              <p className="text-xs text-gray-400 font-rajdhani">sesiones</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold font-orbitron text-blue-300 mb-1">Nuevos Logros</h4>
              <p className="text-2xl font-bold font-jetbrains text-white">45</p>
              <p className="text-xs text-gray-400 font-rajdhani">desbloqueados</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold font-orbitron text-purple-300 mb-1">Tasa Completado</h4>
              <p className="text-2xl font-bold font-jetbrains text-white">84%</p>
              <p className="text-xs text-gray-400 font-rajdhani">promedio</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold font-orbitron text-yellow-300 mb-1">Tiempo Promedio</h4>
              <p className="text-2xl font-bold font-jetbrains text-white">25</p>
              <p className="text-xs text-gray-400 font-rajdhani">minutos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
