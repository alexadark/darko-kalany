import React from 'react';
import { Check } from 'lucide-react';
import Button from '../ui/Button';

interface PricingBlockProps {
  block: {
    heading: string;
    subheading: string;
    tiers?: any[];
  }
}

const PricingBlock: React.FC<PricingBlockProps> = ({ block }) => {
  if (!block.tiers || block.tiers.length === 0) return null;

  return (
    <section className="py-24 bg-black border-t border-white/5">
       <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">
            {block.subheading}
          </h2>
          <h3 className="text-3xl md:text-5xl font-heading text-white max-w-2xl mx-auto">
            {block.heading}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {block.tiers.map((tier: any, index: number) => (
            <div 
              key={index} 
              className={`relative p-8 border flex flex-col transition-transform duration-300 hover:-translate-y-2 ${
                tier.isPopular 
                  ? 'border-primary bg-white/5 transform md:-translate-y-4' 
                  : 'border-white/10 bg-transparent'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black px-4 py-1 text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-heading text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-white tracking-tight">{tier.price}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed border-b border-white/10 pb-6 min-h-[80px]">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features && tier.features.map((feature: string, fIndex: number) => (
                  <li key={fIndex} className="flex items-start text-sm text-gray-300">
                    <Check size={16} className="text-primary mr-3 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                to="/contact" 
                variant={tier.isPopular ? 'primary' : 'outline'}
                className="w-full"
              >
                Choose Plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingBlock;