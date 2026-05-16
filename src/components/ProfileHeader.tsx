import { useEffect, useRef, useState } from 'react';
import { Edit, Share2 } from 'lucide-react';
import CountUp from 'react-countup';
import type { UserProfile } from '@/data/profileData';

interface ProfileHeaderProps {
  profile: UserProfile;
}

interface StatItemProps {
  icon: string;
  value: number;
  label: string;
  delay: number;
  inView: boolean;
  suffix?: string;
}

function StatItem({ icon, value, label, delay, inView, suffix = '' }: StatItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-[#8b949e] mb-1">{icon}</div>
      <div className="text-[#e6edf3] text-lg font-bold">
        {inView ? (
          <CountUp end={value} duration={1} separator="," delay={delay} suffix={suffix} />
        ) : (
          `0${suffix}`
        )}
      </div>
      <div className="text-xs text-[#8b949e]">{label}</div>
    </div>
  );
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
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

  const joinDate = new Date(profile.joinDate);
  const monthYear = joinDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div ref={ref} className="bg-[#161b22] rounded-2xl border border-[#30363d] overflow-hidden">
      {/* Banner */}
      <div className="h-32 relative bg-gradient-to-br from-[#161b22] to-[#21262d] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] text-[#e6edf3] text-4xl font-bold tracking-[0.5em] overflow-hidden whitespace-nowrap leading-none pt-8 select-none">
          𐒖𐒎𐒓𐒈𐒕𐒔𐒗𐒘𐒙𐒚𐒛𐒜𐒖𐒎𐒓𐒈𐒕𐒔𐒗𐒘𐒙𐒚𐒛𐒜𐒖𐒎𐒓𐒈𐒕𐒔
        </div>
      </div>

      {/* Profile Info Row */}
      <div className="px-6 pb-6 relative">
        <div className="flex flex-col sm:flex-row items-start gap-4 -mt-12">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full border-4 border-[#161b22] bg-gradient-to-br from-[#f59e0b] to-[#b45309] flex items-center justify-center text-2xl font-bold text-[#0d1117]">
              {profile.avatarInitials}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pt-2">
            <h2 className="text-[#e6edf3] text-2xl sm:text-3xl font-bold">{profile.name}</h2>
            <p className="text-[#8b949e] text-sm">@{profile.username}</p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(245,158,11,0.15)] text-[#f59e0b] border border-[#f59e0b]/20">
                Level {profile.level} &middot; {profile.levelTitle}
              </span>
              <span className="text-xs text-[#484f58]">Member since {monthYear}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:pt-2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border border-[#30363d] text-[#e6edf3] hover:bg-[#21262d] transition-colors duration-200">
              <Edit className="w-4 h-4" />
              <span className="hidden sm:inline">Edit Profile</span>
            </button>
            <button className="flex items-center justify-center w-9 h-9 rounded-xl border border-[#30363d] text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-colors duration-200">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="border-t border-[#21262d] py-4 px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatItem icon="🔥" value={profile.longestStreak} label="Longest Streak" delay={0} inView={inView} suffix=" days" />
          <StatItem icon="⭐" value={profile.xp} label="Total XP" delay={0.15} inView={inView} />
          <StatItem icon="📚" value={profile.lessonsCompleted} label="Lessons Completed" delay={0.3} inView={inView} />
          <StatItem icon="🏆" value={0} label={profile.league + ' League'} delay={0.45} inView={inView} suffix="" />
        </div>
      </div>
    </div>
  );
}
