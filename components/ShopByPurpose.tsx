"use client";

import { Gift, CookingPot, Popcorn, Leaf, GiftIcon } from "lucide-react";
import { useState } from "react";

const categories = [
  {
    title: "Cooking",
    description: "Versatile ingredients for sweet & savory recipes",
    href: "/cooking",
    icon: CookingPot,
    bgColor: "bg-gradient-to-b from-[#952C4D] to-[#C8385E]",
    iconColor: "#952C4D",
  },
  {
    title: "Gifting",
    description: "Elegant gift sets for any occasion",
    href: "/gifting",
    icon: GiftIcon,
    bgColor: "bg-gradient-to-b from-[#916A5E] to-[#563f38]",
    iconColor: "#916A5E",
  },
  {
    title: "Daily Nutrition",
    description: "Essential nutrients for daily health",
    href: "/nutrition",
    icon: Leaf,
    bgColor: "bg-gradient-to-b from-[#6B705C] to-[#4c5042]",
    iconColor: "#6B705C",
  },
  {
    title: "Snacking",
    description: "Healthy snacks for on-the-go lifestyles",
    href: "/snacking",
    icon: Popcorn,
    bgColor: "bg-gradient-to-b from-[#126781] to-[#3e4c50]",
    iconColor: "#126781",
  },
];

const ShopByPurpose = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleClick = (title: string) => {
    setActiveCategory(activeCategory === title ? null : title);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
      <div className="text-center mb-8 space-y-4 animate-fade-in">
        <h2 className="text-lg font-bold tracking-tight">Shop By Purpose</h2>
        <p className="text-base text-[#3e4c50] max-w-2xl mx-auto">
          Find your perfect dry fruits for every occasion and need. &nbsp;From sweet treats to savory dishes, and from healthy snacks to thoughtful gifts, we've got you covered.
        </p>
      </div>

      <div className="flex overflow-x-scroll hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 gap-4  py-10 px-0 md:px-5">
        {categories.map((category) => (
          <div
            key={category.title}
            className={`min-h-[150px] min-w-[150px] ${category.bgColor} rounded-3xl text-white flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 shadow-lg relative group`}
            onClick={() => handleClick(category.title)}
          >
            <div className="absolute -top-8 transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-20 group-hover:opacity-0">
              <category.icon
                className="h-20 w-20 bg-white rounded-full p-2 border-2"
                style={{ color: category.iconColor, borderColor: category.iconColor }}
              />
            </div>
            <h3
              className={`text-sm font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                activeCategory === category.title
                  ? "opacity-0"
                  : "group-hover:top-5 group-hover:translate-y-0"
              }`}
            >
              {category.title}
            </h3>
            <p
              className={`text-xs text-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] px-4 mt-16 ${
                activeCategory === category.title
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByPurpose;
