'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import { Clock, Play, Calendar, Music } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { type Course, type CourseDetail } from './content';

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props {
  course: Course;
  detail: CourseDetail;
  relatedCourses: Course[];
}

export default function CourseDetailPage({
  course,
  detail,
  relatedCourses,
}: Props) {
  const [activeTab, setActiveTab] = useState('Overview');

  // ✅ Safe title split using dedicated fields instead of fragile .split(' ')
  const titleWords = detail.heroTitle.split(' ');
  const titleLine1 = titleWords.slice(0, 2).join(' '); // "Master The"
  const titleLine2 = titleWords.slice(2).join(' '); // "Art of Guitar"

  return (
    <>
      <Navbar />
      <main className="w-full bg-white">
        {/* ── Hero ── */}
        <section className="px-10 py-12 lg:px-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <m.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs font-black tracking-widest text-red-500 uppercase">
                ✦ Courses
              </p>
              <h1 className="mt-4 text-5xl leading-tight font-black text-neutral-900 sm:text-6xl">
                {titleLine1}
                <br />
                <span className="text-red-500">{titleLine2}</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-600">
                {detail.heroSubtitle}
              </p>
              <Button variant="default">Register Now →</Button>
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative aspect-video overflow-hidden rounded-3xl border-4 border-red-300 shadow-2xl shadow-red-100"
            >
              <Image
                src={course.imageSrc}
                alt={course.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <m.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-xl"
                >
                  <Play className="ml-1 h-8 w-8 fill-white" />
                </m.button>
              </div>
            </m.div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="px-10 lg:px-24">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap justify-center divide-x divide-red-100 overflow-hidden rounded-2xl border-2 border-red-100 bg-red-50/40"
          >
            {[
              {
                icon: <Music className="h-5 w-5 text-red-500" />,
                label: course.badge,
              },
              {
                icon: <Clock className="h-5 w-5 text-red-500" />,
                label: `${course.sessions} Sessions`,
              },
              {
                icon: <Calendar className="h-5 w-5 text-red-500" />,
                label: `${course.weeks} Weeks`,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-1 items-center justify-center gap-2.5 px-8 py-5 text-base font-bold text-neutral-700"
              >
                {stat.icon}
                {stat.label}
              </div>
            ))}
          </m.div>
        </section>

        {/* ── Tabs ── */}
        <section className="mt-16 border-b-2 border-neutral-100">
          <div className="flex justify-center gap-8 overflow-x-auto px-5">
            {[
              'Overview',
              "What You'll Learn",
              "How You'll Learn",
              'Outcome',
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 text-base font-bold whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <m.div
                    layoutId="tab-underline"
                    className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-red-500"
                  />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* ── Content Area ── */}
        <section className="px-10 py-16 lg:px-24">
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-neutral-600">
            {detail.intro}
          </p>

          <div className="mt-16">
            <h2 className="mb-10 text-3xl font-black text-red-500">
              What You'll Learn
            </h2>
            <div className="flex flex-col gap-5">
              {detail.whatYouLearn.map((step, i) => {
                // Supports both "Title: description" format and plain strings
                const [title, ...descParts] = step.split(':');
                const desc = descParts.join(':').trim();
                return (
                  <div
                    key={i}
                    className="flex gap-4 rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-colors hover:border-red-200"
                  >
                    <span className="w-7 shrink-0 pt-0.5 text-base font-black text-red-400">
                      {i + 1}.
                    </span>
                    <div>
                      <h3 className="text-base font-black text-neutral-900">
                        {title.trim()}
                      </h3>
                      {desc && (
                        <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── How You'll Learn ── */}
        <section className="bg-white px-10 py-16 lg:px-24">
          <h2 className="mb-10 text-3xl font-black text-red-500">
            Personalized, Interactive & Mentor-Led
          </h2>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              {detail.curriculum.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 text-sm font-medium text-neutral-700"
                >
                  <span className="mt-0.5 shrink-0 text-red-500">♫</span>
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center rounded-3xl bg-neutral-900 p-10 text-white">
              <h3 className="text-2xl font-black">Start Learning Today</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                Join the 500+ students already mastering their craft.
              </p>
              <Button variant="default">Register Now →</Button>
            </div>
          </div>
        </section>

        {/* ── Related Courses ── */}
        <section className="bg-neutral-50 px-10 py-16 lg:px-24">
          <h2 className="mb-10 text-4xl font-black text-neutral-900">
            Explore <span className="text-red-500">More Courses</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedCourses.map((rc) => (
              <Link
                key={rc.slug}
                href={`/courses/${rc.slug}`}
                className="group overflow-hidden rounded-3xl border-2 border-red-100 bg-white transition-all hover:border-red-300 hover:shadow-xl"
              >
                <div className="relative h-48">
                  <Image
                    src={rc.imageSrc}
                    alt={rc.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-red-100 px-3 py-1 text-[10px] font-black text-red-600 uppercase">
                    {rc.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black text-neutral-800">
                    {rc.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                    {rc.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-bold text-red-500 group-hover:underline">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="px-10 py-20 lg:px-24">
          <div className="relative overflow-hidden rounded-3xl border-4 border-red-500 p-12 text-center">
            <div className="pointer-events-none absolute top-0 -right-10 flex h-full w-1/4 items-center text-[160px] font-black text-red-100 select-none">
              𝄞
            </div>
            <h2 className="text-4xl font-black text-red-500 lg:text-5xl">
              {detail.ctaTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-600">
              {detail.ctaDescription}
            </p>
            <Button className="mt-8 h-auto rounded-xl bg-red-500 px-12 py-4 text-lg font-bold shadow-lg shadow-red-200 transition-all duration-200 hover:scale-105 hover:bg-red-600">
              Book a Demo
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
