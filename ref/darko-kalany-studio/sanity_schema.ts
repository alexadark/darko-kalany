import { defineField, defineType, defineArrayMember } from 'sanity'

/**
 * ============================================================================
 * SANITY SCHEMA DEFINITION
 * ============================================================================
 */

// --- 1. PAGE BUILDER BLOCKS ---

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', title: 'Heading' }),
    defineField({ name: 'subheading', type: 'text', title: 'Subheading' }),
    defineField({ name: 'backgroundImage', type: 'image', title: 'Background Image', options: { hotspot: true } }),
    defineField({ name: 'primaryCtaText', type: 'string', title: 'Primary Button Text' }),
    defineField({ name: 'primaryCtaLink', type: 'string', title: 'Primary Button Link' }),
    defineField({ name: 'secondaryCtaText', type: 'string', title: 'Secondary Button Text' }),
    defineField({ name: 'secondaryCtaLink', type: 'string', title: 'Secondary Button Link' }),
  ],
  preview: {
    select: { title: 'heading', media: 'backgroundImage' },
    prepare({ title, media }) {
      return { title: title || 'Hero Section', subtitle: 'Hero Component', media }
    }
  }
})

export const serviceListBlock = defineType({
  name: 'serviceListBlock',
  title: 'Services Grid',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', title: 'Section Heading' }),
    defineField({ name: 'subheading', type: 'string', title: 'Small Top Label' }),
    defineField({ 
      name: 'manualSelection', 
      type: 'boolean', 
      title: 'Manually Select Services?',
      description: 'If disabled, all services will be shown automatically.',
      initialValue: false 
    }),
    defineField({
      name: 'services',
      type: 'array',
      hidden: ({parent}) => !parent?.manualSelection,
      of: [{type: 'reference', to: [{type: 'service'}]}]
    })
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Services Grid', subtitle: 'List of Services' }
    }
  }
})

export const featuredProjectsBlock = defineType({
  name: 'featuredProjectsBlock',
  title: 'Featured Projects',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', title: 'Section Heading' }),
    defineField({ name: 'subheading', type: 'string', title: 'Small Top Label' }),
    defineField({ 
      name: 'projects', 
      title: 'Select Projects', 
      type: 'array', 
      of: [{ type: 'reference', to: [{ type: 'project' }] }] 
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Featured Projects', subtitle: 'Project Grid' }
    }
  }
})

export const galleryBlock = defineType({
  name: 'galleryBlock',
  title: 'Gallery Grid (Bulk)',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', title: 'Section Heading' }),
    defineField({ name: 'subheading', type: 'string', title: 'Small Top Label' }),
    defineField({ 
      name: 'images', 
      title: 'Images', 
      type: 'array', 
      description: 'Drag and drop multiple images here. Click an image to edit its category/title.',
      options: {
        layout: 'grid'
      },
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Title', initialValue: 'Untitled' }),
            defineField({ 
              name: 'category', 
              type: 'string',
              title: 'Category',
              options: {
                list: [
                  { title: 'Real Estate', value: 'real-estate' },
                  { title: 'Fashion', value: 'fashion' },
                  { title: 'Architecture', value: 'architecture' },
                  { title: 'Brand', value: 'brand' },
                  { title: 'Concept', value: 'concept' }
                ]
              },
              initialValue: 'real-estate'
            }),
            defineField({ 
              name: 'aspectRatio', 
              type: 'string', 
              title: 'Aspect Ratio',
              options: {
                list: [
                  {title: 'Square (1:1)', value: 'square'},
                  {title: 'Portrait (3:4)', value: 'portrait'},
                  {title: 'Landscape (4:3)', value: 'landscape'}
                ]
              },
              initialValue: 'landscape'
            }),
          ]
        })
      ] 
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Gallery Section', subtitle: 'Portfolio Grid' }
    }
  }
})

export const pricingBlock = defineType({
  name: 'pricingBlock',
  title: 'Pricing Table',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', title: 'Section Heading' }),
    defineField({ name: 'subheading', type: 'string', title: 'Small Top Label' }),
    defineField({ 
      name: 'tiers', 
      title: 'Pricing Tiers', 
      type: 'array', 
      of: [{ type: 'reference', to: [{ type: 'pricingTier' }] }] 
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Pricing Section', subtitle: 'Pricing Table' }
    }
  }
})

export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', title: 'Heading' }),
    defineField({ 
      name: 'faqs', 
      title: 'Select FAQs', 
      type: 'array', 
      of: [{ type: 'reference', to: [{ type: 'faq' }] }] 
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'FAQ Section', subtitle: 'Questions & Answers' }
    }
  }
})

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Call to Action (CTA)',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', title: 'Heading' }),
    defineField({ name: 'text', type: 'text', title: 'Body Text' }),
    defineField({ name: 'buttonText', type: 'string', title: 'Button Text' }),
    defineField({ name: 'buttonLink', type: 'string', title: 'Button Link' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'CTA Section', subtitle: 'Call to Action' }
    }
  }
})

export const contentBlock = defineType({
  name: 'contentBlock',
  title: 'Rich Text Content',
  type: 'object',
  fields: [
    defineField({ 
      name: 'content', 
      type: 'array', 
      of: [{ type: 'block' }] 
    }),
  ]
})

// --- 2. DOCUMENT TYPES ---

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ 
      name: 'slug', 
      type: 'slug', 
      options: { source: 'title' }, 
      validation: (Rule) => Rule.required() 
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      description: 'Drag and drop components to build your page',
      type: 'array',
      of: [
        defineArrayMember({ type: 'heroBlock' }),
        defineArrayMember({ type: 'serviceListBlock' }),
        defineArrayMember({ type: 'featuredProjectsBlock' }),
        defineArrayMember({ type: 'galleryBlock' }),
        defineArrayMember({ type: 'pricingBlock' }),
        defineArrayMember({ type: 'faqBlock' }),
        defineArrayMember({ type: 'ctaBlock' }),
        defineArrayMember({ type: 'contentBlock' }),
      ]
    })
  ]
})

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: rule => rule.required() }),
    defineField({ 
      name: 'category', 
      type: 'string',
      options: {
        list: ['Real Estate', 'Fashion', 'Brand Films', 'Architecture', 'Concept Art']
      }
    }),
    defineField({ name: 'client', type: 'string' }),
    defineField({ name: 'year', type: 'string', initialValue: new Date().getFullYear().toString() }),
    defineField({ name: 'mainImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'content', type: 'array', of: [{type: 'block'}] })
  ]
})

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'features', type: 'array', of: [{ type: 'string' }] })
  ]
})

export const pricingTier = defineType({
  name: 'pricingTier',
  title: 'Pricing Tier',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Tier Name (e.g. Essentials)' }),
    defineField({ name: 'price', type: 'string', title: 'Price (e.g. $2,500)' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'isPopular', type: 'boolean', title: 'Mark as Popular?' }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' })
  ],
  preview: {
    select: { title: 'name', subtitle: 'price' }
  }
})

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', type: 'string' }),
    defineField({ name: 'answer', type: 'text', rows: 4 })
  ]
})

export const schemaTypes = [
  page,
  project,
  service,
  pricingTier,
  faq,
  heroBlock,
  serviceListBlock,
  featuredProjectsBlock,
  galleryBlock,
  pricingBlock,
  faqBlock,
  ctaBlock,
  contentBlock
]
