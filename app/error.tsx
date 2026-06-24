'use client';

import { useEffect } from 'react';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6">
      {/* Big faded background text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <span className="text-[clamp(100px,20vw,200px)] leading-none font-black text-neutral-100">
          OOPS
        </span>
      </div>

      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex max-w-md flex-col items-center gap-6 text-center"
      >
        {/* Animated waveform */}
        <div className="flex h-10 items-end gap-1">
          {[4, 7, 5, 9, 3, 8, 5, 7, 4].map((h, i) => (
            <m.div
              key={i}
              className="w-1 rounded-full bg-red-400"
              animate={{ scaleY: [1, 0.3, 1.5, 0.6, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
              style={{ height: `${h * 4}px` }}
            />
          ))}
        </div>

        <h1 className="text-4xl leading-tight font-black text-neutral-900">
          Something went
          <br />
          <span className="text-red-500">off-key</span>
        </h1>

        <p className="text-sm leading-relaxed text-neutral-500">
          An unexpected error occurred. Try refreshing the page or go back to
          the home screen.
        </p>

        <div className="flex gap-3">
          <Button
            onClick={reset}
            className="h-auto rounded-xl bg-red-500 px-6 py-3 font-bold text-white shadow-lg shadow-red-200 transition-all hover:scale-105 hover:bg-red-600"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button
            variant="outline"
            className="h-auto rounded-xl border-2 border-neutral-200 px-6 py-3 font-bold transition-all hover:border-red-300 hover:text-red-500"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </m.div>
    </div>
  );
}
