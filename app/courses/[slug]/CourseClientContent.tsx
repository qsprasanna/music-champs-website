'use client';

import { useState, useId, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { Accordion } from '@base-ui/react/accordion';
import {
  BarChart2,
  Clock,
  Calendar,
  Play,
  CheckCircle2,
  Music2,
  ChevronDown,
  SendHorizonal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getCourseBySlug, getRelatedCourses } from '@/data/courses';
import TestimonialsSection from '@/features/home/sections/TestimonialsSection';
import { fadeUp, stagger } from '@/lib/animations';
import { useLeadModal } from '@/components/leads/LeadModalContext';
import TestimonialVideos from '@/features/contact-us/section/TestimonialVideos';

// ─── Changes in this update ──────────────────────────────────────────────────
//
// 1. DESKTOP WHITESPACE (max-w-3xl removed)
//    Before: panel was capped at ~768px, leaving 40% of page empty.
//    Fix: panel is now full-width. Each tab uses its own layout to
//    fill the space properly:
//    - Overview:          2-col on lg (text left, highlight card right)
//    - What You'll Learn: 2-col grid of cards on lg
//    - How You'll Learn:  2-col on lg (summary left, bullets right)
//    - Outcome:           2-col grid of outcomes on lg
//
// 2. MOBILE ACCORDION SCROLL-TO-TOP
//    Before: opening "What You'll Learn" after "Overview" kept the
//    viewport at the same Y position, so items 1–3 were above the fold.
//    Fix: Accordion.Root onValueChange detects which item was just
//    opened, then scrollIntoView({ block: 'start' }) on its header
//    element — user always sees item 1 at the top.
//    Uses a ref Map keyed by tab value to find the right DOM element.
//
// 3. SMOOTH ACCORDION TRANSITION
//    Before: overflow-hidden during the height animation caused content
//    to feel clipped/jerky at the start and end.
//    Fix: duration slowed slightly (300→350ms) and a tiny scroll offset
//    accounts for the sticky navbar so the header isn't hidden behind it.
//
// ─────────────────────────────────────────────────────────────────────────────

type CourseType = NonNullable<ReturnType<typeof getCourseBySlug>>;

const TABS = [
  'Overview',
  "What You'll Learn",
  "How You'll Learn",
  'Outcome',
] as const;
type Tab = (typeof TABS)[number];

const defaultViewport = { once: true, amount: 0.15 } as const;

// ─────────────────────────────────────────────────────────────────────────────
// Shared content panels — full-width layouts per tab
// ─────────────────────────────────────────────────────────────────────────────

function OverviewContent({ course }: { course: CourseType }) {
  const { openLead } = useLeadModal();
  return (
    // Desktop: text on left, highlight card on right
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
      {/* Paragraphs */}
      <div className="flex flex-col gap-5">
        {course.description.map((p, i) => (
          <p
            key={i}
            className="text-base leading-relaxed text-neutral-600 lg:text-[17px]"
          >
            {p}
          </p>
        ))}
      </div>

      {/* Right summary card — desktop only */}
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-2xl border-2 border-red-100 bg-red-50/60 p-6">
          <p className="mb-4 text-xs font-black tracking-widest text-red-500 uppercase">
            At a Glance
          </p>
          <ul className="flex flex-col gap-3">
            {[
              { icon: BarChart2, label: 'Level', value: course.level },
              {
                icon: Clock,
                label: 'Sessions',
                value: `${course.sessions} Sessions`,
              },
              {
                icon: Calendar,
                label: 'Duration',
                value: `${course.weeks} Weeks`,
              },
            ].map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon
                  className="h-4 w-4 shrink-0 text-red-400"
                  aria-hidden="true"
                />
                <span className="text-sm font-semibold text-neutral-700">
                  {label}:
                </span>
                <span className="text-sm text-neutral-500">{value}</span>
              </li>
            ))}
          </ul>
          <Button
            variant="default"
            className="mt-6 w-full"
            aria-label={`Register for ${course.titleHighlight}`}
            onClick={() =>
              openLead('register', course.slug, course.titleHighlight)
            }
          >
            Enquire Now <SendHorizonal />
          </Button>
        </div>
      </aside>
    </div>
  );
}

