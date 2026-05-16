import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Play,
  Star,
  CheckCircle2,
  MessageCircle,
  Trophy,
  Users,
  Lock,
  ArrowRight,
  Sparkles,
  Shield,
  Route,
  RefreshCw,
  Zap,
  Heart,
} from 'lucide-react'
import Layout from '@/components/Layout'
import CountUp from 'react-countup'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/* ────────────────────────── Helpers ────────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
}

function useInViewOnce(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [hasViewed, setHasViewed] = useState(false)
  const inView = useInView(ref, { once: true, amount: threshold })

  useEffect(() => {
    if (inView) setHasViewed(true)
  }, [inView])

  return { ref, hasViewed }
}

/* ────────────────────────── Hero ────────────────────────── */

function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-code-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div
          className="absolute inset-0 animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle at 70% 30%, rgba(245,158,11,0.15) 0%, transparent 60%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/60 via-bg-primary/40 to-bg-primary" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent-primary/50 bg-bg-secondary mb-6"
            >
              <Star className="w-3.5 h-3.5 text-accent-primary" />
              <span className="text-accent-primary text-[11px] font-semibold tracking-[0.06em] uppercase">
                Somali Grammar, Reimagined
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-text-primary leading-[1.05] tracking-[-0.03em] mb-6"
            >
              Master Somali
              <br />
              <span className="text-accent-primary">Grammar</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="text-lg text-text-secondary leading-relaxed mb-8 max-w-lg"
            >
              A graph-powered learning platform that understands prerequisites, tracks mastery, and guides you through Somali grammar with the precision of a dependency resolver.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.36, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex flex-wrap items-center gap-4 mb-4"
            >
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-white font-semibold text-sm hover:bg-accent-hover transition-all duration-200 hover:scale-[1.02] shadow-glow"
              >
                <Play className="w-4 h-4" />
                Start Learning
              </Link>
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-default text-text-primary font-semibold text-sm hover:bg-bg-tertiary transition-all duration-200"
              >
                Sign In
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-text-muted text-xs font-mono tracking-wide"
            >
              No account required to start. Sign in to sync progress across devices.
            </motion.p>
          </div>

          {/* Right Column — Code Block Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="hidden lg:block relative"
          >
            <div className="bg-bg-secondary rounded-xl border border-border-default shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-text-muted text-xs font-mono ml-4">somali-grammar.jsx</span>
              </div>

              {/* Code content */}
              <div className="p-5 font-mono text-sm leading-relaxed">
                <CodeTypewriter />
              </div>

              {/* Terminal output */}
              <div className="px-5 py-3 bg-bg-tertiary border-t border-border-subtle text-xs font-mono">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-success">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    3,685 concepts loaded
                  </span>
                  <span className="text-text-secondary">1,698 relationships mapped</span>
                  <span className="flex items-center gap-1 text-accent-primary">
                    <ArrowRight className="w-3 h-3" />
                    Next: Present Habitual Tense
                  </span>
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -bottom-4 -right-4 bg-bg-elevated rounded-lg p-3 border border-border-default shadow-card animate-float"
            >
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-accent-primary" />
                <span className="text-text-primary text-xs font-semibold">Day 12 Streak</span>
              </div>
              <div className="mt-1 h-6 w-24 flex items-end gap-px">
                {[3, 5, 4, 6, 7, 5, 8, 6, 9, 8].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-accent-primary/60 rounded-sm"
                    style={{ height: `${h * 10}%` }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────── Code Typewriter ────────────────────── */

function CodeTypewriter() {
  const [showCursor, setShowCursor] = useState(true)
  const lines = [
    { text: 'import', color: 'text-purple-400' },
    { text: ' { Graph } ', color: 'text-text-secondary' },
    { text: "from", color: 'text-purple-400' },
    { text: " 'leet-grammar';", color: 'text-green-400' },
  ]

  const line2 = [
    { text: 'const', color: 'text-purple-400' },
    { text: ' myPath = ', color: 'text-text-secondary' },
    { text: 'new', color: 'text-red-400' },
    { text: ' Graph()', color: 'text-blue-400' },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setShowCursor(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-1">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap"
      >
        {lines.map((part, i) => (
          <span key={i} className={part.color}>{part.text}</span>
        ))}
      </motion.div>

      <div />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap"
      >
        {line2.map((part, i) => (
          <span key={i} className={part.color}>{part.text}</span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="text-text-secondary"
      >
        {'  .addConcept('}<span className="text-green-400">'Word Order'</span>{')'}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.97 }}
        className="text-text-secondary"
      >
        {'  .addConcept('}<span className="text-green-400">'Present Tense'</span>{')'}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.09 }}
        className="text-text-secondary"
      >
        {'  .requires('}<span className="text-green-400">'Future Tense'</span>{', '}<span className="text-green-400">'Infinitive'</span>{');'}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.21 }}
        className="flex flex-wrap"
      >
        <span className="text-purple-400">await</span>
        <span className="text-text-secondary"> myPath.</span>
        <span className="text-blue-400">learn</span>
        <span className="text-text-secondary">(); </span>
        <span className="text-gray-500">{'// Begin your journey'}</span>
        {showCursor && (
          <span className="ml-0.5 w-2 h-4 bg-accent-primary animate-pulse inline-block" />
        )}
      </motion.div>
    </div>
  )
}

