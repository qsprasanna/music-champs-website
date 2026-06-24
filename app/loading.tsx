// app/loading.tsx — shown by Next.js while a page segment loads
// Shown between route navigations (different from PageLoader which is first-paint only)

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white">
      {/* Waveform bars */}
      <div className="flex h-12 items-end gap-[3px]">
        {[0.3, 0.6, 0.9, 0.5, 1, 0.7, 0.4, 0.8, 0.55, 0.65, 0.35, 0.75].map(
          (h, i) => (
            <div
              key={i}
              className="w-[5px] animate-pulse rounded-full bg-red-400"
              style={{
                height: `${h * 48}px`,
                animationDelay: `${i * 70}ms`,
                animationDuration: '900ms',
              }}
            />
          )
        )}
      </div>
      <p className="text-xs font-bold tracking-[0.25em] text-neutral-300 uppercase">
        Loading…
      </p>
    </div>
  );
}
