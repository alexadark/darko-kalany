import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || "2gj8du3t";
const dataset = process.env.SANITY_DATASET || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  perspective: "published",
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  perspective: "previewDrafts",
  token: process.env.SANITY_API_READ_TOKEN,
});

export function getClient(preview = false) {
  return preview ? previewClient : client;
}
