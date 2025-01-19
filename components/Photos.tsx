"use client"
import React, { useState } from "react";
import { Gallery_images } from "@/public/data"; // Update the path as needed
import Image from "next/image";
import { Gem, Minus, X } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
};

const DryfruitPhoto: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openModal = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-gray-50 flex flex-col lg:flex-row justify-center items-center p-5">
      {/* Header Section */}
      <div className="flex flex-col space-y-4 justify-center items-center bg-white py-6 px-8 w-full max-w-7xl ">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 uppercase text-center">
          Our Premium Dry Fruits
        </h2>
        <div className="flex justify-center items-center space-x-4">
          <Minus size={40} color="#CDB398" />
          <Gem size={30} color="#CDB398" />
          <Minus size={40} color="#CDB398" />
        </div>
        <p className="max-w-2xl text-center text-lg md:text-xl font-light text-gray-600 px-4 sm:px-6">
          Experience the goodness of nature with our handpicked premium dry
          fruits. Pure, fresh, and packed with care to deliver health and
          happiness.
        </p>
      </div>

      {/* Gallery Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-w-7xl mx-auto">
        {Gallery_images.map((image: GalleryImage, index: number) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-md shadow-lg group cursor-pointer"
            onClick={() => openModal(image)}
          >
            {/* Image */}
            <Image
              src={image.src}
              alt={image.alt}
              width={700}
              height={600}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover Text */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
              <span className="text-white text-xl font-semibold">
                {image.alt}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Image */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative p-4 bg-white rounded-lg shadow-lg max-w-3xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 py2-"
            >
              <X size={24} />
            </button>

            {/* Full Image */}
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={800}
              height={600}
              className="w-full h-auto object-contain rounded-md"
            />
            {/* Caption */}
            <p className="mt-4 text-center text-gray-700 font-medium">
              {selectedImage.alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DryfruitPhoto;
