"use client"; // ✅ Ensure it's a Client Component
import { useEffect, useState } from "react";

const GifLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoadedBefore = localStorage.getItem("hasLoadedBefore");

    if (hasLoadedBefore) {
      setLoading(false); // ✅ If already loaded, skip loader
    } else {
      localStorage.setItem("hasLoadedBefore", "true"); // ✅ Set flag in localStorage
      setTimeout(() => setLoading(false), 4000); // ✅ Hide after 3 sec
    }
  }, []);

  if (!loading) return null; // ✅ Do not render if loading is false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <img src="https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67aa01e80024f51dd9bb/view?project=67a96cd2001e32766970&mode=admin" alt="Loading..." className="w-screen" />
    </div>
  );
};

export default GifLoader;
