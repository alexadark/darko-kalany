import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemas";
import { resolve } from "@/sanity/presentation/resolve";
import { structure } from "@/sanity/structure";

const projectId = "2gj8du3t";
const dataset = "production";

export default defineConfig({
  name: "default",
  title: "dk-studio-4",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin:
          typeof location !== "undefined"
            ? location.origin
            : "http://localhost:3000",
        preview: "/",
        previewMode: {
          enable: "/api/preview-mode/enable",
          disable: "/api/preview-mode/disable",
        },
      },
      resolve,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
