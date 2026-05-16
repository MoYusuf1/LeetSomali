import { useState } from 'react';
import { motion } from 'framer-motion';
import CommentCard from './CommentCard';
import type { Comment } from '@/data/socialData';

interface CommentThreadProps {
  comments: Comment[];
}

export default function CommentThread({ comments }: CommentThreadProps) {
  const [commentText, setCommentText] = useState('');

  const handleReply = (username: string) => {
    setCommentText(`@${username} `);
  };

  return (
    <div className="mt-6">
      {/* Comment input */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-xs font-bold text-accent-primary shrink-0">
          Y
        </div>
        <div className="flex-1 flex gap-2">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            rows={2}
            className="flex-1 bg-bg-tertiary rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted border border-border-default focus:border-accent-primary focus:outline-none transition-colors duration-200 text-sm resize-none"
          />
          <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-accent-primary text-white hover:bg-accent-hover transition-colors duration-200 self-end shrink-0 h-fit">
            Comment
          </button>
        </div>
      </div>

      {/* Sort options */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-text-secondary uppercase tracking-wider font-medium">Sort by:</span>
        <button className="text-xs text-accent-primary font-medium">Top</button>
        <button className="text-xs text-text-secondary hover:text-text-primary transition-colors">Newest</button>
      </div>

      {/* Comments */}
      <div className="flex flex-col">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="border-b border-border-subtle last:border-b-0"
          >
            <CommentCard comment={comment} onReply={handleReply} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
