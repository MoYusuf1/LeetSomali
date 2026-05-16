import { motion } from 'framer-motion';
import { Gem, Check, Zap, Target, Flame } from 'lucide-react';

interface Quest {
  id: string;
  name: string;
  target: number;
  current: number;
  reward: number;
  completed: boolean;
}

interface DailyQuestsProps {
  quests?: Quest[];
  resetsIn?: string;
}

const defaultQuests: Quest[] = [
  { id: 'q1', name: 'Earn 50 XP', target: 50, current: 30, reward: 5, completed: false },
  { id: 'q2', name: 'Complete 2 lessons', target: 2, current: 1, reward: 10, completed: false },
  { id: 'q3', name: 'Maintain a 7-day streak', target: 7, current: 5, reward: 15, completed: false },
];

const questIcons: Record<string, typeof Zap> = {
  q1: Zap,
  q2: Target,
  q3: Flame,
};

const questColors: Record<string, string> = {
  q1: 'bg-accent-primary',
  q2: 'bg-success',
  q3: 'bg-warning',
};

export default function DailyQuests({ quests = defaultQuests, resetsIn = '12h' }: DailyQuestsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-text-primary font-semibold text-sm">Daily Quests</h3>
        <span className="text-text-muted text-xs">Resets in {resetsIn}</span>
      </div>
      <div className="space-y-3">
        {quests.map((quest, index) => {
          const Icon = questIcons[quest.id] || Zap;
          const colorClass = questColors[quest.id] || 'bg-accent-primary';
          const progress = Math.min(100, (quest.current / quest.target) * 100);

          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <div className={`w-8 h-8 rounded-lg ${colorClass} flex items-center justify-center shrink-0`}>
                {quest.completed ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <Icon className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs truncate ${quest.completed ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                    {quest.name}
                  </span>
                  <span className="text-text-muted text-xs shrink-0 ml-2">
                    {quest.current}/{quest.target}
                  </span>
                </div>
                {quest.completed ? (
                  <div className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-success" />
                    <span className="text-success text-xs">Completed!</span>
                  </div>
                ) : (
                  <div className="w-full bg-bg-tertiary rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${colorClass}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ delay: 0.3 + index * 0.15, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-0.5 text-diamond shrink-0">
                <Gem className="w-3 h-3" />
                <span className="text-xs font-medium">{quest.reward}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
