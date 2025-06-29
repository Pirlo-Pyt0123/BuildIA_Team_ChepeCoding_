import { motion } from 'framer-motion';
import { Award, BarChart3, BookOpen, Bot, Brain, Calendar, ChevronDown, Clock, Download, Filter, Home, Lightbulb, LogOut, Menu, MessageSquare, Search, Send, Sparkles, Star, TrendingDown, TrendingUp, Trophy, User, Users, X, Zap } from 'lucide-react';
import { useState } from 'react';
import FloatingHelpButton from '../components/ui/FloatingHelpButton';
import GuideTooltip, { useGuide } from '../components/ui/GuideTooltip';

interface TeacherDashboardProps {
  onLogout: () => void;
}

export default function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'reports'>('dashboard');
  const [reportPeriod, setReportPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'semester'>('weekly');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [reportType, setReportType] = useState<'performance' | 'participation' | 'progress' | 'comparative' | 'attendance' | 'behavior' | 'detailed'>('performance');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [studentsView, setStudentsView] = useState<'overview' | 'list' | 'performance' | 'messages' | 'ai-assistant'>('overview');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'performance' | 'level' | 'activity'>('name');
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
  
  const teacherData = {
    name: "Prof. García",
    avatar: "G",
    totalStudents: 87,
    activeClasses: 5,
    completedAssignments: 23,
    avgPerformance: 85
  };

  const recentActivity = [
    { id: '1', student: 'María López', action: 'Completó desafío de Matemáticas', score: 95, time: '2 min' },
    { id: '2', student: 'Carlos Ruiz', action: 'Subió de nivel en Historia', level: 12, time: '5 min' },
    { id: '3', student: 'Ana Torres', action: 'Ganó trofeo en Ciencias', trophy: 'Explorador', time: '8 min' },
  ];

  const classes = [
    { id: '1', name: '7mo A', students: 28, subject: 'Matemáticas', progress: 76 },
    { id: '2', name: '7mo B', students: 25, subject: 'Matemáticas', progress: 82 },
    { id: '3', name: '8vo A', students: 30, subject: 'Álgebra', progress: 68 },
  ];

  // Datos extensos para reportes
  const performanceData = {
    daily: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      datasets: [
        { name: 'Matemáticas', data: [85, 87, 82, 90, 88, 75, 80], color: 'rgb(34, 197, 94)' },
        { name: 'Historia', data: [92, 89, 95, 87, 91, 85, 88], color: 'rgb(59, 130, 246)' },
        { name: 'Ciencias', data: [79, 83, 77, 85, 81, 78, 82], color: 'rgb(245, 158, 11)' }
      ]
    },
    weekly: {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      datasets: [
        { name: 'Matemáticas', data: [82, 85, 87, 89], color: 'rgb(34, 197, 94)' },
        { name: 'Historia', data: [88, 90, 92, 89], color: 'rgb(59, 130, 246)' },
        { name: 'Ciencias', data: [75, 78, 81, 79], color: 'rgb(245, 158, 11)' }
      ]
    }
  };

  const participationData = [
    { subject: 'Matemáticas', completed: 156, total: 180, percentage: 87 },
    { subject: 'Historia', completed: 142, total: 160, percentage: 89 },
    { subject: 'Ciencias', completed: 98, total: 140, percentage: 70 },
    { subject: 'Lenguaje', completed: 134, total: 150, percentage: 89 }
  ];

  const studentsProgress = [
    { id: '1', name: 'María López', class: '7mo A', level: 15, xp: 2450, progress: 92, improvement: '+12%', status: 'excellent', avatar: 'ML', email: 'maria.lopez@colegio.edu', lastActivity: '2 min', subjects: { math: 95, history: 89, science: 87, language: 91 }, achievements: 12, attendance: 95 },
    { id: '2', name: 'Carlos Ruiz', class: '7mo B', level: 14, xp: 2380, progress: 89, improvement: '+8%', status: 'good', avatar: 'CR', email: 'carlos.ruiz@colegio.edu', lastActivity: '5 min', subjects: { math: 88, history: 92, science: 85, language: 90 }, achievements: 10, attendance: 92 },
    { id: '3', name: 'Ana Torres', class: '8vo A', level: 13, xp: 2310, progress: 85, improvement: '+15%', status: 'good', avatar: 'AT', email: 'ana.torres@colegio.edu', lastActivity: '8 min', subjects: { math: 82, history: 87, science: 89, language: 85 }, achievements: 11, attendance: 88 },
    { id: '4', name: 'Pedro Martín', class: '7mo A', level: 12, xp: 1950, progress: 78, improvement: '+5%', status: 'average', avatar: 'PM', email: 'pedro.martin@colegio.edu', lastActivity: '12 min', subjects: { math: 75, history: 80, science: 78, language: 79 }, achievements: 8, attendance: 85 },
    { id: '5', name: 'Sofia Vargas', class: '7mo B', level: 11, xp: 1820, progress: 72, improvement: '-2%', status: 'needs_attention', avatar: 'SV', email: 'sofia.vargas@colegio.edu', lastActivity: '1 hora', subjects: { math: 70, history: 75, science: 68, language: 74 }, achievements: 6, attendance: 78 },
    { id: '6', name: 'Diego Ramírez', class: '8vo A', level: 13, xp: 2180, progress: 82, improvement: '+10%', status: 'good', avatar: 'DR', email: 'diego.ramirez@colegio.edu', lastActivity: '15 min', subjects: { math: 85, history: 78, science: 86, language: 80 }, achievements: 9, attendance: 90 },
    { id: '7', name: 'Lucia Hernández', class: '7mo A', level: 10, xp: 1650, progress: 68, improvement: '-5%', status: 'needs_attention', avatar: 'LH', email: 'lucia.hernandez@colegio.edu', lastActivity: '2 horas', subjects: { math: 65, history: 70, science: 68, language: 72 }, achievements: 5, attendance: 75 },
    { id: '8', name: 'Roberto Silva', class: '7mo B', level: 12, xp: 1980, progress: 80, improvement: '+7%', status: 'average', avatar: 'RS', email: 'roberto.silva@colegio.edu', lastActivity: '25 min', subjects: { math: 78, history: 82, science: 79, language: 81 }, achievements: 7, attendance: 88 },
    { id: '9', name: 'Isabella García', class: '8vo A', level: 16, xp: 2650, progress: 94, improvement: '+18%', status: 'excellent', avatar: 'IG', email: 'isabella.garcia@colegio.edu', lastActivity: '1 min', subjects: { math: 96, history: 93, science: 91, language: 95 }, achievements: 15, attendance: 97 },
    { id: '10', name: 'Mateo Jiménez', class: '7mo A', level: 13, xp: 2100, progress: 83, improvement: '+9%', status: 'good', avatar: 'MJ', email: 'mateo.jimenez@colegio.edu', lastActivity: '18 min', subjects: { math: 84, history: 81, science: 85, language: 82 }, achievements: 9, attendance: 91 }
  ];

  // Datos adicionales para gestión de estudiantes
  const studentMessages = [
    { id: '1', student: 'María López', message: 'Profesor, tengo dudas sobre el último ejercicio de álgebra', time: '10:30', unread: true, priority: 'medium' },
    { id: '2', student: 'Carlos Ruiz', message: 'Gracias por la explicación de historia, ya entendí mejor', time: '09:45', unread: false, priority: 'low' },
    { id: '3', student: 'Sofia Vargas', message: 'No pude completar la tarea por problemas técnicos', time: '08:20', unread: true, priority: 'high' },
    { id: '4', student: 'Diego Ramírez', message: '¿Cuándo será la próxima evaluación de ciencias?', time: 'Ayer', unread: false, priority: 'medium' },
    { id: '5', student: 'Isabella García', message: 'Me gustaría participar en el concurso de matemáticas', time: 'Ayer', unread: true, priority: 'medium' }
  ];

  const classStats = [
    { class: '7mo A', totalStudents: 28, activeToday: 24, avgPerformance: 82, completedTasks: 156, pendingTasks: 24, topStudent: 'María López' },
    { class: '7mo B', totalStudents: 25, activeToday: 22, avgPerformance: 79, completedTasks: 142, pendingTasks: 18, topStudent: 'Carlos Ruiz' },
    { class: '8vo A', totalStudents: 30, activeToday: 27, avgPerformance: 85, completedTasks: 189, pendingTasks: 21, topStudent: 'Isabella García' }
  ];

  const recentStudentActivity = [
    { student: 'Isabella García', action: 'Completó desafío avanzado de Matemáticas', points: '+150 XP', time: '2 min', type: 'achievement' },
    { student: 'María López', action: 'Subió al nivel 15', points: '+100 XP', time: '5 min', type: 'level_up' },
    { student: 'Diego Ramírez', action: 'Ganó trofeo "Científico Explorador"', points: '+75 XP', time: '12 min', type: 'trophy' },
    { student: 'Carlos Ruiz', action: 'Completó todas las tareas de Historia', points: '+50 XP', time: '18 min', type: 'completion' },
    { student: 'Mateo Jiménez', action: 'Participó en debate de Lenguaje', points: '+25 XP', time: '25 min', type: 'participation' }
  ];

  const weeklyStats = {
    totalSessions: 324,
    avgSessionTime: '25 min',
    completionRate: 84,
    studentsActive: 73,
    totalStudents: 87,
    newAchievements: 45,
    challengesCreated: 12,
    messagesExchanged: 156
  };

  const subjectPerformance = [
    { 
      subject: 'Matemáticas', 
      avgScore: 87, 
      totalStudents: 83, 
      completedTasks: 156, 
      pendingTasks: 24,
      improvement: '+5%',
      trend: 'up',
      topicsBest: ['Álgebra', 'Geometría'],
      topicsWorst: ['Estadística']
    },
    { 
      subject: 'Historia', 
      avgScore: 92, 
      totalStudents: 78, 
      completedTasks: 142, 
      pendingTasks: 18,
      improvement: '+8%',
      trend: 'up',
      topicsBest: ['Civilizaciones Antiguas', 'Edad Media'],
      topicsWorst: ['Historia Contemporánea']
    },
    { 
      subject: 'Ciencias', 
      avgScore: 79, 
      totalStudents: 81, 
      completedTasks: 98, 
      pendingTasks: 42,
      improvement: '-2%',
      trend: 'down',
      topicsBest: ['Biología'],
      topicsWorst: ['Química', 'Física']
    },
    { 
      subject: 'Lenguaje', 
      avgScore: 89, 
      totalStudents: 87, 
      completedTasks: 134, 
      pendingTasks: 16,
      improvement: '+3%',
      trend: 'up',
      topicsBest: ['Gramática', 'Literatura'],
      topicsWorst: ['Redacción']
    }
  ];

  // Datos adicionales para reportes expandidos
  const attendanceData = [
    { student: 'María López', class: '7mo A', present: 18, absent: 2, late: 1, rate: 90 },
    { student: 'Carlos Ruiz', class: '7mo B', present: 19, absent: 1, late: 1, rate: 95 },
    { student: 'Ana Torres', class: '8vo A', present: 17, absent: 3, late: 1, rate: 85 },
    { student: 'Pedro Martín', class: '7mo A', present: 16, absent: 4, late: 1, rate: 80 },
    { student: 'Sofia Vargas', class: '7mo B', present: 15, absent: 4, late: 2, rate: 75 },
    { student: 'Diego Ramírez', class: '8vo A', present: 18, absent: 2, late: 1, rate: 90 },
  ];

  const behaviorData = [
    { student: 'María López', class: '7mo A', positive: 12, neutral: 8, negative: 1, overall: 'excellent' },
    { student: 'Carlos Ruiz', class: '7mo B', positive: 10, neutral: 9, negative: 2, overall: 'good' },
    { student: 'Ana Torres', class: '8vo A', positive: 8, neutral: 11, negative: 2, overall: 'good' },
    { student: 'Pedro Martín', class: '7mo A', positive: 6, neutral: 12, negative: 3, overall: 'average' },
    { student: 'Sofia Vargas', class: '7mo B', positive: 4, neutral: 10, negative: 7, overall: 'needs_attention' },
    { student: 'Diego Ramírez', class: '8vo A', positive: 9, neutral: 10, negative: 2, overall: 'good' },
  ];

  const detailedAnalytics = {
    timeSpent: {
      labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
      data: [45, 52, 38, 48, 55] // minutos promedio por día
    },
    subjectEngagement: [
      { subject: 'Matemáticas', engagement: 78, timeSpent: 42, interactions: 156 },
      { subject: 'Historia', engagement: 85, timeSpent: 38, interactions: 189 },
      { subject: 'Ciencias', engagement: 72, timeSpent: 35, interactions: 134 },
      { subject: 'Lenguaje', engagement: 81, timeSpent: 40, interactions: 167 }
    ],
    learningPatterns: {
      peakHours: ['9:00-10:00', '14:00-15:00', '16:00-17:00'],
      preferredTypes: ['Visual', 'Interactivo', 'Gamificado'],
      strugglingAreas: ['Química', 'Álgebra Avanzada', 'Historia Contemporánea']
    },
    achievements: {
      totalUnlocked: 234,
      rareAchievements: 12,
      weeklyGrowth: '+15%',
      completionRate: 67
    }
  };

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

  const filteredStudents = selectedClass === 'all' 
    ? studentsProgress 
    : studentsProgress.filter(student => student.class === selectedClass);

  // Funciones para gestión de estudiantes
  const filteredAndSortedStudents = studentsProgress
    .filter(student => {
      const matchesClass = selectedClass === 'all' || student.class === selectedClass;
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesClass && matchesSearch;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'performance': return b.progress - a.progress;
        case 'level': return b.level - a.level;
        case 'activity': return a.lastActivity.localeCompare(b.lastActivity);
        default: return 0;
      }
    });

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'achievement': return Award;
      case 'level_up': return TrendingUp;
      case 'trophy': return Star;
      case 'completion': return BookOpen;
      case 'participation': return MessageSquare;
      default: return User;
    }
  };

  const getActivityColor = (type: string) => {
    switch(type) {
      case 'achievement': return 'text-yellow-400 bg-yellow-500/20';
      case 'level_up': return 'text-green-400 bg-green-500/20';
      case 'trophy': return 'text-purple-400 bg-purple-500/20';
      case 'completion': return 'text-blue-400 bg-blue-500/20';
      case 'participation': return 'text-pink-400 bg-pink-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  // Datos y funciones para el Asistente de IA
  const aiSuggestions = [
    {
      id: '1',
      category: 'Metodología',
      title: 'Estrategias para estudiantes con bajo rendimiento',
      description: 'Técnicas personalizadas para Sofia Vargas y Lucia Hernández',
      icon: Lightbulb,
      color: 'yellow',
      type: 'suggestion'
    },
    {
      id: '2', 
      category: 'Gamificación',
      title: 'Nuevos desafíos para clase 7mo A',
      description: 'Ideas para mantener el alto engagement de tu mejor clase',
      icon: Zap,
      color: 'blue',
      type: 'action'
    },
    {
      id: '3',
      category: 'Evaluación',
      title: 'Análisis de patrones de aprendizaje',
      description: 'Detectamos preferencias visuales en 8vo A',
      icon: Brain,
      color: 'purple',
      type: 'analysis'
    },
    {
      id: '4',
      category: 'Comunicación',
      title: 'Respuestas sugeridas para mensajes',
      description: '3 mensajes pendientes requieren tu atención',
      icon: MessageSquare,
      color: 'green',
      type: 'insight'
    }
  ];

  const aiQuickActions = [
    { id: 'lesson-plan', label: 'Generar Plan de Clase', icon: BookOpen, color: 'blue' },
    { id: 'student-report', label: 'Crear Reporte Individual', icon: User, color: 'green' },
    { id: 'activity-ideas', label: 'Sugerir Actividades', icon: Sparkles, color: 'purple' },
    { id: 'assessment', label: 'Crear Evaluación', icon: Award, color: 'yellow' }
  ];

  const generateAiResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('estudiante') || lowerMessage.includes('rendimiento')) {
      return 'Basándome en los datos de tus estudiantes, te recomiendo enfocar atención personalizada en Sofia Vargas y Lucia Hernández. Podrías implementar sesiones de tutoría individual y actividades de refuerzo adaptadas a su estilo de aprendizaje visual.';
    }
    
    if (lowerMessage.includes('actividad') || lowerMessage.includes('clase')) {
      return 'Para tu próxima clase de Matemáticas, sugiero una actividad gamificada: "Batalla de Álgebra" donde los estudiantes compiten en equipos resolviendo ecuaciones. Esto aumentará el engagement especialmente en 7mo A donde tienes excelentes resultados.';
    }
    
    if (lowerMessage.includes('evaluación') || lowerMessage.includes('examen')) {
      return 'Considerando el rendimiento actual, te recomiendo una evaluación mixta: 60% ejercicios prácticos, 30% problemas aplicados y 10% participación colaborativa. Esto beneficiará a estudiantes con diferentes estilos de aprendizaje.';
    }

    if (lowerMessage.includes('motivar') || lowerMessage.includes('motivación')) {
      return 'Para aumentar la motivación, implementa un sistema de insignias digitales. Los estudiantes como Isabella García responden bien a reconocimientos públicos, mientras que otros prefieren feedback privado personalizado.';
    }

    return 'Como tu asistente educativo, estoy aquí para ayudarte con estrategias pedagógicas, análisis de datos de estudiantes, creación de contenido y resolución de desafíos académicos. ¿En qué área específica te gustaría profundizar?';
  };

  // Funciones adicionales para el Asistente IA
  const [aiChatInput, setAiChatInput] = useState<string>('');
  const [aiTyping, setAiTyping] = useState<boolean>(false);
  
  const handleAISuggestionClick = (suggestion: any) => {
    const message = `Cuéntame más sobre: ${suggestion.title}`;
    setAiChatInput(message);
    handleAIChat(message);
  };

  const handleAIQuickAction = (action: any) => {
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

  const getAISuggestionColor = (type: string) => {
    switch(type) {
      case 'analysis': return 'bg-purple-500/20 text-purple-400';
      case 'suggestion': return 'bg-yellow-500/20 text-yellow-400';
      case 'insight': return 'bg-pink-500/20 text-pink-400';
      case 'action': return 'bg-green-500/20 text-green-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
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

  // Convertir aiChatHistory para el componente de chat
  const aiChatMessages = aiChatHistory.map(msg => ({
    role: msg.type === 'user' ? 'user' : 'assistant',
    content: msg.message,
    timestamp: msg.time
  }));

  const exportReport = () => {
    // Lógica para exportar reportes
    console.log('Exportando reporte...', { reportType, reportPeriod, selectedClass });
  };

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Estudiantes', icon: Users },
    { id: 'reports', label: 'Reportes', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-black teacher-theme relative overflow-hidden">
      {/* Fondo con grid sutil */}
      <div className="absolute inset-0 cyber-grid opacity-5"></div>
      
      {/* Ambient glow para docentes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl subtle-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/3 rounded-full blur-3xl subtle-pulse" style={{ animationDelay: '1.5s' }}></div>

      {/* Header */}
      <header className="glass-effect border-b border-purple-500/20 sticky top-0 z-30 relative" data-guide="teacher-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <img src="/BUILDEDU.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-6" data-guide="teacher-navigation">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all font-rajdhani ${
                    activeTab === item.id
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10'
                  }`}
                  data-guide={
                    item.id === 'students' ? 'students-tab' : 
                    item.id === 'reports' ? 'reports-tab' : 
                    undefined
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* User Info & Mobile Menu */}
            <div className="flex items-center space-x-3">
              {/* Student count - visible on all screens */}
              <div className="flex items-center space-x-2 stat-counter rounded-lg px-3 py-2 border border-purple-500/30">
                <Users className="w-4 h-4 text-purple-400" />
                <span className="font-semibold font-jetbrains text-purple-300 hidden sm:inline">{teacherData.totalStudents} estudiantes</span>
                <span className="font-semibold font-jetbrains text-purple-300 sm:hidden">{teacherData.totalStudents}</span>
              </div>
              
              {/* Logout - desktop only */}
              <button
                onClick={onLogout}
                className="hidden md:flex items-center space-x-2 px-3 py-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:block font-rajdhani">Salir</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={{ 
              height: isMobileMenuOpen ? 'auto' : 0,
              opacity: isMobileMenuOpen ? 1 : 0
            }}
            className="md:hidden overflow-hidden border-t border-purple-500/20"
          >
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all font-rajdhani text-left ${
                    activeTab === item.id
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'text-gray-400 hover:text-purple-400 hover:bg-purple-500/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
              
              {/* Mobile logout */}
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-red-400 hover:bg-red-500/20"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-rajdhani">Salir</span>
              </button>
            </nav>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Welcome Section */}
            <div className="stat-card card-glow rounded-xl p-6 hover-lift" data-guide="teacher-stats">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full flex items-center justify-center text-2xl font-orbitron font-bold text-white professional-glow">
                    {teacherData.avatar}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold font-orbitron gradient-text-accent">¡Buenos días, {teacherData.name}! 👨‍🏫</h1>
                    <p className="text-gray-400 font-rajdhani">Gestionando {teacherData.activeClasses} clases • {teacherData.totalStudents} estudiantes activos</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="stat-counter rounded-lg p-3 text-center neon-border professional-glow">
                    <BookOpen className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                    <p className="text-sm font-semibold text-purple-300">{teacherData.completedAssignments}</p>
                    <p className="text-xs text-gray-400">tareas revisadas</p>
                  </div>
                  <div className="stat-counter rounded-lg p-3 text-center border border-violet-500/30">
                    <TrendingUp className="w-5 h-5 mx-auto mb-1 text-violet-400" />
                    <p className="text-sm font-semibold text-violet-300">{teacherData.avgPerformance}%</p>
                    <p className="text-xs text-gray-400">promedio clase</p>
                  </div>
                  <div className="stat-counter rounded-lg p-3 text-center border border-pink-500/30">
                    <Award className="w-5 h-5 mx-auto mb-1 text-pink-400" />
                    <p className="text-sm font-semibold text-pink-300">A+</p>
                    <p className="text-xs text-gray-400">calificación</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-guide="classes-section">
              <div className="teacher-card glass-effect rounded-xl p-6 text-center smooth-hover">
                <Users className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <h3 className="font-semibold font-orbitron text-purple-300 mb-1">Total Estudiantes</h3>
                <p className="text-2xl font-bold font-jetbrains text-white">{teacherData.totalStudents}</p>
              </div>
              <div className="teacher-card glass-effect rounded-xl p-6 text-center smooth-hover">
                <BookOpen className="w-8 h-8 mx-auto mb-3 text-violet-400" />
                <h3 className="font-semibold font-orbitron text-violet-300 mb-1">Clases Activas</h3>
                <p className="text-2xl font-bold font-jetbrains text-white">{teacherData.activeClasses}</p>
              </div>
              <div className="teacher-card glass-effect rounded-xl p-6 text-center smooth-hover">
                <MessageSquare className="w-8 h-8 mx-auto mb-3 text-pink-400" />
                <h3 className="font-semibold font-orbitron text-pink-300 mb-1">Mensajes Nuevos</h3>
                <p className="text-2xl font-bold font-jetbrains text-white">7</p>
              </div>
              <div className="teacher-card glass-effect rounded-xl p-6 text-center smooth-hover">
                <Calendar className="w-8 h-8 mx-auto mb-3 text-indigo-400" />
                <h3 className="font-semibold font-orbitron text-indigo-300 mb-1">Tareas Pendientes</h3>
                <p className="text-2xl font-bold font-jetbrains text-white">12</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="teacher-card glass-effect rounded-xl p-6" data-guide="activity-section">
              <h2 className="text-xl font-bold flex items-center space-x-2 font-orbitron mb-6">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                <span className="gradient-text-accent">Actividad Reciente</span>
              </h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-purple-500/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                        <span className="text-purple-400 font-semibold text-sm">{activity.student.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-white font-orbitron">{activity.student}</p>
                        <p className="text-gray-400 text-sm font-rajdhani">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-purple-400 font-semibold font-jetbrains">
                        {activity.score && `${activity.score}%`}
                        {activity.level && `Nivel ${activity.level}`}
                        {activity.trophy && activity.trophy}
                      </p>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'students' && (
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
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
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
                {[
                  { id: 'overview', label: 'Vista General', icon: Home },
                  { id: 'list', label: 'Lista Detallada', icon: Users },
                  { id: 'performance', label: 'Rendimiento', icon: BarChart3 },
                  { id: 'messages', label: 'Mensajes', icon: MessageSquare },
                  { id: 'ai-assistant', label: 'Asistente IA', icon: Bot }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStudentsView(tab.id as any)}
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

            {/* Vista General */}
            {studentsView === 'overview' && (
              <div className="space-y-6">
                {/* Estadísticas por Clase */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {classStats.map((classData, index) => (
                    <motion.div
                      key={classData.class}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="teacher-card glass-effect rounded-xl p-6 hover-lift"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold font-orbitron text-purple-300">{classData.class}</h3>
                        <span className="text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full font-rajdhani">
                          {classData.totalStudents} estudiantes
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-400 font-orbitron">{classData.activeToday}</p>
                          <p className="text-xs text-gray-400">Activos Hoy</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-400 font-orbitron">{classData.avgPerformance}%</p>
                          <p className="text-xs text-gray-400">Promedio</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Completadas:</span>
                          <span className="text-green-400 font-jetbrains">{classData.completedTasks}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Pendientes:</span>
                          <span className="text-yellow-400 font-jetbrains">{classData.pendingTasks}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Mejor estudiante:</span>
                          <span className="text-purple-400 font-jetbrains">{classData.topStudent}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="w-full bg-gray-700/50 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${classData.avgPerformance}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                            className="progress-bar h-2 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Actividad Reciente de Estudiantes */}
                <div className="teacher-card glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold flex items-center space-x-2 font-orbitron mb-6">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                    <span className="gradient-text-accent">Actividad Reciente</span>
                  </h3>
                  
                  <div className="space-y-3">
                    {recentStudentActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                            {(() => {
                              const IconComponent = getActivityIcon(activity.type);
                              return <IconComponent className="w-5 h-5" />;
                            })()}
                          </div>
                          <div>
                            <p className="font-semibold text-white font-orbitron">{activity.student}</p>
                            <p className="text-gray-400 text-sm font-rajdhani">{activity.action}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-purple-400 font-semibold font-jetbrains">{activity.points}</p>
                          <p className="text-gray-500 text-xs">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Top Performers Épico */}
                <div className="teacher-card glass-effect rounded-xl p-6 relative overflow-hidden">
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>
                  <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold flex items-center space-x-3 font-orbitron">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl flex items-center justify-center professional-glow">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <span className="gradient-text-accent">Estudiantes Destacados</span>
                      </h3>
                      <div className="flex items-center space-x-2 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-purple-300 font-rajdhani">Top 6 del mes</span>
                      </div>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {studentsProgress
                        .sort((a, b) => b.progress - a.progress)
                        .slice(0, 6)
                        .map((student, index) => (
                          <motion.div
                            key={student.id}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ 
                              delay: index * 0.15,
                              type: "spring",
                              stiffness: 120,
                              damping: 15
                            }}
                            className={`relative p-6 rounded-xl border transition-all cursor-pointer hover:scale-105 hover:shadow-2xl group ${
                              index === 0 ? 'bg-gradient-to-br from-yellow-500/10 via-yellow-600/5 to-orange-500/10 border-yellow-500/40' :
                              index === 1 ? 'bg-gradient-to-br from-gray-400/10 via-gray-500/5 to-gray-600/10 border-gray-400/40' :
                              index === 2 ? 'bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-red-500/10 border-orange-500/40' :
                              'bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-blue-500/10 border-purple-500/30'
                            }`}
                            onClick={() => setSelectedStudent(student.id)}
                          >
                            {/* Rank Badge */}
                            <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm font-orbitron shadow-lg ${
                              index === 0 ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-white shadow-yellow-500/50' :
                              index === 1 ? 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-gray-900 shadow-gray-400/50' :
                              index === 2 ? 'bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 text-white shadow-orange-500/50' :
                              'bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-500 text-white shadow-purple-500/50'
                            }`}>
                              {index + 1}
                              
                              {/* Corona para el primer lugar */}
                              {index === 0 && (
                                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                                  <div className="w-4 h-3 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-full relative">
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-1 bg-yellow-200 rounded-full"></div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Avatar y info principal */}
                            <div className="flex items-center space-x-4 mb-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg relative ${
                                index === 0 ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-2 border-yellow-400/50' :
                                index === 1 ? 'bg-gradient-to-br from-gray-400/20 to-gray-500/20 border-2 border-gray-400/50' :
                                index === 2 ? 'bg-gradient-to-br from-orange-400/20 to-red-500/20 border-2 border-orange-400/50' :
                                'bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-2 border-purple-500/50'
                              }`}>
                                <span className={`font-orbitron ${
                                  index === 0 ? 'text-yellow-300' :
                                  index === 1 ? 'text-gray-300' :
                                  index === 2 ? 'text-orange-300' :
                                  'text-purple-300'
                                }`}>
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </span>
                                
                                {/* Efecto de brillo para los primeros 3 */}
                                {index < 3 && (
                                  <div className={`absolute inset-0 rounded-full animate-pulse ${
                                    index === 0 ? 'bg-yellow-400/20' :
                                    index === 1 ? 'bg-gray-400/20' :
                                    'bg-orange-400/20'
                                  }`}></div>
                                )}
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-semibold text-white font-orbitron text-sm group-hover:text-purple-200 transition-colors">
                                  {student.name}
                                </h4>
                                <p className="text-gray-400 text-xs font-rajdhani">{student.class}</p>
                              </div>
                            </div>
                            
                            {/* Estadísticas */}
                            <div className="space-y-3">
                              <div className="grid grid-cols-3 gap-3 text-center">
                                <div className="bg-white/5 rounded-lg p-2 border border-purple-500/20">
                                  <p className="text-xs text-gray-400">Nivel</p>
                                  <p className="text-sm font-bold text-purple-400 font-orbitron">{student.level}</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-2 border border-blue-500/20">
                                  <p className="text-xs text-gray-400">XP</p>
                                  <p className="text-sm font-bold text-blue-400 font-jetbrains">{(student.xp / 1000).toFixed(1)}k</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-2 border border-green-500/20">
                                  <p className="text-xs text-gray-400">Progreso</p>
                                  <p className="text-sm font-bold text-green-400 font-orbitron">{student.progress}%</p>
                                </div>
                              </div>
                              
                              {/* Barra de progreso mejorada */}
                              <div className="relative">
                                <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${student.progress}%` }}
                                    transition={{ 
                                      delay: index * 0.15 + 0.5, 
                                      duration: 1.5, 
                                      ease: "easeOut" 
                                    }}
                                    className={`h-2 rounded-full relative ${
                                      index === 0 ? 'bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-400' :
                                      index === 1 ? 'bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400' :
                                      index === 2 ? 'bg-gradient-to-r from-orange-500 via-red-400 to-orange-400' :
                                      'bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-400'
                                    }`}
                                  >
                                    {/* Efecto de brillo en la barra */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                                  </motion.div>
                                </div>
                                
                                {/* Porcentaje flotante */}
                                <div className={`absolute right-0 -top-6 text-xs font-bold font-orbitron ${
                                  index === 0 ? 'text-yellow-400' :
                                  index === 1 ? 'text-gray-300' :
                                  index === 2 ? 'text-orange-400' :
                                  'text-purple-400'
                                }`}>
                                  {student.progress}%
                                </div>
                              </div>
                            </div>

                            {/* Badges de logros (solo para top 3) */}
                            {index < 3 && (
                              <div className="mt-4 flex justify-center">
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold font-rajdhani border ${
                                  index === 0 ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' :
                                  index === 1 ? 'bg-gray-500/20 text-gray-300 border-gray-500/40' :
                                  'bg-orange-500/20 text-orange-300 border-orange-500/40'
                                } flex items-center space-x-1`}>
                                  <Star className="w-3 h-3" />
                                  <span>
                                    {index === 0 ? 'Estudiante Destacado' :
                                     index === 1 ? 'Excelente Rendimiento' :
                                     'Gran Progreso'}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Efectos de partículas para el primer lugar */}
                            {index === 0 && (
                              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                                {[...Array(3)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                                    initial={{ 
                                      x: Math.random() * 100 + '%',
                                      y: '100%',
                                      opacity: 0 
                                    }}
                                    animate={{ 
                                      y: '-10%',
                                      opacity: [0, 1, 0] 
                                    }}
                                    transition={{
                                      duration: 3,
                                      repeat: Infinity,
                                      delay: i * 0.8,
                                      ease: "easeOut"
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ))}
                    </div>

                    {/* Stats adicionales */}
                    <div className="mt-8 pt-6 border-t border-purple-500/20">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                          </div>
                          <p className="text-lg font-bold text-green-400 font-orbitron">
                            {Math.round(studentsProgress.reduce((sum, s) => sum + s.progress, 0) / studentsProgress.length)}%
                          </p>
                          <p className="text-xs text-gray-400">Promedio Clase</p>
                        </div>
                        
                        <div>
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-indigo-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <Users className="w-5 h-5 text-purple-400" />
                          </div>
                          <p className="text-lg font-bold text-purple-400 font-orbitron">
                            {studentsProgress.filter(s => s.progress >= 80).length}
                          </p>
                          <p className="text-xs text-gray-400">Estudiantes +80%</p>
                        </div>
                        
                        <div>
                          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-orange-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <Award className="w-5 h-5 text-yellow-400" />
                          </div>
                          <p className="text-lg font-bold text-yellow-400 font-orbitron">
                            {studentsProgress.reduce((sum, s) => sum + s.achievements, 0)}
                          </p>
                          <p className="text-xs text-gray-400">Total Logros</p>
                        </div>
                        
                        <div>
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <BarChart3 className="w-5 h-5 text-blue-400" />
                          </div>
                          <p className="text-lg font-bold text-blue-400 font-orbitron">
                            {(studentsProgress.reduce((sum, s) => sum + s.xp, 0) / 1000).toFixed(0)}k
                          </p>
                          <p className="text-xs text-gray-400">XP Total</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lista Detallada */}
            {studentsView === 'list' && (
              <div className="teacher-card glass-effect rounded-xl p-6">
                <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Lista Completa de Estudiantes</h3>
                
                <div className="space-y-3">
                  {filteredAndSortedStudents.map((student, index) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="bg-white/5 rounded-lg p-4 border border-purple-500/20 hover:border-purple-400/40 transition-all cursor-pointer"
                      onClick={() => setSelectedStudent(selectedStudent === student.id ? null : student.id)}
                    >
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-3 lg:space-y-0">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full flex items-center justify-center font-bold text-white font-orbitron">
                            {student.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white font-orbitron">{student.name}</h4>
                            <p className="text-gray-400 text-sm font-rajdhani">{student.email}</p>
                            <p className="text-gray-500 text-xs">{student.class} • Último acceso: {student.lastActivity}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-purple-400 font-bold font-orbitron">Nv.{student.level}</p>
                            <p className="text-xs text-gray-400">Nivel</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-blue-400 font-bold font-orbitron">{student.progress}%</p>
                            <p className="text-xs text-gray-400">Progreso</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-green-400 font-bold font-orbitron">{student.attendance}%</p>
                            <p className="text-xs text-gray-400">Asistencia</p>
                          </div>
                          
                          <div className={`px-3 py-1 rounded-full text-xs font-rajdhani border ${getStatusColor(student.status)}`}>
                            {getStatusLabel(student.status)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Detalles expandidos */}
                      {selectedStudent === student.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-6 border-t border-purple-500/20"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Calificaciones por materia */}
                            <div>
                              <h5 className="font-semibold text-purple-300 mb-3 font-orbitron">Calificaciones por Materia</h5>
                              <div className="space-y-2">
                                {Object.entries(student.subjects).map(([subject, grade]) => (
                                  <div key={subject} className="flex justify-between items-center">
                                    <span className="text-gray-400 capitalize font-rajdhani">{subject}:</span>
                                    <span className={`font-bold font-jetbrains ${
                                      grade >= 90 ? 'text-green-400' :
                                      grade >= 80 ? 'text-blue-400' :
                                      grade >= 70 ? 'text-yellow-400' : 'text-red-400'
                                    }`}>{grade}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Estadísticas adicionales */}
                            <div>
                              <h5 className="font-semibold text-purple-300 mb-3 font-orbitron">Estadísticas</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-400 font-rajdhani">XP Total:</span>
                                  <span className="text-purple-400 font-bold font-jetbrains">{student.xp.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-400 font-rajdhani">Logros:</span>
                                  <span className="text-yellow-400 font-bold font-jetbrains">{student.achievements}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-gray-400 font-rajdhani">Mejora:</span>
                                  <span className={`font-bold font-jetbrains ${student.improvement.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
                                    {student.improvement}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Acciones rápidas */}
                          <div className="flex flex-wrap gap-3 mt-4">
                            <button className="flex items-center space-x-2 px-3 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-all font-rajdhani text-sm">
                              <MessageSquare className="w-4 h-4" />
                              <span>Enviar Mensaje</span>
                            </button>
                            <button className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all font-rajdhani text-sm">
                              <Award className="w-4 h-4" />
                              <span>Asignar Logro</span>
                            </button>
                            <button className="flex items-center space-x-2 px-3 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-all font-rajdhani text-sm">
                              <BarChart3 className="w-4 h-4" />
                              <span>Ver Reportes</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Vista de Rendimiento */}
            {studentsView === 'performance' && (
              <div className="space-y-6">
                {/* Gráfico de rendimiento general */}
                <div className="teacher-card glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Rendimiento General por Clase</h3>
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {['7mo A', '7mo B', '8vo A'].map((className, index) => {
                      const classStudents = studentsProgress.filter(s => s.class === className);
                      const avgProgress = Math.round(classStudents.reduce((sum, s) => sum + s.progress, 0) / classStudents.length);
                      
                      return (
                        <motion.div
                          key={className}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/5 rounded-lg p-6 border border-purple-500/20 text-center"
                        >
                          <h4 className="font-bold text-white font-orbitron mb-4">{className}</h4>
                          <div className="relative w-20 h-20 mx-auto mb-4">
                            <svg className="w-20 h-20 transform -rotate-90">
                              <circle
                                cx="40"
                                cy="40"
                                r="35"
                                stroke="rgb(75, 85, 99)"
                                strokeWidth="6"
                                fill="none"
                              />
                              <motion.circle
                                cx="40"
                                cy="40"
                                r="35"
                                stroke="rgb(139, 92, 246)"
                                strokeWidth="6"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 35}`}
                                initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 35 * (1 - avgProgress / 100) }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-lg font-bold text-purple-400 font-orbitron">{avgProgress}%</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Estudiantes:</span>
                              <span className="text-blue-400 font-jetbrains">{classStudents.length}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Promedio XP:</span>
                              <span className="text-green-400 font-jetbrains">
                                {Math.round(classStudents.reduce((sum, s) => sum + s.xp, 0) / classStudents.length).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Tabla de rendimiento detallada */}
                <div className="teacher-card glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Rendimiento Detallado por Materia</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-purple-500/20">
                          <th className="text-left py-3 text-purple-300 font-orbitron">Estudiante</th>
                          <th className="text-center py-3 text-purple-300 font-orbitron">Matemáticas</th>
                          <th className="text-center py-3 text-purple-300 font-orbitron">Historia</th>
                          <th className="text-center py-3 text-purple-300 font-orbitron">Ciencias</th>
                          <th className="text-center py-3 text-purple-300 font-orbitron">Lenguaje</th>
                          <th className="text-center py-3 text-purple-300 font-orbitron">Promedio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAndSortedStudents.slice(0, 8).map((student, index) => {
                          const average = Math.round((student.subjects.math + student.subjects.history + student.subjects.science + student.subjects.language) / 4);
                          
                          return (
                            <motion.tr
                              key={student.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="border-b border-gray-800/50 hover:bg-white/5 transition-colors"
                            >
                              <td className="py-3">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full flex items-center justify-center font-bold text-white font-orbitron text-xs">
                                    {student.avatar}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-white font-orbitron text-sm">{student.name}</p>
                                    <p className="text-gray-400 text-xs font-rajdhani">{student.class}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center py-3">
                                <span className={`font-bold font-jetbrains ${
                                  student.subjects.math >= 90 ? 'text-green-400' :
                                  student.subjects.math >= 80 ? 'text-blue-400' :
                                  student.subjects.math >= 70 ? 'text-yellow-400' : 'text-red-400'
                                }`}>{student.subjects.math}%</span>
                              </td>
                              <td className="text-center py-3">
                                <span className={`font-bold font-jetbrains ${
                                  student.subjects.history >= 90 ? 'text-green-400' :
                                  student.subjects.history >= 80 ? 'text-blue-400' :
                                  student.subjects.history >= 70 ? 'text-yellow-400' : 'text-red-400'
                                }`}>{student.subjects.history}%</span>
                              </td>
                              <td className="text-center py-3">
                                <span className={`font-bold font-jetbrains ${
                                  student.subjects.science >= 90 ? 'text-green-400' :
                                  student.subjects.science >= 80 ? 'text-blue-400' :
                                  student.subjects.science >= 70 ? 'text-yellow-400' : 'text-red-400'
                                }`}>{student.subjects.science}%</span>
                              </td>
                              <td className="text-center py-3">
                                <span className={`font-bold font-jetbrains ${
                                  student.subjects.language >= 90 ? 'text-green-400' :
                                  student.subjects.language >= 80 ? 'text-blue-400' :
                                  student.subjects.language >= 70 ? 'text-yellow-400' : 'text-red-400'
                                }`}>{student.subjects.language}%</span>
                              </td>
                              <td className="text-center py-3">
                                <span className={`font-bold font-jetbrains text-lg ${
                                  average >= 90 ? 'text-green-400' :
                                  average >= 80 ? 'text-blue-400' :
                                  average >= 70 ? 'text-yellow-400' : 'text-red-400'
                                }`}>{average}%</span>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Vista de Mensajes */}
            {studentsView === 'messages' && (
              <div className="space-y-6">
                {/* Resumen de mensajes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="teacher-card glass-effect rounded-xl p-4 text-center">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                    <p className="text-2xl font-bold text-blue-400 font-orbitron">{studentMessages.length}</p>
                    <p className="text-xs text-gray-400">Total Mensajes</p>
                  </div>
                  <div className="teacher-card glass-effect rounded-xl p-4 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-red-500/20 rounded-full flex items-center justify-center">
                      <span className="text-red-400 font-bold text-sm">{studentMessages.filter(m => m.unread).length}</span>
                    </div>
                    <p className="text-2xl font-bold text-red-400 font-orbitron">{studentMessages.filter(m => m.unread).length}</p>
                    <p className="text-xs text-gray-400">Sin Leer</p>
                  </div>
                  <div className="teacher-card glass-effect rounded-xl p-4 text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <span className="text-yellow-400 font-bold text-sm">!</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-400 font-orbitron">{studentMessages.filter(m => m.priority === 'high').length}</p>
                    <p className="text-xs text-gray-400">Prioridad Alta</p>
                  </div>
                </div>

                {/* Lista de mensajes */}
                <div className="teacher-card glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Mensajes de Estudiantes</h3>
                  
                  <div className="space-y-3">
                    {studentMessages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 rounded-lg border transition-all cursor-pointer hover:border-purple-400/40 ${
                          message.unread ? 'bg-blue-500/5 border-blue-500/20' : 'bg-white/5 border-purple-500/20'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full flex items-center justify-center font-bold text-white font-orbitron text-sm">
                              {message.student.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold text-white font-orbitron">{message.student}</h4>
                                {message.unread && (
                                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                )}
                                <span className={`px-2 py-1 rounded text-xs font-rajdhani ${
                                  message.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                  message.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-green-500/20 text-green-400'
                                }`}>
                                  {message.priority}
                                </span>
                              </div>
                              <p className="text-gray-300 font-rajdhani">{message.message}</p>
                              <p className="text-gray-500 text-xs mt-1">{message.time}</p>
                            </div>
                          </div>
                          <button className="flex items-center space-x-2 px-3 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-all font-rajdhani text-sm">
                            <Send className="w-4 h-4" />
                            <span>Responder</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Vista de Asistente IA */}
            {studentsView === 'ai-assistant' && (
              <div className="space-y-6">
                {/* Header del Asistente IA */}
                <div className="teacher-card glass-effect rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-400 rounded-xl flex items-center justify-center ai-glow">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-orbitron gradient-text-accent">Asistente IA Educativo</h3>
                        <p className="text-gray-400 font-rajdhani">Tu compañero inteligente para la gestión académica</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 font-rajdhani text-sm">En línea</span>
                    </div>
                  </div>

                  {/* Sugerencias rápidas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {aiSuggestions.map((suggestion, index) => (
                      <motion.div
                        key={suggestion.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleAISuggestionClick(suggestion)}
                        className="p-4 rounded-lg bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 cursor-pointer hover:border-violet-400/40 transition-all group"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getAISuggestionColor(suggestion.type)}`}>
                            {suggestion.type === 'analysis' && <Brain className="w-4 h-4" />}
                            {suggestion.type === 'suggestion' && <Lightbulb className="w-4 h-4" />}
                            {suggestion.type === 'insight' && <Sparkles className="w-4 h-4" />}
                            {suggestion.type === 'action' && <Zap className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white font-orbitron text-sm group-hover:text-violet-300 transition-colors">
                              {suggestion.title}
                            </h4>
                            <p className="text-gray-400 font-rajdhani text-xs mt-1 line-clamp-2">
                              {suggestion.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2">
                    {aiQuickActions.map((action, index) => (
                      <motion.button
                        key={action.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleAIQuickAction(action)}
                        className="flex items-center space-x-2 px-3 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-all font-rajdhani text-sm"
                      >
                        <span>{action.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Chat Interface */}
                <div className="teacher-card glass-effect rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <MessageSquare className="w-5 h-5 text-violet-350" />
                    <h3 className="text-xl font-bold font-orbitron text-white">Chat con IA</h3>
                  </div>

                  {/* Chat Messages */}
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto ai-chat-container">
                    {aiChatMessages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-3 max-w-[80%] ${
                          message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.role === 'user' 
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-400' 
                              : 'bg-gradient-to-r from-violet-500 to-purple-400'
                          }`}>
                            {message.role === 'user' ? (
                              <User className="w-4 h-4 text-white" />
                            ) : (
                              <Bot className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className={`p-3 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-blue-500/20 border border-blue-500/30 text-blue-100'
                              : 'bg-violet-500/20 border border-violet-500/30 text-violet-100'
                          }`}>
                            <p className="font-rajdhani text-sm leading-relaxed">{message.content}</p>
                            <p className="text-xs opacity-60 mt-1">{message.timestamp}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {aiTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-400 rounded-full flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="p-3 rounded-lg bg-violet-500/20 border border-violet-500/30">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Chat Input */}
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={aiChatInput}
                      onChange={(e) => setAiChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAIChat()}
                      placeholder="Pregunta algo al asistente IA..."
                      className="flex-1 px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 font-rajdhani focus:outline-none focus:border-purple-400/50 focus:ring-1 focus:ring-purple-400/20"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAIChat()}
                      disabled={!aiChatInput.trim() || aiTyping}
                      className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-400 text-white rounded-lg hover:from-violet-600 hover:to-purple-500 transition-all font-rajdhani font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar</span>
                    </motion.button>
                  </div>
                </div>

                {/* AI Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="teacher-card glass-effect rounded-xl p-4 text-center">
                    <Brain className="w-8 h-8 mx-auto mb-2 text-violet-400" />
                    <p className="text-2xl font-bold text-violet-400 font-orbitron">{aiChatMessages.length}</p>
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
            )}
          </motion.div>
        )}

        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header de Reportes */}
            <div className="teacher-card glass-effect rounded-xl p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
                <div>
                  <h2 className="text-3xl font-bold flex items-center space-x-3 font-orbitron mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-400 rounded-lg flex items-center justify-center professional-glow">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <span className="gradient-text-accent">Centro de Analíticas</span>
                  </h2>
                  <p className="text-gray-400 font-rajdhani">Reportes detallados del rendimiento académico</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-all font-rajdhani"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filtros</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={exportReport}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all font-rajdhani"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exportar</span>
                  </motion.button>
                </div>
              </div>

              {/* Panel de Filtros */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-purple-500/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">PERÍODO</label>
                      <select
                        value={reportPeriod}
                        onChange={(e) => setReportPeriod(e.target.value as any)}
                        className="w-full p-3 bg-gray-950/70 border border-gray-700/50 rounded-lg focus:border-purple-500 focus:outline-none transition-all font-rajdhani text-gray-100"
                      >
                        <option value="daily">Diario</option>
                        <option value="weekly">Semanal</option>
                        <option value="monthly">Mensual</option>
                        <option value="semester">Semestral</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">CLASE</label>
                      <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full p-3 bg-gray-950/70 border border-gray-700/50 rounded-lg focus:border-purple-500 focus:outline-none transition-all font-rajdhani text-gray-100"
                      >
                        <option value="all">Todas las clases</option>
                        {classes.map((cls) => (
                          <option key={cls.id} value={cls.name}>{cls.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">TIPO DE REPORTE</label>
                      <select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value as any)}
                        className="w-full p-3 bg-gray-950/70 border border-gray-700/50 rounded-lg focus:border-purple-500 focus:outline-none transition-all font-rajdhani text-gray-100"
                      >
                        <option value="performance">Rendimiento</option>
                        <option value="participation">Participación</option>
                        <option value="progress">Progreso</option>
                        <option value="comparative">Comparativo</option>
                        <option value="attendance">Asistencia</option>
                        <option value="behavior">Comportamiento</option>
                        <option value="detailed">Análisis Detallado</option>
                      </select>
                    </div>
                    
                    <div className="flex items-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowFilters(false)}
                        className="w-full p-3 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-all font-rajdhani"
                      >
                        Aplicar Filtros
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Estadísticas Rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="teacher-card glass-effect rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold font-orbitron text-green-300 mb-1">Sesiones Activas</h3>
                <p className="text-2xl font-bold font-jetbrains text-white">{weeklyStats.totalSessions}</p>
                <p className="text-xs text-gray-400 font-rajdhani">esta semana</p>
              </div>
              
              <div className="teacher-card glass-effect rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold font-orbitron text-blue-300 mb-1">Tiempo Promedio</h3>
                <p className="text-2xl font-bold font-jetbrains text-white">{weeklyStats.avgSessionTime}</p>
                <p className="text-xs text-gray-400 font-rajdhani">por sesión</p>
              </div>
              
              <div className="teacher-card glass-effect rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold font-orbitron text-purple-300 mb-1">Estudiantes Activos</h3>
                <p className="text-2xl font-bold font-jetbrains text-white">{weeklyStats.studentsActive}/{weeklyStats.totalStudents}</p>
                <p className="text-xs text-gray-400 font-rajdhani">{Math.round((weeklyStats.studentsActive / weeklyStats.totalStudents) * 100)}% del total</p>
              </div>
              
              <div className="teacher-card glass-effect rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold font-orbitron text-yellow-300 mb-1">Nuevos Logros</h3>
                <p className="text-2xl font-bold font-jetbrains text-white">{weeklyStats.newAchievements}</p>
                <p className="text-xs text-gray-400 font-rajdhani">esta semana</p>
              </div>
            </div>

            {/* Contenido de Reportes según tipo */}
            {reportType === 'performance' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Rendimiento por Materia */}
                <div className="teacher-card glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Rendimiento por Materia</h3>
                  <div className="space-y-4">
                    {subjectPerformance.map((subject, index) => (
                      <motion.div
                        key={subject.subject}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 rounded-lg p-4 border border-purple-500/20"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-white font-orbitron">{subject.subject}</h4>
                          <div className="flex items-center space-x-2">
                            {subject.trend === 'up' ? (
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-400" />
                            )}
                            <span className={`text-sm font-jetbrains ${subject.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                              {subject.improvement}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-gray-400 text-sm font-rajdhani">Promedio</p>
                            <p className="text-2xl font-bold text-purple-400 font-orbitron">{subject.avgScore}%</p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm font-rajdhani">Estudiantes</p>
                            <p className="text-2xl font-bold text-blue-400 font-orbitron">{subject.totalStudents}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Completadas: {subject.completedTasks}</span>
                          <span>Pendientes: {subject.pendingTasks}</span>
                        </div>
                        
                        <div className="w-full bg-gray-700/50 rounded-full h-2 mb-3">
                          <div 
                            className="progress-bar h-2 rounded-full"
                            style={{ width: `${(subject.completedTasks / (subject.completedTasks + subject.pendingTasks)) * 100}%` }}
                          />
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {subject.topicsBest.map((topic, i) => (
                            <span key={i} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded font-rajdhani">
                              ✓ {topic}
                            </span>
                          ))}
                          {subject.topicsWorst.map((topic, i) => (
                            <span key={i} className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded font-rajdhani">
                              ⚠ {topic}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Gráfico de Progreso Semanal */}
                <div className="teacher-card glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Progreso Semanal</h3>
                  <div className="space-y-6">
                    {performanceData.weekly.datasets.map((dataset, index) => (
                      <div key={dataset.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-300 font-orbitron">{dataset.name}</span>
                          <span className="text-sm font-jetbrains" style={{ color: dataset.color }}>
                            {dataset.data[dataset.data.length - 1]}%
                          </span>
                        </div>
                        <div className="flex items-end space-x-1 h-20">
                          {dataset.data.map((value, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${value}%` }}
                              transition={{ delay: index * 0.1 + i * 0.05 }}
                              className="flex-1 rounded-t"
                              style={{ 
                                backgroundColor: dataset.color,
                                minHeight: '4px'
                              }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          {performanceData.weekly.labels.map((label, i) => (
                            <span key={i}>{label}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {reportType === 'participation' && (
              <div className="teacher-card glass-effect rounded-xl p-6">
                <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Análisis de Participación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {participationData.map((data, index) => (
                    <motion.div
                      key={data.subject}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 rounded-lg p-6 border border-purple-500/20 text-center"
                    >
                      <h4 className="font-bold text-white font-orbitron mb-4">{data.subject}</h4>
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="rgb(75, 85, 99)"
                            strokeWidth="8"
                            fill="none"
                          />
                          <motion.circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="rgb(139, 92, 246)"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - data.percentage / 100) }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-purple-400 font-orbitron">{data.percentage}%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Completados:</span>
                          <span className="text-green-400 font-jetbrains">{data.completed}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Total:</span>
                          <span className="text-blue-400 font-jetbrains">{data.total}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {reportType === 'progress' && (
              <div className="teacher-card glass-effect rounded-xl p-6">
                <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Progreso Individual de Estudiantes</h3>
                <div className="space-y-4">
                  {filteredStudents.map((student, index) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/5 rounded-lg p-4 border border-purple-500/20 hover:border-purple-400/40 transition-all"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full flex items-center justify-center font-bold text-white font-orbitron">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white font-orbitron">{student.name}</h4>
                            <p className="text-gray-400 text-sm font-rajdhani">{student.class} • Nivel {student.level}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-purple-400 font-bold font-orbitron">{student.xp.toLocaleString()}</p>
                            <p className="text-xs text-gray-400">XP Total</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-blue-400 font-bold font-orbitron">{student.progress}%</p>
                            <p className="text-xs text-gray-400">Progreso</p>
                          </div>
                          
                          <div className="text-center">
                            <p className={`font-bold font-orbitron ${student.improvement.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
                              {student.improvement}
                            </p>
                            <p className="text-xs text-gray-400">Mejora</p>
                          </div>
                          
                          <div className={`px-3 py-1 rounded-full text-xs font-rajdhani border ${getStatusColor(student.status)}`}>
                            {getStatusLabel(student.status)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="w-full bg-gray-700/50 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${student.progress}%` }}
                            transition={{ delay: index * 0.05 + 0.3, duration: 1 }}
                            className="progress-bar h-2 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {reportType === 'comparative' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="teacher-card glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Comparativo por Clases</h3>
                  <div className="space-y-4">
                    {classes.map((classItem, index) => (
                      <motion.div
                        key={classItem.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 rounded-lg p-4 border border-purple-500/20"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-white font-orbitron">{classItem.name}</h4>
                          <span className="text-purple-400 font-jetbrains">{classItem.students} estudiantes</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Progreso General:</span>
                            <span className="text-blue-400 font-jetbrains">{classItem.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700/50 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${classItem.progress}%` }}
                              transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                              className="progress-bar h-2 rounded-full"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                          <div>
                            <p className="text-lg font-bold text-green-400 font-orbitron">
                              {Math.round(classItem.students * 0.7)}
                            </p>
                            <p className="text-xs text-gray-400">Activos</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-yellow-400 font-orbitron">
                              {Math.round(classItem.progress * 0.85)}%
                            </p>
                            <p className="text-xs text-gray-400">Promedio</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-purple-400 font-orbitron">
                              {Math.round(classItem.students * 0.3)}
                            </p>
                            <p className="text-xs text-gray-400">Destacados</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="teacher-card glass-effect rounded-xl p-6 relative overflow-hidden">
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-yellow-900/10 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-500/5 to-transparent rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold font-orbitron gradient-text-accent flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-600 rounded-xl flex items-center justify-center professional-glow">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <span>Ranking de Clases</span>
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>Actualizado hoy</span>
                      </div>
                    </div>

                    {/* Podio de los 3 primeros */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {classes
                        .sort((a, b) => b.progress - a.progress)
                        .slice(0, 3)
                        .map((classItem, index) => (
                          <motion.div
                            key={classItem.id}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ 
                              delay: index * 0.2,
                              type: "spring",
                              stiffness: 100,
                              damping: 15
                            }}
                            className={`relative text-center ${index === 0 ? 'order-2 md:order-1' : index === 1 ? 'order-1 md:order-2' : 'order-3'}`}
                          >
                            {/* Podio Base */}
                            <div className={`h-24 ${
                              index === 0 ? 'h-32' : index === 1 ? 'h-28' : 'h-24'
                            } ${
                              index === 0 ? 'bg-gradient-to-t from-yellow-600/30 to-yellow-400/20' :
                              index === 1 ? 'bg-gradient-to-t from-gray-600/30 to-gray-400/20' :
                              'bg-gradient-to-t from-orange-600/30 to-orange-400/20'
                            } rounded-t-xl border-t-4 ${
                              index === 0 ? 'border-yellow-400' :
                              index === 1 ? 'border-gray-300' :
                              'border-orange-400'
                            } flex items-end justify-center pb-4 relative overflow-hidden`}>
                              
                              {/* Efectos de brillo */}
                              {index === 0 && (
                                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-yellow-400/10 to-yellow-200/20 animate-pulse"></div>
                              )}
                              
                              {/* Avatar y posición */}
                              <div className="relative z-10">
                                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center font-bold text-2xl relative ${
                                  index === 0 ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white shadow-2xl shadow-yellow-400/50' :
                                  index === 1 ? 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-gray-900 shadow-2xl shadow-gray-400/50' :
                                  'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white shadow-2xl shadow-orange-400/50'
                                }`}>
                                  <span className="font-orbitron">{index + 1}</span>
                                  
                                  {/* Corona para el primer lugar */}
                                  {index === 0 && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                      <div className="w-6 h-4 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-full relative">
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-yellow-200 rounded-full"></div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="text-center">
                                  <h4 className={`font-bold text-sm font-orbitron mb-1 ${
                                    index === 0 ? 'text-yellow-300' :
                                    index === 1 ? 'text-gray-300' :
                                    'text-orange-300'
                                  }`}>
                                    {classItem.name}
                                  </h4>
                                  <p className="text-xs text-gray-400 font-rajdhani">{classItem.subject}</p>
                                </div>
                              </div>
                            </div>

                            {/* Stats del podio */}
                            <div className="bg-gray-900/50 backdrop-blur-sm p-3 rounded-b-xl border border-gray-700/50">
                              <div className="flex justify-between items-center text-xs mb-2">
                                <span className="text-gray-400">Progreso:</span>
                                <span className={`font-bold font-jetbrains ${
                                  index === 0 ? 'text-yellow-400' :
                                  index === 1 ? 'text-gray-300' :
                                  'text-orange-400'
                                }`}>
                                  {classItem.progress}%
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-400">Estudiantes:</span>
                                <span className="text-purple-400 font-jetbrains">{classItem.students}</span>
                              </div>
                              
                              {/* Barra de progreso */}
                              <div className="mt-2">
                                <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${classItem.progress}%` }}
                                    transition={{ delay: index * 0.2 + 0.5, duration: 1.5, ease: "easeOut" }}
                                    className={`h-1.5 rounded-full ${
                                      index === 0 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                                      index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-300' :
                                      'bg-gradient-to-r from-orange-500 to-orange-400'
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Efectos de partículas para el primer lugar */}
                            {index === 0 && (
                              <div className="absolute inset-0 pointer-events-none">
                                {[...Array(5)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                                    initial={{ 
                                      x: Math.random() * 100 + '%',
                                      y: '100%',
                                      opacity: 0 
                                    }}
                                    animate={{ 
                                      y: '-10%',
                                      opacity: [0, 1, 0] 
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      delay: i * 0.4,
                                      ease: "easeOut"
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                          </motion.div>
                        ))}
                    </div>

                    {/* Lista del resto de clases */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-purple-300 font-orbitron mb-4 flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5" />
                        <span>Ranking Completo</span>
                      </h4>
                      
                      {classes
                        .sort((a, b) => b.progress - a.progress)
                        .slice(3)
                        .map((classItem, index) => (
                          <motion.div
                            key={classItem.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index + 3) * 0.1 }}
                            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-purple-500/20 hover:border-purple-400/40 hover:bg-white/10 transition-all duration-300 group"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-xl flex items-center justify-center font-bold text-purple-300 font-orbitron border border-purple-500/30 group-hover:border-purple-400/50 transition-all">
                                {index + 4}
                              </div>
                              <div>
                                <h4 className="font-semibold text-white font-orbitron group-hover:text-purple-200 transition-colors">
                                  {classItem.name}
                                </h4>
                                <p className="text-gray-400 text-sm font-rajdhani">{classItem.subject}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-6">
                              <div className="text-right">
                                <p className="font-bold text-purple-400 font-orbitron text-lg">
                                  {classItem.progress}%
                                </p>
                                <p className="text-xs text-gray-400">{classItem.students} estudiantes</p>
                              </div>
                              
                              {/* Mini barra de progreso */}
                              <div className="w-16 h-2 bg-gray-700/50 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${classItem.progress}%` }}
                                  transition={{ delay: (index + 3) * 0.1 + 0.3, duration: 1 }}
                                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                                />
                              </div>
                              
                              <TrendingUp className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                            </div>
                          </motion.div>
                        ))}
                    </div>

                    {/* Estadísticas adicionales del ranking */}
                    <div className="mt-8 pt-6 border-t border-purple-500/20">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-emerald-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <TrendingUp className="w-6 h-6 text-green-400" />
                          </div>
                          <p className="text-sm font-semibold text-green-400 font-orbitron">
                            {Math.round(classes.reduce((sum, c) => sum + c.progress, 0) / classes.length)}%
                          </p>
                          <p className="text-xs text-gray-400">Promedio General</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <Users className="w-6 h-6 text-blue-400" />
                          </div>
                          <p className="text-sm font-semibold text-blue-400 font-orbitron">
                            {classes.reduce((sum, c) => sum + c.students, 0)}
                          </p>
                          <p className="text-xs text-gray-400">Total Estudiantes</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <Award className="w-6 h-6 text-yellow-400" />
                          </div>
                          <p className="text-sm font-semibold text-yellow-400 font-orbitron">
                            {classes[0]?.name || 'N/A'}
                          </p>
                          <p className="text-xs text-gray-400">Clase Líder</p>
                        </div>
                        
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-indigo-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                            <BarChart3 className="w-6 h-6 text-purple-400" />
                          </div>
                          <p className="text-sm font-semibold text-purple-400 font-orbitron">
                            {classes.filter(c => c.progress >= 80).length}
                          </p>
                          <p className="text-xs text-gray-400">Clases +80%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reporte de Asistencia */}
            {reportType === 'attendance' && (
              <div className="teacher-card glass-effect rounded-xl p-6">
                <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Análisis de Asistencia</h3>
                <div className="space-y-4">
                  {attendanceData.map((attendance, index) => (
                    <motion.div
                      key={attendance.student}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/5 rounded-lg p-4 border border-purple-500/20 hover:border-purple-400/40 transition-all"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full flex items-center justify-center font-bold text-white font-orbitron">
                            {attendance.student.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white font-orbitron">{attendance.student}</h4>
                            <p className="text-gray-400 text-sm font-rajdhani">{attendance.class}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-8">
                          <div className="grid grid-cols-3 gap-6 text-center">
                            <div>
                              <p className="text-green-400 font-bold font-orbitron text-lg">{attendance.present}</p>
                              <p className="text-xs text-gray-400">Presentes</p>
                            </div>
                            <div>
                              <p className="text-red-400 font-bold font-orbitron text-lg">{attendance.absent}</p>
                              <p className="text-xs text-gray-400">Ausentes</p>
                            </div>
                            <div>
                              <p className="text-yellow-400 font-bold font-orbitron text-lg">{attendance.late}</p>
                              <p className="text-xs text-gray-400">Tardanzas</p>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <div className="relative w-16 h-16">
                              <svg className="w-16 h-16 transform -rotate-90">
                                <circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke="rgb(75, 85, 99)"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <motion.circle
                                  cx="32"
                                  cy="32"
                                  r="28"
                                  stroke={attendance.rate >= 90 ? "rgb(34, 197, 94)" : attendance.rate >= 80 ? "rgb(245, 158, 11)" : "rgb(239, 68, 68)"}
                                  strokeWidth="4"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeDasharray={`${2 * Math.PI * 28}`}
                                  initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                                  animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - attendance.rate / 100) }}
                                  transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm font-bold text-white font-orbitron">{attendance.rate}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Reporte de Comportamiento */}
            {reportType === 'behavior' && (
              <div className="teacher-card glass-effect rounded-xl p-6">
                <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Análisis de Comportamiento</h3>
                <div className="space-y-4">
                  {behaviorData.map((behavior, index) => (
                    <motion.div
                      key={behavior.student}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white/5 rounded-lg p-4 border border-purple-500/20 hover:border-purple-400/40 transition-all"
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full flex items-center justify-center font-bold text-white font-orbitron">
                            {behavior.student.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white font-orbitron">{behavior.student}</h4>
                            <p className="text-gray-400 text-sm font-rajdhani">{behavior.class}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="bg-green-500/20 rounded-lg p-3 border border-green-500/30">
                              <p className="text-green-400 font-bold font-orbitron text-lg">{behavior.positive}</p>
                              <p className="text-xs text-gray-400">Positivos</p>
                            </div>
                            <div className="bg-gray-500/20 rounded-lg p-3 border border-gray-500/30">
                              <p className="text-gray-400 font-bold font-orbitron text-lg">{behavior.neutral}</p>
                              <p className="text-xs text-gray-400">Neutrales</p>
                            </div>
                            <div className="bg-red-500/20 rounded-lg p-3 border border-red-500/30">
                              <p className="text-red-400 font-bold font-orbitron text-lg">{behavior.negative}</p>
                              <p className="text-xs text-gray-400">Negativos</p>
                            </div>
                          </div>
                          
                          <div className={`px-4 py-2 rounded-full text-sm font-rajdhani border ${getStatusColor(behavior.overall)}`}>
                            {getStatusLabel(behavior.overall)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Barra de comportamiento */}
                      <div className="mt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs text-gray-400 font-orbitron">Balance General:</span>
                          <div className="flex-1 bg-gray-700/50 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                              style={{ 
                                width: `${Math.max(10, Math.min(90, ((behavior.positive - behavior.negative) + 10) * 4))}%`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Análisis Detallado */}
            {reportType === 'detailed' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tiempo de Estudio Semanal */}
                <div className="teacher-card glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Tiempo de Estudio Semanal</h3>
                  <div className="space-y-4">
                    <div className="flex items-end space-x-2 h-32">
                      {detailedAnalytics.timeSpent.data.map((minutes, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(minutes / Math.max(...detailedAnalytics.timeSpent.data)) * 100}%` }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="w-full bg-gradient-to-t from-purple-500 to-violet-400 rounded-t"
                            style={{ minHeight: '8px' }}
                          />
                          <span className="text-xs text-gray-400 mt-2 font-rajdhani">
                            {detailedAnalytics.timeSpent.labels[index]}
                          </span>
                          <span className="text-xs text-purple-400 font-jetbrains">{minutes}min</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-orbitron">Promedio Semanal:</span>
                        <span className="text-purple-400 font-bold font-jetbrains">
                          {Math.round(detailedAnalytics.timeSpent.data.reduce((a, b) => a + b, 0) / detailedAnalytics.timeSpent.data.length)} min/día
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Engagement por Materia */}
                <div className="teacher-card glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Engagement por Materia</h3>
                  <div className="space-y-4">
                    {detailedAnalytics.subjectEngagement.map((subject, index) => (
                      <motion.div
                        key={subject.subject}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 rounded-lg p-4 border border-purple-500/20"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-white font-orbitron">{subject.subject}</h4>
                          <span className="text-purple-400 font-jetbrains font-bold">{subject.engagement}%</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="w-full bg-gray-700/50 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${subject.engagement}%` }}
                              transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                              className="progress-bar h-2 rounded-full"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                            <div>
                              <span>Tiempo: </span>
                              <span className="text-blue-400 font-jetbrains">{subject.timeSpent}min</span>
                            </div>
                            <div>
                              <span>Interacciones: </span>
                              <span className="text-green-400 font-jetbrains">{subject.interactions}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Patrones de Aprendizaje */}
                <div className="teacher-card glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Patrones de Aprendizaje</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-purple-300 mb-3 font-orbitron">Horarios Pico de Actividad</h4>
                      <div className="flex flex-wrap gap-2">
                        {detailedAnalytics.learningPatterns.peakHours.map((hour, index) => (
                          <motion.span
                            key={hour}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-rajdhani border border-blue-500/30"
                          >
                            {hour}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-purple-300 mb-3 font-orbitron">Tipos de Contenido Preferidos</h4>
                      <div className="flex flex-wrap gap-2">
                        {detailedAnalytics.learningPatterns.preferredTypes.map((type, index) => (
                          <motion.span
                            key={type}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-3 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-rajdhani border border-green-500/30"
                          >
                            {type}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-purple-300 mb-3 font-orbitron">Áreas que Requieren Atención</h4>
                      <div className="flex flex-wrap gap-2">
                        {detailedAnalytics.learningPatterns.strugglingAreas.map((area, index) => (
                          <motion.span
                            key={area}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-rajdhani border border-red-500/30"
                          >
                            ⚠ {area}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logros y Achievements */}
                <div className="teacher-card glass-effect rounded-xl p-6">
                  <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Análisis de Logros</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-yellow-500/10 rounded-lg p-4 text-center border border-yellow-500/30">
                      <Award className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                      <p className="text-2xl font-bold text-yellow-400 font-orbitron">{detailedAnalytics.achievements.totalUnlocked}</p>
                      <p className="text-xs text-gray-400">Total Desbloqueados</p>
                    </div>
                    
                    <div className="bg-purple-500/10 rounded-lg p-4 text-center border border-purple-500/30">
                      <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                      <p className="text-2xl font-bold text-purple-400 font-orbitron">{detailedAnalytics.achievements.rareAchievements}</p>
                      <p className="text-xs text-gray-400">Logros Raros</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-orbitron">Crecimiento Semanal:</span>
                      <span className="text-green-400 font-bold font-jetbrains">{detailedAnalytics.achievements.weeklyGrowth}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 font-orbitron">Tasa de Completado:</span>
                      <span className="text-blue-400 font-bold font-jetbrains">{detailedAnalytics.achievements.completionRate}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-700/50 rounded-full h-3 mt-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${detailedAnalytics.achievements.completionRate}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="progress-bar h-3 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
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
