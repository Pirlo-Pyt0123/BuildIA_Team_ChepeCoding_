// Base de datos simulada con usuarios de ejemplo
export interface User {
  id: string;
  name: string;
  ci: string; // Cédula de identidad
  school: string; // Colegio
  grade: string; // Grado
  code: string; // Código único de usuario
  role: 'student' | 'teacher';
  profile: StudentProfile | TeacherProfile;
  createdAt: string;
  isActive: boolean;
}

export interface StudentProfile {
  name: string;
  avatar: string;
  grade: string;
  section: string;
  coins: number;
  level: number;
  experience: number;
  maxExperience: number;
  totalXP: number;
  challengesCompleted: number;
  winStreak: number;
  perfectScores: number;
  totalStudyTime: string;
  favoriteTime: string;
  learningStyle: string;
  ranking: {
    course: number;
    school: number;
    country: number;
  };
  ownedFrames: string[];
  ownedBanners: string[];
  selectedFrame: string;
  selectedBanner: string;
  achievements: Array<{
    id: string;
    name: string;
    icon: string;
    description: string;
    date: string;
  }>;
  stats: {
    accuracy: number;
    avgTime: string;
    bestSubject: string;
    improvement: string;
  };
}

export interface TeacherProfile {
  name: string;
  avatar: string;
  subject: string;
  department: string;
  yearsExperience: number;
  totalStudents: number;
  activeClasses: number;
  completedAssignments: number;
  avgPerformance: number;
  classes: string[];
  specializations: string[];
}

// Función para generar códigos únicos
const generateUniqueCode = (role: 'student' | 'teacher', index: number): string => {
  const prefix = role === 'student' ? 'EST' : 'DOC';
  const year = new Date().getFullYear().toString().slice(-2);
  const number = (index + 1).toString().padStart(4, '0');
  return `${prefix}${year}${number}`;
};

