import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Exercise } from '@/data/lessons';

interface FocusMarkerChallengeProps {
  exercise: Exercise;
  onAnswer: (answer: string) => void;
  answerState: 'idle' | 'correct' | 'wrong';
  selectedAnswer: string | null;
}

export default function FocusMarkerChallenge({ exercise, onAnswer, answerState, selectedAnswer }: FocusMarkerChallengeProps) {
  void selectedAnswer;
  const [placedMarker, setPlacedMarker] = useState<string | null>(null);
  const sentenceWords = exercise.wordBank || ['Ali', 'wuxuu', 'tagay', 'suuqa'];
  const markerOptions = ['baa', 'ayaa'];

  const handlePlaceMarker = (marker: string) => {
    if (answerState !== 'idle') return;
    setPlacedMarker(marker);
    // Build answer with marker after the first word
    const answer = sentenceWords[0] + ' ' + marker + ' ' + sentenceWords.slice(1).join(' ');
    onAnswer(answer);
  };

  const handleRemoveMarker = () => {
    if (answerState !== 'idle') return;
    setPlacedMarker(null);
    onAnswer('');
  };

  const isCorrect = answerState === 'correct';
  const isWrong = answerState === 'wrong';

  return (
    <div className="w-full">
      <p className="text-text-secondary text-base mb-2">{exercise.question || "Add the focus marker to emphasize 'Ali':"}</p>

      {/* Sentence display with drop zone */}
      <div className="flex flex-wrap items-center justify-center gap-2 min-h-[60px] p-4 rounded-lg bg-bg-tertiary/50 mb-6">
        {sentenceWords.map((word, index) => (
          <span key={index} className="flex items-center">
            <span
              className={`px-3 py-1.5 rounded-lg text-base font-medium transition-all ${
                index === 0 && (isCorrect || placedMarker)
                  ? 'bg-accent-glow text-accent-primary'
                  : 'bg-bg-secondary text-text-primary'
              }`}
            >
              {word}
            </span>
            {index === 0 && (
              <span className="mx-1">
                {placedMarker ? (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={handleRemoveMarker}
                    disabled={answerState !== 'idle'}
                    className={`px-3 py-1.5 rounded-lg text-base font-bold transition-all ${
                      isCorrect
                        ? 'bg-success/20 text-success border-2 border-success'
                        : isWrong
                          ? 'bg-error/20 text-error border-2 border-error'
                          : 'bg-accent-glow text-accent-primary border-2 border-accent-primary'
                    }`}
                  >
                    {placedMarker}
                  </motion.button>
                ) : (
                  <span className="w-[60px] h-8 inline-flex items-center justify-center border-2 border-dashed border-accent-primary/40 rounded-lg text-text-muted text-sm">
                    ___
                  </span>
                )}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Marker options */}
      {answerState === 'idle' && (
        <div className="flex items-center justify-center gap-4">
          <p className="text-text-secondary text-sm mr-2">Choose a marker:</p>
          {markerOptions.map((marker) => (
            <motion.button
              key={marker}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePlaceMarker(marker)}
              className="px-5 py-2.5 rounded-xl bg-bg-secondary border-2 border-accent-primary text-accent-primary font-semibold text-base hover:bg-accent-glow transition-colors"
            >
              {marker}
            </motion.button>
          ))}
        </div>
      )}

      {/* Correct explanation */}
      {isCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-accent-glow rounded-lg border border-accent-primary/30 text-center"
        >
          <p className="text-accent-primary font-medium">{exercise.explanation || "baa focuses on the noun immediately preceding it."}</p>
        </motion.div>
      )}

      {/* Wrong feedback */}
      {isWrong && (
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
