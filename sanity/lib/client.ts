import { createClient } from "@sanity/client";

// Declare window.ENV for client-side access to public env vars
declare global {
  interface Window {
    ENV: {
      PUBLIC_SANITY_PROJECT_ID: string;
      PUBLIC_SANITY_DATASET: string;
      PUBLIC_SANITY_STUDIO_URL: string;
    };
  }
}

// Use window.ENV on client, process.env on server
const env = typeof document === "undefined" ? process.env : window.ENV;

const projectId = env.PUBLIC_SANITY_PROJECT_ID || "2gj8du3t";
const dataset = env.PUBLIC_SANITY_DATASET || "production";
const studioUrl = env.PUBLIC_SANITY_STUDIO_URL || "/studio";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  stega: {
    studioUrl,
  },
});

// Server-side only client with token (for loaders)
export function createServerClient(token?: string) {
  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
    perspective: token ? "previewDrafts" : "published",
    token,
  });
}

export function getClient(preview = false, token?: string) {
  if (preview && token) {
    return createServerClient(token);
  }
  return client;
}
