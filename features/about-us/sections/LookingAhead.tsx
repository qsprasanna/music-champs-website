'use client';

import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { fadeUp } from '@/lib/animations';
import { useLeadModal } from '@/components/leads/LeadModalContext';

// ─── Fixes ────────────────────────────────────────────────────────────────────
// Mobile:
//  1. px-10 → px-5 sm:px-10 lg:px-20
//  2. Card: px-10 py-14 → px-5 py-10 sm:px-10 sm:py-14
//  3. Image: h-60 w-60 fixed → h-40 w-40 sm:h-52 sm:w-52 lg:h-60 lg:w-60
//     On mobile when stacked vertically a 240px image dominates the card.
//  4. Button: missing self-start — stretches full width on mobile → self-start
//  5. Text: text-sm on mobile for description is fine but heading
//     text-4xl/5xl is large on 375px — added sm: breakpoint
//  6. Animation: split entry from loop (same pattern as OurJourney)
//  7. viewport: amount:0.15 added
// ─────────────────────────────────────────────────────────────────────────────

const defaultViewport = { once: true, amount: 0.15 } as const;

export default function LookingAhead() {
  const { openLead } = useLeadModal();
  return (
    <section
      aria-labelledby="looking-ahead-heading"
      className="w-full px-5 py-10 sm:px-10 lg:px-20"
    >
      <m.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl bg-red-500 px-5 py-10 sm:px-10 sm:py-14 lg:flex-row lg:gap-10"
      >
        {/* Text */}
        <div className="relative z-10 flex flex-1 flex-col gap-4 sm:gap-5">
          <h2
            id="looking-ahead-heading"
            className="text-3xl leading-tight font-black text-white sm:text-4xl lg:text-5xl"
          >
            Looking Ahead !
          </h2>

          <p className="max-w-xl text-sm leading-relaxed text-red-100 sm:text-base lg:text-lg">
            As we look toward the future, Music Champs is committed to
            continuous innovation in the field of music education. We are
            exploring new technologies, including AI-driven practice tools and
            virtual reality performance spaces.
          </p>

          <p className="max-w-xl text-sm leading-relaxed text-red-200 sm:text-base lg:text-lg">
            Our goal remains steadfast: to remain the premier destination for
            musical growth, fostering a vibrant, global community where mastery
            has no limits.
          </p>

          {/* ✅ self-start prevents button stretching full-width on mobile */}
          <div className="self-start">
            {/* <Button variant="default"> */}
            <Button variant="ghost-red" onClick={() => openLead('demo')}>
              {/* <Link href="/contact-us"> */}
              Start Your Journey
              {/* </Link> */}
              {/* </Button> */}
            </Button>
          </div>
        </div>

        {/* Decorative music symbol */}
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={defaultViewport}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            opacity: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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
          // ✅ smaller on mobile — 160px instead of 240px when stacked
          className="relative z-10 h-40 w-40 shrink-0 sm:h-52 sm:w-52 lg:h-60 lg:w-60"
          aria-hidden="true"
        >
          <Image
            src="/images/song-symbol.png"
            alt=""
            fill
            className="object-contain opacity-90"
          />
        </m.div>

        {/* Decorative circles */}
        <div
          className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-red-400 opacity-30 sm:h-48 sm:w-48"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-6 right-32 h-16 w-16 rounded-full bg-red-300 opacity-20 sm:h-24 sm:w-24"
          aria-hidden="true"
        />
      </m.div>
    </section>
  );
}
