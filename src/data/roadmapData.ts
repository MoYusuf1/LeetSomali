export interface RoadmapLevel {
  id: number;
  name: string;
  shortName: string;
  color: string;
  colorHex: string;
  lessonCount: number;
  completedLessons: number;
  status: 'completed' | 'in-progress' | 'locked';
  description: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'root' | 'concept' | 'lesson';
  level: number;
  x: number;
  y: number;
  status: 'completed' | 'current' | 'locked' | 'unlocked';
  description: string;
  lessonsCompleted?: number;
  lessonsTotal?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: 'required' | 'recommended';
}

export interface LessonDetail {
  id: string;
  nodeId: string;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
  stars?: number;
  prerequisites: string[];
  unlocks: string[];
}

export const roadmapLevels: RoadmapLevel[] = [
  {
    id: 1,
    name: 'Foundations',
    shortName: 'Foundations',
    color: 'green',
    colorHex: '#22c55e',
    lessonCount: 3,
    completedLessons: 3,
    status: 'completed',
    description: 'Learn the Somali alphabet, basic greetings, and vocative forms.',
  },
  {
    id: 2,
    name: 'Noun System',
    shortName: 'Noun System',
    color: 'blue',
    colorHex: '#3b82f6',
    lessonCount: 4,
    completedLessons: 4,
    status: 'completed',
    description: 'Master gender, definite articles, plurals, and noun cases.',
  },
  {
    id: 3,
    name: 'Sentence Core',
    shortName: 'Sentence Core',
    color: 'yellow',
    colorHex: '#eab308',
    lessonCount: 4,
    completedLessons: 2,
    status: 'in-progress',
    description: 'Build sentences with SOV order, pronouns, copula, and negation.',
  },
  {
    id: 4,
    name: 'Focus & Questions',
    shortName: 'Focus',
    color: 'purple',
    colorHex: '#a855f7',
    lessonCount: 5,
    completedLessons: 0,
    status: 'locked',
    description: 'Learn focus markers, question words, and interrogative patterns.',
  },
  {
    id: 5,
    name: 'Verb & Tense',
    shortName: 'Verb & Tense',
    color: 'red',
    colorHex: '#ef4444',
    lessonCount: 4,
    completedLessons: 0,
    status: 'locked',
    description: 'Master verb conjugations across past, present, and future tenses.',
  },
  {
    id: 6,
    name: 'Space & Modifiers',
    shortName: 'Modifiers',
    color: 'cyan',
    colorHex: '#22d3ee',
    lessonCount: 4,
    completedLessons: 0,
    status: 'locked',
    description: 'Explore prepositions, adjectives, adverbs, and demonstratives.',
  },
  {
    id: 7,
    name: 'Complex Grammar',
    shortName: 'Complex',
    color: 'pink',
    colorHex: '#ec4899',
    lessonCount: 4,
    completedLessons: 0,
    status: 'locked',
    description: 'Tackle relative clauses, passive/active voice, and conditionals.',
  },
  {
    id: 8,
    name: 'Mastery',
    shortName: 'Mastery',
    color: 'amber',
    colorHex: '#f59e0b',
    lessonCount: 2,
    completedLessons: 0,
    status: 'locked',
    description: 'Achieve mastery through complex translation and free composition.',
  },
];

