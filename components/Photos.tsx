"use client";
import React, { useState } from "react";
import { Gallery_images } from "@/public/data"; // Update the path as needed
import Image from "next/image";
import { Gem, Minus, X } from "lucide-react";
import Marquee from "react-fast-marquee";

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

  const styles = {
    galleryContainer: {
      padding: '10px',
      backgroundColor: '#f8f8f8',
      borderRadius: '8px',
    },
    imageWrapper: {
      margin: '5px',
      padding: '1px',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
    },
    modalOverlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center items-center  rounded-ss-lg pt-2 ">

      <div className="text-center mb-8 space-y-2 opacity-0 animate-fade-in px-2">
        <h2 className="text-2xl font-bold tracking-tight">Our Premium Dry Fruits</h2>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
        Experience the goodness of nature with our handpicked premium dry
          fruits. Pure, fresh, and packed with care to deliver health and
          happiness.
        </p>
      </div>

      {/* Gallery Section */}
      <div style={styles.galleryContainer} className="w-full overflow-x-auto py-8">
        <div className="flex gap-4 w-full mx-auto gap-x-15 space-x-40   ">
        <Marquee speed={50} pauseOnHover={true} gradient={true} autoFill  >
          {Gallery_images.map((image: GalleryImage, index: number) => (
            <div
              key={index}
              style={styles.imageWrapper}
              className="relative flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 overflow-hidden rounded-md shadow-lg group cursor-pointer space-x-5"
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
              <div className="absolute inset-0 bg-black/20 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
          </Marquee>
        </div>
      </div>

      {/* Modal for Image */}
      {selectedImage && (
        <div style={styles.modalOverlay} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative p-4 bg-white rounded-lg shadow-lg max-w-3xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-red-500 hover:text-gray-800 "
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