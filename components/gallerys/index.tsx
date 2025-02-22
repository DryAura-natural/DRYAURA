"use client";
import { Tab } from "@headlessui/react";
import { Image as ImageType } from "@/types";
import GalleryTab from "./gallery-tab";
import Image from "next/image";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {

  
  return (
    <Tab.Group as="div" className="flex flex-col-reverse md:flex-row gap-6">
      {/* Thumbnails */}
      <div className="mx-auto  sm:w-3/4 md:w-1/6 ">
        <Tab.List className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-1 gap-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      {/* Main Image Panel */}
      <Tab.Panels className="w-full md:w-5/6">
        {images.map((image) => (
          <Tab.Panel key={image.id} className="flex items-center justify-center">
            <div className="relative w-full max-w-3xl aspect-square overflow-hidden rounded-lg shadow-lg">
              <Image
                fill
                src={image.url}
                alt="image"
                className="object-cover object-center"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
