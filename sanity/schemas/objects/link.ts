import { defineType, defineField } from 'sanity';

export const linkType = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internal',
      title: 'Internal Link',
      type: 'reference',
      to: [{ type: 'page' }, { type: 'post' }, { type: 'project' }],
      hidden: ({ parent }) => parent?.type !== 'internal',
    }),
    defineField({
      name: 'external',
      title: 'External URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
      hidden: ({ parent }) => parent?.type !== 'external',
    }),
    defineField({
      name: 'blank',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
