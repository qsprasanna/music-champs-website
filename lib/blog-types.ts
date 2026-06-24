// lib/blog-types.ts
// ─────────────────────────────────────────────────────────────────────────────
// Types and pure utility functions — NO Node.js imports (no fs, no path).
// Safe to import in both Server Components and Client Components.
//
// lib/blog.ts  → server-only (uses fs, gray-matter)  — Server Components only
// lib/blog-types.ts → shared (types + formatDate)    — anywhere
// ─────────────────────────────────────────────────────────────────────────────

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage: string;
  featured: boolean;
  faqs: BlogFaq[];
  content: string;
  excerpt: string;
};

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
