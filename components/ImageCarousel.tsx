'use client';

import Image from 'next/image';
import { Button } from './ui/Button';
import { useState, useEffect } from 'react';

const imageData = [
  { id: 1, title: 'Unlock Your Potential', imgSrc: 'https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67b9d6b7002f83896c25/view?project=67a96cd2001e32766970&mode=admin' },
  { id: 2, title: 'A Healthy Brain', imgSrc: 'https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67b9df78002055bc50b0/view?project=67a96cd2001e32766970&mode=admin' },
  // { id: 3, title: 'A Healthy Brain', imgSrc: 'https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9c600138cb2fb9a/view?project=67a96cd2001e32766970&mode=admin' },
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
    <div className="h-[500px]  md:h-[600px] rounded-xl overflow-hidden  py-5">
      <div className="container mx-auto px-4 h-full flex items-center justify-between carousel-container" >
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12  bg-[#800020] rounded-xl py-14 px-6 xl:px-16 relative">
          {/* Text Content */}
          <div className="flex-1 text-cream-light space-y-6  text-white animate-fade-in" >
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
            className="flex-1 absolute top-5 -right-20 md:top-24 md:right-18 lg:top-8 lg:right-26  xl:-top-24 xl:right-18 transform -translate-x-1/2 z-10 transition-all duration-500 ease-in-out hover:scale-105"
          >
            <div className="relative w-[150px] h-[200px] p-5 md:w-[250px] md:h-[200px] lg:w-[300px] lg:h-[200px]  xl:w-[350px] xl:h-[300px] 2xl:w-[450px] 2xl:h-[300px] ">
              <Image
                src={currentImage.imgSrc}
                alt={currentImage.title}
                width={500}
                height={300}
                className="object-cover rounded-lg hover:scale-105 transition-all duration-500 ease-in-out  drop-shadow-2xl shadow-white"
              />
            </div>
          </div>
          <div className='absolute right-0 bottom-0 md:right-5 md:bottom-5 p-2'>
              <Button className="bg-cream text-burgundy bg-white hover:bg-white/80 hover:text-burgundy-dark transition-all duration-300 text-lg px-8 py-6 rounded-full shadow-lg">
                Explore Now
              </Button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
