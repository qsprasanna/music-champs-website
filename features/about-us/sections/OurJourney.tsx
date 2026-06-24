'use client';

import Image from 'next/image';
import { m, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { fadeUp, stagger } from '@/lib/animations';

// ─── Fixes ────────────────────────────────────────────────────────────────────
// Mobile:
//  1. px-10 → px-5 sm:px-10 lg:px-20
//  2. Dark card: p-10 → p-6 sm:p-10 lg:p-12
//  3. Counter: text-7xl on mobile is too large → text-5xl sm:text-6xl lg:text-7xl
//  4. Music note image: h-40 w-40 fine but on mobile when stacked it dominates →
//     reduced to h-32 w-32 sm:h-48 sm:w-48 md:h-60 md:w-60
//  5. viewport: added amount:0.15 to all whileInView calls
//  6. Animation: entry (opacity/scale) mixed with loop (y/rotate) — split per
//     previous pattern so entry fires once cleanly
// ─────────────────────────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const duration = 1600 + Math.random() * 400;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(easeOut(progress) * value));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(value);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span
      ref={ref}
      className="text-5xl leading-none font-black text-red-500 tabular-nums sm:text-6xl lg:text-7xl"
    >
      {count}
      {suffix}
    </span>
  );
}

const defaultViewport = { once: true, amount: 0.15 } as const;

export default function OurJourney() {
  const stats = [
    { value: 400, suffix: '+', label: 'Students Learning Music' },
    { value: 50, suffix: '+', label: 'Expert Music Instructors' },
    { value: 7, suffix: '+', label: 'Music Courses Available' },
  ];

  return (
    <section
      aria-labelledby="journey-heading"
      className="w-full px-5 py-14 sm:px-10 lg:px-20 lg:py-16"
    >
      {/* Dark Card */}
      <m.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="relative mb-10 flex flex-col items-center gap-6 overflow-hidden rounded-3xl border-4 border-red-500 bg-gradient-to-r from-red-900 via-neutral-900 via-90% to-red-900 p-6 sm:gap-8 sm:p-10 lg:flex-row lg:p-12"
      >
        {/* Text */}
        <div className="z-10 flex flex-1 flex-col gap-4">
          <h2
            id="journey-heading"
            className="text-2xl leading-tight font-black text-white sm:text-3xl lg:text-4xl"
          >
            Our Professional
            <br />
            Journey Continues
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-neutral-400 sm:text-base lg:text-lg">
            What started as a small group of passionate instructors offering
            remote workshops has evolved into a comprehensive global network.
            Over the years, we have refined our methodology to meet the changing
            needs of the digital age.
          </p>
        </div>

        {/* Floating music note */}
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={defaultViewport}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            // entry
            opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            // loop
            y: {
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            },
            rotate: {
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            },
          }}
          // ✅ smaller on mobile so it doesn't dominate the stacked layout
          className="relative z-10 h-32 w-32 shrink-0 sm:h-48 sm:w-48 md:h-60 md:w-60"
          aria-hidden="true"
        >
          <Image
            src="/images/song-music-symbol.png"
            alt=""
            fill
            className="object-contain"
          />
        </m.div>

        {/* Gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-transparent"
          aria-hidden="true"
        />
      </m.div>

      {/* Body text */}
      <m.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="mb-12 max-w-2xl text-sm leading-relaxed font-semibold text-neutral-800 sm:text-base lg:text-lg"
      >
        With dedication, we&apos;ve helped many students start their musical
        journey, overcome hesitation, and reach milestones. Every learner&apos;s
        progress is part of our story.
      </m.p>

      {/* Stats */}
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="grid grid-cols-3 gap-4 md:gap-6"
      >
        {stats.map((stat, i) => (
          <m.div
            key={i}
            variants={fadeUp}
            className="flex flex-col items-center gap-2 text-center"
          >
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <span className="text-xs font-bold text-neutral-700 sm:text-sm lg:text-xl">
              {stat.label}
            </span>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
