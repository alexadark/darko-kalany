'use client';

import { useState, useMemo } from 'react';
import { urlFor } from '@/sanity/lib/image';
import { Button } from '../ui/Button';
import { MasonryGallery, type GalleryItem } from '../ui/MasonryGallery';
import { Lightbox } from '../ui/Lightbox';

interface GalleryImage {
  _key: string;
  asset?: { _ref: string };
  alt?: string;
  title?: string;
  description?: string;
  category?: string;
}

interface GalleryProps {
  heading?: string;
  subheading?: string;
  images?: GalleryImage[];
  layout?: 'grid-2' | 'grid-3' | 'grid-4' | 'masonry' | 'carousel';
  enableLightbox?: boolean;
  enableFilters?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export function Gallery({
  heading,
  subheading,
  images = [],
  layout = 'masonry',
  enableLightbox = true,
  enableFilters = false,
  ctaText,
  ctaLink,
}: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Extract unique categories from images
  const categories = useMemo(() => {
    const cats = images
      .map((img) => img.category)
      .filter((cat): cat is string => Boolean(cat));
    return [...new Set(cats)];
  }, [images]);

  // Filter images based on active filter
  const filteredImages = useMemo(() => {
    if (activeFilter === 'all') return images;
    return images.filter((img) => img.category === activeFilter);
  }, [images, activeFilter]);

  if (!images.length) return null;

  const galleryItems: GalleryItem[] = filteredImages.map((image) => ({
    _key: image._key,
    src: image.asset ? urlFor(image).width(1200).height(800).url() : 'https://picsum.photos/1200/800',
    title: image.title,
    description: image.description,
    alt: image.alt,
    category: image.category,
  }));

  const handleItemClick = (_item: GalleryItem, index: number) => {
    if (enableLightbox) {
      setLightboxIndex(index);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const renderGrid = () => {
    const gridClasses = {
      'grid-2': 'md:grid-cols-2',
      'grid-3': 'md:grid-cols-2 lg:grid-cols-3',
      'grid-4': 'md:grid-cols-2 lg:grid-cols-4',
      masonry: '',
      carousel: '',
    };

    if (layout === 'masonry') {
      return (
        <MasonryGallery items={galleryItems} onItemClick={handleItemClick} />
      );
    }

    return (
      <div className={`grid grid-cols-1 ${gridClasses[layout]} gap-6`}>
        {galleryItems.map((item, index) => (
          <div
            key={item._key}
            className="group cursor-pointer relative overflow-hidden aspect-[4/3]"
            onClick={() => handleItemClick(item, index)}
          >
            <img
              src={item.src}
              alt={item.alt || item.title || 'Gallery image'}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
              {item.title && (
                <h3 className="text-white font-heading text-xl">{item.title}</h3>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        {(heading || subheading || (ctaText && ctaLink)) && (
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
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
            {ctaText && ctaLink && (
              <div className="hidden md:block">
                <Button href={ctaLink} variant="outline">
                  {ctaText}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Category Filters */}
        {enableFilters && categories.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2 font-mono text-sm uppercase tracking-wider transition-all duration-300 border ${
                activeFilter === 'all'
                  ? 'bg-primary text-black border-primary'
                  : 'bg-transparent text-gray-400 border-white/20 hover:border-primary hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 font-mono text-sm uppercase tracking-wider transition-all duration-300 border ${
                  activeFilter === category
                    ? 'bg-primary text-black border-primary'
                    : 'bg-transparent text-gray-400 border-white/20 hover:border-primary hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {renderGrid()}

        {ctaText && ctaLink && (
          <div className="mt-12 md:hidden text-center">
            <Button href={ctaLink} variant="outline">
              {ctaText}
            </Button>
          </div>
        )}
      </div>

      {lightboxIndex !== null && galleryItems[lightboxIndex] && (
        <Lightbox
          item={galleryItems[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={galleryItems.length > 1}
          hasPrev={galleryItems.length > 1}
        />
      )}
    </section>
  );
}
