import { useEffect, useState } from "react";

export function DisablePreviewMode() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show when not inside an iframe (not in Studio's Presentation tool)
    setShow(window === window.parent && !window.opener);
  }, []);

  if (!show) return null;

  return (
    <a
      href="/api/preview-mode/disable"
      className="fixed bottom-4 right-4 z-50 bg-black text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-gray-800 transition-colors"
    >
      Exit Preview Mode
    </a>
  );
}
