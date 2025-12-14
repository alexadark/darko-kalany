import { defineField, ObjectDefinition } from 'sanity';

export interface BlockConfig {
  name: string;
  title: string;
  description?: string;
  icon?: React.ComponentType;
  fields: ObjectDefinition['fields'];
  preview?: ObjectDefinition['preview'];
}

/**
 * Shared fields for all blocks
 */
export const sharedBlockFields = [
  defineField({
    name: 'sectionTitle',
    title: 'Section Title',
    type: 'string',
    description: 'Optional title for this section',
  }),
  defineField({
    name: 'sectionSubtitle',
    title: 'Section Subtitle',
    type: 'string',
    description: 'Optional subtitle for this section',
  }),
  defineField({
    name: 'spacing',
    title: 'Spacing',
    type: 'spacing',
    description: 'Control the vertical spacing',
  }),
  defineField({
    name: 'anchorId',
    title: 'Anchor ID',
    type: 'slug',
    description: 'For linking directly to this section (e.g., #features)',
  }),
];

/**
 * Create a block schema with shared fields
 */
export function createBlock(config: BlockConfig): ObjectDefinition {
  return {
    name: config.name,
    title: config.title,
    type: 'object',
    icon: config.icon,
    fields: [...sharedBlockFields, ...config.fields],
    preview: config.preview || {
      select: {
        title: 'sectionTitle',
        subtitle: 'sectionSubtitle',
      },
      prepare({ title, subtitle }) {
        return {
          title: title || config.title,
          subtitle: subtitle || `${config.title} Block`,
        };
      },
    },
  };
}
