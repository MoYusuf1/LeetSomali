export interface UserProfile {
  name: string;
  username: string;
  level: number;
  levelTitle: string;
  xp: number;
  xpToNext: number;
  streak: number;
  longestStreak: number;
  joinDate: string;
  lessonsCompleted: number;
  totalLessons: number;
  league: string;
  gems: number;
  followers: number;
  following: number;
  avatarInitials: string;
}

export interface ActivityDay {
  date: string;
  count: number;
  xp: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  condition: string;
}

export interface ActivityItem {
  id: string;
  icon: string;
  description: string;
  timestamp: string;
  color: string;
}

export interface StatCardData {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  iconColor: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  detail?: string;
}

export const userProfile: UserProfile = {
  name: 'Ahmed Hassan',
  username: 'ahmed_somali',
  level: 12,
  levelTitle: 'Grammar Apprentice',
  xp: 12450,
  xpToNext: 15000,
  streak: 13,
  longestStreak: 45,
  joinDate: '2025-03-15',
  lessonsCompleted: 38,
  totalLessons: 50,
  league: 'Diamond',
  gems: 1240,
  followers: 234,
  following: 45,
  avatarInitials: 'AH',
};

function generateActivityData(): ActivityDay[] {
  const data: ActivityDay[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    const month = date.getMonth();

    let count = 0;
    let xp = 0;

    const rand = Math.random();
    if (rand > 0.35) {
      count = Math.floor(Math.random() * 8) + 1;
      if (count >= 6) count = 6 + Math.floor(Math.random() * 4);
      xp = count * 10 + Math.floor(Math.random() * 10);
    }

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      if (Math.random() > 0.4) {
        count = Math.max(count, Math.floor(Math.random() * 4) + 1);
        xp = count * 10;
      }
    }

    if (month === 2 || month === 3) {
      if (Math.random() > 0.3) {
        count = Math.max(count, Math.floor(Math.random() * 5) + 2);
        xp = count * 10;
      }
    }

    const dateStr = date.toISOString().split('T')[0];
    data.push({ date: dateStr, count, xp });
  }
  return data;
}

export const activityData: ActivityDay[] = generateActivityData();

export const achievements: Achievement[] = [
  {
    id: 'streak-keeper',
    name: 'Streak Keeper',
    description: 'Maintain a 30-day learning streak',
    tier: 'gold',
    icon: 'Flame',
    unlocked: true,
    unlockedDate: '2025-04-20',
    condition: '30-day streak',
  },
  {
    id: 'problem-solver',
    name: 'Problem Solver',
    description: 'Complete 50 problems',
    tier: 'silver',
    icon: 'Lightbulb',
    unlocked: true,
    unlockedDate: '2025-04-15',
    condition: '50 problems',
  },
  {
    id: 'perfect-lesson',
    name: 'Perfect Lesson',
    description: 'Complete 10 lessons with 3 stars',
    tier: 'gold',
    icon: 'Star',
    unlocked: true,
    unlockedDate: '2025-05-01',
    condition: '10 perfect lessons',
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete a lesson in under 1 minute',
    tier: 'bronze',
    icon: 'Zap',
    unlocked: true,
    unlockedDate: '2025-03-20',
    condition: 'Under 1 min',
  },
  {
    id: 'social-butterfly',
    name: 'Social Butterfly',
    description: 'Post 25 comments in the community',
    tier: 'silver',
    icon: 'MessageCircle',
    unlocked: true,
    unlockedDate: '2025-04-28',
    condition: '25 comments',
  },
  {
    id: 'grammar-master',
    name: 'Grammar Master',
    description: 'Complete all 8 levels of the curriculum',
    tier: 'diamond',
    icon: 'BookOpen',
    unlocked: false,
    condition: 'All 8 levels',
  },
  {
    id: 'first-blood',
    name: 'First Blood',
    description: 'Complete your first lesson',
    tier: 'bronze',
    icon: 'Trophy',
    unlocked: true,
    unlockedDate: '2025-03-15',
    condition: 'First lesson',
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day active streak',
    tier: 'silver',
    icon: 'Calendar',
    unlocked: true,
    unlockedDate: '2025-03-22',
    condition: '7-day streak',
  },
  {
    id: 'xp-collector',
    name: 'XP Collector',
    description: 'Earn 10,000 XP total',
    tier: 'gold',
    icon: 'Gem',
    unlocked: true,
    unlockedDate: '2025-04-25',
    condition: '10,000 XP',
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Complete a lesson after midnight',
    tier: 'bronze',
    icon: 'Moon',
    unlocked: true,
    unlockedDate: '2025-04-02',
    condition: 'After midnight',
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete a lesson before 7am',
    tier: 'bronze',
    icon: 'Sun',
    unlocked: true,
    unlockedDate: '2025-03-28',
    condition: 'Before 7am',
  },
  {
    id: 'helping-hand',
    name: 'Helping Hand',
    description: 'Reply to 10 community questions',
    tier: 'silver',
    icon: 'HandHeart',
    unlocked: false,
    condition: '10 replies',
  },
];

