import { useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, BookOpen, Star } from 'lucide-react';
import type { Lesson } from '@/data/lessons';
import { levels } from '@/data/lessons';

interface LessonTreeProps {
  lessons: Lesson[];
  completedLessonIds: string[];
  currentLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
}

interface NodePosition {
  lesson: Lesson;
  x: number;
  y: number;
  status: 'completed' | 'current' | 'unlocked' | 'locked';
  stars?: number;
}

export default function LessonTree({ lessons, completedLessonIds, currentLessonId, onSelectLesson }: LessonTreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredLesson, setHoveredLesson] = useState<string | null>(null);

  const nodes = useMemo(() => {
    const result: NodePosition[] = [];
    const xPositions = [50, 65, 35, 60, 40, 55, 45, 50];

    lessons.forEach((lesson) => {
      const isCompleted = completedLessonIds.includes(lesson.id);
      const isCurrent = lesson.id === currentLessonId;
      const isUnlocked = isCompleted || isCurrent || lesson.order === 1;
      const status = isCompleted ? 'completed' : isCurrent ? 'current' : isUnlocked ? 'unlocked' : 'locked';

      result.push({
        lesson,
        x: xPositions[(lesson.order - 1) % xPositions.length],
        y: lesson.order * 80,
        status,
        stars: isCompleted ? (Math.floor(Math.random() * 2) + 2) as 2 | 3 : undefined,
      });
    });

    return result;
  }, [lessons, completedLessonIds, currentLessonId]);

  const levelNodes = useMemo(() => {
    const map: Record<number, NodePosition[]> = {};
    nodes.forEach((n) => {
      if (!map[n.lesson.level]) map[n.lesson.level] = [];
      map[n.lesson.level].push(n);
    });
    return map;
  }, [nodes]);

  const pathD = useMemo(() => {
    if (nodes.length < 2) return '';
    let d = `M ${nodes[0].x} ${nodes[0].y}`;
    for (let i = 1; i < nodes.length; i++) {
      const prev = nodes[i - 1];
      const curr = nodes[i];
      const midY = (prev.y + curr.y) / 2;
      d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
    return d;
  }, [nodes]);

  const getNodeSize = (status: string) => {
    if (status === 'current') return 80;
    if (status === 'completed') return 48;
    return 48;
  };

  const getNodeColor = (node: NodePosition) => {
    const { lesson, status } = node;
    const levelColor = levels[lesson.level - 1]?.color || lesson.color;

    switch (status) {
      case 'completed':
        return { bg: 'bg-bg-secondary', border: `border-[${levelColor}]`, borderColor: levelColor, icon: <Check className="w-5 h-5" style={{ color: levelColor }} /> };
      case 'current':
        return { bg: 'bg-bg-secondary', border: 'border-accent-primary', borderColor: '#f59e0b', icon: <BookOpen className="w-6 h-6 text-accent-primary" /> };
      case 'unlocked':
        return { bg: 'bg-bg-secondary', border: 'border-accent-primary', borderColor: '#f59e0b', icon: <BookOpen className="w-5 h-5 text-accent-primary" /> };
      default:
        return { bg: 'bg-bg-tertiary', border: 'border-border-default', borderColor: '#484f58', icon: <Lock className="w-5 h-5 text-text-muted" /> };
    }
  };

  const totalHeight = lessons.length * 80 + 200;

  return (
    <div ref={containerRef} className="w-full mt-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-text-primary font-bold text-2xl">Your Learning Path</h2>
        <p className="text-text-secondary text-sm mt-1">Complete lessons to unlock the next. Master every concept.</p>
      </div>

      <div className="relative w-full max-w-2xl mx-auto" style={{ height: totalHeight }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 0 }}>
          <path
            d={pathD}
            fill="none"
            stroke="#30363d"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="8 4"
          />
        </svg>

        {/* Level separators */}
        {levels.map((level) => {
          const levelNs = levelNodes[level.num];
          if (!levelNs || levelNs.length === 0) return null;
          const first = levelNs[0];
          return (
            <div
              key={level.num}
              className="absolute left-1/2 -translate-x-1/2 z-0 px-4 py-1 rounded-full text-xs font-semibold"
              style={{
                top: first.y - 40,
                backgroundColor: level.color + '15',
                color: level.color,
                border: `1px solid ${level.color}30`,
              }}
            >
              Level {level.num} — {level.name}
            </div>
          );
        })}

        {/* Lesson nodes */}
        {nodes.map((node) => {
          const size = getNodeSize(node.status);
          const colors = getNodeColor(node);
          const isHovered = hoveredLesson === node.lesson.id;

          return (
            <motion.div
              key={node.lesson.id}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: node.lesson.order * 0.05,
              }}
              className="absolute cursor-pointer z-10"
              style={{
                left: `${node.x}%`,
                top: node.y,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setHoveredLesson(node.lesson.id)}
              onMouseLeave={() => setHoveredLesson(null)}
              onClick={() => node.status !== 'locked' && onSelectLesson(node.lesson)}
            >
              {/* Pulse ring for current */}
              {node.status === 'current' && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-accent-primary"
                  style={{ margin: -4, width: size + 8, height: size + 8 }}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Node circle */}
              <div
                className={`rounded-full flex items-center justify-center transition-all duration-200 ${colors.bg}`}
                style={{
                  width: size,
                  height: size,
                  border: `2px solid ${colors.borderColor}`,
                  boxShadow: node.status === 'current'
                    ? '0 0 16px rgba(245,158,11,0.4)'
                    : node.status === 'completed'
                      ? `0 0 8px ${colors.borderColor}40`
                      : 'none',
                }}
              >
                {colors.icon}
              </div>

              {/* Stars below completed nodes */}
              {node.status === 'completed' && node.stars && (
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  {[1, 2, 3].map((s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${s <= node.stars! ? 'text-accent-primary fill-accent-primary' : 'text-text-muted'}`}
                    />
                  ))}
                </div>
              )}

              {/* Tooltip */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-bg-elevated rounded-xl p-3 shadow-lg border border-border-default z-50"
                >
                  <h4 className="text-text-primary text-sm font-medium">{node.lesson.title}</h4>
                  <p className="text-text-muted text-xs mt-0.5">Level {node.lesson.level} — {node.lesson.levelName}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {node.status === 'completed' ? (
                      <span className="text-success text-xs">Completed</span>
                    ) : node.status === 'current' ? (
                      <span className="text-accent-primary text-xs">Continue</span>
                    ) : node.status === 'unlocked' ? (
                      <span className="text-info text-xs">Start</span>
                    ) : (
                      <span className="text-text-muted text-xs">Locked</span>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
