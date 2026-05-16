import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { studyGroupsData } from '@/data/socialData';

interface StudyGroupsProps {
  compact?: boolean;
}

export default function StudyGroups({ compact = false }: StudyGroupsProps) {
  const [groups, setGroups] = useState(studyGroupsData);

  const toggleJoin = (id: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, joined: !g.joined, members: g.joined ? g.members - 1 : g.members + 1 } : g))
    );
  };

  if (compact) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-5 h-5 text-accent-primary" />
          <h4 className="text-base font-semibold text-text-primary">Study Groups</h4>
        </div>
        <div className="flex flex-col gap-3">
          {groups.slice(0, 3).map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-text-primary text-sm font-medium">{group.name}</p>
              <p className="text-text-secondary text-xs">{group.members} members</p>
              <p className="text-text-muted text-xs">{group.focus}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {groups.map((group, index) => (
        <motion.div
          key={group.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.12 }}
          className="bg-bg-secondary rounded-xl border border-border-default overflow-hidden hover:border-accent-primary/30 transition-all duration-200"
        >
          {/* Banner */}
          <div
            className="h-24 w-full"
            style={{ background: `linear-gradient(135deg, ${group.color}30 0%, ${group.color}10 100%)` }}
          />

          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3 -mt-10">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{ backgroundColor: group.color }}
                >
                  {group.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{group.name}</h3>
                  <div className="flex items-center gap-1 text-text-secondary text-xs">
                    <Users className="w-3 h-3" />
                    <span>{group.members} members</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-text-secondary text-sm mb-3">{group.description}</p>
            <p className="text-text-muted text-xs mb-4">{group.focus}</p>

            <button
              onClick={() => toggleJoin(group.id)}
              className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                group.joined
                  ? 'bg-bg-tertiary text-text-secondary border border-border-default hover:border-error hover:text-error'
                  : 'bg-accent-primary text-white hover:bg-accent-hover'
              }`}
            >
              {group.joined ? 'Leave Group' : 'Join Group'}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