// Base de datos de estudiantes
export const students: User[] = [
  {
    id: 'student-1',
    name: 'Alex Rivera',
    ci: '12345678',
    school: 'Colegio San Miguel',
    grade: '7mo A',
    code: generateUniqueCode('student', 0),
    role: 'student',
    createdAt: '2024-01-15',
    isActive: true,
    profile: {
      name: 'Alex Rivera',
      avatar: 'A',
      grade: '7mo',
      section: 'A',
      coins: 2500,
      level: 15,
      experience: 750,
      maxExperience: 1000,
      totalXP: 12450,
      challengesCompleted: 42,
      winStreak: 7,
      perfectScores: 15,
      totalStudyTime: '127h 32m',
      favoriteTime: 'Tarde (14:00 - 18:00)',
      learningStyle: 'Visual',
      ranking: { course: 3, school: 12, country: 156 },
      ownedFrames: ['none', 'classic', 'gold'],
      ownedBanners: ['cosmic', 'ocean', 'forest'],
      selectedFrame: 'classic',
      selectedBanner: 'cosmic',
      achievements: [
        { id: 'first_challenge', name: 'Primer Desafío', icon: '🎯', description: 'Completaste tu primer desafío', date: '2024-01-20' },
        { id: 'math_master', name: 'Maestro Matemático', icon: '🧮', description: 'Completaste 10 desafíos de matemáticas', date: '2024-02-15' },
        { id: 'streak_5', name: 'Racha de 5', icon: '🔥', description: 'Ganaste 5 desafíos consecutivos', date: '2024-03-01' },
        { id: 'top_student', name: 'Estudiante Destacado', icon: '⭐', description: 'Alcanzaste el top 3 de tu clase', date: '2024-03-10' },
        { id: 'science_explorer', name: 'Explorador Científico', icon: '🔬', description: 'Completaste 5 desafíos de ciencias', date: '2024-03-20' },
        { id: 'coin_collector', name: 'Coleccionista', icon: '💰', description: 'Acumulaste 1000 monedas', date: '2024-04-01' }
      ],
      stats: {
        accuracy: 87,
        avgTime: '3m 45s',
        bestSubject: 'Matemáticas',
        improvement: '+12%'
      }
    }
  },
  {
    id: 'student-2',
    code: generateUniqueCode('student', 1),
    email: 'maria.lopez@colegio.edu',
    password: 'estudiante456',
    role: 'student',
    createdAt: '2024-01-20',
    lastLogin: '2024-06-27',
    isActive: true,
    profile: {
      name: 'María López',
      avatar: 'M',
      grade: '7mo',
      section: 'A',
      coins: 3200,
      level: 18,
      experience: 650,
      maxExperience: 1200,
      totalXP: 15800,
      challengesCompleted: 58,
      winStreak: 12,
      perfectScores: 23,
      totalStudyTime: '156h 45m',
      favoriteTime: 'Mañana (08:00 - 12:00)',
      learningStyle: 'Kinestésico',
      ranking: { course: 1, school: 3, country: 45 },
      ownedFrames: ['none', 'classic', 'gold', 'silver'],
      ownedBanners: ['cosmic', 'ocean', 'forest', 'sunset'],
      selectedFrame: 'gold',
      selectedBanner: 'sunset',
      achievements: [
        { id: 'first_challenge', name: 'Primer Desafío', icon: '🎯', description: 'Completaste tu primer desafío', date: '2024-01-25' },
        { id: 'math_master', name: 'Maestro Matemático', icon: '🧮', description: 'Completaste 10 desafíos de matemáticas', date: '2024-02-10' },
        { id: 'streak_10', name: 'Racha de 10', icon: '🔥', description: 'Ganaste 10 desafíos consecutivos', date: '2024-03-15' },
        { id: 'perfectionist', name: 'Perfeccionista', icon: '💎', description: 'Logra 20 puntajes perfectos', date: '2024-04-12' },
        { id: 'class_leader', name: 'Líder de Clase', icon: '👑', description: 'Alcanzaste el primer puesto de tu clase', date: '2024-05-01' }
      ],
      stats: {
        accuracy: 95,
        avgTime: '2m 30s',
        bestSubject: 'Matemáticas',
        improvement: '+18%'
      }
    }
  },
  {
    id: 'student-3',
    code: generateUniqueCode('student', 2),
    email: 'carlos.ruiz@colegio.edu',
    password: 'estudiante789',
    role: 'student',
    createdAt: '2024-01-18',
    lastLogin: '2024-06-26',
    isActive: true,
    profile: {
      name: 'Carlos Ruiz',
      avatar: 'C',
      grade: '7mo',
      section: 'B',
      coins: 1850,
      level: 12,
      experience: 420,
      maxExperience: 800,
      totalXP: 9200,
      challengesCompleted: 28,
      winStreak: 4,
      perfectScores: 8,
      totalStudyTime: '89h 15m',
      favoriteTime: 'Tarde (14:00 - 18:00)',
      learningStyle: 'Auditivo',
      ranking: { course: 8, school: 35, country: 287 },
      ownedFrames: ['none', 'classic', 'bronze'],
      ownedBanners: ['cosmic', 'ocean'],
      selectedFrame: 'bronze',
      selectedBanner: 'ocean',
      achievements: [
        { id: 'first_challenge', name: 'Primer Desafío', icon: '🎯', description: 'Completaste tu primer desafío', date: '2024-01-22' },
        { id: 'history_buff', name: 'Amante de la Historia', icon: '📜', description: 'Completaste 10 desafíos de historia', date: '2024-03-08' },
        { id: 'consistent', name: 'Constante', icon: '📅', description: 'Participa 30 días consecutivos', date: '2024-04-18' }
      ],
      stats: {
        accuracy: 78,
        avgTime: '4m 12s',
        bestSubject: 'Historia',
        improvement: '+8%'
      }
    }
  },
  {
    id: 'student-4',
    code: generateUniqueCode('student', 3),
    email: 'ana.torres@colegio.edu',
    password: 'estudiante321',
    role: 'student',
    createdAt: '2024-02-01',
    lastLogin: '2024-06-28',
    isActive: true,
    profile: {
      name: 'Ana Torres',
      avatar: 'A',
      grade: '8vo',
      section: 'A',
      coins: 2100,
      level: 14,
      experience: 580,
      maxExperience: 900,
      totalXP: 11300,
      challengesCompleted: 35,
      winStreak: 6,
      perfectScores: 12,
      totalStudyTime: '102h 30m',
      favoriteTime: 'Noche (18:00 - 22:00)',
      learningStyle: 'Visual',
      ranking: { course: 5, school: 18, country: 195 },
      ownedFrames: ['none', 'classic', 'silver'],
      ownedBanners: ['cosmic', 'forest', 'neon'],
      selectedFrame: 'silver',
      selectedBanner: 'neon',
      achievements: [
        { id: 'first_challenge', name: 'Primer Desafío', icon: '🎯', description: 'Completaste tu primer desafío', date: '2024-02-05' },
        { id: 'science_explorer', name: 'Explorador Científico', icon: '🔬', description: 'Completaste 5 desafíos de ciencias', date: '2024-03-22' },
        { id: 'night_owl', name: 'Búho Nocturno', icon: '🦉', description: 'Completa desafíos después de las 20:00', date: '2024-04-10' }
      ],
      stats: {
        accuracy: 85,
        avgTime: '3m 15s',
        bestSubject: 'Ciencias',
        improvement: '+15%'
      }
    }
  },
  {
    id: 'student-5',
    code: generateUniqueCode('student', 4),
    email: 'pedro.martin@colegio.edu',
    password: 'estudiante654',
    role: 'student',
    createdAt: '2024-01-25',
    lastLogin: '2024-06-25',
    isActive: true,
    profile: {
      name: 'Pedro Martín',
      avatar: 'P',
      grade: '7mo',
      section: 'A',
      coins: 1200,
      level: 9,
      experience: 280,
      maxExperience: 600,
      totalXP: 5400,
      challengesCompleted: 18,
      winStreak: 2,
      perfectScores: 4,
      totalStudyTime: '65h 20m',
      favoriteTime: 'Tarde (14:00 - 18:00)',
      learningStyle: 'Kinestésico',
      ranking: { course: 15, school: 78, country: 456 },
      ownedFrames: ['none', 'classic'],
      ownedBanners: ['cosmic'],
      selectedFrame: 'classic',
      selectedBanner: 'cosmic',
      achievements: [
        { id: 'first_challenge', name: 'Primer Desafío', icon: '🎯', description: 'Completaste tu primer desafío', date: '2024-01-28' },
        { id: 'perseverance', name: 'Perseverancia', icon: '💪', description: 'Completa un desafío después de 3 intentos', date: '2024-03-15' }
      ],
      stats: {
        accuracy: 68,
        avgTime: '5m 45s',
        bestSubject: 'Educación Física',
        improvement: '+5%'
      }
    }
  }
];