export const graphNodes: GraphNode[] = [
  // L1 Foundations
  { id: 'l1-alphabet', label: 'Somali Alphabet', type: 'root', level: 1, x: 200, y: 400, status: 'completed', description: 'The 21 consonant and 5 vowel sounds of Somali written in Latin script.' },
  { id: 'l1-greetings', label: 'Greetings', type: 'lesson', level: 1, x: 200, y: 320, status: 'completed', description: 'Common greetings and responses in Somali culture.', lessonsCompleted: 3, lessonsTotal: 3 },
  { id: 'l1-vocative', label: 'Vocative Forms', type: 'concept', level: 1, x: 200, y: 240, status: 'completed', description: 'How to address people directly using vocative particles.' },

  // L2 Noun System
  { id: 'l2-gender', label: 'Gender', type: 'root', level: 2, x: 400, y: 480, status: 'completed', description: 'Masculine and feminine noun classes in Somali.' },
  { id: 'l2-article', label: 'Definite Article', type: 'concept', level: 2, x: 400, y: 400, status: 'completed', description: 'The suffix definite article (-ka/-ga) and its variations.' },
  { id: 'l2-plural', label: 'Plural', type: 'concept', level: 2, x: 400, y: 320, status: 'completed', description: 'Plural formation patterns for Somali nouns.' },
  { id: 'l2-cases', label: 'Cases', type: 'concept', level: 2, x: 400, y: 240, status: 'completed', description: 'Nominal case system: nominative, accusative, genitive.' },
  { id: 'l2-possessive', label: 'Possessive', type: 'concept', level: 2, x: 400, y: 160, status: 'completed', description: 'Expressing possession through suffixes and particles.' },

  // L3 Sentence Core
  { id: 'l3-sov', label: 'SOV Order', type: 'root', level: 3, x: 600, y: 440, status: 'completed', description: 'Somali follows Subject-Object-Verb word order. The verb always comes at the end.' },
  { id: 'l3-pronouns', label: 'Pronouns', type: 'concept', level: 3, x: 600, y: 360, status: 'completed', description: 'Independent and verbal pronouns in Somali.' },
  { id: 'l3-copula', label: 'Copula', type: 'concept', level: 3, x: 600, y: 280, status: 'current', description: 'Building sentences with waa + pronoun constructions.', lessonsCompleted: 2, lessonsTotal: 3 },
  { id: 'l3-negation', label: 'Negation', type: 'concept', level: 3, x: 600, y: 200, status: 'locked', description: 'Forming negative sentences with ma- and other particles.' },
  { id: 'l3-possessive-pro', label: 'Possessive Pronouns', type: 'lesson', level: 3, x: 600, y: 120, status: 'locked', description: 'Pronominal possessive forms and their usage.' },

  // L4 Focus & Questions
  { id: 'l4-focus', label: 'Focus Markers', type: 'root', level: 4, x: 800, y: 440, status: 'locked', description: 'Waxa, baa, ayaa and other focus markers.' },
  { id: 'l4-questions', label: 'Question Words', type: 'concept', level: 4, x: 800, y: 360, status: 'locked', description: 'Interrogative words: maxay, kuma, goorma, etc.' },
  { id: 'l4-yesno', label: 'Yes/No Questions', type: 'concept', level: 4, x: 800, y: 280, status: 'locked', description: 'Forming polar questions with ma and mise.' },
  { id: 'l4-interrogative', label: 'Interrogative Pronouns', type: 'lesson', level: 4, x: 800, y: 200, status: 'locked', description: 'Pronouns used in question formation.' },

  // L5 Verb & Tense
  { id: 'l5-conjugation', label: 'Verb Conjugations', type: 'root', level: 5, x: 1000, y: 480, status: 'locked', description: 'Regular and irregular verb conjugation patterns.' },
  { id: 'l5-imperative', label: 'Imperative', type: 'concept', level: 5, x: 1000, y: 400, status: 'locked', description: 'Command forms and imperative constructions.' },
  { id: 'l5-past', label: 'Past Tense', type: 'concept', level: 5, x: 1000, y: 320, status: 'locked', description: 'Past tense verb forms and their usage.' },
  { id: 'l5-present', label: 'Present Tense', type: 'concept', level: 5, x: 1000, y: 240, status: 'locked', description: 'Habitual and continuous present forms.' },
  { id: 'l5-future', label: 'Future Tense', type: 'concept', level: 5, x: 1000, y: 160, status: 'locked', description: 'Expressing future actions in Somali.' },

  // L6 Space & Modifiers
  { id: 'l6-prepositions', label: 'Prepositions', type: 'root', level: 6, x: 1200, y: 480, status: 'locked', description: 'Locational and directional prepositions.' },
  { id: 'l6-directional', label: 'Directional Particles', type: 'concept', level: 6, x: 1200, y: 400, status: 'locked', description: 'Particles indicating direction and movement.' },
  { id: 'l6-adjectives', label: 'Adjectives', type: 'concept', level: 6, x: 1200, y: 320, status: 'locked', description: 'Attributive and predicative adjective forms.' },
  { id: 'l6-adverbs', label: 'Adverbs', type: 'concept', level: 6, x: 1200, y: 240, status: 'locked', description: 'Manner, time, and place adverbs.' },
  { id: 'l6-demonstratives', label: 'Demonstratives', type: 'concept', level: 6, x: 1200, y: 160, status: 'locked', description: 'This/that/these/those in Somali.' },

  // L7 Complex Grammar
  { id: 'l7-relative', label: 'Relative Clauses', type: 'root', level: 7, x: 1400, y: 480, status: 'locked', description: 'Forming relative clauses with ee and oo.' },
  { id: 'l7-passive', label: 'Passive/Active', type: 'concept', level: 7, x: 1400, y: 400, status: 'locked', description: 'Voice alternations in Somali verbs.' },
  { id: 'l7-conditionals', label: 'Conditionals', type: 'concept', level: 7, x: 1400, y: 320, status: 'locked', description: 'If-then constructions and hypothetical forms.' },
  { id: 'l7-verbal-nouns', label: 'Verbal Nouns', type: 'concept', level: 7, x: 1400, y: 240, status: 'locked', description: 'Nominalized verb forms (masdar).' },
  { id: 'l7-subordinate', label: 'Subordinate Clauses', type: 'concept', level: 7, x: 1400, y: 160, status: 'locked', description: 'Dependent clause types and their markers.' },

  // L8 Mastery
  { id: 'l8-translation', label: 'Complex Translation', type: 'root', level: 8, x: 1600, y: 400, status: 'locked', description: 'Translating complex texts between English and Somali.' },
  { id: 'l8-narrative', label: 'Narrative Building', type: 'concept', level: 8, x: 1600, y: 320, status: 'locked', description: 'Constructing extended narratives in Somali.' },
  { id: 'l8-composition', label: 'Free Composition', type: 'concept', level: 8, x: 1600, y: 240, status: 'locked', description: 'Writing original compositions without prompts.' },
  { id: 'l8-cultural', label: 'Cultural Context', type: 'lesson', level: 8, x: 1600, y: 160, status: 'locked', description: 'Understanding cultural nuances in Somali expression.' },
];

