import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface WeeklyCalendarProps {
  activity?: Record<string, number>;
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function WeeklyCalendar({ activity }: WeeklyCalendarProps) {
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  const activeDays = days.filter((d) => (activity?.[d] ?? 0) > 0);
  const activeCount = activeDays.length;

  const maxXp = Math.max(...days.map((d) => activity?.[d] ?? 0), 1);

  return (
    <div className="w-full bg-bg-secondary rounded-2xl border border-border-default p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-primary font-semibold text-base">This Week</h3>
        <span className="text-text-secondary text-xs">{activeCount} / 7 days active</span>
      </div>

      {/* Day circles */}
      <div className="flex items-center justify-between mb-6">
        {dayLabels.map((label, i) => {
          const dayName = days[i];
          const xp = activity?.[dayName] ?? 0;
          const isActive = xp > 0;
          const isToday = i === todayIndex;

          return (
            <motion.div
              key={dayName}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className={
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ' +
                  (isActive
                    ? 'bg-accent-primary text-white shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                    : isToday
                      ? 'bg-bg-primary border-2 border-accent-primary text-accent-primary'
                      : 'bg-bg-tertiary text-text-muted')
                }
              >
                {isActive ? <Check className="w-4 h-4" /> : label}
              </div>
              <span className={`text-[10px] ${isToday ? 'text-accent-primary font-medium' : 'text-text-muted'}`}>
                {dayName}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Mini bar chart */}
      <div className="flex items-end justify-between gap-2 h-12">
        {days.map((dayName, i) => {
          const xp = activity?.[dayName] ?? 0;
          const height = xp > 0 ? Math.max(12, (xp / maxXp) * 48) : 4;

          return (
            <motion.div
              key={dayName}
              className="flex-1 flex flex-col items-center justify-end"
            >
              <motion.div
                className={`w-full rounded-t ${xp > 0 ? 'bg-accent-primary' : 'bg-bg-tertiary'}`}
                initial={{ height: 0 }}
                animate={{ height }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
              />
            </motion.div>
          );
        })}
      </div>

      <p className="text-text-muted text-xs mt-4 text-center">
        Complete a lesson to light up each day
      </p>
    </div>
  );
}
