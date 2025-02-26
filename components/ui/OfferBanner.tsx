import React from "react";
import Marquee from "react-fast-marquee";

interface OfferBannerProps {
  className?: string;
}

const OfferBanner: React.FC<OfferBannerProps> = ({ className }) => {
  return (
    <div className={`bg-black text-white overflow-hidden ${className}`}>
      <Marquee speed={40} pauseOnHover={true} className="flex gap-x-10 p-2">
        <span>🎉 Free Delivery on All Orders! 🎉</span>
        <span>||</span>
        <span>🔥 Use Code: SAVE40 to Get 40% Off! 🔥</span>
      </Marquee>
    </div>
  );
};

export default OfferBanner;