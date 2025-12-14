import React from 'react';
import Button from '../ui/Button';

interface HeroProps {
  title: string;
  subtitle: string;
  image?: string;
  videoUrl?: string;
  primaryCta?: { text: string; link: string };
  secondaryCta?: { text: string; link: string };
  heightClass?: string;
  overlay?: boolean;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  image, 
  videoUrl, 
  primaryCta, 
  secondaryCta,
  heightClass = "min-h-screen",
  overlay = true
}) => {
  return (
    <section className={`relative w-full ${heightClass} flex items-center justify-center overflow-hidden`}>
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {videoUrl ? (
           <video 
             autoPlay 
             loop 
             muted 
             playsInline 
             className="w-full h-full object-cover"
           >
             <source src={videoUrl} type="video/mp4" />
             {/* Fallback image if video fails */}
             {image && <img src={image} alt="Hero Background" className="w-full h-full object-cover" />}
           </video>
        ) : (
          <img src={image} alt="Hero Background" className="w-full h-full object-cover" />
        )}
        {overlay && <div className="absolute inset-0 bg-black/40 md:bg-black/20 backdrop-blur-[2px]" />}
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="font-heading text-4xl md:text-7xl lg:text-8xl leading-tight tracking-tighter text-white mb-6 animate-fade-in-up">
          {title}
        </h1>
        <p className="font-sans text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryCta && (
            <Button to={primaryCta.link} variant="primary">
              {primaryCta.text}
            </Button>
          )}
          {secondaryCta && (
            <Button to={secondaryCta.link} variant="outline" className="!text-white !border-white">
              {secondaryCta.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;