import type { Variants } from 'framer-motion';

// export const categories = [
//   'All Instruments',
//   'Strings',
//   'Percussion',
//   'Wind',
//   'Vocal Arts',
//   'Digital Music',
// ];
export const categories = [
  'All Courses',
  'Guitar',
  'Keyboard & Piano',
  'Vocals',
  'Ukulele',
  'Violin',
  'Drums',
  'Flute',
];

export type Course = {
  id: number;
  slug: string;
  title: string;
  category: string;
  badge: string;
  badgeColor: string;
  sessions: number;
  weeks: number;
  description: string;
  imageSrc: string;
  featured: boolean;
};

export type CourseFAQ = {
  question: string;
  answer: string;
};

export type CourseDetail = {
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  whatYouLearn: string[];
  curriculum: string[];
  faqs: CourseFAQ[];
  ctaTitle: string;
  ctaDescription: string;
};

export const courses: Course[] = [
  {
    id: 1,
    slug: 'guitar-lessons',
    title: 'Guitar Lessons',
    category: 'Guitar',
    badge: 'Featured',
    badgeColor: 'bg-red-500',
    sessions: 48,
    weeks: 24,
    description:
      'Learn chords, rhythm patterns, strumming techniques, and popular songs with engaging online music classes.',
    imageSrc: '/images/man-using-guitar.jpg',
    featured: true,
  },
  {
    id: 2,
    slug: 'keyboard-and-piano',
    title: 'Keyboard & Piano Classes',
    category: 'Keyboard & Piano',
    badge: 'Advanced',
    badgeColor: 'bg-neutral-700',
    sessions: 48,
    weeks: 24,
    description:
      'Build strong fundamentals in notes, scales, chords, rhythm, and keyboard playing techniques.',
    imageSrc: '/images/man-playing-keyboard.jpg',
    featured: false,
  },
  {
    id: 3,
    slug: 'vocal-training',
    title: 'Vocal Training',
    category: 'Vocals',
    badge: 'Beginner',
    badgeColor: 'bg-neutral-700',
    sessions: 48,
    weeks: 24,
    description:
      'Improve pitch, voice control, breathing techniques, and stage confidence with professional vocal coaching.',
    imageSrc: '/images/child-playing-guitar.jpg',
    featured: false,
  },
  {
    id: 4,
    slug: 'ukulele-classes',
    title: 'Ukulele Classes',
    category: 'Ukulele',
    badge: 'Beginner',
    badgeColor: 'bg-neutral-700',
    sessions: 48,
    weeks: 24,
    description:
      'Learn easy chords, rhythm, and fun songs through beginner-friendly online music classes.',
    imageSrc: '/images/ukulele-instrument.jpg',
    featured: false,
  },
  {
    id: 5,
    slug: 'violin-lessons',
    title: 'Violin Lessons',
    category: 'Violin',
    badge: 'Intermediate',
    badgeColor: 'bg-neutral-700',
    sessions: 48,
    weeks: 24,
    description:
      'Develop posture, bowing techniques, note reading, and musical expression step by step.',
    imageSrc: '/images/violin-instrument.jpg',
    featured: false,
  },
  {
    id: 6,
    slug: 'drum-classes',
    title: 'Drum Classes',
    category: 'Drums',
    badge: 'Beginner',
    badgeColor: 'bg-neutral-700',
    sessions: 48,
    weeks: 24,
    description:
      'Master beats, coordination, rhythm patterns, and timing with interactive drum lessons.',
    imageSrc: '/images/drum-instument.jpg',
    featured: false,
  },
  {
    id: 7,
    slug: 'flute-lessons',
    title: 'Flute Lessons',
    category: 'Flute',
    badge: 'Beginner',
    badgeColor: 'bg-neutral-700',
    sessions: 48,
    weeks: 24,
    description:
      'Learn breathing control, finger positioning, melodies, and classical music techniques.',
    imageSrc: '/images/flute-instrument.jpg',
    featured: false,
  },
];

