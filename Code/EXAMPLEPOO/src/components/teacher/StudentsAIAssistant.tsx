import { motion } from 'framer-motion';
import { Brain, Lightbulb, MessageSquare, Send, Sparkles, Zap } from 'lucide-react';
import { AIQuickAction, AISuggestion } from './types';

interface StudentsAIAssistantProps {
  suggestions: AISuggestion[];
  quickActions: AIQuickAction[];
  chatHistory: Array<{id: string, type: 'user' | 'ai', message: string, time: string}>;
  chatInput: string;
  setChatInput: (input: string) => void;
  isTyping: boolean;
  onSendMessage: (message?: string) => void;
  onSuggestionClick: (suggestion: AISuggestion) => void;
  onQuickActionClick: (action: AIQuickAction) => void;
}

export default function StudentsAIAssistant({
  suggestions,
  quickActions,
  chatHistory,
  chatInput,
  setChatInput,
  isTyping,
  onSendMessage,
  onSuggestionClick,
  onQuickActionClick
}: StudentsAIAssistantProps) {
  const getAISuggestionColor = (type: string) => {
    switch(type) {
      case 'analysis': return 'bg-purple-500/20 text-purple-400';
      case 'suggestion': return 'bg-yellow-500/20 text-yellow-400';
      case 'insight': return 'bg-pink-500/20 text-pink-400';
      case 'action': return 'bg-green-500/20 text-green-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header del Asistente IA */}
      <div className="teacher-card glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center professional-glow">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-orbitron gradient-text-accent">Asistente IA Educativo</h2>
              <p className="text-gray-400 font-rajdhani">Tu compañero inteligente para estrategias pedagógicas</p>
            </div>
          </div>
        </div>

        {/* AI Suggestions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {suggestions.slice(0, 3).map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSuggestionClick(suggestion)}
              className={`p-4 rounded-xl border cursor-pointer transition-all hover:scale-105 ${getAISuggestionColor(suggestion.type)} border-current/30`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <suggestion.icon className="w-5 h-5 mt-1" />
                <div className="flex-1">
                  <h4 className="font-semibold font-orbitron mb-1">{suggestion.title}</h4>
                  <p className="text-xs opacity-80 font-rajdhani">{suggestion.description}</p>
                </div>
              </div>
              <div className="text-xs bg-black/20 px-2 py-1 rounded font-rajdhani">
                {suggestion.category}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onQuickActionClick(action)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 rounded-lg border border-gray-600/50 transition-all font-rajdhani text-sm"
            >
              <action.icon className="w-4 h-4" />
              <span>{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="teacher-card glass-effect rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <MessageSquare className="w-5 h-5 text-violet-350" />
          <h3 className="text-xl font-bold font-orbitron gradient-text-accent">Conversación con IA</h3>
        </div>

        {/* Chat Messages */}
        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto ai-chat-container">
          {chatHistory.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <Brain className="w-12 h-12 mx-auto mb-4 text-violet-400" />
              <p className="font-orbitron">¡Hola! Soy tu asistente educativo inteligente.</p>
              <p className="text-sm font-rajdhani mt-2">Pregúntame sobre estrategias de enseñanza, análisis de estudiantes, o cualquier duda pedagógica.</p>
            </div>
          ) : (
            chatHistory.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-xl ${
                  message.type === 'user' 
                    ? 'bg-purple-500/20 text-purple-100 border border-purple-500/30' 
                    : 'bg-violet-500/20 text-violet-100 border border-violet-500/30'
                }`}>
                  <p className="font-rajdhani">{message.message}</p>
                  <p className="text-xs opacity-60 mt-2">{message.time}</p>
                </div>
              </motion.div>
            ))
          )}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-violet-500/20 text-violet-100 border border-violet-500/30 p-4 rounded-xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Chat Input */}
        <div className="flex space-x-3">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="Pregunta algo al asistente IA..."
            className="flex-1 px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 font-rajdhani focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20"
          />
          <button
            onClick={() => onSendMessage()}
            disabled={!chatInput.trim()}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-lg font-orbitron font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* AI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="teacher-card glass-effect rounded-xl p-4 text-center">
          <Brain className="w-8 h-8 mx-auto mb-2 text-violet-400" />
          <p className="text-2xl font-bold text-violet-400 font-orbitron">{chatHistory.length}</p>
          <p className="text-xs text-gray-400">Conversaciones</p>
        </div>
        <div className="teacher-card glass-effect rounded-xl p-4 text-center">
          <Lightbulb className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
          <p className="text-2xl font-bold text-yellow-400 font-orbitron">12</p>
          <p className="text-xs text-gray-400">Sugerencias</p>
        </div>
        <div className="teacher-card glass-effect rounded-xl p-4 text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-2 text-pink-400" />
          <p className="text-2xl font-bold text-pink-400 font-orbitron">8</p>
          <p className="text-xs text-gray-400">Insights</p>
        </div>
        <div className="teacher-card glass-effect rounded-xl p-4 text-center">
          <Zap className="w-8 h-8 mx-auto mb-2 text-green-400" />
          <p className="text-2xl font-bold text-green-400 font-orbitron">95%</p>
          <p className="text-xs text-gray-400">Precisión</p>
        </div>
      </div>
    </div>
  );
}
