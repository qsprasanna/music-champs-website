'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import BlogCard from '@/features/blog/BlogCard';
import type { BlogPost } from '@/lib/blog-types';

type Props = {
  posts: BlogPost[];
};

const viewport = {
  once: true,
  amount: 0.15,
} as const;

export default function BlogSection({ posts }: Props) {
  const featured = posts[0];
  const secondaryPosts = posts.slice(1, 5);

  if (!featured) return null;

  return (
    <section className="w-full overflow-hidden bg-white px-5 py-14 sm:px-10 lg:px-20 lg:py-16">
      {/* Eyebrow */}
      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        className="mb-4 text-xs font-black tracking-widest text-red-500 uppercase"
      >
        ♦ Music Blog
      </m.p>
      {/* Header */}
      <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <m.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6 }}
            className="text-3xl leading-tight font-black tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl"
          >
            Learn Beyond The
            <br />
            <span className="text-red-500">Classroom.</span>
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 lg:text-lg"
          >
            Discover music theory, ragas, instrument guides, practice
            techniques, and inspiring stories crafted to support every stage of
            your musical journey.
          </m.p>
        </div>

        <m.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-500 transition-all hover:bg-red-50"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </m.div>
      </div>
      {/* Blog Container */}
      <m.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.7 }}
        className="rounded-[32px] border border-red-100 bg-gradient-to-br from-red-50/40 via-white to-white p-4 sm:p-6 lg:p-8"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Featured */}
          <div className="lg:col-span-2">
            <BlogCard
              post={featured}
              variant="featured-large"
              className="h-full"
            />
          </div>

          {/* Side Articles */}
          <div className="flex flex-col gap-4">
            {secondaryPosts.map((post) => (
              <BlogCard key={post.slug} post={post} variant="featured-small" />
            ))}
          </div>
        </div>
      </m.div>
    </section>
  );
}
