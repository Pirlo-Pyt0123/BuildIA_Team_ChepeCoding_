import { Award, BarChart3, BookOpen, Brain, Home, Lightbulb, Sparkles, User, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import FloatingHelpButton from '../components/ui/FloatingHelpButton';
import GuideTooltip, { useGuide } from '../components/ui/GuideTooltip';
import { TeacherProfile, User as UserData } from '../data/database';

// Importar los componentes modulares
import DashboardView from '../components/teacher/DashboardView';
import Navigation from '../components/teacher/Navigation';
import ObservacionesView from '../components/teacher/ObservacionesView';
import ReportsView from '../components/teacher/ReportsView';
import StudentsView from '../components/teacher/StudentsView';
import {
    ActiveTab,
    Activity,
    AIQuickAction,
    AISuggestion,
    ClassData,
    ClassStats,
    ReportPeriod,
    ReportType,
    SortBy,
    StudentMessage,
    StudentProgress,
    StudentsView as StudentsViewType,
    TeacherData,
    WeeklyStats
} from '../components/teacher/types';

interface TeacherDashboardProps {
  onLogout: () => void;
  user: UserData;
}

export default function TeacherDashboard({ onLogout, user }: TeacherDashboardProps) {
  // Estados principales
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [reportPeriod, setReportPeriod] = useState<ReportPeriod>('weekly');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [reportType, setReportType] = useState<ReportType>('performance');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [studentsView, setStudentsView] = useState<StudentsViewType>('overview');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>({ field: 'name', direction: 'asc' });
  const [aiChatHistory, setAiChatHistory] = useState<Array<{id: string, type: 'user' | 'ai', message: string, time: string}>>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Sistema de guías para docentes
  const { isGuideActive, hasSeenGuide, startGuide, closeGuide, resetGuide } = useGuide('teacher-dashboard');

  // Pasos de la guía para el dashboard de docentes
  const teacherGuideSteps = [
    {
      id: 'welcome',
      title: '¡Bienvenido Profesor!',
      content: '¡Hola! Te doy la bienvenida a tu centro de comando educativo. Te mostraré todas las herramientas disponibles.',
      target: '[data-guide="teacher-header"]',
      position: 'bottom' as const,
      highlight: true
    },
    {
      id: 'navigation',
      title: 'Navegación Principal',
      content: 'Aquí tienes acceso a tu Dashboard, Gestión de Estudiantes y Centro de Analíticas (Reportes).',
      target: '[data-guide="teacher-navigation"]',
      position: 'bottom' as const,
      highlight: true
    },
    {
      id: 'teacher-stats',
      title: 'Estadísticas Generales',
      content: 'Visualiza un resumen de tus estudiantes, clases activas, tareas completadas y rendimiento promedio.',
      target: '[data-guide="teacher-stats"]',
      position: 'bottom' as const,
      highlight: true
    },
    {
      id: 'classes-overview',
      title: 'Vista de Clases',
      content: 'Aquí puedes ver todas tus clases, su rendimiento y acceder a información detallada de cada una.',
      target: '[data-guide="classes-section"]',
      position: 'top' as const,
      highlight: true
    },
    {
      id: 'recent-activity',
      title: 'Actividad Reciente',
      content: 'Mantente al día con las últimas actividades de tus estudiantes: tareas, logros y participación.',
      target: '[data-guide="activity-section"]',
      position: 'top' as const,
      highlight: true
    },
    {
      id: 'students-management',
      title: 'Gestión de Estudiantes',
      content: 'En esta sección puedes gestionar estudiantes, ver su rendimiento, mensajes y usar el asistente IA.',
      target: '[data-guide="students-tab"]',
      position: 'bottom' as const,
      highlight: true
    },
    {
      id: 'ai-assistant',
      title: 'Asistente IA',
      content: 'Tu asistente educativo inteligente te ayudará con estrategias pedagógicas, análisis y sugerencias.',
      target: '[data-guide="ai-assistant-tab"]',
      position: 'bottom' as const,
      highlight: true
    },
    {
      id: 'reports',
      title: 'Centro de Analíticas',
      content: 'Genera reportes detallados, visualiza datos avanzados y exporta información para análisis profundo.',
      target: '[data-guide="reports-tab"]',
      position: 'bottom' as const,
      highlight: true
    }
  ];
  
  // Datos del docente basados en el usuario autenticado
  const userProfile = user.profile as TeacherProfile;
  const teacherData: TeacherData = {
    name: userProfile.name,
    avatar: userProfile.avatar,
    totalStudents: userProfile.totalStudents || 87,
    activeClasses: userProfile.activeClasses || 5,
    completedAssignments: userProfile.completedAssignments || 23,
    avgPerformance: userProfile.avgPerformance || 85
  };

  // Actividad reciente
  const recentActivity: Activity[] = [
    { id: '1', student: 'María López', action: 'Completó "Maestro del Álgebra" en Matemáticas', score: 95, time: '2 min' },
    { id: '2', student: 'Carlos Ruiz', action: 'Subió de nivel en "Cronista Medieval" de Historia', level: 12, time: '5 min' },
    { id: '3', student: 'Ana Torres', action: 'Ganó trofeo "Explorador Químico" en Ciencias', trophy: 'Explorador', time: '8 min' },
    { id: '4', student: 'Pedro Martín', action: 'Completó "Polyglot Champion" en Inglés', score: 88, time: '12 min' },
    { id: '5', student: 'Sofia Vargas', action: 'Participó en "Navegante Mundial" de Geografía', score: 72, time: '15 min' },
    { id: '6', student: 'Diego Ramírez', action: 'Completó "Biólogo Molecular" con puntaje perfecto', score: 100, time: '20 min' },
  ];

  // Clases
  const classes: ClassData[] = [
    { id: '1', name: '7mo A', students: 28, subject: 'Matemáticas', progress: 76 },
    { id: '2', name: '7mo B', students: 25, subject: 'Historia', progress: 82 },
    { id: '3', name: '8vo A', students: 30, subject: 'Ciencias', progress: 68 },
    { id: '4', name: '8vo B', students: 27, subject: 'Geografía', progress: 71 },
    { id: '5', name: '9no A', students: 22, subject: 'Biología', progress: 85 },
  ];

  // Progreso de estudiantes
  const studentsProgress: StudentProgress[] = [
    { id: '1', name: 'María López', class: '7mo A', level: 15, xp: 2450, progress: 92, improvement: '+12%', status: 'excellent', avatar: 'ML', email: 'maria.lopez@colegio.edu', lastActivity: '2 min', subjects: { math: 95, history: 89, science: 87, language: 91 }, achievements: 12, attendance: 95 },
    { id: '2', name: 'Carlos Ruiz', class: '7mo B', level: 14, xp: 2380, progress: 89, improvement: '+8%', status: 'good', avatar: 'CR', email: 'carlos.ruiz@colegio.edu', lastActivity: '5 min', subjects: { math: 88, history: 92, science: 85, language: 90 }, achievements: 10, attendance: 92 },
    { id: '3', name: 'Ana Torres', class: '8vo A', level: 13, xp: 2310, progress: 85, improvement: '+15%', status: 'good', avatar: 'AT', email: 'ana.torres@colegio.edu', lastActivity: '8 min', subjects: { math: 82, history: 87, science: 89, language: 85 }, achievements: 11, attendance: 88 },
    { id: '4', name: 'Pedro Martín', class: '7mo A', level: 12, xp: 1950, progress: 78, improvement: '+5%', status: 'average', avatar: 'PM', email: 'pedro.martin@colegio.edu', lastActivity: '12 min', subjects: { math: 75, history: 80, science: 78, language: 79 }, achievements: 8, attendance: 85 },
    { id: '5', name: 'Sofia Vargas', class: '7mo B', level: 11, xp: 1820, progress: 72, improvement: '-2%', status: 'needs_attention', avatar: 'SV', email: 'sofia.vargas@colegio.edu', lastActivity: '1 hora', subjects: { math: 70, history: 75, science: 68, language: 74 }, achievements: 6, attendance: 78 }
  ];

  // Mensajes de estudiantes
  const studentMessages: StudentMessage[] = [
    { id: '1', student: 'María López', message: 'Profesor, tengo dudas sobre el desafío "Maestro del Álgebra"', time: '10:30', unread: true, priority: 'medium' },
    { id: '2', student: 'Carlos Ruiz', message: 'Completé "Cronista Medieval" - ¡me encantó la historia!', time: '09:45', unread: false, priority: 'low' },
    { id: '3', student: 'Sofia Vargas', message: 'No pude acceder al desafío "Navegante Mundial" de Geografía', time: '08:20', unread: true, priority: 'high' },
    { id: '4', student: 'Diego Ramírez', message: '¿Cuándo estará disponible "Einstein Junior" de Física?', time: 'Ayer', unread: false, priority: 'medium' },
    { id: '5', student: 'Isabella García', message: 'Me gustaría participar en "Biólogo Molecular" - ¿hay prerrequisitos?', time: 'Ayer', unread: true, priority: 'medium' },
    { id: '6', student: 'Ana Torres', message: 'El desafío "Pincel Creativo" de Arte fue muy divertido', time: '2 días', unread: false, priority: 'low' },
    { id: '7', student: 'Pedro Martín', message: 'Necesito ayuda con "Polyglot Champion" de Inglés', time: '2 días', unread: true, priority: 'medium' }
  ];

  // Estadísticas por clase
  const classStats: ClassStats[] = [
    { class: '7mo A', totalStudents: 28, activeToday: 24, avgPerformance: 82, completedTasks: 156, pendingTasks: 24, topStudent: 'María López' },
    { class: '7mo B', totalStudents: 25, activeToday: 22, avgPerformance: 79, completedTasks: 142, pendingTasks: 18, topStudent: 'Carlos Ruiz' },
    { class: '8vo A', totalStudents: 30, activeToday: 27, avgPerformance: 85, completedTasks: 189, pendingTasks: 21, topStudent: 'Isabella García' }
  ];

  // Estadísticas semanales
  const weeklyStats: WeeklyStats = {
    totalSessions: 324,
    avgSessionTime: '25 min',
    completionRate: 84,
    studentsActive: 73,
    totalStudents: 87,
    newAchievements: 45,
    challengesCreated: 12,
    messagesExchanged: 156
  };

  // Sugerencias y acciones de IA
  const aiSuggestions: AISuggestion[] = [
    {
      id: '1',
      category: 'Metodología',
      title: 'Estrategias para Geografía en 8vo B',
      description: 'Mejorar engagement usando mapas interactivos y realidad virtual',
      icon: Lightbulb,
      color: 'yellow',
      type: 'suggestion'
    },
    {
      id: '2', 
      category: 'Gamificación',
      title: 'Nuevos desafíos interdisciplinares',
      description: 'Combinar Biología y Arte para crear "Ilustrador Científico"',
      icon: Zap,
      color: 'blue',
      type: 'action'
    },
    {
      id: '3',
      category: 'Evaluación',
      title: 'Análisis de rendimiento en Física',
      description: 'Los estudiantes destacan en teoría pero necesitan más práctica',
      icon: Brain,
      color: 'purple',
      type: 'analysis'
    },
    {
      id: '4',
      category: 'Contenido',
      title: 'Recursos para desafío de Inglés',
      description: 'Videos nativos y conversaciones simuladas para "Polyglot Champion"',
      icon: BookOpen,
      color: 'green',
      type: 'suggestion'
    }
  ];

  const aiQuickActions: AIQuickAction[] = [
    { id: 'lesson-plan', label: 'Generar Plan de Clase', icon: BookOpen, color: 'blue' },
    { id: 'student-report', label: 'Crear Reporte Individual', icon: User, color: 'green' },
    { id: 'activity-ideas', label: 'Sugerir Actividades', icon: Sparkles, color: 'purple' },
    { id: 'assessment', label: 'Crear Evaluación', icon: Award, color: 'yellow' }
  ];

  // Estados para IA
  const [aiChatInput, setAiChatInput] = useState<string>('');
  const [aiTyping, setAiTyping] = useState<boolean>(false);

  // Funciones auxiliares
  const filteredStudents = selectedClass === 'all' 
    ? studentsProgress 
    : studentsProgress.filter(student => student.class === selectedClass);

  const filteredAndSortedStudents = studentsProgress
    .filter(student => {
      const matchesClass = selectedClass === 'all' || student.class === selectedClass;
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesClass && matchesSearch;
    })
    .sort((a, b) => {
      const { field, direction } = sortBy;
      let comparison = 0;
      
      switch(field) {
        case 'name': 
          comparison = a.name.localeCompare(b.name);
          break;
        case 'performance': 
          comparison = b.progress - a.progress;
          break;
        case 'level': 
          comparison = b.level - a.level;
          break;
        case 'activity': 
          comparison = a.lastActivity.localeCompare(b.lastActivity);
          break;
        default: 
          return 0;
      }
      
      return direction === 'desc' ? -comparison : comparison;
    });

  // Función para generar respuesta de IA
  const generateAiResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('estudiante') || lowerMessage.includes('rendimiento')) {
      return 'Basándome en los datos de tus estudiantes, te recomiendo enfocar atención personalizada en Sofia Vargas. Podrías implementar sesiones de tutoría individual y actividades de refuerzo adaptadas a su estilo de aprendizaje visual.';
    }
    
    if (lowerMessage.includes('actividad') || lowerMessage.includes('clase')) {
      return 'Para tu próxima clase de Matemáticas, sugiero una actividad gamificada: "Batalla de Álgebra" donde los estudiantes compiten en equipos resolviendo ecuaciones. Esto aumentará el engagement especialmente en 7mo A donde tienes excelentes resultados.';
    }
    
    return 'Como tu asistente educativo, estoy aquí para ayudarte con estrategias pedagógicas, análisis de datos de estudiantes, creación de contenido y resolución de desafíos académicos. ¿En qué área específica te gustaría profundizar?';
  };

  // Funciones para IA
  const handleAISuggestionClick = (suggestion: AISuggestion) => {
    const message = `Cuéntame más sobre: ${suggestion.title}`;
    setAiChatInput(message);
    handleAIChat(message);
  };

  const handleAIQuickAction = (action: AIQuickAction) => {
    const actionMessages = {
      'lesson-plan': '¿Puedes ayudarme a generar un plan de clase para matemáticas?',
      'student-report': '¿Cómo puedo crear un reporte detallado de un estudiante específico?',
      'activity-ideas': 'Necesito ideas para actividades interactivas para mi clase',
      'assessment': '¿Puedes sugerirme una evaluación apropiada para el tema actual?'
    };
    const message = actionMessages[action.id as keyof typeof actionMessages] || `Ayúdame con: ${action.label}`;
    setAiChatInput(message);
    handleAIChat(message);
  };

  const handleAIChat = (message?: string) => {
    const finalMessage = message || aiChatInput;
    if (!finalMessage.trim()) return;

    setAiTyping(true);
    setAiChatInput('');
    
    // Agregar mensaje del usuario al historial
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      message: finalMessage,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };

    setAiChatHistory(prev => [...prev, userMessage]);

    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponse = generateAiResponse(finalMessage);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        message: aiResponse,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setAiChatHistory(prev => [...prev, aiMessage]);
      setAiTyping(false);
    }, 1500);
  };

  // Función para exportar reportes
  const exportReport = () => {
    console.log('Exportando reporte...', { reportType, reportPeriod, selectedClass });
  };

  // Navegación
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Estudiantes', icon: Users },
    { id: 'reports', label: 'Reportes', icon: BarChart3 },
    { id: 'observaciones', label: 'Observaciones', icon: Brain },
  ];

  return (
    <div className="min-h-screen bg-black teacher-theme relative overflow-hidden">
      {/* Fondo con grid sutil */}
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      
      {/* Ambient glow para docentes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl subtle-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/3 rounded-full blur-3xl subtle-pulse" style={{ animationDelay: '1.5s' }}></div>

      {/* Navigation */}
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        teacherData={teacherData}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onLogout={onLogout}
        navigation={navigation}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        {activeTab === 'dashboard' && (
          <DashboardView 
            teacherData={teacherData}
            recentActivity={recentActivity}
          />
        )}

        {activeTab === 'students' && (
          <StudentsView 
            studentsView={studentsView}
            setStudentsView={setStudentsView}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filteredAndSortedStudents={filteredAndSortedStudents}
            classStats={classStats}
            studentMessages={studentMessages}
            selectedClass={selectedClass}
            aiSuggestions={aiSuggestions}
            aiQuickActions={aiQuickActions}
            aiChatHistory={aiChatHistory}
            aiChatInput={aiChatInput}
            setAiChatInput={setAiChatInput}
            aiTyping={aiTyping}
            handleAIChat={handleAIChat}
            handleAISuggestionClick={handleAISuggestionClick}
            handleAIQuickAction={handleAIQuickAction}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsView 
            reportPeriod={reportPeriod}
            setReportPeriod={setReportPeriod}
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            reportType={reportType}
            setReportType={setReportType}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            weeklyStats={weeklyStats}
            filteredStudents={filteredStudents}
            classes={classes}
            exportReport={exportReport}
          />
        )}

        {activeTab === 'observaciones' && (
          <ObservacionesView />
        )}
      </main>

      {/* Sistema de Guías */}
      <GuideTooltip
        steps={teacherGuideSteps}
        isActive={isGuideActive}
        onClose={closeGuide}
        onComplete={() => {
          closeGuide();
          // Opcional: mostrar mensaje de bienvenida para docentes
        }}
      />

      {/* Botón de Ayuda Flotante */}
      <FloatingHelpButton
        onClick={startGuide}
        hasSeenGuide={hasSeenGuide}
        onResetGuide={resetGuide}
      />
    </div>
  );
}
