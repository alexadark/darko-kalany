import React, { useEffect } from 'react';
import { GalleryItem } from '../../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({ 
  item, 
  onClose, 
  onNext, 
  onPrev,
  hasNext,
  hasPrev
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };

    if (item) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [item, onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2 transition-colors"
      >
        <X size={32} />
      </button>

      {hasPrev && (
        <button 
          onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
          className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-40 hidden md:block"
        >
          <ChevronLeft size={48} />
        </button>
      )}

      <div className="relative max-w-screen-xl max-h-screen p-4 md:p-12 w-full flex flex-col items-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {item.type === 'image' ? (
            <img 
              src={item.src} 
              alt={item.title} 
              className="max-h-[80vh] w-auto object-contain shadow-2xl" 
            />
          ) : (
            // Placeholder for video player
            <div className="aspect-video w-full max-w-5xl bg-black flex items-center justify-center border border-white/10">
              <p className="text-white/50 font-mono">[ Video Player Placeholder for {item.src} ]</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-heading text-white">{item.title}</h3>
          <p className="text-gray-400 font-mono mt-2 text-sm uppercase tracking-widest">
            {item.description || 'AI Generated Content'}
          </p>
        </div>
      </div>

      {hasNext && (
        <button 
          onClick={(e) => { e.stopPropagation(); onNext?.(); }}
          className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-40 hidden md:block"
        >
          <ChevronRight size={48} />
        </button>
      )}
    </div>
  );
};

export default Lightbox;