export const graphEdges: GraphEdge[] = [
  // L1 connections
  { id: 'e1', source: 'l1-alphabet', target: 'l1-greetings', type: 'required' },
  { id: 'e2', source: 'l1-greetings', target: 'l1-vocative', type: 'required' },
  { id: 'e3', source: 'l1-alphabet', target: 'l2-gender', type: 'required' },

  // L2 connections
  { id: 'e4', source: 'l2-gender', target: 'l2-article', type: 'required' },
  { id: 'e5', source: 'l2-article', target: 'l2-plural', type: 'required' },
  { id: 'e6', source: 'l2-plural', target: 'l2-cases', type: 'required' },
  { id: 'e7', source: 'l2-cases', target: 'l2-possessive', type: 'recommended' },
  { id: 'e8', source: 'l2-gender', target: 'l3-pronouns', type: 'required' },

  // L3 connections
  { id: 'e9', source: 'l1-alphabet', target: 'l3-sov', type: 'required' },
  { id: 'e10', source: 'l3-sov', target: 'l3-pronouns', type: 'required' },
  { id: 'e11', source: 'l3-pronouns', target: 'l3-copula', type: 'required' },
  { id: 'e12', source: 'l3-copula', target: 'l3-negation', type: 'required' },
  { id: 'e13', source: 'l3-negation', target: 'l3-possessive-pro', type: 'recommended' },
  { id: 'e14', source: 'l2-possessive', target: 'l3-possessive-pro', type: 'required' },
  { id: 'e15', source: 'l3-sov', target: 'l4-focus', type: 'required' },

  // L4 connections
  { id: 'e16', source: 'l4-focus', target: 'l4-questions', type: 'required' },
  { id: 'e17', source: 'l4-questions', target: 'l4-yesno', type: 'required' },
  { id: 'e18', source: 'l4-yesno', target: 'l4-interrogative', type: 'recommended' },
  { id: 'e19', source: 'l3-copula', target: 'l4-yesno', type: 'required' },
  { id: 'e20', source: 'l3-negation', target: 'l5-conjugation', type: 'required' },

  // L5 connections
  { id: 'e21', source: 'l5-conjugation', target: 'l5-imperative', type: 'required' },
  { id: 'e22', source: 'l5-imperative', target: 'l5-past', type: 'required' },
  { id: 'e23', source: 'l5-past', target: 'l5-present', type: 'required' },
  { id: 'e24', source: 'l5-present', target: 'l5-future', type: 'required' },
  { id: 'e25', source: 'l5-present', target: 'l6-prepositions', type: 'required' },

  // L6 connections
  { id: 'e26', source: 'l6-prepositions', target: 'l6-directional', type: 'required' },
  { id: 'e27', source: 'l6-directional', target: 'l6-adjectives', type: 'required' },
  { id: 'e28', source: 'l6-adjectives', target: 'l6-adverbs', type: 'recommended' },
  { id: 'e29', source: 'l6-adverbs', target: 'l6-demonstratives', type: 'recommended' },
  { id: 'e30', source: 'l6-adjectives', target: 'l7-relative', type: 'required' },

  // L7 connections
  { id: 'e31', source: 'l7-relative', target: 'l7-passive', type: 'required' },
  { id: 'e32', source: 'l7-passive', target: 'l7-conditionals', type: 'required' },
  { id: 'e33', source: 'l7-conditionals', target: 'l7-verbal-nouns', type: 'recommended' },
  { id: 'e34', source: 'l7-verbal-nouns', target: 'l7-subordinate', type: 'recommended' },
  { id: 'e35', source: 'l7-subordinate', target: 'l8-translation', type: 'required' },

  // L8 connections
  { id: 'e36', source: 'l8-translation', target: 'l8-narrative', type: 'required' },
  { id: 'e37', source: 'l8-narrative', target: 'l8-composition', type: 'required' },
  { id: 'e38', source: 'l8-composition', target: 'l8-cultural', type: 'recommended' },
];

