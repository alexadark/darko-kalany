import { cn, getYouTubeVideoId } from '~/lib/utils';
import { urlFor } from '@/sanity/lib/image';

interface HeroProps {
  heading: string;
  subheading?: string;
  mediaType?: 'image' | 'video' | 'youtube';
  backgroundImage?: {
    asset?: { _ref: string };
    alt?: string;
  };
  backgroundVideo?: {
    asset?: {
      _ref: string;
      url?: string;
    };
  };
  youtubeUrl?: string;
  videoPoster?: {
    asset?: { _ref: string };
  };
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
  mediaType = 'image',
  backgroundImage,
  backgroundVideo,
  youtubeUrl,
  videoPoster,
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
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  const youtubeVideoId = youtubeUrl ? getYouTubeVideoId(youtubeUrl) : null;
  const posterUrl = videoPoster?.asset ? urlFor(videoPoster).url() : undefined;

  return (
    <section
      className={cn(
        'relative flex flex-col justify-center overflow-hidden',
        heightClasses[height]
      )}
    >
      {/* Background Media */}
      <div className="absolute inset-0">
        {/* Image Background */}
        {mediaType === 'image' && backgroundImage?.asset && (
          <img
            src={urlFor(backgroundImage).width(1920).quality(85).url()}
            alt={backgroundImage.alt || ''}
            className="h-full w-full object-cover"
          />
        )}

        {/* Uploaded Video Background */}
        {mediaType === 'video' && backgroundVideo?.asset?.url && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={posterUrl}
            className="h-full w-full object-cover"
          >
            <source src={backgroundVideo.asset.url} type="video/mp4" />
          </video>
        )}

        {/* YouTube Video Background */}
        {mediaType === 'youtube' && youtubeVideoId && (
          <>
            {/* Poster image fallback while YouTube loads */}
            {posterUrl && (
              <img
                src={posterUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playsinline=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                title="Background video"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] min-w-[100vw] -translate-x-1/2 -translate-y-1/2"
                style={{
                  aspectRatio: '16/9',
                  minHeight: '100vh',
                }}
              />
            </div>
          </>
        )}

        {/* Overlay */}
        {overlay && (
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          'relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 py-20 sm:px-6 lg:px-8',
          alignmentClasses[alignment]
        )}
      >
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {heading}
        </h1>

        {subheading && (
          <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl md:text-2xl">
            {subheading}
          </p>
        )}

        {/* CTAs */}
        {(primaryCta?.text || secondaryCta?.text) && (
          <div
            className={cn(
              'mt-10 flex flex-wrap gap-4',
              alignment === 'center' && 'justify-center',
              alignment === 'right' && 'justify-end'
            )}
          >
            {primaryCta?.text && primaryCta?.link && (
              <a
                href={primaryCta.link}
                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition hover:bg-gray-100"
              >
                {primaryCta.text}
              </a>
            )}
            {secondaryCta?.text && secondaryCta?.link && (
              <a
                href={secondaryCta.link}
                className="inline-flex items-center justify-center rounded-md border-2 border-white px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                {secondaryCta.text}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
