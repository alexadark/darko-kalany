import React from 'react';
import { GalleryItem } from '../../types';
import { Play } from 'lucide-react';

interface MasonryGalleryProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
}

const MasonryGallery: React.FC<MasonryGalleryProps> = ({ items, onItemClick }) => {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="break-inside-avoid group cursor-pointer relative overflow-hidden"
          onClick={() => onItemClick(item)}
        >
          <img 
            src={item.src} 
            alt={item.title} 
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-heading text-xl tracking-wide">{item.title}</h3>
            {item.description && (
              <p className="text-gray-300 text-sm font-mono mt-1">{item.description}</p>
            )}
          </div>

          {/* Video Indicator */}
          {item.type === 'video' && (
            <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MasonryGallery;