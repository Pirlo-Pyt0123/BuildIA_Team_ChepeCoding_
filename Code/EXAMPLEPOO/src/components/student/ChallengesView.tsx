import { motion } from 'framer-motion';
import {
    Clock,
    Coins,
    Star,
    Target,
    TrendingUp,
    Trophy,
    Users
} from 'lucide-react';
import { useState } from 'react';
import ChallengeModal from './ChallengeModal';
import { Challenge, StudentData } from './types';

interface ChallengesViewProps {
  studentData: StudentData;
  activeChallenges: Challenge[];
  onChallengeComplete?: (challengeId: string) => void;
}

export default function ChallengesView({ studentData, activeChallenges, onChallengeComplete }: ChallengesViewProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChallengeClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedChallenge(null);
  };

  const handleStartChallenge = (challengeId: string) => {
    console.log('Iniciando desafío:', challengeId);
    // Simular finalización exitosa del desafío después de un breve delay
    setTimeout(() => {
      if (onChallengeComplete) {
        onChallengeComplete(challengeId);
      }
    }, 1000);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header Épico de Desafíos */}
      <div className="glass-effect rounded-xl p-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-red-900/10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-red-500/5 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0 mb-6">
            <div>
              <h2 className="text-3xl font-bold flex items-center space-x-3 font-orbitron mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center professional-glow">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <span className="gradient-text">🎯 Arena de Desafíos</span>
              </h2>
              <p className="text-gray-400 font-rajdhani">¡Pon a prueba tus conocimientos y gana recompensas épicas!</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2 bg-orange-500/20 rounded-lg px-4 py-2 border border-orange-500/30">
                <TrendingUp className="w-5 h-5 text-orange-400 animate-pulse" />
                <span className="font-bold text-orange-300 font-jetbrains">{activeChallenges.length} activos</span>
              </div>
              <div className="flex items-center space-x-2 bg-green-500/20 rounded-lg px-3 py-2 border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-300 font-rajdhani">En vivo</span>
              </div>
            </div>
          </div>

          {/* Estadísticas rápidas de desafíos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg p-3 border border-yellow-500/30 text-center">
              <Coins className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
              <p className="text-lg font-bold text-yellow-400 font-orbitron">{studentData.challengesCompleted}</p>
              <p className="text-xs text-gray-400">Completados</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-3 border border-green-500/30 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-1 text-green-400" />
              <p className="text-lg font-bold text-green-400 font-orbitron">{studentData.winStreak}</p>
              <p className="text-xs text-gray-400">Racha</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-lg p-3 border border-purple-500/30 text-center">
              <Star className="w-6 h-6 mx-auto mb-1 text-purple-400" />
              <p className="text-lg font-bold text-purple-400 font-orbitron">{studentData.perfectScores}</p>
              <p className="text-xs text-gray-400">Perfectos</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-3 border border-blue-500/30 text-center">
              <Clock className="w-6 h-6 mx-auto mb-1 text-blue-400" />
              <p className="text-lg font-bold text-blue-400 font-orbitron">{studentData.stats.avgTime}</p>
              <p className="text-xs text-gray-400">Promedio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desafíos Disponibles - Grid Épico */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 120,
              damping: 15
            }}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 2,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
            onClick={() => handleChallengeClick(challenge)}
            className={`relative rounded-xl p-6 border transition-all cursor-pointer group overflow-hidden ${
              challenge.difficulty === 'easy' ? 'bg-gradient-to-br from-green-500/10 via-green-600/5 to-emerald-500/10 border-green-500/40 hover:border-green-500/60' :
              challenge.difficulty === 'medium' ? 'bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-yellow-600/10 border-yellow-500/40 hover:border-yellow-500/60' :
              'bg-gradient-to-br from-red-500/10 via-pink-500/5 to-red-600/10 border-red-500/40 hover:border-red-500/60'
            }`}
          >
            {/* Badge de dificultad épico */}
            <div className={`absolute -top-3 -right-3 w-20 h-8 flex items-center justify-center font-bold text-xs font-orbitron rounded-full shadow-lg ${
              challenge.difficulty === 'easy' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-500/50' :
              challenge.difficulty === 'medium' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-yellow-500/50' :
              'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-red-500/50'
            }`}>
              {challenge.difficulty === 'easy' ? 'FÁCIL' : challenge.difficulty === 'medium' ? 'MEDIO' : 'DIFÍCIL'}
            </div>

            {/* Efecto de partículas para desafíos difíciles */}
            {challenge.difficulty === 'hard' && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-red-400 rounded-full"
                    initial={{ 
                      x: Math.random() * 100 + '%',
                      y: '100%',
                      opacity: 0 
                    }}
                    animate={{ 
                      y: '-10%',
                      opacity: [0, 1, 0] 
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 1.2,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            )}

            {/* Header del desafío */}
            <div className="relative z-10 mb-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  challenge.difficulty === 'easy' ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-2 border-green-500/50' :
                  challenge.difficulty === 'medium' ? 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-2 border-yellow-500/50' :
                  'bg-gradient-to-r from-red-500/30 to-pink-500/30 border-2 border-red-500/50'
                }`}>
                  <span className="text-lg font-bold">
                    {challenge.subject === 'Matemáticas' ? '🧮' : 
                     challenge.subject === 'Ciencias' ? '🔬' : 
                     challenge.subject === 'Historia' ? '📜' : 
                     challenge.subject === 'Lengua' ? '📝' :
                     challenge.subject === 'Geografía' ? '🌍' :
                     challenge.subject === 'Física' ? '⚡' :
                     challenge.subject === 'Arte' ? '🎨' :
                     challenge.subject === 'Inglés' ? '🇬🇧' :
                     challenge.subject === 'Biología' ? '🧬' :
                     challenge.subject === 'Educación Física' ? '🏃' : '📚'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg font-orbitron group-hover:text-cyan-300 transition-colors">
                    {challenge.title || challenge.subject}
                  </h3>
                  <p className="text-xs text-gray-400 font-rajdhani">
                    {challenge.description || 'Desafío académico'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Estadísticas del desafío */}
            <div className="space-y-3 mb-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-lg p-2 border border-yellow-500/20 text-center">
                  <Coins className="w-4 h-4 mx-auto mb-1 text-yellow-400 floating-coins" />
                  <p className="text-sm font-bold text-yellow-300 font-jetbrains">{challenge.coins}</p>
                  <p className="text-xs text-gray-400">Monedas</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 border border-blue-500/20 text-center">
                  <Clock className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                  <p className="text-sm font-bold text-blue-300 font-jetbrains">{challenge.time}</p>
                  <p className="text-xs text-gray-400">Tiempo</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 border border-green-500/20 text-center">
                  <Users className="w-4 h-4 mx-auto mb-1 text-green-400" />
                  <p className="text-sm font-bold text-green-300 font-jetbrains">{challenge.participants}</p>
                  <p className="text-xs text-gray-400">Jugadores</p>
                </div>
              </div>

              {/* Barra de actividad */}
              <div className="relative">
                <div className="w-full bg-gray-700/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (challenge.participants / 50) * 100)}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                    className={`h-2 rounded-full ${
                      challenge.difficulty === 'easy' ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                      challenge.difficulty === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-400' :
                      'bg-gradient-to-r from-red-500 to-pink-400'
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1 text-center">
                  {challenge.participants < 20 ? '🔥 ¡Pocos lugares!' : 
                   challenge.participants < 35 ? '⚡ Popular' : '🌟 Trending'}
                </p>
              </div>
            </div>

            {/* Botón de participar épico */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-lg font-semibold font-orbitron transition-all relative overflow-hidden ${
                challenge.difficulty === 'easy' ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white' :
                challenge.difficulty === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white' :
                'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <Target className="w-4 h-4" />
                <span>¡PARTICIPAR AHORA!</span>
              </span>
              
              {/* Efecto de brillo en hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>

            {/* Badge de recompensa especial */}
            {challenge.coins >= 200 && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 rounded-full border border-purple-400/50">
                <span className="text-xs font-bold text-white flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>BONUS</span>
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Sección de Desafíos Próximos */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-effect rounded-xl p-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3 font-orbitron">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <span className="gradient-text">⏳ Próximos Desafíos</span>
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { subject: 'Matemáticas Avanzadas', time: '2 horas', coins: 300, players: 0, difficulty: 'hard' },
              { subject: 'Historia Universal', time: '4 horas', coins: 180, players: 0, difficulty: 'medium' },
              { subject: 'Ciencias Naturales', time: '6 horas', coins: 220, players: 0, difficulty: 'medium' },
              { subject: 'Literatura Clásica', time: '1 día', coins: 400, players: 0, difficulty: 'hard' }
            ].map((upcoming, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.6 }}
                className="bg-white/5 rounded-lg p-4 border border-indigo-500/20 hover:border-indigo-400/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-lg flex items-center justify-center border border-indigo-500/50">
                      <span className="text-sm">
                        {upcoming.subject.includes('Matemáticas') ? '🧮' : 
                         upcoming.subject.includes('Historia') ? '📜' : 
                         upcoming.subject.includes('Ciencias') ? '🔬' : '📚'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white font-orbitron text-sm">{upcoming.subject}</h4>
                      <p className="text-xs text-gray-400">Inicia en {upcoming.time}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <Coins className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300 font-semibold text-sm font-jetbrains">{upcoming.coins}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full hover:bg-indigo-500/30 transition-all text-xs font-rajdhani"
                    >
                      🔔 Recordar
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal de Desafío */}
      <ChallengeModal
        challenge={selectedChallenge}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onStartChallenge={handleStartChallenge}
      />
    </motion.div>
  );
}
