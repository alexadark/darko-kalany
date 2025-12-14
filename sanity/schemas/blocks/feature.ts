import { defineField, defineArrayMember } from 'sanity';
import { ThLargeIcon } from '@sanity/icons';
import { createBlock } from './base';

export const featureBlock = createBlock({
  name: 'featureBlock',
  title: 'Features',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name (e.g., "rocket", "shield", "zap")',
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
              name: 'link',
              title: 'Link',
              type: 'url',
              description: 'Optional link for this feature',
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
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [2, 3, 4],
      },
      initialValue: 3,
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Cards', value: 'cards' },
          { title: 'Simple', value: 'simple' },
          { title: 'With Icons', value: 'icons' },
        ],
      },
      initialValue: 'cards',
    }),
  ],
});
