import { motion } from 'framer-motion';
import {
    Award,
    BookOpen,
    Calendar,
    MessageSquare,
    TrendingUp,
    Users
} from 'lucide-react';
import { Activity, TeacherData } from './types';

interface DashboardViewProps {
  teacherData: TeacherData;
  recentActivity: Activity[];
}

export default function DashboardView({
  teacherData,
  recentActivity
}: DashboardViewProps) {
  return (
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
  );
}
