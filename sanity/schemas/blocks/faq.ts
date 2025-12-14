import { defineField, defineArrayMember } from 'sanity';
import { HelpCircleIcon } from '@sanity/icons';
import { createBlock } from './base';

export const faqBlock = createBlock({
  name: 'faqBlock',
  title: 'FAQ',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Accordion', value: 'accordion' },
          { title: 'Grid', value: 'grid' },
          { title: 'Two Columns', value: 'two-columns' },
        ],
      },
      initialValue: 'accordion',
    }),
    defineField({
      name: 'allowMultiple',
      title: 'Allow Multiple Open',
      type: 'boolean',
      description: 'Allow multiple FAQ items to be open at the same time',
      initialValue: false,
    }),
  ],
});
