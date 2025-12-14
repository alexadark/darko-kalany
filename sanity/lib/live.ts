import { defineLive } from 'next-sanity/live';
import { client } from './client';

const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion: '2024-06-01',
    stega: {
      enabled: true,
      studioUrl: '/studio',
    },
  }),
  serverToken: token,
  browserToken: token,
});
