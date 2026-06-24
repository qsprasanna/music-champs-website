'use client';

import { fadeUp, stagger } from '@/lib/animations';
import { m } from 'framer-motion';
// import { fadeUp, stagger } from "./AnimationVariant";
import { Heart, Users, Zap } from 'lucide-react';

export default function WhatWeBelieve() {
  return (
    <section className="w-full px-10 py-16 lg:px-20">
      <m.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-8"
      >
        <h2 className="mb-3 text-4xl leading-tight font-black text-neutral-900 lg:text-5xl">
          What we <span className="text-red-500">Believe</span>
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-500 lg:text-base">
          These beliefs guide everything we do from how we design our sessions
          to how we support each learner throughout their journey.
        </p>
      </m.div>

      {/* Bento Grid */}
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-4 md:grid-cols-2"
      >
        {/* Row 1 */}
        <m.div
          variants={fadeUp}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          className="relative flex min-h-[260px] cursor-default flex-col justify-end overflow-hidden rounded-3xl bg-red-500 p-8"
        >
          {/* Waveform decoration */}
          <div className="absolute top-6 left-6 flex items-center gap-1 opacity-40">
            {[3, 6, 4, 8, 5, 9, 4, 7, 3].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-white"
                style={{ height: `${h * 4}px` }}
              />
            ))}
          </div>
          {/* Faded waveform right side */}
          <div className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center gap-1 opacity-15">
            {[5, 8, 4, 10, 6, 9, 5, 8, 4].map((h, i) => (
              <div
                key={i}
                className="w-2 rounded-full bg-white"
                style={{ height: `${h * 6}px` }}
              />
            ))}
          </div>
          <h3 className="relative z-10 mb-2 text-2xl leading-tight font-black text-white">
            Music for Everyone
          </h3>
          <p className="relative z-10 max-w-xs text-sm leading-relaxed text-red-100">
            Music is a universal language meant for all. No matter your age or
            background, you deserve the chance to learn and express.
          </p>
        </m.div>

        <m.div
          variants={fadeUp}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          className="flex min-h-[260px] flex-col gap-4 rounded-3xl border-2 border-neutral-100 bg-white p-8 shadow-sm"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Users className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-black text-neutral-900">
              Personalized Learning
            </h3>
            <p className="text-sm leading-relaxed text-neutral-500">
              Every learner is unique — your journey adapts to your pace, goals,
              and style for better, more enjoyable learning.
            </p>
          </div>
        </m.div>

        {/* Row 2 */}
        <m.div
          variants={fadeUp}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          className="flex min-h-[240px] flex-col gap-4 rounded-3xl border-2 border-neutral-100 bg-white p-8 shadow-sm"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Zap className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-black text-neutral-900">
              Consistency
              <br />
              Drives Growth
            </h3>
            <p className="text-sm leading-relaxed text-neutral-500">
              Progress comes from showing up consistently. With the right
              guidance and structure, small efforts turn into meaningful
              results.
            </p>
          </div>
        </m.div>

        <m.div
          variants={fadeUp}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          className="relative flex min-h-[240px] cursor-default flex-col justify-end overflow-hidden rounded-3xl bg-red-500 p-8"
        >
          {/* Heart icon large bg */}
          <div className="absolute top-4 left-6 opacity-20">
            <Heart className="h-20 w-20 text-white" />
          </div>
          {/* Waveform faded bg right */}
          <div className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center gap-1 opacity-15">
            {[4, 7, 5, 9, 6, 8, 5].map((h, i) => (
              <div
                key={i}
                className="w-2 rounded-full bg-white"
                style={{ height: `${h * 5}px` }}
              />
            ))}
          </div>
          <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900">
            <Heart className="h-7 w-7 fill-red-500 text-red-500" />
          </div>
          <h3 className="relative z-10 mb-2 text-2xl leading-tight font-black text-white">
            Guided by Great Mentors
          </h3>
          <p className="relative z-10 max-w-xs text-sm leading-relaxed text-red-100">
            Great mentors make a lasting difference. We guide, support, and
            inspire you at every step of your learning journey.
          </p>
        </m.div>
      </m.div>
    </section>
  );
}
