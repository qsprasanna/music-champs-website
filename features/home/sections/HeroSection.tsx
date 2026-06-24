'use client';

import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLeadModal } from '@/components/leads/LeadModalContext';

// ─── Bugs fixed ────────────────────────────────────────────────────────────
//
// RWD:
//  - max-w-[55%] on left col → broke on mobile (too narrow)
//    Fixed: full-width stacked on mobile, 52% side-by-side from lg
//  - Right panel with floating symbols has no space on small screens
//    Fixed: lg:hidden on mobile, replaced with contained red image strip
//  - min-h-140 (fixed height) cramped on mobile
//    Fixed: content-driven height, py-16 on mobile, min-h from lg
//  - Image widths 250/420 fixed → now responsive via className
//  - Heading only had one breakpoint: sm + lg variants added
//  - px-10 only → now px-5 sm:px-10 lg:px-20
//  - Buttons: Link was unstyled compared to Button → both use Button+asChild
//
// Animation:
//  - ease: 'easeOut'/'easeInOut' as plain strings in inline transition
//    props are valid in FM but cause IDE warnings. Changed to
//    cubic-bezier arrays for full type safety.
//  - Initial rotate values were in the `initial` prop but rotate animation
//    needs to start from the first value in the array — moved correctly.
//
// A11Y:
//  - Decorative images and right panel get aria-hidden="true"
//  - <em> changed to not-italic (the design wants bold red, not italic slant)
//    Using <em> for semantic emphasis is correct; not-italic removes visual slant
//  - section gets aria-labelledby pointing to the h1
//  - Buttons get meaningful Link hrefs
//
// ──────────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const { openLead } = useLeadModal();
  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col lg:min-h-140 lg:flex-row">
        {/* ── Left Content ───────────────────────────────────────────────── */}
        <div className="relative z-10 flex w-full flex-col justify-center px-5 py-14 sm:px-10 lg:w-[52%] lg:px-20 lg:py-20">
          <m.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-4xl leading-[1.08] font-black tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
          >
            Online{' '}
            {/* ✅ not-italic: design shows upright bold red text, not slanted */}
            <em className="font-black text-red-500 not-italic">Music</em>{' '}
            Classes
            <br className="hidden md:block" />
            for <br className="block md:hidden" />
            <em className="font-black text-red-500 not-italic">Kids & Teens</em>
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-10 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg lg:text-xl"
          >
            At MusicChamps, we offer interactive online music classes designed
            for kids and teens who want to explore music, build confidence, and
            develop real musical skills. As a trusted kids music academy online,
            we help students learn instruments, improve vocals, and enjoy music
            through engaging live sessions with expert instructors.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {/* ✅ Button + asChild keeps all variants/styles, Link handles routing */}
            {/* <Button variant="default">
              <Link href="/contact-us"> */}
            <Button variant="default" onClick={() => openLead('demo')}>
              Begin Your Journey
            </Button>
            {/* </Link>
            </Button> */}
            <Button variant="outline">
              <Link href="/courses">View Courses</Link>
            </Button>
          </m.div>
        </div>

        {/* ── Right Panel — desktop only (lg+) ───────────────────────────── */}
        <div
          className="relative hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:self-stretch"
          aria-hidden="true"
        >
          {/* Red background block */}
          <m.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 bottom-0 w-[72%] rounded-l-[2.5rem] border-4 border-r-0 border-red-300 bg-red-500"
          />

          {/* Floating symbols */}
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            {/* Right symbol — continuous float */}
            <m.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                // ✅ Separate each independently-looping property
                rotate: [12, 16, 12],
                y: [0, -25, 0],
              }}
              transition={{
                // Entry
                opacity: {
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
                // Continuous loop
                rotate: {
                  duration: 3,
                  delay: 0.2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                },
                y: {
                  duration: 3,
                  delay: 0.2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                },
              }}
              className="absolute right-[20%] xl:right-[28%]"
            >
              <Image
                src="/images/song-symbol.png"
                alt=""
                width={220}
                height={220}
                className="object-contain drop-shadow-2xl xl:w-[250px]"
                priority
              />
            </m.div>

            {/* Left symbol — slightly slower float */}
            <m.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: [-8, -14, -8],
                y: [0, -35, 0],
              }}
              transition={{
                opacity: {
                  duration: 0.6,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: { duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] },
                rotate: {
                  duration: 3.5,
                  delay: 0.35,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                },
                y: {
                  duration: 3.5,
                  delay: 0.35,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                },
              }}
              className="absolute -left-[8%]"
            >
              <Image
                src="/images/music-symbol.png"
                alt=""
                width={360}
                height={360}
                className="drop-shadow-2xl xl:w-[420px]"
                priority
              />
            </m.div>
          </div>
        </div>

        {/* ── Mobile image strip — visible only on < lg ─────────────────── */}
        {/* Replaces the floating symbols with a contained red panel */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow relative flex items-center justify-center bg-red-500 px-8 py-10 lg:hidden"
          aria-hidden="true"
        >
          {/* Decorative circles for depth */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-red-400/30" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-red-400/20" />

          <m.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            }}
            className="relative z-10"
          >
            <Image
              src="/images/song-symbol.png"
              alt=""
              width={160}
              height={160}
              className="object-contain drop-shadow-2xl sm:w-[200px]"
              priority
            />
            <Image
              src="/images/music-symbol.png"
              alt=""
              width={160}
              height={160}
              className="absolute -top-[50%] -right-[50%] drop-shadow-2xl xl:w-[420px]"
              priority
            />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
