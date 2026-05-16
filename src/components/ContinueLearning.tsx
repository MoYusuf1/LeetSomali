import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import type { Lesson } from '@/data/lessons';

interface ContinueLearningProps {
  lesson?: Lesson | null;
  progress?: number;
  onContinue?: () => void;
}

export default function ContinueLearning({ lesson, progress = 0, onContinue }: ContinueLearningProps) {
  if (!lesson) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mt-8 bg-bg-secondary rounded-2xl border border-border-default p-6 relative overflow-hidden"
    >
      {/* Background progress indicator */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-accent-primary/10 rounded-b-2xl"
        style={{ width: `${progress}%` }}
      />

      <h3 className="text-text-primary font-bold text-lg mb-4">Continue Learning</h3>

      <div className="flex items-center gap-4">
        {/* Lesson icon */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: lesson.color + '20', borderColor: lesson.color, borderWidth: 2 }}
        >
          <BookOpen className="w-5 h-5" style={{ color: lesson.color }} />
        </div>

        {/* Lesson info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-text-primary font-medium text-base truncate">{lesson.title}</h4>
          <p className="text-text-secondary text-xs">Colloquial Somali — Level {lesson.level}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="w-[120px] bg-bg-tertiary rounded-full h-1.5 overflow-hidden">
              <motion.div
                className="h-full bg-accent-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <span className="text-text-secondary text-xs">{Math.round(progress)}% complete</span>
          </div>
        </div>

        {/* Continue button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="px-5 py-2.5 bg-accent-primary hover:bg-accent-hover text-white font-semibold text-sm rounded-xl transition-colors shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse-glow"
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}
