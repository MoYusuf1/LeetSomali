import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '@/data/socialData';

export default function CreatePost() {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (!title.trim() && !body.trim()) return;
    // Reset
    setTitle('');
    setBody('');
    setSelectedTags([]);
    setExpanded(false);
  };

  return (
    <div className="bg-bg-secondary rounded-xl p-4 mb-4 border border-border-default">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center text-sm font-bold text-accent-primary shrink-0">
          Y
        </div>

        <div className="flex-1 min-w-0">
          <AnimatePresence>
            {!expanded ? (
              <motion.div
                key="collapsed"
                initial={false}
                animate={{ height: 'auto' }}
              >
                <input
                  type="text"
                  placeholder="What are you learning today?"
                  onFocus={() => setExpanded(true)}
                  className="w-full h-12 bg-bg-tertiary rounded-lg px-4 text-text-primary placeholder-text-muted border border-border-default focus:border-accent-primary focus:outline-none transition-colors duration-200 text-sm"
                />
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, height: 48 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 48 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  className="w-full h-10 bg-bg-tertiary rounded-lg px-4 text-text-primary placeholder-text-muted border border-border-default focus:border-accent-primary focus:outline-none transition-colors duration-200 text-sm mb-3"
                />
                <textarea
                  placeholder="What's on your mind?"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={4}
                  className="w-full bg-bg-tertiary rounded-lg px-4 py-3 text-text-primary placeholder-text-muted border border-border-default focus:border-accent-primary focus:outline-none transition-colors duration-200 text-sm resize-none mb-3"
                />

                {/* Tag selector */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => toggleTag(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        selectedTags.includes(cat)
                          ? 'bg-accent-primary text-white'
                          : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setExpanded(false)}
                    className="px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!title.trim() && !body.trim()}
                    className="px-5 py-2 rounded-xl text-sm font-semibold bg-accent-primary text-white hover:bg-accent-hover transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
