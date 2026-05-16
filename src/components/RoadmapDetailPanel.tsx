import { X, BookOpen, CheckCircle, Lock, ArrowRight } from 'lucide-react';
import type { GraphNode } from '@/data/roadmapData';

interface RoadmapDetailPanelProps {
  node: GraphNode | null;
  onClose: () => void;
  prerequisiteLabels: string[];
  unlockLabels: string[];
}

const LEVEL_COLORS: Record<number, string> = {
  1: '#22c55e',
  2: '#3b82f6',
  3: '#eab308',
  4: '#a855f7',
  5: '#ef4444',
  6: '#22d3ee',
  7: '#ec4899',
  8: '#f59e0b',
};

export default function RoadmapDetailPanel({ node, onClose, prerequisiteLabels, unlockLabels }: RoadmapDetailPanelProps) {
  if (!node) return null;

  const color = LEVEL_COLORS[node.level] || '#8b949e';
  const progressPercent = node.lessonsTotal ? ((node.lessonsCompleted || 0) / node.lessonsTotal) * 100 : 0;

  return (
    <div className="w-full lg:w-[360px] bg-[#1c2128] border-l border-[#30363d] flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#30363d]">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ color, backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
          >
            {node.type}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Title */}
        <div>
          <h3 className="text-[#e6edf3] text-xl font-bold">{node.label}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm" style={{ color }}>
              L{node.level}
            </span>
            <span className="text-[#484f58]">&middot;</span>
            <span className="text-sm text-[#8b949e]">
              {node.status === 'completed' ? 'Completed' : node.status === 'current' ? 'In Progress' : node.status === 'unlocked' ? 'Unlocked' : 'Locked'}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[#8b949e] leading-relaxed">{node.description}</p>

        {/* Progress */}
        {node.lessonsTotal && node.lessonsTotal > 0 && (
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-[#8b949e]">Progress</span>
              <span className="text-[#e6edf3] font-medium">
                {node.lessonsCompleted || 0}/{node.lessonsTotal} lessons
              </span>
            </div>
            <div className="w-full h-2 bg-[#21262d] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%`, backgroundColor: color }}
              />
            </div>
          </div>
        )}

        {/* Prerequisites */}
        {prerequisiteLabels.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-2 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-[#8b949e] rotate-180" />
              Prerequisites
            </h4>
            <div className="space-y-1.5">
              {prerequisiteLabels.map((label, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#f59e0b] hover:underline cursor-pointer">
                  <CheckCircle className="w-3.5 h-3.5 text-[#22c55e]" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unlocks */}
        {unlockLabels.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[#e6edf3] mb-2 flex items-center gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-[#8b949e]" />
              Unlocks
            </h4>
            <div className="space-y-1.5">
              {unlockLabels.map((label, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#8b949e]">
                  <Lock className="w-3.5 h-3.5 text-[#484f58]" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            style={{
              backgroundColor: node.status === 'locked' ? '#21262d' : color,
              color: node.status === 'locked' ? '#484f58' : '#0d1117',
              cursor: node.status === 'locked' ? 'not-allowed' : 'pointer',
            }}
            disabled={node.status === 'locked'}
          >
            <BookOpen className="w-4 h-4" />
            {node.status === 'completed' ? 'Review Lesson' : node.status === 'current' ? 'Continue Lesson' : node.status === 'locked' ? 'Locked' : 'Start Lesson'}
          </button>

          {node.status !== 'locked' && (
            <button className="w-full py-2 rounded-xl text-sm text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d] hover:bg-[#21262d] transition-colors">
              Mark as Difficult
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
