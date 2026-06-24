// 'use client';

// // features/contact-us/sections/TestimonialVideos.tsx
// // Horizontal scroll carousel of student testimonial videos from Instagram.
// // Add before or after the FAQ section in ContactUs.tsx

// import { useRef, useState } from 'react';
// import { m } from 'framer-motion';
// import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
// import InstagramEmbed from '@/components/instagram/InstagramEmbed';
// import { testimonialVideos } from '@/data/instagram';
// import { fadeUp, stagger } from '@/lib/animations';
// import { cn } from '@/lib/utils';

// const defaultViewport = { once: true, amount: 0.1 } as const;

// export default function TestimonialVideos() {
//   const trackRef = useRef<HTMLDivElement>(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);

//   const SCROLL_BY = 340;

//   const scroll = (dir: 'left' | 'right') => {
//     const el = trackRef.current;
//     if (!el) return;
//     el.scrollBy({
//       left: dir === 'left' ? -SCROLL_BY : SCROLL_BY,
//       behavior: 'smooth',
//     });
//   };

//   const onScroll = () => {
//     const el = trackRef.current;
//     if (!el) return;
//     setCanScrollLeft(el.scrollLeft > 8);
//     setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
//   };

//   if (testimonialVideos.length === 0) return null;

//   return (
//     <section
//       aria-labelledby="testimonial-videos-heading"
//       className="w-full overflow-hidden bg-neutral-50 px-5 py-14 sm:px-10 lg:px-20"
//     >
//       {/* Header */}
//       <m.div
//         initial={{ opacity: 0, y: 24 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={defaultViewport}
//         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         className="mb-8 flex items-end justify-between"
//       >
//         <div>
//           <p
//             className="mb-2 text-xs font-black tracking-widest text-red-500 uppercase"
//             aria-hidden="true"
//           >
//             ♦ Student Stories
//           </p>
//           <h2
//             id="testimonial-videos-heading"
//             className="text-3xl font-black tracking-tight text-neutral-900 lg:text-4xl"
//           >
//             Hear it from <span className="text-red-500">Our Students</span>
//           </h2>
//           <p className="mt-2 text-sm leading-relaxed text-neutral-500">
//             Real experiences, real growth. Watch what our students have to say.
//           </p>
//         </div>

//         {/* Nav arrows — desktop only */}
//         <div className="hidden items-center gap-2 lg:flex">
//           <button
//             onClick={() => scroll('left')}
//             disabled={!canScrollLeft}
//             className={cn(
//               'flex h-10 w-10 items-center justify-center rounded-full border-2 transition',
//               canScrollLeft
//                 ? 'border-neutral-200 text-neutral-600 hover:border-red-300 hover:text-red-500'
//                 : 'cursor-not-allowed border-neutral-100 text-neutral-300'
//             )}
//             aria-label="Scroll left"
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </button>
//           <button
//             onClick={() => scroll('right')}
//             disabled={!canScrollRight}
//             className={cn(
//               'flex h-10 w-10 items-center justify-center rounded-full border-2 transition',
//               canScrollRight
//                 ? 'border-neutral-200 text-neutral-600 hover:border-red-300 hover:text-red-500'
//                 : 'cursor-not-allowed border-neutral-100 text-neutral-300'
//             )}
//             aria-label="Scroll right"
//           >
//             <ChevronRight className="h-5 w-5" />
//           </button>
//         </div>
//       </m.div>

//       {/* Carousel track */}
//       <div
//         ref={trackRef}
//         onScroll={onScroll}
//         className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
//         role="list"
//         aria-label="Student testimonial videos"
//       >
//         {testimonialVideos.map((post) => (
//           <div
//             key={post.shortcode}
//             role="listitem"
//             className="w-[280px] shrink-0 snap-start sm:w-[300px]"
//           >
//             <div className="flex flex-col gap-3">
//               <InstagramEmbed
//                 post={post}
//                 aspectRatio="portrait"
//                 className="rounded-2xl shadow-sm"
//               />

//               {/* Caption card */}
//               <div className="rounded-xl border border-neutral-100 bg-white px-4 py-3 shadow-sm">
//                 {post.label && (
//                   <span className="mb-1 block text-xs font-black tracking-wide text-red-500 uppercase">
//                     {post.label}
//                   </span>
//                 )}
//                 <p className="text-sm leading-snug font-medium text-neutral-700">
//                   {post.caption}
//                 </p>
//                 <a
//                   href={`https://www.instagram.com/p/${post.shortcode}/`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="mt-2 flex items-center gap-1 text-xs text-neutral-400 transition hover:text-red-500 focus-visible:ring-1 focus-visible:ring-red-400 focus-visible:outline-none"
//                   aria-label="View on Instagram (opens in new tab)"
//                 >
//                   <Instagram className="h-3 w-3" aria-hidden="true" />
//                   View on Instagram
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Mobile swipe hint */}
//       <p
//         className="mt-3 text-center text-xs text-neutral-400 lg:hidden"
//         aria-hidden="true"
//       >
//         ← Swipe to see more →
//       </p>
//     </section>
//   );
// }

'use client';

// features/contact-us/sections/TestimonialVideos.tsx

