import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Check } from 'lucide-react';
import type { Exercise } from '@/data/lessons';

interface ListeningSelectionProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  answerState: 'idle' | 'correct' | 'wrong';
  selectedAnswer: string | null;
}

export default function ListeningSelection({ exercise, onAnswer, answerState, selectedAnswer }: ListeningSelectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const isCorrect = answerState === 'correct';
  const isWrong = answerState === 'wrong';

  return (
    <div className="w-full">
      {/* Audio play button */}
      <div className="flex flex-col items-center mb-8">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative w-20 h-20 rounded-full bg-accent-primary flex items-center justify-center mb-3"
        >
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-accent-primary"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
          {/* Animated waveform bars when playing */}
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-white/50 rounded-full"
                  animate={{ height: [8, 20, 8] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          )}
          <Volume2 className="w-8 h-8 text-white relative z-10" />
        </motion.button>
        <span className="text-text-secondary text-sm">{isPlaying ? 'Playing...' : 'Tap to listen'}</span>
      </div>

      {/* Options in 2x2 grid */}
      <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
        {exercise.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === exercise.correctAnswer;

          return (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.2 }}
              onClick={() => answerState === 'idle' && onAnswer(option)}
              disabled={answerState !== 'idle'}
              className={`p-4 rounded-xl border-2 text-left text-sm transition-all duration-200 ${
                isCorrect && isSelected
                  ? 'bg-success/10 border-success'
                  : isWrong && isSelected
                    ? 'bg-error/10 border-error'
                    : isWrong && isCorrectOption
                      ? 'bg-success/10 border-success'
                      : isSelected && answerState === 'idle'
                        ? 'bg-accent-glow border-accent-primary'
                        : answerState !== 'idle' && !isSelected
                          ? 'bg-bg-secondary border-border-default opacity-50'
                          : 'bg-bg-secondary border-border-default text-text-primary hover:border-text-muted'
              }`}
            >
              <span className="text-text-primary">{option}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Correct feedback with translation */}
      {isCorrect && exercise.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center text-success text-sm"
        >
          <Check className="w-5 h-5 inline mr-1" />
          {exercise.explanation}
        </motion.div>
      )}
    </div>
  );
}
