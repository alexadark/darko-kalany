import { defineField, defineArrayMember } from 'sanity';
import { UsersIcon } from '@sanity/icons';
import { createBlock } from './base';

export const testimonialBlock = createBlock({
  name: 'testimonialBlock',
  title: 'Testimonials',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'author',
              title: 'Author Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role / Company',
              type: 'string',
            }),
            defineField({
              name: 'avatar',
              title: 'Avatar',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
              options: {
                list: [1, 2, 3, 4, 5],
              },
            }),
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'role',
              media: 'avatar',
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
          { title: 'Grid', value: 'grid' },
          { title: 'Carousel', value: 'carousel' },
          { title: 'Single', value: 'single' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'showRating',
      title: 'Show Rating',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
