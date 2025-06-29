import { motion } from 'framer-motion';
import { LogOut, Menu, Users, X } from 'lucide-react';
import { ActiveTab, TeacherData } from './types';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  teacherData: TeacherData;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  onLogout: () => void;
  navigation: Array<{
    id: string;
    label: string;
    icon: any;
  }>;
}

export default function Navigation({
  activeTab,
  setActiveTab,
  teacherData,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onLogout,
  navigation
}: NavigationProps) {
  return (
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
                onClick={() => setActiveTab(item.id as ActiveTab)}
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
                  setActiveTab(item.id as ActiveTab);
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
  );
}
