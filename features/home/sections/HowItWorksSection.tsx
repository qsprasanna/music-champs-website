'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { m, AnimatePresence, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLeadModal } from '@/components/leads/LeadModalContext';

// ─── Fixes ────────────────────────────────────────────────────────────────
// RWD:
//  1. Fixed pixel widths (400/300) break on mobile → split into
//     MobileStepCard (full-width vertical stack, lg:hidden) and
//     DesktopStepCard (original layout, hidden lg:flex). Same visual concept.
//  2. `container mx-auto` + `px-10` = conflicting padding → removed container.
//  3. `max-w-3/4` is not a standard Tailwind utility → `max-w-lg`.
//  4. `px-5 sm:px-10 lg:px-20` for mobile edge breathing room.
//  5. Heading text-size: added sm: breakpoint.
//  6. Button `self-start` so it doesn't stretch full-width on mobile.
//
// A11y:
//  7. Section aria-labelledby → h2.
//  8. Step cards wrapped in role="list/listitem".
//  9. Indicator pills get role="tab" + aria-selected + aria-label.
//  10. Mobile toggle buttons get aria-expanded.
//  11. Active description gets aria-live="polite".
//  12. Decorative image (pixel-bg) gets empty alt + aria-hidden.
//
// Code:
//  13. Extracted MobileStepCard + DesktopStepCard components → cleaner.
//  14. `defaultViewport` applied to all whileInView calls.
// ─────────────────────────────────────────────────────────────────────────

