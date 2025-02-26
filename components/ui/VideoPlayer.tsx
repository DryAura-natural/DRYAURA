import React from 'react';

const VideoPlayer = () => {
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://youtu.be/NfuyLV2GlB8" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-2">Welcome to Our Store</h1>
          <p className="text-lg">Explore our latest collection</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
