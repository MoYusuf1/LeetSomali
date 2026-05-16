import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import {
  Home,
  BookOpen,
  Trophy,
  HelpCircle,
  Users,
  Search,
  ChevronDown,
} from 'lucide-react';
import DiscussionFeed from '@/components/DiscussionFeed';
import CreatePost from '@/components/CreatePost';
import Leaderboard from '@/components/Leaderboard';
import TrendingTopics from '@/components/TrendingTopics';
import StudyGroups from '@/components/StudyGroups';
import { posts, categories, onlineUsers, commentThreads } from '@/data/socialData';
import type { Comment } from '@/data/socialData';

type Tab = 'feed' | 'lesson-comments' | 'leaderboard' | 'qa' | 'study-groups';
type SortOption = 'Hot' | 'New' | 'Top' | 'Unanswered';

const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'feed', label: 'Discussion Feed', icon: <Home className="w-4 h-4" /> },
  { id: 'lesson-comments', label: 'Lesson Comments', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> },
  { id: 'qa', label: 'Q&A', icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'study-groups', label: 'Study Groups', icon: <Users className="w-4 h-4" /> },
];

export default function Social() {
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  const [sortBy, setSortBy] = useState<SortOption>('Hot');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Sort
    switch (sortBy) {
      case 'New':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'Top':
        result.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'Unanswered':
        result = result.filter((p) => p.comments === 0);
        break;
      case 'Hot':
      default:
        // Simple hot algorithm: upvotes / age
        result.sort(
          (a, b) =>
            b.upvotes / Math.max(1, (Date.now() - b.createdAt.getTime()) / 3600000) -
            a.upvotes / Math.max(1, (Date.now() - a.createdAt.getTime()) / 3600000)
        );
    }

    return result;
  }, [sortBy, selectedCategories]);

  const renderMainContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <motion.div
            key="feed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CreatePost />
            <DiscussionFeed posts={filteredPosts} />
          </motion.div>
        );
      case 'lesson-comments':
        return (
          <motion.div
            key="lesson-comments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <LessonCommentsTab />
          </motion.div>
        );
      case 'leaderboard':
        return (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Leaderboard />
          </motion.div>
        );
      case 'qa':
        return (
          <motion.div
            key="qa"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QATab />
          </motion.div>
        );
      case 'study-groups':
        return (
          <motion.div
            key="study-groups"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StudyGroups />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-bg-primary pt-16">
      <div className="max-w-[1400px] mx-auto flex">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-[280px] shrink-0 border-r border-border-default min-h-[calc(100dvh-64px)] sticky top-16 overflow-y-auto">
          <div className="p-4">
            {/* Nav items */}
            <nav className="flex flex-col gap-1 mb-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                    activeTab === item.id
                      ? 'text-accent-primary bg-accent-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary/50'
                  }`}
                >
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-accent-primary rounded-full"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  {item.icon}
                  {item.label}
                </motion.button>
              ))}
            </nav>

            {/* Sort (for feed/qa) */}
            {(activeTab === 'feed' || activeTab === 'qa') && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mb-6"
              >
                <div className="relative">
                  <button
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-bg-tertiary text-text-primary text-sm border border-border-default hover:border-text-secondary transition-colors"
                  >
                    <span className="text-text-secondary text-xs uppercase tracking-wider font-medium mr-2">Sort:</span>
                    <span>{sortBy}</span>
                    <ChevronDown className="w-4 h-4 ml-2 text-text-secondary" />
                  </button>
                  {sortDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-bg-elevated rounded-lg border border-border-default shadow-card-hover z-10 overflow-hidden">
                      {(['Hot', 'New', 'Top', 'Unanswered'] as SortOption[]).map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setSortBy(opt); setSortDropdownOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors duration-150 ${
                            sortBy === opt ? 'text-accent-primary bg-accent-primary/10' : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Category filter (for feed/qa) */}
            {(activeTab === 'feed' || activeTab === 'qa') && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mb-6"
              >
                <h4 className="text-xs uppercase tracking-wider font-semibold text-text-secondary mb-3">Filter</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        selectedCategories.includes(cat)
                          ? 'bg-accent-primary text-white'
                          : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Active users */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <h4 className="text-xs uppercase tracking-wider font-semibold text-text-secondary mb-3">Online Now</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-2">
                  {onlineUsers.map((u) => (
                    <div
                      key={u.name}
                      className="w-7 h-7 rounded-full border-2 border-bg-secondary flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: u.color }}
                      title={u.name}
                    >
                      {u.initial}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-text-secondary text-xs">
                <span className="text-success font-semibold">47</span> learners online now
              </p>
            </motion.div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 py-6">
          {/* Mobile tab bar */}
          <div className="lg:hidden flex items-center gap-1 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'text-accent-primary bg-accent-primary/10'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {renderMainContent()}
          </AnimatePresence>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-[320px] shrink-0 border-l border-border-default min-h-[calc(100dvh-64px)] sticky top-16 overflow-y-auto">
          <div className="p-4 flex flex-col gap-4">
            {/* Leaderboard preview */}
            <div className="bg-bg-secondary rounded-xl p-4 border border-border-default">
              <Leaderboard compact />
            </div>

            {/* Trending topics */}
            <div className="bg-bg-secondary rounded-xl p-4 border border-border-default">
              <TrendingTopics />
            </div>

            {/* Active study groups */}
            <div className="bg-bg-secondary rounded-xl p-4 border border-border-default">
              <StudyGroups compact />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ───── Lesson Comments Tab ───── */
function LessonCommentsTab() {
  const lessonGroups: { lesson: string; level: string; levelColor: string; comments: Comment[] }[] = [
    {
      lesson: "Focus Markers: baa vs ayaa",
      level: "L4",
      levelColor: "#a855f7",
      comments: commentThreads["post-1"]?.slice(0, 2) ?? [],
    },
    {
      lesson: "SOV Word Order",
      level: "L3",
      levelColor: "#eab308",
      comments: posts.slice(0, 3).map((p) => ({
        id: `lc-${p.id}`,
        author: p.author,
        body: `Great lesson! The explanation of ${p.title.toLowerCase().includes('order') ? 'word order' : 'grammar rules'} really helped clarify things for me.`,
        likes: p.upvotes,
        liked: false,
        createdAt: p.createdAt,
        replies: [],
      })),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <select className="bg-bg-tertiary border border-border-default rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary appearance-none focus:border-accent-primary focus:outline-none cursor-pointer">
            <option>All Lessons</option>
            <option>Focus Markers</option>
            <option>SOV Word Order</option>
            <option>Noun Cases</option>
          </select>
        </div>
      </div>

      {lessonGroups.map((group) => (
        <motion.div
          key={group.lesson}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="bg-bg-secondary rounded-xl p-5 border border-border-default"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-text-primary">{group.lesson}</h3>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${group.levelColor}20`, color: group.levelColor }}
              >
                {group.level}
              </span>
            </div>
            <button className="text-accent-primary text-sm hover:underline">
              View Lesson →
            </button>
          </div>

          <div className="flex flex-col">
            {group.comments.map((comment: Comment) => (
              <div key={comment.id} className="flex items-start gap-3 py-3 border-b border-border-subtle last:border-b-0">
                <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-xs font-semibold text-accent-primary shrink-0">
                  {comment.author.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-accent-primary text-sm font-medium">@{comment.author.username}</span>
                    <span className="text-text-secondary text-xs">
                      {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-text-primary text-sm leading-relaxed">{comment.body}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-text-secondary text-xs flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                      {comment.likes}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-3 text-accent-primary text-sm font-medium hover:underline">
            Load more comments
          </button>
        </motion.div>
      ))}
    </div>
  );
}

