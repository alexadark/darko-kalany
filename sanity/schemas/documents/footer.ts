import { defineType, defineField, defineArrayMember } from 'sanity';
import { BlockElementIcon } from '@sanity/icons';

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: BlockElementIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'links', title: 'Links' },
    { name: 'legal', title: 'Legal' },
  ],
  fields: [
    // Content
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'Short description shown under the logo',
    }),

    // Links - Menu Column
    defineField({
      name: 'menuLinks',
      title: 'Menu Links (Column 1)',
      type: 'array',
      group: 'links',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'link' },
          },
        }),
      ],
    }),

    // Links - Studio Column
    defineField({
      name: 'studioLinks',
      title: 'Studio Links (Column 2)',
      type: 'array',
      group: 'links',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'link' },
          },
        }),
      ],
    }),

    // Legal
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      group: 'legal',
      description: 'Use {year} to insert the current year dynamically',
      initialValue: '© {year} Darko Kalany Studio. All rights reserved.',
    }),
    defineField({
      name: 'designCredit',
      title: 'Design Credit',
      type: 'string',
      group: 'legal',
      initialValue: 'Designed by System',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
        subtitle: 'Site footer configuration',
      };
    },
  },
});
