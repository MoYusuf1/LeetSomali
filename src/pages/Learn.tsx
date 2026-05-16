import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame, Gem, Heart, BookOpen, Zap, Headphones, Pen, ArrowRight,
  Trophy, Target, Calendar, GitBranch, Star,
  Settings, ChevronRight, Award
} from 'lucide-react';
import { lessons } from '@/data/lessons';
import { defaultUserProgress } from '@/data/userProgress';
import LessonTree from '@/components/LessonTree';
import DailyQuests from '@/components/DailyQuests';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import ContinueLearning from '@/components/ContinueLearning';

const navItems = [
  { label: "Today's Lessons", icon: Calendar, active: true },
  { label: 'Lesson Tree', icon: GitBranch, active: false },
  { label: 'Practice', icon: Target, active: false },
  { label: 'Leaderboard', icon: Trophy, active: false },
  { label: 'Achievements', icon: Award, active: false },
];

const problemCards = [
  { title: 'Speed Review', description: 'Quick 2-minute review of weak concepts.', icon: Zap, color: 'text-accent-primary', bgColor: 'bg-accent-primary/10', borderColor: 'border-accent-primary/20' },
  { title: 'Difficult Words', description: '0 words marked as difficult.', icon: BookOpen, color: 'text-error', bgColor: 'bg-error/10', borderColor: 'border-error/20' },
  { title: 'Listening Practice', description: 'Train your ear with audio exercises.', icon: Headphones, color: 'text-info', bgColor: 'bg-info/10', borderColor: 'border-info/20' },
  { title: 'Writing Practice', description: 'Build sentences from scratch.', icon: Pen, color: 'text-purple', bgColor: 'bg-purple/10', borderColor: 'border-purple/20' },
];

