import { defineField, defineArrayMember } from 'sanity';
import { CreditCardIcon } from '@sanity/icons';
import { createBlock } from './base';

export const pricingBlock = createBlock({
  name: 'pricingBlock',
  title: 'Pricing',
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Plan Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'period',
              title: 'Billing Period',
              type: 'string',
              options: {
                list: [
                  { title: 'Monthly', value: 'month' },
                  { title: 'Yearly', value: 'year' },
                  { title: 'One-time', value: 'once' },
                ],
              },
              initialValue: 'month',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'text', title: 'Feature', type: 'string' }),
                    defineField({
                      name: 'included',
                      title: 'Included',
                      type: 'boolean',
                      initialValue: true,
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'cta',
              title: 'CTA Button',
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Button Label', type: 'string' }),
                defineField({ name: 'link', title: 'Button Link', type: 'url' }),
              ],
            }),
            defineField({
              name: 'highlighted',
              title: 'Highlight this plan',
              type: 'boolean',
              description: 'Make this plan stand out',
              initialValue: false,
            }),
            defineField({
              name: 'badge',
              title: 'Badge Text',
              type: 'string',
              description: 'e.g., "Most Popular", "Best Value"',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Cards', value: 'cards' },
          { title: 'Table', value: 'table' },
          { title: 'Minimal', value: 'minimal' },
        ],
      },
      initialValue: 'cards',
    }),
  ],
});
