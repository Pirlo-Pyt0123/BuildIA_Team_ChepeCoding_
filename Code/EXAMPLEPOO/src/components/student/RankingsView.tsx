import { motion } from 'framer-motion';
import {
    Crown,
    Home,
    Medal,
    Star,
    Target,
    TrendingUp,
    Trophy,
    Users
} from 'lucide-react';
import { StudentData } from './types';

interface RankingsViewProps {
  studentData: StudentData;
}

export default function RankingsView({ studentData }: RankingsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header Épico de Rankings */}
      <div className="glass-effect rounded-xl p-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-yellow-500/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-600 rounded-xl flex items-center justify-center professional-glow">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <span className="gradient-text">🏆 Tabla de Clasificación</span>
            </h2>
            <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-500/20 rounded-full border border-yellow-500/30">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-300 font-semibold">Temporada Actual</span>
            </div>
          </div>

          {/* Estadísticas personales épicas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-4 border border-yellow-500/30 text-center">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Medal className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg font-bold text-yellow-400">#{studentData.ranking.course}</p>
              <p className="text-xs text-gray-400">En mi curso</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/30 text-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg font-bold text-blue-400">#{studentData.ranking.school}</p>
              <p className="text-xs text-gray-400">En mi colegio</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/30 text-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Target className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg font-bold text-purple-400">#{studentData.ranking.country}</p>
              <p className="text-xs text-gray-400">Nacional</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/30 text-center">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg font-bold text-green-400">{studentData.totalXP.toLocaleString()}</p>
              <p className="text-xs text-gray-400">XP Total</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rankings Épicos por Categoría */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Ranking del Curso - Mi posición destacada */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-effect rounded-xl p-6 relative overflow-hidden"
        >
          {/* Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-neon-500/5 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neon-400 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-neon-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span>Mi Curso (7°A)</span>
              </h3>
              <div className="bg-neon-500/20 px-3 py-1 rounded-full border border-neon-500/30">
                <span className="text-xs text-neon-300 font-semibold">Top 5</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { pos: 1, name: 'Ana García', avatar: '👩‍🎓', xp: 2450, isMe: false },
                { pos: 2, name: 'Carlos Ruiz', avatar: '👨‍🎓', xp: 2380, isMe: false },
                { pos: 3, name: studentData.name, avatar: studentData.avatar, xp: studentData.totalXP, isMe: true },
                { pos: 4, name: 'María López', avatar: '👩‍🎓', xp: 2110, isMe: false },
                { pos: 5, name: 'Diego Morales', avatar: '👨‍🎓', xp: 1990, isMe: false }
              ].map((student, index) => (
                <motion.div
                  key={student.pos}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                    student.isMe 
                      ? 'bg-gradient-to-r from-neon-500/20 to-cyan-500/20 border border-neon-500/40 shadow-lg shadow-neon-500/20' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {/* Posición con efectos especiales para top 3 */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    student.pos === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/50' :
                    student.pos === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900 shadow-lg shadow-gray-400/50' :
                    student.pos === 3 && student.isMe ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg shadow-orange-500/50' :
                    'bg-white/10 text-purple-300'
                  }`}>
                    {student.pos === 1 && <Crown className="w-4 h-4" />}
                    {student.pos !== 1 && `#${student.pos}`}
                  </div>
                  
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    student.isMe ? 'bg-gradient-to-br from-neon-500/30 to-cyan-500/30 border-2 border-neon-500/50' : 'bg-gray-600'
                  }`}>
                    <span className="text-lg">{student.avatar}</span>
                  </div>
                  
                  {/* Información */}
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${student.isMe ? 'text-neon-300' : 'text-white'}`}>
                      {student.name} {student.isMe && '(Tú)'}
                    </p>
                    <p className="text-xs text-gray-400">{student.xp.toLocaleString()} XP</p>
                  </div>
                  
                  {/* Badge especial para el usuario */}
                  {student.isMe && (
                    <div className="bg-neon-500/20 px-2 py-1 rounded-full border border-neon-500/30">
                      <Star className="w-3 h-3 text-neon-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Ranking del Colegio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-xl p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-500/5 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-cyber-400 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyber-500 to-blue-400 rounded-lg flex items-center justify-center">
                  <Home className="w-4 h-4 text-white" />
                </div>
                <span>Mi Colegio</span>
              </h3>
              <div className="bg-cyber-500/20 px-3 py-1 rounded-full border border-cyber-500/30">
                <span className="text-xs text-cyber-300 font-semibold">#{studentData.ranking.school}</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { pos: 1, name: 'Isabella García', grade: '8°A', xp: 3200, isMe: false },
                { pos: 2, name: 'Santiago Vargas', grade: '8°B', xp: 3100, isMe: false },
                { pos: 11, name: 'Camila Torres', grade: '7°B', xp: 2550, isMe: false },
                { pos: 12, name: studentData.name, grade: '7°A', xp: studentData.totalXP, isMe: true },
                { pos: 13, name: 'Andrés Ramírez', grade: '7°A', xp: 2380, isMe: false }
              ].map((student, index) => (
                <motion.div
                  key={student.pos}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                    student.isMe 
                      ? 'bg-gradient-to-r from-cyber-500/20 to-blue-500/20 border border-cyber-500/40 shadow-lg shadow-cyber-500/20' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    student.pos <= 3 ? 'bg-gradient-to-br from-cyber-400 to-blue-500 text-white' : 'bg-white/10 text-cyan-300'
                  }`}>
                    #{student.pos}
                  </div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    student.isMe ? 'bg-gradient-to-br from-cyber-500/30 to-blue-500/30 border-2 border-cyber-500/50' : 'bg-gray-600'
                  }`}>
                    <span className="text-lg">{student.isMe ? studentData.avatar : '👤'}</span>
                  </div>
                  
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${student.isMe ? 'text-cyber-300' : 'text-white'}`}>
                      {student.name} {student.isMe && '(Tú)'}
                    </p>
                    <p className="text-xs text-gray-400">{student.grade} • {student.xp.toLocaleString()} XP</p>
                  </div>
                  
                  {student.isMe && (
                    <div className="bg-cyber-500/20 px-2 py-1 rounded-full border border-cyber-500/30">
                      <Star className="w-3 h-3 text-cyber-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Ranking Nacional */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-xl p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-purple-400 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <span>Nacional</span>
              </h3>
              <div className="bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                <span className="text-xs text-purple-300 font-semibold">#{studentData.ranking.country}</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { pos: 1, name: 'Valentina Silva', city: 'Bogotá', xp: 5400, isMe: false },
                { pos: 2, name: 'Nicolás Herrera', city: 'Medellín', xp: 5250, isMe: false },
                { pos: 154, name: 'Juliana Pérez', city: 'Cali', xp: 2500, isMe: false },
                { pos: 156, name: studentData.name, city: 'Bogotá', xp: studentData.totalXP, isMe: true },
                { pos: 158, name: 'Mateo Gómez', city: 'Barranquilla', xp: 2400, isMe: false }
              ].map((student, index) => (
                <motion.div
                  key={student.pos}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.4 }}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                    student.isMe 
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 shadow-lg shadow-purple-500/20' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    student.pos <= 3 ? 'bg-gradient-to-br from-purple-400 to-pink-500 text-white' : 'bg-white/10 text-purple-300'
                  }`}>
                    #{student.pos}
                  </div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    student.isMe ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-500/50' : 'bg-gray-600'
                  }`}>
                    <span className="text-lg">{student.isMe ? studentData.avatar : '👤'}</span>
                  </div>
                  
                  <div className="flex-1">
                    <p className={`font-semibold text-sm ${student.isMe ? 'text-purple-300' : 'text-white'}`}>
                      {student.name} {student.isMe && '(Tú)'}
                    </p>
                    <p className="text-xs text-gray-400">{student.city} • {student.xp.toLocaleString()} XP</p>
                  </div>
                  
                  {student.isMe && (
                    <div className="bg-purple-500/20 px-2 py-1 rounded-full border border-purple-500/30">
                      <Star className="w-3 h-3 text-purple-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sección de Progreso y Objetivos */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-effect rounded-xl p-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-blue-900/10 pointer-events-none"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-400 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="gradient-text">🎯 Mis Objetivos</span>
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Objetivo de Curso */}
            <div className="bg-gradient-to-br from-neon-500/10 to-cyan-500/10 rounded-xl p-6 border border-neon-500/30">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-neon-300">Top 3 del Curso</h4>
                <div className="bg-neon-500/20 px-3 py-1 rounded-full">
                  <span className="text-xs text-neon-400 font-semibold">¡Ya conseguido! 🎉</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Posición actual:</span>
                  <span className="text-neon-400 font-semibold">#3 de 28</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Para #2 necesitas:</span>
                  <span className="text-yellow-400 font-semibold">+70 XP</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-3">
                  <div className="bg-gradient-to-r from-neon-500 to-cyan-400 h-3 rounded-full" style={{ width: '89%' }}></div>
                </div>
                <p className="text-xs text-gray-400">¡Estás muy cerca del segundo lugar!</p>
              </div>
            </div>

            {/* Objetivo de Colegio */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-purple-300">Top 10 del Colegio</h4>
                <div className="bg-purple-500/20 px-3 py-1 rounded-full">
                  <span className="text-xs text-purple-400 font-semibold">En progreso</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Posición actual:</span>
                  <span className="text-purple-400 font-semibold">#12 de 240</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Para #10 necesitas:</span>
                  <span className="text-yellow-400 font-semibold">+180 XP</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-400 h-3 rounded-full" style={{ width: '67%' }}></div>
                </div>
                <p className="text-xs text-gray-400">¡Completa 3 desafíos más para lograrlo!</p>
              </div>
            </div>
          </div>

          {/* Recompensas por Ranking */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">🏆 Recompensas de Ranking</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-500/30 text-center">
                <Medal className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <p className="text-sm font-semibold text-yellow-300">Top 3 Curso</p>
                <p className="text-xs text-gray-400">+50 monedas</p>
              </div>
              <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30 text-center">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <p className="text-sm font-semibold text-blue-300">Top 10 Colegio</p>
                <p className="text-xs text-gray-400">+100 monedas</p>
              </div>
              <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30 text-center">
                <Crown className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <p className="text-sm font-semibold text-purple-300">Top 100 Nacional</p>
                <p className="text-xs text-gray-400">+200 monedas</p>
              </div>
              <div className="bg-pink-500/10 rounded-lg p-3 border border-pink-500/30 text-center">
                <Star className="w-6 h-6 mx-auto mb-2 text-pink-400" />
                <p className="text-sm font-semibold text-pink-300">Logro Especial</p>
                <p className="text-xs text-gray-400">Marco épico</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
