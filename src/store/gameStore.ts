import { create } from 'zustand';
import type { Lesson } from '@/data/lessons';
import { getLessonById } from '@/data/lessons';
import { defaultUserProgress } from '@/data/userProgress';

export type AnswerState = 'idle' | 'correct' | 'wrong';

interface GameState {
  // User stats
  hearts: number;
  maxHearts: number;
  xp: number;
  totalXp: number;
  gems: number;
  streak: number;

  // Lesson state
  currentLesson: Lesson | null;
  exerciseIndex: number;
  score: number;
  lessonComplete: boolean;
  answerState: AnswerState;
  selectedAnswer: string | null;
  stars: 0 | 1 | 2 | 3;
  startTime: number;
  endTime: number;
  wrongCount: number;
  showQuitModal: boolean;

  // Actions
  startLesson: (lessonId: string) => void;
  selectAnswer: (answer: string) => void;
  checkAnswer: () => void;
  continueExercise: () => void;
  loseHeart: () => void;
  addXP: (amount: number) => void;
  completeLesson: () => void;
  toggleQuitModal: () => void;
  quitLesson: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  hearts: defaultUserProgress.hearts,
  maxHearts: defaultUserProgress.maxHearts,
  xp: 0,
  totalXp: defaultUserProgress.totalXp,
  gems: defaultUserProgress.gems,
  streak: defaultUserProgress.streak,

  currentLesson: null,
  exerciseIndex: 0,
  score: 0,
  lessonComplete: false,
  answerState: 'idle',
  selectedAnswer: null,
  stars: 0,
  startTime: 0,
  endTime: 0,
  wrongCount: 0,
  showQuitModal: false,

  startLesson: (lessonId: string) => {
    const lesson = getLessonById(lessonId);
    if (!lesson) return;
    set({
      currentLesson: lesson,
      exerciseIndex: 0,
      score: 0,
      lessonComplete: false,
      answerState: 'idle',
      selectedAnswer: null,
      stars: 0,
      startTime: Date.now(),
      endTime: 0,
      wrongCount: 0,
      showQuitModal: false,
    });
  },

  selectAnswer: (answer: string) => {
    const state = get();
    if (state.answerState !== 'idle') return;
    set({ selectedAnswer: answer });
  },

  checkAnswer: () => {
    const state = get();
    if (!state.currentLesson || state.answerState !== 'idle' || !state.selectedAnswer) return;

    const exercise = state.currentLesson.exercises[state.exerciseIndex];
    if (!exercise) return;

    const isCorrect = state.selectedAnswer === exercise.correctAnswer;

    if (isCorrect) {
      const xpGain = 10;
      set({
        answerState: 'correct',
        score: state.score + xpGain,
        xp: state.xp + xpGain,
      });
    } else {
      const newHearts = Math.max(0, state.hearts - 1);
      const newWrongCount = state.wrongCount + 1;
      set({
        answerState: 'wrong',
        hearts: newHearts,
        wrongCount: newWrongCount,
      });
    }
  },

  continueExercise: () => {
    const state = get();
    if (!state.currentLesson) return;

    const nextIndex = state.exerciseIndex + 1;
    if (nextIndex >= state.currentLesson.exercises.length || state.hearts <= 0) {
      get().completeLesson();
    } else {
      set({
        exerciseIndex: nextIndex,
        answerState: 'idle',
        selectedAnswer: null,
      });
    }
  },

  loseHeart: () => {
    const state = get();
    set({ hearts: Math.max(0, state.hearts - 1) });
  },

  addXP: (amount: number) => {
    const state = get();
    set({
      xp: state.xp + amount,
      totalXp: state.totalXp + amount,
    });
  },

  completeLesson: () => {
    const state = get();
    const elapsed = Date.now() - state.startTime;
    const elapsedMinutes = elapsed / 60000;

    let finalScore = state.score;
    // Perfect bonus
    if (state.wrongCount === 0) finalScore += 10;
    // Speed bonus
    if (elapsedMinutes < 2) finalScore += 5;
    // Streak bonus
    if (state.streak >= 3) finalScore += 5;

    // Star calculation
    let stars: 1 | 2 | 3 = 1;
    if (state.wrongCount === 0) stars = 3;
    else if (state.wrongCount === 1) stars = 2;

    set({
      lessonComplete: true,
      endTime: Date.now(),
      score: finalScore,
      totalXp: state.totalXp + finalScore,
      stars,
      answerState: 'idle',
    });
  },

  toggleQuitModal: () => {
    const state = get();
    set({ showQuitModal: !state.showQuitModal });
  },

  quitLesson: () => {
    set({
      currentLesson: null,
      exerciseIndex: 0,
      score: 0,
      lessonComplete: false,
      answerState: 'idle',
      selectedAnswer: null,
      stars: 0,
      showQuitModal: false,
    });
  },
}));
