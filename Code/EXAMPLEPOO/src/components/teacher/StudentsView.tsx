import { motion } from 'framer-motion';
import { BarChart3, Bot, Home, MessageSquare, Search, Users } from 'lucide-react';
import StudentsAIAssistant from './StudentsAIAssistant';
import StudentsList from './StudentsList';
import StudentsMessages from './StudentsMessages';
import StudentsOverview from './StudentsOverview';
import StudentsPerformance from './StudentsPerformance';
import { AIQuickAction, AISuggestion, ClassStats, SortBy, StudentMessage, StudentProgress, StudentsView as StudentsViewType } from './types';

interface StudentsViewProps {
  studentsView: StudentsViewType;
  setStudentsView: (view: StudentsViewType) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: SortBy;
  setSortBy: (sort: SortBy) => void;
  filteredAndSortedStudents: StudentProgress[];
  classStats: ClassStats[];
  studentMessages: StudentMessage[];
  selectedClass: string;
  aiSuggestions: AISuggestion[];
  aiQuickActions: AIQuickAction[];
  aiChatHistory: Array<{id: string, type: 'user' | 'ai', message: string, time: string}>;
  aiChatInput: string;
  setAiChatInput: (input: string) => void;
  aiTyping: boolean;
  handleAIChat: (message?: string) => void;
  handleAISuggestionClick: (suggestion: AISuggestion) => void;
  handleAIQuickAction: (action: AIQuickAction) => void;
}

export default function StudentsView({
  studentsView,
  setStudentsView,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  filteredAndSortedStudents,
  classStats,
  studentMessages,
  selectedClass,
  aiSuggestions,
  aiQuickActions,
  aiChatHistory,
  aiChatInput,
  setAiChatInput,
  aiTyping,
  handleAIChat,
  handleAISuggestionClick,
  handleAIQuickAction
}: StudentsViewProps) {
  const tabs = [
    { id: 'overview', label: 'Vista General', icon: Home },
    { id: 'list', label: 'Lista Detallada', icon: Users },
    { id: 'performance', label: 'Rendimiento', icon: BarChart3 },
    { id: 'messages', label: 'Mensajes', icon: MessageSquare },
    { id: 'ai-assistant', label: 'Asistente IA', icon: Bot }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header de Estudiantes */}
      <div className="teacher-card glass-effect rounded-xl p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-3xl font-bold flex items-center space-x-3 font-orbitron mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-400 rounded-lg flex items-center justify-center professional-glow">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="gradient-text-accent">Gestión de Estudiantes</span>
            </h2>
            <p className="text-gray-400 font-rajdhani">Administra y monitorea el progreso de tus estudiantes</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar estudiantes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-950/70 border border-gray-700/50 rounded-lg focus:border-purple-500 focus:outline-none transition-all font-rajdhani text-gray-100 w-64"
              />
            </div>
            
            {/* Sort Dropdown */}
            <select
              value={sortBy.field}
              onChange={(e) => setSortBy({ field: e.target.value as any, direction: sortBy.direction })}
              className="px-4 py-2 bg-gray-950/70 border border-gray-700/50 rounded-lg focus:border-purple-500 focus:outline-none transition-all font-rajdhani text-gray-100"
            >
              <option value="name">Ordenar por Nombre</option>
              <option value="performance">Ordenar por Rendimiento</option>
              <option value="level">Ordenar por Nivel</option>
              <option value="activity">Ordenar por Actividad</option>
            </select>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-purple-500/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStudentsView(tab.id as StudentsViewType)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all font-rajdhani ${
                studentsView === tab.id
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10'
              }`}
              data-guide={tab.id === 'ai-assistant' ? 'ai-assistant-tab' : undefined}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content based on selected view */}
      {studentsView === 'overview' && (
        <StudentsOverview classStats={classStats} />
      )}

      {studentsView === 'list' && (
        <StudentsList students={filteredAndSortedStudents} />
      )}

      {studentsView === 'performance' && (
        <StudentsPerformance 
          students={filteredAndSortedStudents}
          selectedClass={selectedClass}
        />
      )}

      {studentsView === 'messages' && (
        <StudentsMessages messages={studentMessages} />
      )}

      {studentsView === 'ai-assistant' && (
        <StudentsAIAssistant 
          suggestions={aiSuggestions}
          quickActions={aiQuickActions}
          chatHistory={aiChatHistory}
          chatInput={aiChatInput}
          setChatInput={setAiChatInput}
          isTyping={aiTyping}
          onSendMessage={handleAIChat}
          onSuggestionClick={handleAISuggestionClick}
          onQuickActionClick={handleAIQuickAction}
        />
      )}
    </motion.div>
  );
}
