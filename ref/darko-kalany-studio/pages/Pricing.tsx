import React from 'react';
import { PRICING_TIERS } from '../constants';
import Button from '../components/ui/Button';
import { Check } from 'lucide-react';

const PricingPage: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="pt-24 pb-16 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-heading text-white mb-6">Pricing</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
          Transparent pricing for projects of any scale. All packages include full commercial licensing.
        </p>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, index) => (
            <div 
              key={index} 
              className={`relative p-8 border flex flex-col ${
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
                  <span className="ml-2 text-gray-500 text-sm font-mono">/ project</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed border-b border-white/10 pb-6">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, fIndex) => (
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
                Choose {tier.name}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-heading text-white mb-4">Need a custom enterprise solution?</h3>
          <p className="text-gray-400 mb-8">
            For large-scale brand world-building, video campaigns exceeding 60s, or ongoing retainer work, please contact us directly.
          </p>
          <Button to="/contact" variant="white">Contact Sales</Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;