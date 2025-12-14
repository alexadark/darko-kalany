'use client';

import { useDraftModeEnvironment } from 'next-sanity/hooks';

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  // Only show the button outside of the Presentation Tool
  if (environment !== 'live' && environment !== 'unknown') {
    return null;
  }

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-50 bg-white text-black px-4 py-2 rounded-md shadow-lg text-sm font-medium hover:bg-gray-100 transition-colors"
    >
      Exit Preview Mode
    </a>
  );
}
