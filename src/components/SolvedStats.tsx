import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { solvedStats } from '@/data/problemsData';

export default function SolvedStats() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const totalPercent = Math.round((solvedStats.totalSolved / solvedStats.totalProblems) * 100);

  const ringSize = 56;
  const strokeWidth = 4;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated ? totalPercent / 100 : 0) * circumference;

  const difficulties = [
    { label: 'Easy', solved: solvedStats.byDifficulty.Easy.solved, total: solvedStats.byDifficulty.Easy.total, color: 'text-success', dot: 'bg-success' },
    { label: 'Medium', solved: solvedStats.byDifficulty.Medium.solved, total: solvedStats.byDifficulty.Medium.total, color: 'text-warning', dot: 'bg-warning' },
    { label: 'Hard', solved: solvedStats.byDifficulty.Hard.solved, total: solvedStats.byDifficulty.Hard.total, color: 'text-purple', dot: 'bg-purple' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap items-center gap-8 px-8 py-4"
    >
      {/* Progress ring */}
      <div className="flex items-center gap-3">
        <div className="relative" style={{ width: ringSize, height: ringSize }}>
          <svg className="transform -rotate-90" width={ringSize} height={ringSize}>
            <circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              fill="none"
              stroke="#21262d"
              strokeWidth={strokeWidth}
            />
            <motion.circle
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={radius}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-text-primary text-xs font-bold">{totalPercent}%</span>
          </div>
        </div>
        <div>
          <p className="text-text-primary font-semibold text-sm">
            {solvedStats.totalSolved} / {solvedStats.totalProblems}
          </p>
          <p className="text-text-secondary text-xs">Solved</p>
        </div>
      </div>

      {/* Difficulty breakdown */}
      <div className="flex items-center gap-6">
        {difficulties.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${d.dot}`} />
            <span className="text-text-secondary text-sm">
              <span className="text-text-primary font-semibold">{d.solved}</span>
              <span className="text-text-muted">/{d.total}</span>
            </span>
            <span className={`${d.color} text-xs font-medium`}>{d.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
