import { Gem, Minus } from "lucide-react";
import Eliment from "./ui/eliment";
import fresh from "@/app/svg/fresh.svg";
import energy from "@/app/svg/energy.svg";
import packaging from "@/app/svg/packaging.svg";
import quality from "@/app/svg/quality.svg";

const OfferBanner = () => {
  return (
    <div className="flex flex-col justify-between items-center max-h-full gap-y-10 ">
      <div className="flex flex-col space-y-3 justify-center items-center bg-white py-4 px-6 w-full max-w-7xl mx-auto">
        <div className="text-2xl md:text-4xl font-medium text-gray-800 mr-4 uppercase text-center">
          Why Trust Our Quality?
        </div>
        <div className="flex justify-center items-center space-x-4">
          <Minus size={40} color="#2D1515" />
          <Gem size={30} color="#2D1515" />
          <Minus size={40} color="#2D1515" />
        </div>
        <div className="max-w-2xl text-center text-xl font-light px-4 sm:px-6">
          Premium Dry Fruits, Pure and Natural, Packed with Care, Freshness
          Guaranteed, Eco-Friendly, and Health-Focused.
        </div>
      </div>
      <div className="flex  justify-center items-center gap-5  w-full  max-w-7xl mx-auto  flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap">
        <Eliment
          src={fresh}
          heading="Fresh Picks"
          subheading="Carefully selected and packed to deliver ultimate freshness and flavor in every bite."
        />
        <Eliment
          src={packaging}
          heading="Eco Packaging"
          subheading="Embracing sustainability with eco-friendly, 100% recyclable packaging that’s good for you and the planet."
        />
        <Eliment
          src={quality}
          heading="Premium Quality"
          subheading="Sourced from trusted farms, ensuring the highest quality and purity in every piece."
        />
        <Eliment
          src={energy}
          heading="Energy Boost"
          subheading="Packed with essential nutrients to provide you with a natural and sustained energy boost throughout the day."
        />
      </div>
    </div>
  );
};

export default OfferBanner;
