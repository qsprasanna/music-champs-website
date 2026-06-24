export type Course = {
  slug: string;
  title: string;
  titleHighlight: string;
  tagline: string[] | string;
  description: string[];
  level: string;
  sessions: number;
  weeks: number;
  imageSrc: string;
  videoSrc?: string;
  category: string;
  whatYoullLearn: { title: string; description: string }[];
  howYoullLearn: {
    heading: string;
    subheading: string;
    intro: string;
    highlights: string[];
    closing: string;
  };
  outcomes: string[];
};

export const courses: Course[] = [
  // ─── Keyboard & Piano ───────────────────────────────────────────────────────
  {
    slug: 'keyboard-and-piano',
    title: 'Master',
    titleHighlight: 'The Art of Keyboard',
    tagline:
      'Learning the keyboard is one of the most exciting ways to start your musical journey. Whether you are picking up an instrument for the very first time or looking to improve your skills, our keyboard course is designed to guide you every step of the way.',
    description: [
      'Learn keyboard through a thoughtfully structured program designed for beginners, intermediate learners, and aspiring performers. This course is crafted to help you build a strong musical foundation while gradually developing practical playing skills through guided, step-by-step learning.',
      "You'll begin with the essentials—understanding keyboard layout, finger positioning, and basic music concepts—and progressively move towards playing complete songs with confidence. Each lesson is designed to balance theory and hands-on practice, ensuring that you not only understand music but also apply it effectively.",
      "As you advance, you'll explore scales, chords, rhythm patterns, and coordination techniques that enhance your overall musical ability. The course also focuses on improving hand synchronization, timing, and expression—key elements that bring life to your performance.",
      "Whether you're starting your musical journey from scratch or looking to refine your existing skills, this course adapts to your pace and learning style. With continuous practice, structured guidance, and performance-focused training, you'll gain both technical expertise and creative confidence to play independently.",
    ],
    level: 'Beginner',
    sessions: 48,
    weeks: 24,
    imageSrc: '/images/man-playing-keyboard.jpg',
    videoSrc: 'https://www.youtube.com/embed/uVE_hA7Ie7I',
    category: 'Strings',
    whatYoullLearn: [
      {
        title: 'Keyboard Basics',
        description:
          'Understand the foundation of keyboard playing including finger positions, posture, and hand coordination. Get comfortable with the layout of keys and octaves.',
      },
      {
        title: 'Introduction to Music Theory',
        description:
          'Learn essential music concepts like notes, scales, and rhythm patterns that form the base of every song.',
      },
      {
        title: 'Playing with Both Hands',
        description:
          'Develop coordination between both hands and start playing simple melodies with harmony.',
      },
      {
        title: 'Scales & Chords',
        description:
          'Explore major and minor scales, basic chords, and how they are used to create music.',
      },
      {
        title: 'Reading Staff Notation',
        description:
          'Understand how to read music sheets and translate notes into keyboard playing.',
      },
      {
        title: 'Chord Progressions & Arpeggios',
        description:
          'Learn to play smooth transitions between chords and enhance your playing with arpeggios.',
      },
      {
        title: 'Song Practice',
        description:
          'Apply your learning by practicing songs with proper timing, rhythm, and expression.',
      },
      {
        title: 'Advanced Playing Techniques',
        description:
          'Improve speed, accuracy, and control with advanced finger techniques and patterns.',
      },
      {
        title: 'Final Performance Skills',
        description:
          'Build confidence to perform independently and prepare for stage or certification exams.',
      },
    ],
    howYoullLearn: {
      heading: 'Personalized, Interactive & Mentor-Led',
      subheading:
        'Experience a fully guided one-on-one learning journey where every session is tailored to your pace, skill level, and goals.',
      intro:
        "Unlike recorded classes, you'll learn directly with an expert instructor who focuses on your individual progress and improvement. Each session is designed to be highly interactive, ensuring you actively play, practice, and refine your skills in real time.",
      highlights: [
        '1:1 Live Sessions with dedicated instructor attention',
        'Personalized lesson plans based on your learning speed and goals',
        'Real-time practice & correction to improve technique instantly',
        'Step-by-step guidance with simplified explanations',
        'Instant doubt clarification during the session',
        'Continuous feedback & performance tracking',
        'Flexible learning pace — move faster or slower as needed',
      ],
      closing:
        "You won't just learn what to play — you'll understand how and why to play it, with expert support at every step.",
    },
    outcomes: [
      'Play confidently with both hands, maintaining rhythm, coordination, and control',
      'Perform complete songs independently with proper timing, expression, and flow',
      'Understand core music theory, including scales, chords, and song structure',
      'Read and interpret basic staff notation with ease',
      'Apply techniques like chord progressions and arpeggios in real playing scenarios',
      'Develop your own playing style with improved creativity and musical sense',
    ],
  },

  // ─── Guitar Lessons ─────────────────────────────────────────────────────────
  {
    slug: 'guitar-lessons',
    title: 'Learn Guitar Online with',
    titleHighlight: 'Expert-Led Classes',
    tagline: [
      'Learning guitar is one of the most exciting and creative ways to begin your musical journey. Whether you are picking up a guitar for the very first time or looking to improve your playing skills, our course is designed to help students learn guitar online through engaging and step-by-step lessons.',
      'Our beginner guitar lessons online focus on building confidence, improving technique, and helping students enjoy the process of learning music in a fun and supportive environment.',
    ],
    description: [
      'Our guitar program is thoughtfully designed for beginners, young learners, and aspiring performers who want to learn guitar online with proper guidance and structured training. Each lesson combines practical playing exercises with music fundamentals to help students build strong musical foundations while enjoying the learning process.',

      'Students begin with the basics of guitar playing, including posture, finger positioning, tuning, note understanding, and rhythm practice. As they progress through the beginner guitar lessons online, they gradually learn chords, scales, strumming patterns, timing, and song-playing techniques that improve overall confidence and musical expression.',

      'The course also focuses on developing coordination, finger strength, listening ability, and rhythm control — important skills that help students become comfortable and expressive guitar players. Our live sessions encourage interactive learning where students can practice, ask questions, and improve with personalized support from instructors.',

      'Whether you are starting completely fresh or refining your existing skills, MusicChamps helps students learn guitar online at their own pace with engaging lessons, guided practice, and performance-focused learning experiences.',
    ],
    level: 'Beginner',
    sessions: 48,
    weeks: 24,
    imageSrc: '/images/man-using-guitar.jpg',
    videoSrc: 'https://www.youtube.com/embed/8i8pX8NA_xI',
    category: 'Strings',
    whatYoullLearn: [
      {
        title: 'Guitar Basics',
        description:
          'Understand the fundamentals of guitar playing including posture, hand positioning, and how to hold the instrument correctly. Learn about strings, frets, and tuning.',
      },
      {
        title: 'Introduction to Music Theory',
        description:
          'Learn essential music concepts like notes, scales, and rhythm patterns that form the base of every song.',
      },
      {
        title: 'Chord Playing',
        description:
          'Start with basic open chords and learn how to switch between them smoothly.',
      },
      {
        title: 'Strumming Techniques',
        description:
          'Explore different strumming patterns and rhythms to add groove and flow to your playing.',
      },
      {
        title: 'Playing Melodies',
        description:
          'Learn to play simple melodies and riffs while developing finger control and accuracy.',
      },
      {
        title: 'Scales & Finger Exercises',
        description:
          'Practice scales and exercises that improve finger strength, speed, and flexibility.',
      },
      {
        title: 'Chord Progressions',
        description:
          'Understand how chords work together and learn common progressions used in popular songs.',
      },
      {
        title: 'Song Practice',
        description:
          'Apply your learning by playing songs with proper rhythm, timing, and expression.',
      },
      {
        title: 'Advanced Techniques',
        description:
          'Enhance your skills with techniques like hammer-ons, pull-offs, slides, and picking patterns.',
      },
      {
        title: 'Performance Skills',
        description:
          'Build confidence to perform independently and prepare for stage or certification exams.',
      },
    ],
    howYoullLearn: {
      heading: 'Personalized, Interactive & Mentor-Led',
      subheading:
        'Experience a fully guided one-on-one learning journey where every session is tailored to your pace, skill level, and goals.',
      intro:
        "Unlike recorded classes, you'll learn directly with an expert instructor who focuses on your individual progress. Each session is designed to be highly interactive, ensuring you actively play, practice, and refine your skills in real time.",
      highlights: [
        '1:1 Live Sessions with dedicated instructor attention',
        'Personalized lesson plans based on your learning speed and goals',
        'Real-time practice & correction to improve technique instantly',
        'Step-by-step guidance with simplified explanations',
        'Instant doubt clarification during the session',
        'Continuous feedback & performance tracking',
        'Flexible learning pace — move faster or slower as needed',
      ],
      closing:
        "You won't just learn what to play — you'll understand how and why to play it, with expert support at every step.",
    },
    outcomes: [
      'Play chords and melodies smoothly with proper rhythm and coordination',
      'Perform complete songs independently with confidence and expression',
      'Understand core music theory, including chords, scales, and song structure',
      'Apply strumming patterns and techniques effectively in real songs',
      'Use advanced techniques to enhance your playing style',
      'Develop your own musical expression and creativity',
    ],
  },

  // ─── Vocal Training ─────────────────────────────────────────────────────────
  {
    slug: 'vocal-training',
    title: 'Master',
    titleHighlight: 'The Art of Singing',
    tagline:
      "Singing is one of the most natural and powerful forms of musical expression. Whether you're just starting out or looking to refine your voice, our vocal training program is designed to help you discover, develop, and master your unique sound with confidence.",
    description: [
      'Learn singing through a thoughtfully structured program designed for beginners, intermediate learners, and aspiring performers. This course helps you build a strong vocal foundation while gradually developing control, technique, and expressive ability through guided, step-by-step learning.',
      "You'll begin with the essentials—understanding your voice, breathing techniques, pitch control, and basic vocal exercises—and progress towards singing complete songs with confidence and clarity. Each lesson blends theory with practical vocal training to ensure balanced development.",
      "As you advance, you'll explore voice modulation, range expansion, dynamics, and expression techniques that enhance your singing ability. The course also focuses on improving tone quality, control, stamina, and emotional delivery—key elements that make your performance impactful.",
      "Whether you're starting from scratch or refining your skills, this course adapts to your pace and vocal style. With consistent practice, structured guidance, and performance-focused training, you'll gain both technical skill and artistic confidence.",
    ],
    level: 'Beginner',
    sessions: 48,
    weeks: 24,
    imageSrc: '/images/child-playing-guitar.jpg',
    videoSrc: 'https://www.youtube.com/embed/YAXOhutTEdc',
    category: 'Vocal Arts',
    whatYoullLearn: [
      {
        title: 'Vocal Basics',
        description:
          'Understand the fundamentals of singing including posture, breathing techniques, and voice control. Learn how to use your voice safely and effectively.',
      },
      {
        title: 'Breath Control Techniques',
        description:
          'Develop proper breathing methods to support your voice and improve stability, power, and endurance.',
      },
      {
        title: 'Pitch & Tone Control',
        description:
          'Learn to sing in tune and develop a clear, consistent tone across different notes.',
      },
      {
        title: 'Voice Warm-Ups & Exercises',
        description:
          'Practice essential vocal exercises to improve flexibility, strength, and vocal range.',
      },
      {
        title: 'Scales & Voice Range Development',
        description:
          'Work on scales and techniques to gradually expand your vocal range.',
      },
      {
        title: 'Rhythm & Timing',
        description:
          'Understand rhythm patterns and learn how to stay in sync with music while singing.',
      },
      {
        title: 'Song Interpretation',
        description:
          'Learn how to express emotion, meaning, and storytelling through your voice.',
      },
      {
        title: 'Song Practice',
        description:
          'Apply your skills by practicing songs with proper pitch, timing, and expression.',
      },
      {
        title: 'Advanced Vocal Techniques',
        description:
          'Explore techniques like vibrato, voice modulation, and dynamic control.',
      },
      {
        title: 'Performance Skills',
        description:
          'Build confidence to perform in front of an audience or prepare for stage and certification exams.',
      },
    ],
    howYoullLearn: {
      heading: 'Personalized, Interactive & Mentor-Led',
      subheading:
        'Experience a fully guided one-on-one learning journey where every session is tailored to your voice, pace, and goals.',
      intro:
        "Unlike recorded classes, you'll learn directly with an expert vocal coach who focuses on your individual progress. Each session is designed to be highly interactive, ensuring you actively practice, perform, and refine your voice in real time.",
      highlights: [
        '1:1 Live Sessions with dedicated instructor attention',
        'Personalized lesson plans based on your vocal range and goals',
        'Real-time feedback & correction to improve instantly',
        'Step-by-step vocal exercises with clear guidance',
        'Instant doubt clarification during sessions',
        'Continuous feedback & performance tracking',
        'Flexible learning pace — progress comfortably',
      ],
      closing:
        "You won't just learn how to sing — you'll understand how to control, train, and express your voice effectively with expert support at every step.",
    },
    outcomes: [
      'Sing with proper pitch, tone, and breath control',
      'Perform songs confidently with expression and clarity',
      'Understand core vocal techniques and music basics',
      'Improve vocal range, strength, and flexibility',
      'Apply dynamics, modulation, and stylistic elements',
      'Develop your own unique voice and singing style',
    ],
  },

  // ─── Ukulele Classes ────────────────────────────────────────────────────────
  {
    slug: 'ukulele-classes',
    title: 'Master',
    titleHighlight: 'The Art of Ukulele',
    tagline:
      "The ukulele is one of the most fun and easy-to-learn instruments, perfect for beginners and music lovers of all ages. Whether you're starting fresh or exploring a new instrument, our ukulele course is designed to help you learn quickly and play with confidence.",
    description: [
      'Learn ukulele through a thoughtfully structured program designed for beginners, intermediate learners, and aspiring performers. This course helps you build a strong musical foundation while developing practical playing skills through guided, step-by-step learning.',
      "You'll begin with the basics—understanding the parts of the ukulele, tuning, finger placement, and simple chords—and gradually move towards playing complete songs with ease. Each lesson combines music theory with hands-on practice, making learning both engaging and effective.",
      "As you progress, you'll explore chord transitions, strumming patterns, rhythm techniques, and melody playing that enhance your overall musical ability. The course also focuses on improving coordination, timing, and expression—key elements that bring your music to life.",
      "Whether you're picking up the ukulele for the first time or building on your existing skills, this course adapts to your pace and learning style. With consistent practice, structured guidance, and performance-focused training, you'll gain confidence to play independently.",
    ],
    level: 'Beginner',
    sessions: 48,
    weeks: 10,
    imageSrc: '/images/ukulele-instrument.jpg',
    videoSrc: 'https://www.youtube.com/embed/tPSgWcpWCv4',
    category: 'Strings',
    whatYoullLearn: [
      {
        title: 'Ukulele Basics',
        description:
          'Understand the fundamentals including posture, how to hold the ukulele, finger positioning, and tuning.',
      },
      {
        title: 'Introduction to Music Theory',
        description:
          'Learn essential concepts like notes, rhythm, and basic musical structure.',
      },
      {
        title: 'Basic Chords',
        description:
          'Start with simple chords and learn how to switch between them smoothly.',
      },
      {
        title: 'Strumming Patterns',
        description:
          'Explore fun and easy strumming techniques to create rhythm and groove.',
      },
      {
        title: 'Rhythm & Timing',
        description:
          'Develop a strong sense of timing and learn to play along with beats.',
      },
      {
        title: 'Melody Playing',
        description:
          'Learn to play simple melodies and improve finger coordination.',
      },
      {
        title: 'Chord Progressions',
        description:
          'Understand how chords work together in songs and practice common progressions.',
      },
      {
        title: 'Song Practice',
        description:
          'Apply your skills by playing songs with proper rhythm, flow, and expression.',
      },
      {
        title: 'Advanced Techniques',
        description:
          'Learn techniques like fingerpicking and dynamic strumming patterns.',
      },
      {
        title: 'Performance Skills',
        description:
          'Build confidence to perform independently or in front of an audience.',
      },
    ],
    howYoullLearn: {
      heading: 'Personalized, Interactive & Mentor-Led',
      subheading:
        'Experience a fully guided one-on-one learning journey where every session is tailored to your pace, skill level, and goals.',
      intro:
        'Learn directly from an expert instructor who focuses on your individual progress. Each session is interactive, ensuring you actively play, practice, and improve in real time.',
      highlights: [
        '1:1 Live Sessions with dedicated instructor attention',
        'Personalized lesson plans based on your learning speed and goals',
        'Real-time correction to improve technique instantly',
        'Step-by-step guidance with easy-to-follow lessons',
        'Instant doubt clarification during sessions',
        'Continuous feedback & performance tracking',
        'Flexible learning pace — learn comfortably',
      ],
      closing:
        "You won't just learn songs — you'll understand how to play, practice, and enjoy music with confidence.",
    },
    outcomes: [
      'Play chords and switch smoothly with proper timing',
      'Perform complete songs confidently with rhythm and flow',
      'Understand basic music theory and song structure',
      'Apply strumming and fingerpicking techniques effectively',
      'Develop coordination, timing, and musical expression',
      'Build your own playing style and creativity',
    ],
  },

  // ─── Violin Lessons ─────────────────────────────────────────────────────────
  {
    slug: 'violin-lessons',
    title: 'Master',
    titleHighlight: 'The Art of Violin',
    tagline:
      "The violin is a beautifully expressive instrument known for its rich tone and emotional depth. Whether you're beginning your musical journey or looking to refine your skills, our violin course is designed to guide you step by step towards confident and graceful playing.",
    description: [
      'Learn violin through a thoughtfully structured program designed for beginners, intermediate learners, and aspiring performers. This course helps you build a strong musical foundation while developing precision, control, and expressive playing through guided, step-by-step learning.',
      "You'll begin with the basics—understanding the parts of the violin, posture, bow handling, and finger placement—and gradually progress towards playing complete pieces with confidence. Each lesson combines music theory with practical application, ensuring balanced development.",
      "As you advance, you'll explore bowing techniques, scales, intonation, rhythm patterns, and coordination skills that enhance your overall performance. The course also focuses on improving tone quality, control, and musical expression—key elements that bring depth to your playing.",
      "Whether you're starting from scratch or improving your current level, this course adapts to your pace and learning style. With consistent practice, structured guidance, and performance-focused training, you'll gain both technical skill and artistic confidence.",
    ],
    level: 'Beginner',
    sessions: 48,
    weeks: 24,
    imageSrc: '/images/violin-instrument.jpg',
    videoSrc: 'https://www.youtube.com/embed/9AbafijYwhk',
    category: 'Strings',
    whatYoullLearn: [
      {
        title: 'Violin Basics',
        description:
          'Understand posture, how to hold the violin and bow correctly, and basic finger positioning.',
      },
      {
        title: 'Introduction to Music Theory',
        description:
          'Learn essential music concepts like notes, scales, and rhythm patterns.',
      },
      {
        title: 'Bowing Techniques',
        description:
          'Develop control over the bow to produce smooth and consistent sound.',
      },
      {
        title: 'Finger Placement & Intonation',
        description: 'Learn accurate finger positioning to play notes in tune.',
      },
      {
        title: 'Scales & Exercises',
        description:
          'Practice scales and exercises to improve finger strength, accuracy, and flexibility.',
      },
      {
        title: 'Rhythm & Timing',
        description:
          'Understand rhythm patterns and learn to play with proper timing.',
      },
      {
        title: 'Reading Staff Notation',
        description:
          'Learn how to read music sheets and translate them into violin playing.',
      },
      {
        title: 'Song Practice',
        description:
          'Apply your learning by playing simple pieces with correct technique and expression.',
      },
      {
        title: 'Advanced Techniques',
        description:
          'Explore techniques like vibrato, dynamics, and expressive bowing.',
      },
      {
        title: 'Performance Skills',
        description:
          'Build confidence to perform independently or prepare for stage and certification exams.',
      },
    ],
    howYoullLearn: {
      heading: 'Personalized, Interactive & Mentor-Led',
      subheading:
        'Experience a fully guided one-on-one learning journey where every session is tailored to your pace, skill level, and goals.',
      intro:
        'Learn directly with an expert instructor who focuses on your individual progress. Each session is interactive, ensuring you actively practice, refine techniques, and improve in real time.',
      highlights: [
        '1:1 Live Sessions with dedicated instructor attention',
        'Personalized lesson plans based on your learning speed and goals',
        'Real-time feedback & correction to improve technique instantly',
        'Step-by-step guidance with clear explanations',
        'Instant doubt clarification during sessions',
        'Continuous feedback & performance tracking',
        'Flexible learning pace — progress comfortably',
      ],
      closing:
        "You won't just learn how to play — you'll understand technique, control, and musical expression with expert support at every step.",
    },
    outcomes: [
      'Play with proper posture, bow control, and accurate intonation',
      'Perform complete pieces with confidence and expression',
      'Understand core music theory and violin techniques',
      'Read and interpret basic staff notation',
      'Apply advanced techniques like vibrato and dynamics',
      'Develop your own musical style and expressive ability',
    ],
  },

  // ─── Drum Classes ───────────────────────────────────────────────────────────
  {
    slug: 'drum-classes',
    title: 'Master',
    titleHighlight: 'The Art of Drumming',
    tagline:
      "Drumming is the heartbeat of music—powerful, energetic, and deeply expressive. Whether you're starting from scratch or looking to sharpen your skills, our drum course is designed to help you build rhythm, coordination, and confidence step by step.",
    description: [
      'Learn drums through a thoughtfully structured program designed for beginners, intermediate learners, and aspiring performers. This course helps you build a strong rhythmic foundation while developing coordination, control, and dynamic playing through guided, step-by-step learning.',
      "You'll begin with the basics—understanding the drum kit, stick grip, posture, and simple rhythm patterns—and gradually progress towards playing full grooves and songs with confidence. Each lesson blends rhythm theory with hands-on practice to ensure effective learning.",
      "As you advance, you'll explore different beats, fills, timing techniques, and coordination exercises that enhance your drumming ability. The course also focuses on improving speed, control, endurance, and groove—key elements that define a great drummer.",
      "Whether you're a complete beginner or improving your current skills, this course adapts to your pace and learning style. With consistent practice, structured guidance, and performance-focused training, you'll gain the confidence to play independently.",
    ],
    level: 'Beginner',
    sessions: 48,
    weeks: 24,
    imageSrc: '/images/drum-instument.jpg',
    videoSrc: 'https://www.youtube.com/embed/mJau3ju64r4',
    category: 'Percussion',
    whatYoullLearn: [
      {
        title: 'Drum Basics',
        description:
          'Understand the drum kit components, stick grip, posture, and basic playing techniques.',
      },
      {
        title: 'Introduction to Rhythm Theory',
        description:
          'Learn essential rhythm concepts, note values, and timing fundamentals.',
      },
      {
        title: 'Stick Control & Exercises',
        description:
          'Develop control, speed, and precision through structured stick exercises.',
      },
      {
        title: 'Basic Beats & Grooves',
        description:
          'Learn fundamental drum beats and grooves used in popular music styles.',
      },
      {
        title: 'Coordination Techniques',
        description:
          'Build independence between hands and feet for better control and flow.',
      },
      {
        title: 'Fills & Transitions',
        description:
          'Learn how to add fills and smooth transitions between beats.',
      },
      {
        title: 'Timing & Tempo Control',
        description:
          'Improve your ability to stay in sync with a metronome and music tracks.',
      },
      {
        title: 'Song Practice',
        description:
          'Apply your skills by playing along with songs, focusing on rhythm and consistency.',
      },
      {
        title: 'Advanced Techniques',
        description:
          'Explore techniques like ghost notes, dynamic control, and complex patterns.',
      },
      {
        title: 'Performance Skills',
        description:
          'Build confidence to perform live or prepare for stage and certification exams.',
      },
    ],
    howYoullLearn: {
      heading: 'Personalized, Interactive & Mentor-Led',
      subheading:
        'Experience a fully guided one-on-one learning journey where every session is tailored to your pace, skill level, and goals.',
      intro:
        'Learn directly with an expert instructor who focuses on your individual progress. Each session is interactive, ensuring you actively play, practice, and improve in real time.',
      highlights: [
        '1:1 Live Sessions with dedicated instructor attention',
        'Personalized lesson plans based on your learning speed and goals',
        'Real-time feedback & correction to improve technique instantly',
        'Step-by-step guidance with clear explanations',
        'Instant doubt clarification during sessions',
        'Continuous feedback & performance tracking',
        'Flexible learning pace — progress comfortably',
      ],
      closing:
        "You won't just learn beats — you'll understand rhythm, timing, and musical flow with expert support at every step.",
    },
    outcomes: [
      'Play steady beats and grooves with strong timing and control',
      'Perform complete songs confidently with smooth transitions',
      'Understand rhythm theory and drum coordination techniques',
      'Apply fills, dynamics, and advanced patterns effectively',
      'Improve speed, endurance, and precision',
      'Develop your own drumming style and musical expression',
    ],
  },

  // ─── Flute Lessons ──────────────────────────────────────────────────────────
  {
    slug: 'flute-lessons',
    title: 'Master',
    titleHighlight: 'The Art of Flute',
    tagline:
      "The flute is a graceful and expressive instrument known for its soothing tone and melodic beauty. Whether you're a beginner or looking to refine your skills, our flute course is designed to help you develop control, clarity, and musical expression step by step.",
    description: [
      'Learn flute through a thoughtfully structured program designed for beginners, intermediate learners, and aspiring performers. This course helps you build a strong musical foundation while developing breath control, finger coordination, and tonal quality through guided, step-by-step learning.',
      "You'll begin with the basics—understanding the parts of the flute, posture, breathing techniques, and finger placement—and gradually progress towards playing complete melodies with confidence. Each lesson blends music theory with practical playing to ensure balanced learning.",
      "As you advance, you'll explore scales, note transitions, articulation techniques, and rhythm patterns that enhance your overall playing ability. The course also focuses on improving tone clarity, control, and expression—key elements that bring life to your music.",
      "Whether you're starting fresh or improving your current skills, this course adapts to your pace and learning style. With consistent practice, structured guidance, and performance-focused training, you'll gain both technical skill and artistic confidence.",
    ],
    level: 'Beginner',
    sessions: 48,
    weeks: 24,
    imageSrc: '/images/flute-instrument.jpg',
    videoSrc: 'https://www.youtube.com/embed/eigfzrp4Y44',
    category: 'Wind',
    whatYoullLearn: [
      {
        title: 'Flute Basics',
        description:
          'Understand posture, how to hold the flute, breathing techniques, and finger positioning.',
      },
      {
        title: 'Introduction to Music Theory',
        description:
          'Learn essential music concepts like notes, scales, and rhythm patterns.',
      },
      {
        title: 'Breath Control Techniques',
        description:
          'Develop proper breathing methods to produce a steady and clear tone.',
      },
      {
        title: 'Finger Placement & Coordination',
        description:
          'Learn accurate finger positioning and improve coordination for smooth note transitions.',
      },
      {
        title: 'Scales & Exercises',
        description:
          'Practice scales and exercises to improve flexibility, control, and precision.',
      },
      {
        title: 'Articulation Techniques',
        description:
          'Learn techniques like tonguing to produce clean and defined notes.',
      },
      {
        title: 'Rhythm & Timing',
        description:
          'Understand rhythm patterns and learn to play with consistent timing.',
      },
      {
        title: 'Song Practice',
        description:
          'Apply your skills by playing melodies with proper tone, rhythm, and expression.',
      },
      {
        title: 'Advanced Techniques',
        description:
          'Explore dynamics, expression control, and advanced fingering techniques.',
      },
      {
        title: 'Performance Skills',
        description:
          'Build confidence to perform independently or prepare for stage and certification exams.',
      },
    ],
    howYoullLearn: {
      heading: 'Personalized, Interactive & Mentor-Led',
      subheading:
        'Experience a fully guided one-on-one learning journey where every session is tailored to your pace, skill level, and goals.',
      intro:
        'Learn directly with an expert instructor who focuses on your individual progress. Each session is interactive, ensuring you actively practice, refine techniques, and improve in real time.',
      highlights: [
        '1:1 Live Sessions with dedicated instructor attention',
        'Personalized lesson plans based on your learning speed and goals',
        'Real-time feedback & correction to improve technique instantly',
        'Step-by-step guidance with clear explanations',
        'Instant doubt clarification during sessions',
        'Continuous feedback & performance tracking',
        'Flexible learning pace — progress comfortably',
      ],
      closing:
        "You won't just learn how to play — you'll understand breath control, tone production, and musical expression with expert support at every step.",
    },
    outcomes: [
      'Produce clear and steady tones with proper breath control',
      'Play melodies smoothly with accurate finger coordination',
      'Perform complete pieces with confidence and expression',
      'Understand core music theory and flute techniques',
      'Apply articulation and dynamics effectively',
      'Develop your own musical style and expressive ability',
    ],
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getRelatedCourses(slug: string, count = 3): Course[] {
  return courses.filter((c) => c.slug !== slug).slice(0, count);
}
