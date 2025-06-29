import { motion } from 'framer-motion';
import { ArrowLeft, Download, FolderPlus, Image, Palette, Upload } from 'lucide-react';
import { useState } from 'react';
import ImageManager from '../components/ui/ImageManager';

interface ImageGalleryPageProps {
  onBack: () => void;
  userRole: 'student' | 'teacher';
}

interface GalleryStats {
  totalImages: number;
  totalSize: string;
  categories: number;
  recentUploads: number;
}

export default function ImageGalleryPage({ onBack, userRole }: ImageGalleryPageProps) {
  const [showImageManager, setShowImageManager] = useState(true);
  
  const stats: GalleryStats = {
    totalImages: 156,
    totalSize: '45.7 MB',
    categories: 6,
    recentUploads: 12
  };

  const quickActions = [
    {
      id: 'upload',
      title: 'Subir Imágenes',
      description: 'Agrega nuevas imágenes a tu galería',
      icon: Upload,
      color: 'blue',
      action: () => setShowImageManager(true)
    },
    {
      id: 'organize',
      title: 'Organizar',
      description: 'Crea categorías y organiza tu contenido',
      icon: FolderPlus,
      color: 'purple',
      action: () => console.log('Organizar')
    },
    {
      id: 'customize',
      title: 'Personalizar',
      description: 'Edita y personaliza tus imágenes',
      icon: Palette,
      color: 'pink',
      action: () => console.log('Personalizar')
    },
    {
      id: 'export',
      title: 'Exportar',
      description: 'Descarga tus imágenes organizadas',
      icon: Download,
      color: 'green',
      action: () => console.log('Exportar')
    }
  ];

  const recentImages = [
    { id: '1', name: 'avatar-nuevo.png', url: '/api/placeholder/100/100', date: 'Hoy' },
    { id: '2', name: 'banner-ciencias.jpg', url: '/api/placeholder/100/100', date: 'Ayer' },
    { id: '3', name: 'logro-maestro.svg', url: '/api/placeholder/100/100', date: '2 días' },
    { id: '4', name: 'fondo-matematicas.jpg', url: '/api/placeholder/100/100', date: '3 días' }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-cyan-400 border-blue-500/30 text-blue-300';
      case 'purple': return 'from-purple-500 to-violet-400 border-purple-500/30 text-purple-300';
      case 'pink': return 'from-pink-500 to-rose-400 border-pink-500/30 text-pink-300';
      case 'green': return 'from-green-500 to-emerald-400 border-green-500/30 text-green-300';
      default: return 'from-gray-500 to-gray-400 border-gray-500/30 text-gray-300';
    }
  };

  return (
    <div className={`min-h-screen bg-black relative overflow-hidden ${userRole === 'teacher' ? 'teacher-theme' : 'student-theme'}`}>
      {/* Fondo con grid sutil */}
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      
      {/* Ambient glow */}
      <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${userRole === 'teacher' ? 'bg-purple-500/3' : 'bg-blue-500/3'} rounded-full blur-3xl subtle-pulse`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 ${userRole === 'teacher' ? 'bg-violet-500/3' : 'bg-cyan-500/3'} rounded-full blur-3xl subtle-pulse`} style={{ animationDelay: '1.5s' }}></div>

      {/* Header */}
      <header className="glass-effect border-b border-purple-500/20 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className={`p-2 rounded-lg transition-colors ${userRole === 'teacher' ? 'hover:bg-purple-500/20 text-purple-400' : 'hover:bg-blue-500/20 text-blue-400'}`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${userRole === 'teacher' ? 'from-purple-500 to-violet-400' : 'from-blue-500 to-cyan-400'} rounded-lg flex items-center justify-center`}>
                  <Image className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold font-orbitron gradient-text-accent">
                    Galería de Imágenes
                  </h1>
                  <p className="text-gray-400 text-sm font-rajdhani">
                    Gestiona tus recursos visuales
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowImageManager(true)}
              className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${userRole === 'teacher' ? 'from-purple-500 to-violet-400 hover:from-purple-600 hover:to-violet-500' : 'from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'} text-white rounded-lg transition-all font-rajdhani`}
            >
              <Upload className="w-4 h-4" />
              <span>Abrir Gestor</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-xl p-6 text-center hover-lift"
            >
              <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${userRole === 'teacher' ? 'from-purple-500/20 to-violet-400/20 border-purple-500/30' : 'from-blue-500/20 to-cyan-400/20 border-blue-500/30'} rounded-lg flex items-center justify-center border`}>
                <Image className={`w-6 h-6 ${userRole === 'teacher' ? 'text-purple-400' : 'text-blue-400'}`} />
              </div>
              <h3 className="font-semibold font-orbitron text-white mb-1">Total</h3>
              <p className={`text-2xl font-bold font-jetbrains ${userRole === 'teacher' ? 'text-purple-300' : 'text-blue-300'}`}>{stats.totalImages}</p>
              <p className="text-gray-400 text-xs">imágenes</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-xl p-6 text-center hover-lift"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-green-500/20 to-emerald-400/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                <FolderPlus className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-semibold font-orbitron text-white mb-1">Espacio</h3>
              <p className="text-2xl font-bold font-jetbrains text-green-300">{stats.totalSize}</p>
              <p className="text-gray-400 text-xs">utilizados</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-effect rounded-xl p-6 text-center hover-lift"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-yellow-500/20 to-orange-400/20 border border-yellow-500/30 rounded-lg flex items-center justify-center">
                <FolderPlus className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="font-semibold font-orbitron text-white mb-1">Categorías</h3>
              <p className="text-2xl font-bold font-jetbrains text-yellow-300">{stats.categories}</p>
              <p className="text-gray-400 text-xs">organizadas</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-xl p-6 text-center hover-lift"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-pink-500/20 to-rose-400/20 border border-pink-500/30 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="font-semibold font-orbitron text-white mb-1">Recientes</h3>
              <p className="text-2xl font-bold font-jetbrains text-pink-300">{stats.recentUploads}</p>
              <p className="text-gray-400 text-xs">esta semana</p>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-bold font-orbitron gradient-text-accent mb-6">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-effect rounded-xl p-6 cursor-pointer hover-lift group"
                  onClick={action.action}
                >
                  <div className={`w-12 h-12 mb-4 bg-gradient-to-r ${getColorClasses(action.color)} rounded-lg flex items-center justify-center border group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold font-orbitron text-white mb-2">{action.title}</h3>
                  <p className="text-gray-400 text-sm font-rajdhani">{action.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Images */}
          <div>
            <h2 className="text-2xl font-bold font-orbitron gradient-text-accent mb-6">Imágenes Recientes</h2>
            <div className="glass-effect rounded-xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recentImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="group cursor-pointer"
                    onClick={() => setShowImageManager(true)}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden border border-purple-500/20 hover:border-purple-400/50 transition-colors">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-white truncate">{image.name}</p>
                      <p className="text-xs text-gray-400">{image.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowImageManager(true)}
                  className={`px-6 py-3 bg-gradient-to-r ${userRole === 'teacher' ? 'from-purple-500 to-violet-400 hover:from-purple-600 hover:to-violet-500' : 'from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'} text-white rounded-lg transition-all font-rajdhani font-semibold`}
                >
                  Ver Todas las Imágenes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Image Manager Modal */}
      <ImageManager
        isOpen={showImageManager}
        onClose={() => setShowImageManager(false)}
        mode="manage"
      />
    </div>
  );
}