// Base de datos de profesores
export const teachers: User[] = [
  {
    id: 'teacher-1',
    code: generateUniqueCode('teacher', 0),
    email: 'prof.garcia@colegio.edu',
    password: 'profesor123',
    role: 'teacher',
    createdAt: '2023-08-15',
    lastLogin: '2024-06-28',
    isActive: true,
    profile: {
      name: 'Prof. García',
      avatar: 'G',
      subject: 'Matemáticas',
      department: 'Ciencias Exactas',
      yearsExperience: 8,
      totalStudents: 87,
      activeClasses: 5,
      completedAssignments: 23,
      avgPerformance: 85,
      classes: ['7mo A', '7mo B', '8vo A', '8vo B', '9no A'],
      specializations: ['Álgebra', 'Geometría', 'Estadística']
    }
  },
  {
    id: 'teacher-2',
    code: generateUniqueCode('teacher', 1),
    email: 'prof.martinez@colegio.edu',
    password: 'profesor456',
    role: 'teacher',
    createdAt: '2023-08-20',
    lastLogin: '2024-06-27',
    isActive: true,
    profile: {
      name: 'Prof. Martínez',
      avatar: 'M',
      subject: 'Historia',
      department: 'Ciencias Sociales',
      yearsExperience: 12,
      totalStudents: 95,
      activeClasses: 6,
      completedAssignments: 31,
      avgPerformance: 88,
      classes: ['7mo A', '7mo B', '8vo A', '8vo B', '9no A', '9no B'],
      specializations: ['Historia Antigua', 'Historia Medieval', 'Historia Contemporánea']
    }
  },
  {
    id: 'teacher-3',
    code: generateUniqueCode('teacher', 2),
    email: 'prof.rodriguez@colegio.edu',
    password: 'profesor789',
    role: 'teacher',
    createdAt: '2023-09-01',
    lastLogin: '2024-06-26',
    isActive: true,
    profile: {
      name: 'Prof. Rodríguez',
      avatar: 'R',
      subject: 'Ciencias',
      department: 'Ciencias Naturales',
      yearsExperience: 6,
      totalStudents: 78,
      activeClasses: 4,
      completedAssignments: 19,
      avgPerformance: 82,
      classes: ['8vo A', '8vo B', '9no A', '9no B'],
      specializations: ['Química', 'Física', 'Biología']
    }
  },
  {
    id: 'teacher-4',
    code: generateUniqueCode('teacher', 3),
    email: 'prof.lopez@colegio.edu',
    password: 'profesor321',
    role: 'teacher',
    createdAt: '2023-08-25',
    lastLogin: '2024-06-25',
    isActive: true,
    profile: {
      name: 'Prof. López',
      avatar: 'L',
      subject: 'Lengua y Literatura',
      department: 'Humanidades',
      yearsExperience: 10,
      totalStudents: 102,
      activeClasses: 7,
      completedAssignments: 28,
      avgPerformance: 86,
      classes: ['7mo A', '7mo B', '7mo C', '8vo A', '8vo B', '9no A', '9no B'],
      specializations: ['Gramática', 'Literatura Clásica', 'Redacción']
    }
  },
  {
    id: 'teacher-5',
    code: generateUniqueCode('teacher', 4),
    email: 'prof.fernandez@colegio.edu',
    password: 'profesor654',
    role: 'teacher',
    createdAt: '2023-09-10',
    lastLogin: '2024-06-24',
    isActive: true,
    profile: {
      name: 'Prof. Fernández',
      avatar: 'F',
      subject: 'Inglés',
      department: 'Idiomas',
      yearsExperience: 7,
      totalStudents: 134,
      activeClasses: 8,
      completedAssignments: 35,
      avgPerformance: 79,
      classes: ['7mo A', '7mo B', '7mo C', '8vo A', '8vo B', '8vo C', '9no A', '9no B'],
      specializations: ['Conversación', 'Gramática Inglesa', 'Literatura Anglosajona']
    }
  }
];