export default function Learn() {
  const navigate = useNavigate();
  const [user] = useState(defaultUserProgress);
  const [, setHoveredNav] = useState<string | null>(null);

  const currentLesson = useMemo(() => {
    return lessons.find((l) => l.id === user.currentLessonId) || lessons[0];
  }, [user.currentLessonId]);

  const completedIds = useMemo(() =>
    user.completedLessons.map((c) => c.lessonId),
    [user.completedLessons]
  );

  const currentProgress = 65; // Mock progress percentage
  const dailyProgress = Math.min(100, (user.todayXp / user.dailyGoalXp) * 100);
  const circumference = 2 * Math.PI * 30;
  const strokeDashoffset = circumference - (dailyProgress / 100) * circumference;

  const handleStartLesson = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`);
  };

  return (
    <div className="min-h-[100dvh] bg-bg-primary flex">
      {/* Left Sidebar (desktop only) */}
      <aside className="hidden lg:flex flex-col w-[280px] min-h-[100dvh] bg-bg-secondary border-r border-border-default fixed left-0 top-16 bottom-0 z-40 overflow-y-auto">
        {/* User mini-profile */}
        <div className="p-4 border-b border-border-subtle">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-accent-primary" />
            </div>
            <div>
              <p className="text-text-primary text-sm font-semibold">{user.username}</p>
              <p className="text-text-muted text-xs">Level {user.level}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2">
            <div className="flex flex-col items-center">
              <Flame className="w-4 h-4 text-accent-primary mb-0.5" />
              <span className="text-text-primary text-xs font-semibold">{user.streak}</span>
            </div>
            <div className="flex flex-col items-center">
              <Target className="w-4 h-4 text-accent-primary mb-0.5" />
              <span className="text-text-primary text-xs font-semibold">{user.totalXp}</span>
            </div>
            <div className="flex flex-col items-center">
              <Gem className="w-4 h-4 text-diamond mb-0.5" />
              <span className="text-text-primary text-xs font-semibold">{user.gems}</span>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-4 h-4 text-heart mb-0.5" />
              <span className="text-text-primary text-xs font-semibold">{user.hearts}/{user.maxHearts}</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onMouseEnter={() => setHoveredNav(item.label)}
              onMouseLeave={() => setHoveredNav(null)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 mb-0.5 ${
                item.active
                  ? 'bg-bg-tertiary text-accent-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50'
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
              {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Daily Quests */}
        <div className="p-4 border-t border-border-subtle">
          <DailyQuests quests={user.dailyQuests} />
        </div>

        {/* Start Lesson CTA */}
        <div className="p-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleStartLesson(currentLesson.id)}
            className="w-full py-3 bg-accent-primary hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Start Lesson
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[280px] pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Streak & XP Header Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-bg-secondary rounded-2xl py-4 px-6 flex items-center justify-between border border-border-default"
          >
            {/* Left - Streak */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5">
                <Flame className="w-5 h-5 text-accent-primary" />
                <span className="text-accent-primary text-lg font-bold">{user.streak}</span>
              </div>
              <span className="text-text-secondary text-[10px] uppercase tracking-wider">day streak</span>
            </div>

            {/* Center - Daily XP Ring */}
            <div className="flex flex-col items-center relative">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32" cy="32" r="30"
                    fill="none"
                    stroke="#21262d"
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="32" cy="32" r="30"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: strokeDashoffset }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-text-primary text-xs font-bold">{user.todayXp}</span>
                  <span className="text-text-muted text-[8px]">XP</span>
                </div>
              </div>
              <span className="text-text-secondary text-[10px] uppercase tracking-wider mt-1">Daily Goal</span>
              {/* Tooltip */}
              <div className="absolute -bottom-6 opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-text-muted text-[10px]">{user.todayXp} / {user.dailyGoalXp} XP today</span>
              </div>
            </div>

            {/* Right - Hearts */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                {[...Array(user.maxHearts)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        i < user.hearts
                          ? 'text-heart fill-heart'
                          : 'text-border-default'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-text-secondary text-[10px]">{user.hearts} / {user.maxHearts}</span>
                {user.hearts < user.maxHearts && (
                  <Settings className="w-3 h-3 text-text-muted" />
                )}
              </div>
            </div>
          </motion.div>

          {/* Continue Learning */}
          <ContinueLearning
            lesson={currentLesson}
            progress={currentProgress}
            onContinue={() => handleStartLesson(currentLesson.id)}
          />

          {/* Problem Set */}
          <div className="max-w-4xl mx-auto mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-text-primary font-semibold text-base">Problem Set</h3>
              <button className="text-accent-primary text-sm font-medium hover:text-accent-hover transition-colors flex items-center gap-1">
                View All
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {problemCards.map((card, index) => (
                <motion.button
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-bg-secondary rounded-xl p-4 border ${card.borderColor} text-left hover:border-opacity-50 transition-all duration-200 flex items-start gap-3`}
                >
                  <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center shrink-0`}>
                    <card.icon className={`w-5 h-5 ${card.color}`} />
                  </div>
                  <div>
                    <h4 className="text-text-primary text-sm font-semibold">{card.title}</h4>
                    <p className="text-text-secondary text-xs mt-0.5">{card.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Weekly Activity Calendar */}
          <div className="max-w-4xl mx-auto mt-6">
            <WeeklyCalendar activity={user.weeklyActivity} />
          </div>

          {/* Lesson Tree Map */}
          <LessonTree
            lessons={lessons}
            completedLessonIds={completedIds}
            currentLessonId={user.currentLessonId}
            onSelectLesson={(lesson) => {
              const isCompleted = completedIds.includes(lesson.id);
              const isUnlocked = isCompleted || lesson.order === 1 || completedIds.includes(`l${lesson.level}-${String(lesson.order - 1).padStart(1, '0')}`);
              if (isUnlocked) {
                handleStartLesson(lesson.id);
              }
            }}
          />
        </div>
      </main>

      {/* Mobile FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleStartLesson(currentLesson.id)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-accent-primary text-white flex items-center justify-center shadow-lg z-50"
      >
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent-primary"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <Zap className="w-6 h-6 relative z-10" />
      </motion.button>
    </div>
  );
}
