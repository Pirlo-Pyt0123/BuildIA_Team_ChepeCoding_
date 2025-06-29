import { motion } from 'framer-motion';
import { AlertCircle, BookOpen, Eye, EyeOff, GraduationCap, Shield, Trophy, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import FloatingHelpButton from '../components/ui/FloatingHelpButton';
import GuideTooltip, { useGuide } from '../components/ui/GuideTooltip';
import { authenticateUser, User } from '../data/database';

interface LoginPageProps {
  onLogin: (role: 'student' | 'teacher', user: User) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);
  const [formData, setFormData] = useState({
    emailOrCode: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Sistema de guías
  const { isGuideActive, hasSeenGuide, startGuide, closeGuide, resetGuide } = useGuide('login');

  // Pasos de la guía para el login
  const loginGuideSteps = [
    {
      id: 'welcome',
      title: '¡Bienvenido a EduGame!',
      content: 'Esta es tu plataforma educativa gamificada. Te voy a mostrar cómo empezar.',
      target: '[data-guide="hero-title"]',
      position: 'bottom' as const,
      highlight: true
    },
    {
      id: 'role-selection',
      title: 'Selecciona tu Rol',
      content: 'Primero, elige si eres un estudiante o un docente. Cada rol tiene funcionalidades diferentes.',
      target: '[data-guide="role-selection"]',
      position: 'top' as const,
      highlight: true
    },
    {
      id: 'student-role',
      title: 'Perfil de Estudiante',
      content: 'Como estudiante, tendrás acceso a desafíos, rankings, tienda virtual y mucho más.',
      target: '[data-guide="student-button"]',
      position: 'right' as const,
      highlight: true
    },
    {
      id: 'teacher-role',
      title: 'Perfil de Docente',
      content: 'Como docente, podrás gestionar clases, crear desafíos, ver reportes y usar el asistente IA.',
      target: '[data-guide="teacher-button"]',
      position: 'right' as const,
      highlight: true
    },
    {
      id: 'features',
      title: 'Características Principales',
      content: 'Aquí puedes ver las principales características de la plataforma: gamificación, desafíos, seguridad y contenido educativo.',
      target: '[data-guide="features"]',
      position: 'top' as const,
      highlight: true
    },
    {
      id: 'form-info',
      title: 'Información de Ingreso',
      content: 'Una vez que selecciones tu rol, completa el formulario con tu información para ingresar a la plataforma.',
      target: '[data-guide="login-form"]',
      position: 'left' as const,
      highlight: true
    }
  ];

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    setSelectedRole(role);
    setLoginError('');
    setFormData({ emailOrCode: '', password: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    setIsLoading(true);
    setLoginError('');
    
    // Simular un pequeño delay para autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const user = authenticateUser(formData.emailOrCode, formData.password);
      
      if (!user) {
        setLoginError('Credenciales incorrectas. Verifica tu email/código y contraseña.');
        setIsLoading(false);
        return;
      }
      
      if (user.role !== selectedRole) {
        setLoginError(`Este usuario está registrado como ${user.role === 'student' ? 'estudiante' : 'docente'}. Selecciona el rol correcto.`);
        setIsLoading(false);
        return;
      }
      
      // Login exitoso
      onLogin(selectedRole, user);
    } catch (error) {
      setLoginError('Error al iniciar sesión. Inténtalo de nuevo.');
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Trophy, title: "Gamificación", desc: "Sistema de puntos y rankings" },
    { icon: Zap, title: "Desafíos", desc: "Competencias académicas en tiempo real" },
    { icon: Shield, title: "Seguro", desc: "Plataforma educativa protegida" },
    { icon: BookOpen, title: "Contenido", desc: "Material educativo actualizado" }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cyber Grid Background más sutil */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      
      {/* Ambient Glow Elements sutiles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl subtle-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl subtle-pulse" style={{ animationDelay: '1.5s' }}></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo/Header simplificado */}
          <div className="text-center mb-8" data-guide="hero-title">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-32 h-32 glass-effect rounded-xl mb-4 mx-auto border border-blue-500/30 overflow-hidden"
            >
              <img src="/BUILDEDU.png" alt="Logo" className="w-32 h-32 object-contain" />
            </motion.div>
            <p className="text-gray-400 font-rajdhani">
              <span className="gradient-text-accent">Plataforma Educativa del Futuro</span>
            </p>
          </div>

          {/* Role Selection simplificada */}
          {!selectedRole && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 mb-8"
              data-guide="role-selection"
            >
              <h2 className="text-xl font-semibold text-center mb-6 font-orbitron gradient-text-accent">¿Cómo quieres ingresar?</h2>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect('student')}
                className="w-full p-6 glass-effect rounded-xl border-l-4 border-blue-500/50 hover:border-blue-400 hover:bg-gray-900/30 transition-all group smooth-hover"
                data-guide="student-button"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg font-orbitron text-blue-300">Estudiante</h3>
                    <p className="text-gray-400 text-sm">Participa en desafíos y gana recompensas</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect('teacher')}
                className="w-full p-6 glass-effect rounded-xl border-l-4 border-purple-500/50 hover:border-purple-400 hover:bg-gray-900/30 transition-all group smooth-hover"
                data-guide="teacher-button"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <GraduationCap className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg font-orbitron text-purple-300">Docente</h3>
                    <p className="text-gray-400 text-sm">Gestiona clases y crea desafíos</p>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          )}

          {/* Login Form */}
          {selectedRole && (
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="glass-effect rounded-xl p-6 space-y-4 cyber-border"
              data-guide="login-form"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold font-orbitron gradient-text-accent">
                  Ingreso {selectedRole === 'student' ? 'Estudiante' : 'Docente'}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="text-gray-400 hover:text-blue-400 transition-colors font-jetbrains text-sm"
                >
                  [ cambiar ]
                </button>
              </div>

              {/* Mostrar error si existe */}
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center space-x-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm font-rajdhani">{loginError}</p>
                </motion.div>
              )}

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium mb-3 font-orbitron tracking-wider text-gray-300">
                    Email o Código de {selectedRole === 'student' ? 'Estudiante' : 'Docente'}
                  </label>
                  <input
                    type="text"
                    value={formData.emailOrCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, emailOrCode: e.target.value }))}
                    className="w-full p-4 bg-gray-950/70 border border-gray-700/50 rounded-xl focus:border-blue-500 focus:outline-none transition-all font-jetbrains text-gray-100 focus:bg-gray-950/90 loading-bar"
                    placeholder={selectedRole === 'student' ? "Ej: EST240001 o alex.rivera@colegio.edu" : "Ej: DOC240001 o prof.garcia@colegio.edu"}
                    required
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium mb-3 font-orbitron tracking-wider text-gray-300">Contraseña</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full p-4 pr-12 bg-gray-950/70 border border-gray-700/50 rounded-xl focus:border-blue-500 focus:outline-none transition-all font-jetbrains text-gray-100 focus:bg-gray-950/90 loading-bar"
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Credenciales de ejemplo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4 mt-4"
              >
                <h4 className="text-sm font-medium text-blue-300 mb-2 font-orbitron">Credenciales de Ejemplo:</h4>
                <div className="space-y-2 text-xs font-rajdhani">
                  {selectedRole === 'student' ? (
                    <>
                      <div className="text-gray-300">
                        <span className="text-blue-400">Email:</span> alex.rivera@colegio.edu | 
                        <span className="text-blue-400"> Código:</span> EST240001 | 
                        <span className="text-blue-400"> Pass:</span> estudiante123
                      </div>
                      <div className="text-gray-300">
                        <span className="text-blue-400">Email:</span> maria.lopez@colegio.edu | 
                        <span className="text-blue-400"> Código:</span> EST240002 | 
                        <span className="text-blue-400"> Pass:</span> estudiante456
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-gray-300">
                        <span className="text-purple-400">Email:</span> prof.garcia@colegio.edu | 
                        <span className="text-purple-400"> Código:</span> DOC240001 | 
                        <span className="text-purple-400"> Pass:</span> profesor123
                      </div>
                      <div className="text-gray-300">
                        <span className="text-purple-400">Email:</span> prof.martinez@colegio.edu | 
                        <span className="text-purple-400"> Código:</span> DOC240002 | 
                        <span className="text-purple-400"> Pass:</span> profesor456
                      </div>
                    </>
                  )}
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: isLoading ? 1 : 1.05, rotateX: 5 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                type="submit"
                disabled={isLoading}
                className={`w-full p-5 rounded-xl font-bold transition-all font-orbitron tracking-wider text-lg ${
                  selectedRole === 'student'
                    ? 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white border border-blue-500/50'
                    : 'bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white border border-purple-500/50'
                } hover-glow neon-pulse ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>AUTENTICANDO...</span>
                  </div>
                ) : (
                  <>
                    <span className="font-jetbrains">&gt;&gt;</span> INICIAR SESIÓN <span className="font-jetbrains">&lt;&lt;</span>
                  </>
                )}
              </motion.button>
            </motion.form>
          )}

          {/* Features simplificadas */}
          {!selectedRole && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-4 mt-8"
              data-guide="features"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="glass-effect rounded-lg p-4 text-center group hover:bg-white/10 transition-all smooth-hover"
                >
                  <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                    <feature.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  </div>
                  <h4 className="font-medium text-sm mb-1 font-orbitron text-gray-200 group-hover:text-white transition-colors">{feature.title}</h4>
                  <p className="text-xs text-gray-400 font-rajdhani group-hover:text-gray-300 transition-colors">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Sistema de Guías */}
        <GuideTooltip
          steps={loginGuideSteps}
          isActive={isGuideActive}
          onClose={closeGuide}
          onComplete={() => {
            closeGuide();
            // Opcional: mostrar mensaje de bienvenida
          }}
        />

        {/* Botón de Ayuda Flotante */}
        <FloatingHelpButton
          onClick={startGuide}
          hasSeenGuide={hasSeenGuide}
          onResetGuide={resetGuide}
        />
      </div>
    </div>
  );
}
