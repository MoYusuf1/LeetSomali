import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import type { Exercise } from '@/data/lessons';

interface AudioTranscriptionProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  answerState: 'idle' | 'correct' | 'wrong';
  selectedAnswer: string | null;
}

export default function AudioTranscription({ exercise, onAnswer, answerState, selectedAnswer }: AudioTranscriptionProps) {
  const [input, setInput] = useState(selectedAnswer || '');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleInput = (value: string) => {
    setInput(value);
    if (value.length >= 3) {
      onAnswer(value);
    } else {
      onAnswer('');
    }
  };

  const isCorrect = answerState === 'correct';
  const isWrong = answerState === 'wrong';

  return (
    <div className="w-full flex flex-col items-center">
      <p className="text-text-secondary text-base mb-4">Listen and type what you hear</p>

      {/* Audio play button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className="relative w-20 h-20 rounded-full bg-accent-primary flex items-center justify-center mb-2"
      >
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent-primary"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
        <Volume2 className="w-8 h-8 text-white" />
      </motion.button>
      <span className="text-text-secondary text-sm mb-6">{isPlaying ? 'Playing...' : 'Tap to listen'}</span>

      {/* Text input */}
      <input
        type="text"
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        disabled={answerState !== 'idle'}
        placeholder="Type what you hear in Somali..."
        className={`w-full max-w-md bg-bg-secondary border-2 rounded-lg p-4 text-text-primary placeholder-text-muted text-base outline-none transition-colors ${
          isCorrect
            ? 'border-success bg-success/5'
            : isWrong
              ? 'border-error bg-error/5'
              : 'border-border-default focus:border-accent-primary'
        }`}
      />

      <p className="text-text-muted text-xs mt-2">Use Latin characters: a, b, c, d, dh, x, q, kh...</p>

      {/* Feedback */}
      {isCorrect && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-success text-sm">
          Correct! {exercise.correctAnswer}
        </motion.div>
      )}
      {isWrong && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-error text-sm">
          Correct answer: <span className="font-medium">{exercise.correctAnswer}</span>
        </motion.div>
      )}
    </div>
  );
}
