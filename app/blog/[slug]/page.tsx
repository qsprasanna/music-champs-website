// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
  formatDate,
} from '@/lib/blog';
import { buildMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import BlogCard from '@/features/blog/BlogCard';
import CTABanner from '@/features/home/sections/CTABanner';
import {
  Calendar,
  Clock,
  Tag,
  ChevronRight,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllPostSlugs();
}

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    canonical: `/blog/${slug}`,
    ogImage: post.coverImage,
  });
}

export const revalidate = 86400;

// ─── MDX components ───────────────────────────────────────────────────────────
// Custom styled HTML tags for MDX content
const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-8 mb-4 text-2xl font-black text-neutral-900 first:mt-0"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-6 mb-3 text-xl font-black text-neutral-900" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 text-base leading-relaxed text-neutral-700" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 ml-4 flex list-none flex-col gap-1.5" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 ml-4 flex list-decimal flex-col gap-1.5" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="text-base leading-relaxed text-neutral-700 before:mr-2 before:text-red-500 before:content-['▸']"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 rounded-xl border-l-4 border-red-400 bg-red-50/60 px-5 py-4 text-base font-medium text-neutral-700 italic"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-neutral-200">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-red-50" {...props} />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3 text-left text-xs font-black tracking-wide text-red-600 uppercase"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border-t border-neutral-100 px-4 py-3 text-neutral-700"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-black text-neutral-900" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-semibold text-red-500 underline-offset-2 hover:underline"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-neutral-100" />,
};

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);

  // ── JSON-LD schemas ───────────────────────────────────────────────────────
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `https://musicchamps.com/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://musicchamps.com',
    },
    publisher: {
      '@type': 'MusicSchool',
      name: 'MusicChamps',
      url: 'https://musicchamps.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://musicchamps.com/music-champs-logo.png',
      },
    },
    image: `https://musicchamps.com${post.coverImage}`,
    keywords: post.tags.join(', '),
    articleSection: post.category,
    inLanguage: 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://musicchamps.com/blog/${post.slug}`,
    },
  };

  const faqSchema =
    post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }
      : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://musicchamps.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://musicchamps.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://musicchamps.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <Navbar />
      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      <div className="w-full px-5 pt-8 pb-0 sm:px-10 lg:px-20">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 text-xs text-neutral-400"
        >
          <Link href="/" className="transition-colors hover:text-red-500">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <Link href="/blog" className="transition-colors hover:text-red-500">
            Blog
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <span className="line-clamp-1 font-semibold text-neutral-700">
            {post.title}
          </span>
        </nav>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* ── Main content ────────────────────────────────────────────────── */}
          <article className="min-w-0 flex-1" aria-labelledby="post-title">
            {/* Category + read time */}
            <div className="mb-3 flex items-center gap-3">
              <Link
                href={`/blog?category=${encodeURIComponent(post.category)}`}
                className="rounded-full bg-red-500 px-3 py-0.5 text-xs font-black tracking-wide text-white uppercase transition-colors hover:bg-red-600"
              >
                {post.category}
              </Link>
              <span className="flex items-center gap-1 text-xs text-neutral-400">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1
              id="post-title"
              className="mb-4 text-3xl leading-tight font-black tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl"
            >
              {post.title}
            </h1>

            {/* Author + date + share */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-xs font-black text-white">
                  {post.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-black text-neutral-900">
                    {post.author}
                  </p>
                  <p className="text-xs text-neutral-400">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  {formatDate(post.date)}
                </span>
                {/* Share button — copies URL */}
                <button
                  onClick={undefined} // wired in client wrapper if needed
                  className="flex items-center gap-1 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-neutral-500 transition-colors hover:border-red-300 hover:text-red-500"
                  aria-label="Share this article"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </button>
              </div>
            </div>

            {/* Cover image */}
            <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-md">
              <Image
                src={post.coverImage}
                alt={`Cover image for ${post.title}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
            </div>

            {/* MDX content */}
            <div className="prose-custom">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2" aria-label="Post tags">
                <Tag
                  className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400"
                  aria-hidden="true"
                />
                {post.tags.map((tag, i) => (
                  <Link
                    key={i}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-bold text-red-500 transition-colors hover:bg-red-100"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* FAQs */}
            {post.faqs.length > 0 && (
              <div className="mt-10" aria-labelledby="faq-heading">
                <h2
                  id="faq-heading"
                  className="mb-5 text-xl font-black text-neutral-900"
                >
                  Frequently Asked Questions
                </h2>
                <div className="flex flex-col gap-4">
                  {post.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm"
                    >
                      <h3 className="mb-2 text-base font-black text-neutral-900">
                        {faq.question}
                      </h3>
                      <p className="text-sm leading-relaxed text-neutral-600">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back to blog */}
            <div className="mt-10 border-t border-neutral-100 pt-8">
              <Link
                href="/blog"
                className="flex items-center gap-2 text-sm font-bold text-red-500 hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all articles
              </Link>
            </div>
          </article>

          {/* ── Sidebar — desktop only ────────────────────────────────────── */}
          <aside
            className="hidden w-72 shrink-0 lg:block xl:w-80"
            aria-label="Related articles"
          >
            <div className="sticky top-28 flex flex-col gap-6">
              <div>
                <h2 className="mb-4 text-sm font-black tracking-widest text-neutral-400 uppercase">
                  Related Articles
                </h2>
                <div className="flex flex-col gap-4">
                  {related.map((p) => (
                    <BlogCard key={p.slug} post={p} variant="horizontal" />
                  ))}
                </div>
              </div>

              {/* Tags sidebar */}
              <div>
                <h2 className="mb-3 text-sm font-black tracking-widest text-neutral-400 uppercase">
                  Topics in this article
                </h2>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <Link
                      key={i}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-bold text-red-500 transition-colors hover:bg-red-100"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Related posts — mobile (below article) ─────────────────────────── */}
      {related.length > 0 && (
        <section
          className="mt-12 w-full px-5 pb-10 sm:px-10 lg:hidden"
          aria-labelledby="related-mobile"
        >
          <h2
            id="related-mobile"
            className="mb-5 text-xl font-black text-neutral-900"
          >
            Related Articles
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.slice(0, 2).map((p) => (
              <BlogCard key={p.slug} post={p} variant="default" />
            ))}
          </div>
        </section>
      )}

      {/* ── CTA banner ──────────────────────────────────────────────────────── */}
      <CTABanner />

      <Footer />
    </>
  );
}
