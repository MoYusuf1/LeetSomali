import { useState, useMemo } from 'react';
import type { ActivityDay } from '@/data/profileData';

interface ActivityHeatmapProps {
  data: ActivityDay[];
}

const COLOR_SCALE = [
  '#21262d',
  '#0e4429',
  '#006d32',
  '#26a641',
  '#39d353',
];

function getColorLevel(count: number): number {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  const [hoveredCell, setHoveredCell] = useState<ActivityDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const { weeks, totalLessons, longestStreak } = useMemo(() => {
    const weeksArr: ActivityDay[][] = [];
    let currentWeek: ActivityDay[] = [];

    const firstDay = new Date(data[0].date + 'T00:00:00').getDay();
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({ date: '', count: -1, xp: 0 });
    }

    for (const day of data) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: -1, xp: 0 });
      }
      weeksArr.push(currentWeek);
    }

    const total = data.reduce((sum, d) => sum + d.count, 0);

    let maxStreak = 0;
    let currentStreak = 0;
    for (const d of data) {
      if (d.count > 0) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    return { weeks: weeksArr, totalLessons: total, longestStreak: maxStreak };
  }, [data]);

  const handleMouseEnter = (day: ActivityDay, e: React.MouseEvent) => {
    if (day.count < 0) return;
    setHoveredCell(day);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY - 10 });
  };

  return (
    <div className="bg-[#161b22] rounded-2xl border border-[#30363d] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#e6edf3] text-xl font-semibold">Learning Activity</h3>
        <select className="bg-[#21262d] border border-[#30363d] rounded-lg px-3 py-1.5 text-sm text-[#8b949e] focus:outline-none focus:border-[#f59e0b]">
          <option>This Year</option>
          <option>2024</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-[2px] min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[2px]">
              {week.map((day, di) => {
                if (day.count < 0) {
                  return <div key={di} className="w-3 h-3" />;
                }
                const level = getColorLevel(day.count);
                return (
                  <div
                    key={di}
                    className="w-3 h-3 rounded-sm cursor-pointer transition-transform duration-150 hover:scale-125 hover:ring-1 hover:ring-white/30"
                    style={{ backgroundColor: COLOR_SCALE[level] }}
                    onMouseEnter={(e) => handleMouseEnter(day, e)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setHoveredCell(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4">
        <span className="text-xs text-[#484f58]">Less active</span>
        {COLOR_SCALE.map((color, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: color }}
          />
        ))}
        <span className="text-xs text-[#484f58]">More active</span>
      </div>

      {/* Stats */}
      <div className="flex gap-6 mt-4 pt-4 border-t border-[#21262d]">
        <span className="text-sm text-[#8b949e]">
          <strong className="text-[#e6edf3]">{totalLessons}</strong> lessons this year
        </span>
        <span className="text-sm text-[#8b949e]">
          Longest streak: <strong className="text-[#e6edf3]">{longestStreak} days</strong>
        </span>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div
          className="fixed z-50 pointer-events-none bg-[#1c2128] rounded-lg px-3 py-2 shadow-lg border border-[#30363d] transition-opacity duration-150"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: 'translate(-50%, -110%)',
          }}
        >
          <div className="text-xs text-[#8b949e] whitespace-nowrap">{formatDate(hoveredCell.date)}</div>
          <div className="text-sm text-[#e6edf3] font-medium whitespace-nowrap">
            {hoveredCell.count} {hoveredCell.count === 1 ? 'lesson' : 'lessons'} completed
          </div>
          {hoveredCell.xp > 0 && (
            <div className="text-xs text-[#f59e0b] whitespace-nowrap">+{hoveredCell.xp} XP</div>
          )}
        </div>
      )}
    </div>
  );
}
