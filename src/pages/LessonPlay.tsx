import { useEffect, useCallback, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Check, Star, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  getLessonById,
  getLessonLevel,
  type Exercise,
} from '@/data/curriculumLoader';

// Exercise components
import MultipleChoice from '@/components/exercises/MultipleChoice';
import SentenceConstructor from '@/components/exercises/SentenceConstructor';
import FillInBlank from '@/components/exercises/FillInBlank';
import TranslationMatch from '@/components/exercises/TranslationMatch';
import ListeningSelection from '@/components/exercises/ListeningSelection';
import AudioTranscription from '@/components/exercises/AudioTranscription';
import GrammarIdentify from '@/components/learn/GrammarIdentify';
import WordBank from '@/components/learn/WordBank';

type AnswerState = 'idle' | 'correct' | 'wrong';

// ─── Adapter: Convert curriculum exercise to component-compatible format ─────

function adaptExercise(ex: Exercise) {
  const base = {
    id: `e${ex.order_index}`,
    type: ex.type.replace(/_/g, '-'), // snake_case → kebab-case
    question: ex.question,
    options: ex.options || [],
    correctAnswer: ex.correct_answer,
    explanation: ex.explanation,
    difficulty: ex.difficulty as 'easy' | 'medium' | 'hard',
  };

  // Build word bank for sentence_constructor
  if (ex.type === 'sentence_constructor') {
    const words = ex.correct_answer.split(/\s+/).filter(Boolean);
    // Shuffle words for the bank
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    return { ...base, type: 'sentence-constructor', wordBank: shuffled };
  }

  // Build word bank for word_bank
  if (ex.type === 'word_bank') {
    return { ...base, type: 'word-bank', options: ex.options || [] };
  }

  // Build matching columns
  if (ex.type === 'matching') {
    const pairs = ex.correct_answer.split('|').map((p) => p.split(':').map((s) => s.trim()));
    const leftColumn = pairs.map((p) => p[0]).filter(Boolean);
    const rightColumn = pairs.map((p) => p[1]).filter(Boolean);
    // Shuffle right column
    const shuffledRight = [...rightColumn].sort(() => Math.random() - 0.5);
    return { ...base, type: 'translation-match', leftColumn, rightColumn: shuffledRight };
  }

  // Grammar identify → multiple-choice style with options from correct_answer + distractors
  if (ex.type === 'grammar_identify') {
    const opts = ex.options.length > 1
      ? ex.options
      : [ex.correct_answer, ...generateDistractors(ex.correct_answer, ex.question)];
    return { ...base, type: 'grammar-identify', options: opts };
  }

  // Audio transcription stays
  if (ex.type === 'audio_transcription') {
    return { ...base, type: 'audio-transcription' };
  }

  // Listening select stays
  if (ex.type === 'listening_select') {
    return { ...base, type: 'listening-selection' };
  }

  // Multiple choice stays
  if (ex.type === 'multiple_choice') {
    return { ...base, type: 'multiple-choice' };
  }

  // Fill blank stays
  if (ex.type === 'fill_blank') {
    return { ...base, type: 'fill-in-blank' };
  }

  return base;
}

function generateDistractors(correct: string, _question: string): string[] {
  // Simple distractor generation based on common grammar terms
  const distractors = [
    'nominative case', 'accusative case', 'genitive case', 'vocative case',
    'present tense', 'past tense', 'future tense', 'subjunctive mood',
    'masculine noun', 'feminine noun', 'plural noun', 'singular noun',
    'definite article', 'indefinite article', 'possessive pronoun', 'demonstrative',
    'subject marker', 'object marker', 'focus marker', 'topic marker',
    ' voiced pharyngeal', 'voiceless velar', 'uvular stop', 'retroflex stop',
    'imperative mood', 'conditional', 'relative clause', 'prepositional phrase',
  ];
  return distractors.filter((d) => d !== correct).slice(0, 3);
}

// ─── Exercise Component Registry ─────────────────────────────────────────────

