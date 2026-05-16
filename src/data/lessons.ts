export type ExerciseType =
  | 'sentence-constructor'
  | 'multiple-choice'
  | 'audio-transcription'
  | 'fill-in-blank'
  | 'focus-marker'
  | 'verb-conjugation'
  | 'translation-match'
  | 'listening-selection';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  subText?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  audioUrl?: string;
  wordBank?: string[];
  leftColumn?: string[];
  rightColumn?: string[];
}

export interface Lesson {
  id: string;
  title: string;
  level: number;
  levelName: string;
  order: number;
  description: string;
  estimatedMinutes: number;
  exercises: Exercise[];
  color: string;
}

export const levels = [
  { num: 1, name: 'Foundations', color: '#22c55e' },
  { num: 2, name: 'Noun System', color: '#3b82f6' },
  { num: 3, name: 'Sentence Core', color: '#eab308' },
  { num: 4, name: 'Focus & Questions', color: '#a855f7' },
  { num: 5, name: 'Verb & Tense', color: '#ef4444' },
  { num: 6, name: 'Space & Modifiers', color: '#22d3ee' },
  { num: 7, name: 'Complex Grammar', color: '#ec4899' },
  { num: 8, name: 'Mastery', color: '#f59e0b' },
];

const lessonsData: Omit<Lesson, 'exercises'>[] = [
  // Level 1 — Foundations (4 lessons)
  { id: 'l1-1', title: 'Greetings and Introductions', level: 1, levelName: 'Foundations', order: 1, description: 'Learn how to greet people and introduce yourself in Somali.', estimatedMinutes: 5, color: '#22c55e' },
  { id: 'l1-2', title: 'The Somali Alphabet & Sounds', level: 1, levelName: 'Foundations', order: 2, description: 'Master Somali pronunciation including special sounds like kh, q, x, dh.', estimatedMinutes: 5, color: '#22c55e' },
  { id: 'l1-3', title: 'Numbers & Counting', level: 1, levelName: 'Foundations', order: 3, description: 'Learn cardinal numbers and basic counting in Somali.', estimatedMinutes: 5, color: '#22c55e' },
  { id: 'l1-4', title: 'Common Phrases', level: 1, levelName: 'Foundations', order: 4, description: 'Essential everyday phrases for basic communication.', estimatedMinutes: 5, color: '#22c55e' },
  // Level 2 — Noun System (4 lessons)
  { id: 'l2-1', title: 'Noun Gender: Masculine & Feminine', level: 2, levelName: 'Noun System', order: 5, description: 'Understand how Somali nouns are classified by gender.', estimatedMinutes: 6, color: '#3b82f6' },
  { id: 'l2-2', title: 'Definite Articles: -ka/-ta', level: 2, levelName: 'Noun System', order: 6, description: 'Learn how to attach definite articles to nouns.', estimatedMinutes: 6, color: '#3b82f6' },
  { id: 'l2-3', title: 'Plural Formation', level: 2, levelName: 'Noun System', order: 7, description: 'Master the patterns for forming plural nouns in Somali.', estimatedMinutes: 6, color: '#3b82f6' },
  { id: 'l2-4', title: 'Possessive Constructions', level: 2, levelName: 'Noun System', order: 8, description: 'Express ownership and possession with Somali nouns.', estimatedMinutes: 6, color: '#3b82f6' },
  // Level 3 — Sentence Core (4 lessons)
  { id: 'l3-1', title: 'Subject Pronouns', level: 3, levelName: 'Sentence Core', order: 9, description: 'Learn the Somali subject pronouns: aniga, adiga, uu, iyada, etc.', estimatedMinutes: 6, color: '#eab308' },
  { id: 'l3-2', title: 'Basic Word Order (SOV)', level: 3, levelName: 'Sentence Core', order: 10, description: 'Understand Somali Subject-Object-Verb sentence structure.', estimatedMinutes: 6, color: '#eab308' },
  { id: 'l3-3', title: 'The Copula: waa & yahay', level: 3, levelName: 'Sentence Core', order: 11, description: 'Learn how to say "is/am/are" and make simple statements.', estimatedMinutes: 7, color: '#eab308' },
  { id: 'l3-4', title: 'Negation with ma & aan', level: 3, levelName: 'Sentence Core', order: 12, description: 'How to form negative sentences in Somali.', estimatedMinutes: 7, color: '#eab308' },
  // Level 4 — Focus & Questions (4 lessons)
  { id: 'l4-1', title: 'Focus Markers: baa & ayaa', level: 4, levelName: 'Focus & Questions', order: 13, description: 'Master the essential Somali focus markers for emphasis.', estimatedMinutes: 7, color: '#a855f7' },
  { id: 'l4-2', title: 'Question Words: maxaa, kuma, goorma', level: 4, levelName: 'Focus & Questions', order: 14, description: 'Learn the key question words and how to form questions.', estimatedMinutes: 7, color: '#a855f7' },
  { id: 'l4-3', title: 'Yes/No Questions: miyaa', level: 4, levelName: 'Focus & Questions', order: 15, description: 'Form yes/no questions using the miyaa suffix.', estimatedMinutes: 7, color: '#a855f7' },
  { id: 'l4-4', title: 'Topic Markers: waxa(a)', level: 4, levelName: 'Focus & Questions', order: 16, description: 'Learn the waxaa topic marker construction.', estimatedMinutes: 7, color: '#a855f7' },
  // Level 5 — Verb & Tense (4 lessons)
  { id: 'l5-1', title: 'Present Habitual Tense', level: 5, levelName: 'Verb & Tense', order: 17, description: 'Express habitual actions using -aa/-taa endings.', estimatedMinutes: 8, color: '#ef4444' },
  { id: 'l5-2', title: 'Past Tense Formation', level: 5, levelName: 'Verb & Tense', order: 18, description: 'Learn how to conjugate verbs in the past tense.', estimatedMinutes: 8, color: '#ef4444' },
  { id: 'l5-3', title: 'Future Tense & jir/jiri', level: 5, levelName: 'Verb & Tense', order: 19, description: 'Express future actions and intentions.', estimatedMinutes: 8, color: '#ef4444' },
  { id: 'l5-4', title: 'Imperative & Commands', level: 5, levelName: 'Verb & Tense', order: 20, description: 'Give orders and make requests in Somali.', estimatedMinutes: 8, color: '#ef4444' },
  // Level 6 — Space & Modifiers (4 lessons)
  { id: 'l6-1', title: 'Prepositions of Place', level: 6, levelName: 'Space & Modifiers', order: 21, description: 'Learn ku, ka, u, la and other key prepositions.', estimatedMinutes: 8, color: '#22d3ee' },
  { id: 'l6-2', title: 'Adjectives & Describing', level: 6, levelName: 'Space & Modifiers', order: 22, description: 'Use adjectives and describe people, places, and things.', estimatedMinutes: 8, color: '#22d3ee' },
  { id: 'l6-3', title: 'Demonstratives: kan, tan, kuwaas', level: 6, levelName: 'Space & Modifiers', order: 23, description: 'Point to and identify things with demonstratives.', estimatedMinutes: 8, color: '#22d3ee' },
  { id: 'l6-4', title: 'Relative Clauses', level: 6, levelName: 'Space & Modifiers', order: 24, description: 'Form complex descriptions using relative clauses.', estimatedMinutes: 8, color: '#22d3ee' },
  // Level 7 — Complex Grammar (4 lessons)
  { id: 'l7-1', title: 'Conditional Sentences', level: 7, levelName: 'Complex Grammar', order: 25, description: 'Express conditions with "if" constructions: haddii.', estimatedMinutes: 10, color: '#ec4899' },
  { id: 'l7-2', title: 'Subjunctive Mood', level: 7, levelName: 'Complex Grammar', order: 26, description: 'Express wishes, doubts, and hypothetical situations.', estimatedMinutes: 10, color: '#ec4899' },
  { id: 'l7-3', title: 'Passive Voice', level: 7, levelName: 'Complex Grammar', order: 27, description: 'Form passive constructions in Somali.', estimatedMinutes: 10, color: '#ec4899' },
  { id: 'l7-4', title: 'Idiomatic Expressions', level: 7, levelName: 'Complex Grammar', order: 28, description: 'Master common Somali idioms and proverbs.', estimatedMinutes: 10, color: '#ec4899' },
  // Level 8 — Mastery (2 lessons)
  { id: 'l8-1', title: 'Complex Narratives', level: 8, levelName: 'Mastery', order: 29, description: 'Build complex stories and narratives in Somali.', estimatedMinutes: 12, color: '#f59e0b' },
  { id: 'l8-2', title: 'Formal & Written Somali', level: 8, levelName: 'Mastery', order: 30, description: 'Master formal registers and written Somali grammar.', estimatedMinutes: 12, color: '#f59e0b' },
];

