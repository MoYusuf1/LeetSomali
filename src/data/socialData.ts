export interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  title: string;
  body: string;
  category: string;
  upvotes: number;
  comments: number;
  bookmarked: boolean;
  upvoted: boolean;
  createdAt: Date;
}

export interface Reply {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  body: string;
  likes: number;
  liked: boolean;
  createdAt: Date;
  replies: Reply[];
}

export interface Comment extends Reply {}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  xp: number;
  streak: number;
  lessons: number;
  accuracy: number;
  isCurrentUser: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  focus: string;
  color: string;
  joined: boolean;
}

export interface TrendingTopic {
  tag: string;
  count: number;
}

export const posts: Post[] = [
  {
    id: "post-1",
    author: { name: "Nadia", username: "nadia_learner", avatar: "N" },
    title: "How do focus markers (baa vs ayaa) actually work?",
    body: "I've been going through Level 4 and the focus markers are really confusing me. Can someone break down exactly when to use 'baa' versus 'ayaa'? They seem interchangeable but I know they're not. I've read the lesson notes but I'm still struggling with the nuance.",
    category: "Grammar",
    upvotes: 24,
    comments: 8,
    bookmarked: false,
    upvoted: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "post-2",
    author: { name: "Ahmed", username: "ahmed_somali", avatar: "A" },
    title: "Just completed Level 3 — the SOV order finally clicked!",
    body: "After weeks of practice, sentence construction with Subject-Object-Verb order finally feels natural. The 'Noun Phrase Architect' problem was the breakthrough moment. Sharing my notes here for anyone else struggling with this concept.",
    category: "Vocabulary",
    upvotes: 47,
    comments: 12,
    bookmarked: true,
    upvoted: true,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "post-3",
    author: { name: "Sahra", username: "sahra_q", avatar: "S" },
    title: "Audio pronunciation for 'dh' vs 'd' sounds",
    body: "The retroflex 'dh' sound is notoriously tricky for English speakers. I found a great technique: place your tongue further back on the palate. Here's a recording comparison that might help others distinguish these two sounds in Somali words.",
    category: "Pronunciation",
    upvotes: 15,
    comments: 6,
    bookmarked: false,
    upvoted: false,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: "post-4",
    author: { name: "Dev Mohamed", username: "dev_mohamed", avatar: "D" },
    title: "Feature request: Dark mode for lesson cards",
    body: "The lesson cards could use a darker theme option. I've been doing late-night study sessions and the contrast can be harsh. Would love to see a toggle for deep dark mode on the exercise cards specifically.",
    category: "Feature Request",
    upvotes: 89,
    comments: 23,
    bookmarked: false,
    upvoted: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: "post-5",
    author: { name: "Grammar Expert", username: "grammar_expert", avatar: "G" },
    title: "Complete guide to Somali noun cases with examples",
    body: "I've compiled a comprehensive reference for all four Somali noun cases: subject, object, genitive, and vocative. Each case includes conjugation tables, real-world examples, and common mistakes to avoid. This should serve as a quick reference for Levels 2-5.",
    category: "Grammar",
    upvotes: 56,
    comments: 15,
    bookmarked: true,
    upvoted: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "post-6",
    author: { name: "Fartuun", username: "fartuun_learns", avatar: "F" },
    title: "Weekly study group for Level 4 learners — join us!",
    body: "We're a group of 8 learners working through Focus & Questions. We meet every Saturday on Discord to practice conversation and review grammar concepts together. All skill levels welcome!",
    category: "Culture",
    upvotes: 31,
    comments: 9,
    bookmarked: false,
    upvoted: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: "post-7",
    author: { name: "Hassan", username: "hassan_codes", avatar: "H" },
    title: "Bug: Progress not syncing between devices",
    body: "I've noticed that my lesson progress doesn't sync properly when I switch from my laptop to my phone. The XP and streak data updates but individual lesson completion markers don't. Anyone else experiencing this?",
    category: "Bug Report",
    upvotes: 18,
    comments: 7,
    bookmarked: false,
    upvoted: false,
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
  },
  {
    id: "post-8",
    author: { name: "Amina", username: "amina_ling", avatar: "A2" },
    title: "Tips for memorizing verb conjugation patterns",
    body: "After finishing Level 5, I developed a spaced repetition system for the 10 major verb conjugation patterns. The key is grouping them by root pattern rather than memorizing each form individually. Here's my Anki deck and methodology.",
    category: "Grammar",
    upvotes: 42,
    comments: 11,
    bookmarked: true,
    upvoted: false,
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
  },
];

