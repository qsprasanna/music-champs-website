'use client';

// ─── Fixes applied ────────────────────────────────────────────────────────────
//
// Violation 1: 'message' handler took 163ms
//   CAUSE: 12 simultaneous Framer Motion `animate` calls on the waveform bars.
//   Framer Motion uses a postMessage-based scheduler. 12 concurrent infinite
//   animations flood the message queue every frame.
//   FIX: Replace framer-motion bar animations with pure CSS @keyframes.
//       CSS animations run on the compositor thread — zero JS message overhead.
//
// Violation 2: 'setTimeout' handler took 53-59ms
//   CAUSE: The setTimeout callback calls setVisible(false) + onDone?.()
//   which triggers a React render synchronously inside the timer callback.
//   FIX: Wrap setState in requestAnimationFrame so React batches the update
//       outside the timer callback's hot path.
//
// ─────────────────────────────────────────────────────────────────────────────

import { m, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface PageLoaderProps {
  duration?: number;
  show?: boolean;
  onDone?: () => void;
}

const BAR_HEIGHTS = [
  0.3, 0.6, 0.9, 0.5, 1, 0.7, 0.4, 0.8, 0.55, 0.65, 0.35, 0.75,
];

export default function PageLoader({
  duration = 2200,
  show,
  onDone,
}: PageLoaderProps) {
  const [visible, setVisible] = useState(show ?? true);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (show !== undefined) {
      setVisible(show);
      return;
    }

    const t = setTimeout(() => {
      // ✅ Fix 2: defer setState into rAF so React batches it outside the
      // setTimeout hot path — eliminates the 53-59ms timer handler violation
      rafRef.current = requestAnimationFrame(() => {
        setVisible(false);
        onDone?.();
      });
    }, duration);

    return () => {
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [show, duration, onDone]);

  return (
    // ✅ Inject CSS keyframes once at component level — no JS animation overhead
    <>
      <style>{`
        @keyframes mc-bar {
          0%, 100% { transform: scaleY(var(--bar-min)); opacity: 0.6; }
          50%       { transform: scaleY(1);             opacity: 1;   }
        }
      `}</style>

      <AnimatePresence>
        {visible && (
          <m.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          >
            {/* Logo */}
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10"
            >
              <Image
                src="/music-champs-logo.png"
                alt="Music Champs"
                width={140}
                height={52}
                className="object-contain"
                priority
              />
            </m.div>

            {/* ✅ Fix 1: Pure CSS waveform — zero JS per frame, compositor-only */}
            <m.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex h-14 items-end gap-[3px]"
            >
              {BAR_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className="w-[5px] origin-bottom rounded-full bg-red-500"
                  style={
                    {
                      height: `${h * 56}px`,
                      // Pass min scale as CSS var so keyframe can use it
                      '--bar-min': String(h * 0.4),
                      animation: `mc-bar ${0.9}s ease-in-out ${i * 0.07}s infinite`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </m.div>

            {/* Tagline */}
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase"
            >
              Tuning your experience…
            </m.p>

            {/* Progress bar */}
            <m.div className="mt-8 h-0.5 w-48 overflow-hidden rounded-full bg-neutral-100">
              <m.div
                className="h-full origin-left rounded-full bg-red-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: duration / 1000 - 0.3,
                  ease: 'linear',
                  delay: 0.1,
                }}
              />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
