import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Camera, Layers, Play } from 'lucide-react';
import { SERVICES_DATA } from '../../constants';

interface ServiceListBlockProps {
  block: {
    heading: string;
    subheading: string;
    services?: any[]; // In real usage, these are fetched/expanded references
  }
}

const ServiceListBlock: React.FC<ServiceListBlockProps> = ({ block }) => {
  // Fallback to constants if no services are passed from Sanity (or if manualSelection was false)
  const displayServices = (block.services && block.services.length > 0) 
    ? block.services 
    : SERVICES_DATA;

  return (
    <section className="py-24 bg-black border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">
              {block.subheading}
            </h2>
            <h3 className="text-3xl md:text-4xl font-heading text-white">
              {block.heading}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayServices.map((service: any, index: number) => (
            <div 
              key={service._id || index} 
              className="group p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 bg-neutral-900/20"
            >
              <div className="mb-6 text-primary">
                  {/* Dynamic Icon Logic based on index or title could go here */}
                  {index % 4 === 0 && <Box size={32} strokeWidth={1} />}
                  {index % 4 === 1 && <Camera size={32} strokeWidth={1} />}
                  {index % 4 === 2 && <Layers size={32} strokeWidth={1} />}
                  {index % 4 === 3 && <Play size={32} strokeWidth={1} />}
              </div>
              <h4 className="text-xl font-heading text-white mb-3">{service.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 min-h-[60px]">
                {service.description}
              </p>
              <Link 
                to="/services" 
                className="text-xs font-mono uppercase tracking-wider text-white group-hover:text-primary flex items-center"
              >
                Learn More 
                <ArrowRight size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceListBlock;
