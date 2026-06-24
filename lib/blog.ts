import 'server-only';
// lib/blog.ts — Server Components only
// Types live in lib/blog-types.ts so client components can import them safely.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

// Re-export types so server-side code can import everything from one place
export type { BlogPost, BlogFaq } from './blog-types';
export { formatDate } from './blog-types';

import type { BlogPost } from './blog-types';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  const plainText = content
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\|[^\n]+\|/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    author: data.author ?? 'MusicChamps',
    authorRole: data.authorRole ?? 'Music Educator',
    date: data.date ?? '',
    readTime: data.readTime ?? stats.text,
    category: data.category ?? 'General',
    tags: data.tags ?? [],
    coverImage: data.coverImage ?? '/images/blog/default.jpg',
    featured: data.featured ?? false,
    faqs: data.faqs ?? [],
    content,
    excerpt: plainText.slice(0, 160) + (plainText.length > 160 ? '…' : ''),
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => getPostBySlug(file.replace(/\.mdx$/, '')))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPosts(count = 5): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.featured)
    .slice(0, count);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  getAllPosts().forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getAllCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((p) => p.category))).sort();
}

export type BlogFilters = {
  query?: string;
  tag?: string;
  category?: string;
  page?: number;
  perPage?: number;
};

export type PaginatedPosts = {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  currentPage: number;
};

export function getFilteredPosts({
  query = '',
  tag = '',
  category = '',
  page = 1,
  perPage = 9,
}: BlogFilters): PaginatedPosts {
  let posts = getAllPosts();

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

  if (tag)
    posts = posts.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  if (category)
    posts = posts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );

  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  return {
    posts: posts.slice((page - 1) * perPage, page * perPage),
    total,
    totalPages,
    currentPage: page,
  };
}

export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      score:
        p.tags.filter((t) => post.tags.includes(t)).length +
        (p.category === post.category ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((r) => r.post);
}

export function getAllPostSlugs(): { slug: string }[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace(/\.mdx$/, '') }));
}
