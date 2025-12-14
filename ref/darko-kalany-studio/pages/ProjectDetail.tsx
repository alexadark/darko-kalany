import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FEATURED_PROJECTS } from '../constants';
import Button from '../components/ui/Button';
import { Project } from '../types';
import { client, urlFor, isSanityConfigured } from '../lib/sanity';
import { PROJECT_DETAIL_QUERY } from '../lib/queries';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      window.scrollTo(0, 0);

      if (!isSanityConfigured()) {
        // Fallback Logic if no Sanity ID
        const index = FEATURED_PROJECTS.findIndex(p => p.id === id);
        if (index !== -1) {
          setProject(FEATURED_PROJECTS[index]);
          setNextProject(
             index < FEATURED_PROJECTS.length - 1 
             ? FEATURED_PROJECTS[index + 1] 
             : FEATURED_PROJECTS[0]
          );
        }
        setLoading(false);
        return;
      }

      try {
        // Fetch current project
        const data = await client.fetch(PROJECT_DETAIL_QUERY, { id });
        
        if (data) {
          const mappedProject: Project = {
            id: data._id,
            title: data.title,
            category: data.category,
            description: data.description,
            image: data.mainImage ? urlFor(data.mainImage).width(1200).url() : 'https://picsum.photos/1200/800',
            year: data.year,
            client: data.client
          };
          setProject(mappedProject);

          // Fetch a 'next' project just for navigation flow (getting the most recent other project)
          // In a real app you might want specific ordering
          const nextData = await client.fetch(`*[_type == "project" && _id != $id] | order(year desc)[0]`, { id });
          if (nextData) {
             setNextProject({
                id: nextData._id,
                title: nextData.title,
                category: nextData.category,
                description: nextData.description,
                image: nextData.mainImage ? urlFor(nextData.mainImage).width(1200).url() : '',
                year: nextData.year,
                client: nextData.client
             });
          }
        }
      } catch (error) {
        console.error("Sanity fetch error:", error);
        // Optional: try to find in fallback data even if fetch fails
        const fallback = FEATURED_PROJECTS.find(p => p.id === id);
        if (fallback) setProject(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h2 className="text-4xl font-heading mb-4">Project Not Found</h2>
        <Button to="/projects" variant="outline">Return to Projects</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
       {/* Navigation */}
       <div className="fixed top-24 left-6 z-20 hidden xl:block">
          <Link to="/projects" className="flex items-center text-gray-500 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest">
            <ArrowLeft size={16} className="mr-2" /> Back
          </Link>
       </div>

       {/* Hero Image */}
       <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-24">
            <div className="container mx-auto">
              <h1 className="text-5xl md:text-8xl font-heading text-white mb-4 animate-fade-in-up">{project.title}</h1>
              <p className="text-primary font-mono text-sm md:text-lg uppercase tracking-widest">{project.category}</p>
            </div>
          </div>
       </div>

       {/* Project Info */}
       <div className="container mx-auto px-6 py-12 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
             {/* Metadata Side */}
             <div className="md:col-span-4 space-y-8 border-t border-white/10 pt-8">
                <div className="grid grid-cols-2 md:grid-cols-1 gap-8">
                  <div>
                    <h3 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-1">Client</h3>
                    <p className="text-white text-lg">{project.client || 'Confidential'}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-1">Year</h3>
                    <p className="text-white text-lg">{project.year}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-1">Services</h3>
                    <p className="text-white text-lg">Art Direction, AI Generation</p>
                  </div>
                </div>
             </div>

             {/* Description Side */}
             <div className="md:col-span-8 border-t border-white/10 pt-8">
                <h2 className="text-2xl md:text-3xl font-light leading-relaxed text-gray-200 mb-12">
                  {project.description}
                </h2>
                
                <div className="space-y-6 text-gray-400 font-light leading-relaxed">
                   <p>
                     The challenge was to create a visual language that felt both grounded in reality and unmistakably futuristic. 
                     By leveraging our proprietary LoRA models tailored for {project.category.toLowerCase()}, we generated over 400 iterations 
                     before selecting the final hero assets.
                   </p>
                   <p>
                     Each image underwent rigorous post-processing, including manual painting, color grading to match the brand's palette, 
                     and upscaling to 8K resolution for large-format print usage.
                   </p>
                </div>

                <div className="mt-16">
                   <img 
                     src={project.image} 
                     alt="Detail view" 
                     className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 mb-4" 
                   />
                   <p className="text-xs text-gray-600 font-mono uppercase text-right">Final Render</p>
                </div>
             </div>
          </div>
       </div>

       {/* Next Project Navigation */}
       {nextProject && (
         <Link to={`/projects/${nextProject.id}`} className="block border-t border-white/10 group relative overflow-hidden">
            <div className="container mx-auto px-6 py-24 flex justify-between items-center z-10 relative">
               <div>
                  <span className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2 block">Next Project</span>
                  <h2 className="text-4xl md:text-6xl font-heading text-white group-hover:text-primary transition-colors">{nextProject.title}</h2>
               </div>
               <ArrowRight size={48} className="text-white group-hover:text-primary transition-colors transform group-hover:translate-x-2 duration-300" />
            </div>
         </Link>
       )}
    </div>
  );
};

export default ProjectDetailPage;