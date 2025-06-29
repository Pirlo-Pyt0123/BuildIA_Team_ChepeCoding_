// Base de datos simulada simple sin autenticación
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
    name: 'María López',
    ci: '87654321',
    school: 'Colegio San Miguel',
    grade: '7mo A',
    code: generateUniqueCode('student', 1),
    role: 'student',
    createdAt: '2024-01-18',
    isActive: true,
    profile: {
      name: 'María López',
      avatar: 'M',
      grade: '7mo',
      section: 'A',
      coins: 1800,
      level: 12,
      experience: 450,
      maxExperience: 1000,
      totalXP: 9850,
      challengesCompleted: 35,
      winStreak: 4,
      perfectScores: 12,
      totalStudyTime: '95h 15m',
      favoriteTime: 'Mañana (08:00 - 12:00)',
      learningStyle: 'Auditivo',
      ranking: { course: 5, school: 18, country: 203 },
      ownedFrames: ['none', 'classic'],
      ownedBanners: ['cosmic', 'ocean'],
      selectedFrame: 'none',
      selectedBanner: 'ocean',
      achievements: [
        { id: 'first_challenge', name: 'Primer Desafío', icon: '🎯', description: 'Completaste tu primer desafío', date: '2024-01-25' },
        { id: 'consistent_learner', name: 'Aprendiz Consistente', icon: '📚', description: 'Estudiaste 7 días seguidos', date: '2024-02-10' },
        { id: 'history_buff', name: 'Aficionado a la Historia', icon: '🏛️', description: 'Completaste 8 desafíos de historia', date: '2024-02-28' }
      ],
      stats: {
        accuracy: 82,
        avgTime: '4m 12s',
        bestSubject: 'Historia',
        improvement: '+8%'
      }
    }
  },
  {
    id: 'student-3',
    name: 'Carlos Ruiz',
    ci: '11223344',
    school: 'Colegio San Miguel',
    grade: '8vo B',
    code: generateUniqueCode('student', 2),
    role: 'student',
    createdAt: '2024-01-20',
    isActive: true,
    profile: {
      name: 'Carlos Ruiz',
      avatar: 'C',
      grade: '8vo',
      section: 'B',
      coins: 3200,
      level: 18,
      experience: 850,
      maxExperience: 1000,
      totalXP: 15600,
      challengesCompleted: 58,
      winStreak: 12,
      perfectScores: 22,
      totalStudyTime: '165h 45m',
      favoriteTime: 'Noche (20:00 - 24:00)',
      learningStyle: 'Kinestésico',
      ranking: { course: 1, school: 3, country: 45 },
      ownedFrames: ['none', 'classic', 'gold', 'diamond'],
      ownedBanners: ['cosmic', 'ocean', 'forest', 'fire'],
      selectedFrame: 'diamond',
      selectedBanner: 'fire',
      achievements: [
        { id: 'first_challenge', name: 'Primer Desafío', icon: '🎯', description: 'Completaste tu primer desafío', date: '2024-01-22' },
        { id: 'math_master', name: 'Maestro Matemático', icon: '🧮', description: 'Completaste 10 desafíos de matemáticas', date: '2024-02-05' },
        { id: 'streak_10', name: 'Racha de 10', icon: '🔥', description: 'Ganaste 10 desafíos consecutivos', date: '2024-02-20' },
        { id: 'top_student', name: 'Estudiante Destacado', icon: '⭐', description: 'Alcanzaste el top 3 de tu clase', date: '2024-03-01' },
        { id: 'science_master', name: 'Maestro Científico', icon: '🔬', description: 'Completaste 15 desafíos de ciencias', date: '2024-03-15' },
        { id: 'champion', name: 'Campeón', icon: '👑', description: 'Alcanzaste el puesto #1 en tu curso', date: '2024-04-01' }
      ],
      stats: {
        accuracy: 93,
        avgTime: '2m 58s',
        bestSubject: 'Ciencias',
        improvement: '+18%'
      }
    }
  }
];

// Base de datos de docentes
export const teachers: User[] = [
  {
    id: 'teacher-1',
    name: 'Prof. García',
    ci: '98765432',
    school: 'Colegio San Miguel',
    grade: 'Docente',
    code: generateUniqueCode('teacher', 0),
    role: 'teacher',
    createdAt: '2024-01-10',
    isActive: true,
    profile: {
      name: 'Prof. Luis García',
      avatar: 'LG',
      subject: 'Matemáticas',
      department: 'Ciencias Exactas',
      yearsExperience: 8,
      totalStudents: 120,
      activeClasses: 4,
      completedAssignments: 45,
      avgPerformance: 85,
      classes: ['7mo A', '7mo B', '8vo A', '8vo B'],
      specializations: ['Álgebra', 'Geometría', 'Estadística']
    }
  },
  {
    id: 'teacher-2',
    name: 'Prof. Martínez',
    ci: '55667788',
    school: 'Colegio San Miguel',
    grade: 'Docente',
    code: generateUniqueCode('teacher', 1),
    role: 'teacher',
    createdAt: '2024-01-12',
    isActive: true,
    profile: {
      name: 'Prof. Ana Martínez',
      avatar: 'AM',
      subject: 'Historia',
      department: 'Ciencias Sociales',
      yearsExperience: 12,
      totalStudents: 95,
      activeClasses: 3,
      completedAssignments: 38,
      avgPerformance: 82,
      classes: ['7mo A', '8vo A', '9no A'],
      specializations: ['Historia Universal', 'Historia Nacional', 'Geografía']
    }
  }
];

// Función para obtener usuario por código
export const getUserByCode = (code: string): User | null => {
  const allUsers = [...students, ...teachers];
  return allUsers.find(user => user.code === code) || null;
};

// Función para obtener usuario por CI
export const getUserByCi = (ci: string): User | null => {
  const allUsers = [...students, ...teachers];
  return allUsers.find(user => user.ci === ci) || null;
};

// Función para obtener todos los estudiantes
export const getAllStudents = (): User[] => {
  return students.filter(student => student.isActive);
};

// Función para obtener todos los docentes
export const getAllTeachers = (): User[] => {
  return teachers.filter(teacher => teacher.isActive);
};

// Función para obtener usuario por nombre
export const getUserByName = (name: string): User | null => {
  const allUsers = [...students, ...teachers];
  return allUsers.find(user => user.name.toLowerCase().includes(name.toLowerCase())) || null;
};

// Función simple para acceso sin autenticación (por código o CI)
export const getUser = (identifier: string): User | null => {
  // Intentar por código primero
  let user = getUserByCode(identifier);
  if (user) return user;
  
  // Luego por CI
  user = getUserByCi(identifier);
  if (user) return user;
  
  // Finalmente por nombre
  return getUserByName(identifier);
};

// Exportar todas las funciones y datos
export {
    students as studentsData,
    teachers as teachersData
};

