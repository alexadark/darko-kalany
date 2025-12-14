import type { MetaFunction } from "react-router";
import type { Route } from "./+types/blog";
import { useQuery } from "@sanity/react-loader";
import { loadQuery } from "~/sanity/loader.server";
import { getPreviewData } from "~/sanity/session";
import {
  POSTS_PAGINATED_QUERY,
  POSTS_COUNT_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";
import { useState } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { Button } from "@/components/ui/Button";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage?: {
    asset?: { _ref: string };
    alt?: string;
  };
  publishedAt?: string;
  author?: string;
  categories?: Array<{ _id: string; title: string; slug: { current: string } }>;
}

interface SiteSettings {
  postsPerPage?: number;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Blog | Darko Kalany Studio" },
    { name: "description", content: "Insights, stories, and updates from our studio." },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const { options } = await getPreviewData(request);

  // Get settings for postsPerPage
  const settingsData = await loadQuery<SiteSettings>(SITE_SETTINGS_QUERY, {}, options);
  const postsPerPage = settingsData.data?.postsPerPage || 6;

  // Get initial posts
  const postsData = await loadQuery<Post[]>(
    POSTS_PAGINATED_QUERY,
    { start: 0, end: postsPerPage },
    options
  );

  // Get total count
  const countData = await loadQuery<number>(POSTS_COUNT_QUERY, {}, options);

  return {
    initial: postsData,
    totalCount: countData.data || 0,
    postsPerPage,
  };
}

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  const { initial, totalCount, postsPerPage } = loaderData;
  const { data: initialPosts } = useQuery<Post[]>(
    POSTS_PAGINATED_QUERY,
    { start: 0, end: postsPerPage },
    { initial }
  );

  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = posts.length < totalCount;

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/posts?start=${posts.length}&end=${posts.length + postsPerPage}`
      );
      const newPosts = await response.json();
      setPosts([...posts, ...newPosts]);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto">
          <span className="text-primary font-mono text-sm uppercase tracking-widest mb-4 block">
            Blog
          </span>
          <h1 className="text-5xl md:text-7xl font-heading text-white mb-6">
            Insights & Stories
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl font-light">
            Behind-the-scenes looks at our creative process, industry insights, and updates from the studio.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          {posts && posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-16">
                  <Button
                    variant="outline"
                    onClick={loadMore}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Load More"}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
