"use client";
import { useState, useEffect } from "react";
// import { VideoBillboard as BillboardType } from "@/types";



const labels = [
    "Savor the Purity, Embrace the Health.",
    "Healthy Snacking, Perfected by Nature.",
    "Fresh, Natural, and Full of Flavor.",
    "Smart Snacks for a Healthier You.",
    "Where Quality Meets Nature’s Bounty.",
    "Naturally Fuel Your Day, the Right Way.",
    "Health and Flavor, Delivered Fresh.",
    "Premium Dry Fruits, Naturally Superior."
];

const VideoBillboard = () => {
  const [currentLabel, setCurrentLabel] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    // Start typing animation on mount
    setShowTyping(true);

    // Change label every 5 seconds
    const interval = setInterval(() => {
      setShowTyping(false); // Stop typing animation
      setTimeout(() => {
        setCurrentLabel((prevLabel) => (prevLabel + 1) % labels.length); // Cycle through labels
        setShowTyping(true); // Start typing the next label
      }, 1000); // Wait for the current label to finish before starting next label
    }, 5000); // Change label every 5 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-0 overflow-hidden relative ">
      <div className="relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
        {/* Conditionally render background video or image */}
       (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="https://res.cloudinary.com/djlopmpiz/video/upload/v1737005582/vj5hx5ycntbkvbnji6ay.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Billboard Background Video"
          />
        ) 
       

        {/* Optional Overlay */}
        <div className="absolute  bg-black lg:bg-opacity-80 md:bg-opacity-80"></div>

        {/* Content overlay */}
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-4 relative z-10 transition duration-150 ease-in-out">
          <h1
            className={`font-bold text-white text-xl  md:text-2xl sm:text-5xl lg:text-6xl font-semibold sm:max-w-xl max-w-xs lg:max-w-full ${"text-[#ede5ddd4]"} backdrop-blur-sm  p-2 rounded-sm font-sans uppercase inset-10 cursor-none ${
              showTyping ? "animate-typing" : ""
            }`}
            style={{
              animationDuration: "5s", // Typing effect duration
              animationIterationCount: "1",
              animationFillMode: "forwards", // Ensure the text stays after typing
              whiteSpace: "nowrap", // Prevent text from wrapping
              overflow: "hidden", // Hide overflow while typing
              width: "auto", // Ensure the width is dynamic and adjusts to the text
            }}
          >
            {labels[currentLabel]}
          </h1>
         
        </div>
      </div>
    </div>
  );
};

export default VideoBillboard;
