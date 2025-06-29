import { motion } from 'framer-motion';
import {
    Coins,
    Crown,
    Home,
    LogOut,
    Menu,
    ShoppingBag,
    Target,
    Trophy,
    User,
    X
} from 'lucide-react';
import { ActiveTab } from './types';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  playerCoins: number;
  studentLevel: number;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  onLogout: () => void;
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'challenges', label: 'Desafíos', icon: Target },
  { id: 'shop', label: 'Tienda', icon: ShoppingBag },
  { id: 'rankings', label: 'Rankings', icon: Trophy },
  { id: 'profile', label: 'Perfil', icon: User }
];

export default function Navigation({
  activeTab,
  setActiveTab,
  playerCoins,
  studentLevel,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onLogout
}: NavigationProps) {
  return (
    <>
      {/* Header */}
      <header className="glass-effect border-b border-blue-500/20 sticky top-0 z-30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <img src="/BUILDEDU.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all font-rajdhani ${
                    activeTab === item.id
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* User Info & Mobile Menu */}
            <div className="flex items-center space-x-3">
              {/* Coins Counter */}
              <div className="flex items-center space-x-2 stat-counter rounded-lg px-3 py-2 border border-yellow-500/30">
                <Coins className="w-4 h-4 text-yellow-400 floating-coins" />
                <span className="font-semibold font-jetbrains text-yellow-300">{playerCoins}</span>
              </div>
              
              {/* Level Badge */}
              <div className="flex items-center space-x-2 stat-counter rounded-lg px-3 py-2 border border-blue-500/30">
                <Crown className="w-4 h-4 text-blue-400" />
                <span className="font-semibold font-jetbrains text-blue-300">{studentLevel}</span>
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
                className="md:hidden p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors"
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
            className="md:hidden overflow-hidden border-t border-blue-500/20"
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
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/10'
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
                <span>Cerrar Sesión</span>
              </button>
            </nav>
          </motion.div>
        </div>
      </header>
    </>
  );
}
