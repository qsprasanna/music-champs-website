'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { useState } from 'react';
import { fadeLeft, fadeUp, stagger } from '@/lib/animations';
// import { fadeLeft, stagger, fadeUp } from "./AnimationVariant";

export default function WhoWeAre() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="w-full px-10 py-16 lg:px-20">
      <div className="flex flex-col items-center gap-12 lg:flex-row">
        {/* Left — Video Thumbnail */}
        <m.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          // className="w-full lg:w-[45%] shrink-0"
          // >
          // <m.div
          className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl border-8 border-red-500 bg-neutral-900 lg:w-[48%]"
        >
          <iframe
            src="https://www.youtube.com/embed/uI0WjZkGE54?si=nixBH05bz6T276eI"
            className="h-full w-full"
            allowFullScreen
          />
          {/* </div> */}
        </m.div>

        {/* Right — Text */}
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-1 flex-col gap-5"
        >
          <m.div variants={fadeUp}>
            <div className="mb-4 h-0.5 w-10 bg-red-500" />
            <h2 className="text-4xl leading-tight font-black lg:text-5xl">
              <span className="text-red-500">Who</span>{' '}
              <span className="text-neutral-900">we are</span>
            </h2>
            <div className="mt-4 h-0.5 w-32 bg-red-200" />
          </m.div>

          <m.p
            variants={fadeUp}
            className="max-w-md text-sm leading-relaxed text-neutral-600 lg:text-base"
          >
            We are musicians, educators, and technologists united to democratize
            elite music education. At MusicChamps, we believe every aspiring
            artist deserves top-tier training. Our team combines decades of
            experience from major stages and leading institutions to create a
            rigorous, inspiring learning environment.
          </m.p>
        </m.div>
      </div>
    </section>
  );
}
