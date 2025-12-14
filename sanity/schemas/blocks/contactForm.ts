import { defineField, defineArrayMember } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons';
import { createBlock } from './base';

export const contactFormBlock = createBlock({
  name: 'contactFormBlock',
  title: 'Contact Form',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Contact',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      description: 'Email address to display and use for form submissions',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'projectTypes',
      title: 'Project Types',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      initialValue: ['Real Estate', 'Fashion', 'Brand Film', 'Concept Art', 'Other'],
    }),
    defineField({
      name: 'budgetRanges',
      title: 'Budget Ranges',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      initialValue: ['$2.5k - $5k', '$5k - $10k', '$10k - $25k', '$25k+'],
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Send Inquiry',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      email: 'email',
    },
    prepare({ title, email }) {
      return {
        title: title || 'Contact Form',
        subtitle: email || 'Contact form section',
      };
    },
  },
});
