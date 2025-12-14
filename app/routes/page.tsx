import type { MetaFunction } from "react-router";
import type { Route } from "./+types/page";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/blocks";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.page) {
    return [{ title: "Page Not Found" }];
  }
  return [
    { title: data.page.seo?.metaTitle || data.page.title },
    { name: "description", content: data.page.seo?.metaDescription || "" },
  ];
};

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params["*"] || "";
  const page = await client.fetch(PAGE_QUERY, { slug });

  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }

  return { page };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { page } = loaderData;

  return (
    <main className="bg-black min-h-screen">
      <BlockRenderer blocks={page.pageBuilder} documentId={page._id} />
    </main>
  );
}
