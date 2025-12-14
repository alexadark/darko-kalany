import React, { useState } from 'react';
import MasonryGallery from '../ui/MasonryGallery';
import Lightbox from '../ui/Lightbox';
import { GalleryItem } from '../../types';
import Button from '../ui/Button';

interface GalleryBlockProps {
  block: {
    heading: string;
    subheading: string;
    images?: any[];
  }
}

const GalleryBlock: React.FC<GalleryBlockProps> = ({ block }) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // If no items are selected in CMS, we won't render anything or could render fallback
  if (!block.images || block.images.length === 0) return null;

  const galleryItems: GalleryItem[] = block.images.map((item: any) => ({
    id: item._key || Math.random().toString(),
    type: 'image', // Inline images are always images
    src: item.src || 'https://picsum.photos/1200/800',
    title: item.title || 'Untitled',
    description: item.description,
    aspectRatio: item.aspectRatio || 'landscape',
    category: item.category || 'all'
  }));

  const handleItemClick = (item: GalleryItem) => {
    const index = galleryItems.findIndex(i => i.id === item.id);
    setLightboxIndex(index);
    setSelectedItem(item);
  };

  const handleNext = () => {
    const nextIndex = (lightboxIndex + 1) % galleryItems.length;
    setLightboxIndex(nextIndex);
    setSelectedItem(galleryItems[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (lightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    setLightboxIndex(prevIndex);
    setSelectedItem(galleryItems[prevIndex]);
  };

  return (
    <section className="py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">
              {block.subheading}
            </h2>
            <h3 className="text-3xl md:text-4xl font-heading text-white">
              {block.heading}
            </h3>
          </div>
          <div className="hidden md:block">
            <Button to="/portfolio" variant="outline">View Full Portfolio</Button>
          </div>
        </div>

        <MasonryGallery items={galleryItems} onItemClick={handleItemClick} />

        <div className="mt-12 md:hidden text-center">
             <Button to="/portfolio" variant="outline">View Full Portfolio</Button>
        </div>
      </div>

       {selectedItem && (
        <Lightbox 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={galleryItems.length > 1}
          hasPrev={galleryItems.length > 1}
        />
      )}
    </section>
  );
};

export default GalleryBlock;