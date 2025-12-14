import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // Preview mode API routes
  route("api/preview-mode/enable", "routes/api.preview-mode.enable.tsx"),
  route("api/preview-mode/disable", "routes/api.preview-mode.disable.tsx"),
  // Studio route
  route("studio/*", "routes/studio.tsx"),
  // Projects routes
  route("projects", "routes/projects.tsx"),
  route("projects/:slug", "routes/projects.$slug.tsx"),
  // Blog routes
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog.$slug.tsx"),
  // Catch-all for dynamic pages (must be last)
  route("*", "routes/page.tsx"),
] satisfies RouteConfig;
