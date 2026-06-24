'use client';

import { useEffect, useRef, useState } from 'react';
import { m, useInView, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { fadeUp } from '@/lib/animations';
import Link from 'next/link';

const stats = [
  { value: 400, suffix: '+', label: 'Students Learning Music' },
  { value: 50, suffix: '+', label: 'Expert Music Instructors' },
  { value: 7, suffix: '+', label: 'Music Courses Available' },
];

// function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });

//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const duration = 1800;
//     const step = Math.ceil(value / (duration / 16));
//     const timer = setInterval(() => {
//       start += step;
//       if (start >= value) {
//         setCount(value);
//         clearInterval(timer);
//       } else {
//         setCount(start);
//       }
//     }, 16);
//     return () => clearInterval(timer);
//   }, [inView, value]);

//   return (
//     <span ref={ref} className="text-5xl lg:text-7xl font-black text-red-500 leading-none tabular-nums">
//       {count}{suffix}
//     </span>
//   );
// }
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;

    // randomize duration slightly for uniqueness
    const duration = 1600 + Math.random() * 600;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const eased = easeOutCubic(progress);
      const current = Math.floor(eased * value);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <span
      ref={ref}
      className="text-7xl leading-none font-black text-red-500 tabular-nums lg:text-7xl"
    >
      {count}
      {suffix}
    </span>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// const containerVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.15 } },
// };

// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

export default function ImpactSection() {
  return (
    <section className="w-full bg-white px-10 py-20 lg:px-20">
      {/* Top Row */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mb-16 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20"
      >
        <m.div variants={fadeUp} className="flex-1">
          <h2 className="text-5xl leading-[1.08] font-black tracking-tight text-neutral-900 lg:text-6xl">
            Discover
            <br />
            the{' '}
            <em className="font-black text-red-500 italic not-italic">
              Impact
            </em>{' '}
            of
            <br />
            <span className="text-red-500">Music Champs</span>
          </h2>
        </m.div>

        <m.div
          variants={fadeUp}
          className="flex flex-1 flex-col justify-center gap-6 pt-2"
        >
          <p className="max-w-3/4 text-base leading-relaxed font-medium text-neutral-600 lg:text-2xl">
            Join students from different parts of the world learning through
            structured and engaging online music classes.
          </p>
          {/* <Button variant="outline" className="group"> */}
          <Link
            className="group border-primary hover:bg-primary w-fit rounded-lg border-2 bg-white px-7 py-3 text-base text-neutral-900 hover:text-white"
            href="/about-us"
          >
            Know More{' '}
            <span className="ml-1 text-red-500 group-hover:text-white">
              About Us
            </span>
          </Link>
          {/* </Button> */}
        </m.div>
      </m.div>

      {/* Divider */}
      <div className="mb-14 h-px w-full bg-neutral-100" />

      {/* Stats */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-6 md:grid-cols-3 md:gap-4"
      >
        {stats.map((stat, i) => (
          <m.div
            key={i}
            variants={fadeUp}
            className="flex flex-col items-center gap-3 text-center"
          >
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            <span className="text-sm font-bold text-neutral-700 lg:text-xl">
              {stat.label}
            </span>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
