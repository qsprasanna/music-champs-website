'use client';

import Image from 'next/image';
import { m, Variants } from 'framer-motion';
import { cardVariants } from '@/lib/animations';
import { courses } from '@/features/courses/content';
import Link from 'next/link';

// const courses = [
//   {
//     id: 1,
//     title: 'Guitar Lessons',
//     imageSrc: '/images/man-using-guitar.jpg',
//     imageAlt: 'Guitar Lessons',
//   },
//   {
//     id: 2,
//     title: 'Keyboard & Piano',
//     imageSrc: '/images/man-playing-keyboard.jpg',
//     imageAlt: 'Keyboard & Piano',
//   },
//   {
//     id: 3,
//     title: 'Vocal Training',
//     imageSrc: '/images/child-playing-guitar.jpg',
//     imageAlt: 'Vocal Training',
//   },
//   {
//     id: 4,
//     title: 'Ukulele Classes',
//     imageSrc: '/images/ukulele-instrument.jpg',
//     imageAlt: 'Ukulele Classes',
//   },
//   {
//     id: 5,
//     title: 'Violin Lessons',
//     imageSrc: '/images/violin-instrument.jpg',
//     imageAlt: 'Violin Lessons',
//   },
//   {
//     id: 6,
//     title: 'Drum Classes',
//     imageSrc: '/images/drum-instument.jpg',
//     imageAlt: 'Drum Classes',
//   },
//   {
//     id: 7,
//     title: 'Flute Lessons',
//     imageSrc: '/images/flute-instrument.jpg',
//     imageAlt: 'Flute Lessons',
//   },
// ];

const description =
  'Learn chords, rhythm, and strumming techniques while playing songs you love.';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
// const containerVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.08 } },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

export default function CoursesSection() {
  return (
    <section className="w-full bg-white px-10 py-16 lg:px-20">
      {/* Header Row */}
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 flex flex-col items-start justify-between gap-6 md:flex-row"
      >
        <div className="flex-1 md:max-w-2/4">
          <h2 className="mb-4 text-4xl leading-tight font-black tracking-tight lg:text-5xl">
            <span className="text-red-500">Explore Our</span>
            <br />
            <span className="text-neutral-900">Popular Music Courses</span>
          </h2>
          <p className="text-sm leading-relaxed text-neutral-500 lg:text-xl">
            As a growing kids music academy online, we offer music courses for
            beginners and aspiring performers through interactive live sessions.
          </p>
        </div>

        {/* Circular image */}
        {/* <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="shrink-0 w-[130px] h-[130px] lg:w-[360] lg:h-[360] rounded-full overflow-hidden border-[1rem] border-red-800 shadow-xl"
        > */}
        <m.div
          initial={{ opacity: 0.75, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          animate={{
            y: [0, -12, 0],
            scale: [1, 1.04, 1],
          }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
          className="h-[130px] w-[130px] shrink-0 overflow-hidden rounded-full border-[1rem] border-red-800 shadow-xl lg:h-[360px] lg:w-[360px]"
        >
          <Image
            src="/images/guitar-img.jpg"
            alt="Featured instrument"
            width={360}
            height={360}
            className="h-full w-full object-cover"
          />
        </m.div>
      </m.div>

      {/* Quote */}
      <m.blockquote
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-12 max-w-3/4 text-xl leading-snug font-black text-red-500 italic lg:text-4xl"
      >
        &quot;Our courses cater to everyone, from Beginners to aspiring
        performers, supporting every step of your musical journey.&quot;
      </m.blockquote>

      {/* Cards Grid */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {courses.map((course) => (
          <m.div
            key={course.id}
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-red-300 bg-white p-4 shadow-sm transition-all duration-300 hover:border-red-400 hover:shadow-lg"
          >
            {/* Image */}
            <div className="relative h-[200px] w-full">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <Image
                src={course.imageSrc}
                alt={course.title}
                fill
                className="rounded-2xl object-cover"
              />
            </div>

            {/* Body */}
            <div className="flex flex-col gap-3 pt-4">
              <h3 className="text-xl font-black text-neutral-900">
                {course.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500">
                {course.description}
              </p>
              <div>
                {/* <Button
                  variant="outline"
                  className="border-2 border-red-200 text-red-500 font-bold px-5 py-2 h-auto rounded-lg text-lg hover:bg-red-50 hover:border-red-400 transition-all duration-200"
                > */}
                <Link
                  href={`/courses/${course.slug}`}
                  className="mt-4 inline-block h-auto rounded-lg border-2 border-red-200 px-5 py-2 text-lg font-bold text-red-500 transition-all duration-200 hover:border-red-400 hover:bg-red-50"
                >
                  View more
                </Link>
              </div>
            </div>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
