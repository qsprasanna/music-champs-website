'use client';

import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { X, Instagram } from 'lucide-react';
import { Dialog } from '@base-ui/react/dialog';
import InstagramEmbed from '@/components/instagram/InstagramEmbed';
import { stagger, fadeUp } from '@/lib/animations';
import { eventVideos, type InstaPost } from '@/data/instagram';
import { socialLinks } from '@/config/nav';

// ─── Why the previous layout broke sequence ───────────────────────────────────
// row-span-2 on card 1 means it occupies col-1 row-1 AND col-1 row-2.
// So the visual read order is: 1 → 2 → 4 (row 1), then 3 → 5 (row 2) — wrong.
// Masonry never preserves sequence. Fix: all cards uniform, no row-span.
// ─────────────────────────────────────────────────────────────────────────────

const defaultViewport = { once: true, amount: 0.1 } as const;

function Lightbox({ post, onClose }: { post: InstaPost; onClose: () => void }) {
  return (
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md" />
        <Dialog.Popup className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <m.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg"
          >
            <Dialog.Close
              onClick={onClose}
              className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Dialog.Close>
            <iframe
              src={`https://www.instagram.com/p/${post.shortcode}/embed/`}
              className="aspect-[4/5] w-full rounded-2xl border-0 bg-neutral-900"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title={post.caption}
            />
          </m.div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function EventsGallery() {
  const [lightboxPost, setLightboxPost] = useState<InstaPost | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? eventVideos : eventVideos.slice(0, 6);

  return (
    <section
      aria-labelledby="events-gallery-heading"
      className="w-full bg-white px-5 py-14 sm:px-10 lg:px-20"
    >
      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={defaultViewport}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p
            className="mb-2 text-xs font-black tracking-widest text-red-500 uppercase"
            aria-hidden="true"
          >
            ♦ Events &amp; Highlights
          </p>
          <h2
            id="events-gallery-heading"
            className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl"
          >
            Moments from Our <span className="text-red-500">Community</span>
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-neutral-500 sm:text-base">
            Concerts, workshops, recitals, and student milestones — a glimpse
            into the vibrant world of MusicChamps.
          </p>
        </div>

        <a
          href={`${socialLinks[3].href}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 self-start rounded-full border-2 border-neutral-200 bg-white px-4 py-2 text-sm font-bold text-neutral-700 transition hover:border-red-300 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none sm:self-auto"
          aria-label="Follow MusicChamps on Instagram (opens in new tab)"
        >
          <Instagram className="h-4 w-4" aria-hidden="true" />
          @musicchamps
        </a>
      </m.div>

      {/*
        Uniform sequential grid — all cards identical size, left→right top→bottom.
        2 cols on mobile, 3 cols on tablet+.
        No row-span, no masonry — sequence is always 1→2→3→4→5→6.
      */}
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:gap-4"
      >
        {visible.map((post) => (
          <m.div
            key={post.shortcode}
            variants={fadeUp}
            className="aspect-square"
          >
            <button
              onClick={() => setLightboxPost(post)}
              className="group relative block h-full w-full overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
              aria-label={`View: ${post.caption}`}
            >
              <InstagramEmbed
                post={post}
                aspectRatio="square"
                className="h-full transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </button>
          </m.div>
        ))}
      </m.div>

      {/* Load more */}
      {!showAll && eventVideos.length > 6 && (
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={defaultViewport}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={() => setShowAll(true)}
            className="rounded-xl border-2 border-neutral-200 px-6 py-2.5 text-sm font-bold text-neutral-600 transition hover:border-red-300 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
          >
            Show all moments →
          </button>
        </m.div>
      )}

      <AnimatePresence>
        {lightboxPost && (
          <Lightbox post={lightboxPost} onClose={() => setLightboxPost(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