export const courseDetails: Record<string, CourseDetail> = {
  'guitar-lessons': {
    heroTitle: 'Learn Guitar Online with Expert-Led Classes',
    heroSubtitle: 'From first chords to confident performances.',
    intro:
      'Build finger strength, strumming control, rhythm timing, and chord transitions with step-by-step mentor feedback.',
    whatYouLearn: [
      'Guitar posture, tuning, and right-hand control',
      'Major and minor chords with clean transitions',
      'Strumming patterns for pop, rock, and acoustic songs',
      'Lead basics: scales, riffs, and simple solos',
      'Song arrangement and performance confidence',
    ],
    curriculum: [
      'Orientation: instrument setup and warmups',
      'Single-note melodies and timing drills',
      'Open chords and chord switching practice',
      'Rhythm patterns and strumming dynamics',
      'Barre chords and fretboard movement',
      'Popular song practice with backing tracks',
      'Live feedback sessions and performance prep',
    ],
    faqs: [
      {
        question: 'Is this suitable for complete beginners?',
        answer:
          'Yes. We start from basics and progress module by module with guided practice.',
      },
      {
        question: 'Do I need an electric or acoustic guitar?',
        answer:
          'Either works. Lessons focus on transferable fundamentals with optional style-specific tracks.',
      },
      {
        question: 'Will classes be live or recorded?',
        answer:
          'You get live sessions with mentors plus practice recordings for revision.',
      },
    ],
    ctaTitle: 'Start Your Guitar Journey Today',
    ctaDescription: 'Book a trial and get a personalized learning roadmap.',
  },
  'keyboard-and-piano': {
    heroTitle: 'Master The Art of Keyboard',
    heroSubtitle:
      'Learning the keyboard is one of the most exciting ways to start your musical journey. Whether you are picking up an instrument for the very first time or looking to improve your skills, our keyboard course is designed to guide you every step of the way.',
    intro:
      'Learn keyboard through a thoughtfully structured program designed for beginners, intermediate learners, and aspiring performers.',
    whatYouLearn: [
      'Keyboard Basics: Understand the foundation of keyboard playing including finger positions, posture, and hand coordination.',
      'Introduction to Music Theory: Learn essential music concepts like notes, scales, and rhythm patterns.',
      'Playing with Both Hands: Develop coordination between both hands and start playing simple melodies with harmony.',
      'Scales & Chords: Explore major and minor scales, basic chords, and how they are used to create music.',
      'Reading Staff Notation: Understand how to read music sheets and translate notes into keyboard playing.',
      'Chord Progressions & Arpeggios: Learn to play smooth transitions between chords.',
      'Song Practice: Apply your learning by practicing songs with proper timing, rhythm, and expression.',
      'Advanced Playing Techniques: Improve speed, accuracy, and control with advanced finger techniques.',
      'Final Performance Skills: Build confidence to perform independently and prepare for stage or certification exams.',
    ],
    curriculum: [
      '1:1 Live Sessions with dedicated instructor attention',
      'Personalized lesson plans based on your learning speed and goals',
      'Real-time practice & correction to improve technique instantly',
      'Step-by-step guidance with simplified explanations',
      'Instant doubt clarification during the session',
      'Continuous feedback & performance tracking',
      'Flexible learning pace — move faster or slower as needed',
    ],
    faqs: [
      {
        question: 'Do I need a full-size keyboard?',
        answer:
          'A 61-key keyboard is enough to start, though 88 keys are ideal for long-term progress.',
      },
      {
        question: 'Can I learn without prior music theory?',
        answer: 'Absolutely. Theory is introduced in simple, practical steps.',
      },
      {
        question: 'How much daily practice is recommended?',
        answer: 'At least 20 to 30 minutes daily gives steady improvement.',
      },
    ],
    ctaTitle: 'Start Your Journey Today!',
    ctaDescription:
      'Music is a form of self-expression. At Music Champs, we help you discover your musical interests through fun lessons.',
  },
  'vocal-training': {
    heroTitle: 'Shape Your Voice with Confidence',
    heroSubtitle: 'Train technique, range, and stage presence.',
    intro:
      'Strengthen breathing, pitch control, and vocal agility through guided exercises and repertoire practice.',
    whatYouLearn: [
      'Breathing technique and voice warmups',
      'Pitch correction and ear training',
      'Range extension and resonance development',
      'Song interpretation and expression',
      'Mic handling and live vocal confidence',
    ],
    curriculum: [
      'Voice assessment and goal planning',
      'Breath support and projection drills',
      'Pitch accuracy and scale workouts',
      'Tone quality and vocal texture control',
      'Performance songs and delivery training',
      'Recording feedback and refinement',
    ],
    faqs: [
      {
        question: 'Is vocal training safe for young students?',
        answer:
          'Yes, exercises are age-appropriate and focused on healthy vocal habits.',
      },
      {
        question: 'Will this help with stage fear?',
        answer:
          'Yes. We include performance drills and confidence coaching in every phase.',
      },
      {
        question: 'Can I choose songs I like?',
        answer:
          'Yes, mentors include learner-chosen songs to keep classes engaging.',
      },
    ],
    ctaTitle: 'Find Your True Voice',
    ctaDescription:
      'Book a trial vocal session and sing with control and confidence.',
  },
  'ukulele-classes': {
    heroTitle: 'Fun and Easy Ukulele Learning',
    heroSubtitle: 'Perfect for beginners and young learners.',
    intro:
      'Learn chords, rhythm, and songs quickly with a lightweight, beginner-friendly instrument.',
    whatYouLearn: [
      'Ukulele setup and tuning essentials',
      'Core chords and smooth transitions',
      'Rhythm strumming and groove patterns',
      'Song play-alongs and timing confidence',
      'Simple fingerstyle techniques',
    ],
    curriculum: [
      'Basics: instrument hold and tuning',
      'Intro chord shapes and rhythm',
      'Song modules for quick progress',
      'Dynamics and strum variations',
      'Fingerstyle intro and arrangements',
      'Final performance project',
    ],
    faqs: [
      {
        question: 'How quickly can I play songs?',
        answer:
          'Most learners play simple songs within the first few sessions.',
      },
      {
        question: 'Which ukulele size is best?',
        answer: 'Soprano or concert ukulele is ideal for beginners.',
      },
      {
        question: 'Is this course only for kids?',
        answer: 'No, adults and teens can join as well.',
      },
    ],
    ctaTitle: 'Pick Up Your Ukulele Today',
    ctaDescription:
      'Start with beginner-friendly lessons and enjoy instant progress.',
  },
  'violin-lessons': {
    heroTitle: 'Build Strong Violin Fundamentals',
    heroSubtitle: 'Train bow control, intonation, and musicality.',
    intro:
      'Learn violin step by step with focused attention on posture, bowing precision, and expressive performance.',
    whatYouLearn: [
      'Posture and instrument hold for comfort',
      'Bowing mechanics and tone production',
      'Finger placement and intonation practice',
      'Scales, etudes, and melodic phrasing',
      'Performance preparation and stage confidence',
    ],
    curriculum: [
      'Setup and posture fundamentals',
      'Bow grip and open-string exercises',
      'Left-hand coordination and intonation',
      'Scale study and technique reinforcement',
      'Song interpretation and expression',
      'Mock performances and mentor feedback',
    ],
    faqs: [
      {
        question: 'Do I need to know sheet music first?',
        answer:
          'No, we teach notation progressively alongside practical playing.',
      },
      {
        question: 'Is violin difficult for beginners?',
        answer:
          'It needs consistency, but guided structure makes it very manageable.',
      },
      {
        question: 'What age can start violin training?',
        answer:
          'Children as young as 6 can begin with age-appropriate methods.',
      },
    ],
    ctaTitle: 'Begin Your Violin Journey',
    ctaDescription:
      'Get personalized violin coaching with structured weekly milestones.',
  },
  'drum-classes': {
    heroTitle: 'Power Your Rhythm on Drums',
    heroSubtitle: 'From basic beats to dynamic grooves.',
    intro:
      'Train coordination, speed, and groove control while learning practical styles across modern music genres.',
    whatYouLearn: [
      'Stick grip and posture fundamentals',
      'Timekeeping and metronome control',
      'Rock, pop, and funk groove patterns',
      'Fills, transitions, and drum vocabulary',
      'Performance stamina and timing accuracy',
    ],
    curriculum: [
      'Drum kit orientation and setup',
      'Hand-foot independence drills',
      'Groove building and timing control',
      'Fill construction and transitions',
      'Genre-based song application',
      'Live performance simulation',
    ],
    faqs: [
      {
        question: 'Can I learn with an electronic drum kit?',
        answer:
          'Yes. Electronic kits are great for practice and online lessons.',
      },
      {
        question: 'Do I need prior rhythm training?',
        answer: 'No prior experience is required.',
      },
      {
        question: 'How much practice should I do?',
        answer: '20 to 40 minutes daily is ideal for visible progress.',
      },
    ],
    ctaTitle: 'Take the Beat Forward',
    ctaDescription:
      'Join drum classes that build precision, groove, and confidence.',
  },
  'flute-lessons': {
    heroTitle: 'Learn Melodic Flute Playing',
    heroSubtitle: 'Develop tone, breath, and expression.',
    intro:
      'Master breath flow, finger movement, and melodic ornamentation with focused flute training.',
    whatYouLearn: [
      'Embouchure and breath support basics',
      'Finger technique and note clarity',
      'Scale patterns and tone consistency',
      'Melodic phrases and expressive articulation',
      'Song performance and confidence building',
    ],
    curriculum: [
      'Flute posture and breathing routine',
      'Tone production and control',
      'Scale and fingering progression',
      'Phrase shaping and dynamics',
      'Song-based repertoire practice',
      'Performance readiness and polish',
    ],
    faqs: [
      {
        question: 'Can beginners start flute online?',
        answer:
          'Yes, with guided supervision and proper fundamentals it works very well.',
      },
      {
        question: 'Do you teach both classical and light music?',
        answer: 'Yes. Learning paths can be customized by genre preference.',
      },
      {
        question: 'Will I get practice assignments?',
        answer: 'Yes, each class includes clear weekly practice tasks.',
      },
    ],
    ctaTitle: 'Start Playing Flute with Ease',
    ctaDescription:
      'Book your trial and begin your structured flute learning path.',
  },
};

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

