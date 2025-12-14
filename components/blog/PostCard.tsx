import { Link } from 'react-router';
import { urlFor } from '@/sanity/lib/image';
import { ArrowUpRight, Calendar } from 'lucide-react';

interface PostCardProps {
  post: {
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
    categories?: Array<{ _id: string; title: string }>;
  };
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PostCard({ post }: PostCardProps) {
  const category = post.categories?.[0];

  return (
    <Link
      to={`/blog/${post.slug.current}`}
      className="group block"
    >
      {/* Image Container */}
      <div className="aspect-[16/10] relative overflow-hidden bg-neutral-900 mb-4">
        {post.featuredImage?.asset && (
          <img
            src={urlFor(post.featuredImage).width(600).height(375).url()}
            alt={post.featuredImage.alt || post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

        {/* Arrow Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-primary text-black rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight size={20} />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center gap-4 text-sm">
          {category && (
            <span className="text-primary font-mono text-xs uppercase tracking-wider">
              {category.title}
            </span>
          )}
          {post.publishedAt && (
            <div className="flex items-center gap-1 text-gray-500 font-mono text-xs">
              <Calendar size={12} />
              <time>{formatDate(post.publishedAt)}</time>
            </div>
          )}
        </div>

        <h3 className="text-xl font-heading text-white group-hover:text-primary transition-colors">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-gray-400 text-sm line-clamp-2">
            {post.excerpt}
          </p>
        )}

        {post.author && (
          <p className="text-gray-500 text-xs font-mono">
            By {post.author}
          </p>
        )}
      </div>
    </Link>
  );
}
