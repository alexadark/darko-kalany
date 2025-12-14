import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Quote } from 'lucide-react';

interface Testimonial {
  _key: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  image?: {
    asset?: { _ref: string };
    alt?: string;
  };
}

interface TestimonialsProps {
  heading?: string;
  subheading?: string;
  testimonials?: Testimonial[];
  layout?: 'grid' | 'carousel' | 'single';
}

export function Testimonials({
  heading,
  subheading,
  testimonials = [],
  layout = 'grid',
}: TestimonialsProps) {
  if (!testimonials.length) return null;

  return (
    <section className="py-24 bg-neutral-950 border-t border-white/5">
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

        <div
          className={`grid gap-8 ${
            layout === 'single'
              ? 'max-w-3xl mx-auto'
              : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {testimonials.map((testimonial) => {
            const imageUrl = testimonial.image?.asset
              ? urlFor(testimonial.image).width(100).height(100).url()
              : null;

            return (
              <div
                key={testimonial._key}
                className="p-8 border border-white/10 bg-black/20 relative"
              >
                <Quote
                  size={40}
                  className="text-primary/20 absolute top-6 right-6"
                />
                <blockquote className="text-lg text-gray-300 leading-relaxed mb-8 font-light italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  {imageUrl && (
                    <div className="w-12 h-12 rounded-full overflow-hidden grayscale">
                      <Image
                        src={imageUrl}
                        alt={testimonial.image?.alt || testimonial.author}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-white font-heading">{testimonial.author}</p>
                    {(testimonial.role || testimonial.company) && (
                      <p className="text-gray-500 text-sm font-mono">
                        {testimonial.role}
                        {testimonial.role && testimonial.company && ', '}
                        {testimonial.company}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
