"use client";
import { Product } from "@/types";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import { Inter } from "next/font/google";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface comboProductProps {
  title: string;
  items: Product[];
  isLoading?: boolean;
  error?: Error | null;
}

const ComboProduct: React.FC<comboProductProps> = ({
  title,
  items,
  isLoading,
  error,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(items.length > 4);
  const sliderRef = useRef<Slider>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (error) {
    return (
      <div className="text-red-500 font-sans text-base">
        Error loading products: {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
      },
    }),
  };

  const NextArrow = () => (
    <button
      onClick={() => sliderRef.current?.slickNext()}
      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition-colors"
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6 text-gray-700" />
    </button>
  );

  const PrevArrow = () => (
    <button
      onClick={() => sliderRef.current?.slickPrev()}
      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition-colors"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6 text-gray-700" />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerPadding: '80px',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: '20px'
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: '40px'
        }
      }
    ],
  };

  return (
    <section
      aria-labelledby="product-list-heading"
      className="space-y-4 relative"
    >
      <h3
        id="product-list-heading"
        className={`${inter.className} text-3xl md:text-4xl font-semibold tracking-tight text-gray-900`}
      >
        {title}
      </h3>
      {items.length === 0 && <NoResult />}
      <div className="relative lg:px-24">
        <Slider ref={sliderRef} {...settings}>
          {items.map((item, index) => (
            <div key={item.id}>
              <motion.article
                role="listitem"
                className="hover:shadow-lg transition-shadow duration-200 snap-center border-2 border-[#FF9031] rounded-xl mx-1"
                variants={cardVariants}
                custom={index}
              >
                <ProductCard data={item} />
              </motion.article>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ComboProduct;
