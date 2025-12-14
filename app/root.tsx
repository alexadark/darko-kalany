import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteLoaderData,
} from "react-router";
import type { LinksFunction } from "react-router";
import type { Route } from "./+types/root";
import { getPreviewData } from "./sanity/session";
import { SanityVisualEditing } from "./components/SanityVisualEditing";

import "./globals.css";

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
  const { preview } = await getPreviewData(request);
  return {
    preview,
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
  const preview = data?.preview || false;

  return (
    <>
      <Outlet />
      {preview && <SanityVisualEditing />}
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
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
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">{message}</h1>
        <p className="text-xl text-gray-400 mb-8">{details}</p>
        {stack && (
          <pre className="text-left bg-gray-900 p-4 rounded-lg overflow-auto max-w-2xl text-sm text-gray-300">
            {stack}
          </pre>
        )}
      </div>
    </main>
  );
}
