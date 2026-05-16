import { ArrowLeft, ChevronUp, MessageSquare, Share2, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import CommentThread from './CommentThread';
import { commentThreads } from '@/data/socialData';
import type { Post } from '@/data/socialData';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

export default function PostDetail({ post, onBack }: PostDetailProps) {
  const [upvoted, setUpvoted] = useState(post.upvoted);
  const [upvoteCount, setUpvoteCount] = useState(post.upvotes);
  const [bookmarked, setBookmarked] = useState(post.bookmarked);

  const comments = commentThreads[post.id] || [];

  const handleUpvote = () => {
    setUpvoted(!upvoted);
    setUpvoteCount(upvoted ? upvoteCount - 1 : upvoteCount + 1);
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
    <div className="bg-bg-secondary rounded-2xl p-6 border border-border-default">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-200 mb-4 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to feed
      </button>

      {/* Post header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center text-sm font-semibold text-accent-primary shrink-0">
          {post.author.avatar}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-accent-primary font-medium text-sm">@{post.author.username}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[post.category] || 'bg-bg-tertiary text-text-secondary'}`}>
              {post.category}
            </span>
          </div>
          <span className="text-text-secondary text-xs">
            {formatDistanceToNow(post.createdAt, { addSuffix: true })}
          </span>
        </div>
      </div>

      {/* Title and body */}
      <h2 className="text-xl font-semibold text-text-primary mb-3 leading-snug">
        {post.title}
      </h2>
      <p className="text-text-primary leading-relaxed mb-6 whitespace-pre-wrap">
        {post.body}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-4 pb-6 border-b border-border-subtle">
        <button
          onClick={handleUpvote}
          className={`flex items-center gap-1 text-sm transition-all duration-200 ${
            upvoted ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <ChevronUp className="w-5 h-5" />
          <span className="font-medium">{upvoteCount}</span>
        </button>

        <div className="flex items-center gap-1 text-sm text-text-secondary">
          <MessageSquare className="w-4 h-4" />
          <span>{post.comments} comments</span>
        </div>

        <button className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>

        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`ml-auto transition-colors duration-200 ${
            bookmarked ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Bookmark className="w-5 h-5" fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Comments */}
      <CommentThread comments={comments} />
    </div>
  );
}
