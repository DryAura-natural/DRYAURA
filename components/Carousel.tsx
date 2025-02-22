import React, { useState } from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{ minWidth: '100%', boxSizing: 'border-box' }}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </div>
      <button
        onClick={goToPrev}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
        Previous
      </button>
      <button
        onClick={goToNext}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;