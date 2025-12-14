import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { FEATURED_PROJECTS } from '../constants';
import { client, urlFor, isSanityConfigured } from '../lib/sanity';
import { PROJECTS_QUERY } from '../lib/queries';
import { Project } from '../types';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      // 1. If Sanity is not configured (Project ID is placeholder), use fallback data
      if (!isSanityConfigured()) {
        console.log("Sanity not configured. Using local fallback data.");
        setProjects(FEATURED_PROJECTS);
        setLoading(false);
        return;
      }

      // 2. Fetch from Sanity
      try {
        const data = await client.fetch(PROJECTS_QUERY);
        
        if (data && data.length > 0) {
          // Map Sanity data to our frontend interface
          const mappedProjects: Project[] = data.map((p: any) => ({
            id: p._id,
            title: p.title,
            category: p.category,
            description: p.description,
            image: p.mainImage ? urlFor(p.mainImage).width(800).height(600).url() : 'https://picsum.photos/800/600',
            year: p.year,
            client: p.client
          }));
          setProjects(mappedProjects);
        } else {
          setProjects(FEATURED_PROJECTS);
        }
      } catch (error) {
        console.error("Failed to fetch from Sanity:", error);
        // Fallback on error
        setProjects(FEATURED_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">Loading Studio Works...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-24 pb-16 container mx-auto px-6 border-b border-white/10">
        <h1 className="text-5xl md:text-7xl font-heading text-white mb-6">Selected Works</h1>
        <p className="text-gray-400 max-w-xl text-lg font-light">
          Explore our detailed case studies demonstrating the power of generative AI in commercial application.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {projects.map((project) => (
            <Link 
              to={`/projects/${project.id}`}
              key={project.id} 
              className="group block"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-[4/3] mb-6 bg-white/5">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                
                {/* Floating Arrow Button */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                  <ArrowUpRight size={20} className="text-black" />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 border-b border-white/10 pb-8">
                <div>
                  <span className="text-primary text-xs font-mono uppercase tracking-wider mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-heading text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm max-w-md line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col gap-1 text-right min-w-[120px] hidden md:flex">
                  <span className="text-xs font-mono text-gray-500 uppercase">Client</span>
                  <span className="text-sm font-medium text-gray-300">{project.client}</span>
                  
                  <span className="text-xs font-mono text-gray-500 uppercase mt-2">Year</span>
                  <span className="text-sm font-medium text-gray-300">{project.year}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 text-center border-t border-white/10 bg-neutral-950">
        <p className="text-gray-500 mb-6 font-mono text-sm uppercase">Have a project in mind?</p>
        <Link to="/contact" className="text-3xl md:text-4xl font-heading text-white hover:text-primary underline decoration-1 underline-offset-8 transition-all">
          Start a collaboration
        </Link>
      </div>
    </div>
  );
};

export default ProjectsPage;