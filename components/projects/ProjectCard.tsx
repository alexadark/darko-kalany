import { Link } from 'react-router';
import { urlFor } from '@/sanity/lib/image';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    featuredImage?: {
      asset?: { _ref: string };
      alt?: string;
    };
    categories?: Array<{ _id: string; title: string }>;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const category = project.categories?.[0];

  return (
    <Link
      to={`/projects/${project.slug.current}`}
      className="group block relative overflow-hidden"
    >
      {/* Image Container */}
      <div className="aspect-[4/3] relative overflow-hidden bg-neutral-900">
        {project.featuredImage?.asset && (
          <img
            src={urlFor(project.featuredImage).width(800).height(600).url()}
            alt={project.featuredImage.alt || project.title}
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
      <div className="mt-4 space-y-2">
        {category && (
          <span className="text-primary font-mono text-xs uppercase tracking-wider">
            {category.title}
          </span>
        )}
        <h3 className="text-xl font-heading text-white group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        {project.excerpt && (
          <p className="text-gray-400 text-sm line-clamp-2">
            {project.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
