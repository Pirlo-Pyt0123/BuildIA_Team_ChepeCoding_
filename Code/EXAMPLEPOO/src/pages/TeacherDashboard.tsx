import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Award,
  BarChart3,
  Bot,
  Calendar,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Mic,
  Play,
  Plus,
  Search,
  Settings,
  TrendingUp,
  Trophy,
  Users,
  Volume2,
  X
} from 'lucide-react';
import { useState } from 'react';
import ObservacionesViewRobust from '../components/teacher/ObservacionesViewRobust';

interface TeacherDashboardProps {
  onLogout: () => void;
}

interface Student {
  id: string;
  name: string;
  avatar: string;
  course: string;
  performance: number;
  challenges: number;
  coins: number;
  lastActivity: string;
  status: 'online' | 'offline';
}

interface Challenge {
  id: string;
  title: string;
  subject: string;
  participants: number;
  completed: number;
  averageScore: number;
  date: string;
  status: 'active' | 'completed' | 'draft';
}

interface StudentObservation {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  date: string;
  time: string;
  audioTranscription: string;
  behaviorScore: number; // 1-10 (1=malo, 10=excelente)
  behaviorDescription: string;
  offensiveWords: string[];
  hasOffensiveContent: boolean;
  audioFile?: string; // URL del archivo de audio
  duration: number; // duración en segundos
  context: string; // contexto de la observación (clase, recreo, etc.)
  severity: 'low' | 'medium' | 'high';
  teacherNotes?: string;
}

