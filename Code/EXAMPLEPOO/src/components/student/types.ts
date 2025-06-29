// Tipos e interfaces compartidos para el dashboard del estudiante

export interface Challenge {
  id: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  coins: number;
  time: string;
  participants: number;
  title?: string;
  description?: string;
}

export interface Reward {
  id: string;
  name: string;
  image: string;
  coins: number;
  category: string;
  available: boolean;
  rarity?: string;
  description?: string;
  frameId?: string;
  bannerId?: string;
}

export interface ShopItem {
  id: string;
  price: number;
  rarity: string;
}

export interface StudentData {
  name: string;
  avatar: string;
  coins: number;
  level: number;
  experience: number;
  maxExperience: number;
  weeklyProgress: number;
  ranking: {
    course: number;
    school: number;
    country: number;
  };
  totalXP: number;
  challengesCompleted: number;
  winStreak: number;
  perfectScores: number;
  totalStudyTime: string;
  favoriteTime: string;
  learningStyle: string;
  achievements: Achievement[];
  stats: {
    accuracy: number;
    avgTime: string;
    bestSubject: string;
    improvement: string;
  };
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  date: string;
}

export interface BannerOption {
  id: string;
  name: string;
  gradient: string;
  description: string;
  type: string;
}

export interface FrameOption {
  id: string;
  name: string;
  className: string;
  description: string;
}

export type ActiveTab = 'dashboard' | 'challenges' | 'shop' | 'rankings' | 'profile';
