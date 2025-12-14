import type { MetaFunction } from "react-router";
import type { Route } from "./+types/projects.$slug";
import { useQuery } from "@sanity/react-loader";
import { loadQuery } from "~/sanity/loader.server";
import { getPreviewData } from "~/sanity/session";
import { PROJECT_QUERY, PROJECTS_QUERY } from "@/sanity/lib/queries";
import { Link } from "react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage?: {
    asset?: { _ref: string };
    alt?: string;
  };
  gallery?: Array<{
    _key: string;
    asset?: { _ref: string };
    alt?: string;
    caption?: string;
  }>;
  content?: any;
  client?: string;
  year?: string;
  services?: string[];
  url?: string;
  categories?: Array<{ _id: string; title: string; slug: { current: string } }>;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface ProjectListItem {
  _id: string;
  title: string;
  slug: { current: string };
  featuredImage?: {
    asset?: { _ref: string };
  };
  categories?: Array<{ _id: string; title: string }>;
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const project = data?.initial?.data;
  return [
    { title: project?.seo?.metaTitle || `${project?.title} | Darko Kalany Studio` },
    {
      name: "description",
      content: project?.seo?.metaDescription || project?.excerpt || "",
    },
  ];
};

export async function loader({ params, request }: Route.LoaderArgs) {
  const { options } = await getPreviewData(request);

  const projectData = await loadQuery<Project>(
    PROJECT_QUERY,
    { slug: params.slug },
    options
  );

  if (!projectData.data) {
    throw new Response("Not Found", { status: 404 });
  }

  // Get all projects for next project navigation
  const allProjectsData = await loadQuery<ProjectListItem[]>(
    PROJECTS_QUERY,
    {},
    options
  );

  return {
    initial: projectData,
    allProjects: allProjectsData.data || [],
  };
}

export default function ProjectDetail({ loaderData }: Route.ComponentProps) {
  const { initial, allProjects } = loaderData;
  const { data: project } = useQuery<Project>(
    PROJECT_QUERY,
    { slug: initial.data?.slug?.current },
    { initial }
  );

  if (!project) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
        </div>
      </main>
    );
  }

  // Find next project
  const currentIndex = allProjects.findIndex((p) => p._id === project._id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const category = project.categories?.[0];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <div className="hidden md:block fixed top-32 left-6 z-30">
        <Link
          to="/projects"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-sm uppercase"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>

      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px]">
        {project.featuredImage?.asset && (
          <img
            src={urlFor(project.featuredImage).width(1920).height(1080).url()}
            alt={project.featuredImage.alt || project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-16">
          {category && (
            <span className="inline-block bg-primary text-black px-3 py-1 text-xs font-mono uppercase tracking-wider mb-4">
              {category.title}
            </span>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {project.client && (
              <div>
                <h4 className="text-gray-500 font-mono text-xs uppercase tracking-wider mb-2">
                  Client
                </h4>
                <p className="text-white text-lg">{project.client}</p>
              </div>
            )}
            {project.year && (
              <div>
                <h4 className="text-gray-500 font-mono text-xs uppercase tracking-wider mb-2">
                  Year
                </h4>
                <p className="text-white text-lg">{project.year}</p>
              </div>
            )}
            {project.services && project.services.length > 0 && (
              <div>
                <h4 className="text-gray-500 font-mono text-xs uppercase tracking-wider mb-2">
                  Services
                </h4>
                <ul className="space-y-1">
                  {project.services.map((service, index) => (
                    <li key={index} className="text-white">
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.url && (
              <div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-mono text-sm uppercase"
                >
                  Visit Site
                  <ArrowUpRight size={16} />
                </a>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {project.excerpt && (
              <p className="text-2xl md:text-3xl font-light text-gray-300 leading-relaxed mb-12">
                {project.excerpt}
              </p>
            )}

            {project.content && (
              <div className="prose prose-lg prose-invert max-w-none mb-12">
                <PortableText value={project.content} />
              </div>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-8">
                {project.gallery.map((image) => (
                  <figure key={image._key}>
                    {image.asset && (
                      <img
                        src={urlFor(image).width(1200).url()}
                        alt={image.alt || "Project image"}
                        className="w-full"
                      />
                    )}
                    {image.caption && (
                      <figcaption className="mt-4 text-gray-500 text-sm font-mono">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Next Project */}
      {nextProject && nextProject._id !== project._id && (
        <Link
          to={`/projects/${nextProject.slug.current}`}
          className="block border-t border-white/10 bg-neutral-950 group"
        >
          <div className="container mx-auto px-6 py-16">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-mono text-xs uppercase tracking-wider mb-2">
                  Next Project
                </p>
                <h3 className="text-3xl md:text-4xl font-heading text-white group-hover:text-primary transition-colors">
                  {nextProject.title}
                </h3>
                {nextProject.categories?.[0] && (
                  <span className="text-gray-400 font-mono text-sm uppercase mt-2 block">
                    {nextProject.categories[0].title}
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
