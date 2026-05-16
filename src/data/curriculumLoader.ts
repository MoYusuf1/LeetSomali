// Curriculum data loader - imports the REAL curriculum.json with 8 levels, 30 lessons, 179 exercises
import curriculumData from './curriculum.json';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Exercise {
  order_index: number;
  type: string;
  question: string;
  question_translation: string | null;
  correct_answer: string;
  options: string[];
  hint: string;
  explanation: string;
  difficulty: string;
  points: number;
  wordBank?: string[];
  leftColumn?: string[];
  rightColumn?: string[];
}

export interface Lesson {
  id: number;
  order_index: number;
  title: string;
  description: string;
  grammar_topic: string;
  cultural_note: string;
  estimated_minutes: number;
  difficulty: string;
  exercises: Exercise[];
}

export interface Level {
  id: number;
  order_index: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  lessons: Lesson[];
}

// ─── Raw data access ─────────────────────────────────────────────────────────

const levels: Level[] = (curriculumData as any).levels || [];

// ─── Helper functions ────────────────────────────────────────────────────────

export function getLevels(): Level[] {
  return levels;
}

export function getLevelsCount(): number {
  return levels.length;
}

export function getLessonsByLevel(levelId: number): Lesson[] {
  const level = levels.find((l) => l.id === levelId);
  return level?.lessons || [];
}

export function getLessonsCount(): number {
  return levels.reduce((acc, level) => acc + (level.lessons?.length || 0), 0);
}

export function getExercisesCount(): number {
  return levels.reduce(
    (acc, level) =>
      acc +
      (level.lessons || []).reduce(
        (lAcc, lesson) => lAcc + (lesson.exercises?.length || 0),
        0
      ),
    0
  );
}

export function getLessonById(id: number | string): Lesson | undefined {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  for (const level of levels) {
    const lesson = level.lessons?.find((l) => l.id === numId);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getLessonLevel(lessonId: number): Level | undefined {
  return levels.find((l) => l.lessons?.some((lesson) => lesson.id === lessonId));
}

export function getExercisesByLesson(lessonId: number | string): Exercise[] {
  const lesson = getLessonById(lessonId);
  return lesson?.exercises || [];
}

export function getTotalLessonsUpToLevel(levelId: number): number {
  let count = 0;
  for (const level of levels) {
    if (level.id >= levelId) break;
    count += level.lessons?.length || 0;
  }
  return count;
}

// ─── Level colors (consistent with curriculum) ──────────────────────────────

export const LEVEL_PATH_COLORS: Record<number, string> = {
  1: '#22c55e', // green
  2: '#3b82f6', // blue
  3: '#eab308', // yellow
  4: '#a855f7', // purple
  5: '#ef4444', // red
  6: '#06b6d4', // cyan
  7: '#ec4899', // pink
  8: '#f59e0b', // amber
};

export function getLevelColor(levelId: number): string {
  return LEVEL_PATH_COLORS[levelId] || '#f59e0b';
}

// ─── Lesson ID string formatter (for routing) ───────────────────────────────

export function formatLessonId(levelId: number, lessonOrder: number): string {
  return `l${levelId}-${lessonOrder}`;
}

export function parseLessonId(
  id: string
): { levelId: number; lessonOrder: number } | null {
  const match = id.match(/^l(\d+)-(\d+)$/);
  if (!match) return null;
  return { levelId: parseInt(match[1], 10), lessonOrder: parseInt(match[2], 10) };
}

// ─── Flat lesson list for the lesson path ───────────────────────────────────

export interface FlatLesson {
  globalIndex: number;
  levelId: number;
  levelTitle: string;
  levelColor: string;
  levelIcon: string;
  lessonId: number;
  orderIndex: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  difficulty: string;
  exerciseCount: number;
}

export function getFlatLessons(): FlatLesson[] {
  const flat: FlatLesson[] = [];
  let globalIndex = 0;
  for (const level of levels) {
    for (const lesson of level.lessons || []) {
      flat.push({
        globalIndex,
        levelId: level.id,
        levelTitle: level.title,
        levelColor: level.color,
        levelIcon: level.icon,
        lessonId: lesson.id,
        orderIndex: lesson.order_index,
        title: lesson.title,
        description: lesson.description,
        estimatedMinutes: lesson.estimated_minutes,
        difficulty: lesson.difficulty,
        exerciseCount: lesson.exercises?.length || 0,
      });
      globalIndex++;
    }
  }
  return flat;
}

// ─── Mock user progress (used for demo) ─────────────────────────────────────

export interface UserLessonProgress {
  lessonId: number;
  status: 'completed' | 'current' | 'locked';
  stars?: number;
}

/**
 * Returns mock progress:
 * - Level 1: all 3 lessons completed
 * - Level 2: 2 of 4 completed, 3rd is current
 * - Level 3+: all locked
 */
export function getMockUserProgress(): Map<number, UserLessonProgress> {
  const progress = new Map<number, UserLessonProgress>();

  for (const level of levels) {
    for (const lesson of level.lessons || []) {
      if (level.id === 1) {
        // Level 1: all completed
        progress.set(lesson.id, { lessonId: lesson.id, status: 'completed', stars: 3 });
      } else if (level.id === 2) {
        // Level 2: first 2 completed, 3rd current, rest locked
        if (lesson.order_index <= 2) {
          progress.set(lesson.id, { lessonId: lesson.id, status: 'completed', stars: lesson.order_index === 1 ? 3 : 2 });
        } else if (lesson.order_index === 3) {
          progress.set(lesson.id, { lessonId: lesson.id, status: 'current' });
        } else {
          progress.set(lesson.id, { lessonId: lesson.id, status: 'locked' });
        }
      } else {
        // Level 3+: all locked
        progress.set(lesson.id, { lessonId: lesson.id, status: 'locked' });
      }
    }
  }
  return progress;
}

// ─── Exercise type label mapping ────────────────────────────────────────────

export const EXERCISE_TYPE_LABELS: Record<string, string> = {
  multiple_choice: 'Multiple Choice',
  fill_blank: 'Fill in the Blank',
  matching: 'Matching',
  grammar_identify: 'Grammar Identify',
  listening_select: 'Listening',
  audio_transcription: 'Audio',
  sentence_constructor: 'Sentence Build',
  word_bank: 'Word Bank',
};
