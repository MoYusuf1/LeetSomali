import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { ActivityItem } from '@/data/profileData';

interface ActivityFeedProps {
  items: ActivityItem[];
}

const ICON_SVG: Record<string, (color: string) => React.ReactNode> = {
  Star: (c) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Flame: (c) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  ),
  MessageCircle: (c) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  ),
  Trophy: (c) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  BookOpen: (c) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  Zap: (c) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Heart: (c) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill={c} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Gem: (c) => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" />
    </svg>
  ),
};

export default function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="bg-[#161b22] rounded-2xl border border-[#30363d] p-6">
      <h3 className="text-[#e6edf3] text-xl font-semibold mb-4">Recent Activity</h3>
      <div className="flex flex-col">
        {items.map((item, index) => (
          <ActivityFeedItem key={item.id} item={item} index={index} isLast={index === items.length - 1} />
        ))}
      </div>
    </div>
  );
}

function ActivityFeedItem({ item, index, isLast }: { item: ActivityItem; index: number; isLast: boolean }) {
  const [hovered, setHovered] = useState(false);
  const iconRenderer = ICON_SVG[item.icon];
  const timeAgo = formatDistanceToNow(new Date(item.timestamp), { addSuffix: true });

  return (
    <div
      className={
        'flex items-center gap-4 py-3 transition-colors duration-200 cursor-default ' +
        (!isLast ? 'border-b border-[#21262d]' : '') +
        (hovered ? ' bg-[rgba(245,158,11,0.03)]' : '')
      }
      style={{ animationDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon circle */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${item.color}15` }}
      >
        {iconRenderer ? iconRenderer(item.color) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
          </svg>
        )}
      </div>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <p className="text-[#e6edf3] text-sm leading-relaxed">{item.description}</p>
      </div>

      {/* Timestamp */}
      <div className="text-xs text-[#8b949e] shrink-0 whitespace-nowrap">
        {timeAgo}
      </div>
    </div>
  );
}
