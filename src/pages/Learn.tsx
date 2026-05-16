import { useState, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Flame, Gem, Heart, BookOpen, Star, Check, Lock,
  Trophy, Zap, Play
} from 'lucide-react';
import {
  getLevels,
  getFlatLessons,
  getMockUserProgress,
  getLevelColor,
  type FlatLesson,
} from '@/data/curriculumLoader';

// ─── Constants ───────────────────────────────────────────────────────────────

const NODE_SIZE = 64;
const PATH_WIDTH = 320;
const NODE_GAP_Y = 100;

// ─── SVG Path Generator ──────────────────────────────────────────────────────

function generateSnakePath(
  lessonCount: number,
  startY: number
): { pathD: string; nodePositions: { x: number; y: number }[] } {
  const positions: { x: number; y: number }[] = [];
  const leftX = 60;
  const rightX = PATH_WIDTH - 60;
  let currentY = startY + 40;

  for (let i = 0; i < lessonCount; i++) {
    const isLeft = i % 2 === 0;
    const x = isLeft ? leftX : rightX;
    positions.push({ x, y: currentY });
    currentY += NODE_GAP_Y;
  }

  // Build SVG path through all points with smooth curves
  if (positions.length === 0) return { pathD: '', nodePositions: [] };

  let pathD = `M ${positions[0].x} ${positions[0].y}`;
  for (let i = 1; i < positions.length; i++) {
    const prev = positions[i - 1];
    const curr = positions[i];
    const midX = (prev.x + curr.x) / 2;
    // Smooth S-curve between nodes
    pathD += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  return { pathD, nodePositions: positions };
}

// ─── Path Segment Colors ─────────────────────────────────────────────────────

// ─── Level Icon Component ────────────────────────────────────────────────────

function LevelIcon({ icon, color, size = 24 }: { icon: string; color: string; size?: number }) {
  const icons: Record<string, React.ReactNode> = {
    alphabet: <span style={{ fontSize: size * 0.6, fontWeight: 'bold', color }}>Aa</span>,
    book: <BookOpen size={size * 0.5} color={color} />,
    message: <span style={{ fontSize: size * 0.6, color }}>💬</span>,
    puzzle: <span style={{ fontSize: size * 0.6, color }}>🧩</span>,
    zap: <Zap size={size * 0.5} color={color} />,
    brain: <span style={{ fontSize: size * 0.6, color }}>🧠</span>,
    trophy: <Trophy size={size * 0.5} color={color} />,
    crown: <span style={{ fontSize: size * 0.6, color }}>👑</span>,
  };
  return <>{icons[icon] || <Star size={size * 0.5} color={color} />}</>;
}

// ─── Animated Node Component ─────────────────────────────────────────────────

function LessonNode({
  lesson,
  position,
  status,
  stars,
  onClick,
  delay,
}: {
  lesson: FlatLesson;
  position: { x: number; y: number };
  status: 'completed' | 'current' | 'locked';
  stars?: number;
  onClick: () => void;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });
  const color = lesson.levelColor;

  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';
  const isLocked = status === 'locked';

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay }}
      style={{
        position: 'absolute',
        left: position.x - NODE_SIZE / 2,
        top: position.y - NODE_SIZE / 2,
        zIndex: 10,
      }}
    >
      {/* Pulsing ring for current node */}
      {isCurrent && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `0 0 0 0 ${color}40`,
          }}
          animate={{
            boxShadow: [
              `0 0 0 0px ${color}40`,
              `0 0 0 12px ${color}00`,
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
        />
      )}

      {/* Glow for completed */}
      {isCompleted && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-40"
          style={{ backgroundColor: '#fbbf24' }}
        />
      )}

      {/* Main node circle */}
      <button
        onClick={!isLocked ? onClick : undefined}
        disabled={isLocked}
        className={`
          relative w-[64px] h-[64px] rounded-full flex items-center justify-center
          transition-all duration-200 border-2
          ${isCompleted
            ? 'bg-[#fbbf24] border-[#f59e0b] shadow-[0_0_16px_rgba(251,191,36,0.4)] cursor-pointer hover:scale-110'
            : isCurrent
              ? 'cursor-pointer hover:scale-110 hover:brightness-110'
              : 'bg-[#30363d] border-[#21262d] cursor-not-allowed opacity-70'
        }
      `}
        style={
          isCurrent
            ? { backgroundColor: color, borderColor: color }
            : isLocked
              ? {}
              : {}
        }
      >
        {isCompleted ? (
          <Check className="w-7 h-7 text-white stroke-[3]" />
        ) : isCurrent ? (
          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
        ) : (
          <Lock className="w-5 h-5 text-[#484f58]" />
        )}
      </button>

      {/* Sparkle effect for completed */}
      {isCompleted && (
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
        >
          <Star className="w-3 h-3 text-[#fbbf24] fill-[#fbbf24]" />
        </motion.div>
      )}

      {/* Label below node */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
        style={{ top: NODE_SIZE + 6 }}
      >
        <p className={`text-[11px] font-semibold ${isLocked ? 'text-[#484f58]' : 'text-text-primary'}`}>
          {lesson.title}
        </p>
        <p className="text-[9px] text-[#484f58] mt-0.5">
          {lesson.exerciseCount} exercises
        </p>
        {/* Stars for completed */}
        {isCompleted && stars && (
          <div className="flex items-center justify-center gap-0.5 mt-0.5">
            {[1, 2, 3].map((s) => (
              <Star
                key={s}
                className={`w-2.5 h-2.5 ${s <= stars ? 'text-[#fbbf24] fill-[#fbbf24]' : 'text-[#484f58]'}`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Level Section Divider ───────────────────────────────────────────────────

function LevelBanner({
  level,
  completedCount,
  totalCount,
}: {
  level: { id: number; title: string; description: string; color: string; icon: string };
  completedCount: number;
  totalCount: number;
}) {
  return (
    <div
      className="w-full rounded-2xl border border-border-default overflow-hidden mb-6"
      style={{ backgroundColor: '#161b22' }}
    >
      <div className="flex items-stretch">
        {/* Left colored border */}
        <div className="w-2 shrink-0" style={{ backgroundColor: level.color }} />
        <div className="flex-1 p-4 flex items-center gap-4">
          {/* Level icon circle */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${level.color}20`, border: `2px solid ${level.color}40` }}
          >
            <LevelIcon icon={level.icon} color={level.color} size={28} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-text-primary font-bold text-sm">Level {level.id}</h3>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                style={{ backgroundColor: `${level.color}20`, color: level.color }}
              >
                {level.title}
              </span>
            </div>
            <p className="text-text-muted text-xs mt-1 truncate">{level.description}</p>
            <p className="text-text-secondary text-[11px] mt-1.5">
              {completedCount} of {totalCount} completed
            </p>
          </div>
          {/* Progress ring */}
          <div className="relative w-10 h-10 shrink-0">
            <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="16" fill="none" stroke="#21262d" strokeWidth="3" />
              <circle
                cx="20" cy="20" r="16" fill="none"
                stroke={level.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 16}
                strokeDashoffset={2 * Math.PI * 16 * (1 - completedCount / totalCount)}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-text-primary">
              {Math.round((completedCount / totalCount) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Floating Bottom Bar ─────────────────────────────────────────────────────

function FloatingBottomBar({
  onStartCurrent,
  currentLesson,
}: {
  onStartCurrent: () => void;
  currentLesson: FlatLesson | null;
}) {
  const [gems] = useState(342);
  const [hearts] = useState(5);

  if (!currentLesson) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border-default"
      style={{ backgroundColor: '#0d1117ee', backdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-4">
        {/* Hearts */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Heart className="w-5 h-5 text-heart fill-heart" />
          <span className="text-text-primary text-sm font-bold">{hearts}</span>
        </div>
        {/* Gems */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Gem className="w-5 h-5 text-diamond" />
          <span className="text-text-primary text-sm font-bold">{gems}</span>
        </div>
        {/* START button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStartCurrent}
          className="flex-1 py-3 bg-[#f59e0b] hover:bg-[#fbbf24] text-white font-bold rounded-full
                     transition-colors flex items-center justify-center gap-2 shadow-lg text-sm"
        >
          <Zap className="w-4 h-4" />
          START
          <span className="text-white/80 text-xs font-semibold">+10 XP</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Main Learn Page ─────────────────────────────────────────────────────────

export default function Learn() {
  const navigate = useNavigate();
  const [userProgress] = useState(() => getMockUserProgress());
  const flatLessons = useMemo(() => getFlatLessons(), []);
  const levels = useMemo(() => getLevels(), []);

  // Stats header
  const [streak] = useState(12);
  const [gems] = useState(342);
  const [hearts] = useState(5);

  // Find current lesson (first non-completed, non-locked)
  const currentLesson = useMemo(() => {
    return flatLessons.find((l) => userProgress.get(l.lessonId)?.status === 'current') || null;
  }, [flatLessons, userProgress]);

  // Group lessons by level
  const lessonsByLevel = useMemo(() => {
    const grouped: Record<number, FlatLesson[]> = {};
    for (const lesson of flatLessons) {
      if (!grouped[lesson.levelId]) grouped[lesson.levelId] = [];
      grouped[lesson.levelId].push(lesson);
    }
    return grouped;
  }, [flatLessons]);

  // Path positions per level
  const levelPaths = useMemo(() => {
    const result: Record<
      number,
      { pathD: string; nodePositions: { x: number; y: number }[]; lessons: FlatLesson[] }
    > = {};
    for (const [levelId, lessons] of Object.entries(lessonsByLevel)) {
      const numId = parseInt(levelId, 10);
      const { pathD, nodePositions } = generateSnakePath(lessons.length, 0);
      result[numId] = { pathD, nodePositions, lessons };
    }
    return result;
  }, [lessonsByLevel]);

  const handleStartLesson = useCallback(
    (lessonId: number) => {
      navigate(`/lesson/${lessonId}`);
    },
    [navigate]
  );

  // Build sections with banners and paths
  const sections = useMemo(() => {
    const items: {
      type: 'banner' | 'nodes';
      levelId: number;
      lessons: FlatLesson[];
    }[] = [];
    for (const level of levels) {
      items.push({ type: 'banner', levelId: level.id, lessons: [] });
      const lvlLessons = lessonsByLevel[level.id];
      if (lvlLessons) {
        items.push({ type: 'nodes', levelId: level.id, lessons: lvlLessons });
      }
    }
    return items;
  }, [levels, lessonsByLevel]);

  // Current lesson navigation
  const handleStartCurrent = useCallback(() => {
    if (currentLesson) {
      navigate(`/lesson/${currentLesson.lessonId}`);
    }
  }, [currentLesson, navigate]);

  return (
    <div className="min-h-[100dvh] bg-[#0d1117] pb-24">
      {/* ─── Top Stats Bar ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-16 z-40 bg-[#0d1117]/95 backdrop-blur-md border-b border-border-default"
      >
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          {/* Streak */}
          <div className="flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-[#f59e0b]" />
            <span className="text-text-primary font-bold text-sm">{streak}</span>
            <span className="text-text-muted text-[10px]">day streak</span>
          </div>
          {/* Gems */}
          <div className="flex items-center gap-1.5">
            <Gem className="w-5 h-5 text-diamond" />
            <span className="text-text-primary font-bold text-sm">{gems}</span>
          </div>
          {/* Hearts */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 ${i < hearts ? 'text-heart fill-heart' : 'text-[#30363d]'}`}
              />
            ))}
            <span className="text-text-primary font-bold text-sm ml-0.5">{hearts}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── Lesson Path ─── */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {sections.map((section, sectionIdx) => {
          const level = levels.find((l) => l.id === section.levelId);
          if (!level) return null;

          if (section.type === 'banner') {
            const lvlLessons = lessonsByLevel[level.id] || [];
            const completedCount = lvlLessons.filter(
              (l) => userProgress.get(l.lessonId)?.status === 'completed'
            ).length;
            return (
              <LevelBanner
                key={`banner-${level.id}`}
                level={level}
                completedCount={completedCount}
                totalCount={lvlLessons.length}
              />
            );
          }

          // Nodes section
          const pathData = levelPaths[level.id];
          if (!pathData || section.lessons.length === 0) return null;
          const { pathD, nodePositions } = pathData;
          const levelColor = getLevelColor(level.id);

          return (
            <div key={`nodes-${level.id}`} className="relative mb-8" style={{ height: nodePositions[nodePositions.length - 1]?.y + 80 || 200 }}>
              {/* SVG Path */}
              <svg
                className="absolute left-0 top-0 w-full pointer-events-none"
                style={{ height: '100%' }}
                viewBox={`0 0 ${PATH_WIDTH} ${nodePositions[nodePositions.length - 1]?.y + 80 || 200}`}
                preserveAspectRatio="xMidYMin meet"
              >
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke={levelColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.35}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: sectionIdx * 0.1 }}
                />
                {/* Glow underneath */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke={levelColor}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.1}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: sectionIdx * 0.1 }}
                />
              </svg>

              {/* Lesson Nodes */}
              {section.lessons.map((lesson, idx) => {
                const pos = nodePositions[idx];
                if (!pos) return null;
                const progress = userProgress.get(lesson.lessonId);
                const status = progress?.status || 'locked';
                return (
                  <LessonNode
                    key={lesson.lessonId}
                    lesson={lesson}
                    position={pos}
                    status={status}
                    stars={progress?.stars}
                    onClick={() => handleStartLesson(lesson.lessonId)}
                    delay={idx * 0.08}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {/* ─── Floating Bottom Bar ─── */}
      <FloatingBottomBar
        onStartCurrent={handleStartCurrent}
        currentLesson={currentLesson}
      />
    </div>
  );
}