const exerciseTemplates: Record<string, Exercise[]> = {
  'l1-1': [
    { id: 'e1', type: 'multiple-choice', question: 'Good morning', options: ['Subax wanaagsan', 'Habeen wanaagsan', 'Galab wanaagsan', 'Fiid wanaagsan'], correctAnswer: 'Subax wanaagsan', explanation: 'Subax means morning, wanaagsan means good.', difficulty: 'easy' },
    { id: 'e2', type: 'sentence-constructor', question: 'How are you?', options: [], wordBank: ['Isha', 'kumun', 'tahay?', 'sidee'], correctAnswer: 'sidee kumun tahay?', explanation: 'Sidee kumun tahay? is the standard Somali greeting for "How are you?"', difficulty: 'easy' },
    { id: 'e3', type: 'translation-match', question: 'Match the greetings:', options: [], leftColumn: ['Is ka warran', 'Nabad', 'Subax wanaagsan', 'Waan fiicanahay'], rightColumn: ['How are you', "I'm fine / Peace", 'Good morning', 'I am good'], correctAnswer: 'Is ka warran:How are you,Nabad:I\'m fine / Peace,Subax wanaagsan:Good morning,Waan fiicanahay:I am good', explanation: 'These are fundamental Somali greetings used daily.', difficulty: 'easy' },
    { id: 'e4', type: 'fill-in-blank', question: '___ wanaagsan. (Good morning)', options: ['Habeen', 'Galab', 'Fiid', 'Subax'], correctAnswer: 'Subax', explanation: 'Subax wanaagsan = Good morning. Subax specifically means morning.', difficulty: 'easy' },
    { id: 'e5', type: 'multiple-choice', question: 'Thank you', options: ['Waan ku salaamanay', 'Mahadsanid', 'Nabad gelyo', 'Is ka warran'], correctAnswer: 'Mahadsanid', explanation: 'Mahadsanid is the standard way to say "thank you" in Somali.', difficulty: 'easy' },
  ],
  'l1-2': [
    { id: 'e1', type: 'multiple-choice', question: 'Which sound does "kh" represent?', options: ['A deep throat sound like in loch', 'A soft h sound', 'A k sound', 'A ch sound like in church'], correctAnswer: 'A deep throat sound like in loch', explanation: 'The Somali "kh" represents a voiceless velar fricative, similar to Scottish "loch".', difficulty: 'easy' },
    { id: 'e2', type: 'fill-in-blank', question: 'The Somali "x" sounds like the "ch" in ___ (German).', options: ['Bach', 'Mich', 'Doch', 'Nach'], correctAnswer: 'Bach', explanation: 'Somali "x" is a voiceless pharyngeal fricative, similar to "ch" in German "Bach".', difficulty: 'medium' },
    { id: 'e3', type: 'audio-transcription', question: 'Listen and type what you hear', options: [], correctAnswer: 'Subax wanaagsan', explanation: 'Subax wanaagsan = Good morning', difficulty: 'easy' },
    { id: 'e4', type: 'multiple-choice', question: 'The letter "dh" in Somali represents:', options: ['A regular d sound', 'An implosive d sound', 'A th sound', 'A z sound'], correctAnswer: 'An implosive d sound', explanation: '"dh" represents an implosive dental stop, a distinctive Somali sound.', difficulty: 'medium' },
  ],
  'l1-3': [
    { id: 'e1', type: 'multiple-choice', question: 'One', options: ['Toddoba', 'Saddex', 'Kow', 'Shan'], correctAnswer: 'Kow', explanation: 'Kow = One in Somali.', difficulty: 'easy' },
    { id: 'e2', type: 'fill-in-blank', question: 'Toddoba + labo = ___', options: ['Sideed', 'Toddoba', 'Sagaal', 'Toban'], correctAnswer: 'Sagaal', explanation: 'Toddoba (7) + labo (2) = sagaal (9).', difficulty: 'easy' },
    { id: 'e3', type: 'sentence-constructor', question: 'I have three books', options: [], wordBank: ['buug', 'Labad', 'ahay', 'waxaan', 'leeyahay', 'saddex'], correctAnswer: 'waxaan leeyahay saddex buug', explanation: 'Waxaan leeyahay = I have, saddex = three, buug = book(s).', difficulty: 'medium' },
  ],
  'l1-4': [
    { id: 'e1', type: 'multiple-choice', question: 'Goodbye', options: ['Nabad gelyo', 'Is arag', 'Mahadsanid', 'Haa'], correctAnswer: 'Nabad gelyo', explanation: 'Nabad gelyo literally means "go with peace" - the standard goodbye.', difficulty: 'easy' },
    { id: 'e2', type: 'fill-in-blank', question: '___ gelyo. (Go with peace / Goodbye)', options: ['Nabad', 'Habeen', 'Subax', 'Fiid'], correctAnswer: 'Nabad', explanation: 'Nabad gelyo = Go with peace / Goodbye.', difficulty: 'easy' },
    { id: 'e3', type: 'translation-match', question: 'Match the phrases:', options: [], leftColumn: ['Haa', 'Maya', 'Mahadsanid', 'Waan ku filanahay'], rightColumn: ['Yes', 'No', 'Thank you', 'You are welcome'], correctAnswer: 'Haa:Yes,Maya:No,Mahadsanid:Thank you,Waan ku filanahay:You are welcome', explanation: 'These are essential everyday Somali phrases.', difficulty: 'easy' },
  ],
  'l2-1': [
    { id: 'e1', type: 'multiple-choice', question: 'Which noun is masculine?', options: ['naag (woman)', 'gabar (girl)', 'wiil (boy)', 'hooyo (mother)'], correctAnswer: 'wiil (boy)', explanation: 'Wiil (boy) is masculine. Most animate male beings are masculine gender.', difficulty: 'easy' },
    { id: 'e2', type: 'fill-in-blank', question: '___ (the man) — masculine noun with definite article.', options: ['ninkii', 'ninka', 'naagta', 'gabarta'], correctAnswer: 'ninka', explanation: 'Ninka = the man (root: nin + ka = masculine definite article).', difficulty: 'medium' },
    { id: 'e3', type: 'multiple-choice', question: 'The Somali word for "the woman" is:', options: ['ninka', 'naagta', 'naag', 'naagka'], correctAnswer: 'naagta', explanation: 'Naagta = the woman. Feminine nouns take -ta as the definite article.', difficulty: 'easy' },
  ],
  'l2-2': [
    { id: 'e1', type: 'sentence-constructor', question: 'The book (buug)', options: [], wordBank: ['-ta', 'buug', '-ka'], correctAnswer: 'buug-ka', explanation: 'Buug (book) is masculine, so it takes -ka for the definite article: buug-ka (the book).', difficulty: 'easy' },
    { id: 'e2', type: 'fill-in-blank', question: 'The table (miis) — miis___', options: ['-ta', '-ka', '-tu', '-ki'], correctAnswer: '-ka', explanation: 'Miis (table) is masculine, so: miis-ka (the table).', difficulty: 'easy' },
    { id: 'e3', type: 'multiple-choice', question: 'Which definite article attaches to feminine nouns?', options: ['-ka', '-ku', '-ta', '-ki'], correctAnswer: '-ta', explanation: 'Feminine nouns take -ta as the definite article (e.g., naag-ta, guri-ga).', difficulty: 'easy' },
  ],
  'l2-3': [
    { id: 'e1', type: 'multiple-choice', question: 'What is the plural of "buug" (book)?', options: ['buugag', 'buugyo', 'buugyada', 'buugga'], correctAnswer: 'buugag', explanation: 'Buugag is the plural of buug (book) following the -ag plural pattern.', difficulty: 'medium' },
    { id: 'e2', type: 'fill-in-blank', question: 'The plural of "naag" (woman) is "naag___."', options: ['-o', '-ag', '-yo', '-yal'], correctAnswer: '-o', explanation: 'Naago = women. Many feminine nouns pluralize with -o.', difficulty: 'medium' },
  ],
  'l2-4': [
    { id: 'e1', type: 'sentence-constructor', question: 'My book', options: [], wordBank: ['-ga', 'buugg', '-ay'], correctAnswer: 'buugg-ay-ga', explanation: 'Buuggayga = my book. The possessive suffix -ay is inserted before the article.', difficulty: 'medium' },
    { id: 'e2', type: 'fill-in-blank', question: '"His book" in Somali is "buugg___".', options: ['-iis', '-iisa', '-iisii', '-iisuu'], correctAnswer: '-iisa', explanation: 'Buuggiisa = his book. The 3rd person masculine possessive is -iis- + article.', difficulty: 'hard' },
  ],
  'l3-1': [
    { id: 'e1', type: 'multiple-choice', question: '"I" in Somali is:', options: ['adiga', 'aniga', 'iyaga', 'annaga'], correctAnswer: 'aniga', explanation: 'Aniga = I/me (1st person singular pronoun).', difficulty: 'easy' },
    { id: 'e2', type: 'translation-match', question: 'Match the pronouns:', options: [], leftColumn: ['aniga', 'adiga', 'uu', 'iyada'], rightColumn: ['I / me', 'you (singular)', 'he / him', 'she / her'], correctAnswer: 'aniga:I / me,adiga:you (singular),uu:he / him,iyada:she / her', explanation: 'These are the basic Somali subject pronouns.', difficulty: 'easy' },
    { id: 'e3', type: 'fill-in-blank', question: '___ waa arday. (I am a student.)', options: ['Adiga', 'Aniga', 'Iyada', 'Uu'], correctAnswer: 'Aniga', explanation: 'Aniga waa arday = I am a student.', difficulty: 'easy' },
  ],
  'l3-2': [
    { id: 'e1', type: 'sentence-constructor', question: 'Ali ate food', options: [], wordBank: ['cuntay', 'cunto', 'Cali'], correctAnswer: 'Cali cunto cuntay', explanation: 'SOV order: Cali (subject) + cunto (object) + cuntay (verb).', difficulty: 'medium' },
    { id: 'e2', type: 'multiple-choice', question: 'Somali word order is:', options: ['Subject-Verb-Object (SVO)', 'Verb-Subject-Object (VSO)', 'Subject-Object-Verb (SOV)', 'Object-Verb-Subject (OVS)'], correctAnswer: 'Subject-Object-Verb (SOV)', explanation: 'Somali follows SOV word order, unlike English which is SVO.', difficulty: 'easy' },
  ],
  'l3-3': [
    { id: 'e1', type: 'fill-in-blank', question: 'Aniga waa arday ___. (I am a student.)', options: ['baa', 'yahay', 'ayaa', 'waxa'], correctAnswer: 'yahay', explanation: 'Yahay is the copula meaning "am/is/are" in the present tense.', difficulty: 'easy' },
    { id: 'e2', type: 'multiple-choice', question: '"Waa" is used for:', options: ['Negation', 'Focus/emphasis', 'Questions', 'Past tense'], correctAnswer: 'Focus/emphasis', explanation: 'Waa is a focus marker used for neutral, positive statements.', difficulty: 'medium' },
  ],
  'l3-4': [
    { id: 'e1', type: 'fill-in-blank', question: 'Aniga ma arday ___ (I am not a student.)', options: ['yahay', 'ahay', 'ahayn', 'yahayayn'], correctAnswer: 'ahayn', explanation: 'Negation uses ma ... ahayn pattern: Aniga ma arday ahayn.', difficulty: 'medium' },
    { id: 'e2', type: 'sentence-constructor', question: 'I do not eat food', options: [], wordBank: ['cunto', 'cunin', 'waxaan', 'aan', 'ma'], correctAnswer: 'waxaan ma cuno cunin', explanation: 'Waxaan ma ... cunin is the negative present construction.', difficulty: 'hard' },
  ],
  'l4-1': [
    { id: 'e1', type: 'focus-marker', question: 'Add the focus marker to emphasize "Ali":', options: [], wordBank: ['wuxuu', 'tagay', 'Cali', 'suuqa', 'baa', 'ayaa'], correctAnswer: 'Cali baa wuxuu tagay suuqa', explanation: 'baa focuses on the noun immediately preceding it. Cali baa = It was Ali who...', difficulty: 'medium' },
    { id: 'e2', type: 'multiple-choice', question: 'The focus marker "baa" is placed:', options: ['At the beginning of the sentence', 'After the focused noun', 'Before the verb', 'At the end of the sentence'], correctAnswer: 'After the focused noun', explanation: 'baa immediately follows the noun being focused: NOUN baa ...', difficulty: 'easy' },
    { id: 'e3', type: 'fill-in-blank', question: 'Ali ___ wuxuu tagay suuqa. (It was Ali who went to the market)', options: ['ayaa', 'baa', 'waxa', 'miyaa'], correctAnswer: 'baa', explanation: 'Cali baa wuxuu tagay suuqa = It was Ali (not someone else) who went to the market.', difficulty: 'medium' },
  ],
  'l4-2': [
    { id: 'e1', type: 'multiple-choice', question: '"What" in Somali is:', options: ['Kuma', 'Goorma', 'Maxaa', 'Xagge'], correctAnswer: 'Maxaa', explanation: 'Maxaa = What. Used as a question word in Somali.', difficulty: 'easy' },
    { id: 'e2', type: 'fill-in-blank', question: '___ waxaad samaynaysaa? (What are you doing?)', options: ['Kuma', 'Goorma', 'Maxaa', 'Sidee'], correctAnswer: 'Maxaa', explanation: 'Maxaa waxaad samaynaysaa? = What are you doing?', difficulty: 'easy' },
    { id: 'e3', type: 'translation-match', question: 'Match the question words:', options: [], leftColumn: ['Maxaa', 'Kuma', 'Goorma', 'Sidee'], rightColumn: ['What', 'Who', 'When', 'How'], correctAnswer: 'Maxaa:What,Kuma:Who,Goorma:When,Sidee:How', explanation: 'These are the most common Somali question words.', difficulty: 'easy' },
  ],
  'l4-3': [
    { id: 'e1', type: 'multiple-choice', question: '"Miyaa" is used to form:', options: ['Wh-questions', 'Yes/No questions', 'Commands', 'Exclamations'], correctAnswer: 'Yes/No questions', explanation: 'Miyaa is the yes/no question marker attached to the end of statements.', difficulty: 'easy' },
    { id: 'e2', type: 'fill-in-blank', question: 'Waa arday ___? (Is he a student?)', options: ['maxaa', 'miyaa', 'kuma', 'goorma'], correctAnswer: 'miyaa', explanation: 'Waa arday miyaa? = Is he a student? (Yes/No question)', difficulty: 'easy' },
  ],
  'l4-4': [
    { id: 'e1', type: 'sentence-constructor', question: 'What I want is peace', options: [], wordBank: ['rabbo', 'Nabad', 'ah', 'waxaan', 'waa'], correctAnswer: 'waxaan rabbo waa nabad', explanation: 'Waxaan rabbo waa nabad = What I want is peace. Waxaa introduces a topic.', difficulty: 'hard' },
    { id: 'e2', type: 'fill-in-blank', question: '___ ayaa aan rabbo. (What I want is ___)', options: ['Waxa', 'Waxaan', 'Waxaa', 'Waxay'], correctAnswer: 'Waxaan', explanation: 'Waxaan rabbo... = What I want... The topic marker waxaan introduces the subject.', difficulty: 'hard' },
  ],
  'l5-1': [
    { id: 'e1', type: 'verb-conjugation', question: "Conjugate 'keen' (bring) for 'we' in present habitual:", options: [], correctAnswer: 'keennaa', explanation: 'Keennaa = we bring. Present habitual for "we" uses -naa ending.', difficulty: 'medium' },
    { id: 'e2', type: 'fill-in-blank', question: 'Aniga waxaan cun___ cunto. (I eat food - present habitual)', options: ['-ay', '-aa', '-taa', '-naa'], correctAnswer: '-aa', explanation: 'Waxaan cunaa cunto = I eat food. 1st person singular present habitual uses -aa.', difficulty: 'medium' },
    { id: 'e3', type: 'multiple-choice', question: '"He brings" in present habitual is:', options: ['uu keenaa', 'uu keenay', 'uu keenaya', 'uu keenayaa'], correctAnswer: 'uu keenaa', explanation: 'Uu keenaa = he brings. 3rd person masculine singular uses -aa.', difficulty: 'medium' },
  ],
  'l5-2': [
    { id: 'e1', type: 'fill-in-blank', question: 'Aniga waxaan cuntay cunto. (I ___ food.)', options: ['eat', 'ate', 'will eat', 'am eating'], correctAnswer: 'ate', explanation: 'Cuntay is past tense: "I ate food."', difficulty: 'easy' },
    { id: 'e2', type: 'verb-conjugation', question: "Conjugate 'tag' (go) for 'he' in past tense:", options: [], correctAnswer: 'tagay', explanation: 'Uu tagay = he went. Past tense for 3rd person masculine is -ay.', difficulty: 'easy' },
    { id: 'e3', type: 'multiple-choice', question: 'The Somali past tense marker is typically:', options: ['-ay/-ey', '-aa', '-naya', '-jiray'], correctAnswer: '-ay/-ey', explanation: 'Past tense verbs typically end in -ay or -ey.', difficulty: 'easy' },
  ],
  'l5-3': [
    { id: 'e1', type: 'multiple-choice', question: '"I will go" in Somali uses:', options: ['Past tense + waa', 'Waxaan + verb + doonayaa', 'Present tense only', 'Verb + jiray'], correctAnswer: 'Waxaan + verb + doonayaa', explanation: 'Waxaan tag doonayaa = I will go. Future uses doonayaa (want/intend).', difficulty: 'medium' },
    { id: 'e2', type: 'fill-in-blank', question: 'Waxaan cuni ___ cunto. (I will eat food.)', options: ['doonayaa', 'jiray', 'ayaa', 'baa'], correctAnswer: 'doonayaa', explanation: 'Waxaan cuni doonayaa cunto = I will eat food.', difficulty: 'medium' },
  ],
  'l5-4': [
    { id: 'e1', type: 'multiple-choice', question: '"Come!" (singular imperative) is:', options: ['Imow', 'Imoow', 'Yimi', 'Imaanay'], correctAnswer: 'Imoow', explanation: 'Imoow = Come! The imperative often uses a lengthened final vowel.', difficulty: 'medium' },
    { id: 'e2', type: 'fill-in-blank', question: '___! (Go! - singular command)', options: ['Tag', 'Tagay', 'Tagaa', 'Tagi'], correctAnswer: 'Tag', explanation: 'Tag! = Go! Base form is used for singular imperative.', difficulty: 'easy' },
  ],
  'l6-1': [
    { id: 'e1', type: 'multiple-choice', question: '"In" / "at" in Somali (preposition) is:', options: ['ka', 'u', 'ku', 'la'], correctAnswer: 'ku', explanation: 'Ku = in/at. Used for location within something.', difficulty: 'easy' },
    { id: 'e2', type: 'fill-in-blank', question: 'Waxaan ku jiraa ___ guriga. (I am ___ the house.)', options: ['ka', 'ku', 'u', 'la'], correctAnswer: 'ku', explanation: 'Waxaan ku jiraa guriga = I am in the house.', difficulty: 'easy' },
    { id: 'e3', type: 'translation-match', question: 'Match the prepositions:', options: [], leftColumn: ['ku', 'ka', 'u', 'la'], rightColumn: ['in/at', 'from', 'to/for', 'with'], correctAnswer: 'ku:in/at,ka:from,u:to/for,la:with', explanation: 'These are the four most common Somali prepositions.', difficulty: 'easy' },
  ],
  'l6-2': [
    { id: 'e1', type: 'multiple-choice', question: '"Beautiful" in Somali is:', options: ['Weyn', 'Wanaagsan', ' qurux badan', 'Dheer'], correctAnswer: ' qurux badan', explanation: 'Qurux badan = beautiful (literally: having much beauty).', difficulty: 'easy' },
    { id: 'e2', type: 'fill-in-blank', question: 'Guri ___ (a big house)', options: ['weyn', 'wanaagsan', 'qurux badan', 'dheer'], correctAnswer: 'weyn', explanation: 'Guri weyn = a big house. Weyn follows the noun.', difficulty: 'easy' },
  ],
  'l6-3': [
    { id: 'e1', type: 'multiple-choice', question: '"This" (masculine) in Somali is:', options: ['tan', 'kuwan', 'kaas', 'kan'], correctAnswer: 'kan', explanation: 'Kan = this (masculine). Tan = this (feminine).', difficulty: 'easy' },
    { id: 'e2', type: 'fill-in-blank', question: '___ waa buug fiican. (This is a good book.)', options: ['Kan', 'Tan', 'Kuwaas', 'Kuwan'], correctAnswer: 'Kan', explanation: 'Kan waa buug fiican = This is a good book. Buug is masculine, so use kan.', difficulty: 'easy' },
  ],
  'l6-4': [
    { id: 'e1', type: 'sentence-constructor', question: 'The man who came yesterday', options: [], wordBank: ['imid', 'shalay', 'kaas', 'ninka'], correctAnswer: 'ninka kaas imid shalay', explanation: 'Ninka kaas imid shalay = The man who came yesterday. Relative clause follows the noun.', difficulty: 'hard' },
    { id: 'e2', type: 'fill-in-blank', question: 'Ninka ___ cunto waa fiican. (The food that is good)', options: ['kaas', 'ah', 'ka', 'ee'], correctAnswer: 'ee', explanation: 'Ninka ee cunto waa fiican. "ee" introduces a restrictive relative clause.', difficulty: 'hard' },
  ],
  'l7-1': [
    { id: 'e1', type: 'fill-in-blank', question: 'Haddii aan ___ (If I come...)', options: ['imaanayo', 'imaanay', 'imaan', 'imaaday'], correctAnswer: 'imaanayo', explanation: 'Haddii aan imaanaayo = If I come. Subjunctive mood after haddii.', difficulty: 'hard' },
    { id: 'e2', type: 'multiple-choice', question: '"Haddii" means:', options: ['Because', 'Although', 'If', 'When'], correctAnswer: 'If', explanation: 'Haddii = If. Introduces conditional sentences.', difficulty: 'easy' },
  ],
  'l7-2': [
    { id: 'e1', type: 'multiple-choice', question: 'The subjunctive mood in Somali is used for:', options: ['Facts and statements', 'Wishes, doubts, hypotheticals', 'Past events only', 'Commands only'], correctAnswer: 'Wishes, doubts, hypotheticals', explanation: 'Subjunctive expresses non-real or hypothetical situations.', difficulty: 'medium' },
    { id: 'e2', type: 'fill-in-blank', question: 'Waxaan rabaa inaan ___ (I want to go)', options: ['tago', 'tagay', 'tagaa', 'tagayaa'], correctAnswer: 'tago', explanation: 'Waxaan rabaa inaan tago. Inaan + subjunctive (-o ending).', difficulty: 'hard' },
  ],
  'l7-3': [
    { id: 'e1', type: 'multiple-choice', question: 'Passive voice in Somali uses:', options: ['The verb "to be" + past participle', 'A special passive marker la-', 'Word order change only', 'No passive form exists'], correctAnswer: 'A special passive marker la-', explanation: 'Somali uses the impersonal marker "la-" for passive constructions.', difficulty: 'hard' },
    { id: 'e2', type: 'fill-in-blank', question: 'Cunto waa la ___. (Food was eaten.)', options: ['cunay', 'cunaa', 'cunayo', 'cuno'], correctAnswer: 'cunay', explanation: 'Cunto waa la cunay = Food was eaten. "la-" marks passive + past tense.', difficulty: 'hard' },
  ],
  'l7-4': [
    { id: 'e1', type: 'multiple-choice', question: '"Iska daa!" literally means "throw away" but is used to mean:', options: ['Goodbye', 'Stop it! / Leave it!', 'Welcome', 'Thank you'], correctAnswer: 'Stop it! / Leave it!', explanation: 'Iska daa! = Stop it! / Leave it alone! A common idiomatic expression.', difficulty: 'medium' },
    { id: 'e2', type: 'translation-match', question: 'Match the idioms:', options: [], leftColumn: ['Iska daa', 'Waa iska', 'Indho la', 'Af soomaali'], rightColumn: ['Never mind', 'Leave it / Stop it', 'Dear / Beloved', 'Somali language'], correctAnswer: 'Iska daa:Leave it / Stop it,Waa iska:Never mind,Indho la:Dear / Beloved,Af soomaali:Somali language', explanation: 'These are common Somali idiomatic expressions.', difficulty: 'medium' },
  ],
  'l8-1': [
    { id: 'e1', type: 'sentence-constructor', question: 'Yesterday I went to the market and bought food', options: [], wordBank: ['cunto', 'shalay', 'suuqa', 'waxaan', 'tagay', 'iyo', 'ibsanay'], correctAnswer: 'shalay waxaan tagay suuqa waxaanna ibsanay cunto', explanation: 'Complex narrative with two verbs connected by -na (and).', difficulty: 'hard' },
    { id: 'e2', type: 'fill-in-blank', question: 'Shalay waxaan tagay suuqa, ___, waxaan la hadlay saaxiibkay. (Yesterday I went to the market and talked to my friend.)', options: ['dabadedna', 'laakiin', 'ama', 'haddii'], correctAnswer: 'dabadedna', explanation: 'Dabadedna = and then / after that. Used for narrative sequencing.', difficulty: 'hard' },
  ],
  'l8-2': [
    { id: 'e1', type: 'multiple-choice', question: 'Formal Somali often uses more:', options: ['Focus markers', 'Arabic loanwords', 'Passive constructions', 'Short sentences'], correctAnswer: 'Arabic loanwords', explanation: 'Formal/written Somali retains more Arabic vocabulary than colloquial speech.', difficulty: 'hard' },
    { id: 'e2', type: 'fill-in-blank', question: 'In formal Somali, "because" is often "___" (from Arabic).', options: ['sababtoo', 'waayo', 'markaas', 'sidaas'], correctAnswer: 'sababtoo', explanation: 'Sabablo = because (formal/Arabic influence). Colloquial uses "waayo."', difficulty: 'hard' },
  ],
};

