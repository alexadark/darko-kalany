import React from 'react';
import Button from '../ui/Button';

interface CtaBlockProps {
  block: {
    heading: string;
    text: string;
    buttonText: string;
    buttonLink: string;
  }
}

const CtaBlock: React.FC<CtaBlockProps> = ({ block }) => {
  return (
    <section className="py-32 bg-black text-center border-t border-white/5">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-heading text-white mb-8">
          {block.heading}
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 font-light">
          {block.text}
        </p>
        <Button 
          to={block.buttonLink} 
          variant="primary" 
          className="scale-110 hover:scale-115 transition-transform"
        >
          {block.buttonText}
        </Button>
      </div>
    </section>
  );
};

export default CtaBlock;