// Función para buscar usuario por email
export const findUserByEmail = (email: string): User | null => {
  const allUsers = [...students, ...teachers];
  return allUsers.find(user => user.email === email) || null;
};

// Función para buscar usuario por código
export const findUserByCode = (code: string): User | null => {
  const allUsers = [...students, ...teachers];
  return allUsers.find(user => user.code === code) || null;
};

// Función para autenticar usuario
export const authenticateUser = (emailOrCode: string, password: string): User | null => {
  let user = findUserByEmail(emailOrCode);
  if (!user) {
    user = findUserByCode(emailOrCode);
  }
  
  if (user && user.password === password && user.isActive) {
    // Actualizar último login
    user.lastLogin = new Date().toISOString().split('T')[0];
    return user;
  }
  
  return null;
};

// Función para obtener todos los estudiantes
export const getAllStudents = (): User[] => {
  return students.filter(student => student.isActive);
};

// Función para obtener todos los profesores
export const getAllTeachers = (): User[] => {
  return teachers.filter(teacher => teacher.isActive);
};

// Función para actualizar perfil de usuario
export const updateUserProfile = (userId: string, updates: Partial<StudentProfile | TeacherProfile>): boolean => {
  const allUsers = [...students, ...teachers];
  const userIndex = allUsers.findIndex(user => user.id === userId);
  
  if (userIndex !== -1) {
    allUsers[userIndex].profile = { ...allUsers[userIndex].profile, ...updates };
    return true;
  }
  
  return false;
};

// Función para cambiar contraseña
export const changePassword = (userId: string, oldPassword: string, newPassword: string): boolean => {
  const allUsers = [...students, ...teachers];
  const user = allUsers.find(u => u.id === userId);
  
  if (user && user.password === oldPassword) {
    user.password = newPassword;
    return true;
  }
  
  return false;
};

// Exportar base de datos completa para uso en componentes
export const database = {
  students,
  teachers,
  findUserByEmail,
  findUserByCode,
  authenticateUser,
  getAllStudents,
  getAllTeachers,
  updateUserProfile,
  changePassword
};
