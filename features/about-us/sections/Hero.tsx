'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { fadeUp, stagger } from '@/lib/animations';

const defaultViewport = { once: true, amount: 0.15 } as const;

export default function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="w-full overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        {/* ── Left — Text ─────────────────────────────────────────────────── */}
        <m.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex max-w-xl flex-1 flex-col gap-5 px-5 pt-10 pb-8 sm:px-10 lg:ps-20 lg:pt-12 lg:pb-16"
        >
          <m.p
            variants={fadeUp}
            className="text-xs font-black tracking-widest text-neutral-400 uppercase"
            aria-hidden="true"
          >
            About us
          </m.p>

          {/* ✅ Single h1 — two lines via span */}
          <m.h1
            id="about-hero-heading"
            variants={fadeUp}
            className="text-4xl leading-tight font-black tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="text-neutral-900">About</span>
            <br />
            <span className="text-red-500">Music Champs</span>
          </m.h1>

          <m.p
            variants={fadeUp}
            className="border-l-2 border-dashed border-neutral-200 pl-4 text-sm leading-relaxed text-neutral-500 lg:text-base"
          >
            Our platform serves as a digital conservatory, where students of all
            levels can access world-class instruction, community support, and
            the technical tools required to excel in the modern music industry.
          </m.p>

          <m.p
            variants={fadeUp}
            className="border-l-2 border-dashed border-neutral-300 pl-4 text-base leading-snug font-bold text-neutral-800 lg:text-xl"
          >
            MusicChamps is a global platform that empowers future musicians with
            expert-led, structured education.
          </m.p>
        </m.div>

        {/* ── Right — Cassette + Red Panel ────────────────────────────────── */}

        {/* Mobile: full-width red strip with centered cassette — no absolute positioning */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center overflow-hidden bg-red-500 px-8 py-10 lg:hidden"
          aria-hidden="true"
        >
          {/* Faint circles for depth */}
          <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-red-400/30" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-red-400/20" />

          <m.div
            animate={{
              y: [0, -14, 0],
              rotate: [-4, 0, -4],
              scale: [0.97, 1, 0.97],
            }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            }}
            className="relative z-10 w-64 sm:w-80"
          >
            <Image
              src="/images/cassette.png"
              alt="Music Champs cassette"
              width={400}
              height={400}
              className="h-full w-full object-contain drop-shadow-2xl"
              priority
            />
          </m.div>
        </m.div>

        {/* Desktop: original red panel + floating cassette (hidden on mobile) */}
        <div
          className="relative hidden min-h-[480px] flex-1 items-center justify-center self-stretch lg:flex"
          aria-hidden="true"
        >
          {/* Red background block */}
          <m.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 bottom-0 w-[72%] rounded-l-[2.5rem] border-4 border-r-0 border-red-300 bg-red-500"
          />

          {/* Floating cassette */}
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 50,
              y: [0, -20, 0],
              rotate: [-6, -2, -6],
            }}
            transition={{
              opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              x: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
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
            className="relative z-10 w-[75%] max-w-[500px]"
          >
            <Image
              src="/images/cassette.png"
              alt="Music Champs cassette"
              width={500}
              height={500}
              className="h-full w-full object-contain drop-shadow-2xl"
              priority
            />
          </m.div>
        </div>
      </div>
    </section>
  );
}
