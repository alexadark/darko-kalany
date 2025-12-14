import { urlFor } from '@/sanity/lib/image';
import { Button } from '../ui/Button';

interface HeroProps {
  heading: string;
  subheading?: string;
  backgroundImage?: {
    asset?: { _ref: string };
    alt?: string;
  };
  videoUrl?: string;
  primaryCta?: {
    text?: string;
    link?: string;
  };
  secondaryCta?: {
    text?: string;
    link?: string;
  };
  alignment?: 'left' | 'center' | 'right';
  overlay?: boolean;
  height?: 'full' | 'large' | 'medium';
}

export function Hero({
  heading,
  subheading,
  backgroundImage,
  videoUrl,
  primaryCta,
  secondaryCta,
  alignment = 'center',
  overlay = true,
  height = 'full',
}: HeroProps) {
  const heightClasses = {
    full: 'min-h-screen',
    large: 'min-h-[80vh]',
    medium: 'min-h-[60vh]',
  };

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  const imageUrl = backgroundImage?.asset
    ? urlFor(backgroundImage).width(1920).height(1080).url()
    : 'https://picsum.photos/id/26/1920/1080';

  return (
    <section
      className={`relative w-full ${heightClasses[height]} flex items-center justify-center overflow-hidden`}
    >
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
          </video>
        ) : (
          <img
            src={imageUrl}
            alt={backgroundImage?.alt || 'Hero background'}
            className="w-full h-full object-cover"
          />
        )}
        {overlay && (
          <div className="absolute inset-0 bg-black/40 md:bg-black/20 backdrop-blur-[2px]" />
        )}
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 container mx-auto px-6 flex flex-col ${alignmentClasses[alignment]}`}
      >
        <h1 className="font-heading text-4xl md:text-7xl lg:text-8xl leading-tight tracking-tighter text-white mb-6 animate-fade-in-up">
          {heading}
        </h1>
        {subheading && (
          <p className="font-sans text-lg md:text-xl text-gray-200 max-w-2xl mb-10 font-light leading-relaxed">
            {subheading}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryCta?.text && primaryCta?.link && (
            <Button href={primaryCta.link} variant="primary">
              {primaryCta.text}
            </Button>
          )}
          {secondaryCta?.text && secondaryCta?.link && (
            <Button
              href={secondaryCta.link}
              variant="outline"
              className="!text-white !border-white"
            >
              {secondaryCta.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
