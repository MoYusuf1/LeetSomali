import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoadmapLevelStrip from '@/components/RoadmapLevelStrip';
import RoadmapGraph from '@/components/RoadmapGraph';
import RoadmapDetailPanel from '@/components/RoadmapDetailPanel';
import RoadmapLevelDetail from '@/components/RoadmapLevelDetail';
import {
  roadmapLevels,
  graphNodes,
  graphEdges,
  levelLessons,
} from '@/data/roadmapData';
import type { GraphNode } from '@/data/roadmapData';

export default function Roadmap() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const totalLessons = roadmapLevels.reduce((sum, l) => sum + l.lessonCount, 0);
  const completedLessons = roadmapLevels.reduce((sum, l) => sum + l.completedLessons, 0);
  const overallPercent = Math.round((completedLessons / totalLessons) * 100);
  const currentLevelIndex = roadmapLevels.findIndex(l => l.status === 'in-progress') + 1;

  const { prerequisiteLabels, unlockLabels } = useMemo(() => {
    if (!selectedNode) return { prerequisiteLabels: [], unlockLabels: [] };

    const prereqIds = graphEdges
      .filter(e => e.target === selectedNode.id)
      .map(e => e.source);
    const prereqs = prereqIds
      .map(id => graphNodes.find(n => n.id === id))
      .filter(Boolean)
      .map(n => n!.label);

    const unlockIds = graphEdges
      .filter(e => e.source === selectedNode.id)
      .map(e => e.target);
    const unlocks = unlockIds
      .map(id => graphNodes.find(n => n.id === id))
      .filter(Boolean)
      .map(n => n!.label);

    return { prerequisiteLabels: prereqs, unlockLabels: unlocks };
  }, [selectedNode]);

  const handleSelectLevel = (levelId: number) => {
    setSelectedLevel(prev => prev === levelId ? null : levelId);
  };

  return (
    <div className="min-h-[100dvh] bg-[#0d1117] pt-16">
      {/* Section 1: Page Header */}
      <motion.div
        className="py-6 px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-[#8b949e] text-xs font-semibold uppercase tracking-[0.06em] mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          YOUR PATH TO MASTERY
        </motion.p>
        <motion.h1
          className="text-[#e6edf3] text-4xl sm:text-5xl font-bold mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Grammar Roadmap
        </motion.h1>
        <motion.p
          className="text-[#8b949e] text-lg mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          8 levels. 50+ lessons. One dependency graph.
        </motion.p>
        <motion.p
          className="text-[#f59e0b] text-lg font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Level {currentLevelIndex} of 8 — {overallPercent}% complete
        </motion.p>
      </motion.div>

      {/* Section 2: Level Progress Strip */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <RoadmapLevelStrip
          levels={roadmapLevels}
          selectedLevel={selectedLevel}
          onSelectLevel={handleSelectLevel}
        />
      </motion.div>

      {/* Section 3 & 4: Graph + Detail Panel */}
      <div className="flex flex-col lg:flex-row px-4 sm:px-8 gap-0 lg:gap-0 mt-4">
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <RoadmapGraph
              nodes={graphNodes}
              edges={graphEdges}
              onNodeSelect={setSelectedNode}
              selectedNode={selectedNode}
            />
          </motion.div>
        </div>

        <AnimatePresence>
          {selectedNode && (
            <motion.div
              className="w-full lg:w-auto mt-4 lg:mt-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="lg:h-[70vh]">
                <RoadmapDetailPanel
                  node={selectedNode}
                  onClose={() => setSelectedNode(null)}
                  prerequisiteLabels={prerequisiteLabels}
                  unlockLabels={unlockLabels}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Section 5: Level Detail View */}
      <AnimatePresence>
        {selectedLevel && (
          <motion.div
            className="px-4 sm:px-8 mt-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <RoadmapLevelDetail
              levelName={roadmapLevels.find(l => l.id === selectedLevel)?.name || ''}
              levelColor={roadmapLevels.find(l => l.id === selectedLevel)?.colorHex || '#8b949e'}
              levelId={selectedLevel}
              lessons={levelLessons[selectedLevel] || []}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for layout */}
      <div className="h-8" />
    </div>
  );
}
