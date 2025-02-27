"use client";
import { useState, useRef, MouseEvent, TouchEvent, useEffect } from "react";
import { cn } from "@/lib/utils";

const slides = [
  {
    src: "https://img.freepik.com/free-psd/lohri-festival-celebration-template_23-2151895065.jpg?t=st=1740540899~exp=1740544499~hmac=6fedfdb1339c4c6e167c074d3431e18fbf34475cb9750c157f9df1e7af849aec&w=1060",
    alt: "Slide 1",
    shadowColor: "#997523",
  },
  {
    src: "https://img.freepik.com/free-vector/healthy-restaurant-square-flyer-template_23-2148899793.jpg?t=st=1740540937~exp=1740544537~hmac=445591647ae5776abcccf9e92c20d62c33faac8e6305e31942765b0d3e153c42&w=900",
    alt: "Slide 2",
    shadowColor: "#653622",
  },
  {
    src: "https://img.freepik.com/free-psd/ramadan-kareem-social-media-post-template-design_505751-3592.jpg?t=st=1740540978~exp=1740544578~hmac=3834b5faf27b9ac7c19b32d7f326bd92524a3c43c86e866d10922d3242ea7a97&w=900",
    alt: "Slide 3",
    shadowColor: "#99521C",
  },
  {
    src: "https://img.freepik.com/free-vector/bio-healthy-food-squared-flyer-template_23-2148865340.jpg?t=st=1740541029~exp=1740544629~hmac=eb21e68be989062800ef60d372fed3a5464bc3be14040a3f2d3bdd4ac16b47ff&w=900",
    alt: "Slide 4",
    shadowColor: "#59301E",
  },
];

export const OfferCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDistance = useRef(0);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (isDragging) {
      dragDistance.current = clientX - dragStartX.current;
    }
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);

      if (Math.abs(dragDistance.current) > 50) {
        if (dragDistance.current > 0) {
          setCurrentIndex((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
          );
        } else {
          setCurrentIndex((prev) =>
            prev === slides.length - 1 ? 0 : prev + 1
          );
        }
      }
      dragDistance.current = 0;
    }
  };

  useEffect(() => {
    if (!isDragging) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [isDragging]);

  const handleMouseDown = (e: MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleTouchStart = (e: TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const getSlideIndex = (offset: number) => {
    let index = currentIndex + offset;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    return index;
  };

  const getShadowColor = (index: number) => {
    return slides[index].shadowColor;
  };

  return (
    <>

    <div className="relative w-full max-w-[1200px] h-[500px]  lg:h-[600px] mx-auto overflow-hidden">
      
      <div
        className="relative w-full h-full flex items-center justify-center "

        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-[25rem] lg:mb-[30rem]">Nutty Delight Offers </h1>
        {/* Previous Slide */}
        <div
          className={cn(
            "absolute w-[70%] h-[60%] lg:w-[40%] lg:h-[70%] transition-all duration-500 ease-in-out select-none rounded-lg",
            "-translate-x-[85%] opacity-50 scale-75"
          )}
        >
          <img
            src={slides[getSlideIndex(-1)].src}
            alt={slides[getSlideIndex(-1)].alt}
            className="w-full h-full object-cover rounded-3xl shadow-2xl pointer-events-none filter "
            style={{
              boxShadow: `0 10px 20px ${getShadowColor(getSlideIndex(-1))}`,
            }}
            loading="lazy"
            draggable="false"
          />
        </div>

        {/* Current Slide */}
        <div
          className={cn(
            "absolute w-[70%] h-[55%]  lg:w-[40%] lg:h-[60%] transition-all duration-300 ease-in-out select-none z-10",
            isDragging ? "transition-none" : ""
          )}
          style={{
            transform: `translateX(${dragDistance.current}px) scale(1.1)`,
          }}
        >
          <img
            src={slides[currentIndex].src}
            alt={slides[currentIndex].alt}
            className="w-full h-full object-cover rounded-3xl shadow-2xl pointer-events-none filter ]"
            style={{ boxShadow: `0 10px 20px ${getShadowColor(currentIndex)}` }}
            loading="lazy"
            draggable="false"
          />
        </div>

        {/* Next Slide */}
        <div
          className={cn(
            "absolute w-[70%] h-[60%] lg:w-[40%] lg:h-[70%] transition-all duration-500 ease-in-out select-none",
            "translate-x-[85%] opacity-50 scale-75"
          )}
        >
          <img
            src={slides[getSlideIndex(1)].src}
            alt={slides[getSlideIndex(1)].alt}
            className="w-full h-full object-cover rounded-3xl shadow-2xl pointer-events-none filter  "
            style={{
              boxShadow: `0 10px 20px ${getShadowColor(getSlideIndex(1))}`,
            }}
            loading="lazy"
            draggable="false"
          />
        </div>
      </div>
    </div>
    </>
  );
};
