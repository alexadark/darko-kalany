import { defineField, defineArrayMember } from 'sanity';
import { ImagesIcon } from '@sanity/icons';
import { createBlock } from './base';

export const galleryBlock = createBlock({
  name: 'galleryBlock',
  title: 'Gallery',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      description: 'Small text above the heading',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Important for SEO and accessibility',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
            }),
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.min(1).error('Add at least one image'),
    }),
    defineField({
      name: 'layout',
      title: 'Gallery Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (2 columns)', value: 'grid-2' },
          { title: 'Grid (3 columns)', value: 'grid-3' },
          { title: 'Grid (4 columns)', value: 'grid-4' },
          { title: 'Masonry', value: 'masonry' },
          { title: 'Carousel', value: 'carousel' },
        ],
      },
      initialValue: 'grid-3',
    }),
    defineField({
      name: 'fullWidth',
      title: 'Full Width',
      type: 'boolean',
      description: 'Stretch gallery to full screen width',
      initialValue: false,
    }),
    defineField({
      name: 'imageGap',
      title: 'Image Gap',
      type: 'string',
      description: 'Space between images',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
        ],
      },
      initialValue: 'md',
    }),
    defineField({
      name: 'enableLightbox',
      title: 'Enable Lightbox',
      type: 'boolean',
      description: 'Allow images to open in a fullscreen lightbox',
      initialValue: true,
    }),
    defineField({
      name: 'showCaptions',
      title: 'Show Captions',
      type: 'boolean',
      description: 'Display image captions below each image',
      initialValue: false,
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Image Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: 'Original', value: 'original' },
          { title: 'Square (1:1)', value: '1:1' },
          { title: 'Landscape (16:9)', value: '16:9' },
          { title: 'Portrait (3:4)', value: '3:4' },
        ],
      },
      initialValue: 'original',
    }),
    defineField({
      name: 'enableFilters',
      title: 'Enable Category Filters',
      type: 'boolean',
      description: 'Show filter buttons based on image categories',
      initialValue: false,
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Optional button to view more',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
    }),
  ],
});
