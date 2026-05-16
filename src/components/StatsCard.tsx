import { useEffect, useState, useRef } from 'react';
import CountUp from 'react-countup';
import {
  Star, BookOpen, Target, Clock, Flame, Gem,
} from 'lucide-react';
import type { StatCardData } from '@/data/profileData';

interface StatsCardProps {
  stat: StatCardData;
  index?: number;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Star,
  BookOpen,
  Target,
  Clock,
  Flame,
  Gem,
};

export default function StatsCard({ stat, index = 0 }: StatsCardProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const IconComp = ICON_MAP[stat.icon];

  const isDecimal = typeof stat.value === 'number' && stat.value % 1 !== 0;
  const displayValue = isDecimal
    ? Math.floor(stat.value)
    : stat.value;
  const decimalPart = isDecimal
    ? Math.round((stat.value % 1) * 60)
    : 0;

  return (
    <div
      ref={ref}
      className="bg-[#21262d] rounded-xl p-4 border border-[#30363d] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${stat.iconColor}15` }}
        >
          {IconComp && (
            <span style={{ color: stat.iconColor }}>
              <IconComp className="w-5 h-5" />
            </span>
          )}
        </div>
      </div>

      <div className="text-[#e6edf3] text-2xl font-bold tracking-tight">
        {inView ? (
          <CountUp
            end={displayValue}
            duration={1}
            separator=","
            suffix={isDecimal ? `:${decimalPart.toString().padStart(2, '0')}` : (stat.suffix || '')}
          />
        ) : (
          <span>0{isDecimal ? ':00' : (stat.suffix || '')}</span>
        )}
      </div>

      <div className="text-xs text-[#8b949e] mt-1">{stat.label}</div>

      {stat.trend && (
        <div className={`text-xs mt-2 flex items-center gap-1 ${stat.trendDirection === 'up' ? 'text-[#22c55e]' : stat.trendDirection === 'down' ? 'text-[#ef4444]' : 'text-[#8b949e]'}`}>
          {stat.trendDirection === 'up' && <span>&#8593;</span>}
          {stat.trendDirection === 'down' && <span>&#8595;</span>}
          {stat.trend}
        </div>
      )}

      {stat.detail && (
        <div className="text-xs text-[#8b949e] mt-2">{stat.detail}</div>
      )}

      {stat.label === 'Accuracy Rate' && inView && (
        <div className="mt-3 relative w-12 h-12">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#21262d" strokeWidth="4" />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - stat.value / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-[#e6edf3]">
            {stat.value}%
          </span>
        </div>
      )}
    </div>
  );
}
