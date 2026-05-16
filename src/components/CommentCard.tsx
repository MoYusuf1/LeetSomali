import { useState } from 'react';
import { Heart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Reply } from '@/data/socialData';

interface CommentCardProps {
  comment: Reply;
  depth?: number;
  onReply?: (username: string) => void;
}

export default function CommentCard({ comment, depth = 0, onReply }: CommentCardProps) {
  const [liked, setLiked] = useState(comment.liked);
  const [likeCount, setLikeCount] = useState(comment.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const maxDepth = 3;
  const isNested = depth > 0;
  const showReplies = depth < maxDepth;

  return (
    <div className={isNested ? 'pl-4 ml-6 border-l-2 border-border-subtle' : ''}>
      <div className="flex items-start gap-3 py-3">
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
          <p className="text-text-primary text-sm leading-relaxed mb-2">
            {comment.body}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs transition-all duration-200 ${
                liked ? 'text-heart' : 'text-text-secondary hover:text-heart'
              }`}
            >
              <Heart className="w-3.5 h-3.5" fill={liked ? 'currentColor' : 'none'} />
              <span>{likeCount}</span>
            </button>
            <button
              onClick={() => onReply?.(comment.author.username)}
              className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              Reply
            </button>
            <button className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-200">
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Nested replies */}
      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </div>
      )}

      {depth >= maxDepth && comment.replies && comment.replies.length > 0 && (
        <button className="text-accent-primary text-xs font-medium ml-12 mb-2 hover:underline">
          Continue thread →
        </button>
      )}
    </div>
  );
}
