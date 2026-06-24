// app/page.tsx
import { buildMetadata } from '@/lib/seo/metadata';
import { homeFaqSchema } from '@/lib/seo/schemas';
import JsonLd from '@/components/seo/JsonLd';
import HomePage from '@/features/home/HomePage';
import Head from 'next/head';

export const metadata = buildMetadata({
  title: 'Online Music Classes for Kids & Teens',
  description:
    'MusicChamps offers interactive online music classes for kids and teens with expert instructors for guitar, piano, vocals, drums, violin, flute, and more.',
  keywords:
    'online music classes, kids music academy online, online music classes for kids, music classes online',
  canonical: '/',
});

export default function Page() {
  return (
    <>
      {/* FAQ schema — powers Google's "People also ask" results */}
      <Head>
        <JsonLd schema={homeFaqSchema()} />
      </Head>
      <HomePage />
    </>
  );
}
