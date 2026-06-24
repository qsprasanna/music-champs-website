'use client';

// features/blog/BlogCard.tsx
// ✅ Imports types and formatDate from lib/blog-types.ts (no fs, client-safe)
//    NOT from lib/blog.ts (which uses fs and is server-only)

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate, type BlogPost } from '@/lib/blog-types'; // ← changed

type Props = {
  post: BlogPost;
  variant?: 'default' | 'featured-large' | 'featured-small' | 'horizontal';
  className?: string;
};

export default function BlogCard({
  post,
  variant = 'default',
  className,
}: Props) {
  if (variant === 'featured-large') {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          'group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm',
          'border border-neutral-100 transition-shadow hover:shadow-lg',
          className
        )}
        aria-label={`Read: ${post.title}`}
      >
        <div className="relative h-52 w-full overflow-hidden bg-neutral-100 sm:h-64">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="absolute top-3 left-3 rounded-full bg-red-500 px-3 py-0.5 text-xs font-black tracking-wide text-white uppercase">
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <h3 className="text-lg leading-snug font-black text-neutral-900 transition-colors group-hover:text-red-500 lg:text-xl">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              {formatDate(post.date)}
            </span>
          </div>
          <AuthorRow post={post} />
        </div>
      </Link>
    );
  }

  if (variant === 'featured-small') {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          'group flex gap-4 overflow-hidden rounded-2xl border border-neutral-100 bg-white p-3',
          'shadow-sm transition-shadow hover:shadow-md',
          className
        )}
        aria-label={`Read: ${post.title}`}
      >
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="96px"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <h3 className="line-clamp-2 text-sm leading-snug font-black text-neutral-900 transition-colors group-hover:text-red-500">
            {post.title}
          </h3>
          <AuthorRow post={post} small />
          <span className="text-xs text-neutral-400">
            {formatDate(post.date)}
          </span>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          'group flex flex-col gap-5 overflow-hidden rounded-2xl border border-neutral-100 bg-white p-4',
          'shadow-sm transition-shadow hover:border-red-200 hover:shadow-md',
          className
        )}
        aria-label={`Read: ${post.title}`}
      >
        <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-xl bg-neutral-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="128px"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1.5">
          <span className="text-xs font-bold text-red-500">
            {post.category}
          </span>
          <h3 className="text-base leading-snug font-black text-neutral-900 transition-colors group-hover:text-red-500">
            {post.title}
          </h3>
          <p className="line-clamp-1 text-xs text-neutral-500">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Default grid card
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm',
        'transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg',
        className
      )}
      aria-label={`Read: ${post.title}`}
    >
      <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-black tracking-wide text-white uppercase">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3 className="line-clamp-2 text-base leading-snug font-black text-neutral-900 transition-colors group-hover:text-red-500">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-neutral-500">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full border border-red-100 bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-500"
            >
              <Tag className="h-2.5 w-2.5" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-1 text-xs text-neutral-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            {formatDate(post.date)}
          </span>
        </div>
        <AuthorRow post={post} small />
      </div>
    </Link>
  );
}

function AuthorRow({ post, small }: { post: BlogPost; small?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-red-500 font-black text-white',
          small ? 'h-5 w-5 text-[8px]' : 'h-7 w-7 text-[10px]'
        )}
      >
        {post.author.slice(0, 2).toUpperCase()}
      </div>
      <div>
        <p
          className={cn(
            'font-bold text-neutral-800',
            small ? 'text-[10px]' : 'text-xs'
          )}
        >
          {post.author}
        </p>
        {!small && (
          <p className="text-[10px] text-neutral-400">{post.authorRole}</p>
        )}
      </div>
    </div>
  );
}
