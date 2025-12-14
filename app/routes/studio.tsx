import { useEffect, useState } from "react";

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-white text-lg">Loading Studio...</p>
      </div>
    </div>
  );
}

export default function StudioPage() {
  const [StudioComponent, setStudioComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Dynamic import only on client side
    Promise.all([
      import("sanity"),
      import("@/sanity.config"),
    ]).then(([{ Studio }, { default: config }]) => {
      setStudioComponent(() => () => <Studio config={config} />);
    });
  }, []);

  if (!StudioComponent) {
    return <LoadingScreen />;
  }

  return <StudioComponent />;
}

// Disable SSR for this route
export function HydrateFallback() {
  return <LoadingScreen />;
}
