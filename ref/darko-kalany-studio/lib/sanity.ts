import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// CONFIGURATION
// Replace this with your actual Project ID from https://sanity.io/manage
// ⚠️ IMPORTANT: Project ID must be lowercase letters, numbers, or dashes only. 
// DO NOT use uppercase letters or underscores (e.g. 'My_Project' is invalid).
export const PROJECT_ID = 'your-project-id'; 
export const DATASET = 'production';

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: true, // set to `false` to bypass the edge cache for fresh data
  apiVersion: '2024-03-13', 
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) return '';
  return builder.image(source);
}

// Helper to check if Sanity is actually configured
export const isSanityConfigured = () => {
  return PROJECT_ID !== 'your-project-id' && PROJECT_ID !== 'REPLACE_WITH_YOUR_PROJECT_ID';
};