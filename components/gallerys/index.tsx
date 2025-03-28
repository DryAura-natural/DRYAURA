"use client";
import { Tab } from "@headlessui/react";
import { Image as ImageType, Badge as BadgeType } from "@/types";
import GalleryTab from "./gallery-tab";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface GalleryProps {
  images: ImageType[];
  badges?: BadgeType[] | BadgeType;
}

const Gallery: React.FC<GalleryProps> = ({ images, badges }) => {
  // Normalize badges to an array
  const badgeArray = badges 
    ? Array.isArray(badges) 
      ? badges 
      : [badges] 
    : [];

  // Log the badges
  console.log('Gallery Badges:', {
    originalBadges: badges,
    normalizedBadges: badgeArray
  });

  return (
    <Tab.Group as="div" className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="w-full md:w-24 lg:w-28 xl:w-32">
        <Tab.List className="grid grid-cols-4 gap-2 md:grid-cols-1 p-2 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-50 bg-gray-50 border border-gray-200 rounded-lg">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>

      {/* Main Image Panel */}
      <Tab.Panels className="relative w-full md:flex-1">
        {badgeArray.length > 0 && (
          <Badge 
            className="absolute top-4 right-4 px-2 py-1 bg-red-900 text-white z-10 rounded-md"
          >
            {badgeArray[0].label}
          </Badge>
        )}
        {images.map((image) => (
          <Tab.Panel key={image.id} className="w-full">
            <div className="relative w-full max-w-4xl aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <Image
                fill
                src={image.url}
                alt={`Product image ${image.id}`}
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 80vw"
                quality={85}
                priority={image === images[0]}
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;