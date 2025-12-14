import type { MetaFunction } from "react-router";
import type { Route } from "./+types/home";
import { useQuery } from "@sanity/react-loader";
import { loadQuery } from "~/sanity/loader.server";
import { getPreviewData } from "~/sanity/session";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/blocks";

interface PageData {
  _id: string;
  title: string;
  slug: { current: string };
  pageBuilder: Array<Record<string, unknown>>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export const meta: MetaFunction = () => {
  return [
    { title: "Darko Kalany Studio | Hyper-Real AI Photography & Film" },
    {
      name: "description",
      content:
        "Darko Kalany Studio crafts cinematic images and motion that look more real than reality. Defining the future of luxury advertising.",
    },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const { options } = await getPreviewData(request);
  const data = await loadQuery<PageData>(PAGE_QUERY, { slug: "/" }, options);
  return { initial: data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { initial } = loaderData;
  const { data: page } = useQuery<PageData>(PAGE_QUERY, { slug: "/" }, { initial });

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
