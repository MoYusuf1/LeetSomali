import { useState } from 'react';
import { Trophy, Flame, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import LeaderboardRow from './LeaderboardRow';
import { leaderboardData } from '@/data/socialData';

const periods = ['Weekly', 'Monthly', 'All Time'] as const;
const leagues = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master'] as const;

interface LeaderboardProps {
  compact?: boolean;
}

export default function Leaderboard({ compact = false }: LeaderboardProps) {
  const [period, setPeriod] = useState<typeof periods[number]>('Weekly');
  const [league, setLeague] = useState<typeof leagues[number]>('Diamond');

  if (compact) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-5 h-5 text-accent-primary" />
          <h4 className="text-base font-semibold text-text-primary">Weekly Leaderboard</h4>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple/15 text-purple text-xs font-semibold mb-3">
          {league} League
        </div>
        <div className="flex flex-col">
          {leaderboardData.slice(0, 5).map((entry, index) => (
            <LeaderboardRow key={entry.username} entry={entry} index={index} compact />
          ))}
        </div>
        <button className="mt-3 text-accent-primary text-sm font-medium hover:underline">
          View Full Leaderboard →
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Period tabs */}
      <div className="flex items-center gap-1 mb-4 bg-bg-tertiary rounded-lg p-1 w-fit">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              period === p
                ? 'bg-accent-primary text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* League selector */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {leagues.map((l) => (
          <button
            key={l}
            onClick={() => setLeague(l)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
              league === l
                ? 'bg-purple/20 text-purple ring-1 ring-purple/40'
                : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Animated league banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden rounded-xl p-4 mb-6 bg-purple/10 border border-purple/20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple/5 via-purple/10 to-purple/5 animate-pulse" />
        <div className="relative flex items-center gap-3">
          <Trophy className="w-6 h-6 text-purple" />
          <div>
            <p className="text-purple font-semibold text-sm">{league} League</p>
            <p className="text-text-secondary text-xs">Top 10 advance to the next league</p>
          </div>
        </div>
      </motion.div>

      {/* Table header */}
      <div className="flex items-center gap-4 h-10 px-4 text-xs uppercase tracking-wider text-text-secondary font-medium border-b border-border-subtle">
        <span className="w-8 text-center shrink-0">Rank</span>
        <span className="w-9 shrink-0" />
        <span className="flex-1">User</span>
        <span className="w-20 text-right flex items-center gap-1 justify-end">
          <Flame className="w-3.5 h-3.5 text-accent-primary" /> XP
        </span>
        <span className="w-16 text-right hidden md:block">Lessons</span>
        <span className="w-16 text-right hidden md:flex items-center gap-1 justify-end">
          <Target className="w-3.5 h-3.5" /> Acc.
        </span>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {leaderboardData.map((entry, index) => (
          <LeaderboardRow key={entry.username} entry={entry} index={index} />
        ))}
      </div>
    </div>
  );
}
