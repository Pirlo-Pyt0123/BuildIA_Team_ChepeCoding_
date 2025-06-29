import { motion } from 'framer-motion';
import {
    Check,
    Coins,
    ShoppingBag,
    Star,
    Target,
    TrendingUp,
    Trophy,
    User
} from 'lucide-react';
import { BannerOption, FrameOption, StudentData } from './types';

interface ProfileViewProps {
  studentData: StudentData;
  playerCoins: number;
  selectedBanner: string;
  selectedFrame: string;
  ownedFrames: string[];
  ownedBanners: string[];
  bannerOptions: BannerOption[];
  frameOptions: FrameOption[];
  getBannerClassName: (bannerId: string) => string;
  getFrameClassName: (frameId: string) => string;
  getOwnedFrameOptions: () => FrameOption[];
  getOwnedBannerOptions: () => BannerOption[];
  equipInventoryItem: (itemId: string, type: 'frame' | 'banner') => void;
}

export default function ProfileView({
  studentData,
  playerCoins,
  selectedBanner,
  selectedFrame,
  ownedFrames,
  ownedBanners,
  getBannerClassName,
  getFrameClassName,
  getOwnedFrameOptions,
  getOwnedBannerOptions,
  equipInventoryItem
}: ProfileViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* 🎨 HEADER ÉPICO DEL PERFIL CON BANNER 🎨 */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        {/* Banner de fondo espectacular */}
        <div className={`w-full h-64 md:h-80 relative ${getBannerClassName(selectedBanner)}`}>
          {/* Overlay de gradiente dinámico */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/40"></div>
          
          {/* Efectos de partículas flotantes */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                initial={{ 
                  x: Math.random() * 100 + '%',
                  y: '100%',
                  opacity: 0 
                }}
                animate={{ 
                  y: '-10%',
                  opacity: [0, 0.6, 0] 
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Contenido del perfil superpuesto */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between space-y-4 md:space-y-0">
            {/* Avatar y datos principales */}
            <div className="flex items-end space-x-6">
              {/* Avatar épico con marco */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className={`relative w-32 h-32 md:w-36 md:h-36 rounded-full p-2 ${getFrameClassName(selectedFrame)} shadow-2xl`}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-4xl md:text-5xl font-bold border-4 border-black/30 shadow-inner">
                  {studentData.avatar}
                </div>
                
                {/* Badge de nivel flotante */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-3 py-1 border-3 border-black shadow-lg">
                  <span className="text-black font-bold text-sm">Nv.{studentData.level}</span>
                </div>
              </motion.div>
              
              {/* Info del usuario mejorada */}
              <div className="text-white space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold font-orbitron gradient-text mb-2">
                  {studentData.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                  <div className="flex items-center space-x-2 bg-black/30 rounded-full px-3 py-1 backdrop-blur-sm">
                    <span className="text-blue-400">📍</span>
                    <span className="text-blue-200">Bogotá, Colombia</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/30 rounded-full px-3 py-1 backdrop-blur-sm">
                    <span className="text-green-400">📅</span>
                    <span className="text-green-200">Desde enero de 2024</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/30 rounded-full px-3 py-1 backdrop-blur-sm">
                    <span className="text-purple-400">🏆</span>
                    <span className="text-purple-200">Nivel {studentData.level}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botón de guardar mejorado */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(34, 197, 94, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-8 py-3 rounded-xl font-bold flex items-center space-x-3 transition-all shadow-lg border border-green-400/30"
            >
              <span className="text-xl">💾</span>
              <span className="font-orbitron">Guardar</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* 📊 ESTADÍSTICAS ÉPICAS DEL PERFIL 📊 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          whileHover={{ scale: 1.05, y: -2 }}
          className="glass-effect rounded-xl p-6 text-center border border-yellow-500/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-500/20 to-transparent rounded-full blur-xl"></div>
          <Coins className="w-8 h-8 mx-auto mb-3 text-yellow-400 floating-coins" />
          <div className="text-3xl font-bold text-yellow-400 mb-1 font-orbitron">{playerCoins.toLocaleString()}</div>
          <div className="text-sm text-gray-400 font-rajdhani">Monedas</div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05, y: -2 }}
          className="glass-effect rounded-xl p-6 text-center border border-cyan-500/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-full blur-xl"></div>
          <Star className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
          <div className="text-3xl font-bold text-cyan-400 mb-1 font-orbitron">{studentData.totalXP.toLocaleString()}</div>
          <div className="text-sm text-gray-400 font-rajdhani">XP Total</div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05, y: -2 }}
          className="glass-effect rounded-xl p-6 text-center border border-green-500/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-green-500/20 to-transparent rounded-full blur-xl"></div>
          <Target className="w-8 h-8 mx-auto mb-3 text-green-400" />
          <div className="text-3xl font-bold text-green-400 mb-1 font-orbitron">{studentData.challengesCompleted}</div>
          <div className="text-sm text-gray-400 font-rajdhani">Completados</div>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05, y: -2 }}
          className="glass-effect rounded-xl p-6 text-center border border-purple-500/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full blur-xl"></div>
          <TrendingUp className="w-8 h-8 mx-auto mb-3 text-purple-400" />
          <div className="text-3xl font-bold text-purple-400 mb-1 font-orbitron">{studentData.winStreak}</div>
          <div className="text-sm text-gray-400 font-rajdhani">Racha</div>
        </motion.div>
      </div>

      {/* 📝 SECCIÓN "SOBRE MÍ" MEJORADA 📝 */}
      <div className="glass-effect rounded-xl p-8 border border-blue-500/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6 text-blue-400 flex items-center space-x-3 font-orbitron">
            <User className="w-8 h-8" />
            <span>Sobre mí</span>
          </h3>
          <p className="text-gray-300 leading-relaxed text-lg font-rajdhani">
            Apasionado por las matemáticas y la ciencia. Siempre buscando nuevos desafíos para crecer.
          </p>
          
          {/* Estadísticas adicionales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700/50">
            <div className="text-center">
              <div className="text-lg font-bold text-orange-400">{studentData.stats.accuracy}%</div>
              <div className="text-xs text-gray-400">Precisión</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">{studentData.stats.avgTime}</div>
              <div className="text-xs text-gray-400">Tiempo Prom.</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">{studentData.stats.bestSubject}</div>
              <div className="text-xs text-gray-400">Mejor Materia</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">{studentData.stats.improvement}</div>
              <div className="text-xs text-gray-400">Mejora</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sección de logros */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-yellow-400 flex items-center space-x-2">
            <Trophy className="w-6 h-6" />
            <span>Logros</span>
          </h3>
          
          <div className="space-y-3">
            {studentData.achievements.slice(0, 4).map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">{achievement.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-400">{achievement.name}</h4>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                  <p className="text-xs text-gray-500">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mi inventario */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6" />
            <span>Mi Inventario</span>
          </h3>
          
          <div className="space-y-6">
            {/* 🖼️ MARCOS POSEÍDOS */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🖼️</span>
                </div>
                <span className="text-blue-400">Marcos de Avatar</span>
                <span className="text-xs bg-blue-500/20 px-2 py-1 rounded-full border border-blue-500/30">
                  {ownedFrames.length} en inventario
                </span>
              </h4>
              
              {ownedFrames.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {getOwnedFrameOptions().map((frame) => {
                    const isEquipped = selectedFrame === frame.id;
                    
                    return (
                      <motion.button
                        key={frame.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => equipInventoryItem(frame.id, 'frame')}
                        className={`relative p-3 rounded-lg border transition-all ${
                          isEquipped
                            ? 'bg-blue-500/20 border-blue-500/50 ring-2 ring-blue-500/30'
                            : 'bg-white/5 border-gray-500/30 hover:border-blue-500/40'
                        }`}
                      >
                        <div className={`w-full aspect-square rounded-full p-1 ${getFrameClassName(frame.id)} mb-2`}>
                          <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center text-xs">
                            👤
                          </div>
                        </div>
                        <p className="text-xs font-medium text-center text-gray-300">{frame.name}</p>
                        {isEquipped && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-700/30 flex items-center justify-center">
                    <span className="text-2xl opacity-50">🖼️</span>
                  </div>
                  <p className="text-sm">No tienes marcos en tu inventario</p>
                  <p className="text-xs">¡Compra algunos en la tienda!</p>
                </div>
              )}
            </div>

            {/* 🎨 BANNERS POSEÍDOS */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/30">
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🎨</span>
                </div>
                <span className="text-purple-400">Banners de Perfil</span>
                <span className="text-xs bg-purple-500/20 px-2 py-1 rounded-full border border-purple-500/30">
                  {ownedBanners.length} en inventario
                </span>
              </h4>
              
              {ownedBanners.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {getOwnedBannerOptions().map((banner) => {
                    const isEquipped = selectedBanner === banner.id;
                    
                    return (
                      <motion.button
                        key={banner.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => equipInventoryItem(banner.id, 'banner')}
                        className={`relative p-3 rounded-lg border transition-all ${
                          isEquipped
                            ? 'bg-purple-500/20 border-purple-500/50 ring-2 ring-purple-500/30'
                            : 'bg-white/5 border-gray-500/30 hover:border-purple-500/40'
                        }`}
                      >
                        <div className={`w-full h-12 rounded-lg mb-2 ${getBannerClassName(banner.id)}`}></div>
                        <p className="text-xs font-medium text-center text-gray-300">{banner.name}</p>
                        {isEquipped && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400">
                  <div className="w-16 h-12 mx-auto mb-3 rounded-lg bg-gray-700/30 flex items-center justify-center">
                    <span className="text-2xl opacity-50">🎨</span>
                  </div>
                  <p className="text-sm">No tienes banners en tu inventario</p>
                  <p className="text-xs">¡Compra algunos en la tienda!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
