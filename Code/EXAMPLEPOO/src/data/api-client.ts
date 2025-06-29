// API Client para comunicarse con el backend
export interface User {
  id: string;
  code: string;
  email: string;
  role: 'student' | 'teacher';
  profile: StudentProfile | TeacherProfile;
  createdAt: string;
  lastLogin?: string;
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

const API_BASE_URL = 'http://localhost:3001/api';

// Función para autenticar usuario via API
export const authenticateUser = async (emailOrCode: string, password: string): Promise<User | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailOrCode, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        return null; // Credenciales incorrectas
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};

// Función de debug para ver usuarios
export const getDebugUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/debug/users`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting debug users:', error);
    return { users: [], count: 0 };
  }
};

// Exportar tipos
export type Role = 'STUDENT' | 'TEACHER';
