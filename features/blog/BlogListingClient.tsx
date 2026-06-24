'use client';

// features/blog/BlogListingClient.tsx
// ✅ Import type BlogPost from lib/blog-types.ts (client-safe), not lib/blog.ts

import { useState, useMemo, useTransition } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Search,
  X,
  Tag,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import BlogCard from './BlogCard';
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/lib/blog-types';

const PER_PAGE = 9;

type Props = {
  allPosts: BlogPost[];
  allTags: string[];
  allCategories: string[];
};

export default function BlogListingClient({
  allPosts,
  allTags,
  allCategories,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Initialise state FROM the URL — so /blog?tag=History pre-selects "History"
  const [query, setQuery] = useState(() => searchParams.get('query') ?? '');
  const [activeTag, setActiveTag] = useState(
    () => searchParams.get('tag') ?? ''
  );
  const [activeCategory, setActiveCategory] = useState(
    () => searchParams.get('category') ?? ''
  );
  const [page, setPage] = useState(() => Number(searchParams.get('page') ?? 1));
  const [showFilters, setShowFilters] = useState(false);
  const [, startTransition] = useTransition();

  const filtered = useMemo(() => {
    let posts = allPosts;

    if (query.trim()) {
      const q = query.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (activeTag)
      posts = posts.filter((p) =>
        p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
      );

    if (activeCategory)
      posts = posts.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );

    return posts;
  }, [allPosts, query, activeTag, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pagePosts = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const hasFilters = query || activeTag || activeCategory;

  // ✅ Sync active filters into the URL so links like /blog?tag=History work
  const pushParams = (q: string, tag: string, category: string, p: number) => {
    const params = new URLSearchParams();
    if (q) params.set('query', q);
    if (tag) params.set('tag', tag);
    if (category) params.set('category', category);
    if (p > 1) params.set('page', String(p));
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const clearAll = () => {
    startTransition(() => {
      setQuery('');
      setActiveTag('');
      setActiveCategory('');
      setPage(1);
      router.replace(pathname, { scroll: false });
    });
  };

  // Wrapper that updates state + URL together
  const applyFilter = (
    newQuery = query,
    newTag = activeTag,
    newCategory = activeCategory
  ) => {
    startTransition(() => {
      setQuery(newQuery);
      setActiveTag(newTag);
      setActiveCategory(newCategory);
      setPage(1);
      pushParams(newQuery, newTag, newCategory, 1);
    });
  };

  // Legacy helper kept for pagination
  const setFilter = (fn: () => void) => {
    startTransition(() => {
      fn();
      setPage(1);
    });
  };

  return (
    <div className="w-full">
      {/* Search + filter bar */}
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) =>
                applyFilter(e.target.value, activeTag, activeCategory)
              }
              placeholder="Search articles, topics, instruments…"
              className="w-full rounded-xl border-2 border-neutral-200 bg-white py-3 pr-4 pl-10 text-sm font-medium text-neutral-800 transition outline-none placeholder:text-neutral-400 focus:border-red-400"
              aria-label="Search blog posts"
            />
            {query && (
              <button
                onClick={() => applyFilter('', activeTag, activeCategory)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-bold transition lg:hidden',
              showFilters
                ? 'border-red-400 bg-red-50 text-red-600'
                : 'border-neutral-200 bg-white text-neutral-600'
            )}
            aria-expanded={showFilters}
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>

        {/* Category pills */}
        <div
          className={cn(
            'flex flex-wrap gap-2',
            !showFilters && 'hidden lg:flex'
          )}
        >
          <button
            onClick={() => applyFilter(query, '', activeCategory)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-xs font-bold transition',
              !activeTag
                ? 'border-red-500 bg-red-500 text-white'
                : 'border-neutral-200 bg-white text-neutral-600 hover:border-red-300'
            )}
          >
            All Posts
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                applyFilter(query, activeTag, activeCategory === cat ? '' : cat)
              }
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-xs font-bold transition',
                activeCategory === cat
                  ? 'border-red-500 bg-red-500 text-white'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-red-300'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tag pills */}
        <div
          className={cn(
            'flex flex-wrap gap-2',
            !showFilters && 'hidden lg:flex'
          )}
        >
          <span className="flex items-center gap-1 text-xs font-bold text-neutral-400">
            <Tag className="h-3 w-3" aria-hidden="true" /> Tags:
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                applyFilter(query, activeTag === tag ? '' : tag, activeCategory)
              }
              className={cn(
                'rounded-full border px-2.5 py-1 text-[11px] font-bold transition',
                activeTag === tag
                  ? 'border-red-400 bg-red-50 text-red-600'
                  : 'border-neutral-100 bg-neutral-50 text-neutral-500 hover:border-red-200 hover:text-red-500'
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {hasFilters && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-500">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              {query && (
                <>
                  {' '}
                  for &ldquo;
                  <strong className="text-neutral-800">{query}</strong>&rdquo;
                </>
              )}
              {activeCategory && (
                <>
                  {' '}
                  in <strong className="text-red-500">{activeCategory}</strong>
                </>
              )}
              {activeTag && (
                <>
                  {' '}
                  tagged <strong className="text-red-500">{activeTag}</strong>
                </>
              )}
            </span>
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs font-bold text-red-500 hover:underline"
            >
              <X className="h-3 w-3" /> Clear all
            </button>
          </div>
        )}
      </div>

      {/* Posts grid */}
      <AnimatePresence mode="wait">
        <m.div
          key={`${query}-${activeTag}-${activeCategory}-${page}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {pagePosts.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-neutral-200 py-20 text-center">
              <p className="text-4xl" aria-hidden="true">
                🎵
              </p>
              <h3 className="text-lg font-black text-neutral-700">
                No posts found
              </h3>
              <p className="text-sm text-neutral-500">
                Try a different search term or browse all categories.
              </p>
              <button
                onClick={clearAll}
                className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-600"
              >
                Browse all posts
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pagePosts.map((post) => (
                <BlogCard key={post.slug} post={post} variant="default" />
              ))}
            </div>
          )}
        </m.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="mt-10 flex items-center justify-center gap-2"
          role="navigation"
          aria-label="Blog pagination"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl border-2 transition',
              page === 1
                ? 'cursor-not-allowed border-neutral-100 text-neutral-300'
                : 'border-neutral-200 text-neutral-600 hover:border-red-300 hover:text-red-500'
            )}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              aria-current={n === page ? 'page' : undefined}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl border-2 text-sm font-bold transition',
                n === page
                  ? 'border-red-500 bg-red-500 text-white'
                  : 'border-neutral-200 text-neutral-600 hover:border-red-300'
              )}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl border-2 transition',
              page === totalPages
                ? 'cursor-not-allowed border-neutral-100 text-neutral-300'
                : 'border-neutral-200 text-neutral-600 hover:border-red-300 hover:text-red-500'
            )}
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
