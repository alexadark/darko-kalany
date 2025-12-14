import type { MetaFunction } from "react-router";
import type { Route } from "./+types/blog.$slug";
import { useQuery } from "@sanity/react-loader";
import { loadQuery } from "~/sanity/loader.server";
import { getPreviewData } from "~/sanity/session";
import { POST_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { Link } from "react-router";
import { ArrowLeft, ArrowUpRight, Calendar, User } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage?: {
    asset?: { _ref: string };
    alt?: string;
  };
  content?: any;
  author?: string;
  publishedAt?: string;
  categories?: Array<{ _id: string; title: string; slug: { current: string } }>;
  tags?: Array<{ _id: string; title: string; slug: { current: string } }>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface PostListItem {
  _id: string;
  title: string;
  slug: { current: string };
  featuredImage?: {
    asset?: { _ref: string };
  };
  categories?: Array<{ _id: string; title: string }>;
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const post = data?.initial?.data;
  return [
    { title: post?.seo?.metaTitle || `${post?.title} | Darko Kalany Studio` },
    {
      name: "description",
      content: post?.seo?.metaDescription || post?.excerpt || "",
    },
  ];
};

export async function loader({ params, request }: Route.LoaderArgs) {
  const { options } = await getPreviewData(request);

  const postData = await loadQuery<Post>(
    POST_QUERY,
    { slug: params.slug },
    options
  );

  if (!postData.data) {
    throw new Response("Not Found", { status: 404 });
  }

  // Get all posts for next post navigation
  const allPostsData = await loadQuery<PostListItem[]>(
    POSTS_QUERY,
    {},
    options
  );

  return {
    initial: postData,
    allPosts: allPostsData.data || [],
  };
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostDetail({ loaderData }: Route.ComponentProps) {
  const { initial, allPosts } = loaderData;
  const { data: post } = useQuery<Post>(
    POST_QUERY,
    { slug: initial.data?.slug?.current },
    { initial }
  );

  if (!post) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        </div>
      </main>
    );
  }

  // Find next post
  const currentIndex = allPosts.findIndex((p) => p._id === post._id);
  const nextPost = allPosts[(currentIndex + 1) % allPosts.length];

  const category = post.categories?.[0];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="hidden md:block fixed top-32 left-6 z-30">
        <Link
          to="/blog"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-sm uppercase"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        {post.featuredImage?.asset && (
          <img
            src={urlFor(post.featuredImage).width(1920).height(1080).url()}
            alt={post.featuredImage.alt || post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-16">
          {category && (
            <span className="inline-block bg-primary text-black px-3 py-1 text-xs font-mono uppercase tracking-wider mb-4">
              {category.title}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white max-w-4xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 mt-6 text-gray-400 font-mono text-sm">
            {post.author && (
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{post.author}</span>
              </div>
            )}
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <time>{formatDate(post.publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {post.excerpt && (
            <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed mb-12 border-l-2 border-primary pl-6">
              {post.excerpt}
            </p>
          )}

          {post.content && (
            <div className="prose prose-lg prose-invert max-w-none">
              <PortableText value={post.content} />
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="px-3 py-1 bg-white/5 text-gray-400 text-sm font-mono"
                  >
                    #{tag.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Post */}
      {nextPost && nextPost._id !== post._id && (
        <Link
          to={`/blog/${nextPost.slug.current}`}
          className="block border-t border-white/10 bg-neutral-950 group"
        >
          <div className="container mx-auto px-6 py-16">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-wider mb-2">
                  Next Post
                </p>
                <h3 className="text-3xl md:text-4xl font-heading text-white group-hover:text-primary transition-colors">
                  {nextPost.title}
                </h3>
                {nextPost.categories?.[0] && (
                  <span className="text-gray-400 font-mono text-sm uppercase mt-2 block">
                    {nextPost.categories[0].title}
                  </span>
                )}
              </div>
              <div className="hidden md:flex items-center justify-center w-16 h-16 border border-white/20 rounded-full group-hover:border-primary group-hover:bg-primary transition-all">
                <ArrowUpRight
                  size={24}
                  className="text-white group-hover:text-black transition-colors"
                />
              </div>
            </div>
          </div>
        </Link>
      )}
    </main>
  );
}
