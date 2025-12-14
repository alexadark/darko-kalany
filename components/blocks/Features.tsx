import { Link } from 'react-router';
import { ArrowRight, Rocket, Shield, Zap, Star, Heart, Globe, Target, Sparkles } from 'lucide-react';

interface Feature {
  _key: string;
  icon?: string;
  title: string;
  description?: string;
  link?: string;
}

interface FeaturesProps {
  heading?: string;
  subheading?: string;
  features?: Feature[];
  columns?: 2 | 3 | 4;
  style?: 'cards' | 'simple' | 'icons';
}

const iconMap: Record<string, React.ElementType> = {
  rocket: Rocket,
  shield: Shield,
  zap: Zap,
  star: Star,
  heart: Heart,
  globe: Globe,
  target: Target,
  sparkles: Sparkles,
};

export function Features({
  heading,
  subheading,
  features = [],
  columns = 3,
  style = 'cards',
}: FeaturesProps) {
  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  if (!features.length) return null;

  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        {(heading || subheading) && (
          <div className="text-center mb-16">
            {subheading && (
              <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">
                {subheading}
              </h2>
            )}
            {heading && (
              <h3 className="text-3xl md:text-4xl font-heading text-white">
                {heading}
              </h3>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 ${columnClasses[columns]} gap-8`}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon
              ? iconMap[feature.icon]
              : iconMap[Object.keys(iconMap)[index % Object.keys(iconMap).length]];

            if (style === 'simple') {
              return (
                <div key={feature._key} className="text-center">
                  <h4 className="text-xl font-heading text-white mb-3">
                    {feature.title}
                  </h4>
                  {feature.description && (
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  )}
                </div>
              );
            }

            return (
              <div
                key={feature._key}
                className={`group p-8 transition-all duration-300 ${
                  style === 'cards'
                    ? 'border border-white/10 hover:border-primary/50 bg-neutral-900/20'
                    : ''
                }`}
              >
                {IconComponent && (
                  <div className="mb-6 text-primary">
                    <IconComponent size={32} strokeWidth={1} />
                  </div>
                )}
                <h4 className="text-xl font-heading text-white mb-3">
                  {feature.title}
                </h4>
                {feature.description && (
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>
                )}
                {feature.link && (
                  <Link
                    to={feature.link}
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