const steps = [
  {
    id: 1,
    number: '01',
    titleSmall: 'Choose Your',
    titleBig: 'Instrument',
    imageSrc: '/images/step-instrument.png',
    imageActiveSrc: '/images/step-instrument-hover.png',
    imageAlt: 'Choose instrument',
    description: 'Explore instruments and find the perfect music course.',
  },
  {
    id: 2,
    number: '02',
    titleSmall: null,
    titleBig: 'Book a Trial Class',
    imageSrc: '/images/step-trial.png',
    imageActiveSrc: '/images/step-trial-hover.png',
    imageAlt: 'Book trial',
    description: 'Experience our teaching style and meet expert instructors.',
  },
  {
    id: 3,
    number: '03',
    titleSmall: 'Train with',
    titleBig: 'Experts',
    imageSrc: '/images/step-experts.png',
    imageActiveSrc: '/images/step-experts-hover.png',
    imageAlt: 'Train with experts',
    description: 'Attend structured online music classes with live guidance.',
  },
  {
    id: 4,
    number: '04',
    titleSmall: 'Practice, Perform &',
    titleBig: 'Improve',
    imageSrc: '/images/step-perform.png',
    imageActiveSrc: '/images/step-perform-hover.png',
    imageAlt: 'Practice and improve',
    description:
      'Build confidence, improve skills, and enjoy your musical journey.',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const defaultViewport = { once: true, amount: 0.15 } as const;

// ─────────────────────────────────────────────────────────────────────────────
// Mobile card — vertical row, click to expand description (< lg)
// ─────────────────────────────────────────────────────────────────────────────

function MobileStepCard({
  step,
  isActive,
  onSelect,
}: {
  step: (typeof steps)[0];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <m.div
      variants={cardVariants}
      layout
      className="w-full overflow-hidden rounded-2xl transition-shadow"
      style={{
        background: isActive ? '#ffffff' : '#ef4444',
        border: isActive ? '2px solid #f87171' : '2px solid transparent',
        boxShadow: isActive ? '0 12px 32px -8px rgba(239,68,68,0.2)' : 'none',
      }}
    >
      {/* Tap target — header row */}
      <button
        onClick={onSelect}
        disabled={isActive}
        aria-expanded={isActive}
        className="flex w-full items-center gap-4 px-4 py-4 text-left focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none focus-visible:ring-inset sm:px-5"
      >
        {/* Number */}
        <span
          className="shrink-0 text-xl leading-none font-black sm:text-2xl"
          style={{ color: isActive ? '#ef4444' : 'rgba(255,255,255,0.5)' }}
          aria-hidden="true"
        >
          {step.number}
        </span>

        {/* Thumbnail */}
        <div className="relative h-12 w-12 shrink-0" aria-hidden="true">
          <Image
            src={isActive ? step.imageActiveSrc : step.imageSrc}
            alt=""
            fill
            className="object-contain"
          />
        </div>

        {/* Title */}
        <div className="min-w-0 flex-1">
          {step.titleSmall && (
            <p
              className="text-xs leading-none font-medium"
              style={{ color: isActive ? '#9ca3af' : 'rgba(255,255,255,0.65)' }}
            >
              {step.titleSmall}
            </p>
          )}
          <h3
            className="text-sm leading-snug font-black sm:text-base"
            style={{ color: isActive ? '#ef4444' : '#ffffff' }}
          >
            {step.titleBig}
          </h3>
        </div>
      </button>

      {/* Expandable description */}
      <AnimatePresence initial={false}>
        {isActive && (
          <m.div
            key="desc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
            aria-live="polite"
          >
            <p className="px-4 pb-5 text-sm leading-relaxed text-neutral-500 sm:px-5">
              {step.description}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop card — original horizontal layout (lg+)
// ─────────────────────────────────────────────────────────────────────────────

function DesktopStepCard({
  step,
  isActive,
  isHovered,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: {
  step: (typeof steps)[0];
  isActive: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <m.div
      layout
      variants={cardVariants}
      onClick={() => !isActive && onSelect()}
      onHoverStart={() => !isActive && onHoverStart()}
      onHoverEnd={onHoverEnd}
      animate={{ y: isHovered && !isActive ? -10 : 0 }}
      transition={{
        layout: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
        y: { duration: 0.25 },
      }}
      className="relative flex shrink-0 flex-col overflow-hidden rounded-3xl focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
      style={{
        width: isActive ? 400 : 300,
        minHeight: isActive ? 440 : 370,
        background: isActive ? '#ffffff' : '#ef4444',
        border: isActive ? '2px solid #f87171' : '2px solid transparent',
        cursor: isActive ? 'default' : 'pointer',
        boxShadow: isActive
          ? '0 20px 48px -12px rgba(239,68,68,0.3)'
          : isHovered
            ? '0 16px 32px -8px rgba(239,68,68,0.5)'
            : 'none',
      }}
    >
      {/* Active corner arcs */}
      <AnimatePresence>
        {isActive && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-0 z-10"
            aria-hidden="true"
          >
            <div className="absolute top-4 right-4 h-12 w-12 rounded-full border-2 border-red-200 opacity-60" />
            <div className="absolute top-7 right-7 h-6 w-6 rounded-full border-2 border-red-200 opacity-40" />
          </m.div>
        )}
      </AnimatePresence>

      {/* Shine sweep */}
      <AnimatePresence>
        {isHovered && !isActive && (
          <m.div
            initial={{ x: '-100%', opacity: 0.6 }}
            animate={{ x: '200%', opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 z-20"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Darken overlay */}
      <m.div
        animate={{ opacity: isHovered && !isActive ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-0 z-10 rounded-3xl"
        aria-hidden="true"
        style={{ background: 'rgba(180,0,0,0.12)' }}
      />

      {/* Number */}
      <m.span
        layout="position"
        animate={{
          color: isActive ? '#ef4444' : 'rgba(255,255,255,0.45)',
          fontSize: isActive ? '44px' : '36px',
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-5 left-5 z-10 leading-none font-black"
        aria-hidden="true"
      >
        {step.number}
      </m.span>

      {/* Illustration — crossfade default ↔ active */}
      <div
        className="relative z-10 mx-4"
        style={{ marginTop: 56, minHeight: 200, flex: 1 }}
      >
        <m.div
          animate={{ opacity: isActive ? 0 : 1 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
        >
          <Image
            src={step.imageSrc}
            alt={step.imageAlt}
            fill
            className="object-contain"
          />
        </m.div>
        <m.div
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
        >
          <Image
            src={step.imageActiveSrc}
            alt={step.imageAlt}
            fill
            className="object-contain"
          />
        </m.div>
      </div>

      {/* Text */}
      <div className="relative z-10 px-5 pt-3 pb-6">
        {step.titleSmall && (
          <m.p
            animate={{ color: isActive ? '#9ca3af' : 'rgba(255,255,255,0.65)' }}
            transition={{ duration: 0.3 }}
            className="mb-1 text-sm leading-none font-medium"
          >
            {step.titleSmall}
          </m.p>
        )}
        <m.h3
          layout="position"
          animate={{
            color: isActive ? '#ef4444' : '#ffffff',
            fontSize: isActive ? '22px' : '18px',
          }}
          transition={{ duration: 0.3 }}
          className="leading-tight font-black"
        >
          {step.titleBig}
        </m.h3>

        <AnimatePresence>
          {isActive && (
            <m.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden text-sm leading-relaxed text-neutral-500"
              aria-live="polite"
            >
              {step.description}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────

export default function HowItWorksSection() {
  const [activeId, setActiveId] = useState(2);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { openLead } = useLeadModal();
  // const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveId((prev) => {
  //       const currentIndex = steps.findIndex((step) => step.id === prev);
  //       const nextIndex = (currentIndex + 1) % steps.length;
  //       return steps[nextIndex].id;
  //     });
  //   }, 4000); // change card every 4s

  //   return () => clearInterval(interval);
  // }, []);
  // useEffect(() => {
  //   if (isPaused) return;

  //   const interval = setInterval(() => {
  //     setActiveId((prev) => {
  //       const currentIndex = steps.findIndex((step) => step.id === prev);
  //       const nextIndex = (currentIndex + 1) % steps.length;
  //       return steps[nextIndex].id;
  //     });
  //   }, 6000);

  //   return () => clearInterval(interval);
  // }, [isPaused]);
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024); // Tailwind lg breakpoint
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);
  // useEffect(() => {
  //   if (!isDesktop) return;

  //   const interval = setInterval(() => {
  //     setActiveId((prev) => {
  //       const currentIndex = steps.findIndex((step) => step.id === prev);
  //       const nextIndex = (currentIndex + 1) % steps.length;
  //       return steps[nextIndex].id;
  //     });
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, [isDesktop]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isDesktop || isPaused) return;

    const interval = setInterval(() => {
      setActiveId((prev) => {
        const currentIndex = steps.findIndex((step) => step.id === prev);
        const nextIndex = (currentIndex + 1) % steps.length;
        return steps[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isDesktop, isPaused]);

  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="w-full overflow-hidden bg-white px-5 py-14 sm:px-10 lg:px-20 lg:py-16"
    >
      {/* Eyebrow */}
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={defaultViewport}
        className="mb-4 text-xs font-black tracking-widest text-red-500 uppercase"
        aria-hidden="true"
      >
        ♦ How It Works
      </m.p>

      {/* Header */}
      <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-start lg:gap-8">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-1"
        >
          <h2
            id="how-it-works-heading"
            className="text-3xl leading-tight font-black tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl"
          >
            Start Learning Music in
            <br />
            <span className="text-red-500">Simple Steps.</span>
          </h2>
          <div
            className="pointer-events-none absolute -top-4 -right-12 hidden opacity-15 lg:block"
            aria-hidden="true"
          >
            <Image src="/images/pixel-bg.png" width={400} height={400} alt="" />
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-1 flex-col gap-5 lg:pt-2"
        >
          <p className="max-w-lg text-base leading-relaxed text-neutral-600 lg:text-lg">
            Start your musical journey with MusicChamps. Our step-by-step
            process helps students explore interests, build foundations, and
            grow their skills confidently.
          </p>
          {/* <Button variant="soft-red" className="self-start"> */}
          <Button
            variant="soft-red"
            className="self-start"
            onClick={() => openLead('trial')}
          >
            Book Your Trial Class
          </Button>
        </m.div>
      </div>

      {/* ── Mobile: vertical accordion-style stack (< lg) ─────────────────── */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="flex flex-col gap-3 lg:hidden"
        role="list"
        aria-label="Steps to get started"
      >
        {steps.map((step) => (
          <div key={step.id} role="listitem">
            <MobileStepCard
              step={step}
              isActive={activeId === step.id}
              onSelect={() => setActiveId(step.id)}
            />
          </div>
        ))}
      </m.div>

      {/* ── Desktop: original horizontal card layout (lg+) ─────────────────── */}
      {/* <m.div
        layout
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="hidden items-end justify-center gap-4 lg:flex"
        role="list"
        aria-label="Steps to get started"
      > */}
      <m.div
        layout
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="hidden items-end justify-center gap-4 lg:flex"
        role="list"
        aria-label="Steps to get started"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {steps.map((step) => (
          <div key={step.id} role="listitem">
            <DesktopStepCard
              step={step}
              isActive={activeId === step.id}
              isHovered={hoveredId === step.id}
              // onSelect={() => setActiveId(step.id)}
              onSelect={() => {
                setActiveId(step.id);
                setIsPaused(true);

                setTimeout(() => {
                  setIsPaused(false);
                }, 5000);
              }}
              onHoverStart={() => setHoveredId(step.id)}
              onHoverEnd={() => setHoveredId(null)}
            />
          </div>
        ))}
      </m.div>

      {/* Indicator pills */}
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={defaultViewport}
        transition={{ delay: 0.5 }}
        className="mt-8 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Step navigation"
      >
        {steps.map((step) => (
          <m.button
            key={step.id}
            role="tab"
            aria-selected={step.id === activeId}
            aria-label={`Step ${step.number}: ${step.titleBig}`}
            onClick={() => setActiveId(step.id)}
            animate={{
              width: step.id === activeId ? 28 : 10,
              backgroundColor: step.id === activeId ? '#ef4444' : '#e5e7eb',
            }}
            whileHover={{ backgroundColor: '#fca5a5' }}
            transition={{ duration: 0.3 }}
            className="h-2.5 rounded-full focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:outline-none"
          />
        ))}
      </m.div>
    </section>
  );
}
