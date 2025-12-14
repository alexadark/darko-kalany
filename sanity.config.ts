import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemas";
import { resolve } from "@/sanity/presentation/resolve";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "2gj8du3t";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "dk-studio-4",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    structureTool(),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: "/api/preview",
        },
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
