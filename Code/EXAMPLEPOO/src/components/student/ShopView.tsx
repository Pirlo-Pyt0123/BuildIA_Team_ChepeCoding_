import { motion } from 'framer-motion';
import {
    Clock,
    Coins,
    Gift,
    ShoppingBag,
    ShoppingCart,
    Star,
    Trophy
} from 'lucide-react';
import React from 'react';
import { Reward, ShopItem } from './types';

interface ShopViewProps {
  shopItems: {
    frames: ShopItem[];
    banners: ShopItem[];
  };
  rewards: Reward[];
  playerCoins: number;
  ownedFrames: string[];
  ownedBanners: string[];
  frameOptions: any[];
  bannerOptions: any[];
  getFrameClassName: (frameId: string) => string;
  getBannerClassName: (bannerId: string) => string;
  purchaseShopItem: (reward: Reward) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  shopItems,
  rewards,
  playerCoins,
  ownedFrames,
  ownedBanners,
  frameOptions,
  bannerOptions,
  getFrameClassName,
  getBannerClassName,
  purchaseShopItem
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header Épico de la Tienda */}
      <div className="glass-effect rounded-xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-yellow-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0 mb-6">
            <div>
              <h2 className="text-3xl font-bold flex items-center space-x-3 font-orbitron mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 rounded-xl flex items-center justify-center professional-glow">
                  <ShoppingBag className="w-7 h-7 text-white" />
                </div>
                <span className="gradient-text">💎 Tienda Épica</span>
              </h2>
              <p className="text-gray-400 font-rajdhani">¡Desbloquea recompensas legendarias y mejora tu experiencia!</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl px-6 py-3 border border-yellow-500/30">
                <Coins className="w-6 h-6 text-yellow-400 floating-coins" />
                <div>
                  <p className="text-2xl font-bold text-yellow-300 font-orbitron">{playerCoins.toLocaleString()}</p>
                  <p className="text-xs text-yellow-500/80 font-rajdhani">Monedas disponibles</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-purple-500/20 rounded-lg px-3 py-2 border border-purple-500/30">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-purple-300 font-rajdhani">Nuevos items</span>
              </div>
            </div>
          </div>

          {/* Estadísticas rápidas de la tienda */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-3 border border-green-500/30 text-center">
              <ShoppingCart className="w-6 h-6 mx-auto mb-1 text-green-400" />
              <p className="text-lg font-bold text-green-400 font-orbitron">{rewards.filter(r => r.available).length}</p>
              <p className="text-xs text-gray-400">Disponibles</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-3 border border-blue-500/30 text-center">
              <Gift className="w-6 h-6 mx-auto mb-1 text-blue-400" />
              <p className="text-lg font-bold text-blue-400 font-orbitron">{rewards.filter(r => r.coins <= playerCoins).length}</p>
              <p className="text-xs text-gray-400">Alcanzables</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-lg p-3 border border-purple-500/30 text-center">
              <Star className="w-6 h-6 mx-auto mb-1 text-purple-400" />
              <p className="text-lg font-bold text-purple-400 font-orbitron">{rewards.filter(r => r.coins >= 1000).length}</p>
              <p className="text-xs text-gray-400">Premium</p>
            </div>
            <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-lg p-3 border border-pink-500/30 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-1 text-pink-400" />
              <p className="text-lg font-bold text-pink-400 font-orbitron">{Math.round(playerCoins / 100)}</p>
              <p className="text-xs text-gray-400">Poder adq.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categorías de la tienda con diseño épico */}
      {['Marcos', 'Banners'].map((category, categoryIndex) => {
        const getCategoryGradient = (cat: string) => {
          switch (cat) {
            case 'Marcos': return 'from-blue-500/10 via-blue-600/5 to-cyan-500/10';
            case 'Banners': return 'from-purple-500/10 via-purple-600/5 to-pink-500/10';
            default: return 'from-gray-500/10 via-gray-600/5 to-gray-500/10';
          }
        };

        const getCategoryBorder = (cat: string) => {
          switch (cat) {
            case 'Marcos': return 'border-blue-500/40';
            case 'Banners': return 'border-purple-500/40';
            default: return 'border-gray-500/40';
          }
        };

        const getCategoryTextColor = (cat: string) => {
          switch (cat) {
            case 'Marcos': return 'text-blue-400';
            case 'Banners': return 'text-purple-400';
            default: return 'text-gray-400';
          }
        };

        const getCategoryIcon = (cat: string) => {
          switch (cat) {
            case 'Marcos': return '🖼️';
            case 'Banners': return '🎨';
            default: return '📦';
          }
        };

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className={`rounded-xl p-6 border bg-gradient-to-br ${getCategoryGradient(category)} ${getCategoryBorder(category)} relative overflow-hidden`}
          >
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${getCategoryGradient(category)} border ${getCategoryBorder(category)}`}>
                    <span className="text-2xl">{getCategoryIcon(category)}</span>
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold font-orbitron ${getCategoryTextColor(category)}`}>{category}</h3>
                    <p className="text-sm text-gray-400 font-rajdhani">Productos disponibles para comprar</p>
                  </div>
                </div>
              </div>

              {/* Contenido especial para Marcos */}
              {category === 'Marcos' && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {shopItems.frames
                    .filter(frameItem => !ownedFrames.includes(frameItem.id))
                    .map((frameItem, index) => {
                      const frameData = frameOptions.find(f => f.id === frameItem.id);
                      if (!frameData) return null;
                      
                      const canAfford = playerCoins >= frameItem.price;
                      const isPremium = frameItem.price >= 1000;
                      
                      return (
                        <motion.div
                          key={frameItem.id}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 120,
                            damping: 15
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            rotateY: 3,
                            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                          }}
                          className={`relative rounded-xl p-5 border transition-all cursor-pointer group overflow-hidden ${
                            canAfford 
                              ? `bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/40 hover:shadow-2xl` 
                              : 'bg-gradient-to-br from-gray-500/5 to-gray-600/10 border-gray-500/20 opacity-60'
                          }`}
                        >
                          {isPremium && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                              💎 PREMIUM
                            </div>
                          )}

                          <div className={`absolute -top-2 -left-2 px-2 py-1 rounded-full text-xs font-bold border ${
                            frameItem.rarity === 'mythic' ? 'bg-red-500/90 border-red-400 text-white' :
                            frameItem.rarity === 'legendary' ? 'bg-yellow-500/90 border-yellow-400 text-black' :
                            frameItem.rarity === 'epic' ? 'bg-purple-500/90 border-purple-400 text-white' :
                            frameItem.rarity === 'rare' ? 'bg-blue-500/90 border-blue-400 text-white' :
                            'bg-gray-500/90 border-gray-400 text-white'
                          }`}>
                            {frameItem.rarity === 'mythic' ? '🌟' :
                             frameItem.rarity === 'legendary' ? '👑' :
                             frameItem.rarity === 'epic' ? '💜' :
                             frameItem.rarity === 'rare' ? '💙' : '⚪'}
                          </div>

                          <div className="relative z-10">
                            <div className="text-center mb-4">
                              <div className={`w-16 h-16 rounded-full p-1 mx-auto mb-3 relative ${getFrameClassName(frameItem.id)}`}>
                                <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center text-sm">
                                  👤
                                </div>
                              </div>
                              
                              <h4 className={`font-bold text-sm mb-2 line-clamp-2 min-h-[2.5rem] font-orbitron ${
                                canAfford ? 'text-white' : 'text-gray-500'
                              }`}>
                                Marco {frameData.name}
                              </h4>
                              
                              <p className={`text-xs mb-2 ${
                                canAfford ? 'text-gray-300' : 'text-gray-500'
                              }`}>
                                {frameData.description}
                              </p>
                              
                              <div className={`text-xs px-3 py-1 rounded-full inline-block border ${
                                canAfford 
                                  ? 'text-blue-400 border-blue-500/40 bg-white/10' 
                                  : 'text-gray-500 border-gray-500/30 bg-gray-500/10'
                              }`}>
                                {frameItem.rarity?.toUpperCase()}
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center justify-center space-x-2">
                                <Coins className={`w-5 h-5 ${canAfford ? 'text-yellow-400' : 'text-gray-500'}`} />
                                <span className={`font-bold text-lg font-jetbrains ${
                                  canAfford ? 'text-yellow-300' : 'text-gray-500'
                                }`}>
                                  {frameItem.price.toLocaleString()}
                                </span>
                              </div>

                              <motion.button
                                whileHover={{ scale: canAfford ? 1.05 : 1 }}
                                whileTap={{ scale: canAfford ? 0.95 : 1 }}
                                disabled={!canAfford}
                                className={`w-full py-3 rounded-lg font-bold text-sm font-orbitron transition-all relative overflow-hidden ${
                                  canAfford
                                    ? 'bg-gradient-to-r from-blue-500/40 to-cyan-500/40 border-blue-500/40 text-white hover:shadow-lg border'
                                    : 'bg-gray-600/30 text-gray-500 cursor-not-allowed border border-gray-500/30'
                                }`}
                                onClick={() => {
                                  if (canAfford) {
                                    const mockReward: Reward = {
                                      id: `frame-${frameItem.id}`,
                                      name: `Marco ${frameData.name}`,
                                      image: '🖼️',
                                      coins: frameItem.price,
                                      category: 'Marcos',
                                      available: true,
                                      frameId: frameItem.id
                                    };
                                    purchaseShopItem(mockReward);
                                  }
                                }}
                              >
                                <span className="relative z-10 flex items-center justify-center space-x-2">
                                  {!canAfford ? (
                                    <>
                                      <Clock className="w-4 h-4" />
                                      <span>INSUFICIENTES</span>
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingCart className="w-4 h-4" />
                                      <span>¡COMPRAR!</span>
                                    </>
                                  )}
                                </span>
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              )}

              {/* Contenido especial para Banners */}
              {category === 'Banners' && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {shopItems.banners
                    .filter(bannerItem => !ownedBanners.includes(bannerItem.id))
                    .map((bannerItem, index) => {
                      const bannerData = bannerOptions.find(b => b.id === bannerItem.id);
                      if (!bannerData) return null;
                      
                      const canAfford = playerCoins >= bannerItem.price;
                      const isPremium = bannerItem.price >= 1000;
                      
                      return (
                        <motion.div
                          key={bannerItem.id}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 120,
                            damping: 15
                          }}
                          whileHover={{ 
                            scale: 1.05, 
                            rotateY: 3,
                            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                          }}
                          className={`relative rounded-xl p-5 border transition-all cursor-pointer group overflow-hidden ${
                            canAfford 
                              ? `bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/40 hover:shadow-2xl` 
                              : 'bg-gradient-to-br from-gray-500/5 to-gray-600/10 border-gray-500/20 opacity-60'
                          }`}
                        >
                          {isPremium && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                              💎 PREMIUM
                            </div>
                          )}

                          <div className={`absolute -top-2 -left-2 px-2 py-1 rounded-full text-xs font-bold border ${
                            bannerItem.rarity === 'mythic' ? 'bg-red-500/90 border-red-400 text-white' :
                            bannerItem.rarity === 'legendary' ? 'bg-yellow-500/90 border-yellow-400 text-black' :
                            bannerItem.rarity === 'epic' ? 'bg-purple-500/90 border-purple-400 text-white' :
                            bannerItem.rarity === 'rare' ? 'bg-blue-500/90 border-blue-400 text-white' :
                            'bg-gray-500/90 border-gray-400 text-white'
                          }`}>
                            {bannerItem.rarity === 'mythic' ? '🌟' :
                             bannerItem.rarity === 'legendary' ? '👑' :
                             bannerItem.rarity === 'epic' ? '💜' :
                             bannerItem.rarity === 'rare' ? '💙' : '⚪'}
                          </div>

                          <div className="relative z-10">
                            <div className="text-center mb-4">
                              <div className={`w-full h-12 rounded-lg mx-auto mb-3 relative ${getBannerClassName(bannerItem.id)}`}></div>
                              
                              <h4 className={`font-bold text-sm mb-2 line-clamp-2 min-h-[2.5rem] font-orbitron ${
                                canAfford ? 'text-white' : 'text-gray-500'
                              }`}>
                                Banner {bannerData.name}
                              </h4>
                              
                              <p className={`text-xs mb-2 ${
                                canAfford ? 'text-gray-300' : 'text-gray-500'
                              }`}>
                                {bannerData.description}
                              </p>
                              
                              <div className={`text-xs px-3 py-1 rounded-full inline-block border ${
                                canAfford 
                                  ? 'text-purple-400 border-purple-500/40 bg-white/10' 
                                  : 'text-gray-500 border-gray-500/30 bg-gray-500/10'
                              }`}>
                                {bannerItem.rarity?.toUpperCase()}
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center justify-center space-x-2">
                                <Coins className={`w-5 h-5 ${canAfford ? 'text-yellow-400' : 'text-gray-500'}`} />
                                <span className={`font-bold text-lg font-jetbrains ${
                                  canAfford ? 'text-yellow-300' : 'text-gray-500'
                                }`}>
                                  {bannerItem.price.toLocaleString()}
                                </span>
                              </div>

                              <motion.button
                                whileHover={{ scale: canAfford ? 1.05 : 1 }}
                                whileTap={{ scale: canAfford ? 0.95 : 1 }}
                                disabled={!canAfford}
                                className={`w-full py-3 rounded-lg font-bold text-sm font-orbitron transition-all relative overflow-hidden ${
                                  canAfford
                                    ? 'bg-gradient-to-r from-purple-500/40 to-pink-500/40 border-purple-500/40 text-white hover:shadow-lg border'
                                    : 'bg-gray-600/30 text-gray-500 cursor-not-allowed border border-gray-500/30'
                                }`}
                                onClick={() => {
                                  if (canAfford) {
                                    const mockReward: Reward = {
                                      id: `banner-${bannerItem.id}`,
                                      name: `Banner ${bannerData.name}`,
                                      image: '🎨',
                                      coins: bannerItem.price,
                                      category: 'Banners',
                                      available: true,
                                      bannerId: bannerItem.id
                                    };
                                    purchaseShopItem(mockReward);
                                  }
                                }}
                              >
                                <span className="relative z-10 flex items-center justify-center space-x-2">
                                  {!canAfford ? (
                                    <>
                                      <Clock className="w-4 h-4" />
                                      <span>INSUFICIENTES</span>
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingCart className="w-4 h-4" />
                                      <span>¡COMPRAR!</span>
                                    </>
                                  )}
                                </span>
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
