'use client';

import Image from 'next/image';
import { Button } from './ui/Button';
import { useState, useEffect } from 'react';

const imageData = [
  { id: 1, title: 'Unlock Your Potential', imgSrc: 'https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9cd0010a01ed07b/view?project=67a96cd2001e32766970&mode=admin' },
  { id: 2, title: 'A Healthy Brain', imgSrc: 'https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9e7001ff28737da/view?project=67a96cd2001e32766970&mode=admin' },
  { id: 3, title: 'A Healthy Brain', imgSrc: 'https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9c600138cb2fb9a/view?project=67a96cd2001e32766970&mode=admin' },
];
  
const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    const interval = setInterval(() => {
      handleImageChange((currentIndex + 1) % imageData.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleImageChange = (index: number) => {
    const colors = ['#f0f0f0', '#e0e0e0', '#d0d0d0']; // Add your desired colors
    setBgColor(colors[index % colors.length]);
    setCurrentIndex(index);
  };

  const currentImage = imageData[currentIndex];

  return (
    <div className="h-[600px] rounded-xl overflow-hidden  py-5">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 h-full flex items-center justify-between carousel-container" style={{ transition: 'background-color 0.5s ease', backgroundColor: bgColor }}>
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12  bg-[#800020] rounded-xl p-10 relative">
          {/* Text Content */}
          <div className="flex-1 text-cream-light space-y-6 px-10 text-white animate-fade-in" >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in-delay">
              Unlock the Secrets of
              <span className="block mt-2 text-5xl md:text-7xl">
                OPTIMAL
                <br />
                WELLNESS!
              </span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-xl animate-fade-in-delay">
              Discover the powerful connection between nutrition, brain function, and overall well-being.
            </p>
           
          </div>

          {/* Carousel Items */}
          <div
            key={currentImage.id}
            className="flex-1 absolute -top-40 -right-20 transform -translate-x-1/2 z-10 transition-all duration-500 ease-in-out hover:scale-105"
          >
            <div className="relative w-[300px] h-[200px]">
              <Image
                src={currentImage.imgSrc}
                alt={currentImage.title}
                width={500}
                height={300}
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className='absolute right-10 bottom-4'>
              <Button className="bg-cream text-burgundy bg-white hover:bg-cream-dark hover:text-burgundy-dark transition-all duration-300 text-lg px-8 py-6 rounded-full shadow-lg">
                Explore Now
              </Button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
