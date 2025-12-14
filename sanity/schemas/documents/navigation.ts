import { defineType, defineField, defineArrayMember } from 'sanity';
import { MenuIcon } from '@sanity/icons';

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
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
              description: 'Internal path (e.g., /portfolio) or external URL',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'children',
              title: 'Dropdown Items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'subNavItem',
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
          ],
          preview: {
            select: {
              title: 'label',
              link: 'link',
              children: 'children',
            },
            prepare({ title, link, children }) {
              const hasChildren = children && children.length > 0;
              return {
                title: title || 'Menu Item',
                subtitle: hasChildren ? `${link} (${children.length} sub-items)` : link,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text for the call-to-action button in the header',
      initialValue: 'Work With Us',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'Link for the call-to-action button',
      initialValue: '/contact',
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({ items }) {
      return {
        title: 'Main Navigation',
        subtitle: items ? `${items.length} menu items` : 'No items',
      };
    },
  },
});
