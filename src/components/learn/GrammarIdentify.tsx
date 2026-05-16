import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface Exercise {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface Props {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  answerState: 'idle' | 'correct' | 'wrong';
  selectedAnswer: string | null;
}

export default function GrammarIdentify({ exercise, onAnswer, answerState, selectedAnswer }: Props) {
  return (
    <div className="w-full">
      <p className="text-text-secondary text-sm mb-2 uppercase tracking-wider">Identify the grammatical element</p>
      <div className="bg-bg-secondary rounded-xl p-4 border border-border-default mb-6 text-center">
        <p className="text-text-primary text-lg font-semibold">{exercise.question}</p>
      </div>

      <div className="space-y-3">
        {exercise.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === exercise.correctAnswer;
          const showCorrect = answerState === 'correct' && isCorrectOption;
          const showWrong = answerState === 'wrong' && isSelected;
          const showCorrectWhenWrong = answerState === 'wrong' && isCorrectOption;

          return (
            <motion.button
              key={`${option}-${index}`}
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
                answerState !== 'idle' && !isCorrectOption && !isSelected
                  ? 'text-text-muted'
                  : 'text-text-primary'
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

      {/* Explanation on answer */}
      {answerState !== 'idle' && exercise.explanation && (
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
