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
    <div className="flex overflow-x-auto hide-scrollbar space-x-4 z-50 scroll-smooth p-10 justify-center">
      {categories.map((category, index) => (
        <Link key={index} href={category.link} passHref>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="relative group w-24 h-24 aspect-square sm:w-32 sm:h-32 cursor-pointer"
          >
            <div className={`w-full h-full rounded-full overflow-hidden shadow-lg ${category.background}`}>
              <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2 drop-shadow-sm">
                <motion.div
                  whileHover={{ y: -60 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={category.hoverImageUrl}
                    alt={category.name}
                    width={200}
                    height={200}
                    className="object-cover rounded-lg transition-transform duration-300 hover:animate-flip"
                  />
                </motion.div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 text-center bg-white bg-opacity-80 p-1 rounded-b-full text-sm">
              <span className="font-semibold text-gray-800">{category.name}</span>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCard;