import { defineType, defineField, defineArrayMember } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({ type: 'heroBlock' }),
        defineArrayMember({ type: 'ctaBlock' }),
        defineArrayMember({ type: 'featureBlock' }),
        defineArrayMember({ type: 'serviceListBlock' }),
        defineArrayMember({ type: 'featuredProjectsBlock' }),
        defineArrayMember({ type: 'testimonialBlock' }),
        defineArrayMember({ type: 'pricingBlock' }),
        defineArrayMember({ type: 'faqBlock' }),
        defineArrayMember({ type: 'galleryBlock' }),
        defineArrayMember({ type: 'contactFormBlock' }),
      ],
      options: {
        insertMenu: {
          filter: true,
          groups: [
            { name: 'hero', title: 'Hero Sections', of: ['heroBlock'] },
            { name: 'conversion', title: 'Conversion', of: ['ctaBlock', 'pricingBlock', 'contactFormBlock'] },
            { name: 'content', title: 'Content', of: ['featureBlock', 'serviceListBlock', 'testimonialBlock', 'faqBlock'] },
            { name: 'portfolio', title: 'Portfolio', of: ['featuredProjectsBlock', 'galleryBlock'] },
          ],
        },
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: `/${slug || ''}`,
      };
    },
  },
});