export default function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'challenges' | 'observaciones' | 'reports' | 'messages'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('7A');

  // Mock data
  const students: Student[] = [
    { id: '1', name: 'Ana García', avatar: '👩‍🎓', course: '7A', performance: 95, challenges: 12, coins: 2450, lastActivity: '2 min', status: 'online' },
    { id: '2', name: 'Carlos López', avatar: '👨‍🎓', course: '7A', performance: 87, challenges: 10, coins: 1980, lastActivity: '15 min', status: 'online' },
    { id: '3', name: 'María Rodríguez', avatar: '👩‍🎓', course: '7A', performance: 92, challenges: 11, coins: 2230, lastActivity: '1 hora', status: 'offline' },
    { id: '4', name: 'Diego Morales', avatar: '👨‍🎓', course: '7A', performance: 78, challenges: 8, coins: 1560, lastActivity: '3 horas', status: 'offline' },
    { id: '5', name: 'Sofía Martín', avatar: '👩‍🎓', course: '7A', performance: 89, challenges: 9, coins: 1890, lastActivity: '30 min', status: 'online' }
  ];

  const challenges: Challenge[] = [
    { id: '1', title: 'Ecuaciones Lineales', subject: 'Matemáticas', participants: 28, completed: 22, averageScore: 85, date: '2025-01-15', status: 'active' },
    { id: '2', title: 'Revolución Francesa', subject: 'Historia', participants: 25, completed: 25, averageScore: 92, date: '2025-01-14', status: 'completed' },
    { id: '3', title: 'Sistema Solar', subject: 'Ciencias', participants: 30, completed: 18, averageScore: 78, date: '2025-01-16', status: 'active' }
  ];

  // Mock data para observaciones de estudiantes
  const studentObservations: StudentObservation[] = [
    {
      id: '1',
      studentId: '2',
      studentName: 'Carlos López',
      studentAvatar: '👨‍🎓',
      date: '2025-06-28',
      time: '10:30',
      audioTranscription: 'Carlos estaba hablando durante la explicación de matemáticas, diciendo que no entiende nada y que esto es muy difícil. También mencionó algunas palabras inapropiadas hacia el profesor.',
      behaviorScore: 4,
      behaviorDescription: 'Comportamiento disruptivo durante la clase, falta de respeto hacia el profesor',
      offensiveWords: ['estúpido', 'idiota'],
      hasOffensiveContent: true,
      audioFile: '/audio/carlos_20250628_1030.mp3',
      duration: 45,
      context: 'Clase de Matemáticas',
      severity: 'medium',
      teacherNotes: 'Necesita apoyo adicional en matemáticas. Hablar con padres sobre comportamiento.'
    },
    {
      id: '2',
      studentId: '4',
      studentName: 'Diego Morales',
      studentAvatar: '👨‍🎓',
      date: '2025-06-27',
      time: '14:15',
      audioTranscription: 'Diego ayudó a un compañero con el ejercicio de ciencias, explicándole paso a paso la metodología. Mostró una actitud muy colaborativa y positiva.',
      behaviorScore: 9,
      behaviorDescription: 'Excelente comportamiento colaborativo, ayuda a compañeros',
      offensiveWords: [],
      hasOffensiveContent: false,
      audioFile: '/audio/diego_20250627_1415.mp3',
      duration: 120,
      context: 'Clase de Ciencias',
      severity: 'low',
      teacherNotes: 'Estudiante ejemplar, considera para rol de tutor de pares.'
    },
    {
      id: '3',
      studentId: '1',
      studentName: 'Ana García',
      studentAvatar: '👩‍🎓',
      date: '2025-06-26',
      time: '09:45',
      audioTranscription: 'Ana participó activamente en la discusión sobre historia, mostrando conocimiento profundo del tema y haciendo preguntas muy pertinentes sobre la Revolución Francesa.',
      behaviorScore: 10,
      behaviorDescription: 'Participación excepcional, liderazgo académico',
      offensiveWords: [],
      hasOffensiveContent: false,
      audioFile: '/audio/ana_20250626_0945.mp3',
      duration: 180,
      context: 'Clase de Historia',
      severity: 'low',
      teacherNotes: 'Estudiante destacada, considerar para actividades de liderazgo.'
    },
    {
      id: '4',
      studentId: '3',
      studentName: 'María Rodríguez',
      studentAvatar: '👩‍🎓',
      date: '2025-06-25',
      time: '11:20',
      audioTranscription: 'María tuvo una discusión acalorada con un compañero durante el recreo, usando lenguaje inapropiado y mostrando agresividad. La situación escaló rápidamente.',
      behaviorScore: 2,
      behaviorDescription: 'Comportamiento agresivo, conflicto con compañeros',
      offensiveWords: ['maldito', 'imbécil', 'odio'],
      hasOffensiveContent: true,
      audioFile: '/audio/maria_20250625_1120.mp3',
      duration: 90,
      context: 'Recreo',
      severity: 'high',
      teacherNotes: 'URGENTE: Citar a padres. Implementar plan de manejo de ira.'
    },
    {
      id: '5',
      studentId: '5',
      studentName: 'Sofía Martín',
      studentAvatar: '👩‍🎓',
      date: '2025-06-24',
      time: '15:30',
      audioTranscription: 'Sofía presentó su proyecto de ciencias con mucha confianza y claridad, respondiendo todas las preguntas de manera articulada y mostrando dominio del tema.',
      behaviorScore: 8,
      behaviorDescription: 'Excelente presentación, confianza y conocimiento',
      offensiveWords: [],
      hasOffensiveContent: false,
      audioFile: '/audio/sofia_20250624_1530.mp3',
      duration: 300,
      context: 'Presentación de Proyecto',
      severity: 'low',
      teacherNotes: 'Muy buen trabajo. Considerar para competencias académicas.'
    }
  ];

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Estudiantes', icon: Users },
    { id: 'challenges', label: 'Desafíos', icon: Trophy },
    { id: 'observaciones', label: 'Observaciones', icon: Mic },
    { id: 'reports', label: 'Reportes', icon: FileText },
    { id: 'messages', label: 'Mensajes', icon: MessageSquare }
  ];

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-400 bg-green-400/20';
    if (performance >= 80) return 'text-yellow-400 bg-yellow-400/20';
    return 'text-red-400 bg-red-400/20';
  };

  const getBehaviorColor = (score: number) => {
    if (score >= 8) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (score >= 6) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    if (score >= 4) return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
    return 'text-red-400 bg-red-500/20 border-red-500/30';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Desconocida';
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const MobileMenu = () => (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900/95 backdrop-blur-md border-r border-white/10 lg:hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold gradient-text">Menú</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="space-y-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-cyber-500/20 border border-cyber-500/30' 
                  : 'hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
          
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500/20 transition-colors text-red-400 mt-8"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </nav>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && <MobileMenu />}

      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyber-500 to-matrix-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">EduPlatform Teacher</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === item.id 
                      ? 'bg-cyber-500/20 border border-cyber-500/30' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-white/5 rounded-lg px-3 py-2">
                <Users className="w-4 h-4 text-cyber-400" />
                <span className="font-semibold">{students.length} estudiantes</span>
              </div>
              <button
                onClick={onLogout}
                className="hidden lg:flex items-center space-x-2 px-3 py-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Welcome Section */}
            <div className="glass-effect rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Panel del Docente 👨‍🏫</h1>
                  <p className="text-gray-400">Gestiona tu clase y evalúa el progreso de tus estudiantes</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-cyber-500 focus:outline-none"
                  >
                    <option value="7A">7° A</option>
                    <option value="7B">7° B</option>
                    <option value="8A">8° A</option>
                  </select>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-cyber-500 to-matrix-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Desafío</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="glass-effect rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Estudiantes</p>
                    <p className="text-2xl font-bold text-cyber-400">{students.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-cyber-400" />
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Desafíos Activos</p>
                    <p className="text-2xl font-bold text-neon-400">
                      {challenges.filter(c => c.status === 'active').length}
                    </p>
                  </div>
                  <Trophy className="w-8 h-8 text-neon-400" />
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Promedio General</p>
                    <p className="text-2xl font-bold text-green-400">
                      {Math.round(students.reduce((acc, s) => acc + s.performance, 0) / students.length)}%
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Estudiantes Online</p>
                    <p className="text-2xl font-bold text-matrix-400">
                      {students.filter(s => s.status === 'online').length}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-matrix-400" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-cyber-400" />
                  <span>Actividad Reciente</span>
                </h3>
                
                <div className="space-y-3">
                  {students.slice(0, 5).map((student) => (
                    <div key={student.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-neon-500/20 to-cyber-500/20 rounded-full flex items-center justify-center">
                        {student.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-400">Último acceso: {student.lastActivity}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        student.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-neon-400" />
                  <span>Desafíos Destacados</span>
                </h3>
                
                <div className="space-y-3">
                  {challenges.map((challenge) => (
                    <div key={challenge.id} className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{challenge.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          challenge.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {challenge.status === 'active' ? 'Activo' : 'Completado'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>{challenge.subject}</span>
                        <span>{challenge.completed}/{challenge.participants} completados</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progreso</span>
                          <span>{Math.round((challenge.completed / challenge.participants) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-cyber-500 to-neon-500 h-2 rounded-full"
                            style={{ width: `${(challenge.completed / challenge.participants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
            <div className="glass-effect rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 mb-6">
                <h2 className="text-2xl font-bold">Gestión de Estudiantes</h2>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Buscar estudiante..."
                      className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-500 focus:outline-none"
                    />
                  </div>
                  <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4">Estudiante</th>
                      <th className="text-left p-4">Curso</th>
                      <th className="text-left p-4">Rendimiento</th>
                      <th className="text-left p-4">Desafíos</th>
                      <th className="text-left p-4">Monedas</th>
                      <th className="text-left p-4">Estado</th>
                      <th className="text-left p-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-neon-500/20 to-cyber-500/20 rounded-full flex items-center justify-center">
                              {student.avatar}
                            </div>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </td>
                        <td className="p-4">{student.course}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPerformanceColor(student.performance)}`}>
                            {student.performance}%
                          </span>
                        </td>
                        <td className="p-4">{student.challenges}</td>
                        <td className="p-4 font-semibold text-yellow-400">{student.coins}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              student.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                            }`}></div>
                            <span className={`text-sm ${
                              student.status === 'online' ? 'text-green-400' : 'text-gray-400'
                            }`}>
                              {student.status === 'online' ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-2 bg-cyber-500/20 hover:bg-cyber-500/30 rounded-lg transition-colors">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-neon-500/20 hover:bg-neon-500/30 rounded-lg transition-colors">
                              <Award className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sección de Observaciones de Estudiantes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-xl p-6"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Observaciones de Estudiantes</h2>
                    <p className="text-gray-400 text-sm">Grabaciones de audio y análisis de comportamiento</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-blue-500/20 rounded-lg px-3 py-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-blue-300 font-semibold">{studentObservations.length} observaciones</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nueva Observación</span>
                  </motion.button>
                </div>
              </div>

              {/* Filtros y búsqueda */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 mb-6 p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Buscar por estudiante..."
                      className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
                    />
                  </div>
                  <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-purple-500 focus:outline-none">
                    <option value="">Todos los contextos</option>
                    <option value="Clase de Matemáticas">Matemáticas</option>
                    <option value="Clase de Ciencias">Ciencias</option>
                    <option value="Clase de Historia">Historia</option>
                    <option value="Recreo">Recreo</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Filtrar por severidad:</span>
                  <div className="flex space-x-2">
                    {['low', 'medium', 'high'].map((severity) => (
                      <button
                        key={severity}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${getSeverityColor(severity)}`}
                      >
                        {getSeverityLabel(severity)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lista de observaciones */}
              <div className="space-y-4">
                {studentObservations.map((observation) => (
                  <motion.div
                    key={observation.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                  >
                    {/* Header de la observación */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                          <span className="text-xl">{observation.studentAvatar}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{observation.studentName}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{observation.date} • {observation.time}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatDuration(observation.duration)}</span>
                            </span>
                            <span className="bg-purple-500/20 px-2 py-1 rounded-full text-xs">
                              {observation.context}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {/* Indicador de severidad */}
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(observation.severity)}`}>
                          {getSeverityLabel(observation.severity)}
                        </div>
                        
                        {/* Score de comportamiento */}
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBehaviorColor(observation.behaviorScore)}`}>
                          Comportamiento: {observation.behaviorScore}/10
                        </div>
                        
                        {/* Indicador de contenido ofensivo */}
                        {observation.hasOffensiveContent && (
                          <div className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 border border-red-500/30 text-red-400 flex items-center space-x-1">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Contenido Ofensivo</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contenido principal */}
                    <div className="grid gap-4 lg:grid-cols-2">
                      {/* Transcripción del audio */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Volume2 className="w-4 h-4 text-blue-400" />
                          <h4 className="text-sm font-semibold text-blue-400">Transcripción del Audio</h4>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <p className="text-sm text-gray-300 leading-relaxed">
                            "{observation.audioTranscription}"
                          </p>
                        </div>
                        
                        {/* Controles de audio */}
                        <div className="flex items-center space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 bg-blue-500/20 hover:bg-blue-500/30 px-3 py-2 rounded-lg transition-colors"
                          >
                            <Play className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-blue-300">Reproducir Audio</span>
                          </motion.button>
                          <span className="text-xs text-gray-500">
                            {observation.audioFile}
                          </span>
                        </div>
                      </div>

                      {/* Análisis de comportamiento */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4 text-green-400" />
                          <h4 className="text-sm font-semibold text-green-400">Análisis de Comportamiento</h4>
                        </div>
                        
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-3">
                          <div>
                            <span className="text-xs text-gray-400 uppercase tracking-wide">Descripción:</span>
                            <p className="text-sm text-gray-300 mt-1">{observation.behaviorDescription}</p>
                          </div>
                          
                          {observation.hasOffensiveContent && (
                            <div>
                              <span className="text-xs text-red-400 uppercase tracking-wide">Palabras Detectadas:</span>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {observation.offensiveWords.map((word, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-md text-xs text-red-300"
                                  >
                                    {word}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {observation.teacherNotes && (
                            <div>
                              <span className="text-xs text-purple-400 uppercase tracking-wide">Notas del Profesor:</span>
                              <p className="text-sm text-purple-200 mt-1 italic">{observation.teacherNotes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Contactar Padres</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>Exportar</span>
                        </motion.button>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        ID: {observation.id}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Estadísticas rápidas */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {studentObservations.filter(obs => obs.behaviorScore >= 8).length}
                  </div>
                  <div className="text-xs text-green-300">Comportamiento Excelente</div>
                </div>
                
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {studentObservations.filter(obs => obs.behaviorScore >= 6 && obs.behaviorScore < 8).length}
                  </div>
                  <div className="text-xs text-yellow-300">Comportamiento Regular</div>
                </div>
                
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {studentObservations.filter(obs => obs.hasOffensiveContent).length}
                  </div>
                  <div className="text-xs text-red-300">Con Contenido Ofensivo</div>
                </div>
                
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {studentObservations.filter(obs => obs.severity === 'high').length}
                  </div>
                  <div className="text-xs text-purple-300">Severidad Alta</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'challenges' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 mb-6">
                <h2 className="text-2xl font-bold">Gestión de Desafíos</h2>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-cyber-500 to-matrix-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Crear Desafío</span>
                </motion.button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {challenges.map((challenge) => (
                  <motion.div
                    key={challenge.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-lg p-6 border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{challenge.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        challenge.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : challenge.status === 'completed'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {challenge.status === 'active' ? 'Activo' : 
                         challenge.status === 'completed' ? 'Completado' : 'Borrador'}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Materia:</span>
                        <span className="font-medium">{challenge.subject}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Participantes:</span>
                        <span className="font-medium">{challenge.participants}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Completados:</span>
                        <span className="font-medium text-green-400">{challenge.completed}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Promedio:</span>
                        <span className="font-medium text-yellow-400">{challenge.averageScore}%</span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progreso</span>
                          <span>{Math.round((challenge.completed / challenge.participants) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-cyber-500 to-neon-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(challenge.completed / challenge.participants) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-cyber-500/20 hover:bg-cyber-500/30 text-cyber-400 py-2 rounded-lg font-medium transition-colors"
                      >
                        Ver Resultados
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-neon-500/20 hover:bg-neon-500/30 rounded-lg transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'observaciones' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <ObservacionesViewRobust />
          </motion.div>
        )}

        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Generador de Reportes</h2>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'Reporte de Rendimiento', desc: 'Análisis detallado del progreso estudiantil', icon: BarChart3, color: 'neon' },
                  { title: 'Reporte de Participación', desc: 'Actividad y engagement de los estudiantes', icon: Users, color: 'cyber' },
                  { title: 'Reporte de Desafíos', desc: 'Estadísticas de desafíos y competencias', icon: Trophy, color: 'matrix' }
                ].map((report, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-lg p-6 border border-white/10 cursor-pointer group"
                  >
                    <div className={`w-12 h-12 bg-${report.color}-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-${report.color}-500/30 transition-colors`}>
                      <report.icon className={`w-6 h-6 text-${report.color}-400`} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{report.desc}</p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full bg-gradient-to-r from-${report.color}-500 to-${report.color}-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center space-x-2`}
                    >
                      <Download className="w-4 h-4" />
                      <span>Generar PDF</span>
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Centro de Mensajería</h2>
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-matrix-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Asistente IA</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-cyber-500 to-neon-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Mensaje</span>
                  </motion.button>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                {/* Students List */}
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Estudiantes</h3>
                  <div className="space-y-2">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-r from-neon-500/20 to-cyber-500/20 rounded-full flex items-center justify-center">
                          {student.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-gray-400">Online hace {student.lastActivity}</p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          student.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Area */}
                <div className="lg:col-span-2 bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                    <h3 className="font-semibold">Chat General</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-400">3 estudiantes online</span>
                    </div>
                  </div>

                  <div className="h-64 overflow-y-auto mb-4 space-y-3">
                    {/* Mock messages */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-neon-500/20 to-cyber-500/20 rounded-full flex items-center justify-center">
                        👩‍🎓
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 max-w-xs">
                        <p className="text-sm font-medium mb-1">Ana García</p>
                        <p className="text-sm">¿Podrías explicar mejor el último ejercicio de matemáticas?</p>
                        <p className="text-xs text-gray-400 mt-1">Hace 5 min</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 justify-end">
                      <div className="bg-cyber-500/20 rounded-lg p-3 max-w-xs">
                        <p className="text-sm font-medium mb-1">Profesor</p>
                        <p className="text-sm">¡Por supuesto! Te explico paso a paso...</p>
                        <p className="text-xs text-gray-400 mt-1">Hace 3 min</p>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-r from-cyber-500/20 to-matrix-500/20 rounded-full flex items-center justify-center">
                        👨‍🏫
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Escribe un mensaje..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:border-cyber-500 focus:outline-none"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-cyber-500 to-neon-500 text-white p-2 rounded-lg"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
