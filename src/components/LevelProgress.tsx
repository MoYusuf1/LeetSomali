interface LevelProgressProps {
  currentLevel: number;
  xp: number;
  xpToNext: number;
  levelTitle: string;
}

const LEVELS = [
  { id: 1, name: 'L1 Foundations', short: 'L1', color: '#22c55e' },
  { id: 2, name: 'L2 Noun System', short: 'L2', color: '#3b82f6' },
  { id: 3, name: 'L3 Sentence Core', short: 'L3', color: '#eab308' },
  { id: 4, name: 'L4 Focus', short: 'L4', color: '#a855f7' },
  { id: 5, name: 'L5 Verb & Tense', short: 'L5', color: '#ef4444' },
  { id: 6, name: 'L6 Modifiers', short: 'L6', color: '#22d3ee' },
  { id: 7, name: 'L7 Complex', short: 'L7', color: '#ec4899' },
  { id: 8, name: 'L8 Mastery', short: 'L8', color: '#f59e0b' },
];

export default function LevelProgress({ currentLevel, xp, xpToNext, levelTitle }: LevelProgressProps) {
  const progressPercent = Math.min((xp / xpToNext) * 100, 100);
  const xpRemaining = xpToNext - xp;

  return (
    <div className="bg-[#161b22] rounded-2xl border border-[#30363d] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#e6edf3] text-xl font-semibold">
          Level {currentLevel} — {levelTitle}
        </h3>
        <span className="text-sm text-[#8b949e]">
          {xp.toLocaleString()} / {xpToNext.toLocaleString()} XP
        </span>
      </div>

      {/* XP Progress Bar */}
      <div className="w-full h-3 bg-[#21262d] rounded-full overflow-hidden mb-2">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: '#f59e0b',
          }}
        />
      </div>
      <div className="text-right text-sm text-[#8b949e] mb-8">
        {xpRemaining.toLocaleString()} XP until Level {currentLevel + 1}
      </div>

      {/* Level Tiers Row */}
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-[#21262d]" />
        <div
          className="absolute top-5 left-0 h-0.5 transition-all duration-1000 ease-out"
          style={{
            width: `${Math.min((currentLevel / 8) * 100, 100)}%`,
            backgroundColor: '#f59e0b',
          }}
        />

        {LEVELS.map((level) => {
          const isCompleted = level.id < currentLevel;
          const isCurrent = level.id === currentLevel;
          const isLocked = level.id > currentLevel;

          return (
            <div key={level.id} className="flex flex-col items-center relative z-10">
              <div
                className={
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all duration-300 ' +
                  (isCompleted
                    ? 'border-[#22c55e] bg-[#22c55e] text-[#0d1117]'
                    : isCurrent
                      ? 'border-[#f59e0b] bg-[#f59e0b] text-[#0d1117] ring-4 ring-[#f59e0b]/20 animate-pulse'
                      : 'border-[#30363d] bg-[#161b22] text-[#484f58]')
                }
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : isLocked ? (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ) : (
                  <span>{level.short}</span>
                )}
              </div>
              <span
                className={
                  'text-[10px] mt-2 text-center max-w-[60px] leading-tight ' +
                  (isCompleted || isCurrent ? 'text-[#8b949e]' : 'text-[#484f58]')
                }
              >
                {level.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
