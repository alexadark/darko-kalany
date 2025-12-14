import { defineField, defineArrayMember } from 'sanity';
import { ProjectsIcon } from '@sanity/icons';
import { createBlock } from './base';

export const featuredProjectsBlock = createBlock({
  name: 'featuredProjectsBlock',
  title: 'Featured Projects',
  icon: ProjectsIcon,
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
      type: 'string',
      description: 'Small text above the heading',
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
      description: 'Select projects to feature. Leave empty to show latest projects automatically.',
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: 'limit',
      title: 'Number of Projects',
      type: 'number',
      description: 'How many projects to show (if not manually selected)',
      initialValue: 4,
      validation: (Rule) => Rule.min(2).max(8),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (2 columns)', value: 'grid-2' },
          { title: 'Grid (3 columns)', value: 'grid-3' },
          { title: 'Featured + Grid', value: 'featured' },
        ],
      },
      initialValue: 'grid-2',
    }),
    defineField({
      name: 'showCategory',
      title: 'Show Category',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showYear',
      title: 'Show Year',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text for the "View All" button',
      initialValue: 'View All Projects',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/projects',
    }),
  ],
});
