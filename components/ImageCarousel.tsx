"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const imageData = [
  {
    id: 1,
    title: "Boost Your Immunity",
    description: "Powerful natural ingredients for optimal health",
    imgSrc:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ed39dd002ceeaaa12b/view?project=67a96cd2001e32766970&mode=admin",
    bgColor: "#E6F3FF",
    textColor: "#1A5F7A",
    buttonColor: "#1A5F7A"
  },
  {
    id: 2,
    title: "Nourish Your Brain",
    description: "Cognitive enhancement through natural nutrition",
    imgSrc:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67ed39eb000e5df46e1e/view?project=67a96cd2001e32766970&mode=admin",
    bgColor: "#FFF0E1",
    textColor: "#8B4513",
    buttonColor: "#8B4513"
  },
  {
    id: 3,
    title: "Energy Unleashed",
    description: "Supercharge your day with natural vitality",
    imgSrc:
      "https://cloud.appwrite.io/v1/storage/buckets/67a96d700017b622e519/files/67b5f9c600138cb2fb9a/view?project=67a96cd2001e32766970&mode=admin",
    bgColor: "#E8F5E9",
    textColor: "#2E7D32",
    buttonColor: "#2E7D32"
  }
];

const ImageCarousel = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleImageChange = useCallback((newIndex: number) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleImageChange((currentIndex + 1) % imageData.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, handleImageChange]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageData.length - 1 : currentIndex - 1;
    handleImageChange(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === imageData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    handleImageChange(newIndex);
  };

  const currentSlide = imageData[currentIndex];

  return (
    <div 
      className="relative w-full h-[40vh] md:h-[70vh] overflow-hidden  rounded-xl "
      style={{ backgroundColor: currentSlide.bgColor }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              goToNext();
            } else if (swipe > swipeConfidenceThreshold) {
              goToPrevious();
            }
          }}
          className="absolute w-full h-full flex items-center justify-center "
        >
          <div className="flex items-center justify-center w-full h-full ">
            <div className="w-full max-w-6xl mx-auto flex  items-center">
              <div className=" pl-5 space-y-6 ">
                <motion.h2 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold "
                  style={{ color: currentSlide.textColor }}
                >
                  {currentSlide.title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg"
                  style={{ color: currentSlide.textColor }}
                >
                  {currentSlide.description}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center truncate px-4 py-2 rounded-full text-white font-semibold transform transition hover:scale-105 text-sm w-fit"
                  style={{ backgroundColor: currentSlide.buttonColor }}
                  onClick={() => router.push('/collections/all')}
                >
                  <Zap className="mr-2" /> Explore Now
                </motion.button>
              </div>
              <div className="w-1/2 flex justify-center">
                <motion.img 
                  src={currentSlide.imgSrc} 
                  alt={currentSlide.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="max-h-[500px] object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* <button 
        onClick={goToPrevious} 
        className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition"
      >
        <ChevronLeft className="text-white" size={32} />
      </button> */}
      {/* <button 
        onClick={goToNext} 
        className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition"
      >
        <ChevronRight className="text-white" size={32} />
      </button> */}

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {imageData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleImageChange(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
