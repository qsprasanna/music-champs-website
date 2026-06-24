'use client';

import Image from 'next/image';
import { m, Variants } from 'framer-motion';
import { cardVariants } from '@/lib/animations';
import Link from 'next/link';

const features = [
  {
    id: 1,
    imageSrc: '/images/expert-music-intruments.png',
    imageAlt: 'Expert Music Instructors',
    titleRed: 'Expert',
    titleBlack: 'Music Instructors',
    description: 'Learn from passionate and experienced music professionals.',
  },
  {
    id: 2,
    imageSrc: '/images/personal-teaching.png',
    imageAlt: 'Personalized Learning',
    titleRed: 'Personalized',
    titleBlack: 'Learning',
    description:
      'Students receive individual attention and customized guidance.',
  },
  {
    id: 3,
    imageSrc: '/images/live-classes.png',
    imageAlt: 'Live Online Classes',
    titleRed: 'Live',
    titleBlack: 'Online Classes',
    description: 'Attend engaging sessions from the comfort of home.',
  },
  {
    id: 4,
    imageSrc: '/images/flexible-class.png',
    imageAlt: 'Flexible Class Schedules',
    titleRed: 'Flexible',
    titleBlack: 'Class Schedules',
    description:
      'Choose timings that fit your daily routine and school schedule.',
  },
  {
    id: 5,
    imageSrc: '/images/interactive-class.png',
    imageAlt: 'Interactive & Engaging',
    titleRed: 'Interactive',
    titleBlack: '& Engaging',
    description: 'Fun activities and live interaction make learning enjoyable.',
  },
  {
    id: 6,
    imageSrc: '/images/global-community.png',
    imageAlt: 'Global Community',
    titleRed: 'Global',
    titleBlack: 'Community',
    description:
      'Connect with students and music enthusiasts from around the world.',
  },
];
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// const containerVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.1 } },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
// };

export default function WhyChooseSection() {
  return (
    <section className="w-full bg-white px-10 py-16 lg:px-20">
      <m.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-5 text-4xl leading-tight font-black tracking-tight text-neutral-900 lg:text-5xl"
      >
        <span className="text-red-500">Why Choose</span> Our Music School ?
      </m.h2>

      <m.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-14 text-lg leading-relaxed text-neutral-500 md:max-w-3/4"
      >
        Music should be creative, enjoyable, and accessible for every child. Our
        online music classes combine professional teaching, personalized
        guidance, and engaging learning methods to help students grow
        confidently.
      </m.p>

      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <m.div
            key={feature.id}
            variants={cardVariants}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border-2 border-red-100 bg-red-500 shadow-sm transition-all duration-300 hover:border-red-300 hover:shadow-lg"
          >
            {/* Red image panel */}
            <div className="relative mt-8 h-52 w-full bg-red-500">
              <div className="absolute -top-8 left-0 h-52 w-full bg-[url('/images/dots-bg.png')] bg-cover opacity-15"></div>
              <Image
                src={feature.imageSrc}
                alt={feature.imageAlt}
                width={250}
                height={250}
                className="z-10 mx-auto h-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="m-1 flex h-full flex-col gap-2 rounded-2xl border-4 bg-white px-6 py-6">
              <div>
                <span className="block text-2xl leading-tight font-black text-red-500">
                  {feature.titleRed}
                </span>
                <span className="block text-2xl leading-tight font-black text-neutral-900">
                  {feature.titleBlack}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                {feature.description}
              </p>
            </div>
          </m.div>
        ))}
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-10"
      >
        {/* <a
          href="/stories"
          className="flex items-center gap-1 text-sm font-bold text-red-500 hover:underline"
        > */}
        <Link
          className="group border-primary hover:bg-primary w-fit rounded-lg border-2 bg-white px-7 py-3 text-base text-neutral-900 hover:text-white"
          href="/about-us"
        >
          → Our Success Stories
        </Link>
        {/* </a> */}
      </m.div>
    </section>
  );
}
