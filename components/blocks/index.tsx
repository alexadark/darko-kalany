import { Hero } from './Hero';
import { CTA } from './CTA';
import { Features } from './Features';
import { Testimonials } from './Testimonials';
import { Pricing } from './Pricing';
import { FAQ } from './FAQ';
import { Gallery } from './Gallery';
import { ServiceList } from './ServiceList';
import { FeaturedProjects } from './FeaturedProjects';
import { ContactForm } from './ContactForm';
import { Section } from '../shared/Section';

const blockComponents: Record<string, React.ComponentType<any>> = {
  heroBlock: Hero,
  ctaBlock: CTA,
  featureBlock: Features,
  testimonialBlock: Testimonials,
  pricingBlock: Pricing,
  faqBlock: FAQ,
  galleryBlock: Gallery,
  serviceListBlock: ServiceList,
  featuredProjectsBlock: FeaturedProjects,
  contactFormBlock: ContactForm,
};

interface BlockRendererProps {
  blocks?: any[];
  documentId?: string;
}

// Blocks that should not be wrapped in Section (full-screen blocks)
const fullScreenBlocks = ['heroBlock'];

export function BlockRenderer({ blocks, documentId }: BlockRendererProps) {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block) => {
        const Component = blockComponents[block._type];

        if (!Component) {
          console.warn(`Unknown block type: ${block._type}`);
          return null;
        }

        // Full-screen blocks render without Section wrapper
        if (fullScreenBlocks.includes(block._type)) {
          return <Component key={block._key} {...block} documentId={documentId} />;
        }

        return (
          <Section
            key={block._key}
            spacing={block.spacing}
            title={block.sectionTitle}
            subtitle={block.sectionSubtitle}
            anchorId={block.anchorId?.current}
          >
            <Component {...block} documentId={documentId} />
          </Section>
        );
      })}
    </>
  );
}

export { Hero, CTA, Features, Testimonials, Pricing, FAQ, Gallery, ServiceList, FeaturedProjects, ContactForm };
