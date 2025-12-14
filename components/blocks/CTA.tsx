import { Button } from '../ui/Button';

interface CTAProps {
  heading: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonStyle?: 'primary' | 'outline' | 'white';
  alignment?: 'left' | 'center';
}

export function CTA({
  heading,
  text,
  buttonText,
  buttonLink,
  buttonStyle = 'primary',
  alignment = 'center',
}: CTAProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
  };

  return (
    <section className="py-32 bg-black border-t border-white/5">
      <div className={`container mx-auto px-6 ${alignmentClasses[alignment]}`}>
        <h2 className="text-4xl md:text-6xl font-heading text-white mb-8">
          {heading}
        </h2>
        {text && (
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 font-light">
            {text}
          </p>
        )}
        {buttonText && buttonLink && (
          <Button
            href={buttonLink}
            variant={buttonStyle}
            className="scale-110 hover:scale-115 transition-transform"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </section>
  );
}
