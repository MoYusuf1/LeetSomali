export interface CompletedLesson {
  lessonId: string;
  stars: 1 | 2 | 3;
  xpEarned: number;
  completedAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  unlocked: boolean;
  unlockedAt?: string;
}

export interface DailyQuest {
  id: string;
  name: string;
  target: number;
  current: number;
  reward: number;
  completed: boolean;
}

export interface UserProgress {
  username: string;
  avatar: string;
  level: number;
  xp: number;
  totalXp: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  streak: number;
  longestStreak: number;
  streakExtendedToday: boolean;
  dailyGoalXp: number;
  todayXp: number;
  lastActiveDate: string;
  completedLessons: CompletedLesson[];
  currentLessonId: string;
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  weeklyActivity: Record<string, number>;
}

export const defaultUserProgress: UserProgress = {
  username: 'soomaali_student',
  avatar: '',
  level: 3,
  xp: 320,
  totalXp: 2840,
  gems: 342,
  hearts: 5,
  maxHearts: 5,
  streak: 12,
  longestStreak: 15,
  streakExtendedToday: false,
  dailyGoalXp: 50,
  todayXp: 30,
  lastActiveDate: new Date().toISOString().split('T')[0],
  currentLessonId: 'l1-1',
  completedLessons: [
    { lessonId: 'l1-1', stars: 3, xpEarned: 25, completedAt: '2025-01-10' },
    { lessonId: 'l1-2', stars: 2, xpEarned: 20, completedAt: '2025-01-11' },
    { lessonId: 'l1-3', stars: 3, xpEarned: 25, completedAt: '2025-01-12' },
    { lessonId: 'l1-4', stars: 2, xpEarned: 20, completedAt: '2025-01-13' },
    { lessonId: 'l2-1', stars: 3, xpEarned: 25, completedAt: '2025-01-14' },
    { lessonId: 'l2-2', stars: 1, xpEarned: 15, completedAt: '2025-01-15' },
    { lessonId: 'l2-3', stars: 3, xpEarned: 25, completedAt: '2025-01-16' },
  ],
  achievements: [
    { id: 'first-lesson', name: 'First Steps', description: 'Complete your first lesson', icon: 'book', tier: 'bronze', unlocked: true, unlockedAt: '2025-01-10' },
    { id: 'streak-7', name: 'Streak Keeper', description: 'Maintain a 7-day streak', icon: 'flame', tier: 'silver', unlocked: true, unlockedAt: '2025-01-16' },
    { id: 'perfect-lesson', name: 'Perfect Score', description: 'Complete a lesson with 3 stars', icon: 'star', tier: 'gold', unlocked: true, unlockedAt: '2025-01-12' },
    { id: 'streak-30', name: 'Dedicated', description: 'Maintain a 30-day streak', icon: 'flame', tier: 'diamond', unlocked: false },
    { id: 'level-5', name: 'Grammar Master', description: 'Reach level 5', icon: 'trophy', tier: 'gold', unlocked: false },
    { id: 'xp-5000', name: 'XP Hunter', description: 'Earn 5000 XP total', icon: 'zap', tier: 'diamond', unlocked: false },
  ],
  dailyQuests: [
    { id: 'q1', name: 'Earn 50 XP', target: 50, current: 30, reward: 5, completed: false },
    { id: 'q2', name: 'Complete 2 lessons', target: 2, current: 1, reward: 10, completed: false },
    { id: 'q3', name: 'Maintain a 7-day streak', target: 7, current: 5, reward: 15, completed: false },
  ],
  weeklyActivity: {
    'Mon': 45,
    'Tue': 60,
    'Wed': 30,
    'Thu': 0,
    'Fri': 50,
    'Sat': 20,
    'Sun': 30,
  },
};