/* ────────────────────────── Stats ────────────────────────── */

function StatsSection() {
  const { ref, hasViewed } = useInViewOnce(0.2)

  const stats = [
    { value: 3685, label: 'Grammar Concepts', suffix: '', trend: '12%' },
    { value: 1698, label: 'Relationships Mapped', suffix: '', trend: '8%' },
    { value: 50, label: 'Lessons', suffix: '+', trend: '3 new' },
    { value: 100, label: 'Free', suffix: '%', trend: 'Forever' },
  ]

  return (
    <section className="bg-bg-secondary py-12" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-text-primary mb-1">
                {hasViewed ? (
                  <CountUp end={stat.value} duration={1.5} suffix={stat.suffix} separator="," />
                ) : (
                  '0'
                )}
              </div>
              <div className="text-sm text-text-secondary uppercase tracking-[0.08em] mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-success font-mono flex items-center justify-center gap-1">
                <ArrowRight className="w-3 h-3 -rotate-45" />
                {stat.trend} this month
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────── How It Works ────────────────────── */

function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Explore the Roadmap',
      desc: "Browse the full grammar curriculum as an interactive dependency graph. See exactly what you need to learn next.",
    },
    {
      num: '02',
      title: 'Learn a Concept',
      desc: 'Work through bite-sized lessons with interactive exercises, audio pronunciation, and instant feedback.',
    },
    {
      num: '03',
      title: 'Practice & Review',
      desc: 'Reinforce with SRS-powered review sessions tailored to your weak spots. Earn XP and build your streak.',
    },
  ]

  return (
    <section className="py-20 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-text-secondary text-[11px] font-semibold tracking-[0.06em] uppercase">
            How It Works
          </span>
          <h2 className="text-3xl lg:text-[36px] font-bold text-text-primary mt-3 tracking-[-0.015em] leading-[1.15]">
            Three steps to fluency
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-bg-secondary rounded-2xl p-6 border border-border-default hover:border-accent-primary/50 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200"
            >
              <span className="text-[48px] font-bold text-accent-muted/50 leading-none">
                {step.num}
              </span>
              <h3 className="text-xl font-semibold text-text-primary mt-3 mb-2 tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────── Gameplay Preview ──────────────────── */

function GameplayPreviewSection() {
  const features = [
    '8 exercise types per lesson',
    'Lives system — 5 hearts per session',
    'Earn up to 30 XP per perfect lesson',
  ]

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent-primary/50 bg-bg-primary mb-4">
              <Zap className="w-3 h-3 text-accent-primary" />
              <span className="text-accent-primary text-[11px] font-semibold tracking-[0.06em] uppercase">
                Gameplay
              </span>
            </span>

            <h2 className="text-3xl lg:text-[36px] font-bold text-text-primary mb-4 tracking-[-0.015em] leading-[1.15]">
              Learn by doing, not just reading
            </h2>

            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              Every lesson is packed with interactive exercises — drag-and-drop sentence builders, audio transcription, multiple choice, and more. Get instant feedback and watch your XP grow.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-text-primary text-sm">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              to="/learn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-primary text-white font-semibold text-sm hover:bg-accent-hover transition-all duration-200 hover:scale-[1.02] shadow-glow"
            >
              Try a Demo Lesson
            </Link>
          </motion.div>

          {/* Right — Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-[280px] sm:w-[320px] bg-bg-primary rounded-[32px] border-[8px] border-bg-elevated shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Mock exercise header */}
              <div className="px-4 pt-4 pb-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1 h-1 bg-bg-tertiary rounded-full overflow-hidden">
                    <div className="w-[60%] h-full bg-accent-primary rounded-full" />
                  </div>
                  <button className="ml-3 text-text-muted hover:text-text-primary">
                    <span className="text-lg">&times;</span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((h) => (
                      <Heart key={h} className="w-4 h-4 text-heart" fill={h <= 5 ? '#ef4444' : 'none'} />
                    ))}
                  </div>
                  <span className="text-text-muted text-xs font-mono">3/5</span>
                </div>
              </div>

              {/* Exercise content */}
              <div className="px-4 py-4">
                <p className="text-text-secondary text-sm mb-1">Arrange the words to form:</p>
                <p className="text-text-primary font-semibold text-base mb-5">
                  &quot;I am eating food&quot;
                </p>

                {/* Answer slots */}
                <div className="flex gap-2 mb-6 justify-center">
                  {['waan', 'cunaya', 'cunto'].map((word, i) => (
                    <motion.div
                      key={word}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className="px-3 py-2 rounded-lg bg-success/20 border border-success/50 text-text-primary text-sm font-medium text-center min-w-[60px]"
                    >
                      {word}
                    </motion.div>
                  ))}
                </div>

                {/* Result */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-success mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-semibold text-sm">Waan cunaya cunto</span>
                  </div>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.1 }}
                    className="inline-block px-3 py-1 rounded-full bg-success/20 text-success text-xs font-bold"
                  >
                    +10 XP
                  </motion.span>
                </motion.div>
              </div>

              {/* Bottom button area */}
              <div className="px-4 pb-4">
                <button className="w-full py-3 rounded-xl bg-success text-white font-semibold text-sm">
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────── Curriculum Preview ──────────────────── */

