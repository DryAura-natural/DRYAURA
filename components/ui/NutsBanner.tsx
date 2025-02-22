import React from 'react';
import { FaShippingFast, FaStar } from 'react-icons/fa';
import { IoThumbsUp } from 'react-icons/io5';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { SiBento } from 'react-icons/si';

const PremiumNutsBanner = () => {
  return (
    <div className="bg-gradient-to-r from-black via-red-900 to-black text-white rounded-lg p-8 md:p-12 w-full mx-auto animate-fade-in ">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Fast Delivery */}
        <div className="flex flex-col items-center text-center">
          <div className="icon-container mb-4">
            <FaShippingFast className="text-white w-12 h-12 md:w-14 md:h-14 animate-scale" />
          </div>
          <p>
            Fast Delivery On Orders Above
            <span className="font-bold"> ₹999</span>
          </p>
        </div>

        {/* Secure Payment */}
        <div className="flex flex-col items-center text-center ">
          <div className="icon-container mb-4">
            <RiSecurePaymentFill className="text-white w-12 h-12 md:w-14 md:h-14 animate-scale" />
          </div>
          <p>Secure Online Payment</p>
        </div>

        {/* Trusted Quality */}
        <div className="flex flex-col items-center text-center">
          <div className="icon-container mb-4">
            <IoThumbsUp className="text-white w-12 h-12 md:w-14 md:h-14 animate-scale" />
          </div>
          <p>Trusted Quality Products</p>
        </div>

        {/* Exclusive Benefits */}
        <div className="flex flex-col items-center text-center">
          <div className="icon-container mb-4">
            <SiBento className="text-white w-12 h-12 md:w-14 md:h-14 animate-scale" />
          </div>
          <p>Exclusive Member Benefits</p>
        </div>
      </div>
    </div>
  );
};

export default PremiumNutsBanner;