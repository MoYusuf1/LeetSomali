import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Check } from 'lucide-react';
import type { Exercise } from '@/data/lessons';
import { useGameStore } from '@/store/gameStore';
import SentenceConstructor from './exercises/SentenceConstructor';
import MultipleChoice from './exercises/MultipleChoice';
import AudioTranscription from './exercises/AudioTranscription';
import FillInBlank from './exercises/FillInBlank';
import FocusMarkerChallenge from './exercises/FocusMarkerChallenge';
import VerbConjugation from './exercises/VerbConjugation';
import TranslationMatch from './exercises/TranslationMatch';
import ListeningSelection from './exercises/ListeningSelection';

interface ExercisePlayerProps {
  exercise: Exercise;
  exerciseIndex: number;
  totalExercises: number;
  onQuit: () => void;
}

const exerciseComponents = {
  'sentence-constructor': SentenceConstructor,
  'multiple-choice': MultipleChoice,
  'audio-transcription': AudioTranscription,
  'fill-in-blank': FillInBlank,
  'focus-marker': FocusMarkerChallenge,
  'verb-conjugation': VerbConjugation,
  'translation-match': TranslationMatch,
  'listening-selection': ListeningSelection,
};

export default function ExercisePlayer({ exercise, exerciseIndex, totalExercises, onQuit }: ExercisePlayerProps) {
  const {
    hearts,
    answerState,
    selectedAnswer,
    selectAnswer,
    checkAnswer,
    continueExercise,
  } = useGameStore();

  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

  const progress = ((exerciseIndex) / totalExercises) * 100;
  const ExerciseComponent = exerciseComponents[exercise.type] || MultipleChoice;

  const handleAnswer = useCallback((answer: string) => {
    selectAnswer(answer);
  }, [selectAnswer]);

  const handleCheck = () => {
    if (answerState === 'idle') {
      checkAnswer();
    } else {
      continueExercise();
    }
  };

  const canCheck = selectedAnswer && selectedAnswer.length > 0;

  return (
    <div className="fixed inset-0 z-[100] bg-bg-primary flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 h-14 bg-bg-primary border-b border-border-default flex items-center px-4 shrink-0 z-10">
        <div className="flex items-center gap-3 w-full max-w-2xl mx-auto">
          {/* Close button */}
          <button
            onClick={() => setShowQuitConfirm(true)}
            className="w-8 h-8 rounded-lg hover:bg-bg-tertiary flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>

          {/* Progress bar */}
          <div className="flex-1 bg-bg-tertiary rounded-full h-1 overflow-hidden">
            <motion.div
              className="h-full bg-accent-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Heart count */}
          <div className="flex items-center gap-1 shrink-0">
            <Heart className="w-5 h-5 text-heart fill-heart" />
            <span className="text-text-primary text-sm font-semibold">{hearts}</span>
          </div>
        </div>
      </div>

      {/* Quit Confirmation Modal */}
      <AnimatePresence>
        {showQuitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-bg-elevated rounded-2xl p-6 max-w-sm w-full border border-border-default"
            >
              <h3 className="text-text-primary font-bold text-lg mb-2">Quit Lesson?</h3>
              <p className="text-text-secondary text-sm mb-6">
                You&apos;ll lose your progress in this lesson. Hearts won&apos;t be refunded.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowQuitConfirm(false)}
                  className="flex-1 py-2.5 bg-accent-primary hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors"
                >
                  Keep Learning
                </button>
                <button
                  onClick={onQuit}
                  className="py-2.5 px-4 text-text-secondary hover:text-text-primary font-medium text-sm transition-colors"
                >
                  Quit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-[600px]">
          {/* Exercise question number */}
          <p className="text-text-muted text-xs uppercase tracking-wider mb-4">
            Exercise {exerciseIndex + 1} of {totalExercises}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={exercise.id}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <ExerciseComponent
                exercise={exercise}
                onAnswer={handleAnswer}
                answerState={answerState}
                selectedAnswer={selectedAnswer}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="sticky bottom-0 h-20 bg-bg-primary border-t border-border-default flex items-center px-4 shrink-0 z-10"
        animate={{
          backgroundColor: answerState === 'correct'
            ? 'rgba(34, 197, 94, 0.1)'
            : answerState === 'wrong'
              ? 'rgba(239, 68, 68, 0.1)'
              : 'transparent',
        }}
      >
        <div className="w-full max-w-2xl mx-auto">
          {answerState === 'correct' && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-between mb-2"
            >
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-success" />
                <span className="text-success font-semibold">Correct!</span>
              </div>
              <motion.span
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -30, opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-accent-primary font-bold text-sm"
              >
                +10 XP
              </motion.span>
            </motion.div>
          )}

          {answerState === 'wrong' && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-2"
            >
              <p className="text-error text-sm font-semibold">Incorrect</p>
              <p className="text-text-secondary text-xs">
                Correct answer: <span className="text-success">{exercise.correctAnswer}</span>
              </p>
            </motion.div>
          )}

          <button
            onClick={handleCheck}
            disabled={answerState === 'idle' && !canCheck}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              answerState === 'correct'
                ? 'bg-success hover:bg-success/80 text-white'
                : answerState === 'wrong'
                  ? 'bg-error hover:bg-error/80 text-white'
                  : canCheck
                    ? 'bg-accent-primary hover:bg-accent-hover text-white'
                    : 'bg-bg-tertiary text-text-muted cursor-not-allowed'
            }`}
          >
            {answerState === 'idle'
              ? 'Check'
              : answerState === 'correct'
                ? 'Continue'
                : 'Continue'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
