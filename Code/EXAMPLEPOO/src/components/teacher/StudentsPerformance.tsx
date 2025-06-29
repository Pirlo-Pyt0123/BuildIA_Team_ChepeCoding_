import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { ParticipationData, PerformanceData, StudentProgress, SubjectPerformance } from './types';

interface StudentsPerformanceProps {
  students: StudentProgress[];
  selectedClass: string;
}

export default function StudentsPerformance({ students }: StudentsPerformanceProps) {
  // Mock data - in a real app, this would come from props or API
  const performanceData: PerformanceData = {
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

  const subjectPerformance: SubjectPerformance[] = [
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

  const participationData: ParticipationData[] = [
    { subject: 'Matemáticas', completed: 156, total: 180, percentage: 87 },
    { subject: 'Historia', completed: 142, total: 160, percentage: 89 },
    { subject: 'Ciencias', completed: 98, total: 140, percentage: 70 },
    { subject: 'Lenguaje', completed: 134, total: 150, percentage: 89 }
  ];

  return (
    <div className="space-y-6">
      {/* Performance by Subject */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance Cards */}
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

        {/* Weekly Progress Chart */}
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

      {/* Participation Analysis */}
      <div className="teacher-card glass-effect rounded-xl p-6">
        <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Análisis de Participación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Individual Student Progress Table */}
      <div className="teacher-card glass-effect rounded-xl p-6">
        <h3 className="text-xl font-bold font-orbitron gradient-text-accent mb-6">Progreso Individual de Estudiantes</h3>
        <div className="space-y-4">
          {students.map((student, index) => (
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
                    <p className={`font-bold font-orbitron ${student.improvement.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {student.improvement}
                    </p>
                    <p className="text-xs text-gray-400">Mejora</p>
                  </div>
                </div>
              </div>
              
              {/* Subject Breakdown */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-gray-400 text-xs">Matemáticas</p>
                  <p className="text-lg font-bold text-green-400 font-orbitron">{student.subjects.math}%</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs">Historia</p>
                  <p className="text-lg font-bold text-blue-400 font-orbitron">{student.subjects.history}%</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs">Ciencias</p>
                  <p className="text-lg font-bold text-yellow-400 font-orbitron">{student.subjects.science}%</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs">Lenguaje</p>
                  <p className="text-lg font-bold text-pink-400 font-orbitron">{student.subjects.language}%</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
