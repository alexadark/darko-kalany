import type { MetaFunction } from "react-router";
import type { Route } from "./+types/home";
import { client } from "@/sanity/lib/client";
import { PAGE_QUERY } from "@/sanity/lib/queries";
import { BlockRenderer } from "@/components/blocks";

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

export async function loader() {
  const page = await client.fetch(PAGE_QUERY, { slug: "/" });
  return { page };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { page } = loaderData;

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
