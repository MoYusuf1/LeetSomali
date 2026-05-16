import { RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { filterCounts, levelColors } from '@/data/problemsData';
import type { Difficulty, Status } from '@/data/problemsData';

export interface FilterState {
  difficulty: Difficulty[];
  level: string[];
  status: Status | 'all';
  type: string[];
}

interface ProblemFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const difficultyOptions: { value: Difficulty; label: string; color: string }[] = [
  { value: 'Easy', label: 'Easy', color: 'bg-success' },
  { value: 'Medium', label: 'Medium', color: 'bg-warning' },
  { value: 'Hard', label: 'Hard', color: 'bg-purple' },
];

const levelOptions = Object.entries(filterCounts.level).map(([level, count]) => ({
  value: level,
  label: `${level} — ${level === 'L1' ? 'Foundations' : level === 'L2' ? 'Noun System' : level === 'L3' ? 'Sentence Core' : level === 'L4' ? 'Focus & Questions' : level === 'L5' ? 'Verb & Tense' : level === 'L6' ? 'Space & Modifiers' : level === 'L7' ? 'Complex Grammar' : 'Mastery'}`,
  count,
}));

const statusOptions: { value: Status | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'solved', label: 'Solved' },
  { value: 'attempted', label: 'Attempted' },
  { value: 'unsolved', label: 'Unsolved' },
];

const typeOptions = filterCounts.type;

export default function ProblemFilters({ filters, onChange }: ProblemFiltersProps) {
  const toggleDifficulty = (d: Difficulty) => {
    onChange({
      ...filters,
      difficulty: filters.difficulty.includes(d)
        ? filters.difficulty.filter((x) => x !== d)
        : [...filters.difficulty, d],
    });
  };

  const toggleLevel = (l: string) => {
    onChange({
      ...filters,
      level: filters.level.includes(l)
        ? filters.level.filter((x) => x !== l)
        : [...filters.level, l],
    });
  };

  const setStatus = (s: Status | 'all') => {
    onChange({ ...filters, status: s });
  };

  const toggleType = (t: string) => {
    onChange({
      ...filters,
      type: filters.type.includes(t)
        ? filters.type.filter((x) => x !== t)
        : [...filters.type, t],
    });
  };

  const resetFilters = () => {
    onChange({ difficulty: [], level: [], status: 'all', type: [] });
  };

  const hasActiveFilters =
    filters.difficulty.length > 0 ||
    filters.level.length > 0 ||
    filters.status !== 'all' ||
    filters.type.length > 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Difficulty */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">Difficulty</h4>
        <div className="flex flex-col gap-2">
          {difficultyOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <button
                onClick={() => toggleDifficulty(opt.value)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                  filters.difficulty.includes(opt.value)
                    ? 'border-accent-primary bg-accent-primary'
                    : 'border-border-default group-hover:border-text-secondary'
                }`}
              >
                {filters.difficulty.includes(opt.value) && (
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span className={`w-2 h-2 rounded-full ${opt.color}`} />
              <span className="text-sm text-text-primary">
                {opt.label} ({filterCounts.difficulty[opt.value]})
              </span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Level */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">Level</h4>
        <div className="flex flex-col gap-2">
          {levelOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <button
                onClick={() => toggleLevel(opt.value)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                  filters.level.includes(opt.value)
                    ? 'border-accent-primary bg-accent-primary'
                    : 'border-border-default group-hover:border-text-secondary'
                }`}
              >
                {filters.level.includes(opt.value) && (
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: levelColors[opt.value] }}
              />
              <span className="text-sm text-text-primary truncate">
                {opt.label} ({opt.count})
              </span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Status */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">Status</h4>
        <div className="flex flex-col gap-2">
          {statusOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <button
                onClick={() => setStatus(opt.value)}
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
                  filters.status === opt.value
                    ? 'border-accent-primary'
                    : 'border-border-default group-hover:border-text-secondary'
                }`}
              >
                {filters.status === opt.value && (
                  <span className="w-2 h-2 rounded-full bg-accent-primary" />
                )}
              </button>
              <span className="text-sm text-text-primary">{opt.label}</span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Type */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">Problem Type</h4>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((t) => (
            <button
              key={t}
              onClick={() => toggleType(t)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                filters.type.includes(t)
                  ? 'bg-accent-primary text-white'
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Reset */}
      {hasActiveFilters && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={resetFilters}
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-primary transition-colors duration-200 mt-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Filters
        </motion.button>
      )}
    </div>
  );
}
