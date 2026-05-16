import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Exercise } from '@/data/lessons';

interface SentenceConstructorProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  answerState: 'idle' | 'correct' | 'wrong';
  selectedAnswer?: string | null;
}

export default function SentenceConstructor({ exercise, onAnswer, answerState, selectedAnswer }: SentenceConstructorProps) {
  void selectedAnswer;
  const initialBank = exercise.wordBank || exercise.options || [];
  const [bank, setBank] = useState<string[]>(initialBank);
  const [slots, setSlots] = useState<(string | null)[]>([]);

  const handleWordClick = useCallback((word: string, fromBank: boolean) => {
    if (answerState !== 'idle') return;

    if (fromBank) {
      setBank((prev) => prev.filter((w) => w !== word));
      setSlots((prev) => {
        const newSlots = [...prev, word];
        const answer = newSlots.filter(Boolean).join(' ');
        onAnswer(answer);
        return newSlots;
      });
    } else {
      setSlots((prev) => {
        const newSlots = prev.filter((w) => w !== word);
        const answer = newSlots.filter(Boolean).join(' ');
        onAnswer(answer);
        return newSlots;
      });
      setBank((prev) => [...prev, word]);
    }
  }, [answerState, onAnswer]);

  return (
    <div className="w-full">
      <p className="text-text-secondary text-base mb-3">Arrange the words to form this sentence:</p>
      <p className="text-text-primary text-xl font-semibold text-center mb-8">{exercise.question}</p>

      {/* Answer slots */}
      <div className="flex flex-wrap gap-2 min-h-[52px] p-3 rounded-lg border-2 border-dashed border-border-default bg-bg-tertiary/50 mb-6 items-center justify-center">
        {slots.length === 0 ? (
          <span className="text-text-muted text-sm">Tap words to place them here</span>
        ) : (
          <AnimatePresence mode="popLayout">
            {slots.map((word, i) => (
              <motion.button
                key={`slot-${word}-${i}`}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={() => word && handleWordClick(word, false)}
                disabled={answerState !== 'idle'}
                className={`px-4 py-2 rounded-lg text-text-primary font-medium text-sm transition-colors ${
                  answerState === 'correct'
                    ? 'bg-success/20 border-2 border-success'
                    : answerState === 'wrong' && word && !exercise.correctAnswer.includes(word)
                      ? 'bg-error/20 border-2 border-error'
                      : answerState === 'wrong'
                        ? 'bg-success/20 border-2 border-success'
                        : 'bg-bg-secondary border-2 border-border-default hover:border-accent-primary'
                }`}
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2 justify-center">
        <AnimatePresence mode="popLayout">
          {bank.map((word) => (
            <motion.button
              key={`bank-${word}`}
              layout
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={() => handleWordClick(word, true)}
              disabled={answerState !== 'idle'}
              className="px-4 py-2 rounded-lg bg-bg-secondary border border-border-default text-text-primary font-medium text-sm hover:border-accent-primary hover:bg-bg-elevated transition-all duration-150 active:scale-[0.97]"
            >
              {word}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Wrong answer reveal */}
      {answerState === 'wrong' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-bg-elevated rounded-lg border-l-4 border-error"
        >
          <p className="text-text-secondary text-sm">Correct answer: <span className="text-success font-medium">{exercise.correctAnswer}</span></p>
        </motion.div>
      )}
    </div>
  );
}
