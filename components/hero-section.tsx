"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import getBillboard from "@/actions/get-billboard";
import { Billboard } from "@/types";
import Image from "next/image";

export function HeroSection() {
  const [billboard, setBillboard] = useState<Billboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBillboard = async () => {
      console.log("HeroSection: Starting Billboard Fetch");
      try {
        const billboardId = `ceef521d-e446-4a0f-82b0-a0f48be35877`;

        const fetchedBillboard = await getBillboard(billboardId);

        setBillboard(fetchedBillboard);
      } catch (error) {
        console.error("HeroSection: Failed to fetch billboard", error);
      } finally {
        console.log("HeroSection: Billboard Fetch Complete");
        setIsLoading(false);
      }
    };

    fetchBillboard();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          dots: false,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="relative w-full xl:h-[calc(100vh-10rem)] aspect-video overflow-hidden rounded-3xl py-6 px-2 sm:p-4 lg:p-6 bg-gray-100 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-full max-w-md mx-auto h-8 bg-gray-300 rounded-lg mb-4"></div>
            <div className="w-3/4 mx-auto h-4 bg-gray-300 rounded-lg mb-2"></div>
            <div className="w-1/2 mx-auto h-4 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full xl:h-[calc(100vh-12rem)] hover:cursor-grab aspect-video overflow-hidden rounded-3xl py-2 px-2 sm:p-4 lg:p-6">
      {billboard && billboard.images && billboard.images.length > 0 ? (
        <Slider {...settings}>
          {billboard.images.map((image) => (
            <div key={image.id} className="w-full h-full relative">
              <Image
                src={image.url}
                alt={image.id || "Billboard Image"}
                width={1920}
                height={1080}
                className="w-full h-full xl:h-[calc(100vh-12rem)] object-cover rounded-3xl hover:cursor-grab"
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-3xl">
          No images available
        </div>
      )}
    </div>
  );
}
