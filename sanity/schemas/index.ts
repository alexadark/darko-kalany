// Objects
import { spacingType, seoType, richTextType, linkType } from './objects';

// Blocks
import {
  heroBlock,
  ctaBlock,
  featureBlock,
  testimonialBlock,
  pricingBlock,
  faqBlock,
  galleryBlock,
  serviceListBlock,
  featuredProjectsBlock,
} from './blocks';

// Documents
import { pageType, postType, projectType } from './documents';

// Taxonomies
import { categoryType, tagType } from './taxonomies';

export const schemaTypes = [
  // Objects (must be defined first)
  spacingType,
  seoType,
  richTextType,
  linkType,

  // Blocks
  heroBlock,
  ctaBlock,
  featureBlock,
  testimonialBlock,
  pricingBlock,
  faqBlock,
  galleryBlock,
  serviceListBlock,
  featuredProjectsBlock,

  // Taxonomies
  categoryType,
  tagType,

  // Documents
  pageType,
  postType,
  projectType,
];
