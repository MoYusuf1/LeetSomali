import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import type { LeaderboardEntry } from '@/data/socialData';

interface LeaderboardRowProps {
  entry: LeaderboardEntry;
  index: number;
  compact?: boolean;
}

export default function LeaderboardRow({ entry, index, compact = false }: LeaderboardRowProps) {
  const medalEmoji =
    entry.rank === 1 ? '🥇' :
    entry.rank === 2 ? '🥈' :
    entry.rank === 3 ? '🥉' :
    null;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.08 }}
        className="flex items-center gap-3 py-2"
      >
        <span className="text-sm w-6 text-center">
          {medalEmoji || <span className="text-text-secondary text-xs font-mono">{entry.rank}</span>}
        </span>
        <div className="w-7 h-7 rounded-full bg-bg-tertiary flex items-center justify-center text-xs font-semibold text-accent-primary shrink-0">
          {entry.avatar}
        </div>
        <span className="text-text-primary text-sm font-medium flex-1 truncate">
          @{entry.username}
        </span>
        <span className="text-accent-primary text-sm font-bold">{entry.xp.toLocaleString()} XP</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="flex items-center gap-4 h-14 px-4 rounded-lg hover:bg-bg-tertiary transition-colors duration-150"
    >
      <span className="w-8 text-center shrink-0">
        {medalEmoji || <span className="text-text-secondary text-sm font-mono">{entry.rank}</span>}
      </span>

      <div className="w-9 h-9 rounded-full bg-bg-tertiary flex items-center justify-center text-sm font-semibold text-accent-primary shrink-0">
        {entry.avatar}
      </div>

      <span className="text-text-primary font-medium flex-1 truncate">
        @{entry.username}
        {entry.isCurrentUser && (
          <span className="ml-2 text-xs bg-accent-primary/20 text-accent-primary px-2 py-0.5 rounded-full">
            You
          </span>
        )}
      </span>

      {entry.streak > 7 && (
        <div className="flex items-center gap-1 text-accent-primary text-xs">
          <Flame className="w-3.5 h-3.5" />
          <span>{entry.streak}d</span>
        </div>
      )}

      <span className="text-accent-primary font-bold w-20 text-right">{entry.xp.toLocaleString()}</span>
      <span className="text-text-secondary text-sm w-16 text-right hidden md:block">{entry.lessons}</span>
      <span className="text-text-secondary text-sm w-16 text-right hidden md:block">{entry.accuracy}%</span>
    </motion.div>
  );
}
