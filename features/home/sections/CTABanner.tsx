'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLeadModal } from '@/components/leads/LeadModalContext';

export default function CTABanner() {
  const { openLead } = useLeadModal();
  return (
    <section className="w-full bg-white px-10 py-10 lg:px-20">
      <m.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative flex min-h-[220px] items-center overflow-hidden rounded-3xl border-2 border-red-500 bg-white shadow-xl shadow-red-100"
      >
        {/* Left Content */}
        <div className="z-10 flex flex-1 flex-col gap-5 p-6 md:max-w-[58%] md:px-10 md:py-12">
          <m.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl leading-tight font-black text-red-500 lg:text-4xl"
          >
            Start Your Musical Journey Today
          </m.h2>
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl text-sm leading-relaxed text-neutral-600 lg:text-base"
          >
            Music is a powerful form of creativity and self-expression. At
            MusicChamps, our online music classes help students discover their
            passion for music while building confidence and lifelong skills.
          </m.p>
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl text-sm leading-relaxed text-neutral-600 lg:text-base"
          >
            Join MusicChamps today — a trusted kids music academy online helping
            young musicians learn, grow, and perform with confidence.
          </m.p>
          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="default" onClick={() => openLead('demo')}>
              Book a Demo
            </Button>
          </m.div>
        </div>

        {/* Right — Treble Clef */}
        <m.div
          initial={{ opacity: 0.75, x: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
          viewport={{ once: true }}
          className="pointer-events-none absolute top-0 right-0 bottom-0 flex w-[44%] items-center justify-end"
        >
          <Image
            src="/images/music-song-symbol.png"
            alt="Music notes illustration"
            width={360}
            height={240}
            className="hidden object-contain object-right md:block"
          />
        </m.div>
      </m.div>
    </section>
  );
}
