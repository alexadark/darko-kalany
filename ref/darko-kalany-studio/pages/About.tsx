import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-6 pt-12 pb-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 relative">
             <div className="aspect-[3/4] overflow-hidden">
               <img src="https://picsum.photos/id/338/800/1200" alt="Darko Kalany" className="w-full h-full object-cover grayscale opacity-90" />
             </div>
             <div className="absolute bottom-8 left-8 md:-right-8 md:left-auto bg-primary p-6 max-w-xs">
                <p className="text-black font-mono text-sm uppercase leading-relaxed font-bold">
                  "AI is not a replacement for the photographer's eye. It is the lens through which we dream."
                </p>
             </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h1 className="text-5xl md:text-7xl font-heading text-white mb-8 leading-none">
              Darko<br /><span className="text-gray-600">Kalany.</span>
            </h1>
            
            <div className="space-y-8 text-gray-300 text-lg font-light leading-relaxed">
              <p>
                Darko Kalany Studio was founded on a singular premise: reality is no longer the limit. As a former architectural photographer and art director for luxury fashion houses, Darko saw the limitations of physical production—budget constraints, physics, and logistics.
              </p>
              <p>
                Transitioning fully to AI-generative workflows in 2023, the studio now produces hyper-realistic imagery that retains the emotional weight and cinematic composition of traditional photography, but with infinite creative freedom.
              </p>
              <p>
                We don't just prompt. We curate, composite, and craft. Every image is the result of hundreds of iterations and expert post-production, ensuring that the "AI look" is replaced by a signature editorial style.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <h4 className="text-white font-heading text-xl mb-1">250+</h4>
                <p className="text-gray-500 text-sm font-mono uppercase">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-white font-heading text-xl mb-1">Global</h4>
                <p className="text-gray-500 text-sm font-mono uppercase">Client Base</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;