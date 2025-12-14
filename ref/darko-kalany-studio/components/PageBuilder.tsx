import React from 'react';
import HeroBlock from './blocks/HeroBlock';
import ServiceListBlock from './blocks/ServiceListBlock';
import FeaturedProjectsBlock from './blocks/FeaturedProjectsBlock';
import GalleryBlock from './blocks/GalleryBlock';
import PricingBlock from './blocks/PricingBlock';
import FaqBlock from './blocks/FaqBlock';
import CtaBlock from './blocks/CtaBlock';

interface PageBuilderProps {
  blocks: any[];
}

const PageBuilder: React.FC<PageBuilderProps> = ({ blocks }) => {
  if (!blocks) return null;

  return (
    <div className="flex flex-col">
      {blocks.map((block) => {
        // The _key is essential for React list rendering performance
        const key = block._key || Math.random().toString();

        switch (block._type) {
          case 'heroBlock':
            return <HeroBlock key={key} block={block} />;
          
          case 'serviceListBlock':
            return <ServiceListBlock key={key} block={block} />;
          
          case 'featuredProjectsBlock':
            return <FeaturedProjectsBlock key={key} block={block} />;

          case 'galleryBlock':
            return <GalleryBlock key={key} block={block} />;

          case 'pricingBlock':
            return <PricingBlock key={key} block={block} />;

          case 'faqBlock':
            return <FaqBlock key={key} block={block} />;
          
          case 'ctaBlock':
            return <CtaBlock key={key} block={block} />;
            
          case 'contentBlock':
            // For simplicity, we render a simple placeholder for rich text blocks in this demo
            // In production, you would use <PortableText /> from @portabletext/react here
            return (
              <div key={key} className="container mx-auto px-6 py-12 text-gray-300">
                 Rich Text Content Block (Requires PortableText)
              </div>
            );

          default:
            return (
              <div key={key} className="py-12 text-center border border-red-900 bg-red-900/20 text-red-200">
                 Unknown Component Type: {block._type}
              </div>
            );
        }
      })}
    </div>
  );
};

export default PageBuilder;