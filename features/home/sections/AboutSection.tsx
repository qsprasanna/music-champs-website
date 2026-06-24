'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { fadeUp } from '@/lib/animations';
import Link from 'next/link';

const cards = [
  {
    id: 1,
    layout: 'image-right',
    imageSrc: '/images/man-playing-guitar.jpg',
    imageAlt: 'Musicians playing together',
    title: (
      <>
        Inspiring the <span className="text-red-500">Next Generation</span> of
        Musicians
      </>
    ),
    description:
      'MusicChamps is a kids music academy online focused on helping children and teens discover creativity, confidence, and self-expression through music. Our mission is to make quality music education accessible through live online music classes guided by experienced instructors.',
  },
  {
    id: 2,
    layout: 'image-left',
    imageSrc: '/images/man-teaching-guitar-to-women.jpg',
    imageAlt: 'Students in online guitar class',
    title: (
      <>
        Live <span className="text-red-500">Online</span> Classes &{' '}
        <span className="text-red-500">Supportive</span> Learning
      </>
    ),
    description:
      'Our online music classes help students learn step by step in a comfortable and encouraging environment. Whether students are beginners or advancing their skills, our programs provide structured guidance and practical learning experiences.',
  },
  {
    id: 3,
    layout: 'image-right',
    imageSrc: '/images/she-teach-to-her.jpg',
    imageAlt: 'Passionate music instructor',
    title: (
      <>
        <span className="text-red-500">Passionate</span> Instructors
        <br />& Real <span className="text-red-500">Growth</span>
      </>
    ),
    description:
      'Our experienced instructors focus on technique, creativity, music theory, and performance skills. At MusicChamps, learning music is not just about attending classes — it is about discovering talent, building confidence, and enjoying the journey of music learning.',
  },
];

// const fadeUp = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
// };

export default function AboutSection() {
  return (
    <section className="w-full bg-white px-10 py-16 lg:px-20">
      <m.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-4xl font-black tracking-tight text-neutral-900 lg:text-5xl"
      >
        <span className="text-red-500">About</span> the Academy
      </m.h2>

      <div className="flex flex-col gap-6">
        {cards.map((card, i) => (
          <m.div
            key={card.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-wrap items-stretch overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md md:flex-row"
          >
            {/* Image Left */}
            {card.layout === 'image-left' && (
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative min-h-[75dvh] w-full shrink-0 overflow-hidden rounded-tr-2xl rounded-br-2xl bg-[linear-gradient(-120deg,#ffffff_50%,#fb2c36_50.5%)] p-8 md:w-[50%]"
              >
                <m.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 4,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'mirror',
                  }}
                  className="relative flex h-full w-full items-center justify-center"
                >
                  {/* // <div className="relative w-[50%] min-h-[75dvh] shrink-0 bg-[linear-gradient(-120deg,#ffffff_50%,#fb2c36_50.5%)] from-50% to-red-400 rounded-tr-2xl rounded-br-2xl overflow-hidden p-8"> */}
                  {/* Gradient fade bottom-right */}
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-400 z-10 pointer-events-none" /> */}
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    className="mx-auto my-auto h-3/4! rounded-4xl border-4 border-red-300 object-cover md:w-3/4!"
                  />
                </m.div>
              </m.div>
            )}
            {/* </div> */}

            {/* Text Content */}
            <div className="flex flex-1 flex-col justify-center gap-5 p-6 md:px-10 md:py-10">
              <h3 className="text-2xl leading-snug font-black text-neutral-900 lg:text-3xl">
                {card.title}
              </h3>
              <p className="max-w-md text-lg leading-relaxed text-neutral-500 lg:text-lg">
                {card.description}
              </p>
              <div>
                {/* <Button variant="outline"> */}
                <Link
                  className="group border-primary hover:bg-primary w-fit rounded-lg border-2 bg-white px-7 py-3 text-base text-neutral-900 hover:text-white"
                  href="/about-us"
                >
                  Learn More
                </Link>
                {/* </Button> */}
              </div>
            </div>

            {/* Image Right */}
            {card.layout === 'image-right' && (
              <m.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative min-h-[75dvh] w-full shrink-0 overflow-hidden rounded-tr-2xl rounded-br-2xl bg-[linear-gradient(120deg,#ffffff_50%,#fb2c36_50.5%)] from-50% to-red-400 p-8 md:w-[50%]"
              >
                <m.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 4,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'mirror',
                  }}
                  className="relative flex h-full w-full items-center justify-center"
                >
                  {/* // <div className="relative w-[50%] min-h-[75dvh] shrink-0 bg-[linear-gradient(120deg,#ffffff_50%,#fb2c36_50.5%)] from-50% to-red-400 rounded-tr-2xl rounded-br-2xl overflow-hidden p-8"> */}
                  {/* <div className="absolute inset-0 bg-linear-to-bl from-transparent m-8 via-transparent to-red-400 z-10 pointer-events-none" /> */}
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    className="mx-auto my-auto h-3/4! rounded-4xl border-4 border-red-300 object-cover md:w-3/4!"
                  />
                </m.div>
              </m.div>
            )}
            {/* </div> */}
          </m.div>
        ))}
      </div>
    </section>
  );
}
