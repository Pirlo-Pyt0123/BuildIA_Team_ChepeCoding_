import { AnimatePresence, motion } from 'framer-motion';
import { Grid, Image as ImageIcon, List, Search, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface ImageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
  title?: string;
  maxSelection?: number;
  aspectRatio?: 'square' | '16:9' | '4:3' | 'any';
  category?: string;
}

interface UserImage {
  id: string;
  name: string;
  url: string;
  size: string;
  category: string;
  createdAt: string;
  aspectRatio: string;
}

export default function ImageSelector({
  isOpen,
  onClose,
  onSelectImage,
  title = 'Seleccionar Imagen',
  maxSelection = 1,
  aspectRatio = 'any',
  category = 'all'
}: ImageSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Imágenes de ejemplo del localStorage (simulando persistencia)
  const mockImages: UserImage[] = [
    {
      id: '1',
      name: 'Avatar Cósmico',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmsiaHR0cDovL3d3dy93My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzY2NmFmZiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzMzZDRmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI2EpIiByeD0iNTAiLz48L3N2Zz4=',
      size: '2.3 KB',
      category: 'avatares',
      createdAt: '2024-01-15',
      aspectRatio: 'square'
    },
    {
      id: '2',
      name: 'Banner Futurista',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmsiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzgwMDBmZiIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmMDA4MCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSJ1cmwoI2IpIiByeD0iMTAiLz48L3N2Zz4=',
      size: '3.1 KB',
      category: 'banners',
      createdAt: '2024-01-14',
      aspectRatio: '16:9'
    },
    {
      id: '3',
      name: 'Icono Matemáticas',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmsiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwZmY4MCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwODBmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI2MpIiByeD0iMTUiLz48dGV4dCB4PSI1MCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPiZwaTsmbGU7L3RleHQ+PC9zdmc+',
      size: '1.8 KB',
      category: 'iconos',
      createdAt: '2024-01-13',
      aspectRatio: 'square'
    },
    {
      id: '4',
      name: 'Certificado Oro',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjE4MCIgdmsiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZDcwMCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2ZmOGYwMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMTgwIiBmaWxsPSJ1cmwoI2QpIiByeD0iMTAiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSI5MCIgcj0iNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNCIvPjx0ZXh0IHg9IjEyMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn4+GPC90ZXh0Pjwvc3ZnPg==',
      size: '2.7 KB',
      category: 'certificados',
      createdAt: '2024-01-12',
      aspectRatio: '4:3'
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', count: mockImages.length },
    { id: 'avatares', name: 'Avatares', count: mockImages.filter(img => img.category === 'avatares').length },
    { id: 'banners', name: 'Banners', count: mockImages.filter(img => img.category === 'banners').length },
    { id: 'iconos', name: 'Iconos', count: mockImages.filter(img => img.category === 'iconos').length },
    { id: 'certificados', name: 'Certificados', count: mockImages.filter(img => img.category === 'certificados').length }
  ];

  const filteredImages = mockImages.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesAspectRatio = aspectRatio === 'any' || image.aspectRatio === aspectRatio;
    return matchesSearch && matchesCategory && matchesAspectRatio;
  });

  const handleImageSelect = (imageUrl: string) => {
    if (maxSelection === 1) {
      onSelectImage(imageUrl);
      onClose();
    } else {
      if (selectedImages.includes(imageUrl)) {
        setSelectedImages(selectedImages.filter(url => url !== imageUrl));
      } else if (selectedImages.length < maxSelection) {
        setSelectedImages([...selectedImages, imageUrl]);
      }
    }
  };

  const handleConfirmSelection = () => {
    if (selectedImages.length > 0) {
      onSelectImage(selectedImages[0]); // Por simplicidad, solo devolvemos la primera
      onClose();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const imageUrl = e.target.result as string;
          onSelectImage(imageUrl);
          onClose();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-2xl border border-blue-500/20 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Toolbar */}
          <div className="p-4 border-b border-gray-800 bg-gray-900/50">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar imágenes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Subir</span>
                </button>
                
                <div className="flex border border-gray-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'} transition-colors`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'} transition-colors`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="ml-2 opacity-60">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4 max-h-[500px]">
            {filteredImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-lg font-medium">No hay imágenes</p>
                <p className="text-sm">Sube tu primera imagen o modifica los filtros</p>
              </div>
            ) : (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4' 
                  : 'space-y-2'
              }`}>
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`${
                      viewMode === 'grid' 
                        ? 'aspect-square' 
                        : 'flex items-center space-x-3 p-3'
                    } cursor-pointer group relative`}
                    onClick={() => handleImageSelect(image.url)}
                  >
                    {viewMode === 'grid' ? (
                      <>
                        <div className="w-full h-full rounded-lg overflow-hidden bg-gray-800 border-2 transition-colors group-hover:border-blue-500">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <div className="text-white text-center">
                            <p className="font-medium text-sm truncate px-2">{image.name}</p>
                            <p className="text-xs opacity-75">{image.size}</p>
                          </div>
                        </div>
                        {selectedImages.includes(image.url) && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 border border-gray-700 group-hover:border-blue-500 transition-colors">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">{image.name}</p>
                          <p className="text-sm text-gray-400">{image.category} • {image.size}</p>
                          <p className="text-xs text-gray-500">{image.createdAt}</p>
                        </div>
                        {selectedImages.includes(image.url) && (
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer (solo si permite múltiple selección) */}
          {maxSelection > 1 && (
            <div className="p-4 border-t border-gray-800 bg-gray-900/50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  {selectedImages.length} de {maxSelection} seleccionadas
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmSelection}
                    disabled={selectedImages.length === 0}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-400 text-white rounded-lg transition-colors"
                  >
                    Confirmar Selección
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
