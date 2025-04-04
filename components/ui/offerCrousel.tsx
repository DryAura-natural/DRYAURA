"use client";
import { useState, useRef, MouseEvent, TouchEvent, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import getBillboard from "@/actions/get-billboard";
import { Billboard } from "@/types";

export const OfferCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [billboard, setBillboard] = useState<Billboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);


const shadowColor = "#59301E";

  useEffect(() => {
    const fetchBillboard = async () => {
      console.log('🚀 HeroSection: Starting Billboard Fetch');
      try {
        const billboardId = `8a081fcc-965c-4ecf-9b1a-4521349dce2e`;
        // console.log('🎯 HeroSection: Billboard ID', billboardId);
        
        const fetchedBillboard = await getBillboard(billboardId);
        
        // console.log('🖼️ HeroSection: Fetched Billboard', fetchedBillboard);
        // console.log('🖼️ HeroSection: Billboard Images Count', fetchedBillboard?.images?.length || 0);
        
        setBillboard(fetchedBillboard);
      } catch (error) {
        console.error('❌ HeroSection: Failed to fetch billboard', error);
      } finally {
        // console.log('🏁 HeroSection: Billboard Fetch Complete');
        setIsLoading(false);
      }
    };

    fetchBillboard();
  }, []);
  
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
            prev === 0 ? (billboard?.images?.length || 0) - 1 : prev - 1
          );
        } else {
          setCurrentIndex((prev) =>
            prev === (billboard?.images?.length || 0) - 1 ? 0 : prev + 1
          );
        }
      }
      dragDistance.current = 0;
    }
  };

  useEffect(() => {
    if (!isDragging && billboard?.images) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev === (billboard?.images?.length || 0) - 1 ? 0 : prev + 1));
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [isDragging, billboard?.images]);

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
    if (index < 0) index = (billboard?.images?.length || 0) - 1;
    if (index >= (billboard?.images?.length || 0)) index = 0;
    return index;
  };

  const getShadowColor = (index: number) => {
    return shadowColor;
;
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
          <Image
            src={billboard?.images[getSlideIndex(-1)]?.url || ""}
            alt={billboard?.images[getSlideIndex(-1)]?.id || "Billboard Image"}
            className="w-full h-full object-cover rounded-3xl shadow-2xl pointer-events-none filter "
            style={{
              boxShadow: `0 10px 20px ${getShadowColor(getSlideIndex(-1))}`,
            }}
            loading="lazy"
            draggable="false"
            width={1920}
            height={1080}
          />
        </div>

        {/* Current Slide */}
        <div
          className={cn(
            "absolute w-[70%] h-[60%]  lg:w-[40%] lg:h-[70%] transition-all duration-300 ease-in-out select-none z-10",
            isDragging ? "transition-all" : ""
          )}
          style={{
            transform: `translateX(${dragDistance.current}px) scale(1.1)`,
          }}
        >
          <Image
            src={billboard?.images[currentIndex]?.url || ""}
            alt={billboard?.images[currentIndex]?.id || "Billboard Image"}
            className="w-full h-full object-cover rounded-3xl shadow-2xl pointer-events-none filter ]"
            style={{ boxShadow: `0 10px 20px ${getShadowColor(currentIndex)}` }}
            loading="lazy"
            draggable="false"
            width={1920}
            height={1080}
          />
        </div>

        {/* Next Slide */}
        <div
          className={cn(
            "absolute w-[70%] h-[60%] lg:w-[40%] lg:h-[70%] transition-all duration-500 ease-in-out select-none",
            "translate-x-[85%] opacity-50 scale-75"
          )}
        >
          <Image
            src={billboard?.images[getSlideIndex(1)]?.url || ""}
            alt={billboard?.images[getSlideIndex(1)]?.id || "Billboard Image"}
            className="w-full h-full object-cover rounded-3xl shadow-2xl pointer-events-none filter  "
            style={{
              boxShadow: `0 10px 20px ${getShadowColor(getSlideIndex(1))}`,
            }}
            loading="lazy"
            draggable="false"
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </div>
    </>
  );
};
