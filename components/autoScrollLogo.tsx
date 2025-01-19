
"use client";
import React from "react";
import Image from "next/image";

const logos = [
  { id: 1, url: "https://res.cloudinary.com/djlopmpiz/image/upload/v1737123454/Where_Nature_Meets_Luxury_DryAura_Naturals._vvtgah.png", alt: "Brand 1" },
  { id: 2, url: "https://res.cloudinary.com/djlopmpiz/image/upload/v1737123454/Where_Nature_Meets_Luxury_DryAura_Naturals._vvtgah.png", alt: "Brand 2" },
  { id: 3, url: "https://res.cloudinary.com/djlopmpiz/image/upload/v1737123454/Where_Nature_Meets_Luxury_DryAura_Naturals._vvtgah.png", alt: "Brand 3" },
  { id: 4, url: "https://res.cloudinary.com/djlopmpiz/image/upload/v1737123454/Where_Nature_Meets_Luxury_DryAura_Naturals._vvtgah.png", alt: "Brand 4" },
  { id: 5, url: "https://res.cloudinary.com/djlopmpiz/image/upload/v1737123454/Where_Nature_Meets_Luxury_DryAura_Naturals._vvtgah.png", alt: "Brand 5" },
];

const AutoScrollLogos: React.FC = () => {
  return (
    <div className="relative overflow-hidden py-8">
      <div className="flex animate-marquee space-x-8">
        {/* Original set of logos */}
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32"
          >
            <Image
              src={logo.url}
              alt={logo.alt}
              width={128}
              height={128}
              className="object-contain"
            />
          </div>
        ))}
        {/* Duplicate set of logos for seamless scroll */}
        {logos.map((logo) => (
          <div
            key={`duplicate-${logo.id}`}
            className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32"
          >
            <Image
              src={logo.url}
              alt={logo.alt}
              width={128}
              height={128}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollLogos;
