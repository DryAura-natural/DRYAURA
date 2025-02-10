"use client";

import { useState, useEffect, useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const GlobalLoader = () => {
  const pathname = usePathname(); // Detect route changes
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoading(true); // Show loader immediately

    startTransition(() => {
      setTimeout(() => setLoading(false), 300); // Adjust loading duration
    });
  }, [pathname]);

  if (!loading && !isPending) return null; // Hide loader when not loading

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white/80 backdrop-blur-md z-50">
      <Image
        src="/loader.gif" // ✅ Change this to your loader GIF path
        alt="Loading..."
        width={100} // Adjust size
        height={100}
        priority
      />
    </div>
  );
};
