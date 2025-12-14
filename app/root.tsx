import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteLoaderData,
  useLocation,
} from "react-router";
import type { LinksFunction } from "react-router";
import type { Route } from "./+types/root";
import { getPreviewData } from "./sanity/session";
import { SanityVisualEditing } from "./components/SanityVisualEditing";
import { loadQuery } from "~/sanity/loader.server";
import { LAYOUT_QUERY } from "@/sanity/lib/queries";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

import "./globals.css";

interface LayoutData {
  settings?: {
    siteName?: string;
    siteDescription?: string;
    logo?: { asset?: { _ref: string } };
    contactEmail?: string;
    socialLinks?: Array<{ platform: string; url: string }>;
    projectsPerPage?: number;
    postsPerPage?: number;
  };
  navigation?: {
    items?: Array<{
      _key: string;
      label: string;
      link: string;
      children?: Array<{ _key: string; label: string; link: string }>;
    }>;
    ctaText?: string;
    ctaLink?: string;
  };
  footer?: {
    tagline?: string;
    menuLinks?: Array<{ _key: string; label: string; link: string }>;
    studioLinks?: Array<{ _key: string; label: string; link: string }>;
    copyright?: string;
    designCredit?: string;
  };
}

export const links: LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  const { preview, options } = await getPreviewData(request);

  // Load layout data (navigation, footer, settings)
  const layoutData = await loadQuery<LayoutData>(LAYOUT_QUERY, {}, options);

  return {
    preview,
    layout: layoutData.data,
    ENV: {
      PUBLIC_SANITY_PROJECT_ID: process.env.PUBLIC_SANITY_PROJECT_ID,
      PUBLIC_SANITY_DATASET: process.env.PUBLIC_SANITY_DATASET,
      PUBLIC_SANITY_STUDIO_URL: process.env.PUBLIC_SANITY_STUDIO_URL,
    },
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {data?.ENV && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
            }}
          />
        )}
      </head>
      <body className="bg-black text-white antialiased font-sans">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useRouteLoaderData<typeof loader>("root");
  const location = useLocation();
  const preview = data?.preview || false;
  const layout = data?.layout;

  // Don't show header/footer on studio route
  const isStudio = location.pathname.startsWith("/studio");

  return (
    <>
      {!isStudio && (
        <Header navigation={layout?.navigation} settings={layout?.settings} />
      )}
      <Outlet />
      {!isStudio && (
        <Footer footer={layout?.footer} settings={layout?.settings} />
      )}
      {preview && <SanityVisualEditing />}
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const data = useRouteLoaderData<typeof loader>("root");
  const location = useLocation();
  const layout = data?.layout;
  const isStudio = location.pathname.startsWith("/studio");

  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <>
      {!isStudio && (
        <Header navigation={layout?.navigation} settings={layout?.settings} />
      )}
      <main className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center text-white">
          <h1 className="text-6xl font-heading mb-4">{message}</h1>
          <p className="text-xl text-gray-400 mb-8">{details}</p>
          {stack && (
            <pre className="text-left bg-gray-900 p-4 rounded-lg overflow-auto max-w-2xl text-sm text-gray-300">
              {stack}
            </pre>
          )}
          <a
            href="/"
            className="inline-block mt-4 px-6 py-3 bg-primary text-black font-mono text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </main>
      {!isStudio && (
        <Footer footer={layout?.footer} settings={layout?.settings} />
      )}
    </>
  );
}
