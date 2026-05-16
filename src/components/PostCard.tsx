import { useState } from 'react';
import { MessageSquare, Share2, Bookmark, ChevronUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Post } from '@/data/socialData';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  const [upvoted, setUpvoted] = useState(post.upvoted);
  const [upvoteCount, setUpvoteCount] = useState(post.upvotes);
  const [bookmarked, setBookmarked] = useState(post.bookmarked);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUpvoted(!upvoted);
    setUpvoteCount(upvoted ? upvoteCount - 1 : upvoteCount + 1);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  const categoryColors: Record<string, string> = {
    Grammar: 'bg-success/15 text-success',
    Vocabulary: 'bg-info/15 text-info',
    Pronunciation: 'bg-purple/15 text-purple',
    Culture: 'bg-warning/15 text-warning',
    'Bug Report': 'bg-error/15 text-error',
    'Feature Request': 'bg-accent-primary/15 text-accent-primary',
  };

  return (
    <div
      onClick={onClick}
      className="bg-bg-secondary rounded-xl p-5 border border-border-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-accent-primary/30 cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick?.(); }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-bg-tertiary flex items-center justify-center text-sm font-semibold text-accent-primary shrink-0">
          {post.author.avatar}
        </div>
        <div className="flex items-center gap-1.5 text-sm flex-wrap">
          <span className="text-accent-primary font-medium">@{post.author.username}</span>
          <span className="text-text-muted">·</span>
          <span className="text-text-secondary">
            {formatDistanceToNow(post.createdAt, { addSuffix: true })}
          </span>
          <span className="text-text-muted">·</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-bg-tertiary text-text-secondary'}`}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-lg font-semibold text-text-primary mb-2 leading-snug">
        {post.title}
      </h4>

      {/* Body preview */}
      <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
        {post.body}
      </p>

      {/* Footer actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleUpvote}
          className={`flex items-center gap-1 text-sm transition-all duration-200 ${
            upvoted ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <ChevronUp className="w-4 h-4" />
          <span className={`font-medium ${upvoted ? 'animate-bounce-once' : ''}`}>{upvoteCount}</span>
        </button>

        <button
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{post.comments}</span>
        </button>

        <button
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>

        <button
          onClick={handleBookmark}
          className={`ml-auto transition-colors duration-200 ${
            bookmarked ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Bookmark className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
}
