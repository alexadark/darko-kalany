import React from 'react';

interface FaqBlockProps {
  block: {
    heading: string;
    faqs?: any[];
  }
}

const FaqBlock: React.FC<FaqBlockProps> = ({ block }) => {
  if (!block.faqs || block.faqs.length === 0) return null;

  return (
    <section className="py-24 bg-neutral-950 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-heading text-white mb-12 text-center">{block.heading}</h2>
        <div className="space-y-6">
          {block.faqs.map((faq: any, i: number) => (
            <div key={i} className="border-b border-white/10 pb-6 last:border-0">
              <h3 className="text-lg font-heading text-white mb-2">{faq.question}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqBlock;