// BlogSectionClient.tsx

'use client';

import BlogCard from '@/features/blog/BlogCard';
import type { BlogPost } from '@/lib/blog-types';

type Props = {
  posts: BlogPost[];
};

export default function BlogSectionClient({ posts }: Props) {
  return (
    <>
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </>
  );
}
