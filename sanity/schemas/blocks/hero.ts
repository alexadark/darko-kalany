import { defineField } from 'sanity';
import { RocketIcon } from '@sanity/icons';
import { createBlock } from './base';

export const heroBlock = createBlock({
  name: 'heroBlock',
  title: 'Hero',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
      description: 'Supporting text below the heading',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Background Video URL',
      type: 'url',
      description: 'Optional video URL (MP4). Will override background image.',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Button Text', type: 'string' }),
        defineField({ name: 'link', title: 'Button Link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Button Text', type: 'string' }),
        defineField({ name: 'link', title: 'Button Link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'alignment',
      title: 'Content Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'overlay',
      title: 'Dark Overlay',
      type: 'boolean',
      description: 'Add a dark overlay on the background for better text readability',
      initialValue: true,
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'string',
      options: {
        list: [
          { title: 'Full Screen', value: 'full' },
          { title: 'Large (80vh)', value: 'large' },
          { title: 'Medium (60vh)', value: 'medium' },
        ],
      },
      initialValue: 'full',
    }),
  ],
});
