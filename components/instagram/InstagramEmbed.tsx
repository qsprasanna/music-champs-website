'use client';

// components/instagram/InstagramEmbed.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Performance pattern: Facade
//   - Shows a branded placeholder card (zero network cost)
//   - On click → loads the actual Instagram iframe
//   - Saves ~500KB JS + iframe HTTP requests for every unclicked post
//   - IntersectionObserver: only activates when visible in viewport
//
// No API key needed. Uses Instagram's native embed URL.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InstaPost } from '@/data/instagram';

type Props = {
  post: InstaPost;
  aspectRatio?: 'square' | 'portrait' | 'video';
  className?: string;
  // If thumbnail path provided (e.g. /images/insta/ABC123.jpg), shows real image
  // Otherwise shows branded placeholder
  thumbnailSrc?: string;
};

export default function InstagramEmbed({
  post,
  aspectRatio = 'square',
  className,
  thumbnailSrc,
}: Props) {
  const [active, setActive] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const embedUrl = `https://www.instagram.com/p/${post.shortcode}/embed/`;

  const aspectClass = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    video: 'aspect-video',
  }[aspectRatio];

  // Only mount iframe when near viewport (IntersectionObserver)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-neutral-100',
        aspectClass,
        className
      )}
    >
      {/* ── Iframe (only rendered when active) ── */}
      {active && inView ? (
        <iframe
          src={embedUrl}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title={post.caption}
          loading="lazy"
        />
      ) : (
        /* ── Facade placeholder ── */
        <div
          onClick={() => setActive(true)}
          className="absolute inset-0 flex w-full flex-col items-center justify-center text-center focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none focus-visible:ring-inset"
          aria-label={`Play Instagram video: ${post.caption}`}
        >
          {/* Background: thumbnail if provided, else branded gradient */}
          {thumbnailSrc ? (
            <Image src={thumbnailSrc} alt="" fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-red-950" />
          )}

          {/* Subtle dot grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
            aria-hidden="true"
          />

          {/* Red accent corner */}
          <div
            className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-red-500/20"
            aria-hidden="true"
          />

          {/* Instagram logo — top right */}
          <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
            <Instagram className="h-4 w-4 text-white" aria-hidden="true" />
          </div>

          {/* Badge */}
          {post.label && (
            <div className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-black tracking-wide text-white uppercase">
              {post.label}
            </div>
          )}

          {/* Play button */}
          <div className="relative z-10 mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-500 shadow-xl shadow-red-900/40 transition-transform duration-200 group-hover:scale-110">
            <Play
              className="ml-0.5 h-6 w-6 fill-white text-white"
              aria-hidden="true"
            />
          </div>

          {/* Caption */}
          <p className="relative z-10 max-w-[80%] text-xs leading-snug font-medium text-white/80">
            {post.caption}
          </p>
        </div>
      )}
    </div>
  );
}
