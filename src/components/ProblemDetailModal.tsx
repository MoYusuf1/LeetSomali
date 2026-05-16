import { useState } from 'react';
import { X, Bookmark, MessageSquare, Play, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { difficultyStyles } from '@/data/problemsData';
import type { Problem } from '@/data/problemsData';

interface ProblemDetailModalProps {
  problem: Problem | null;
  onClose: () => void;
}

export default function ProblemDetailModal({ problem, onClose }: ProblemDetailModalProps) {
  const [bookmarked, setBookmarked] = useState(false);

  if (!problem) return null;

  const style = difficultyStyles[problem.difficulty];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-bg-elevated rounded-2xl border border-border-default max-w-[700px] w-full max-h-[85vh] overflow-y-auto shadow-card-hover"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-8 pb-0">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-text-secondary text-sm font-mono">#{problem.id}</span>
                <span className={`${style.bg} ${style.text} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                  {problem.difficulty}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-text-primary">{problem.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  bookmarked ? 'text-accent-primary bg-accent-primary/10' : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                }`}
              >
                <Bookmark className="w-5 h-5" fill={bookmarked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="p-8"
          >
            {/* Description */}
            <p className="text-text-primary leading-relaxed mb-8">
              {problem.description}
            </p>

            {/* Examples */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">Examples</h3>
              {problem.examples.map((ex, i) => (
                <div key={i} className="bg-bg-primary rounded-lg p-4 mb-3 border border-border-subtle">
                  <div className="mb-2">
                    <span className="text-text-muted text-xs font-medium uppercase">Input</span>
                    <p className="text-text-primary text-sm font-mono mt-0.5">{ex.input}</p>
                  </div>
                  <div className="mb-2">
                    <span className="text-text-muted text-xs font-medium uppercase">Output</span>
                    <p className="text-success text-sm font-mono mt-0.5">{ex.output}</p>
                  </div>
                  {ex.explanation && (
                    <div>
                      <span className="text-text-muted text-xs font-medium uppercase">Explanation</span>
                      <p className="text-text-secondary text-sm mt-0.5">{ex.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3">Constraints</h3>
              <ul className="space-y-2">
                {problem.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-text-secondary text-sm">
                    <span className="text-accent-primary mt-1.5 w-1 h-1 rounded-full bg-accent-primary shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-accent-primary text-white hover:bg-accent-hover transition-colors duration-200">
                <Play className="w-4 h-4" />
                Start Problem
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-bg-tertiary text-text-primary border border-border-default hover:bg-bg-secondary transition-colors duration-200">
                <MessageSquare className="w-4 h-4" />
                Discuss
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-bg-tertiary text-text-primary border border-border-default hover:bg-bg-secondary transition-colors duration-200">
                <BookOpen className="w-4 h-4" />
                Lesson
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
