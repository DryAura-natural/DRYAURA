"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const images = [
  "https://img.freepik.com/free-psd/brunch-concept-voucher-template_23-2148465807.jpg?t=st=1739700719~exp=1739704319~hmac=bdb5e2a14773c336b448b6a2e3e36f17eb73601cdefd3b5c0d2a273f143615e3&w=1380",
  "https://img.freepik.com/free-psd/restaurant-voucher-template_23-2148466841.jpg?t=st=1739700733~exp=1739704333~hmac=69f4f7dad134a1695df6591a1c19cb3eb9e6c847cce1c0786d0b8bfbede4c23f&w=1380",
  "https://img.freepik.com/free-psd/music-festival-landing-page-template-design_23-2149421241.jpg?t=st=1739700750~exp=1739704350~hmac=f80a1ff2092d9ea3bfb84ffa3f1d51befc386ae5bdeef2a219de26a20970b624&w=1380",
  "https://img.freepik.com/free-psd/music-festival-landing-page-template-design_23-2149421241.jpg?t=st=1739700750~exp=1739704350~hmac=f80a1ff2092d9ea3bfb84ffa3f1d51befc386ae5bdeef2a219de26a20970b624&w=1380",
];

export default function OfferCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0); // Start with the first image

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000); // Auto-slide every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-2">
        Premium Nutty Deals Await!
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Treat yourself to the finest selection of nutty delights at unbeatable prices!
      </p>

      <div className="relative w-full mx-auto px-5 md:p-20 overflow-hidden">
        <div className="flex justify-center items-center transition-all duration-700 ease-in-out">
          {/* Previous Image */}
          <div className="flex-shrink-0 relative w-1/3 h-64 md:h-80 mx-2 transition-all duration-700 ease-in-out">
            <Image
              src={images[(currentIndex - 1 + images.length) % images.length]} // Previous image
              alt="Previous Slide"
              fill
              className="object-cover rounded-lg scale-90 opacity-50 blur-sm"
            />
          </div>

          {/* Current Image */}
          <div className="flex-shrink-0 relative w-5/6 lg:w-1/3  h-52 md:h-80 mx-2 transition-all duration-700 ease-in-out">
            <Image
              src={images[currentIndex]}
              alt="Current Slide"
              fill
              priority
              className="object-cover rounded-lg scale-125 opacity-100 shadow-xl shadow-orange-400/50 transition-all duration-500"
            />
          </div>

          {/* Next Image */}
          <div className="flex-shrink-0 relative w-1/3 h-64 md:h-80 mx-2 transition-all duration-700 ease-in-out">
            <Image
              src={images[(currentIndex + 1) % images.length]} // Next image
              alt="Next Slide"
              fill
              className="object-cover rounded-lg scale-90 opacity-50 blur-sm"
            />
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-orange-500 scale-125' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-5 md:left-10 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-orange-600 shadow-lg"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-5 md:right-10 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hover:bg-orange-600 shadow-lg"
        >
          &gt;
        </button>
      </div>
    </>
  );
}