import React, { useEffect, useState } from 'react';
import PageBuilder from '../components/PageBuilder';
import { client, isSanityConfigured } from '../lib/sanity';
import { PAGE_QUERY } from '../lib/queries';

// Define the fallback (hardcoded) layout for when Sanity is not connected
const FALLBACK_BLOCKS = [
  {
    _key: '1',
    _type: 'heroBlock',
    heading: 'Hyper-Real AI Photography & Film',
    subheading: 'Darko Kalany Studio crafts cinematic images and motion that look more real than reality. Defining the future of luxury advertising.',
    primaryCtaText: 'View Portfolio',
    primaryCtaLink: '/portfolio',
    secondaryCtaText: 'Book a Project',
    secondaryCtaLink: '/contact'
  },
  {
    _key: '2',
    _type: 'serviceListBlock',
    heading: 'Services tailored for visionaries',
    subheading: 'What We Do'
  },
  {
    _key: '3',
    _type: 'featuredProjectsBlock',
    heading: 'Recent case studies',
    subheading: 'Selected Works'
  },
  {
    _key: '4',
    _type: 'ctaBlock',
    heading: 'Ready to defy reality?',
    text: 'We take on a limited number of high-end commissions per quarter. Secure your production slot today.',
    buttonText: 'Start a Project',
    buttonLink: '/contact'
  }
];

const HomePage: React.FC = () => {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      if (!isSanityConfigured()) {
        setBlocks(FALLBACK_BLOCKS);
        setLoading(false);
        return;
      }

      try {
        // We use PAGE_QUERY from lib/queries.ts which is optimized for the builder
        const data = await client.fetch(PAGE_QUERY, { slug: '/' });
        
        if (data && data.pageBuilder) {
          setBlocks(data.pageBuilder);
        } else {
          // Fallback if page document exists but has no blocks, or if document is missing
          setBlocks(FALLBACK_BLOCKS);
        }
      } catch (error) {
        console.error("Error fetching home page:", error);
        setBlocks(FALLBACK_BLOCKS);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  if (loading) {
     return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">Loading Experience...</div>;
  }

  return <PageBuilder blocks={blocks} />;
};

export default HomePage;