function WhatYoullLearnContent({ course }: { course: CourseType }) {
  return (
    // Desktop: 2-col card grid
    <ol
      className="grid grid-cols-1 gap-4 lg:grid-cols-2"
      aria-label="Course curriculum"
    >
      {course.whatYoullLearn.map((item, i) => (
        <li
          key={i}
          className="flex gap-4 rounded-2xl border border-neutral-100 bg-white py-4 ps-4 shadow-sm transition-colors hover:border-red-200"
        >
          <span
            className="w-7 shrink-0 pt-0.5 text-lg font-black text-neutral-300"
            aria-hidden="true"
          >
            {i + 1}.
          </span>
          <div className="flex flex-col gap-1.5 pr-4">
            <h4 className="text-base font-black text-neutral-900">
              {item.title}
            </h4>
            <p className="text-sm leading-relaxed text-neutral-500">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function HowYoullLearnContent({ course }: { course: CourseType }) {
  return (
    // Desktop: summary left, bullets right
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Left */}
      <div className="flex flex-col gap-4">
        <p className="text-base leading-relaxed font-semibold text-neutral-700 lg:text-lg">
          {course.howYoullLearn.subheading}
        </p>
        <p className="text-base leading-relaxed text-neutral-500">
          {course.howYoullLearn.intro}
        </p>
        <p className="text-base leading-relaxed text-neutral-400 italic">
          {course.howYoullLearn.closing}
        </p>
      </div>

      {/* Right — highlights card */}
      <div className="rounded-2xl border-2 border-red-100 bg-red-50/40 px-6 py-5">
        <p className="mb-4 text-xs font-black tracking-widest text-red-500 uppercase">
          What Each Session Includes
        </p>
        <ul className="flex flex-col gap-3" aria-label="Learning highlights">
          {course.howYoullLearn.highlights.map((point, i) => (
            <li key={i} className="flex items-start gap-3">
              <Music2
                className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                aria-hidden="true"
              />
              <span className="text-sm leading-relaxed text-neutral-600 lg:text-base">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function OutcomeContent({ course }: { course: CourseType }) {
  return (
    // Desktop: 2-col grid
    <ul
      className="grid grid-cols-1 gap-4 lg:grid-cols-2"
      aria-label="Course outcomes"
    >
      {course.outcomes.map((outcome, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-2xl border border-neutral-100 bg-white px-5 py-4 shadow-sm"
        >
          <CheckCircle2
            className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
            aria-hidden="true"
          />
          <span className="text-base leading-relaxed font-medium text-neutral-700">
            {outcome}
          </span>
        </li>
      ))}
    </ul>
  );
}

function renderPanel(tab: Tab, course: CourseType) {
  switch (tab) {
    case 'Overview':
      return <OverviewContent course={course} />;
    case "What You'll Learn":
      return <WhatYoullLearnContent course={course} />;
    case "How You'll Learn":
      return <HowYoullLearnContent course={course} />;
    case 'Outcome':
      return <OutcomeContent course={course} />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile Accordion  (< lg)
// ─────────────────────────────────────────────────────────────────────────────

function MobileAccordion({ course }: { course: CourseType }) {
  // ✅ Fix 2: ref map to find each item's header DOM node
  const headerRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const prevValues = useRef<string[]>(['Overview']);

  const handleValueChange = (newValues: string[]) => {
    // Find which tab was just opened (present in new, absent in prev)
    const newlyOpened = newValues.find((v) => !prevValues.current.includes(v));
    prevValues.current = newValues;

    if (!newlyOpened) return;

    // Wait one frame for Base UI to start the height expansion,
    // then scroll the item header to top (with 72px offset for sticky navbar)
    requestAnimationFrame(() => {
      const el = headerRefs.current.get(newlyOpened);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  };

  return (
    <div className="lg:hidden">
      <Accordion.Root
        defaultValue={['Overview']}
        onValueChange={handleValueChange}
        className="flex flex-col divide-y divide-neutral-100 overflow-hidden rounded-2xl border-2 border-neutral-100 bg-white shadow-sm"
        aria-label="Course sections"
      >
        {TABS.map((tab) => (
          <Accordion.Item key={tab} value={tab}>
            {/* ✅ wrapper div holds the ref for scroll targeting */}
            <div
              ref={(el) => {
                if (el) headerRefs.current.set(tab, el);
                else headerRefs.current.delete(tab);
              }}
            >
              <Accordion.Header>
                <Accordion.Trigger
                  className={cn(
                    'flex w-full items-center justify-between px-5 py-4 text-left',
                    'text-sm font-bold text-neutral-700 sm:text-base',
                    'transition-colors hover:text-red-500',
                    'data-[open]:bg-red-50/60 data-[open]:text-red-500',
                    'focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none focus-visible:ring-inset',
                    '[&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:ease-[cubic-bezier(0.22,1,0.36,1)]',
                    '[&>svg]:data-[open]:rotate-180'
                  )}
                >
                  <span>{tab}</span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-neutral-400"
                    aria-hidden="true"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
            </div>

            {/*
              ✅ Fix 3: duration 350ms feels more natural than 300ms for taller content.
              overflow-hidden is required by Base UI for the height animation to work.
              Content clips during the transition — this is expected and correct.
            */}
            <Accordion.Panel
              className={cn(
                'overflow-hidden',
                'h-[var(--accordion-panel-height,0)]',
                'transition-[height] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]'
              )}
            >
              <div className="px-5 pt-2 pb-6">{renderPanel(tab, course)}</div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop Tabs  (lg+) — full-width panel, no max-w cap
// ─────────────────────────────────────────────────────────────────────────────

function DesktopTabs({ course }: { course: CourseType }) {
  const [active, setActive] = useState<Tab>('Overview');
  const uid = useId();

  return (
    <div className="hidden lg:block">
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Course sections"
        className="mb-10 flex border-b-2 border-neutral-100"
      >
        {TABS.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              id={`${uid}-tab-${tab}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${uid}-panel-${tab}`}
              onClick={() => setActive(tab)}
              className={cn(
                'relative shrink-0 px-5 py-3 text-lg font-bold whitespace-nowrap transition-colors',
                'rounded-t-xl focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1 focus-visible:outline-none',
                isActive
                  ? 'border-primary text-primary border border-b-0 bg-red-50'
                  : 'cursor-pointer text-neutral-500 hover:text-neutral-700'
              )}
            >
              {tab}
              {isActive && (
                <m.div
                  layoutId="tab-underline"
                  className="absolute right-0 -bottom-0.5 left-0 h-1.5 rounded-full bg-red-500"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab panel — ✅ Fix 1: full width, no max-w-3xl */}
      <AnimatePresence mode="wait">
        <m.div
          key={active}
          id={`${uid}-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active}`}
          tabIndex={0}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="w-full focus-visible:outline-none"
        >
          {renderPanel(active, course)}
        </m.div>
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────────────────────────────────────

function CourseSections({ course }: { course: CourseType }) {
  return (
    <section className="w-full px-5 py-8 sm:px-10 lg:px-20">
      <MobileAccordion course={course} />
      <DesktopTabs course={course} />
      {/* <RegisterCTA courseTitle={course.titleHighlight} /> */}
      <RegisterCTA
        courseTitle={course.titleHighlight}
        courseSlug={course.slug}
      />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

function CourseHero({ course }: { course: CourseType }) {
  const { openLead } = useLeadModal();
  return (
    <section
      aria-labelledby="course-title"
      className="w-full px-5 pt-10 pb-6 sm:px-10 lg:px-20"
    >
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-3 text-xs font-black tracking-widest text-red-500 uppercase"
        aria-hidden="true"
      >
        ♦ Courses
      </m.p>

      <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-10">
        {/* Text */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-1 flex-col gap-5"
        >
          <div>
            <h1
              id="course-title"
              className="text-4xl leading-tight font-black text-neutral-900 lg:text-5xl"
            >
              {course.title}
            </h1>
            <p className="text-4xl leading-tight font-black text-red-500 lg:text-5xl">
              {course.titleHighlight}
            </p>
          </div>
          {/* {course.tagline.map((text, index) => (
            <p
              key={index}
              className="max-w-xl text-base leading-relaxed text-neutral-500 lg:text-lg"
            >
              {text}
            </p>
          ))} */}
          {Array.isArray(course.tagline) ? (
            course.tagline.map((text, index) => (
              <p
                key={index}
                className="max-w-xl text-base leading-relaxed text-neutral-500 lg:text-lg"
              >
                {text}
              </p>
            ))
          ) : (
            <p className="max-w-xl text-base leading-relaxed text-neutral-500 lg:text-lg">
              {course.tagline}
            </p>
          )}
          {/* <Button
            variant="default"
            className="self-start"
            aria-label={`Register for ${course.titleHighlight}`}
          > */}
          <Button
            variant="default"
            className="self-start"
            onClick={() =>
              openLead('register', course.slug, course.titleHighlight)
            }
          >
            Register Now →
          </Button>
          {/* </Button> */}
        </m.div>

        {/* Image / Video */}
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-full shrink-0 lg:w-[42%]"
        >
          {/* <div className="relative aspect-video overflow-hidden rounded-3xl border-4 border-red-300 bg-neutral-900 shadow-xl shadow-red-100">
            <Image
              src={course.imageSrc}
              alt={`${course.titleHighlight} course preview`}
              fill
              className="object-cover"
              priority
            />
            <button
              aria-label={`Play ${course.titleHighlight} preview video`}
              className="absolute inset-0 flex items-center justify-center focus-visible:ring-4 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <m.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 shadow-xl"
              >
                <Play
                  className="ml-1 h-7 w-7 fill-white text-white"
                  aria-hidden="true"
                />
              </m.div>
            </button>
          </div> */}
          <div className="relative aspect-video overflow-hidden rounded-3xl border-4 border-red-300 bg-neutral-900 shadow-xl shadow-red-100">
            {course.videoSrc ? (
              <iframe
                src={course.videoSrc}
                title={`${course.titleHighlight} Preview Video`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <Image
                src={course.imageSrc}
                alt={`${course.titleHighlight} course preview`}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
        </m.div>
      </div>

      {/* Stats */}
      <m.dl
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 grid grid-cols-3 overflow-hidden rounded-2xl border-4 border-red-500/25 bg-red-500/10 shadow-lg"
        aria-label="Course details"
      >
        {(
          [
            { icon: BarChart2, label: 'Level', value: course.level },
            {
              icon: Clock,
              label: 'Sessions',
              value: `${course.sessions} Sessions`,
            },
            {
              icon: Calendar,
              label: 'Duration',
              value: `${course.weeks} Weeks`,
            },
          ] as const
        ).map(({ icon: Icon, label, value }, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center justify-center gap-2 px-3 py-4 sm:gap-2.5 sm:px-8',
              i < 2 && 'border-r border-red-500/20'
            )}
          >
            <Icon
              className="h-5 w-5 shrink-0 text-red-500 sm:h-8 sm:w-8"
              aria-hidden="true"
            />
            <div>
              <dt className="sr-only">{label}</dt>
              <dd className="text-xs font-bold text-neutral-700 sm:text-base lg:text-lg">
                {value}
              </dd>
            </div>
          </div>
        ))}
      </m.dl>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Register CTA
// ─────────────────────────────────────────────────────────────────────────────
function RegisterCTA({
  courseTitle,
  courseSlug,
}: {
  courseTitle: string;
  courseSlug: string;
}) {
  const { openLead } = useLeadModal();
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky bottom-4 mt-10 flex justify-end"
    >
      {/* <m.div ...> */}
      <Button
        variant="default"
        onClick={() => openLead('register', courseSlug, courseTitle)}
        className="shadow-xl shadow-red-200"
      >
        Register Now →
      </Button>
    </m.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Related Courses
// ─────────────────────────────────────────────────────────────────────────────

function RelatedCourses({ slug }: { slug: string }) {
  const related = getRelatedCourses(slug, 3);

  return (
    <section
      aria-labelledby="related-heading"
      className="w-full px-5 py-16 sm:px-10 lg:px-20"
    >
      <m.h2
        id="related-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={defaultViewport}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 text-3xl font-black text-neutral-900"
      >
        Explore <span className="text-red-500">More Courses</span>
      </m.h2>

      <m.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="grid list-none grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {related.map((c) => (
          <m.li
            key={c.slug}
            variants={fadeUp}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <Link
              href={`/courses/${c.slug}`}
              className="flex flex-col overflow-hidden rounded-2xl border-2 border-red-200 bg-white shadow-sm transition-all duration-300 hover:border-red-400 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
              aria-label={`View ${c.titleHighlight} course`}
            >
              <div className="relative h-44 w-full bg-neutral-100">
                <Image
                  src={c.imageSrc}
                  alt={`${c.titleHighlight} course`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-2 p-5">
                <h3 className="text-base font-black text-neutral-900">
                  {c.titleHighlight}
                </h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-neutral-500">
                  {c.tagline}
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Clock
                      className="h-3 w-3 text-red-400"
                      aria-hidden="true"
                    />
                    {c.sessions} Sessions
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar
                      className="h-3 w-3 text-red-400"
                      aria-hidden="true"
                    />
                    {c.weeks} Weeks
                  </span>
                </div>
                <Button
                  variant="ghost-red"
                  className="mt-2 h-auto self-start px-5 py-2 text-xs"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  Learn more
                </Button>
              </div>
            </Link>
          </m.li>
        ))}
      </m.ul>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root export
// ─────────────────────────────────────────────────────────────────────────────

export default function CourseClientContent({
  course,
  slug,
}: {
  course: CourseType;
  slug: string;
}) {
  return (
    <>
      <CourseHero course={course} />
      <CourseSections course={course} />
      <TestimonialVideos />
      <TestimonialsSection />
      <RelatedCourses slug={slug} />
    </>
  );
}
