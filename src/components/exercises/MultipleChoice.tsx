import { motion } from 'framer-motion';
import { Volume2, Check, X } from 'lucide-react';
import type { Exercise } from '@/data/lessons';

interface MultipleChoiceProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  answerState: 'idle' | 'correct' | 'wrong';
  selectedAnswer: string | null;
}

export default function MultipleChoice({ exercise, onAnswer, answerState, selectedAnswer }: MultipleChoiceProps) {
  return (
    <div className="w-full">
      <p className="text-text-secondary text-base mb-2">What is the correct Somali for:</p>
      <div className="flex items-center justify-center gap-3 mb-8">
        <h3 className="text-text-primary text-2xl font-bold text-center">{exercise.question}</h3>
        <button
          type="button"
          className="w-10 h-10 rounded-full bg-bg-tertiary hover:bg-bg-elevated flex items-center justify-center transition-colors shrink-0"
          onClick={() => {}}
          title="Listen"
        >
          <Volume2 className="w-5 h-5 text-accent-primary" />
        </button>
      </div>

      <div className="space-y-3">
        {exercise.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === exercise.correctAnswer;
          const showCorrect = answerState === 'correct' && isCorrect;
          const showWrong = answerState === 'wrong' && isSelected;
          const showCorrectWhenWrong = answerState === 'wrong' && isCorrect;

          return (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.2 }}
              onClick={() => answerState === 'idle' && onAnswer(option)}
              disabled={answerState !== 'idle'}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                showCorrect || showCorrectWhenWrong
                  ? 'bg-success/10 border-success'
                  : showWrong
                    ? 'bg-error/10 border-error'
                    : isSelected && answerState === 'idle'
                      ? 'bg-accent-glow border-accent-primary'
                      : 'bg-bg-secondary border-border-default hover:border-text-muted'
              } ${answerState === 'idle' ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <span className={`text-base ${
                answerState !== 'idle' && !isCorrect && !isSelected ? 'text-text-muted' : 'text-text-primary'
              }`}>
                {option}
              </span>
              {showCorrect || showCorrectWhenWrong ? (
                <Check className="w-5 h-5 text-success" />
              ) : showWrong ? (
                <X className="w-5 h-5 text-error" />
              ) : null}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
