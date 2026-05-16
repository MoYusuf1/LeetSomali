import { Lock, Check } from 'lucide-react';
import type { RoadmapLevel } from '@/data/roadmapData';

interface RoadmapLevelStripProps {
  levels: RoadmapLevel[];
  selectedLevel: number | null;
  onSelectLevel: (levelId: number) => void;
}

export default function RoadmapLevelStrip({ levels, selectedLevel, onSelectLevel }: RoadmapLevelStripProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-4 px-8 py-4 min-w-max">
        {levels.map((level) => {
          const isCompleted = level.status === 'completed';
          const isInProgress = level.status === 'in-progress';
          const isLocked = level.status === 'locked';
          const isSelected = selectedLevel === level.id;
          const progressPercent = level.lessonCount > 0 ? (level.completedLessons / level.lessonCount) * 100 : 0;

          return (
            <button
              key={level.id}
              onClick={() => onSelectLevel(level.id)}
              className={
                'relative w-48 h-32 rounded-xl p-4 flex flex-col text-left transition-all duration-300 shrink-0 ' +
                (isSelected
                  ? 'ring-2 ring-offset-2 ring-offset-[#0d1117] '
                  : 'hover:-translate-y-1 ') +
                (isLocked
                  ? 'bg-[#161b22] border-2 border-dashed border-[#30363d] opacity-60'
                  : isInProgress
                    ? 'bg-[#161b22] border-2 animate-pulse'
                    : 'bg-[#161b22] border-2')
              }
              style={{
                borderColor: isLocked ? '#30363d' : isSelected ? level.colorHex : `${level.colorHex}60`,
                boxShadow: isInProgress && !isSelected ? `0 0 12px ${level.colorHex}20` : 'none',
              }}
            >
              {/* Level badge */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2"
                style={{
                  backgroundColor: isLocked ? '#21262d' : `${level.colorHex}20`,
                  color: isLocked ? '#484f58' : level.colorHex,
                }}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" style={{ color: level.colorHex }} />
                ) : isLocked ? (
                  <Lock className="w-3 h-3" />
                ) : (
                  <span>L{level.id}</span>
                )}
              </div>

              {/* Level name */}
              <div
                className={`text-sm font-semibold leading-tight mb-auto ${isLocked ? 'text-[#484f58]' : 'text-[#e6edf3]'}`}
              >
                {level.name}
              </div>

              {/* Progress */}
              <div className="mt-2">
                <div className="text-xs text-[#8b949e] mb-1">
                  {level.completedLessons}/{level.lessonCount} lessons
                </div>
                <div className="w-full h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: isLocked ? '#484f58' : level.colorHex,
                    }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
