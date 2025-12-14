import { defineType, defineField } from 'sanity';

export const spacingType = defineType({
  name: 'spacing',
  title: 'Spacing',
  type: 'object',
  fields: [
    defineField({
      name: 'top',
      title: 'Top Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra Large', value: 'xl' },
        ],
      },
      initialValue: 'md',
    }),
    defineField({
      name: 'bottom',
      title: 'Bottom Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Small', value: 'sm' },
          { title: 'Medium', value: 'md' },
          { title: 'Large', value: 'lg' },
          { title: 'Extra Large', value: 'xl' },
        ],
      },
      initialValue: 'md',
    }),
  ],
});
