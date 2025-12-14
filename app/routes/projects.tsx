import type { MetaFunction } from "react-router";
import type { Route } from "./+types/projects";
import { useQuery } from "@sanity/react-loader";
import { loadQuery } from "~/sanity/loader.server";
import { getPreviewData } from "~/sanity/session";
import {
  PROJECTS_PAGINATED_QUERY,
  PROJECTS_COUNT_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage?: {
    asset?: { _ref: string };
    alt?: string;
  };
  client?: string;
  year?: string;
  categories?: Array<{ _id: string; title: string; slug: { current: string } }>;
}

interface Settings {
  projectsPerPage?: number;
}

export const meta: MetaFunction = () => {
  return [
    { title: "Projects | Darko Kalany Studio" },
    {
      name: "description",
      content:
        "Explore our detailed case studies demonstrating the power of generative AI in commercial application.",
    },
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const { options } = await getPreviewData(request);

  // Get settings for pagination
  const settingsData = await loadQuery<Settings>(SITE_SETTINGS_QUERY, {}, options);
  const perPage = settingsData.data?.projectsPerPage || 6;

  // Get initial projects
  const projectsData = await loadQuery<Project[]>(
    PROJECTS_PAGINATED_QUERY,
    { start: 0, end: perPage },
    options
  );

  // Get total count
  const countData = await loadQuery<number>(PROJECTS_COUNT_QUERY, {}, options);

  return {
    initial: projectsData,
    totalCount: countData.data || 0,
    perPage,
  };
}

export default function Projects({ loaderData }: Route.ComponentProps) {
  const { initial, totalCount, perPage } = loaderData;
  const { data: projects } = useQuery<Project[]>(
    PROJECTS_PAGINATED_QUERY,
    { start: 0, end: perPage },
    { initial }
  );

  const [displayedProjects, setDisplayedProjects] = useState<Project[]>(
    projects || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const hasMore = displayedProjects.length < totalCount;

  const loadMore = async () => {
    setIsLoading(true);
    try {
      // For demo, we'll just show a message. In production, you'd fetch more from an API route
      // This is a simplified version - for full implementation, create an API route
      const response = await fetch(
        `/api/projects?start=${displayedProjects.length}&end=${displayedProjects.length + perPage}`
      );
      if (response.ok) {
        const newProjects = await response.json();
        setDisplayedProjects([...displayedProjects, ...newProjects]);
      }
    } catch (error) {
      console.error("Failed to load more projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-32 pb-16 container mx-auto px-6 border-b border-white/10">
        <h1 className="text-5xl md:text-7xl font-heading text-white mb-6">
          Selected Works
        </h1>
        <p className="text-gray-400 max-w-xl text-lg font-light">
          Explore our detailed case studies demonstrating the power of
          generative AI in commercial application.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {displayedProjects?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="mt-16 text-center">
            <Button
              variant="outline"
              onClick={loadMore}
              className="min-w-[200px]"
            >
              {isLoading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="py-24 text-center border-t border-white/10 bg-neutral-950">
        <p className="text-gray-500 mb-6 font-mono text-sm uppercase">
          Have a project in mind?
        </p>
        <a
          href="/contact"
          className="text-3xl md:text-4xl font-heading text-white hover:text-primary underline decoration-1 underline-offset-8 transition-all"
        >
          Start a collaboration
        </a>
      </div>
    </main>
  );
}
