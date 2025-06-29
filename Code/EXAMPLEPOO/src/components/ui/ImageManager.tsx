import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Image, Search, Trash2, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface ImageItem {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadDate: string;
  category: string;
  tags: string[];
  description?: string;
}

interface ImageManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage?: (image: ImageItem) => void;
  mode?: 'select' | 'manage';
}

export default function ImageManager({ isOpen, onClose, onSelectImage, mode = 'manage' }: ImageManagerProps) {
  const [images, setImages] = useState<ImageItem[]>([
    {
      id: '1',
      name: 'avatar-estudiante-1.png',
      url: '/api/placeholder/150/150',
      size: 45230,
      type: 'image/png',
      uploadDate: '2024-12-27',
      category: 'avatares',
      tags: ['avatar', 'estudiante', 'perfil'],
      description: 'Avatar por defecto para estudiantes'
    },
    {
      id: '2',
      name: 'banner-matematicas.jpg',
      url: '/api/placeholder/800/200',
      size: 123456,
      type: 'image/jpeg',
      uploadDate: '2024-12-26',
      category: 'banners',
      tags: ['banner', 'matemáticas', 'educación'],
      description: 'Banner para sección de matemáticas'
    },
    {
      id: '3',
      name: 'icono-logro-primera-estrella.svg',
      url: '/api/placeholder/100/100',
      size: 8943,
      type: 'image/svg+xml',
      uploadDate: '2024-12-25',
      category: 'logros',
      tags: ['logro', 'estrella', 'gamificación'],
      description: 'Icono para el logro "Primera Estrella"'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [copiedImageId, setCopiedImageId] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'all', name: 'Todas', count: images.length },
    { id: 'avatares', name: 'Avatares', count: images.filter(img => img.category === 'avatares').length },
    { id: 'banners', name: 'Banners', count: images.filter(img => img.category === 'banners').length },
    { id: 'logros', name: 'Logros', count: images.filter(img => img.category === 'logros').length },
    { id: 'iconos', name: 'Iconos', count: images.filter(img => img.category === 'iconos').length },
    { id: 'fondos', name: 'Fondos', count: images.filter(img => img.category === 'fondos').length }
  ];

  const filteredImages = images.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    
    // Simular upload (en producción sería una llamada real a API)
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        continue;
      }

      // Crear preview URL
      const url = URL.createObjectURL(file);
      
      const newImage: ImageItem = {
        id: Date.now().toString() + i,
        name: file.name,
        url: url,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString().split('T')[0],
        category: 'general',
        tags: ['nuevo'],
        description: ''
      };

      setImages(prev => [...prev, newImage]);
    }
    
    setIsUploading(false);
    setShowUploadModal(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const deleteImage = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
    if (selectedImage?.id === imageId) {
      setSelectedImage(null);
    }
  };

  const copyImageUrl = (image: ImageItem) => {
    navigator.clipboard.writeText(image.url);
    setCopiedImageId(image.id);
    setTimeout(() => setCopiedImageId(null), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-xl max-w-7xl w-full max-h-[90vh] overflow-hidden border border-purple-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="glass-effect border-b border-purple-500/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-400 rounded-lg flex items-center justify-center">
                <Image className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-orbitron gradient-text-accent">
                  {mode === 'select' ? 'Seleccionar Imagen' : 'Gestor de Imágenes'}
                </h2>
                <p className="text-gray-400 font-rajdhani">
                  {mode === 'select' ? 'Elige una imagen para usar' : 'Organiza y gestiona tus recursos visuales'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg hover:from-blue-600 hover:to-cyan-500 transition-all font-rajdhani"
              >
                <Upload className="w-4 h-4" />
                <span>Subir</span>
              </button>
              
              <button
                onClick={onClose}
                className="w-8 h-8 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="flex flex-col lg:flex-row gap-4 mt-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar imágenes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 font-rajdhani focus:outline-none focus:border-purple-400/50"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white font-rajdhani focus:outline-none focus:border-purple-400/50"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id} className="bg-gray-900">
                    {cat.name} ({cat.count})
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 bg-white/5 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/20 transition-colors"
              >
                {viewMode === 'grid' ? '☰' : '⊞'}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-200px)]">
          {/* Lista de imágenes */}
          <div className="flex-1 p-6 overflow-y-auto">
            {filteredImages.length === 0 ? (
              <div className="text-center py-12">
                <Image className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                <p className="text-gray-400 font-rajdhani">No se encontraron imágenes</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'
                  : 'space-y-2'
              }>
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`
                      glass-effect rounded-lg overflow-hidden cursor-pointer transition-all hover:border-purple-400/50 group
                      ${viewMode === 'grid' ? 'aspect-square' : 'flex items-center space-x-4 p-3'}
                      ${selectedImage?.id === image.id ? 'border-purple-400 bg-purple-500/10' : 'border-purple-500/20'}
                    `}
                    onClick={() => setSelectedImage(image)}
                    onDoubleClick={() => mode === 'select' && onSelectImage?.(image)}
                  >
                    {viewMode === 'grid' ? (
                      <div className="h-full flex flex-col">
                        <div className="flex-1 relative overflow-hidden">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="flex space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyImageUrl(image);
                                }}
                                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                              >
                                {copiedImageId === image.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white" />}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteImage(image.id);
                                }}
                                className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="text-xs text-gray-300 font-rajdhani truncate">{image.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-white font-orbitron">{image.name}</h4>
                          <p className="text-sm text-gray-400 font-rajdhani">{image.category} • {formatFileSize(image.size)}</p>
                          <p className="text-xs text-gray-500">{image.uploadDate}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyImageUrl(image);
                            }}
                            className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            {copiedImageId === image.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteImage(image.id);
                            }}
                            className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Panel de detalles */}
          {selectedImage && (
            <div className="w-80 border-l border-purple-500/20 p-6 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.name}
                    className="w-full rounded-lg border border-purple-500/20"
                  />
                </div>
                
                <div>
                  <h3 className="font-bold text-white font-orbitron mb-2">{selectedImage.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tamaño:</span>
                      <span className="text-white">{formatFileSize(selectedImage.size)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tipo:</span>
                      <span className="text-white">{selectedImage.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Categoría:</span>
                      <span className="text-white">{selectedImage.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fecha:</span>
                      <span className="text-white">{selectedImage.uploadDate}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Etiquetas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedImage.description && (
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-2">Descripción</h4>
                    <p className="text-gray-400 text-sm">{selectedImage.description}</p>
                  </div>
                )}

                {mode === 'select' && (
                  <button
                    onClick={() => onSelectImage?.(selectedImage)}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-400 text-white rounded-lg hover:from-purple-600 hover:to-violet-500 transition-all font-rajdhani font-semibold"
                  >
                    Seleccionar esta imagen
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Modal de subida */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Subir Imágenes</h3>
              
              <div
                className="border-2 border-dashed border-purple-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-purple-400/50 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <p className="text-gray-300 font-rajdhani mb-2">
                  Arrastra archivos aquí o haz clic para seleccionar
                </p>
                <p className="text-gray-500 text-sm">
                  PNG, JPG, GIF, SVG hasta 10MB
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              />

              {isUploading && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center space-x-2 text-purple-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                    <span className="font-rajdhani">Subiendo...</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
