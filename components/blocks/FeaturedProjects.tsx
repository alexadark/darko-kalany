import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { Button } from '../ui/Button';

interface Project {
  _id: string;
  title: string;
  slug?: { current: string };
  excerpt?: string;
  featuredImage?: {
    asset?: { _ref: string };
    alt?: string;
  };
  client?: string;
  year?: string;
  categories?: Array<{ title: string }>;
}

interface FeaturedProjectsProps {
  heading: string;
  subheading?: string;
  projects?: Project[];
  layout?: 'grid-2' | 'grid-3' | 'featured';
  showCategory?: boolean;
  showYear?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export function FeaturedProjects({
  heading,
  subheading,
  projects = [],
  layout = 'grid-2',
  showCategory = true,
  showYear = true,
  ctaText = 'View All Projects',
  ctaLink = '/projects',
}: FeaturedProjectsProps) {
  const layoutClasses = {
    'grid-2': 'md:grid-cols-2',
    'grid-3': 'md:grid-cols-2 lg:grid-cols-3',
    featured: 'md:grid-cols-2',
  };

  if (!projects.length) return null;

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          {subheading && (
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">
              {subheading}
            </h2>
          )}
          <h3 className="text-3xl md:text-4xl font-heading text-white">
            {heading}
          </h3>
        </div>

        <div className={`grid grid-cols-1 ${layoutClasses[layout]} gap-12`}>
          {projects.map((project) => {
            const imageUrl = project.featuredImage?.asset
              ? urlFor(project.featuredImage).width(800).height(600).url()
              : 'https://picsum.photos/800/600';

            const category = project.categories?.[0]?.title;
            const projectLink = project.slug?.current
              ? `/projects/${project.slug.current}`
              : '#';

            return (
              <Link
                href={projectLink}
                key={project._id}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden mb-6 aspect-[4/3] relative">
                  <Image
                    src={imageUrl}
                    alt={project.featuredImage?.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <div className="flex justify-between items-start border-b border-white/10 pb-4">
                  <div>
                    {showCategory && category && (
                      <p className="text-xs font-mono text-gray-400 uppercase mb-1">
                        {category}
                      </p>
                    )}
                    <h4 className="text-2xl font-heading text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </h4>
                  </div>
                  {showYear && project.year && (
                    <span className="text-xs font-mono text-gray-500 border border-gray-800 px-2 py-1 rounded-full">
                      {project.year}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {ctaText && ctaLink && (
          <div className="mt-16 text-center">
            <Button href={ctaLink} variant="outline">
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
