import { motion } from 'framer-motion';
import { BarChart3, ChevronDown, Download, Filter } from 'lucide-react';
import {
    ClassData,
    ReportPeriod,
    ReportType,
    StudentProgress,
    WeeklyStats
} from './types';

interface ReportsViewProps {
  reportPeriod: ReportPeriod;
  setReportPeriod: (period: ReportPeriod) => void;
  selectedClass: string;
  setSelectedClass: (classId: string) => void;
  reportType: ReportType;
  setReportType: (type: ReportType) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  weeklyStats: WeeklyStats;
  filteredStudents: StudentProgress[];
  classes: ClassData[];
  exportReport: () => void;
}

export default function ReportsView({
  reportPeriod,
  setReportPeriod,
  selectedClass,
  setSelectedClass,
  reportType,
  setReportType,
  showFilters,
  setShowFilters,
  weeklyStats,
  filteredStudents,
  classes,
  exportReport
}: ReportsViewProps) {
  return (
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
                <label className="block text-sm font-semibold text-purple-300 mb-2 font-orbitron">Período</label>
                <select
                  value={reportPeriod}
                  onChange={(e) => setReportPeriod(e.target.value as ReportPeriod)}
                  className="w-full px-3 py-2 bg-gray-950/70 border border-gray-700/50 rounded-lg focus:border-purple-500 focus:outline-none transition-all font-rajdhani text-gray-100"
                >
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                  <option value="semester">Semestral</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-purple-300 mb-2 font-orbitron">Clase</label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-950/70 border border-gray-700/50 rounded-lg focus:border-purple-500 focus:outline-none transition-all font-rajdhani text-gray-100"
                >
                  <option value="all">Todas las clases</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.name}>{cls.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-purple-300 mb-2 font-orbitron">Tipo de Reporte</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value as ReportType)}
                  className="w-full px-3 py-2 bg-gray-950/70 border border-gray-700/50 rounded-lg focus:border-purple-500 focus:outline-none transition-all font-rajdhani text-gray-100"
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

              <div>
                <label className="block text-sm font-semibold text-purple-300 mb-2 font-orbitron">Formato</label>
                <select className="w-full px-3 py-2 bg-gray-950/70 border border-gray-700/50 rounded-lg focus:border-purple-500 focus:outline-none transition-all font-rajdhani text-gray-100">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="teacher-card glass-effect rounded-xl p-4 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold font-orbitron text-green-300 mb-1">Sesiones Activas</h3>
          <p className="text-2xl font-bold font-jetbrains text-white">{weeklyStats.totalSessions}</p>
          <p className="text-xs text-gray-400 font-rajdhani">esta semana</p>
        </div>
        
        <div className="teacher-card glass-effect rounded-xl p-4 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold font-orbitron text-blue-300 mb-1">Tiempo Promedio</h3>
          <p className="text-2xl font-bold font-jetbrains text-white">{weeklyStats.avgSessionTime}</p>
          <p className="text-xs text-gray-400 font-rajdhani">por sesión</p>
        </div>
        
        <div className="teacher-card glass-effect rounded-xl p-4 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold font-orbitron text-purple-300 mb-1">Estudiantes Activos</h3>
          <p className="text-2xl font-bold font-jetbrains text-white">{weeklyStats.studentsActive}/{weeklyStats.totalStudents}</p>
          <p className="text-xs text-gray-400 font-rajdhani">{Math.round((weeklyStats.studentsActive / weeklyStats.totalStudents) * 100)}% del total</p>
        </div>
        
        <div className="teacher-card glass-effect rounded-xl p-4 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-lg flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold font-orbitron text-yellow-300 mb-1">Nuevos Logros</h3>
          <p className="text-2xl font-bold font-jetbrains text-white">{weeklyStats.newAchievements}</p>
          <p className="text-xs text-gray-400 font-rajdhani">esta semana</p>
        </div>
      </div>

      {/* Contenido del Reporte */}
      <div className="teacher-card glass-effect rounded-xl p-6">
        <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">
          Reporte de {reportType} - {reportPeriod}
        </h3>
        
        <div className="text-center text-gray-400 py-8">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-purple-400" />
          <p className="font-orbitron">Vista de {reportType}</p>
          <p className="text-sm font-rajdhani mt-2">
            Período: {reportPeriod} | Clase: {selectedClass}
          </p>
          <p className="text-sm font-rajdhani">
            {filteredStudents.length} estudiantes en la selección
          </p>
        </div>
      </div>
    </motion.div>
  );
}
