// lib/seo/schemas.ts
// JSON-LD structured data schemas for Schema.org
// Usage: pass the return value into <JsonLd schema={...} /> in layout/page

import { site } from '@/config/site';

// ─── Organization / MusicSchool ───────────────────────────────────────────────
// Add once in app/layout.tsx — appears on every page
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicSchool',
    name: 'MusicChamps',
    alternateName: 'Musicchamps Technologies Private Limited',
    url: site.url,
    logo: `${site.url}/music-champs-logo.png`,
    description:
      'MusicChamps provides live online music classes for kids and teens with expert instructors for guitar, piano, vocals, drums, violin, flute, and ukulele.',
    telephone: '', // ← add phone number when available
    email: 'contact@musicchamps.com',
    sameAs: [site.socials.instagram, site.socials.facebook],
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'G-305 Aparna Cyberzon, Kanchigachibowli Road, Lingampalli',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500019',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '17.3850',
      longitude: '78.4867',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '21:00',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Online Music Courses',
      itemListElement: [
        'Guitar Lessons',
        'Keyboard & Piano Classes',
        'Vocal Training',
        'Drum Classes',
        'Violin Lessons',
        'Ukulele Classes',
        'Flute Lessons',
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Course', name },
      })),
    },
  };
}

// ─── Homepage FAQ ─────────────────────────────────────────────────────────────
// Add in app/page.tsx (homepage)
export function homeFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the best online music classes for kids?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MusicChamps offers interactive live online music classes for kids and teens with expert instructors for guitar, piano, vocals, drums, violin, flute, and ukulele. Classes are 1-on-1, flexible, and designed for all skill levels.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can beginners join online music classes at MusicChamps?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, MusicChamps welcomes complete beginners. Our structured curriculum starts from the basics and progresses at the student's own pace with step-by-step guidance from expert instructors.",
        },
      },
      {
        '@type': 'Question',
        name: 'What instruments does MusicChamps teach online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'MusicChamps offers online classes for guitar, keyboard and piano, vocals, drums, violin, ukulele, and flute. All classes are conducted live via video conferencing.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do online music classes at MusicChamps work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Students attend 1-on-1 live sessions with a dedicated instructor over video call. Lessons are personalised to the student's age, skill level, and learning goals. Students can choose flexible class timings that suit their schedule.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does MusicChamps offer a trial class?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, MusicChamps offers a free trial class so students can experience the teaching style and interact with instructors before enrolling.',
        },
      },
    ],
  };
}

// ─── Course page FAQ ──────────────────────────────────────────────────────────
// Add in app/courses/[slug]/page.tsx
export function courseFaqSchema(courseName: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Who can join ${courseName} classes at MusicChamps?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `MusicChamps ${courseName} classes are open to beginners, intermediate learners, and aspiring performers of all ages. No prior experience is needed to get started.`,
        },
      },
      {
        '@type': 'Question',
        name: `Are ${courseName} classes at MusicChamps live or recorded?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `All ${courseName} classes at MusicChamps are conducted as live 1-on-1 sessions with a dedicated expert instructor over video call.`,
        },
      },
      {
        '@type': 'Question',
        name: `How long does it take to learn ${courseName} at MusicChamps?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Progress depends on the student's pace and practice frequency. MusicChamps offers structured programs that help students build a strong foundation and progress towards confident playing through consistent, guided lessons.`,
        },
      },
    ],
  };
}

// ─── Course page Course schema ────────────────────────────────────────────────
// Add in app/courses/[slug]/page.tsx alongside FAQ schema
export function courseSchema({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url: `${site.url}/courses/${slug}`,
    provider: {
      '@type': 'MusicSchool',
      name: 'MusicChamps',
      url: site.url,
    },
    educationalLevel: 'Beginner to Advanced',
    teaches: name,
    courseMode: 'online',
    inLanguage: 'en',
    isAccessibleForFree: false,
    offers: {
      '@type': 'Offer',
      category: 'Online Music Course',
      availability: 'https://schema.org/InStock',
    },
  };
}
