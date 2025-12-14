import { Check, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface PricingFeature {
  _key: string;
  text: string;
  included?: boolean;
}

interface PricingPlan {
  _key: string;
  name: string;
  description?: string;
  price: string;
  period?: 'month' | 'year' | 'once';
  features?: PricingFeature[];
  cta?: {
    label?: string;
    link?: string;
  };
  highlighted?: boolean;
  badge?: string;
}

interface PricingProps {
  heading?: string;
  subheading?: string;
  plans?: PricingPlan[];
  style?: 'cards' | 'table' | 'minimal';
}

export function Pricing({
  heading,
  subheading,
  plans = [],
  style = 'cards',
}: PricingProps) {
  if (!plans.length) return null;

  const periodLabels = {
    month: '/month',
    year: '/year',
    once: '',
  };

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
              <h3 className="text-3xl md:text-5xl font-heading text-white max-w-2xl mx-auto">
                {heading}
              </h3>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan._key}
              className={`relative p-8 border flex flex-col transition-transform duration-300 hover:-translate-y-2 ${
                plan.highlighted
                  ? 'border-primary bg-white/5 transform md:-translate-y-4'
                  : 'border-white/10 bg-transparent'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black px-4 py-1 text-xs font-bold uppercase tracking-widest">
                  {plan.badge}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-heading text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-white tracking-tight">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-400 text-sm ml-1">
                      {periodLabels[plan.period]}
                    </span>
                  )}
                </div>
                {plan.description && (
                  <p className="text-gray-400 text-sm leading-relaxed border-b border-white/10 pb-6 min-h-[80px]">
                    {plan.description}
                  </p>
                )}
              </div>

              {plan.features && plan.features.length > 0 && (
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li
                      key={feature._key}
                      className="flex items-start text-sm text-gray-300"
                    >
                      {feature.included !== false ? (
                        <Check
                          size={16}
                          className="text-primary mr-3 mt-0.5 shrink-0"
                        />
                      ) : (
                        <X
                          size={16}
                          className="text-gray-600 mr-3 mt-0.5 shrink-0"
                        />
                      )}
                      <span
                        className={
                          feature.included === false ? 'text-gray-600' : ''
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <Button
                href={plan.cta?.link || '/contact'}
                variant={plan.highlighted ? 'primary' : 'outline'}
                className="w-full"
              >
                {plan.cta?.label || 'Choose Plan'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
