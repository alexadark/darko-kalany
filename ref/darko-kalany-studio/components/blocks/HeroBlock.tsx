import React from 'react';
import Hero from '../content/Hero';

interface HeroBlockProps {
  block: {
    heading: string;
    subheading: string;
    backgroundImage?: {
      url?: string;
    };
    primaryCtaText?: string;
    primaryCtaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
  }
}

const HeroBlock: React.FC<HeroBlockProps> = ({ block }) => {
  return (
    <Hero
      title={block.heading}
      subtitle={block.subheading}
      image={block.backgroundImage?.url || 'https://picsum.photos/id/26/1920/1080'} 
      primaryCta={
        block.primaryCtaText && block.primaryCtaLink 
          ? { text: block.primaryCtaText, link: block.primaryCtaLink } 
          : undefined
      }
      secondaryCta={
        block.secondaryCtaText && block.secondaryCtaLink 
          ? { text: block.secondaryCtaText, link: block.secondaryCtaLink } 
          : undefined
      }
    />
  );
};

export default HeroBlock;
