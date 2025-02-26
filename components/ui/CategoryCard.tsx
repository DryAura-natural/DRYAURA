"use client";
import React from "react";
import Link from "next/link"; // Import Link from next/link
import Image from "next/image"; // Import Image from next/image
import { categories } from "@/constants/categories";
import { motion } from "framer-motion";

interface Category {
  background: string;
  name: string;
  hoverImageUrl: string;
  link: string;
}


const CategoryCard: React.FC = () => {
  return (
    <div className="flex overflow-x-auto hide-scrollbar pb-0 pt-5 space-x-2 scroll-smooth lg:justify-center w-full">
      {categories.map((category, index) => (
        <Link key={index} href={category.link} passHref>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="relative group w-20 h-20 aspect-square sm:w-32 sm:h-32 cursor-pointer"
          >
            <div className={`w-full h-full rounded-full overflow-hidden shadow-lg ${category.background}`}>
              <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2 drop-shadow-sm">
                <motion.div
                  whileHover={{ y: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={category.hoverImageUrl}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="object-cover rounded-lg transition-transform duration-300 hover:animate-flip hover:scale-110"
                  />
                </motion.div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 text-center bg-white bg-opacity-80 p-1 rounded-b-full text-xs">
              <span className="font-semibold text-gray-800">{category.name}</span>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCard;