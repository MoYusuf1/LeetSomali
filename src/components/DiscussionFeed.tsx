import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostCard from './PostCard';
import PostDetail from './PostDetail';
import type { Post } from '@/data/socialData';

interface DiscussionFeedProps {
  posts: Post[];
}

export default function DiscussionFeed({ posts }: DiscussionFeedProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="wait">
        {selectedPost ? (
          <motion.div
            key="post-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PostDetail
              post={selectedPost}
              onBack={() => setSelectedPost(null)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="feed-list"
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <PostCard
                  post={post}
                  onClick={() => setSelectedPost(post)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
