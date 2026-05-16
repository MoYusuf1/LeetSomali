import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Exercise } from '@/data/lessons';

interface VerbConjugationProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  answerState: 'idle' | 'correct' | 'wrong';
  selectedAnswer: string | null;
}

export default function VerbConjugation({ exercise, onAnswer, answerState, selectedAnswer }: VerbConjugationProps) {
  const [input, setInput] = useState(selectedAnswer || '');
  const [showTable, setShowTable] = useState(false);

  const handleInput = (value: string) => {
    setInput(value);
    onAnswer(value);
  };

  // Extract verb root from the exercise
  const verbRoot = exercise.question.match(/'(\w+)'/)?.[1] || 'keen';
  const subjectPronoun = 'we';
  const suffix = input.replace(verbRoot, '');

  return (
    <div className="w-full">
      <p className="text-text-secondary text-base mb-2">{exercise.question}</p>

      <div className="flex items-center gap-2 mb-6">
        <span className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-sm font-medium">
          {subjectPronoun}
        </span>
        <span className="px-3 py-1 rounded-full bg-info/10 text-info text-sm font-medium">
          Present Habitual
        </span>
      </div>

      {/* Input area */}
      <div className="flex items-center justify-center gap-1 mb-4">
        <span className="text-text-primary text-2xl font-semibold">{verbRoot}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          disabled={answerState !== 'idle'}
          placeholder="___"
          className={`w-32 bg-transparent border-b-2 text-2xl text-center text-text-primary placeholder-text-muted outline-none transition-colors ${
            answerState === 'correct'
              ? 'border-success'
              : answerState === 'wrong'
                ? 'border-error'
                : 'border-accent-primary focus:border-accent-hover'
          }`}
        />
      </div>

      <p className="text-text-muted text-xs text-center mb-6">
        Hint: Present habitual for &quot;we&quot; uses -naa ending
      </p>

      {/* Conjugation table on correct */}
      {answerState === 'correct' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 overflow-hidden"
        >
          <button
            onClick={() => setShowTable(!showTable)}
            className="text-accent-primary text-sm font-medium hover:underline mb-2"
          >
            {showTable ? 'Hide' : 'Show'} full conjugation table
          </button>
          {showTable && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-bg-tertiary rounded-lg p-4 overflow-x-auto"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-default">
                    <th className="text-text-muted text-left py-2 pr-4">Person</th>
                    <th className="text-text-muted text-left py-2">Conjugation</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['I (aniga)', `${verbRoot}aa`],
                    ['You (adiga)', `${verbRoot}taa`],
                    ['He (uu)', `${verbRoot}aa`],
                    ['She (iyada)', `${verbRoot}taa`],
                    ['We (annaga)', `${verbRoot}naa`],
                    ['You all (idinka)', `${verbRoot}taan`],
                    ['They (iyaga)', `${verbRoot}aan`],
                  ].map(([person, form]) => (
                    <tr key={person} className="border-b border-border-subtle last:border-0">
                      <td className="text-text-secondary py-2 pr-4">{person}</td>
                      <td className={`py-2 font-mono ${form === verbRoot + suffix ? 'text-success font-semibold' : 'text-text-primary'}`}>
                        {form}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Wrong feedback */}
      {answerState === 'wrong' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center text-error text-sm"
        >
          Correct: <span className="font-medium">{exercise.correctAnswer}</span>
        </motion.div>
      )}
    </div>
  );
}
