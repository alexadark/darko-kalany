import { defineLocations, PresentationPluginOptions } from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    // Pages
    page: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: doc?.slug === '/' ? '/' : `/${doc?.slug}`,
          },
        ],
      }),
    }),

    // Blog Posts
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/blog/${doc?.slug}`,
          },
          {
            title: 'Blog Index',
            href: '/blog',
          },
        ],
      }),
    }),

    // Projects
    project: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/projects/${doc?.slug}`,
          },
          {
            title: 'Projects Index',
            href: '/projects',
          },
        ],
      }),
    }),
  },
};