/* ───── Q&A Tab ───── */
function QATab() {
  const qaPosts = posts.filter((p) =>
    p.category === 'Grammar' || p.category === 'Vocabulary' || p.category === 'Pronunciation'
  );

  return (
    <div className="flex flex-col gap-4">
      <button className="self-start flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-accent-primary text-white hover:bg-accent-hover transition-colors duration-200">
        <HelpCircle className="w-4 h-4" />
        Ask a Question
      </button>

      {qaPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-bg-secondary rounded-xl p-5 border border-border-default hover:border-accent-primary/30 transition-all duration-200 cursor-pointer"
        >
          <div className="flex items-start gap-4">
            {/* Vote count */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <ChevronDown className="w-5 h-5 text-text-muted rotate-180" />
              <span className="text-text-primary font-bold text-sm">{post.upvotes}</span>
              <ChevronDown className="w-5 h-5 text-text-muted" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-base font-semibold text-text-primary mb-1 hover:text-accent-primary transition-colors">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 mb-2">
                {post.comments > 0 ? (
                  <span className="text-xs bg-success/15 text-success px-2 py-0.5 rounded-full font-medium">
                    {post.comments} answer{post.comments !== 1 ? 's' : ''}
                  </span>
                ) : (
                  <span className="text-xs bg-bg-tertiary text-text-muted px-2 py-0.5 rounded-full font-medium">
                    Unanswered
                  </span>
                )}
                <span className="text-xs bg-bg-tertiary text-text-secondary px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="text-accent-primary font-medium">@{post.author.username}</span>
                <span>·</span>
                <span>Asked recently</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
