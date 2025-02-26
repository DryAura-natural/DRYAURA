"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function HeroSection() {
  const images = [
    {
      src: "https://img.freepik.com/free-psd/food-menu-restaurant-facebook-cover-template_106176-726.jpg?t=st=1740483400~exp=1740487000~hmac=004b115785cef4c79bd038fa35b294be5497131fa80c80a3392f57b979488cd8&w=1800",
      alt: "Restaurant Menu Cover",
    },
    {
      src: "https://img.freepik.com/free-psd/food-menu-delicious-pizza-facebook-cover-banner-template_106176-720.jpg?t=st=1740484618~exp=1740488218~hmac=73900d46e095b7c977a79b47c7f0de7443c933928ba46ac06cea0ec79009a075&w=1800",
      alt: "Delicious Pizza Cover",
    },

  ];

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

  return (
    <div className="relative w-full xl:h-[calc(100vh-10rem)]  hover:cursor-grab aspect-video overflow-hidden rounded-3xl py-6 px-2 sm:p-4 lg:p-6">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full "
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full xl:h-[calc(100vh-12rem)] object-cover rounded-3xl hover:cursor-grab"
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}