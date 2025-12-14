import { defineField, defineArrayMember } from 'sanity';
import { ComponentIcon } from '@sanity/icons';
import { createBlock } from './base';

export const serviceListBlock = createBlock({
  name: 'serviceListBlock',
  title: 'Service List',
  icon: ComponentIcon,
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
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Box', value: 'box' },
                  { title: 'Camera', value: 'camera' },
                  { title: 'Layers', value: 'layers' },
                  { title: 'Play', value: 'play' },
                  { title: 'Film', value: 'film' },
                  { title: 'Image', value: 'image' },
                  { title: 'Code', value: 'code' },
                  { title: 'Settings', value: 'settings' },
                ],
              },
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(8),
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [2, 3, 4],
      },
      initialValue: 4,
    }),
    defineField({
      name: 'showLearnMore',
      title: 'Show "Learn More" Link',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
