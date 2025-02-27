"use client";

import Image from "next/image";
import { Button } from "./ui/Button";
import { useState, useEffect } from "react";

const imageData = [
  {
    id: 1,
    title: "Unlock Your Potential",
    imgSrc:
      "https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67b9d6b7002f83896c25/view?project=67a96cd2001e32766970&mode=admin",
  },
  {
    id: 2,
    title: "A Healthy Brain",
    imgSrc:
      "https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67b9df78002055bc50b0/view?project=67a96cd2001e32766970&mode=admin",
  },
  // { id: 3, title: 'A Healthy Brain', imgSrc: 'https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9c600138cb2fb9a/view?project=67a96cd2001e32766970&mode=admin' },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    const interval = setInterval(() => {
      handleImageChange((currentIndex + 1) % imageData.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleImageChange = (index: number) => {
    const colors = ["#f0f0f0", "#e0e0e0", "#d0d0d0"]; // Add your desired colors
    setBgColor(colors[index % colors.length]);
    setCurrentIndex(index);
  };

  const currentImage = imageData[currentIndex];

  return (
    <div className="h-[250px]  md:h-[500px] rounded-xl overflow-hidden  py-5">
      <div className="container mx-auto px-4 h-full flex items-center justify-between carousel-container">
        <div className="flex flex-col md:flex-row items-start justify-between w-full gap-12  bg-[#800020] rounded-xl py-4 px-6 xl:px-16 lg:py-16 relative">
          {/* Text Content */}
          <div className="flex md:flex-col text-cream-light justify-start text-left  text-white animate-fade-in lg:gap-y-4">
            <h1 className="text-xl md:text-3xl font-bold leading-tight animate-fade-in-delay text-left">
              Unlock the Secrets of
              <span className="block mt-2 text-3xl md:text-5xl">
                OPTIMAL
                <br />
                WELLNESS!
              </span>
            </h1>
            <p className="text-sm md:text-2xl opacity-90 max-w-xl animate-fade-in-delay hidden md:block">
              Discover the powerful connection between nutrition, brain
              function, and overall well-being.
            </p>
          </div>

          {/* Carousel Items */}
          <div
            key={currentImage?.id}
            className="flex-1 absolute -top-16 -right-20 md:-top-16 md:right-18 lg:top-20 lg:right-26  xl:-top-10 xl:right-24 transform -translate-x-1/2 z-10 transition-all duration-500 ease-in-out hover:scale-105"
          >
            <div className="relative w-[150px] h-[200px]  md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[200px]  xl:w-[300px] xl:h-[300px] 2xl:w-[350px] 2xl:h-[300px] ">
              {currentImage && (
                <Image
                  src={currentImage.imgSrc}
                  alt={currentImage.title}
                  width={500}
                  height={300}
                  className="object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-in-out  drop-shadow-2xl shadow-white"
                />
              )}
            </div>
          </div>
          <div className="absolute right-0 bottom-0 md:right-5 md:bottom-5 p-2">
            <Button className="bg-cream text-burgundy bg-white hover:bg-white/80 hover:text-burgundy-dark transition-all duration-300 text-sm lg:text-lg px-4 py-4 lg:px-6 lg:py-6 rounded-full shadow-lg -ml-10">
              Explore Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
