import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // Preview mode API routes
  route("api/preview-mode/enable", "routes/api.preview-mode.enable.tsx"),
  route("api/preview-mode/disable", "routes/api.preview-mode.disable.tsx"),
  // Studio route
  route("studio/*", "routes/studio.tsx"),
  // Catch-all for dynamic pages
  route("*", "routes/page.tsx"),
] satisfies RouteConfig;