const exerciseComponents: Record<string, React.FC<any>> = {
  'multiple-choice': MultipleChoice,
  'sentence-constructor': SentenceConstructor,
  'fill-in-blank': FillInBlank,
  'translation-match': TranslationMatch,
  'listening-selection': ListeningSelection,
  'audio-transcription': AudioTranscription,
  'grammar-identify': GrammarIdentify,
  'word-bank': WordBank,
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function LessonPlay() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lessonId = parseInt(id || '0', 10);

  const lesson = useMemo(() => getLessonById(lessonId), [lessonId]);
  const level = useMemo(() => getLessonLevel(lessonId), [lessonId]);
  const exercises = useMemo(
    () => (lesson ? lesson.exercises.map(adaptExercise) : []),
    [lesson]
  );

  // Game state
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [maxHearts] = useState(5);
  const [score, setScore] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>('idle');
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [stars, setStars] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [startTime] = useState(Date.now());

  // Reset state when lesson changes
  useEffect(() => {
    setExerciseIndex(0);
    setHearts(5);
    setScore(0);
    setAnswerState('idle');
    setSelectedAnswer(null);
    setLessonComplete(false);
    setStars(0);
    setWrongCount(0);
  }, [lessonId]);

  const handleAnswer = useCallback((answer: string) => {
    if (answerState !== 'idle') return;
    setSelectedAnswer(answer);
  }, [answerState]);

  const handleCheck = useCallback(() => {
    if (!lesson || !selectedAnswer) return;

    if (answerState === 'idle') {
      const rawEx = lesson.exercises[exerciseIndex];
      const adapted = exercises[exerciseIndex];
      if (!rawEx || !adapted) return;

      // Normalize answers for comparison
      const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
      let isCorrect = false;

      if (adapted.type === 'translation-match') {
        // For matching: compare the pipe-delimited pairs
        const userPairs = selectedAnswer.split(',').map((p) => {
          const parts = p.split(':');
          return parts.map((s) => s.trim().toLowerCase()).join(':');
        }).sort().join('|');
        const correctPairs = rawEx.correct_answer.split('|').map((p) => {
          const parts = p.split(':');
          return parts.map((s) => s.trim().toLowerCase()).join(':');
        }).sort().join('|');
        isCorrect = userPairs === correctPairs;
      } else if (adapted.type === 'sentence-constructor' || adapted.type === 'word-bank') {
        isCorrect = normalize(selectedAnswer) === normalize(rawEx.correct_answer);
      } else {
        isCorrect = selectedAnswer === rawEx.correct_answer ||
          normalize(selectedAnswer) === normalize(rawEx.correct_answer);
      }

      if (isCorrect) {
        const pts = rawEx.points || 10;
        setAnswerState('correct');
        setScore((s) => s + pts);
      } else {
        setAnswerState('wrong');
        setHearts((h) => Math.max(0, h - 1));
        setWrongCount((w) => w + 1);
      }
    } else {
      // Continue to next exercise
      if (hearts <= 0 || exerciseIndex >= exercises.length - 1) {
        // Lesson complete
        const totalEx = exercises.length;
        const accuracy = totalEx > 0 ? (totalEx - wrongCount - (hearts <= 0 ? 0 : 0)) / totalEx : 0;
        let s = 1;
        if (accuracy >= 0.9) s = 3;
        else if (accuracy >= 0.7) s = 2;

        // Perfect bonus
        const bonus = wrongCount === 0 ? 10 : 0;
        setScore((sc) => sc + bonus);
        setStars(s);
        setLessonComplete(true);

        // Confetti
        if (s >= 2) {
          const duration = 2000;
          const end = Date.now() + duration;
          const frame = () => {
            confetti({
              particleCount: 4, angle: 60, spread: 55,
              origin: { x: 0, y: 0.6 },
              colors: ['#f59e0b', '#fbbf24', '#22c55e', '#3b82f6', '#ec4899'],
            });
            confetti({
              particleCount: 4, angle: 120, spread: 55,
              origin: { x: 1, y: 0.6 },
              colors: ['#f59e0b', '#fbbf24', '#22c55e', '#3b82f6', '#ec4899'],
            });
            if (Date.now() < end) requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
        }
      } else {
        setExerciseIndex((i) => i + 1);
        setAnswerState('idle');
        setSelectedAnswer(null);
      }
    }
  }, [answerState, selectedAnswer, lesson, exerciseIndex, exercises, hearts, wrongCount]);

  const handleQuit = useCallback(() => {
    navigate('/learn');
  }, [navigate]);

  const handleRestart = useCallback(() => {
    setExerciseIndex(0);
    setHearts(5);
    setScore(0);
    setAnswerState('idle');
    setSelectedAnswer(null);
    setLessonComplete(false);
    setStars(0);
    setWrongCount(0);
  }, []);

  // Loading / not found states
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

  // ─── Lesson Complete Screen ───────────────────────────────────────────────
  if (lessonComplete) {
    return (
      <LessonCompleteScreen
        lesson={lesson}
        level={level}
        stars={stars}
        score={score}
        wrongCount={wrongCount}
        startTime={startTime}
        onContinue={handleQuit}
        onRestart={handleRestart}
      />
    );
  }

  const totalExercises = exercises.length;
  const progress = totalExercises > 0 ? (exerciseIndex / totalExercises) * 100 : 0;
  const exercise = exercises[exerciseIndex];
  const ExerciseComponent = exercise ? (exerciseComponents[exercise.type] || MultipleChoice) : null;
  const canCheck = selectedAnswer && selectedAnswer.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-bg-primary flex flex-col"
    >
      {/* ─── Top Bar ─── */}
      <div className="sticky top-0 h-14 bg-bg-primary border-b border-border-default flex items-center px-4 shrink-0 z-10">
        <div className="flex items-center gap-3 w-full max-w-2xl mx-auto">
          {/* Close */}
          <button
            onClick={() => setShowQuitModal(true)}
            className="w-8 h-8 rounded-lg hover:bg-bg-tertiary flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>

          {/* Progress bar */}
          <div className="flex-1 bg-bg-tertiary rounded-full h-1 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: level?.color || '#f59e0b' }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Lesson info */}
          <span className="text-text-muted text-[10px] whitespace-nowrap">
            {exerciseIndex + 1}/{totalExercises}
          </span>

          {/* Hearts */}
          <div className="flex items-center gap-0.5 shrink-0">
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
                    i < hearts ? 'text-heart fill-heart' : 'text-border-default'
                  }`}
                />
              </motion.div>
            ))}
            <span className="text-text-primary text-sm font-semibold ml-1">{hearts}</span>
          </div>
        </div>
      </div>

      {/* ─── Content Area ─── */}
      <div
        className="flex-1 overflow-y-auto flex items-start justify-center px-4 py-6"
        style={{
          animation: answerState === 'wrong' ? 'shake 0.4s ease-in-out' : 'none',
        }}
      >
        <div className="w-full max-w-[600px] pt-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-4">
            Exercise {exerciseIndex + 1} of {totalExercises}
          </p>

          {/* Cultural note on first exercise */}
          {exerciseIndex === 0 && lesson.cultural_note && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-lg border border-border-default bg-bg-secondary/50"
            >
              <p className="text-accent-primary text-[10px] uppercase tracking-wider font-semibold mb-1">
                Cultural Note
              </p>
              <p className="text-text-secondary text-xs leading-relaxed">
                {lesson.cultural_note}
              </p>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`${lesson.id}-${exerciseIndex}`}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {ExerciseComponent && exercise && (
                <ExerciseComponent
                  exercise={exercise}
                  onAnswer={handleAnswer}
                  answerState={answerState}
                  selectedAnswer={selectedAnswer}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <motion.div
        className="sticky bottom-0 h-auto min-h-[80px] bg-bg-primary border-t border-border-default flex items-center px-4 shrink-0 z-10 py-3"
        animate={{
          backgroundColor:
            answerState === 'correct'
              ? 'rgba(34, 197, 94, 0.08)'
              : answerState === 'wrong'
                ? 'rgba(239, 68, 68, 0.08)'
                : 'rgba(13, 17, 23, 1)',
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full max-w-2xl mx-auto">
          {/* Feedback */}
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
                {lesson.exercises[exerciseIndex]?.points && (
                  <motion.span
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: -25, opacity: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-accent-primary font-bold text-sm"
                  >
                    +{lesson.exercises[exerciseIndex].points} XP
                  </motion.span>
                )}
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
                  Correct answer:{' '}
                  <span className="text-success font-medium">
                    {lesson.exercises[exerciseIndex]?.correct_answer}
                  </span>
                </p>
                {lesson.exercises[exerciseIndex]?.hint && (
                  <p className="text-text-muted text-xs mt-1">
                    Hint: {lesson.exercises[exerciseIndex].hint}
                  </p>
                )}
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
            {answerState === 'idle' ? 'Check' : answerState === 'wrong' && hearts <= 0 ? 'Finish' : 'Continue'}
          </motion.button>
        </div>
      </motion.div>

      {/* ─── Quit Modal ─── */}
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
                  onClick={() => setShowQuitModal(false)}
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

      {/* Screen shake */}
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

// ─── Lesson Complete Screen ──────────────────────────────────────────────────

function LessonCompleteScreen({
  lesson,
  level,
  stars,
  score,
  wrongCount,
  startTime,
  onContinue,
  onRestart,
}: {
  lesson: { title: string; exercises: Exercise[] };
  level: { title: string; color: string } | undefined;
  stars: number;
  score: number;
  wrongCount: number;
  startTime: number;
  onContinue: () => void;
  onRestart: () => void;
}) {
  const [showStars, setShowStars] = useState(0);
  const [countedXP, setCountedXP] = useState(0);

  const duration = Math.round((Date.now() - startTime) / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const totalEx = lesson.exercises.length;
  const accuracy = totalEx > 0 ? Math.round(((totalEx - wrongCount) / totalEx) * 100) : 0;
  const perfectBonus = wrongCount === 0 ? 10 : 0;

  useEffect(() => {
    const t1 = setTimeout(() => setShowStars(1), 300);
    const t2 = setTimeout(() => setShowStars(2), 600);
    const t3 = setTimeout(() => setShowStars(3), 900);

    const xpInterval = setInterval(() => {
      setCountedXP((prev) => {
        if (prev >= score) { clearInterval(xpInterval); return score; }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(xpInterval);
    };
  }, [score]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-bg-primary flex flex-col items-center justify-center px-4 py-8 overflow-y-auto"
    >
      <div className="max-w-md w-full text-center">
        {/* Stars */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              initial={{ scale: 0 }}
              animate={{ scale: showStars >= s ? [0, 1.3, 1] : 0.8 }}
              transition={{ delay: s * 0.3, duration: 0.4, type: 'spring' }}
            >
              <Star
                className={`w-14 h-14 ${
                  stars >= s
                    ? 'text-[#fbbf24] fill-[#fbbf24] drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                    : 'text-[#30363d]'
                }`}
                strokeWidth={stars >= s ? 1.5 : 1}
              />
            </motion.div>
          ))}
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-text-primary font-bold text-2xl mb-1"
        >
          Lesson Complete!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-text-secondary text-sm mb-1"
        >
          {lesson.title}
        </motion.p>
        {level && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-8"
            style={{ backgroundColor: `${level.color}20`, border: `1px solid ${level.color}40` }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: level.color }} />
            <span className="text-[11px] font-semibold" style={{ color: level.color }}>
              {level.title}
            </span>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-bg-secondary rounded-2xl p-4 border border-border-default">
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Total XP</p>
            <p className="text-text-primary text-2xl font-bold text-accent-primary">{countedXP}</p>
          </div>
          <div className="bg-bg-secondary rounded-2xl p-4 border border-border-default">
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Accuracy</p>
            <p className="text-text-primary text-2xl font-bold text-success">{accuracy}%</p>
          </div>
          <div className="bg-bg-secondary rounded-2xl p-4 border border-border-default">
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Time</p>
            <p className="text-text-primary text-2xl font-bold">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
          </div>
          <div className="bg-bg-secondary rounded-2xl p-4 border border-border-default">
            <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Perfect Bonus</p>
            <p className="text-text-primary text-2xl font-bold text-accent-primary">
              +{perfectBonus}
            </p>
          </div>
        </motion.div>

        {/* XP Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-bg-secondary rounded-xl p-4 border border-border-default mb-6 text-left"
        >
          <p className="text-text-muted text-[10px] uppercase tracking-wider font-semibold mb-2">XP Breakdown</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Base XP</span>
              <span className="text-text-primary font-semibold">+{score - perfectBonus}</span>
            </div>
            {perfectBonus > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-accent-primary">Perfect bonus</span>
                <span className="text-accent-primary font-semibold">+{perfectBonus}</span>
              </div>
            )}
            <div className="border-t border-border-default pt-1.5 flex items-center justify-between text-sm font-bold">
              <span className="text-text-primary">Total</span>
              <span className="text-accent-primary">{countedXP} XP</span>
            </div>
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="space-y-3"
        >
          <button
            onClick={onContinue}
            className="w-full py-3.5 bg-accent-primary hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onRestart}
            className="w-full py-2.5 border border-border-default text-text-secondary hover:text-text-primary rounded-xl transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Review Lesson
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
