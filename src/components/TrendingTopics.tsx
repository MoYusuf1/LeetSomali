import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import { trendingTopicsData } from '@/data/socialData';

export default function TrendingTopics() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Flame className="w-5 h-5 text-accent-primary" />
        <h4 className="text-base font-semibold text-text-primary">Trending</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {trendingTopicsData.map((topic, index) => (
          <motion.button
            key={topic.tag}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.06 }}
            className="bg-bg-tertiary hover:bg-accent-primary/20 rounded-full px-3 py-1.5 text-accent-primary text-sm transition-colors duration-200"
          >
            <span className="font-medium">#{topic.tag}</span>
            <span className="text-text-secondary ml-1.5 text-xs">{topic.count}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
