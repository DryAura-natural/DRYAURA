"use client";

import { Gift, CookingPot, Popcorn, Leaf, GiftIcon } from "lucide-react";
import { useState } from 'react';

const categories = [

  {
    title: 'Cooking',
    description: 'Elevate your dishes with our versatile cooking ingredients. From rich flavors to nutritional boosts, our dry fruits are perfect for both sweet and savory recipes.',
    href: '/cooking',
    icon: CookingPot,
    bgColor: 'bg-gradient-to-b from-[#952C4D] to-[#C8385E]',
    iconColor: '#952C4D'
  },
  {
    title: 'Gifting',
    description: 'Explore our beautifully packaged gift sets, perfect for any occasion. Premium quality dry fruits presented in elegant boxes for thoughtful and healthy gifting.',
    href: '/gifting',
    icon: GiftIcon,
    bgColor: 'bg-gradient-to-b from-[#916A5E] to-[#563f38]',
    iconColor: '#916A5E'
  },
  {
    title: 'Daily Nutrition',
    description: 'Our carefully selected dry fruits provide essential nutrients for your daily health. Support your well-being with our natural, wholesome products every day.',
    href: '/nutrition',
    icon: Leaf,
    bgColor: 'bg-gradient-to-b from-[#6B705C] to-[#4c5042]',
    iconColor: '#6B705C'
  },
  {
    title: 'Snacking',
    description: 'Discover our premium selection of dry fruits perfect for healthy snacking. Packed with nutrients and available in convenient packages for your on-the-go lifestyle.',
    href: '/snacking',
    icon: Popcorn,
    bgColor: 'bg-gradient-to-b from-[#126781] to-[#3e4c50]',
    iconColor: '#126781'
  },
];

const ShopByPurpose = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleClick = (title: string) => {
    setActiveCategory(activeCategory === title ? null : title);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 pt-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 space-y-4 animate-fade-in">
        <h2 className="text-4xl font-bold tracking-tight">Shop By Purpose</h2>
        <p className="text-lg text-[#3e4c50] max-w-2xl mx-auto">
          Find your perfect dry fruits for every occasion and need.
        </p>
      </div>

      <div className="flex overflow-x-scroll hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 gap-4  py-10 px-1 md:px-5">
        {categories.map((category) => (
          <div
            key={category.title}
            className={`min-w-[250px] min-h-[200px] ${category.bgColor} rounded-3xl text-white flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 shadow-lg relative h-full group`}
            onClick={() => handleClick(category.title)}
          >
            <div className="absolute -top-8 transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-20 group-hover:opacity-0">
              <category.icon className="h-20 w-20 bg-white rounded-full p-3 shadow-lg border" style={{ color: category.iconColor, borderColor: category.iconColor }} />
            </div>
            <h3 className={`text-xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${activeCategory === category.title ? 'opacity-0' : 'group-hover:top-5 group-hover:translate-y-0'}`}>
              {category.title}
            </h3>
            <p className={`text-sm text-center transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] px-4 mt-16 ${activeCategory === category.title ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              {category.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopByPurpose;