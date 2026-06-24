'use client';

import Image from 'next/image';
import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sneha Prasad',
    role: 'Parent of Keyboard Student',
    avatarSrc: null,
    initials: 'SP',
    quote:
      'My daughter started keyboard classes with no prior experience. Within a few months, she was confidently playing songs and looking forward to every session. The teachers are patient, encouraging, and genuinely care about each student’s progress.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Rahul Kumar',
    role: 'Guitar Student',
    avatarSrc: null,
    initials: 'RK',
    quote:
      'The one-on-one attention makes a huge difference. Every lesson is personalized, and the instructor always explains concepts in a way that is easy to understand. I have improved more in six months than I did through years of self-learning.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Anusha Sharma',
    role: 'Parent of Guitar Student',
    avatarSrc: null,
    initials: 'AS',
    quote:
      'What impressed me most was the structured curriculum and regular feedback. My son has become more confident, disciplined, and excited about music since joining MusicChamps.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Vivek Patel',
    role: 'Keyboard Student',
    avatarSrc: null,
    initials: 'VP',
    quote:
      'The online classes are interactive and engaging. The instructor corrects mistakes in real time and keeps the sessions enjoyable. I never thought learning music online could be this effective.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Nisha Menon',
    role: 'Vocal Student',
    avatarSrc: null,
    initials: 'NM',
    quote:
      'The vocal training program helped me improve my pitch, breathing, and confidence. The mentors are supportive, motivating, and always encourage me to perform at my best.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Sravani Reddy',
    role: 'Parent of Ukulele Student',
    avatarSrc: null,
    initials: 'SR',
    quote:
      'My child eagerly waits for every class. The teaching approach is simple, encouraging, and perfectly suited for young learners. We have seen tremendous improvement in both skill and confidence.',
    rating: 5,
  },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-red-400 text-red-400" />
      ))}
    </div>
  );
}

function Avatar({
  src,
  initials,
  name,
}: {
  src: string | null;
  initials: string;
  name: string;
}) {
  return src ? (
    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-red-200">
      <Image src={src} alt={name} fill className="object-cover" />
    </div>
  ) : (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-red-400 bg-red-500">
      <span className="text-xs font-black text-white">{initials}</span>
    </div>
  );
}

function TestimonialCard({
  t,
  highlighted = false,
}: {
  t: (typeof testimonials)[0];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl p-5 transition-all duration-300 ${
        highlighted
          ? 'border-2 border-red-400 bg-white shadow-xl shadow-red-100'
          : 'border border-red-100 bg-red-50'
      }`}
    >
      <Stars count={t.rating} />
      <p
        className={`text-sm leading-relaxed font-medium ${highlighted ? 'text-neutral-800' : 'text-neutral-400'}`}
      >
        &quot;{t.quote}&quot;
      </p>
      <div className="flex items-center gap-3">
        <Avatar src={t.avatarSrc} initials={t.initials} name={t.name} />
        <div>
          <p className="text-sm font-black text-neutral-900">{t.name}</p>
          <p className="text-xs text-neutral-400">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const n = testimonials.length;

  const prev = () => setActiveIndex((i) => (i - 1 + n) % n);
  const next = () => setActiveIndex((i) => (i + 1) % n);

  const stack = [
    testimonials[(activeIndex - 1 + n) % n],
    testimonials[activeIndex],
    testimonials[(activeIndex + 1) % n],
  ];

  return (
    <section className="w-full bg-white px-10 py-16 lg:px-20">
      {/* Eyebrow */}
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-3 text-xs font-black tracking-widest text-red-500 uppercase"
      >
        ♦ Student Stories
      </m.p>

      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl leading-tight font-black tracking-tight text-neutral-900 lg:text-5xl">
          Feedback and Testimonials
        </h2>
        <h3 className="mb-12 text-3xl font-black text-red-500 lg:text-4xl">
          About Our Courses
        </h3>
      </m.div>

      {/* Video + Stacked Slider */}
      <m.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-14 flex flex-col items-center gap-8 lg:flex-row"
      >
        {/* Video */}
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl border-8 border-red-500 bg-neutral-900 lg:w-[48%]">
          <iframe
            src="https://www.youtube.com/embed/uI0WjZkGE54?si=nixBH05bz6T276eI"
            className="h-full w-full"
            allowFullScreen
          />
        </div>

        {/* Card Stack + Nav */}
        <div className="flex flex-1 items-center gap-4">
          <div className="flex flex-1 flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {/* Ghost top */}
              <m.div
                key={`top-${activeIndex}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 0.35, y: 0 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none origin-bottom scale-[0.97]"
              >
                <TestimonialCard t={stack[0]} />
              </m.div>

              {/* Active */}
              <m.div
                key={`active-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialCard t={stack[1]} highlighted />
              </m.div>

              {/* Ghost bottom */}
              <m.div
                key={`bot-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.35, y: 0 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none origin-top scale-[0.97]"
              >
                <TestimonialCard t={stack[2]} />
              </m.div>
            </AnimatePresence>
          </div>

          {/* Nav */}
          <div className="flex shrink-0 flex-col gap-2">
            <m.button
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-colors hover:bg-red-600"
            >
              <ChevronUp className="h-5 w-5" />
            </m.button>
            <m.button
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition-colors hover:bg-red-600"
            >
              <ChevronDown className="h-5 w-5" />
            </m.button>
          </div>
        </div>
      </m.div>

      {/* Bottom 3 Static Cards */}
      {/* <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((t, i) => (
          <m.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            className="flex flex-col gap-3 rounded-2xl border-2 border-red-200 bg-white p-5 transition-all duration-300 hover:border-red-400 hover:shadow-md"
          >
            <Stars count={t.rating} />
            <p className="text-sm leading-relaxed font-medium text-neutral-700">
              "{t.quote}"
            </p>
            <div className="mt-1 flex items-center gap-3">
              <Avatar src={t.avatarSrc} initials={t.initials} name={t.name} />
              <div>
                <p className="text-sm font-black text-neutral-900">{t.name}</p>
                <p className="text-xs text-neutral-400">{t.role}</p>
              </div>
            </div>
          </m.div>
        ))}
      </m.div> */}
    </section>
  );
}
