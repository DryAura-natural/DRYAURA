import React from 'react';
import { Apple, Cherry, Clock, Globe, Handshake } from 'lucide-react';

const DryFruitStats = () => {
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {/* Varieties of Dry Fruits */}
      <div className="p-6 text-center max-w-xs w-full ">
        <div className="text-4xl text-[#CDB398] mb-4">
        <Cherry />
        </div>
        <h3 className="text-3xl font-normal text-[#CDB398] font-mono">20+</h3>
        <p className="text-xl font-medium text-gray-600 tracking-wide">Varieties of Dry Fruits</p>
        <p className="mt-4 text-gray-500 font-light">Explore our diverse selection of premium, handpicked dry fruits sourced from the finest farms around the world.</p>
      </div>

      {/* Hours of Quality Testing */}
      <div className="p-6 text-center max-w-xs w-full ">
        <div className="text-4xl text-[#CDB398] mb-4">
          <Clock />
        </div>
        <h3 className="text-3xl font-normal text-[#CDB398] font-mono">120+</h3>
        <p className="text-xl font-medium text-gray-600 tracking-wide">Hours of Quality Testing</p>
        <p className="mt-4 text-gray-500 font-light">We dedicate over 120 hours to carefully filter and test for quality, ensuring that only the finest dry fruits make it to your table.</p>
      </div>

      {/* Dry Fruit Markets */}
      <div className="p-6 text-center max-w-xs w-full ">
        <div className="text-4xl text-[#CDB398] mb-4">
          <Globe />
        </div>
        <h3 className="text-3xl font-normal text-[#CDB398] font-mono">321+</h3>
        <p className="text-xl font-medium text-gray-600 tracking-wide">Dry Fruit Markets</p>
        <p className="mt-4 text-gray-500 font-light">Our premium dry fruits are sold across over 320 markets globally, satisfying every health-conscious customer with the highest quality.</p>
      </div>

      {/* Trusted Dry Fruit Brands */}
      <div className="p-6 text-center max-w-xs w-full ">
        <div className="text-4xl text-[#CDB398] mb-4">
          <Handshake />
        </div>
        <h3 className="text-3xl font-normal text-[#CDB398] font-mono">220+</h3>
        <p className="text-xl font-medium text-gray-600 tracking-wide ">Trusted Dry Fruit Brands</p>
        <p className="mt-4 text-gray-500 font-light">We partner with over 220 renowned brands, carefully filtering and ensuring only the highest quality dry fruits in every pack.</p>
      </div>
    </div>
  );
}

export default DryFruitStats;
