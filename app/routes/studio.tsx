import { Studio } from "sanity";
import config from "@/sanity.config";

export default function StudioPage() {
  return <Studio config={config} />;
}

// Disable SSR for Sanity Studio
export function HydrateFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl">Loading Studio...</div>
    </div>
  );
}

export const handle = {
  // This prevents SSR for the studio route
  hydrate: true,
};
