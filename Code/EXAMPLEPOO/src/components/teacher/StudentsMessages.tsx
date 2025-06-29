import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { StudentMessage } from './types';

interface StudentsMessagesProps {
  messages: StudentMessage[];
}

export default function StudentsMessages({ messages }: StudentsMessagesProps) {
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Resumen de mensajes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="teacher-card glass-effect rounded-xl p-4 text-center">
          <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-400" />
          <p className="text-2xl font-bold text-blue-400 font-orbitron">{messages.length}</p>
          <p className="text-xs text-gray-400">Total Mensajes</p>
        </div>
        <div className="teacher-card glass-effect rounded-xl p-4 text-center">
          <MessageSquare className="w-8 h-8 mx-auto mb-2 text-red-400" />
          <p className="text-2xl font-bold text-red-400 font-orbitron">{messages.filter(m => m.unread).length}</p>
          <p className="text-xs text-gray-400">Sin Leer</p>
        </div>
        <div className="teacher-card glass-effect rounded-xl p-4 text-center">
          <MessageSquare className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
          <p className="text-2xl font-bold text-yellow-400 font-orbitron">{messages.filter(m => m.priority === 'high').length}</p>
          <p className="text-xs text-gray-400">Alta Prioridad</p>
        </div>
      </div>

      {/* Lista de mensajes */}
      <div className="teacher-card glass-effect rounded-xl p-6">
        <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Mensajes de Estudiantes</h3>
        
        <div className="space-y-3">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-lg border transition-all hover:border-purple-400/40 ${
                message.unread 
                  ? 'bg-purple-500/10 border-purple-500/30' 
                  : 'bg-white/5 border-purple-500/20'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full flex items-center justify-center font-bold text-white text-sm font-orbitron">
                    {message.student.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white font-orbitron">{message.student}</h4>
                    <p className="text-gray-400 text-xs font-rajdhani">{message.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-rajdhani ${getPriorityColor(message.priority)}`}>
                    {message.priority}
                  </span>
                  {message.unread && (
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  )}
                </div>
              </div>
              
              <p className="text-gray-300 font-rajdhani">{message.message}</p>
              
              <div className="mt-3 flex items-center space-x-3">
                <button className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded text-sm font-rajdhani hover:bg-purple-500/30 transition-colors">
                  Responder
                </button>
                <button className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded text-sm font-rajdhani hover:bg-gray-500/30 transition-colors">
                  Marcar como leído
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
