import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Shuffle } from 'lucide-react';
import ProblemTable from '@/components/ProblemTable';
import ProblemFilters, { type FilterState } from '@/components/ProblemFilters';
import ProblemDetailModal from '@/components/ProblemDetailModal';
import SolvedStats from '@/components/SolvedStats';
import { problems } from '@/data/problemsData';
import type { Problem } from '@/data/problemsData';

export default function Problems() {
  const [filters, setFilters] = useState<FilterState>({
    difficulty: [],
    level: [],
    status: 'all',
    type: [],
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const filteredProblems = useMemo(() => {
    let result = [...problems];

    // Difficulty filter
    if (filters.difficulty.length > 0) {
      result = result.filter((p) => filters.difficulty.includes(p.difficulty));
    }

    // Level filter
    if (filters.level.length > 0) {
      result = result.filter((p) => filters.level.includes(p.level));
    }

    // Status filter
    if (filters.status !== 'all') {
      result = result.filter((p) => p.status === filters.status);
    }

    // Type filter
    if (filters.type.length > 0) {
      result = result.filter((p) => filters.type.includes(p.type));
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.level.toLowerCase().includes(q)
      );
    }

    return result;
  }, [filters, searchQuery]);

  const handleRandomProblem = () => {
    const random = problems[Math.floor(Math.random() * problems.length)];
    setSelectedProblem(random);
  };

  return (
    <div className="min-h-[100dvh] bg-bg-primary pt-16">
      {/* Header bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-8 py-6 border-b border-border-subtle"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">Problems</h1>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems..."
              className="w-full sm:w-96 bg-bg-secondary rounded-lg pl-10 pr-4 py-2.5 text-text-primary placeholder-text-muted border border-border-default focus:border-accent-primary focus:outline-none transition-colors duration-200 text-sm"
            />
          </div>

          {/* Problem count */}
          <span className="text-text-secondary text-sm hidden md:block">
            {filteredProblems.length} problems
          </span>

          {/* Random problem */}
          <button
            onClick={handleRandomProblem}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-accent-primary text-white hover:bg-accent-hover transition-colors duration-200 shrink-0"
          >
            <Shuffle className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </motion.div>

      {/* Solved stats bar */}
      <SolvedStats />

      {/* Main content: filters + table */}
      <div className="flex">
        {/* Filter sidebar (desktop) */}
        <aside className="hidden md:block w-[240px] shrink-0 border-r border-border-default min-h-[calc(100dvh-200px)] sticky top-16 p-4 overflow-y-auto">
          <ProblemFilters filters={filters} onChange={setFilters} />
        </aside>

        {/* Problem table */}
        <main className="flex-1 min-w-0 p-4 sm:p-6">
          <ProblemTable problems={filteredProblems} onProblemClick={setSelectedProblem} />
        </main>
      </div>

      {/* Problem detail modal */}
      <ProblemDetailModal
        problem={selectedProblem}
        onClose={() => setSelectedProblem(null)}
      />
    </div>
  );
}
