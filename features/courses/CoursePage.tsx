'use client';

import { useState } from 'react';
import { categories, containerVariants, courses } from './content';
import Navbar from '@/components/layout/Navbar';
import { AnimatePresence, m } from 'framer-motion';
import { Search } from 'lucide-react';
import { CourseCard } from './section/CourseCard';
import CommunityCard from './section/CommunityCard';
import { EventsSection } from './section/EventSection';
import CTABanner from '../home/sections/CTABanner';
import Footer from '@/components/layout/Footer';

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('All Courses');
  const [search, setSearch] = useState('');

  const filtered = courses.filter((c) => {
    const matchCat =
      activeCategory === 'All Courses' || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Split: last card gets community card alongside it if odd
  const courseCards = filtered;
  const showCommunityCard = filtered.length % 3 === 1; // 7 items → row 3 has 1 course + community promo

  return (
    <>
      <Navbar />
      <main>
        {/* ── Page Header ── */}
        <section className="w-full px-10 pt-12 pb-4 lg:px-20">
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-3 text-xs font-black tracking-widest text-red-500 uppercase"
          >
            ♦ Courses
          </m.p>
          <m.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-4xl leading-tight font-black tracking-tight text-neutral-900 lg:text-5xl"
          >
            <span className="text-red-500">Explore</span>
            <br />
            Our Best Courses
          </m.h1>

          {/* Category Pills */}
          <m.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-6 flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border-2 px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'border-red-500 bg-red-500 text-white shadow-md shadow-red-200'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-red-300 hover:text-red-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </m.div>

          {/* Search Bar */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="relative max-w-sm"
          >
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search instrument or genre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border-2 border-neutral-200 bg-white py-2.5 pr-4 pl-10 text-sm text-neutral-700 transition-colors outline-none placeholder:text-neutral-400 focus:border-red-400"
            />
          </m.div>
        </section>

        {/* ── Courses Grid ── */}
        <section className="w-full min-w-screen px-10 py-8 lg:px-20">
          <AnimatePresence mode="wait">
            <m.div
              key={activeCategory + search}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {courseCards.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}

              {/* Community promo card fills the last slot when count % 3 === 1 */}
              {showCommunityCard && <CommunityCard />}
            </m.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center text-neutral-400"
            >
              <p className="text-lg font-bold">
                No courses found for "{search}"
              </p>
              <p className="mt-1 text-sm">
                Try a different search or category.
              </p>
            </m.div>
          )}
        </section>

        {/* <EventsSection /> */}
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
