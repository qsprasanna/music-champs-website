'use client';

import { fadeUp, stagger } from '@/lib/animations';
import { m } from 'framer-motion';
// import { fadeUp, stagger } from './AnimationVariant';
import { CheckCircle2 } from 'lucide-react';
const teachItems = [
  {
    title: 'Immersive Curriculum',
    description:
      'Comprehensive courses designed by industry veterans to take you from foundational basics to advanced artistry.',
  },
  {
    title: 'Interactive Feedback',
    description:
      'Get real-time critiques and personalized video responses from masters of your specific instrument.',
  },
  {
    title: 'Collaborative Ecosystem',
    description:
      'Connect with a global community of peers for jam sessions, peer reviews, and creative networking.',
  },
  {
    title: 'Industry Integration',
    description:
      'Learn not just how to play, but how to navigate the business, from marketing to digital distribution.',
  },
];

export default function HowWeTeach() {
  return (
    <section className="w-full px-10 py-16 lg:px-20">
      <m.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12 text-4xl font-black text-neutral-900 lg:text-5xl"
      >
        How we <span className="text-red-500">Teach</span>
      </m.h2>

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 gap-x-16 gap-y-10 sm:grid-cols-2"
      >
        {teachItems.map((item, i) => (
          <m.div key={i} variants={fadeUp} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-red-500" />
              <h3 className="text-xl font-black text-neutral-900 lg:text-2xl">
                {item.title}
              </h3>
            </div>
            <p className="pl-9 text-sm leading-relaxed text-neutral-500 lg:text-base">
              {item.description}
            </p>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