// ✅ Fixed: no longer requires category param — was mismatched at call sites
export function getRelatedCourses(slug: string, count = 3): Course[] {
  return courses.filter((c) => c.slug !== slug).slice(0, count);
}

export const events = [
  {
    id: 1,
    category: 'Workshop',
    badge: 'New',
    badgeColor: 'bg-red-500',
    title: 'Live Jazz Workshop',
    date: 'Oct 15, 2023',
    time: '10:00 AM – 1:00 PM',
    location: 'Online Class',
    imageSrc: '/assets/event-jazz.jpg',
  },
  {
    id: 2,
    category: 'Festival',
    badge: 'Popular',
    badgeColor: 'bg-red-500',
    title: 'Summer Music Festival',
    date: 'Aug 24–26, 2024',
    time: 'All Day Event',
    location: 'Nashville, TN',
    imageSrc: '/assets/event-festival.jpg',
  },
  {
    id: 3,
    category: 'Workshop',
    badge: null,
    badgeColor: null,
    title: 'Vocal Control Intensive',
    date: 'Dec 05, 2023',
    time: '11:00 AM – 3:00 PM',
    location: 'Online (Zoom)',
    imageSrc: '/assets/event-vocal.jpg',
  },
];

// ✅ Properly typed — no more "ease: string" TS errors
export const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
