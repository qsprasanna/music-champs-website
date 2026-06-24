// data/instagram.ts
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A NEW VIDEO:
//   1. Open the Instagram post on web browser
//   2. The URL looks like: https://www.instagram.com/p/ABC123xyz/
//   3. Copy the part between /p/ and the trailing / → that's the shortcode
//   4. Add a new entry in the relevant array below
// ─────────────────────────────────────────────────────────────────────────────

export type InstaPost = {
  shortcode: string; // e.g. "ABC123xyz" from instagram.com/p/ABC123xyz/
  caption: string; // short display caption (not scraped, you write it)
  label?: string; // optional badge label, e.g. "Annual Concert 2024"
  course?: string; // for course videos: which course slug
};

// ── About page: events & highlights ──────────────────────────────────────────
// Replace the shortcodes below with your real Instagram post shortcodes.
export const eventVideos: InstaPost[] = [
  {
    shortcode: 'DHIzE31M0il',
    caption:
      'New Gen - Techade for Sustainable Enterprises (MSMEs) Prosperity for All,',
    label: 'ALEAP International Conference ',
  },
  {
    shortcode: 'C_F9m-Ryzcr',
    caption: 'ALEAP WE HUB Event',
    label: 'ALEAP WE HUB',
  },
  {
    shortcode: 'DWelUdjk8D7',
    caption: 'ALEAP WEKART Exhibition',
    label: 'ALEAP WEKART Exhibition',
  },
  {
    shortcode: 'DW1eE-Lk5dk',
    caption: ' ALEAP WE-HUB WEKART',
    label: ' ALEAP WE-HUB WEKART',
  },
  {
    shortcode: 'DRZ-4umks2A',
    caption: 'MusicChamps services are now live on the APNRT website',
    label: 'MusicChamps on APNRT',
  },
  {
    shortcode: 'DYKo82RCFV0',
    caption: 'Canada is learning Piano Level 2 piece ',
    label: 'Student from the Canada',
  },
];

// ── Contact page: student testimonial videos ──────────────────────────────────
export const testimonialVideos: InstaPost[] = [
  {
    shortcode: 'DLJSG1Gybmc',
    caption:
      'Celebrating the power of music Happy World Music Day from MusicChamps.',
    label: 'Happy World Music Day from MusicChamps',
  },
  {
    shortcode: 'DYxAc38iEIz',
    caption: '"NRI student performance"',
    label: 'Guitar Student',
  },
  {
    shortcode: 'DYFkof1Ppv1',
    caption:
      '"With the gentle guidance of her coach, Dr. Shruthi, and a few powerful live classes at MusicChamps, her confidence has blossomed beautifully."',
    label: 'Carnatic Vocal Student',
  },
  {
    shortcode: 'DXM5RYpD5Ee',
    caption: '"Big shoutout to our star student Bhavik from the USA!"',
    label: 'Drums performance',
  },
  {
    shortcode: 'DUliwSukgV2',
    caption:
      '"This is what happens when learning turns into emotion and music turns into a voice"',
    label: 'All Student',
  },
  {
    shortcode: 'DTxjLzkj8EX',
    caption:
      '"Sudha Cheeda from Canada successfully learned guitar while managing her professional career."',
    label: 'Guitar Student',
  },
  {
    shortcode: 'DSaM-tOj83A',
    caption: '"A beautiful moment from our live class"',
    label: 'Western vocals',
  },
  {
    shortcode: 'DQtL4CYkt7E',
    caption:
      '"Learned to play “Faded” on guitar in just five lessons with mentor Arijit"',
    label: 'Guitar Student',
  },
];

// ── Course detail page: per-course student videos ─────────────────────────────
// Add entries with the course slug matching your courses data.
export const courseVideos: InstaPost[] = [
  // Guitar
  {
    shortcode: 'REPLACE_GUITAR_1',
    caption: 'Student performing first song',
    course: 'guitar-lessons',
    label: 'Beginner',
  },
  {
    shortcode: 'REPLACE_GUITAR_2',
    caption: 'Strumming techniques in action',
    course: 'guitar-lessons',
    label: 'Intermediate',
  },
  {
    shortcode: 'REPLACE_GUITAR_3',
    caption: 'Solo performance after 3 months',
    course: 'guitar-lessons',
    label: 'Progress',
  },
  // Keyboard
  {
    shortcode: 'REPLACE_KEYBOARD_1',
    caption: 'Playing chords with both hands',
    course: 'keyboard-and-piano',
    label: 'Beginner',
  },
  {
    shortcode: 'REPLACE_KEYBOARD_2',
    caption: 'Classical piece after 6 months',
    course: 'keyboard-and-piano',
    label: 'Progress',
  },
  // Vocals
  {
    shortcode: 'REPLACE_VOCALS_1',
    caption: 'Student vocal performance',
    course: 'vocal-training',
    label: 'Student',
  },
  {
    shortcode: 'REPLACE_VOCALS_2',
    caption: 'Pitch control exercise session',
    course: 'vocal-training',
    label: 'Training',
  },
  // Drums
  {
    shortcode: 'REPLACE_DRUMS_1',
    caption: 'First drum groove session',
    course: 'drum-classes',
    label: 'Beginner',
  },
  {
    shortcode: 'REPLACE_DRUMS_2',
    caption: 'Full kit performance',
    course: 'drum-classes',
    label: 'Progress',
  },
  // Violin
  {
    shortcode: 'REPLACE_VIOLIN_1',
    caption: 'Beginner bowing techniques',
    course: 'violin-lessons',
    label: 'Beginner',
  },
  // Ukulele
  {
    shortcode: 'REPLACE_UKULELE_1',
    caption: 'Strumming and chord transitions',
    course: 'ukulele-classes',
    label: 'Student',
  },
  // Flute
  {
    shortcode: 'REPLACE_FLUTE_1',
    caption: 'First melody on flute',
    course: 'flute-lessons',
    label: 'Beginner',
  },
];

// Helper
export function getCourseVideos(slug: string): InstaPost[] {
  return courseVideos.filter((v) => v.course === slug);
}