export const activityFeed: ActivityItem[] = [
  {
    id: '1',
    icon: 'Star',
    description: 'Completed "Present Habitual Tense" — 3 stars, +30 XP',
    timestamp: '2025-05-17T08:30:00Z',
    color: '#f59e0b',
  },
  {
    id: '2',
    icon: 'Flame',
    description: 'Extended streak to 13 days',
    timestamp: '2025-05-17T08:30:00Z',
    color: '#ef4444',
  },
  {
    id: '3',
    icon: 'MessageCircle',
    description: 'Commented on "Word Order (SOV)" lesson',
    timestamp: '2025-05-17T05:15:00Z',
    color: '#3b82f6',
  },
  {
    id: '4',
    icon: 'Trophy',
    description: 'Ranked #3 on weekly leaderboard',
    timestamp: '2025-05-16T14:00:00Z',
    color: '#a855f7',
  },
  {
    id: '5',
    icon: 'Star',
    description: 'Completed "Noun Gender" — 2 stars, +20 XP',
    timestamp: '2025-05-16T10:20:00Z',
    color: '#f59e0b',
  },
  {
    id: '6',
    icon: 'BookOpen',
    description: 'Started "Level 2 — Noun System"',
    timestamp: '2025-05-15T09:00:00Z',
    color: '#22c55e',
  },
  {
    id: '7',
    icon: 'Zap',
    description: 'Completed "Definite Article" in 45 seconds — +15 XP bonus',
    timestamp: '2025-05-15T08:45:00Z',
    color: '#eab308',
  },
  {
    id: '8',
    icon: 'Heart',
    description: 'Earned "Speed Demon" achievement',
    timestamp: '2025-05-14T16:30:00Z',
    color: '#ef4444',
  },
  {
    id: '9',
    icon: 'Flame',
    description: 'Completed daily challenge — +50 XP',
    timestamp: '2025-05-14T07:15:00Z',
    color: '#f59e0b',
  },
  {
    id: '10',
    icon: 'Gem',
    description: 'Earned 100 gems from weekly league reward',
    timestamp: '2025-05-13T20:00:00Z',
    color: '#22d3ee',
  },
];

export const statCards: StatCardData[] = [
  {
    id: 'total-xp',
    label: 'Total XP',
    value: 12450,
    suffix: '',
    icon: 'Star',
    iconColor: '#f59e0b',
    trend: '+320 this week',
    trendDirection: 'up',
  },
  {
    id: 'lessons-completed',
    label: 'Lessons Completed',
    value: 38,
    suffix: '',
    icon: 'BookOpen',
    iconColor: '#22c55e',
    trend: '12 this month',
    trendDirection: 'up',
  },
  {
    id: 'accuracy-rate',
    label: 'Accuracy Rate',
    value: 87,
    suffix: '%',
    icon: 'Target',
    iconColor: '#3b82f6',
    trend: '+2% this week',
    trendDirection: 'up',
  },
  {
    id: 'avg-time',
    label: 'Average Time',
    value: 2.24,
    suffix: '',
    icon: 'Clock',
    iconColor: '#a855f7',
    detail: 'per lesson',
  },
  {
    id: 'current-streak',
    label: 'Current Streak',
    value: 13,
    suffix: ' days',
    icon: 'Flame',
    iconColor: '#ef4444',
    detail: 'Best: 45',
  },
  {
    id: 'gems-earned',
    label: 'Gems Earned',
    value: 1240,
    suffix: '',
    icon: 'Gem',
    iconColor: '#22d3ee',
    detail: 'Spend in shop',
  },
];
