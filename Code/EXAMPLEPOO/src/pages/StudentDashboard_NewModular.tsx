import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

// Importar los componentes separados
import Navigation from '../components/student/Navigation';
import DashboardView from '../components/student/DashboardView';
import ChallengesView from '../components/student/ChallengesView';
import { ShopView } from '../components/student/ShopView';
import RankingsView from '../components/student/RankingsView';
import ProfileView from '../components/student/ProfileView';
import {
  StudentData,
  Challenge,
  Reward,
  BannerOption,
  FrameOption,
  ActiveTab
} from '../components/student/types';

interface StudentDashboardProps {
  onLogout: () => void;
}

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [selectedAvatar] = useState<string>('A');
  const [selectedBanner, setSelectedBanner] = useState<string>('cosmic');
  const [selectedFrame, setSelectedFrame] = useState<string>('classic');
  
  // Estados para el sistema de compras
  const [playerCoins, setPlayerCoins] = useState<number>(2500);
  const [ownedFrames, setOwnedFrames] = useState<string[]>(['none', 'classic']);
  const [ownedBanners, setOwnedBanners] = useState<string[]>(['cosmic', 'ocean', 'forest']);
  
  // Estados para notificaciones de compra
  const [purchaseNotification, setPurchaseNotification] = useState<{
    visible: boolean;
    type: 'success' | 'error';
    message: string;
    itemName?: string;
  }>({
    visible: false,
    type: 'success',
    message: ''
  });

  // Datos del estudiante actuales con el sistema de personalización
  const studentData: StudentData = {
    name: "Alex Rivera",
    avatar: selectedAvatar,
    coins: playerCoins,
    level: 15,
    experience: 750,
    maxExperience: 1000,
    weeklyProgress: 68,
    ranking: { course: 3, school: 12, country: 156 },
    totalXP: 12450,
    challengesCompleted: 42,
    winStreak: 7,
    perfectScores: 15,
    totalStudyTime: '127h 32m',
    favoriteTime: 'Tarde (14:00 - 18:00)',
    learningStyle: 'Visual',
    achievements: [
      { id: 'first_challenge', name: 'Primer Desafío', icon: '🎯', description: 'Completaste tu primer desafío', date: '2024-01-20' },
      { id: 'math_master', name: 'Maestro Matemático', icon: '🧮', description: 'Completaste 10 desafíos de matemáticas', date: '2024-02-15' },
      { id: 'streak_5', name: 'Racha de 5', icon: '🔥', description: 'Ganaste 5 desafíos consecutivos', date: '2024-03-01' },
      { id: 'top_student', name: 'Estudiante Destacado', icon: '⭐', description: 'Alcanzaste el top 3 de tu clase', date: '2024-03-10' },
      { id: 'science_explorer', name: 'Explorador Científico', icon: '🔬', description: 'Completaste 5 desafíos de ciencias', date: '2024-03-20' },
      { id: 'coin_collector', name: 'Coleccionista', icon: '💰', description: 'Acumulaste 1000 monedas', date: '2024-04-01' }
    ],
    stats: {
      accuracy: 87,
      avgTime: '3m 45s',
      bestSubject: 'Matemáticas',
      improvement: '+12%'
    }
  };

  // Opciones de personalización - Banners
  const bannerOptions: BannerOption[] = [
    { id: 'cosmic', name: 'Prueba 1', gradient: 'from-purple-900 via-blue-900 to-indigo-900', description: 'Explora las estrellas', type: 'gradient' },
    { id: 'ocean', name: 'Prueba 2', gradient: 'from-blue-900 via-cyan-900 to-teal-900', description: 'Profundidades marinas', type: 'gradient' },
    { id: 'forest', name: 'Prueba 3', gradient: 'from-green-900 via-emerald-900 to-teal-900', description: 'Naturaleza salvaje', type: 'gradient' },
    { id: 'sunset', name: 'Prueba 4', gradient: 'from-orange-900 via-red-900 to-pink-900', description: 'Cielos dorados', type: 'gradient' },
    { id: 'neon', name: 'Prueba 5', gradient: 'from-pink-900 via-purple-900 to-indigo-900', description: 'Ciudad futurista', type: 'gradient' },
    { id: 'galaxy', name: 'Prueba 6', gradient: 'from-indigo-900 via-purple-900 to-pink-900', description: 'Espacio infinito', type: 'gradient' }
  ];

  // Opciones de personalización - Marcos
  const frameOptions: FrameOption[] = [
    { id: 'none', name: 'Sin Marco', className: '', description: 'Avatar sin marco' },
    { id: 'classic', name: 'Clásico', className: 'border-2 border-blue-500 bg-gradient-to-r from-gray-800 to-gray-700', description: 'Marco azul elegante' },
    { id: 'gold', name: 'Dorado', className: 'border-2 border-yellow-400 bg-gradient-to-r from-gray-800 to-gray-700', description: 'Marco dorado premium' },
    { id: 'silver', name: 'Plateado', className: 'border-2 border-gray-400 bg-gradient-to-r from-gray-800 to-gray-700', description: 'Marco plateado moderno' },
    { id: 'bronze', name: 'Bronce', className: 'border-2 border-orange-600 bg-gradient-to-r from-gray-800 to-gray-700', description: 'Marco de bronce' }
  ];

  // Shop items data
  const shopItems = {
    frames: [
      { id: 'gold', price: 200, rarity: 'common' },
      { id: 'silver', price: 150, rarity: 'common' },
      { id: 'bronze', price: 100, rarity: 'common' },
      { id: 'neon-blue', price: 300, rarity: 'rare' },
      { id: 'neon-purple', price: 300, rarity: 'rare' },
      { id: 'neon-green', price: 300, rarity: 'rare' }
    ],
    banners: [
      { id: 'cosmic', price: 250, rarity: 'common' },
      { id: 'ocean', price: 300, rarity: 'common' },
      { id: 'forest', price: 350, rarity: 'rare' },
      { id: 'sunset', price: 400, rarity: 'rare' },
      { id: 'neon', price: 500, rarity: 'rare' },
      { id: 'galaxy', price: 600, rarity: 'rare' }
    ]
  };

  // Lista de desafíos activos  
  const activeChallenges: Challenge[] = [
    { id: '1', subject: 'Matemáticas', difficulty: 'medium', coins: 150, time: '45 min', participants: 28 },
    { id: '2', subject: 'Ciencias', difficulty: 'easy', coins: 100, time: '30 min', participants: 42 },
    { id: '3', subject: 'Historia', difficulty: 'hard', coins: 250, time: '60 min', participants: 15 }
  ];

  // Lista de recompensas disponibles
  const rewards: Reward[] = [
    // Marcos de avatar - Productos comprables
    ...shopItems.frames.map(frameItem => {
      const frameData = frameOptions.find(f => f.id === frameItem.id);
      if (!frameData) return undefined;
      
      return {
        id: `frame-${frameItem.id}`,
        name: `Marco ${frameData.name}`,
        image: '🖼️',
        coins: frameItem.price,
        category: 'Marcos',
        available: true,
        rarity: frameItem.rarity,
        description: frameData.description,
        frameId: frameItem.id
      };
    }).filter(Boolean) as Reward[],
    
    // Banners de perfil - Productos comprables  
    ...shopItems.banners.map(bannerItem => {
      const bannerData = bannerOptions.find(b => b.id === bannerItem.id);
      if (!bannerData) return undefined;
      
      return {
        id: `banner-${bannerItem.id}`,
        name: `Banner ${bannerData.name}`,
        image: '🎨',
        coins: bannerItem.price,
        category: 'Banners',
        available: true,
        rarity: bannerItem.rarity,
        description: bannerData.description,
        bannerId: bannerItem.id
      };
    }).filter(Boolean) as Reward[]
  ];

  // Función para comprar items de la tienda
  const purchaseShopItem = (reward: Reward) => {
    if (playerCoins >= reward.coins) {
      setPlayerCoins(prev => prev - reward.coins);
      
      // Agregar el item comprado al inventario correspondiente
      if (reward.frameId && !ownedFrames.includes(reward.frameId)) {
        setOwnedFrames(prev => [...prev, reward.frameId!]);
      }
      if (reward.bannerId && !ownedBanners.includes(reward.bannerId)) {
        setOwnedBanners(prev => [...prev, reward.bannerId!]);
      }
      
      // Mostrar notificación de éxito
      setPurchaseNotification({
        visible: true,
        type: 'success',
        message: '¡Compra exitosa!',
        itemName: reward.name
      });
      
      // Ocultar notificación después de 3 segundos
      setTimeout(() => {
        setPurchaseNotification(prev => ({ ...prev, visible: false }));
      }, 3000);
    } else {
      // Mostrar notificación de error
      setPurchaseNotification({
        visible: true,
        type: 'error',
        message: 'Monedas insuficientes',
        itemName: reward.name
      });
      
      // Ocultar notificación después de 3 segundos
      setTimeout(() => {
        setPurchaseNotification(prev => ({ ...prev, visible: false }));
      }, 3000);
    }
  };

  // Función para obtener la clase CSS de un marco
  const getFrameClassName = (frameId: string): string => {
    const frame = frameOptions.find(f => f.id === frameId);
    if (!frame) return 'bg-gradient-to-r from-blue-500 to-cyan-400';
    return frame.className;
  };

  // Función para obtener la clase CSS de un banner
  const getBannerClassName = (bannerId: string): string => {
    const banner = bannerOptions.find(b => b.id === bannerId);
    if (!banner) return 'bg-gradient-to-r from-blue-500/20 to-purple-500/20';
    return `bg-gradient-to-r ${banner.gradient}`;
  };

  // Función para mostrar notificación
  const showNotification = (type: 'success' | 'error', message: string, itemName?: string) => {
    setPurchaseNotification({ visible: true, type, message, itemName });
    setTimeout(() => {
      setPurchaseNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Función para equipar un item del inventario
  const equipInventoryItem = (itemId: string, type: 'frame' | 'banner') => {
    if (type === 'frame') {
      setSelectedFrame(itemId);
      const frameName = frameOptions.find(f => f.id === itemId)?.name || 'Marco';
      showNotification('success', `Marco ${frameName} equipado`, frameName);
    } else if (type === 'banner') {
      setSelectedBanner(itemId);
      const bannerName = bannerOptions.find(b => b.id === itemId)?.name || 'Banner';
      showNotification('success', `Banner ${bannerName} equipado`, bannerName);
    }
  };

  // Filtrar marcos y banners disponibles para personalización (solo los que posee)
  const getOwnedFrameOptions = () => {
    return frameOptions.filter(frame => ownedFrames.includes(frame.id));
  };

  const getOwnedBannerOptions = () => {
    return bannerOptions.filter(banner => ownedBanners.includes(banner.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation */}
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        playerCoins={playerCoins}
        studentLevel={studentData.level}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView 
            studentData={studentData}
            playerCoins={playerCoins}
            selectedFrame={selectedFrame}
            selectedBanner={selectedBanner}
            setActiveTab={setActiveTab}
            getFrameClassName={getFrameClassName}
          />
        )}

        {activeTab === 'challenges' && (
          <ChallengesView 
            studentData={studentData}
            activeChallenges={activeChallenges}
          />
        )}

        {activeTab === 'rankings' && (
          <RankingsView 
            studentData={studentData}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView 
            studentData={studentData}
            playerCoins={playerCoins}
            selectedBanner={selectedBanner}
            selectedFrame={selectedFrame}
            ownedFrames={ownedFrames}
            ownedBanners={ownedBanners}
            bannerOptions={bannerOptions}
            frameOptions={frameOptions}
            getBannerClassName={getBannerClassName}
            getFrameClassName={getFrameClassName}
            getOwnedFrameOptions={getOwnedFrameOptions}
            getOwnedBannerOptions={getOwnedBannerOptions}
            equipInventoryItem={equipInventoryItem}
          />
        )}

        {activeTab === 'shop' && (
          <ShopView 
            shopItems={shopItems}
            rewards={rewards}
            playerCoins={playerCoins}
            ownedFrames={ownedFrames}
            ownedBanners={ownedBanners}
            frameOptions={frameOptions}
            bannerOptions={bannerOptions}
            getFrameClassName={getFrameClassName}
            getBannerClassName={getBannerClassName}
            purchaseShopItem={purchaseShopItem}
          />
        )}
      </main>

      {/* Notificación de compra */}
      {purchaseNotification.visible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className={`p-4 rounded-xl border backdrop-blur-lg ${
            purchaseNotification.type === 'success' 
              ? 'bg-green-500/20 border-green-500/30 text-green-300' 
              : 'bg-red-500/20 border-red-500/30 text-red-300'
          }`}>
            <div className="flex items-start space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                purchaseNotification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {purchaseNotification.type === 'success' ? '✓' : '✗'}
              </div>
              <div>
                <p className="font-semibold">{purchaseNotification.message}</p>
                {purchaseNotification.itemName && (
                  <p className="text-sm opacity-75">{purchaseNotification.itemName}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
