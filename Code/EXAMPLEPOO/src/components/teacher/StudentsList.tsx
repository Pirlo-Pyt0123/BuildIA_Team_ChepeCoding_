import { motion } from 'framer-motion';
import { StudentProgress } from './types';

interface StudentsListProps {
  students: StudentProgress[];
}

export default function StudentsList({ students }: StudentsListProps) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'excellent': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'good': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'average': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'needs_attention': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Bueno';
      case 'average': return 'Promedio';
      case 'needs_attention': return 'Requiere Atención';
      default: return 'Sin Evaluar';
    }
  };

  return (
    <div className="teacher-card glass-effect rounded-xl p-6">
      <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Lista Detallada de Estudiantes</h3>
      
      <div className="space-y-3">
        {students.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white/5 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all space-y-3 md:space-y-0"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full flex items-center justify-center font-bold text-white font-orbitron">
                {student.avatar}
              </div>
              <div>
                <h4 className="font-semibold text-white font-orbitron">{student.name}</h4>
                <p className="text-gray-400 text-sm font-rajdhani">{student.class} • {student.email}</p>
                <p className="text-purple-300 text-xs font-rajdhani">Última actividad: {student.lastActivity}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-lg font-bold text-purple-400 font-orbitron">Nivel {student.level}</p>
                <p className="text-xs text-gray-400">{student.xp} XP</p>
              </div>
              
              <div className="text-center">
                <p className="text-lg font-bold text-blue-400 font-orbitron">{student.progress}%</p>
                <p className="text-xs text-gray-400">Progreso</p>
              </div>
              
              <div className="text-center">
                <p className="text-lg font-bold text-green-400 font-orbitron">{student.achievements}</p>
                <p className="text-xs text-gray-400">Logros</p>
              </div>
              
              <div className={`px-4 py-2 rounded-full text-sm font-rajdhani border ${getStatusColor(student.status)}`}>
                {getStatusLabel(student.status)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
