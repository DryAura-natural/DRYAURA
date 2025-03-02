import React, { useRef } from 'react';
import { useGesture } from '@use-gesture/react';

interface ScrollableContainerProps {
  children: React.ReactNode;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGesture({
    onDrag: ({ offset: [x, y] }) => {
      if (containerRef.current) {
        containerRef.current.scrollLeft = -x;
        containerRef.current.scrollTop = -y;
      }
    },
  }, {
    target: containerRef,
    eventOptions: { passive: false },
  });

  return (
    <div 
      ref={containerRef}
      style={{ 
        overflow: 'auto', 
        width: '100%', 
        height: '100%',
        scrollBehavior: 'smooth',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollableContainer;
