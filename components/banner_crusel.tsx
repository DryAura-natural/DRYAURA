import React from "react";

const BannerCrusel = () => {
  return (
    <div className="relative h-[450px]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/6950509/6950509-hd_1920_1080_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center">
        <h1 className="text-white text-4xl md:text-6xl font-normal text-center tracking-wide">
          Building Health, Creating Bonds, Shaping a Better Tomorrow—Join Us on
          the Journey!
        </h1>
      </div>
    </div>
  );
};

export default BannerCrusel;
