// Types for Teacher Dashboard components

export type ActiveTab = 'dashboard' | 'students' | 'reports' | 'observaciones';
export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'semester';
export type ReportType = 'performance' | 'participation' | 'progress' | 'comparative' | 'attendance' | 'behavior' | 'detailed';
export type StudentsView = 'overview' | 'list' | 'performance' | 'messages' | 'ai-assistant';
export type SortByField = 'name' | 'performance' | 'level' | 'activity';
export interface SortBy {
  field: SortByField;
  direction: 'asc' | 'desc';
}

export interface TeacherData {
  name: string;
  avatar: string;
  totalStudents: number;
  activeClasses: number;
  completedAssignments: number;
  avgPerformance: number;
}

export interface Activity {
  id: string;
  student: string;
  action: string;
  score?: number;
  level?: number;
  trophy?: string;
  time: string;
}

export interface ClassData {
  id: string;
  name: string;
  students: number;
  subject: string;
  progress: number;
}

export interface StudentProgress {
  id: string;
  name: string;
  class: string;
  level: number;
  xp: number;
  progress: number;
  improvement: string;
  status: 'excellent' | 'good' | 'average' | 'needs_attention';
  avatar: string;
  email: string;
  lastActivity: string;
  subjects: {
    math: number;
    history: number;
    science: number;
    language: number;
  };
  achievements: number;
  attendance: number;
}

export interface StudentMessage {
  id: string;
  student: string;
  message: string;
  time: string;
  unread: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ClassStats {
  class: string;
  totalStudents: number;
  activeToday: number;
  avgPerformance: number;
  completedTasks: number;
  pendingTasks: number;
  topStudent: string;
}

export interface SubjectPerformance {
  subject: string;
  avgScore: number;
  totalStudents: number;
  completedTasks: number;
  pendingTasks: number;
  improvement: string;
  trend: 'up' | 'down';
  topicsBest: string[];
  topicsWorst: string[];
}

export interface ParticipationData {
  subject: string;
  completed: number;
  total: number;
  percentage: number;
}

export interface PerformanceDataset {
  name: string;
  data: number[];
  color: string;
}

export interface PerformanceData {
  daily: {
    labels: string[];
    datasets: PerformanceDataset[];
  };
  weekly: {
    labels: string[];
    datasets: PerformanceDataset[];
  };
}

export interface AISuggestion {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  type: 'suggestion' | 'action' | 'analysis' | 'insight';
}

export interface AIQuickAction {
  id: string;
  label: string;
  icon: any;
  color: string;
}

export interface WeeklyStats {
  totalSessions: number;
  avgSessionTime: string;
  completionRate: number;
  studentsActive: number;
  totalStudents: number;
  newAchievements: number;
  challengesCreated: number;
  messagesExchanged: number;
}

export interface AttendanceData {
  student: string;
  class: string;
  present: number;
  absent: number;
  late: number;
  rate: number;
}

export interface BehaviorData {
  student: string;
  class: string;
  positive: number;
  neutral: number;
  negative: number;
  overall: 'excellent' | 'good' | 'average' | 'needs_attention';
}

export interface DetailedAnalytics {
  timeSpent: {
    labels: string[];
    data: number[];
  };
  subjectEngagement: Array<{
    subject: string;
    engagement: number;
    timeSpent: number;
    interactions: number;
  }>;
  learningPatterns: {
    peakHours: string[];
    preferredTypes: string[];
    strugglingAreas: string[];
  };
  achievements: {
    totalUnlocked: number;
    rareAchievements: number;
    weeklyGrowth: string;
    completionRate: number;
  };
}
