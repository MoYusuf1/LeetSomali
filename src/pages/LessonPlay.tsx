import { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Check } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { getLessonById } from '@/data/lessons';
import SentenceConstructor from '@/components/exercises/SentenceConstructor';
import MultipleChoice from '@/components/exercises/MultipleChoice';
import AudioTranscription from '@/components/exercises/AudioTranscription';
import FillInBlank from '@/components/exercises/FillInBlank';
import FocusMarkerChallenge from '@/components/exercises/FocusMarkerChallenge';
import VerbConjugation from '@/components/exercises/VerbConjugation';
import TranslationMatch from '@/components/exercises/TranslationMatch';
import ListeningSelection from '@/components/exercises/ListeningSelection';
import LessonComplete from '@/components/LessonComplete';

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

export default function LessonPlay() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    currentLesson,
    exerciseIndex,
    hearts,
    maxHearts,
    answerState,
    lessonComplete,
    showQuitModal,
    startLesson,
    selectAnswer,
    checkAnswer,
    continueExercise,
    toggleQuitModal,
    quitLesson,
  } = useGameStore();

  const [localAnswer, setLocalAnswer] = useState<string | null>(null);

  const lessonId = id || '';

  // Start lesson when mounted
  useEffect(() => {
    if (lessonId && (!currentLesson || currentLesson.id !== lessonId)) {
      startLesson(lessonId);
    }
    return () => {
      setLocalAnswer(null);
    };
  }, [lessonId, currentLesson, startLesson]);

  const lesson = currentLesson || (lessonId ? getLessonById(lessonId) : null);

  const handleAnswer = useCallback((answer: string) => {
    setLocalAnswer(answer);
    selectAnswer(answer);
  }, [selectAnswer]);

  const handleCheck = useCallback(() => {
    if (answerState === 'idle') {
      if (localAnswer && localAnswer.length > 0) {
        checkAnswer();
      }
    } else {
      continueExercise();
      setLocalAnswer(null);
    }
  }, [answerState, localAnswer, checkAnswer, continueExercise]);

  const handleQuit = useCallback(() => {
    quitLesson();
    navigate('/learn');
  }, [quitLesson, navigate]);

  const handleContinue = useCallback(() => {
    quitLesson();
    navigate('/learn');
  }, [quitLesson, navigate]);

  const handleRestart = useCallback(() => {
    if (lessonId) {
      startLesson(lessonId);
      setLocalAnswer(null);
    }
  }, [lessonId, startLesson]);

  if (!lesson) {
    return (
      <div className="fixed inset-0 z-[100] bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary text-sm mb-4">Lesson not found</p>
          <button
            onClick={() => navigate('/learn')}
            className="px-4 py-2 bg-accent-primary text-white rounded-lg font-medium text-sm"
          >
            Back to Learn
          </button>
        </div>
      </div>
    );
  }

  // Show completion screen
  if (lessonComplete) {
    return (
      <LessonComplete
        lessonId={lesson.id}
        onContinue={handleContinue}
        onRestart={handleRestart}
      />
    );
  }

  const exercise = lesson.exercises[exerciseIndex];
  if (!exercise) {
    return (
      <div className="fixed inset-0 z-[100] bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary">Loading exercise...</p>
      </div>
    );
  }

  const totalExercises = lesson.exercises.length;
  const progress = ((exerciseIndex) / totalExercises) * 100;
  const ExerciseComponent = exerciseComponents[exercise.type] || MultipleChoice;
  const canCheck = localAnswer && localAnswer.length > 0;

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-[100] bg-bg-primary flex flex-col"
    >
      {/* Top Bar */}
      <div className="sticky top-0 h-14 bg-bg-primary border-b border-border-default flex items-center px-4 shrink-0 z-10">
        <div className="flex items-center gap-3 w-full max-w-2xl mx-auto">
          <button
            onClick={toggleQuitModal}
            className="w-8 h-8 rounded-lg hover:bg-bg-tertiary flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>

          <div className="flex-1 bg-bg-tertiary rounded-full h-1 overflow-hidden">
            <motion.div
              className="h-full bg-accent-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {[...Array(maxHearts)].map((_, i) => (
              <motion.div
                key={i}
                animate={
                  answerState === 'wrong' && i === hearts
                    ? { scale: [1, 0.8, 0], opacity: [1, 0.5, 0] }
                    : {}
                }
                transition={{ duration: 0.4 }}
              >
                <Heart
                  className={`w-5 h-5 ${
                    i < hearts
                      ? 'text-heart fill-heart'
                      : 'text-border-default'
                  }`}
                />
              </motion.div>
            ))}
            <span className="text-text-primary text-sm font-semibold ml-1">{hearts}</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div
        className="flex-1 overflow-y-auto flex items-start justify-center px-4 py-6"
        style={{
          animation: answerState === 'wrong'
            ? 'shake 0.4s ease-in-out'
            : 'none',
        }}
      >
        <div className="w-full max-w-[600px] pt-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-4">
            Exercise {exerciseIndex + 1} of {totalExercises}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${lesson.id}-${exerciseIndex}`}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <ExerciseComponent
                exercise={exercise}
                onAnswer={handleAnswer}
                answerState={answerState}
                selectedAnswer={localAnswer}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="sticky bottom-0 h-auto min-h-[80px] bg-bg-primary border-t border-border-default flex items-center px-4 shrink-0 z-10 py-3"
        animate={{
          backgroundColor: answerState === 'correct'
            ? 'rgba(34, 197, 94, 0.08)'
            : answerState === 'wrong'
              ? 'rgba(239, 68, 68, 0.08)'
              : 'rgba(13, 17, 23, 1)',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full max-w-2xl mx-auto">
          {/* Feedback messages */}
          <AnimatePresence>
            {answerState === 'correct' && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="flex items-center justify-between mb-2 px-1"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Check className="w-5 h-5 text-success" />
                  </motion.div>
                  <span className="text-success font-semibold text-sm">Correct!</span>
                </div>
                <motion.span
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -25, opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-accent-primary font-bold text-sm"
                >
                  +10 XP
                </motion.span>
              </motion.div>
            )}

            {answerState === 'wrong' && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="mb-2 px-1"
              >
                <p className="text-error text-sm font-semibold">Incorrect</p>
                <p className="text-text-secondary text-xs">
                  Correct answer: <span className="text-success">{exercise.correctAnswer}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.97 }}
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
            {answerState === 'idle' ? 'Check' : 'Continue'}
          </motion.button>
        </div>
      </motion.div>

      {/* Quit Confirmation Modal */}
      <AnimatePresence>
        {showQuitModal && (
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
                  onClick={toggleQuitModal}
                  className="flex-1 py-2.5 bg-accent-primary hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors"
                >
                  Keep Learning
                </button>
                <button
                  onClick={handleQuit}
                  className="py-2.5 px-4 text-text-secondary hover:text-text-primary font-medium text-sm transition-colors"
                >
                  Quit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen shake animation style */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-6px); }
          25% { transform: translateX(6px); }
          40% { transform: translateX(-4px); }
          55% { transform: translateX(4px); }
          70% { transform: translateX(-2px); }
          85% { transform: translateX(2px); }
        }
      `}</style>
    </motion.div>
  );
}
