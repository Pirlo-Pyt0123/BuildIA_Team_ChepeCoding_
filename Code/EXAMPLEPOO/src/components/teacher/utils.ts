// Utility functions for Teacher Dashboard components

export const getStatusColor = (status: string) => {
  switch(status) {
    case 'excellent': return 'text-green-400 bg-green-500/20 border-green-500/30';
    case 'good': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    case 'average': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    case 'needs_attention': return 'text-red-400 bg-red-500/20 border-red-500/30';
    default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
  }
};

export const getStatusLabel = (status: string) => {
  switch(status) {
    case 'excellent': return 'Excelente';
    case 'good': return 'Bueno';
    case 'average': return 'Promedio';
    case 'needs_attention': return 'Requiere Atención';
    default: return 'Sin Evaluar';
  }
};
