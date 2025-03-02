import React from 'react';
import Image from 'next/image';
import Truck  from '@/public/truck.gif';
import secure from "@/public/secure.gif";
import quality from "@/public/quality.gif";
import reward from "@/public/reward.gif";

const PremiumNutsBanner = () => {
  const features = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Fast Delivery On Orders Above ₹999',
    },
    {
      icon: secure,
      title: 'Secure Payment',
      description: 'Secure Online Payment',
    },
    {
      icon: quality,
      title: 'Trusted Quality',
      description: 'Trusted Quality Products',
    },
    {
      icon: reward,
      title: 'Exclusive Benefits',
      description: 'Exclusive Member Benefits',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-black via-orange-900 to-black text-white rounded-lg p-8 md:p-12 w-full mx-auto animate-fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center ">
            <div className="icon-container mb-4">
              <Image src={feature.icon} className="md:w-14 md:h-14 animate-pulse" alt={feature.title} height={60} width={60} />
            </div>
            <p>
              <span className="text-sm md:text-base">
                {feature.description}
              </span>
           
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumNutsBanner;