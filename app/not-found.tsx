'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Music2, ArrowLeft } from 'lucide-react';

// Animated vinyl record SVG
function VinylRecord() {
  return (
    <m.div
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      className="relative h-52 w-52 shrink-0"
    >
      <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-2xl">
        {/* Outer vinyl */}
        <circle cx="100" cy="100" r="98" fill="#1a1a1a" />
        {/* Grooves */}
        {[85, 75, 65, 55, 45, 35].map((r, i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="1.5"
          />
        ))}
        {/* Red label in centre */}
        <circle cx="100" cy="100" r="28" fill="#ef4444" />
        <circle cx="100" cy="100" r="5" fill="white" />
        {/* Label text arc */}
        <text
          x="100"
          y="92"
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontWeight="900"
          fontFamily="sans-serif"
        >
          MUSIC
        </text>
        <text
          x="100"
          y="102"
          textAnchor="middle"
          fill="white"
          fontSize="7"
          fontWeight="900"
          fontFamily="sans-serif"
        >
          CHAMPS
        </text>
        {/* Sheen */}
        <ellipse
          cx="70"
          cy="60"
          rx="18"
          ry="8"
          fill="white"
          opacity="0.04"
          transform="rotate(-35 70 60)"
        />
      </svg>
    </m.div>
  );
}

// Floating musical notes
const NOTES = ['♩', '♪', '♫', '♬', '𝄞'];
function FloatingNotes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {NOTES.map((note, i) => (
        <m.span
          key={i}
          className="absolute font-black text-red-400 select-none"
          style={{
            left: `${15 + i * 17}%`,
            fontSize: `${20 + (i % 3) * 10}px`,
            opacity: 0,
          }}
          animate={{
            y: [0, -180],
            opacity: [0, 0.5, 0],
            rotate: [0, i % 2 === 0 ? 20 : -20],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6">
      <FloatingNotes />

      {/* Big faded 404 background */}
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span
          className="leading-none font-black text-neutral-100"
          style={{ fontSize: 'clamp(160px, 30vw, 320px)' }}
        >
          404
        </span>
      </m.div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-12 lg:flex-row">
        {/* Vinyl */}
        <m.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <VinylRecord />
        </m.div>

        {/* Text block */}
        <m.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex flex-col gap-5 text-center lg:text-left"
        >
          {/* Waveform divider */}
          <div className="flex items-center justify-center gap-1 lg:justify-start">
            {[3, 6, 4, 8, 5, 3, 7, 4].map((h, i) => (
              <m.div
                key={i}
                className="w-1 rounded-full bg-red-500"
                animate={{ scaleY: [1, 1.8, 0.6, 1.4, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }}
                style={{ height: `${h * 4}px` }}
              />
            ))}
          </div>

          <div>
            <h1 className="text-4xl leading-tight font-black text-neutral-900 lg:text-5xl">
              Wrong Track
              <br />
              <span className="text-red-500">Playing!</span>
            </h1>
          </div>

          <p className="mx-auto max-w-sm text-sm leading-relaxed text-neutral-500 lg:mx-0 lg:text-base">
            Looks like the page you&apos;re looking for has been scratched off
            the record. Let&apos;s get you back to the music.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button
              // asChild
              variant="outline"
              className="h-auto rounded-xl bg-red-50 px-6 py-3 font-bold shadow-lg shadow-red-200 transition-all hover:scale-105"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              // asChild
              variant="outline"
              className="hover:border-red-30 h-auto rounded-xl border-2 px-6 py-3 font-bold transition-all"
            >
              <Link href="/courses">
                <Music2 className="h-4 w-4" />
                Explore Courses
              </Link>
            </Button>
          </div>

          <button
            onClick={() => window.history.back()}
            className="mt-1 flex cursor-pointer items-center justify-center gap-1.5 text-sm font-semibold text-neutral-400 transition-colors hover:text-red-500 lg:justify-start"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </m.div>
      </div>
    </div>
  );
}
