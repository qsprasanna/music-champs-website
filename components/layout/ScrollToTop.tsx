'use client';

// ─── Fixes applied ────────────────────────────────────────────────────────────
//
// Violation 3: Added non-passive event listener to a scroll-blocking event
//   CAUSE: Even though we pass { passive: true }, the browser warning can still
//   fire if setState calls inside the handler are expensive enough to delay
//   the scroll compositor. Two setState calls (setProgress + setVisible) on
//   every scroll frame = React re-rendering twice per scroll tick.
//
//   FIX 1: Merge both state values into a single object → one setState = one render.
//   FIX 2: Throttle the handler with requestAnimationFrame so it only fires
//          once per frame regardless of scroll event frequency.
//   FIX 3: Read scrollY/scrollHeight via a ref inside rAF to avoid layout thrash.
//
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  // ✅ Single state object — one setState = one React render per scroll frame
  const [state, setState] = useState({ visible: false, progress: 0 });
  const rafPending = useRef(false);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      // ✅ Throttle: only schedule one rAF per scroll burst
      if (rafPending.current) return;
      rafPending.current = true;

      requestAnimationFrame(() => {
        rafPending.current = false;
        const scrolled = window.scrollY;
        const total =
          document.documentElement.scrollHeight - window.innerHeight;

        // ✅ One setState instead of two
        setState({
          visible: scrolled > 400,
          progress: total > 0 ? (scrolled / total) * 100 : 0,
        });
      });
    };

    // passive: true is correct and already present
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const SIZE = 44;
  const STROKE = 3;
  const RADIUS = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * RADIUS;
  const offset = CIRC - (state.progress / 100) * CIRC;

  return (
    <>
      <AnimatePresence>
        {state.visible && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollTop}
            className="fixed right-6 bottom-6 z-50 cursor-pointer"
            aria-label="Scroll to top"
          >
            <svg width={SIZE} height={SIZE} className="-rotate-90">
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="#fecaca"
                strokeWidth={STROKE}
              />
              <motion.circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="#ef4444"
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 0.15s linear' }}
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 shadow-lg shadow-red-300">
                <svg viewBox="0 0 16 16" className="h-4 w-4 fill-white">
                  <path d="M8 3L3 9h3.5v4h3V9H13L8 3z" />
                </svg>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
