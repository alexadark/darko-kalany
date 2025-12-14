'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from './MasonryGallery';

interface LightboxProps {
  item: GalleryItem;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export function Lightbox({
  item,
  onClose,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
    },
    [onClose, onNext, onPrev, hasNext, hasPrev]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X size={32} />
      </button>

      {/* Previous Button */}
      {hasPrev && onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-white transition-colors p-2"
          aria-label="Previous image"
        >
          <ChevronLeft size={48} />
        </button>
      )}

      {/* Next Button */}
      {hasNext && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-white transition-colors p-2"
          aria-label="Next image"
        >
          <ChevronRight size={48} />
        </button>
      )}

      {/* Image Container */}
      <div
        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.src}
          alt={item.alt || item.title || 'Lightbox image'}
          width={1920}
          height={1080}
          className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
        />

        {/* Caption */}
        {(item.title || item.description) && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            {item.title && (
              <h3 className="text-white font-heading text-2xl mb-1">
                {item.title}
              </h3>
            )}
            {item.description && (
              <p className="text-gray-300 text-sm font-mono">{item.description}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
