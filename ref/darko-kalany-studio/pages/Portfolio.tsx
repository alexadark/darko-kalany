import React, { useState } from 'react';
import { CATEGORIES, GALLERY_ITEMS } from '../constants';
import MasonryGallery from '../components/ui/MasonryGallery';
import Lightbox from '../components/ui/Lightbox';
import { GalleryItem } from '../types';

const PortfolioPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filteredItems = activeCategory === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const handleItemClick = (item: GalleryItem) => {
    const index = filteredItems.findIndex(i => i.id === item.id);
    setLightboxIndex(index);
    setSelectedItem(item);
  };

  const handleNext = () => {
    const nextIndex = (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(nextIndex);
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxIndex(prevIndex);
    setSelectedItem(filteredItems[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="pt-24 pb-16 container mx-auto px-6 border-b border-white/10">
        <h1 className="text-5xl md:text-7xl font-heading text-white mb-6">Portfolio</h1>
        <p className="text-gray-400 max-w-xl text-lg font-light">
          A curated selection of AI-generated imagery and motion design across architecture, fashion, and conceptual art.
        </p>
      </div>

      {/* Filters */}
      <div className="sticky top-[64px] z-30 bg-black/95 backdrop-blur-md border-b border-white/10 py-4 transition-all">
        <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex space-x-8 min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-sm font-mono uppercase tracking-wider transition-colors ${
                  activeCategory === cat.id ? 'text-primary border-b border-primary pb-1' : 'text-gray-500 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="container mx-auto px-6 py-12">
        <MasonryGallery items={filteredItems} onItemClick={handleItemClick} />
        {filteredItems.length === 0 && (
            <div className="text-center py-24">
                <p className="text-gray-500 font-mono">No projects found in this category.</p>
            </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <Lightbox 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={filteredItems.length > 1}
          hasPrev={filteredItems.length > 1}
        />
      )}

      {/* CTA */}
      <div className="py-24 text-center border-t border-white/10">
        <p className="text-gray-400 mb-6 font-mono text-sm uppercase">Looking for custom work?</p>
        <a href="/contact" className="text-3xl font-heading text-white hover:text-primary underline decoration-1 underline-offset-8 transition-all">
          Discuss a commission
        </a>
      </div>
    </div>
  );
};

export default PortfolioPage;