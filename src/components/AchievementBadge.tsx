import { useState } from 'react';
import { Lock } from 'lucide-react';
import type { Achievement } from '@/data/profileData';

interface AchievementBadgeProps {
  achievement: Achievement;
  index?: number;
}

const TIER_COLORS: Record<string, { border: string; glow: string; bg: string }> = {
  bronze: { border: '#cd7f32', glow: 'rgba(205,127,50,0.3)', bg: 'rgba(205,127,50,0.1)' },
  silver: { border: '#c0c0c0', glow: 'rgba(192,192,192,0.3)', bg: 'rgba(192,192,192,0.1)' },
  gold: { border: '#f59e0b', glow: 'rgba(245,158,11,0.3)', bg: 'rgba(245,158,11,0.1)' },
  diamond: { border: '#22d3ee', glow: 'rgba(34,211,238,0.3)', bg: 'rgba(34,211,238,0.1)' },
};

export default function AchievementBadge({ achievement, index = 0 }: AchievementBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const tierColors = TIER_COLORS[achievement.tier];

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative flex flex-col items-center gap-2"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className={
          'w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-[3px] transition-all duration-200 cursor-pointer ' +
          (achievement.unlocked
            ? 'hover:scale-110'
            : 'opacity-50 grayscale')
        }
        style={{
          borderColor: achievement.unlocked ? tierColors.border : '#30363d',
          backgroundColor: achievement.unlocked ? tierColors.bg : '#21262d',
          boxShadow: achievement.unlocked ? `0 0 12px ${tierColors.glow}` : 'none',
          animationDelay: `${index * 0.06}s`,
        }}
      >
        {achievement.unlocked ? (
          <TierIcon icon={achievement.icon} tier={achievement.tier} />
        ) : (
          <Lock className="w-6 h-6 text-[#484f58]" />
        )}
      </div>
      <span className="text-xs text-[#8b949e] text-center leading-tight max-w-[80px]">
        {achievement.name}
      </span>

      {showTooltip && (
        <div
          className="fixed z-50 pointer-events-none bg-[#1c2128] rounded-lg px-4 py-3 shadow-xl border border-[#30363d] max-w-[240px]"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 10,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                color: tierColors.border,
                backgroundColor: tierColors.bg,
                border: `1px solid ${tierColors.border}`,
              }}
            >
              {achievement.tier}
            </span>
          </div>
          <div className="text-sm font-semibold text-[#e6edf3]">{achievement.name}</div>
          <div className="text-xs text-[#8b949e] mt-1">{achievement.description}</div>
          {achievement.unlocked && achievement.unlockedDate && (
            <div className="text-xs text-[#f59e0b] mt-1">
              Earned {new Date(achievement.unlockedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          )}
          {!achievement.unlocked && (
            <div className="text-xs text-[#484f58] mt-1">Locked: {achievement.condition}</div>
          )}
        </div>
      )}
    </div>
  );
}

function TierIcon({ icon, tier }: { icon: string; tier: string }) {
  const size = 'w-7 h-7';
  const color = tier === 'bronze' ? '#cd7f32' : tier === 'silver' ? '#c0c0c0' : tier === 'gold' ? '#f59e0b' : '#22d3ee';

  switch (icon) {
    case 'Flame':
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case 'Lightbulb':
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" /><path d="M10 22h4" />
        </svg>
      );
    case 'Star':
      return (
        <svg className={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case 'Zap':
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'MessageCircle':
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      );
    case 'BookOpen':
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case 'Trophy':
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      );
    case 'Calendar':
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
      );
    case 'Gem':
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12l4 6-10 13L2 9z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" />
        </svg>
      );
    case 'Moon':
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      );
    case 'Sun':
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
        </svg>
      );
    case 'HandHeart':
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
          <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
          <path d="m2 15 6 6" />
          <path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z" />
        </svg>
      );
    default:
      return (
        <svg className={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}
