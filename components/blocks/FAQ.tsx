'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  _key: string;
  question: string;
  answer: string;
}

interface FAQProps {
  heading?: string;
  items?: FAQItem[];
  layout?: 'accordion' | 'grid' | 'two-columns';
  allowMultiple?: boolean;
}

export function FAQ({
  heading,
  items = [],
  layout = 'accordion',
  allowMultiple = false,
}: FAQProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  if (!items.length) return null;

  const toggleItem = (key: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      );
    } else {
      setOpenItems((prev) => (prev.includes(key) ? [] : [key]));
    }
  };

  if (layout === 'accordion') {
    return (
      <section className="py-24 bg-neutral-950 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          {heading && (
            <h2 className="text-3xl font-heading text-white mb-12 text-center">
              {heading}
            </h2>
          )}
          <div className="space-y-4">
            {items.map((faq) => {
              const isOpen = openItems.includes(faq._key);
              return (
                <div
                  key={faq._key}
                  className="border border-white/10 bg-black/20"
                >
                  <button
                    onClick={() => toggleItem(faq._key)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <h3 className="text-lg font-heading text-white pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      size={20}
                      className={`text-primary shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <p className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Simple layout (grid/two-columns)
  const gridClasses = layout === 'two-columns' ? 'md:grid-cols-2' : 'grid-cols-1';

  return (
    <section className="py-24 bg-neutral-950 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        {heading && (
          <h2 className="text-3xl font-heading text-white mb-12 text-center">
            {heading}
          </h2>
        )}
        <div className={`grid ${gridClasses} gap-6`}>
          {items.map((faq) => (
            <div
              key={faq._key}
              className="border-b border-white/10 pb-6 last:border-0"
            >
              <h3 className="text-lg font-heading text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
