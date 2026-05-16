import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Exercise } from '@/data/lessons';

interface TranslationMatchProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  answerState: 'idle' | 'correct' | 'wrong';
  selectedAnswer?: string | null;
}

interface Match {
  left: string;
  right: string;
}

export default function TranslationMatch({ exercise, onAnswer, answerState, selectedAnswer }: TranslationMatchProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);

  const leftColumn = exercise.leftColumn || exercise.options.slice(0, Math.ceil(exercise.options.length / 2));
  const rightColumn = exercise.rightColumn || exercise.options.slice(Math.ceil(exercise.options.length / 2));

  const correctPairs: Record<string, string> = {};
  if (exercise.correctAnswer) {
    exercise.correctAnswer.split(',').forEach((pair) => {
      const [l, r] = pair.split(':');
      if (l && r) correctPairs[l.trim()] = r.trim();
    });
  }

  const handleSelectLeft = useCallback((item: string) => {
    if (answerState !== 'idle') return;
    setSelectedLeft((prev) => prev === item ? null : item);
  }, [answerState]);

  const handleSelectRight = useCallback((item: string) => {
    if (answerState !== 'idle') return;
    setSelectedRight((prev) => prev === item ? null : item);

    setSelectedLeft((currentLeft) => {
      if (currentLeft) {
        setMatches((prev) => [...prev, { left: currentLeft, right: item }]);
        if (correctPairs[currentLeft] === item) {
          const allMatches = [...matches, { left: currentLeft, right: item }];
          const answerStr = allMatches.map((m) => `${m.left}:${m.right}`).join(',');
          onAnswer(answerStr);
        }
        return null;
      }
      return currentLeft;
    });
  }, [answerState, correctPairs, matches, onAnswer]);

  const isMatched = (side: 'left' | 'right', item: string) =>
    matches.some((m) => m[side] === item);

  const getMatchColor = (side: 'left' | 'right', item: string) => {
    const match = matches.find((m) => m[side] === item);
    if (!match) return null;
    const isCorrect = correctPairs[match.left] === match.right;
    return isCorrect ? 'border-success bg-success/10' : 'border-error bg-error/10';
  };

  // Check if all matched (for internal validation)
  void selectedAnswer;

  return (
    <div className="w-full">
      <p className="text-text-secondary text-base mb-6">{exercise.question || 'Match the Somali phrases to their English translations:'}</p>

      <div className="grid grid-cols-2 gap-6">
        {/* Left column - Somali */}
        <div className="space-y-2">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Somali</p>
          {leftColumn.map((item, i) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleSelectLeft(item)}
              disabled={isMatched('left', item) || answerState !== 'idle'}
              className={`w-full text-left p-3 rounded-lg border-2 text-sm transition-all ${
                getMatchColor('left', item)
                  ? getMatchColor('left', item)!
                  : selectedLeft === item
                    ? 'border-accent-primary bg-accent-glow text-accent-primary'
                    : 'border-border-default bg-bg-secondary text-text-primary hover:border-text-muted'
              } ${isMatched('left', item) ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* Right column - English */}
        <div className="space-y-2">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-2">English</p>
          {rightColumn.map((item, i) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleSelectRight(item)}
              disabled={isMatched('right', item) || answerState !== 'idle'}
              className={`w-full text-left p-3 rounded-lg border-2 text-sm transition-all ${
                getMatchColor('right', item)
                  ? getMatchColor('right', item)!
                  : selectedRight === item
                    ? 'border-accent-primary bg-accent-glow text-accent-primary'
                    : 'border-border-default bg-bg-secondary text-text-primary hover:border-text-muted'
              } ${isMatched('right', item) ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Connection lines indicator */}
      {matches.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-text-secondary text-xs mt-4 text-center"
        >
          {matches.length} of {leftColumn.length} matched
        </motion.p>
      )}
    </div>
  );
}
