// features/home/sections/BlogSectionServer.tsx

import { getAllPosts } from '@/lib/blog';
import BlogSection from './BlogSection';

export default function BlogSectionServer() {
  const posts = getAllPosts().slice(0, 5);

  return <BlogSection posts={posts} />;
}
