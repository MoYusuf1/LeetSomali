import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Share2, ArrowRight, Flame } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { getLessonById, getNextLesson } from '@/data/lessons';
import confetti from 'canvas-confetti';

interface LessonCompleteProps {
  lessonId: string;
  onContinue: () => void;
  onRestart: () => void;
}

export default function LessonComplete({ lessonId, onContinue, onRestart }: LessonCompleteProps) {
  const { stars, score, wrongCount, startTime, endTime } = useGameStore();
  const lesson = getLessonById(lessonId);
  const nextLesson = getNextLesson(lessonId);
  const duration = startTime && endTime ? Math.round((endTime - startTime) / 1000) : 0;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const accuracy = lesson ? Math.round(((lesson.exercises.length - wrongCount) / lesson.exercises.length) * 100) : 0;

  const [showStars, setShowStars] = useState(0);
  const [countedXP, setCountedXP] = useState(0);

  useEffect(() => {
    // Confetti burst
    const duration = 1500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#22c55e', '#3b82f6'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#22c55e', '#3b82f6'],
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Delay confetti
    const timer1 = setTimeout(frame, 900);

    // Animate stars
    const starTimer1 = setTimeout(() => setShowStars(1), 300);
    const starTimer2 = setTimeout(() => setShowStars(2), 600);
    const starTimer3 = setTimeout(() => setShowStars(3), 900);

    // Animate XP counter
    const xpInterval = setInterval(() => {
      setCountedXP((prev) => {
        if (prev >= score) {
          clearInterval(xpInterval);
          return score;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearTimeout(timer1);
      clearTimeout(starTimer1);
      clearTimeout(starTimer2);
      clearTimeout(starTimer3);
      clearInterval(xpInterval);
    };
  }, [score]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-bg-primary flex flex-col items-center justify-center px-4 py-8 overflow-y-auto"
    >
      <div className="max-w-md w-full text-center">
        {/* Stars */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((starIndex) => (
            <motion.div
              key={starIndex}
              initial={{ scale: 0 }}
              animate={{ scale: showStars >= starIndex ? [0, 1.3, 1] : 0.8 }}
              transition={{ delay: starIndex * 0.3, duration: 0.4, type: 'spring' }}
            >
              <Star
                className={`w-12 h-12 ${
                  stars >= starIndex
                    ? 'text-accent-primary fill-accent-primary drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                    : 'text-text-muted'
                }`}
                strokeWidth={stars >= starIndex ? 1.5 : 1}
              />
            </motion.div>
          ))}
        </div>

        {/* Lesson title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-text-primary font-bold text-xl mb-2"
        >
          Lesson Complete!
        </motion.h2>
        {lesson && (
          <p className="text-text-secondary text-sm mb-8">{lesson.title}</p>
        )}

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-bg-secondary rounded-2xl p-4 border border-border-default">
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Total XP</p>
            <p className="text-text-primary text-2xl font-bold text-accent-primary">{countedXP}</p>
          </div>
          <div className="bg-bg-secondary rounded-2xl p-4 border border-border-default">
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Accuracy</p>
            <p className="text-text-primary text-2xl font-bold text-success">{accuracy}%</p>
          </div>
          <div className="bg-bg-secondary rounded-2xl p-4 border border-border-default">
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Speed</p>
            <p className="text-text-primary text-2xl font-bold">{minutes}:{seconds.toString().padStart(2, '0')}</p>
          </div>
          <div className="bg-bg-secondary rounded-2xl p-4 border border-border-default">
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Bonus</p>
            <p className="text-text-primary text-2xl font-bold text-accent-primary">
              +{wrongCount === 0 ? 10 : 0}
            </p>
          </div>
        </motion.div>

        {/* Streak celebration */}
        {stars === 3 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            className="mb-6 flex items-center justify-center gap-2 px-4 py-2 bg-accent-glow rounded-full border border-accent-primary/30"
          >
            <Flame className="w-5 h-5 text-accent-primary" />
            <span className="text-accent-primary font-semibold text-sm">Streak extended!</span>
          </motion.div>
        )}

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="space-y-3"
        >
          <button
            onClick={onContinue}
            className="w-full py-3.5 bg-accent-primary hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onRestart}
              className="flex-1 py-2.5 border border-border-default text-text-secondary hover:text-text-primary rounded-xl transition-colors text-sm font-medium"
            >
              Review Lesson
            </button>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(`I just completed "${lesson?.title}" on LeetGrammar with ${stars} stars!`);
                }
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border-default text-text-secondary hover:text-text-primary rounded-xl transition-colors text-sm font-medium"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </motion.div>

        {/* Next lesson */}
        {nextLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8"
          >
            <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Next Lesson</p>
            <div
              className="p-4 rounded-xl border-2 border-accent-primary/30 bg-accent-glow cursor-pointer hover:border-accent-primary transition-colors"
              onClick={onContinue}
            >
              <p className="text-text-primary font-medium text-sm">{nextLesson.title}</p>
              <p className="text-text-muted text-xs mt-0.5">Level {nextLesson.level} — {nextLesson.levelName}</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
