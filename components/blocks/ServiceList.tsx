import { Link } from 'react-router';
import { ArrowRight, Box, Camera, Layers, Play, Film, Image as ImageIcon, Code, Settings } from 'lucide-react';

interface Service {
  _key: string;
  icon?: string;
  title: string;
  description?: string;
  features?: string[];
  link?: string;
}

interface ServiceListProps {
  heading: string;
  subheading?: string;
  services?: Service[];
  columns?: 2 | 3 | 4;
  showLearnMore?: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  box: Box,
  camera: Camera,
  layers: Layers,
  play: Play,
  film: Film,
  image: ImageIcon,
  code: Code,
  settings: Settings,
};

export function ServiceList({
  heading,
  subheading,
  services = [],
  columns = 4,
  showLearnMore = true,
}: ServiceListProps) {
  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  if (!services.length) return null;

  return (
    <section className="py-24 bg-black border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            {subheading && (
              <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">
                {subheading}
              </h2>
            )}
            <h3 className="text-3xl md:text-4xl font-heading text-white">
              {heading}
            </h3>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${columnClasses[columns]} gap-8`}>
          {services.map((service, index) => {
            const IconComponent = service.icon ? iconMap[service.icon] : iconMap[Object.keys(iconMap)[index % Object.keys(iconMap).length]];

            return (
              <div
                key={service._key}
                className="group p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 bg-neutral-900/20"
              >
                <div className="mb-6 text-primary">
                  {IconComponent && <IconComponent size={32} strokeWidth={1} />}
                </div>
                <h4 className="text-xl font-heading text-white mb-3">
                  {service.title}
                </h4>
                {service.description && (
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 min-h-[60px]">
                    {service.description}
                  </p>
                )}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-center text-gray-400 text-sm font-mono"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {showLearnMore && (
                  <Link
                    to={service.link || '/services'}
                    className="text-xs font-mono uppercase tracking-wider text-white group-hover:text-primary flex items-center"
                  >
                    Learn More
                    <ArrowRight
                      size={12}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
