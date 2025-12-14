import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/lib/live';
import { client } from '@/sanity/lib/client';
import { PAGE_QUERY, PAGES_QUERY } from '@/sanity/lib/queries';
import { BlockRenderer } from '@/components/blocks';

interface Page {
  _id: string;
  title: string;
  slug: { current: string };
  pageBuilder?: any[];
}

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  // Use direct client for static generation (no stega)
  const pages = await client.fetch<Array<{ slug: { current: string } }>>(
    PAGES_QUERY,
    {},
    { perspective: 'published' }
  );

  return pages
    .filter((page) => page.slug?.current && page.slug.current !== '/')
    .map((page) => ({
      slug: page.slug.current.split('/'),
    }));
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray?.join('/') || '';

  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  if (!page) {
    notFound();
  }

  return (
    <main className="bg-black min-h-screen">
      <BlockRenderer blocks={page.pageBuilder} documentId={page._id} />
    </main>
  );
}
