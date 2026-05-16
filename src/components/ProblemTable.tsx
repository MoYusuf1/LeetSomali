import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { difficultyStyles, levelColors } from '@/data/problemsData';
import type { Problem, Status } from '@/data/problemsData';

interface ProblemTableProps {
  problems: Problem[];
  onProblemClick: (problem: Problem) => void;
}

const statusIcons: Record<Status, React.ReactNode> = {
  solved: <CheckCircle2 className="w-5 h-5 text-success" />,
  attempted: <Clock className="w-5 h-5 text-warning" />,
  unsolved: <Circle className="w-5 h-5 text-text-muted" />,
};

export default function ProblemTable({ problems, onProblemClick }: ProblemTableProps) {
  return (
    <div className="bg-bg-secondary rounded-xl border border-border-default overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[48px_48px_1fr_100px_100px_80px_100px] h-10 bg-bg-tertiary text-text-secondary text-xs uppercase tracking-wider font-medium items-center px-4">
        <span className="text-center">Status</span>
        <span className="text-center">#</span>
        <span>Title</span>
        <span className="text-center">Acceptance</span>
        <span className="text-center">Difficulty</span>
        <span className="text-center">Level</span>
        <span className="text-center">Type</span>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {problems.map((problem, index) => {
          const style = difficultyStyles[problem.difficulty];
          return (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              onClick={() => onProblemClick(problem)}
              className="grid grid-cols-[48px_48px_1fr_100px_100px_80px_100px] h-12 border-b border-border-subtle items-center px-4 cursor-pointer hover:bg-bg-tertiary transition-colors duration-150 group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onProblemClick(problem); }}
            >
              {/* Status */}
              <div className="flex items-center justify-center">
                {statusIcons[problem.status]}
              </div>

              {/* # */}
              <span className="text-text-secondary text-sm font-mono text-center">
                {problem.id}
              </span>

              {/* Title */}
              <span className="text-accent-primary text-sm font-medium group-hover:underline truncate pr-4">
                {problem.title}
              </span>

              {/* Acceptance with bar */}
              <div className="flex items-center gap-2 justify-center">
                <div className="w-16 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${problem.acceptance}%` }}
                    transition={{ duration: 0.5, delay: index * 0.03 }}
                    className={`h-full rounded-full ${
                      problem.difficulty === 'Easy' ? 'bg-success' :
                      problem.difficulty === 'Medium' ? 'bg-warning' : 'bg-purple'
                    }`}
                  />
                </div>
                <span className="text-text-secondary text-xs w-8 text-right">{problem.acceptance}%</span>
              </div>

              {/* Difficulty badge */}
              <div className="flex items-center justify-center">
                <span className={`${style.bg} ${style.text} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                  {problem.difficulty}
                </span>
              </div>

              {/* Level */}
              <div className="flex items-center justify-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: levelColors[problem.level] }}
                />
                <span className="text-text-secondary text-xs">{problem.level}</span>
              </div>

              {/* Type */}
              <span className="text-text-secondary text-xs text-center truncate">
                {problem.type}
              </span>
            </motion.div>
          );
        })}
      </div>

      {problems.length === 0 && (
        <div className="py-12 text-center text-text-muted text-sm">
          No problems match your filters. Try adjusting your criteria.
        </div>
      )}
    </div>
  );
}
