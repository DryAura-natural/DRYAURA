"use client"; // ✅ Ensure it's a Client Component
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Loader = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); // ✅ Detect page changes

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000); // Simulated delay

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    loading && (
      <div className="fixed inset-0 flex  flex-col items-center justify-center bg-black/20 z-50">
       
        <div className="w-16 h-16 border-4 border-[#2D1515] border-t-transparent rounded-full animate-spin"></div>
       <h1 className="text-[#2D1515]">Loding...</h1> 
      </div>
    )
  );
};

export default Loader;