// Generate exercises for lessons not explicitly defined
function generateDefaultExercises(lessonId: string, lesson: Omit<Lesson, 'exercises'>): Exercise[] {
  const defaults: Record<string, Exercise[]> = {};
  return defaults[lessonId] || [
    {
      id: 'e1',
      type: 'multiple-choice',
      question: `Complete: ${lesson.title}`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      explanation: `Practice exercise for ${lesson.title}`,
      difficulty: 'easy',
    },
    {
      id: 'e2',
      type: 'fill-in-blank',
      question: 'Fill in the missing word:',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'A',
      explanation: 'Complete the sentence with the correct grammar.',
      difficulty: 'medium',
    },
    {
      id: 'e3',
      type: 'sentence-constructor',
      question: 'Build the correct sentence:',
      wordBank: ['Waxaan', 'cunto', 'cunaa'],
      options: [],
      correctAnswer: 'Waxaan cunaa cunto',
      explanation: 'SOV word order: Subject-Object-Verb.',
      difficulty: 'medium',
    },
    {
      id: 'e4',
      type: 'multiple-choice',
      question: 'Select the correct translation:',
      options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
      correctAnswer: 'Choice 1',
      explanation: 'This tests your understanding of the grammar concept.',
      difficulty: 'medium',
    },
  ];
}

export const lessons: Lesson[] = lessonsData.map((lesson) => ({
  ...lesson,
  exercises: exerciseTemplates[lesson.id] || generateDefaultExercises(lesson.id, lesson),
}));

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getLessonsByLevel(level: number): Lesson[] {
  return lessons.filter((l) => l.level === level);
}

export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const current = lessons.find((l) => l.id === currentLessonId);
  if (!current) return undefined;
  return lessons.find((l) => l.order === current.order + 1);
}
