// app/blog/page.tsx
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  getAllPosts,
  getFeaturedPosts,
  getAllTags,
  getAllCategories,
} from '@/lib/blog';
import BlogCard from '@/features/blog/BlogCard';
import BlogListingClient from '@/features/blog/BlogListingClient';
import JsonLd from '@/components/seo/JsonLd';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = buildMetadata({
  title: 'Music Blog — Tips, Theory & Stories',
  description:
    'Explore MusicChamps blog for music theory guides, instrument history, ragas, lyrics, and expert tips to help you on your musical journey.',
  keywords:
    'music blog, music theory, ragas, instrument guide, music education blog, Indian classical music',
  canonical: '/blog',
});

// Revalidate every 24 hours (when you add new MDX files via git)
export const revalidate = 86400;

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featured = getFeaturedPosts(5);
  const allTags = getAllTags();
  const allCategories = getAllCategories();

  // Blog listing schema for SEO
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'MusicChamps Blog',
    url: 'https://musicchamps.com/blog',
    description:
      'Music theory, instrument guides, ragas, and expert tips from MusicChamps.',
    publisher: {
      '@type': 'MusicSchool',
      name: 'MusicChamps',
      url: 'https://musicchamps.com',
    },
    blogPost: allPosts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      url: `https://musicchamps.com/blog/${post.slug}`,
      datePublished: post.date,
      author: { '@type': 'Organization', name: post.author },
      keywords: post.tags.join(', '),
    })),
  };

  return (
    <>
      <Navbar />
      <JsonLd schema={blogSchema} />

      {/* ── Hero banner ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden rounded-b-3xl bg-neutral-900 px-5 py-14 sm:px-10 lg:px-20 lg:py-16">
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ef4444 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />
        {/* Red glow */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-red-500/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-col gap-4">
            <p
              className="text-xs font-black tracking-widest text-red-400 uppercase"
              aria-hidden="true"
            >
              ♦ MusicChamps Blog
            </p>
            <h1 className="text-4xl leading-tight font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Explore Our Latest
              <br />
              <span className="text-red-500">Blog Insights</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-neutral-400 lg:text-lg">
              Music theory, instrument history, ragas, lyrics, and expert tips
              to guide every step of your musical journey.
            </p>
            <div className="flex items-center gap-3 text-sm text-neutral-500">
              <span className="font-bold text-white">{allPosts.length}</span>{' '}
              articles
              <span
                className="h-1 w-1 rounded-full bg-neutral-600"
                aria-hidden="true"
              />
              <span className="font-bold text-white">
                {allCategories.length}
              </span>{' '}
              categories
              <span
                className="h-1 w-1 rounded-full bg-neutral-600"
                aria-hidden="true"
              />
              <span className="font-bold text-white">{allTags.length}</span>{' '}
              topics
            </div>
          </div>

          {/* Music note decoration */}
          <div
            className="relative hidden h-40 w-40 shrink-0 lg:block"
            aria-hidden="true"
          >
            <div className="absolute inset-0 rounded-3xl border border-red-500/20 bg-red-500/10" />
            <div className="absolute inset-0 flex items-center justify-center text-8xl">
              🎵
            </div>
          </div>
        </div>
      </section>

      <div className="w-full px-5 py-12 sm:px-10 lg:px-20">
        {/* ── Popular / Featured posts ─────────────────────────────────────── */}
        {featured.length > 0 && (
          <section className="mb-14" aria-labelledby="popular-heading">
            <div className="mb-6 text-center">
              <h2
                id="popular-heading"
                className="text-2xl font-black text-neutral-900 lg:text-3xl"
              >
                Popular Music Lessons
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Ideas, trends, and inspiration for mastering music skills
              </p>
            </div>

            {/* 1 large + 2 small — matches design */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {/* Large featured */}
              {featured[0] && (
                <BlogCard post={featured[0]} variant="featured-large" />
              )}

              {/* 2 small stacked */}
              {featured.length > 1 && (
                <div className="flex flex-col gap-4">
                  {featured.slice(1, 5).map((post) => (
                    <BlogCard
                      key={post.slug}
                      post={post}
                      variant="featured-small"
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Divider ───────────────────────────────────────────────────────── */}
        <div className="mb-12 h-px w-full bg-neutral-100" />

        {/* ── All posts — search + filter + grid ──────────────────────────── */}
        <section aria-labelledby="all-posts-heading">
          <div className="mb-8 text-center">
            <h2
              id="all-posts-heading"
              className="text-2xl font-black text-neutral-900 lg:text-3xl"
            >
              All Articles
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Discover how creativity and knowledge shape music education
            </p>
          </div>

          {/* useSearchParams() inside BlogListingClient requires Suspense */}
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-72 animate-pulse rounded-2xl bg-neutral-100"
                  />
                ))}
              </div>
            }
          >
            <BlogListingClient
              allPosts={allPosts}
              allTags={allTags}
              allCategories={allCategories}
            />
          </Suspense>
        </section>
      </div>
      <Footer />
    </>
  );
}
