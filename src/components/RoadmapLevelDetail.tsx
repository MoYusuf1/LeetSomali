import { Check, Lock, RotateCw, Star } from 'lucide-react';
import type { LessonDetail } from '@/data/roadmapData';

interface RoadmapLevelDetailProps {
  levelName: string;
  levelColor: string;
  levelId: number;
  lessons: LessonDetail[];
}

export default function RoadmapLevelDetail({ levelName, levelColor, levelId, lessons }: RoadmapLevelDetailProps) {
  const completedCount = lessons.filter(l => l.status === 'completed').length;

  return (
    <div className="bg-[#161b22] rounded-2xl border border-[#30363d] overflow-hidden">
      {/* Level Header */}
      <div className="px-6 py-4 border-b border-[#30363d]" style={{ backgroundColor: `${levelColor}08` }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: `${levelColor}20`, color: levelColor }}
          >
            L{levelId}
          </div>
          <div className="flex-1">
            <h3 className="text-[#e6edf3] text-lg font-semibold">{levelName}</h3>
            <div className="text-sm text-[#8b949e]">
              {completedCount}/{lessons.length} lessons completed
            </div>
          </div>
        </div>
      </div>

      {/* Lesson List */}
      <div className="divide-y divide-[#21262d]">
        {lessons.map((lesson, index) => (
          <LessonListItem key={lesson.id} lesson={lesson} levelColor={levelColor} index={index} />
        ))}
      </div>
    </div>
  );
}

function LessonListItem({ lesson, levelColor, index }: { lesson: LessonDetail; levelColor: string; index: number }) {
  return (
    <div
      className="flex items-center gap-4 px-6 py-4 hover:bg-[#1c2128] transition-colors cursor-pointer group"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Status Icon */}
      <div className="shrink-0 w-8 flex justify-center">
        {lesson.status === 'completed' && (
          <div className="w-6 h-6 rounded-full bg-[#22c55e]/15 flex items-center justify-center">
            <Check className="w-4 h-4 text-[#22c55e]" />
          </div>
        )}
        {lesson.status === 'current' && (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center animate-spin"
            style={{ backgroundColor: `${levelColor}20` }}
          >
            <RotateCw className="w-4 h-4" style={{ color: levelColor }} />
          </div>
        )}
        {lesson.status === 'locked' && (
          <div className="w-6 h-6 rounded-full bg-[#21262d] flex items-center justify-center">
            <Lock className="w-3 h-3 text-[#484f58]" />
          </div>
        )}
      </div>

      {/* Number & Title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#484f58] font-mono">{index + 1}</span>
          <span className={`text-sm font-medium ${lesson.status === 'locked' ? 'text-[#484f58]' : 'text-[#e6edf3] group-hover:text-[#f59e0b] transition-colors'}`}>
            {lesson.title}
          </span>
        </div>
        <p className="text-xs text-[#8b949e] mt-0.5 truncate">{lesson.description}</p>
      </div>

      {/* Stars (completed only) */}
      {lesson.status === 'completed' && lesson.stars && (
        <div className="flex items-center gap-0.5 shrink-0">
          {[1, 2, 3].map(s => (
            <Star
              key={s}
              className={`w-3.5 h-3.5 ${s <= lesson.stars! ? 'text-[#f59e0b] fill-[#f59e0b]' : 'text-[#30363d]'}`}
            />
          ))}
        </div>
      )}

      {/* Duration */}
      <div className="text-xs text-[#8b949e] shrink-0 w-12 text-right">
        {lesson.duration}
      </div>
    </div>
  );
}
