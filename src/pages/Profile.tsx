import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell, BookOpen, Globe, Shield, LogOut, Trash2,
  ToggleLeft, ToggleRight, ChevronRight,
} from 'lucide-react';
import ProfileHeader from '@/components/ProfileHeader';
import ActivityHeatmap from '@/components/ActivityHeatmap';
import LevelProgress from '@/components/LevelProgress';
import AchievementBadge from '@/components/AchievementBadge';
import ActivityFeed from '@/components/ActivityFeed';
import StatsCard from '@/components/StatsCard';
import {
  userProfile,
  activityData,
  achievements,
  activityFeed,
  statCards,
} from '@/data/profileData';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function Profile() {
  const [notifications, setNotifications] = useState({
    lessonReminders: true,
    streakAlerts: true,
    communityReplies: false,
    leaderboardUpdates: true,
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showActivity: true,
    allowFollows: true,
  });

  const [dailyGoal, setDailyGoal] = useState<30 | 50 | 100>(50);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="min-h-[100dvh] bg-[#0d1117] pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Section 1: Profile Header */}
        <motion.div {...fadeUp}>
          <ProfileHeader profile={userProfile} />
        </motion.div>

        {/* Section 2: Activity Heatmap */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
          <ActivityHeatmap data={activityData} />
        </motion.div>

        {/* Section 3: XP Progress & Level */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <LevelProgress
            currentLevel={userProfile.level}
            xp={userProfile.xp}
            xpToNext={userProfile.xpToNext}
            levelTitle={userProfile.levelTitle}
          />
        </motion.div>

        {/* Section 4: Achievements Grid */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="bg-[#161b22] rounded-2xl border border-[#30363d] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#e6edf3] text-xl font-semibold">Achievements</h3>
            <span className="text-sm text-[#8b949e]">
              {unlockedCount} / {achievements.length} unlocked
            </span>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div key={achievement.id} variants={staggerItem}>
                <AchievementBadge achievement={achievement} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Section 5: Recent Activity Feed */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.25 }}>
          <ActivityFeed items={activityFeed} />
        </motion.div>

        {/* Section 6: Learning Stats Dashboard */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }}>
          <h3 className="text-[#e6edf3] text-xl font-semibold mb-4">Learning Stats</h3>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {statCards.map((stat, index) => (
              <motion.div key={stat.id} variants={staggerItem}>
                <StatsCard stat={stat} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Section 7: Followers / Following */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.35 }}
          className="bg-[#161b22] rounded-2xl border border-[#30363d] p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Followers */}
            <div>
              <h4 className="text-[#e6edf3] font-semibold mb-3">
                {userProfile.followers} Followers
              </h4>
              <div className="flex items-center -space-x-2">
                {['A', 'B', 'C', 'D', 'E'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-[#161b22] flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: `hsl(${30 + i * 40}, 60%, 40%)`,
                      color: '#0d1117',
                      zIndex: 5 - i,
                    }}
                  >
                    {initial}
                  </div>
                ))}
                <span className="ml-4 text-xs text-[#8b949e]">+{userProfile.followers - 5} more</span>
              </div>
            </div>

            {/* Following */}
            <div>
              <h4 className="text-[#e6edf3] font-semibold mb-3">
                {userProfile.following} Following
              </h4>
              <div className="flex items-center -space-x-2">
                {['F', 'G', 'H', 'I', 'J'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-[#161b22] flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: `hsl(${200 + i * 30}, 50%, 45%)`,
                      color: '#0d1117',
                      zIndex: 5 - i,
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 8: Settings */}
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.4 }}
          className="bg-[#161b22] rounded-2xl border border-[#30363d] p-6 space-y-6"
        >
          <h3 className="text-[#e6edf3] text-xl font-semibold">Settings</h3>

          {/* Account */}
          <div className="border-b border-[#21262d] pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-[#8b949e]" />
              <h4 className="text-[#e6edf3] font-semibold">Account</h4>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Display Name', value: userProfile.name },
                { label: 'Username', value: `@${userProfile.username}` },
                { label: 'Email', value: 'ahmed@example.com' },
              ].map(field => (
                <div key={field.label} className="flex items-center justify-between py-2">
                  <span className="text-sm text-[#8b949e]">{field.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#e6edf3]">{field.value}</span>
                    <ChevronRight className="w-4 h-4 text-[#484f58]" />
                  </div>
                </div>
              ))}
              <button className="text-sm text-[#f59e0b] hover:text-[#fbbf24] transition-colors mt-2">
                Change password
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="border-b border-[#21262d] pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-[#8b949e]" />
              <h4 className="text-[#e6edf3] font-semibold">Notifications</h4>
            </div>
            <div className="space-y-3">
              {[
                { key: 'lessonReminders' as const, label: 'Lesson reminders' },
                { key: 'streakAlerts' as const, label: 'Streak alerts' },
                { key: 'communityReplies' as const, label: 'Community replies' },
                { key: 'leaderboardUpdates' as const, label: 'Leaderboard updates' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <span className="text-sm text-[#8b949e]">{item.label}</span>
                  <button
                    onClick={() => toggleNotification(item.key)}
                    className="transition-colors"
                  >
                    {notifications[item.key] ? (
                      <ToggleRight className="w-6 h-6 text-[#22c55e]" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-[#484f58]" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Learning */}
          <div className="border-b border-[#21262d] pb-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-[#8b949e]" />
              <h4 className="text-[#e6edf3] font-semibold">Learning</h4>
            </div>
            <div className="mb-4">
              <span className="text-sm text-[#8b949e] block mb-2">Daily Goal</span>
              <div className="flex gap-2">
                {[30, 50, 100].map(goal => (
                  <button
                    key={goal}
                    onClick={() => setDailyGoal(goal as 30 | 50 | 100)}
                    className={
                      'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ' +
                      (dailyGoal === goal
                        ? 'border-[#f59e0b] bg-[rgba(245,158,11,0.1)] text-[#f59e0b]'
                        : 'border-[#30363d] text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d]')
                    }
                  >
                    {goal} XP
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="border-b border-[#21262d] pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-[#8b949e]" />
              <h4 className="text-[#e6edf3] font-semibold">Privacy</h4>
            </div>
            <div className="space-y-3">
              {[
                { key: 'publicProfile' as const, label: 'Public profile' },
                { key: 'showActivity' as const, label: 'Show activity' },
                { key: 'allowFollows' as const, label: 'Allow follows' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <span className="text-sm text-[#8b949e]">{item.label}</span>
                  <button
                    onClick={() => togglePrivacy(item.key)}
                    className="transition-colors"
                  >
                    {privacy[item.key] ? (
                      <ToggleRight className="w-6 h-6 text-[#22c55e]" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-[#484f58]" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <h4 className="text-[#e6edf3] font-semibold mb-4">Danger Zone</h4>
            <div className="space-y-3">
              <button className="flex items-center gap-2 text-sm text-[#f59e0b] hover:text-[#fbbf24] transition-colors">
                <LogOut className="w-4 h-4" />
                Log out
              </button>
              <button className="flex items-center gap-2 text-sm text-[#ef4444] hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
                Delete account
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
