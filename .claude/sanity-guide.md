# Guide: Création de Schemas Sanity

## Types de Schemas

### 1. Documents (sanity/schemas/documents/)
Entités principales avec leur propre page dans le Studio.

```typescript
import { defineType, defineField } from 'sanity';

export const pageSchema = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        { type: 'heroBlock' },
        { type: 'ctaBlock' },
        // ... autres blocs
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
});
```

### 2. Objects (sanity/schemas/objects/)
Types réutilisables, pas de page propre.

```typescript
export const seoSchema = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
    }),
  ],
});
```

### 3. Blocks (sanity/schemas/blocks/)
Objects utilisés dans les page builders.

Structure OBLIGATOIRE:
```typescript
export const heroBlockSchema = defineType({
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  fields: [
    // CHAMPS PARTAGÉS (obligatoires)
    defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string' }),
    defineField({ name: 'sectionSubtitle', title: 'Section Subtitle', type: 'string' }),
    defineField({ name: 'spacing', title: 'Spacing', type: 'spacing' }),
    defineField({ name: 'anchorId', title: 'Anchor ID', type: 'slug' }),

    // CHAMPS SPÉCIFIQUES
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'text' }),
    defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image' }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        { name: 'text', title: 'Text', type: 'string' },
        { name: 'url', title: 'URL', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'headline',
      media: 'backgroundImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hero',
        subtitle,
        media,
      };
    },
  },
});
```

## Types de Champs Courants

- `string` - Texte court
- `text` - Texte long (textarea)
- `number` - Nombre
- `boolean` - Checkbox
- `date` / `datetime` - Dates
- `slug` - URL-friendly string
- `image` - Upload d'image
- `file` - Upload de fichier
- `url` - URL externe
- `reference` - Référence à un autre document
- `array` - Liste d'éléments
- `object` - Objet imbriqué
- `portableText` / `blockContent` - Rich text

## Validation

```typescript
defineField({
  name: 'email',
  type: 'string',
  validation: (Rule) => Rule.required().email(),
}),
defineField({
  name: 'age',
  type: 'number',
  validation: (Rule) => Rule.min(0).max(120),
}),
defineField({
  name: 'tags',
  type: 'array',
  of: [{ type: 'string' }],
  validation: (Rule) => Rule.unique().max(5),
}),
```

## Références

```typescript
// Référence simple
defineField({
  name: 'author',
  type: 'reference',
  to: [{ type: 'author' }],
}),

// Array de références
defineField({
  name: 'categories',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'category' }] }],
}),
```
