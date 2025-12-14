import type { Route } from "./+types/page";
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

export function meta({ data }: Route.MetaArgs) {
  const page = data?.initial?.data;
  if (!page) {
    return [{ title: "Page Not Found" }];
  }
  return [
    { title: page.seo?.metaTitle || page.title },
    { name: "description", content: page.seo?.metaDescription || "" },
  ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const slug = params["*"] || "";
  const { options } = await getPreviewData(request);
  const data = await loadQuery<PageData>(PAGE_QUERY, { slug }, options);

  if (!data.data) {
    throw new Response("Not Found", { status: 404 });
  }

  return { initial: data, slug };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { initial, slug } = loaderData;
  const { data: page } = useQuery<PageData>(PAGE_QUERY, { slug }, { initial });

  if (!page) {
    return null;
  }

  return (
    <main className="bg-black min-h-screen">
      <BlockRenderer blocks={page.pageBuilder} documentId={page._id} />
    </main>
  );
}