export const levelLessons: Record<number, LessonDetail[]> = {
  1: [
    { id: 'l1-les1', nodeId: 'l1-alphabet', title: 'Somali Alphabet', description: 'Learn the 26 letters and their sounds', duration: '5 min', status: 'completed', stars: 3, prerequisites: [], unlocks: ['l1-greetings'] },
    { id: 'l1-les2', nodeId: 'l1-greetings', title: 'Greetings & Introductions', description: 'Common greetings and responses', duration: '4 min', status: 'completed', stars: 3, prerequisites: ['Somali Alphabet'], unlocks: ['Vocative Forms'] },
    { id: 'l1-les3', nodeId: 'l1-vocative', title: 'Vocative Forms', description: 'Addressing people directly', duration: '5 min', status: 'completed', stars: 2, prerequisites: ['Greetings'], unlocks: ['Gender'] },
  ],
  2: [
    { id: 'l2-les1', nodeId: 'l2-gender', title: 'Noun Gender', description: 'Masculine and feminine nouns', duration: '6 min', status: 'completed', stars: 3, prerequisites: ['Somali Alphabet'], unlocks: ['Definite Article'] },
    { id: 'l2-les2', nodeId: 'l2-article', title: 'Definite Article', description: 'The -ka/-ga suffix article', duration: '5 min', status: 'completed', stars: 3, prerequisites: ['Noun Gender'], unlocks: ['Plural Formation'] },
    { id: 'l2-les3', nodeId: 'l2-plural', title: 'Plural Formation', description: 'Forming plural nouns', duration: '6 min', status: 'completed', stars: 2, prerequisites: ['Definite Article'], unlocks: ['Noun Cases'] },
    { id: 'l2-les4', nodeId: 'l2-cases', title: 'Noun Cases', description: 'Nominative, accusative, genitive', duration: '7 min', status: 'completed', stars: 3, prerequisites: ['Plural Formation'], unlocks: ['Possessive Forms'] },
  ],
  3: [
    { id: 'l3-les1', nodeId: 'l3-sov', title: 'SOV Word Order', description: 'Master the Subject-Object-Verb structure', duration: '5 min', status: 'completed', stars: 3, prerequisites: ['Somali Alphabet', 'Noun Gender'], unlocks: ['Personal Pronouns'] },
    { id: 'l3-les2', nodeId: 'l3-pronouns', title: 'Personal Pronouns', description: 'Independent and verbal pronouns', duration: '4 min', status: 'completed', stars: 2, prerequisites: ['SOV Word Order'], unlocks: ['Copula Constructions'] },
    { id: 'l3-les3', nodeId: 'l3-copula', title: 'Copula Constructions', description: 'Build sentences with waa + pronoun', duration: '6 min', status: 'current', prerequisites: ['Personal Pronouns'], unlocks: ['Negation Patterns'] },
    { id: 'l3-les4', nodeId: 'l3-negation', title: 'Negation Patterns', description: 'Form negative sentences with ma-', duration: '5 min', status: 'locked', prerequisites: ['Copula Constructions'], unlocks: ['Possessive Pronouns'] },
  ],
  4: [
    { id: 'l4-les1', nodeId: 'l4-focus', title: 'Focus Markers', description: 'Waxa, baa, ayaa focus constructions', duration: '7 min', status: 'locked', prerequisites: ['SOV Word Order'], unlocks: ['Question Words'] },
    { id: 'l4-les2', nodeId: 'l4-questions', title: 'Question Words', description: 'Maxay, kuma, goorma, etc.', duration: '5 min', status: 'locked', prerequisites: ['Focus Markers'], unlocks: ['Yes/No Questions'] },
    { id: 'l4-les3', nodeId: 'l4-yesno', title: 'Yes/No Questions', description: 'Polar questions with ma and mise', duration: '6 min', status: 'locked', prerequisites: ['Question Words'], unlocks: ['Interrogative Pronouns'] },
    { id: 'l4-les4', nodeId: 'l4-interrogative', title: 'Interrogative Pronouns', description: 'Pronouns in question formation', duration: '5 min', status: 'locked', prerequisites: ['Yes/No Questions'], unlocks: [] },
  ],
  5: [
    { id: 'l5-les1', nodeId: 'l5-conjugation', title: 'Verb Conjugations', description: 'Regular and irregular verb patterns', duration: '8 min', status: 'locked', prerequisites: ['Negation Patterns'], unlocks: ['Imperative Mood'] },
    { id: 'l5-les2', nodeId: 'l5-imperative', title: 'Imperative Mood', description: 'Command forms and requests', duration: '5 min', status: 'locked', prerequisites: ['Verb Conjugations'], unlocks: ['Past Tense'] },
    { id: 'l5-les3', nodeId: 'l5-past', title: 'Past Tense', description: 'Completed actions and past narratives', duration: '7 min', status: 'locked', prerequisites: ['Imperative Mood'], unlocks: ['Present Tense'] },
    { id: 'l5-les4', nodeId: 'l5-present', title: 'Present Tense', description: 'Habitual and continuous actions', duration: '6 min', status: 'locked', prerequisites: ['Past Tense'], unlocks: ['Future Tense'] },
  ],
  6: [
    { id: 'l6-les1', nodeId: 'l6-prepositions', title: 'Prepositions', description: 'Locational prepositions', duration: '6 min', status: 'locked', prerequisites: ['Present Tense'], unlocks: ['Directional Particles'] },
    { id: 'l6-les2', nodeId: 'l6-directional', title: 'Directional Particles', description: 'Movement and direction markers', duration: '5 min', status: 'locked', prerequisites: ['Prepositions'], unlocks: ['Adjectives'] },
    { id: 'l6-les3', nodeId: 'l6-adjectives', title: 'Adjectives', description: 'Attributive and predicative forms', duration: '6 min', status: 'locked', prerequisites: ['Directional Particles'], unlocks: ['Adverbs'] },
    { id: 'l6-les4', nodeId: 'l6-adverbs', title: 'Adverbs', description: 'Manner, time, and place adverbs', duration: '5 min', status: 'locked', prerequisites: ['Adjectives'], unlocks: ['Demonstratives'] },
  ],
  7: [
    { id: 'l7-les1', nodeId: 'l7-relative', title: 'Relative Clauses', description: 'Forming relative clauses', duration: '8 min', status: 'locked', prerequisites: ['Adjectives'], unlocks: ['Passive/Active Voice'] },
    { id: 'l7-les2', nodeId: 'l7-passive', title: 'Passive/Active Voice', description: 'Voice alternations in Somali', duration: '7 min', status: 'locked', prerequisites: ['Relative Clauses'], unlocks: ['Conditionals'] },
    { id: 'l7-les3', nodeId: 'l7-conditionals', title: 'Conditionals', description: 'If-then constructions', duration: '8 min', status: 'locked', prerequisites: ['Passive/Active Voice'], unlocks: ['Verbal Nouns'] },
    { id: 'l7-les4', nodeId: 'l7-verbal-nouns', title: 'Verbal Nouns', description: 'Nominalized verb forms', duration: '7 min', status: 'locked', prerequisites: ['Conditionals'], unlocks: ['Subordinate Clauses'] },
  ],
  8: [
    { id: 'l8-les1', nodeId: 'l8-translation', title: 'Complex Translation', description: 'Translating complex texts', duration: '10 min', status: 'locked', prerequisites: ['Subordinate Clauses'], unlocks: ['Narrative Building'] },
    { id: 'l8-les2', nodeId: 'l8-narrative', title: 'Narrative Building', description: 'Extended Somali narratives', duration: '10 min', status: 'locked', prerequisites: ['Complex Translation'], unlocks: ['Free Composition'] },
  ],
};
