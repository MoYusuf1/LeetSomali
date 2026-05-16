import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Exercise {
  question: string;
  correctAnswer: string;
  explanation: string;
  options: string[];
}

interface Props {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  answerState: 'idle' | 'correct' | 'wrong';
  selectedAnswer?: string | null;
}

export default function WordBank({ exercise, onAnswer, answerState, selectedAnswer }: Props) {
  void selectedAnswer;

  const wordBank = exercise.options || [];
  const [bank, setBank] = useState<string[]>([...wordBank]);
  const [slots, setSlots] = useState<string[]>([]);

  const handleWordClick = useCallback((word: string, fromBank: boolean) => {
    if (answerState !== 'idle') return;

    if (fromBank) {
      const idx = bank.indexOf(word);
      if (idx === -1) return;
      const newBank = bank.filter((_, i) => i !== idx);
      const newSlots = [...slots, word];
      setBank(newBank);
      setSlots(newSlots);
      onAnswer(newSlots.join(' '));
    } else {
      const idx = slots.indexOf(word);
      if (idx === -1) return;
      const newSlots = slots.filter((_, i) => i !== idx);
      const newBank = [...bank, word];
      setSlots(newSlots);
      setBank(newBank);
      onAnswer(newSlots.join(' '));
    }
  }, [answerState, bank, slots, onAnswer]);

  const correctWords = exercise.correctAnswer.split(/\s+/).filter(Boolean);
  const isFull = slots.length === correctWords.length;

  return (
    <div className="w-full">
      <p className="text-text-secondary text-sm mb-2 uppercase tracking-wider">Build the Somali sentence</p>
      <p className="text-text-primary text-lg font-semibold text-center mb-6">
        &ldquo;{exercise.question}&rdquo;
      </p>

      {/* Answer slots */}
      <div className="flex flex-wrap gap-2 min-h-[52px] p-3 rounded-lg border-2 border-dashed border-border-default bg-bg-tertiary/50 mb-6 items-center justify-center">
        {slots.length === 0 ? (
          <span className="text-text-muted text-sm">Tap words to build the sentence</span>
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
                onClick={() => handleWordClick(word, false)}
                disabled={answerState !== 'idle'}
                className={`px-4 py-2 rounded-lg text-text-primary font-medium text-sm transition-colors ${
                  answerState === 'correct'
                    ? 'bg-success/20 border-2 border-success'
                    : answerState === 'wrong' && isFull
                      ? 'bg-error/20 border-2 border-error'
                      : answerState === 'wrong'
                        ? 'bg-warning/20 border-2 border-warning'
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
          {bank.map((word, i) => (
            <motion.button
              key={`bank-${word}-${i}`}
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
          <p className="text-text-secondary text-sm">
            Correct answer: <span className="text-success font-medium">{exercise.correctAnswer}</span>
          </p>
          {exercise.explanation && (
            <p className="text-text-muted text-xs mt-1">{exercise.explanation}</p>
          )}
        </motion.div>
      )}

      {/* Explanation on correct */}
      {answerState === 'correct' && exercise.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-bg-elevated rounded-lg border-l-4 border-info"
        >
          <p className="text-text-secondary text-sm">{exercise.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
