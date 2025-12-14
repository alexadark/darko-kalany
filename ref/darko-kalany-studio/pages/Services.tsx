import React from 'react';
import { SERVICES_DATA } from '../constants';
import Button from '../components/ui/Button';
import { Check } from 'lucide-react';

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="pt-24 pb-16 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-heading text-white mb-6">Services</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
          We combine artistic direction with state-of-the-art generative AI to produce visuals that were previously impossible or cost-prohibitive.
        </p>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-24">
        {SERVICES_DATA.map((service, index) => (
          <div key={service.id} className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <div className="w-full lg:w-1/2">
               <img 
                 src={`https://picsum.photos/seed/${service.id}/800/600`} 
                 alt={service.title} 
                 className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border border-white/5"
               />
            </div>
            <div className="w-full lg:w-1/2">
              <span className="text-primary font-mono text-xs uppercase tracking-widest mb-2 block">Service 0{index + 1}</span>
              <h2 className="text-3xl md:text-4xl font-heading text-white mb-6">{service.title}</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">{service.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {service.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center text-gray-400 text-sm font-mono">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                    {feature}
                  </div>
                ))}
              </div>
              
              <Button to="/contact" variant="outline">Request Quote</Button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section Placeholder */}
      <div className="py-24 bg-neutral-950 mt-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-heading text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How does AI compare to traditional photography?", a: "AI allows for limitless creativity without logistical constraints like travel, weather, or set construction. It is often faster and more cost-effective for high-concept ideas." },
              { q: "Do I own the copyright?", a: "Yes. For all commercial tiers, we transfer full usage rights to you upon final delivery." },
              { q: "What is the typical turnaround time?", a: "Most projects are delivered within 7-14 days, depending on complexity and the number of assets required." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/10 pb-6">
                <h3 className="text-lg font-heading text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;