export const commentThreads: Record<string, Comment[]> = {
  "post-1": [
    {
      id: "c1",
      author: { name: "Grammar Expert", username: "grammar_expert", avatar: "G" },
      body: "Baa focuses on what comes BEFORE it, while ayaa focuses on what comes AFTER. Think of baa as 'it is X that...' and ayaa as 'X is the one that...'",
      likes: 12,
      liked: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      replies: [
        {
          id: "c1-r1",
          author: { name: "Nadia", username: "nadia_learner", avatar: "N" },
          body: "That makes so much sense now! So 'Ali BAA tagay' = 'It was ALI who went' and 'Ali ayaa TAGAY' = 'Ali WENT (as opposed to stayed)'",
          likes: 8,
          liked: false,
          createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
          replies: [
            {
              id: "c1-r1-r1",
              author: { name: "Grammar Expert", username: "grammar_expert", avatar: "G" },
              body: "Exactly! You've got it. The key is what element receives the emphasis. Baa emphasizes the preverbal element, ayaa emphasizes the verbal element.",
              likes: 5,
              liked: false,
              createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
              replies: [],
            },
          ],
        },
        {
          id: "c1-r2",
          author: { name: "Ahmed", username: "ahmed_somali", avatar: "A" },
          body: "This is the clearest explanation I've seen. The lesson notes were helpful but this really drives it home.",
          likes: 3,
          liked: false,
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
          replies: [],
        },
      ],
    },
    {
      id: "c2",
      author: { name: "Sahra", username: "sahra_q", avatar: "S" },
      body: "Another way to think about it: baa is more common in spoken Somali, while ayaa tends to appear more in formal writing. Native speakers use both but often have a preference.",
      likes: 6,
      liked: false,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      replies: [
        {
          id: "c2-r1",
          author: { name: "Amina", username: "amina_ling", avatar: "A2" },
          body: "Great point about register! I noticed this in Somali media too — news broadcasts use ayaa much more frequently.",
          likes: 4,
          liked: false,
          createdAt: new Date(Date.now() - 30 * 60 * 1000),
          replies: [],
        },
      ],
    },
  ],
};

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, username: "ahmed_somali", avatar: "A", xp: 2450, streak: 45, lessons: 38, accuracy: 92, isCurrentUser: false },
  { rank: 2, username: "nadia_learner", avatar: "N", xp: 2120, streak: 23, lessons: 42, accuracy: 88, isCurrentUser: false },
  { rank: 3, username: "sahra_q", avatar: "S", xp: 1890, streak: 31, lessons: 35, accuracy: 90, isCurrentUser: false },
  { rank: 4, username: "dev_mohamed", avatar: "D", xp: 1650, streak: 18, lessons: 28, accuracy: 85, isCurrentUser: false },
  { rank: 5, username: "grammar_expert", avatar: "G", xp: 1540, streak: 52, lessons: 45, accuracy: 96, isCurrentUser: false },
];

export const studyGroupsData: StudyGroup[] = [
  {
    id: "sg-1",
    name: "Beginners United",
    description: "A friendly group for learners working through Levels 1-2. We focus on foundations, pronunciation, and building confidence.",
    members: 24,
    focus: "Learning Level 1-2",
    color: "#22c55e",
    joined: false,
  },
  {
    id: "sg-2",
    name: "Grammar Geeks",
    description: "Deep dives into Somali grammar rules. Currently focused on sentence structure and focus markers.",
    members: 18,
    focus: "Level 3-5 focus",
    color: "#a855f7",
    joined: true,
  },
  {
    id: "sg-3",
    name: "Somali Speakers",
    description: "Conversation practice for intermediate and advanced learners. We meet weekly for voice chat sessions.",
    members: 31,
    focus: "Conversation practice",
    color: "#3b82f6",
    joined: false,
  },
  {
    id: "sg-4",
    name: "Verb Masters",
    description: "Dedicated to mastering Somali verb conjugations. All 10 major patterns covered with drills and quizzes.",
    members: 15,
    focus: "Level 5-6 focus",
    color: "#ef4444",
    joined: false,
  },
  {
    id: "sg-5",
    name: "Fluency Seekers",
    description: "Advanced learners pushing toward native-level fluency. Complex grammar, idioms, and cultural context.",
    members: 12,
    focus: "Level 7-8 focus",
    color: "#f59e0b",
    joined: false,
  },
];

export const trendingTopicsData: TrendingTopic[] = [
  { tag: "FocusMarkers", count: 23 },
  { tag: "SOVOrder", count: 18 },
  { tag: "VerbConjugation", count: 15 },
  { tag: "Pronunciation", count: 12 },
  { tag: "SomaliCulture", count: 9 },
];

export const categories = [
  "Grammar",
  "Vocabulary",
  "Pronunciation",
  "Culture",
  "Bug Report",
  "Feature Request",
];

export const onlineUsers = [
  { name: "Nadia", initial: "N", color: "#f59e0b" },
  { name: "Ahmed", initial: "A", color: "#22c55e" },
  { name: "Sahra", initial: "S", color: "#3b82f6" },
  { name: "Hassan", initial: "H", color: "#a855f7" },
  { name: "Amina", initial: "A2", color: "#ef4444" },
];
