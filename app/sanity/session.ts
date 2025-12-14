import { createCookieSessionStorage } from "react-router";
import type { loadQuery } from "@sanity/react-loader";

// Use a stable secret for the cookie session
// In production, use an environment variable
const sessionSecret = process.env.SESSION_SECRET || "sanity-preview-session-secret-change-in-production";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      httpOnly: true,
      name: "__sanity_preview",
      path: "/",
      sameSite: !import.meta.env.DEV ? "none" : "lax",
      secrets: [sessionSecret],
      secure: !import.meta.env.DEV,
    },
  });

async function getPreviewData(request: Request): Promise<{
  preview: boolean;
  options: Parameters<typeof loadQuery>[2];
}> {
  const session = await getSession(request.headers.get("Cookie"));
  const preview = session.get("previewMode") || false;
  return {
    preview,
    options: preview
      ? {
          perspective: session.has("perspective")
            ? session.get("perspective").split(",")
            : "drafts",
          stega: true,
        }
      : {
          perspective: "published",
          stega: false,
        },
  };
}

export { commitSession, destroySession, getSession, getPreviewData };
