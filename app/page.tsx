import { sanityFetch } from '@/sanity/lib/live';
import { PAGE_QUERY } from '@/sanity/lib/queries';
import { BlockRenderer } from '@/components/blocks';

interface Page {
  _id: string;
  title: string;
  pageBuilder?: any[];
}

export default async function Home() {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug: '/' },
  });

  if (!page) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Page not found</h1>
          <p className="text-gray-400">
            Create a page with slug "/" in Sanity Studio
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen">
      <BlockRenderer blocks={page.pageBuilder} documentId={page._id} />
    </main>
  );
}