import { useRef, useState, useEffect, useCallback } from 'react';
import { m } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import InstagramEmbed from '@/components/instagram/InstagramEmbed';
import { testimonialVideos } from '@/data/instagram';
import { cn } from '@/lib/utils';

// ─── Mobile improvements ──────────────────────────────────────────────────────
// 1. Cards: 85vw on mobile (one card fills screen + next card peeks) → 300px on lg
// 2. Scroll progress dots — update live as user swipes
// 3. Arrow buttons visible on ALL sizes (smaller on mobile)
// 4. useEffect initialises canScrollRight correctly on mount
// 5. scrollbar-none applied via inline style fallback for all browsers
// ─────────────────────────────────────────────────────────────────────────────

const defaultViewport = { once: true, amount: 0.1 } as const;
const SCROLL_BY = 320;

export default function TestimonialVideos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = testimonialVideos.length;

  // Update scroll state + active dot
  const syncState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
    // Derive active card from scroll position
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16 // 16 = gap-4
      : SCROLL_BY;
    setActiveIndex(Math.round(scrollLeft / cardWidth));
  }, []);

  // Initialise on mount (clientWidth available after hydration)
  useEffect(() => {
    syncState();
    window.addEventListener('resize', syncState);
    return () => window.removeEventListener('resize', syncState);
  }, [syncState]);

  const scroll = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({
      left: dir === 'left' ? -SCROLL_BY : SCROLL_BY,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  };

  if (total === 0) return null;

  return (
    <section
      aria-labelledby="testimonial-videos-heading"
      className="max-w-full overflow-hidden bg-neutral-50 px-5 py-14 sm:px-10 lg:px-20"
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={defaultViewport}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 flex items-start justify-between gap-4"
      >
        <div>
          <p
            className="mb-2 text-xs font-black tracking-widest text-red-500 uppercase"
            aria-hidden="true"
          >
            ♦ Student Stories
          </p>
          <h2
            id="testimonial-videos-heading"
            className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl"
          >
            Hear it from <span className="text-red-500">Our Students</span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            Real experiences, real growth. Watch what our students have to say.
          </p>
        </div>

        {/* Arrow nav — visible on all sizes, smaller on mobile */}
        <div className="flex shrink-0 items-center gap-2 self-end pb-1">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border-2 transition lg:h-10 lg:w-10',
              canScrollLeft
                ? 'border-neutral-200 text-neutral-600 hover:border-red-300 hover:text-red-500'
                : 'cursor-not-allowed border-neutral-100 text-neutral-300'
            )}
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full border-2 transition lg:h-10 lg:w-10',
              canScrollRight
                ? 'border-neutral-200 text-neutral-600 hover:border-red-300 hover:text-red-500'
                : 'cursor-not-allowed border-neutral-100 text-neutral-300'
            )}
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
          </button>
        </div>
      </m.div>

      {/* ── Carousel track ─────────────────────────────────────────────────── */}
      {/*
        Mobile:  card = 85vw  → one card fills screen, next card peeks ~10%
        sm:      card = 300px → 2 cards visible
        lg:      card = 300px → 3 cards visible (wider container)
      */}
      <div
        ref={trackRef}
        onScroll={syncState}
        // className="flex w-[85vw] shrink-0 snap-start sm:w-[300px]"
        className="mx-auto flex w-[85vw] snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          overflowX: 'auto',
          maxWidth: '100%',
        }}
        role="list"
        aria-label="Student testimonial videos"
      >
        {/* Hide scrollbar in webkit */}
        <style>{`
          [aria-label="Student testimonial videos"]::-webkit-scrollbar { display: none; }
        `}</style>

        {testimonialVideos.map((post) => (
          <div
            key={post.shortcode}
            role="listitem"
            className="w-[85vw] shrink-0 snap-start sm:w-[300px]"
          >
            <div className="flex flex-col gap-3">
              <InstagramEmbed
                post={post}
                aspectRatio="portrait"
                className="rounded-2xl shadow-sm"
              />

              {/* Caption card */}
              <div className="rounded-xl border border-neutral-100 bg-white px-4 py-3 shadow-sm">
                {post.label && (
                  <span className="mb-1 block text-xs font-black tracking-wide text-red-500 uppercase">
                    {post.label}
                  </span>
                )}
                <p className="text-sm leading-snug font-medium text-neutral-700">
                  {post.caption}
                </p>
                <a
                  href={`https://www.instagram.com/p/${post.shortcode}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-1 text-xs text-neutral-400 transition hover:text-red-500 focus-visible:ring-1 focus-visible:ring-red-400 focus-visible:outline-none"
                  aria-label="View on Instagram (opens in new tab)"
                >
                  <Instagram className="h-3 w-3" aria-hidden="true" />
                  View on Instagram
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Scroll progress dots ───────────────────────────────────────────── */}
      {total > 1 && (
        <div
          className="mt-5 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={cn(
                'rounded-full transition-all duration-300',
                i === activeIndex
                  ? 'h-2 w-6 bg-red-500' // active: pill shape
                  : 'h-2 w-2 bg-neutral-300 hover:bg-red-300' // inactive: circle
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
