import React from 'react';
import Button from '../ui/Button';
import { FEATURED_PROJECTS } from '../../constants';

interface FeaturedProjectsBlockProps {
  block: {
    heading: string;
    subheading: string;
    projects?: any[];
  }
}

const FeaturedProjectsBlock: React.FC<FeaturedProjectsBlockProps> = ({ block }) => {
  const displayProjects = (block.projects && block.projects.length > 0) 
    ? block.projects 
    : FEATURED_PROJECTS;

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">
            {block.subheading}
          </h2>
          <h3 className="text-3xl md:text-4xl font-heading text-white">
            {block.heading}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {displayProjects.map((project: any) => (
            <div key={project._id || project.id} className="group cursor-pointer">
              <div className="overflow-hidden mb-6 aspect-[4/3] relative">
                <img 
                  src={project.image || 'https://picsum.photos/800/600'} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-mono text-gray-400 uppercase mb-1">{project.category}</p>
                  <h4 className="text-2xl font-heading text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                </div>
                <span className="text-xs font-mono text-gray-500 border border-gray-800 px-2 py-1 rounded-full">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button to="/projects" variant="outline">View All Projects</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsBlock;