function CurriculumPreviewSection() {
  const lessons = [
    { name: 'Somali Alphabet & Sounds', level: 'L1', color: '#22c55e', locked: false },
    { name: 'Greetings & Introductions', level: 'L1', color: '#22c55e', locked: false },
    { name: 'Word Order (SOV)', level: 'L3', color: '#eab308', locked: false },
    { name: 'Personal Pronouns', level: 'L3', color: '#eab308', locked: false },
    { name: 'Present Habitual Tense', level: 'L5', color: '#ef4444', locked: true },
    { name: 'Past Simple Tense', level: 'L5', color: '#ef4444', locked: true },
    { name: 'Future Tense', level: 'L5', color: '#ef4444', locked: true },
    { name: 'Focus Markers', level: 'L4', color: '#a855f7', locked: true },
  ]

  const levelColors: Record<string, string> = {
    L1: '#22c55e',
    L2: '#3b82f6',
    L3: '#eab308',
    L4: '#a855f7',
    L5: '#ef4444',
    L6: '#22d3ee',
    L7: '#ec4899',
    L8: '#f59e0b',
  }

  return (
    <section className="py-20 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent-primary/50 bg-bg-secondary mb-4">
            <Sparkles className="w-3 h-3 text-accent-primary" />
            <span className="text-accent-primary text-[11px] font-semibold tracking-[0.06em] uppercase">
              Curriculum
            </span>
          </span>
          <h2 className="text-3xl lg:text-[36px] font-bold text-text-primary mb-3 tracking-[-0.015em] leading-[1.15]">
            A curriculum built on dependencies
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            Traditional apps throw random lessons at you. LeetGrammar knows you need Word Order before Tense Conjugation.
          </p>
        </motion.div>

        {/* Scrollable lesson strip */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {lessons.map((lesson, i) => (
            <motion.div
              key={lesson.name}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex-shrink-0 w-[160px] h-[200px] bg-bg-secondary rounded-xl border border-border-default hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 group cursor-pointer relative overflow-hidden"
              style={{ '--hover-color': levelColors[lesson.level] } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = levelColors[lesson.level] + '80'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = ''
              }}
            >
              {/* Level indicator */}
              <div
                className="h-1 w-full"
                style={{ backgroundColor: levelColors[lesson.level] }}
              />

              <div className="p-4 flex flex-col items-center h-full">
                {/* Icon placeholder */}
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 mt-2"
                  style={{ backgroundColor: levelColors[lesson.level] + '20' }}
                >
                  <span
                    className="font-mono text-lg font-bold"
                    style={{ color: levelColors[lesson.level] }}
                  >
                    {lesson.level}
                  </span>
                </div>

                <span className="text-text-primary text-xs font-medium text-center leading-tight line-clamp-2">
                  {lesson.name}
                </span>

                {lesson.locked && (
                  <div className="absolute inset-0 bg-bg-primary/60 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-text-muted" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-2 text-accent-primary font-medium text-sm hover:text-accent-hover transition-colors"
          >
            Explore the full roadmap
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────── Community Section ──────────────────── */

function CommunitySection() {
  const features = [
    {
      icon: MessageCircle,
      title: 'Lesson Comments',
      desc: 'Ask questions, share insights, and get help from the community on every lesson.',
    },
    {
      icon: Trophy,
      title: 'Global Leaderboard',
      desc: 'Compete with learners worldwide. Weekly leagues with gem rewards for top performers.',
    },
    {
      icon: Users,
      title: 'Study Groups',
      desc: 'Join or create study groups. Learn alongside friends and keep each other accountable.',
    },
  ]

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-[36px] font-bold text-text-primary text-center mb-12 tracking-[-0.015em] leading-[1.15]"
        >
          Learn together, grow together
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-bg-primary rounded-2xl p-6 border border-border-default hover:border-accent-primary/30 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                <feat.icon className="w-5 h-5 text-accent-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{feat.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-lg text-text-primary italic leading-relaxed mb-3">
            &ldquo;I went from zero Somali to holding conversations in 3 months. The gamified lessons made grammar actually fun.&rdquo;
          </p>
          <p className="text-text-secondary text-sm">
            — Amina H., <span className="text-accent-primary">120-day streak</span>
          </p>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 text-accent-primary" fill="#f59e0b" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ────────────────────── Why Graphs ────────────────────── */

function WhyGraphsSection() {
  const benefits = [
    {
      icon: Shield,
      title: 'Prerequisite Awareness',
      desc: 'Learners see why a topic matters before studying it. The graph surfaces every dependency.',
    },
    {
      icon: Lock,
      title: 'No Knowledge Gaps',
      desc: 'You cannot learn the Future Tense without first mastering the Infinitive.',
    },
    {
      icon: Route,
      title: 'Adaptive Paths',
      desc: 'The graph reroutes around known material and reinforces weak nodes.',
    },
    {
      icon: RefreshCw,
      title: 'Contextual Review',
      desc: 'Spaced repetition tied to concept nodes — not isolated flashcards.',
    },
  ]

  return (
    <section className="py-20 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-[36px] font-bold text-text-primary text-center mb-12 tracking-[-0.015em] leading-[1.15]"
        >
          How graph technology facilitates learning
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-bg-secondary rounded-2xl p-6 border border-border-default hover:border-accent-primary/30 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center mb-4">
                <b.icon className="w-5 h-5 text-accent-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{b.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ────────────────────── CTA Banner ────────────────────── */

function CTABannerSection() {
  return (
    <section className="py-20 bg-bg-secondary relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(245,158,11,0.08) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center"
      >
        <h2 className="text-3xl lg:text-[36px] font-bold text-text-primary mb-4 tracking-[-0.015em] leading-[1.15]">
          Ready to start your journey?
        </h2>
        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          Join thousands of learners mastering Somali grammar through the power of graph technology.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-white font-semibold text-sm hover:bg-accent-hover transition-all duration-200 hover:scale-[1.02] shadow-glow animate-button-pulse"
          >
            <Play className="w-4 h-4" />
            Start Learning
          </Link>
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-default text-text-primary font-semibold text-sm hover:bg-bg-tertiary transition-all duration-200"
          >
            View the Roadmap
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

/* ────────────────────── Home Page ────────────────────── */

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <GameplayPreviewSection />
      <CurriculumPreviewSection />
      <CommunitySection />
      <WhyGraphsSection />
      <CTABannerSection />
    </Layout>
  )
}

/* Flame icon for floating card */
function Flame(props: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}
