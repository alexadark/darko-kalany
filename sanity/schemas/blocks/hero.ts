import { defineField } from 'sanity';
import { RocketIcon } from '@sanity/icons';
import { createBlock } from './base';

export const heroBlock = createBlock({
  name: 'heroBlock',
  title: 'Hero',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
      description: 'Supporting text below the heading',
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video Upload', value: 'video' },
          { title: 'YouTube', value: 'youtube' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
      hidden: ({ parent }) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload a video file (MP4, WebM)',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Paste a YouTube video URL (will display without YouTube branding)',
      hidden: ({ parent }) => parent?.mediaType !== 'youtube',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['https'],
        }).custom((url) => {
          if (!url) return true;
          const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
          return youtubeRegex.test(url) || 'Must be a valid YouTube URL';
        }),
    }),
    defineField({
      name: 'videoPoster',
      title: 'Video Poster Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Fallback image shown while video loads',
      hidden: ({ parent }) => parent?.mediaType === 'image',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Button Text', type: 'string' }),
        defineField({ name: 'link', title: 'Button Link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'text', title: 'Button Text', type: 'string' }),
        defineField({ name: 'link', title: 'Button Link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'alignment',
      title: 'Content Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'overlay',
      title: 'Dark Overlay',
      type: 'boolean',
      description: 'Add a dark overlay on the background for better text readability',
      initialValue: true,
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'string',
      options: {
        list: [
          { title: 'Full Screen', value: 'full' },
          { title: 'Large (80vh)', value: 'large' },
          { title: 'Medium (60vh)', value: 'medium' },
        ],
      },
      initialValue: 'full',
    }),
  ],
});
