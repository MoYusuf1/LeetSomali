import { motion } from 'framer-motion';
import type { Exercise } from '@/data/lessons';

interface FillInBlankProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  answerState: 'idle' | 'correct' | 'wrong';
  selectedAnswer: string | null;
}

export default function FillInBlank({ exercise, onAnswer, answerState, selectedAnswer }: FillInBlankProps) {
  const parts = exercise.question.split('___');

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="text-text-primary text-xl font-semibold inline-flex items-center flex-wrap justify-center gap-1">
          {parts.map((part, i) => (
            <span key={i} className="flex items-center">
              <span>{part}</span>
              {i < parts.length - 1 && (
                <span
                  className={`inline-flex items-center justify-center min-w-[120px] h-12 px-3 mx-1 rounded-lg border-2 border-dashed text-base font-medium transition-all ${
                    answerState === 'correct'
                      ? 'border-success bg-success/10 text-success'
                      : answerState === 'wrong'
                        ? 'border-error bg-error/10 text-error'
                        : selectedAnswer
                          ? 'border-accent-primary bg-accent-glow text-text-primary'
                          : 'border-border-default bg-bg-tertiary text-text-muted'
                  }`}
                >
                  {selectedAnswer || '___'}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Options in 2x2 grid */}
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {exercise.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === exercise.correctAnswer;
          const showCorrect = answerState !== 'idle' && isCorrect;

          return (
            <motion.button
              key={option}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.2 }}
              onClick={() => answerState === 'idle' && onAnswer(option)}
              disabled={answerState !== 'idle'}
              className={`p-4 rounded-xl border-2 text-center text-base font-medium transition-all duration-200 ${
                showCorrect
                  ? 'bg-success/10 border-success text-success'
                  : isSelected && answerState === 'wrong'
                    ? 'bg-error/10 border-error text-error'
                    : isSelected && answerState === 'idle'
                      ? 'bg-accent-glow border-accent-primary text-text-primary'
                      : 'bg-bg-secondary border-border-default text-text-primary hover:border-text-muted'
              }`}
            >
              {option}
            </motion.button>
          );
        })}
      </div>

      {/* Grammar tip on correct */}
      {answerState === 'correct' && exercise.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-bg-elevated rounded-lg border-l-4 border-info max-w-md mx-auto"
        >
          <p className="text-text-secondary text-sm">{exercise.explanation}</p>
        </motion.div>
      )}

      {/* Wrong answer feedback */}
      {answerState === 'wrong' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-error text-sm"
        >
          The correct answer is: <span className="font-medium">{exercise.correctAnswer}</span>
        </motion.div>
      )}
    </div>
  );
}
