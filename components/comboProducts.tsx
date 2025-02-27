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
  // title: string;
  items: Product[];
  isLoading?: boolean;
  error?: Error | null;
}

const ComboProduct: React.FC<comboProductProps> = ({
  // title,
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
      className=" bg-white rounded-full p-1 md:p-2 shadow-md z-10 hover:bg-gray-100 transition-colors"
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6 text-gray-700" />
    </button>
  );

  const PrevArrow = () => (
    <button
      onClick={() => sliderRef.current?.slickPrev()}
      className=" bg-white rounded-full p-1 md:p-2 shadow-md z-10 hover:bg-gray -100 transition-colors"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6 text-gray-700" />
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerPadding: "80px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "0px",
        },
      },
    ],
   
  };

  return (
    <div className="h-full">
      <section
        aria-labelledby="product-list-heading"
        className=" relative bg-no-repeat bg-center bg-cover "
      >
        {items.length === 0 && <NoResult />}
        <div
          className="relative lg:px-24 rounded-3xl lg:rounded-none"
          style={{
            backgroundImage:
              "url(https://cloud.appwrite.io/v1/storage/buckets/67a9cbfa001285dc191f/files/67bf458b002853f04e4e/view?project=67a96cd2001e32766970&mode=admin)",
            backgroundSize: "cover",
            backgroundPosition: "",
            width: "100%",
            minHeight: "45vh",
            maxHeight: "90vh",
            backgroundColor: "#f0f0f0",
          }}
        >
          <div className="flex justify-center space-x-5 py-5">
            <div className=" text-white py-5 text-left  px-5 lg:px-10">
              <h1 className="text-xl md:text-3xl font-bold  w-full">
                Go "COMBO" on Nutrition With DRYAURA
              </h1>
              <p className="text-xs lg:text-base ">
                Experience the power of nature in our premium range of
                health-friendly products. Choose from our wide selection of
                nutrient-dense nuts, seeds, and dried fruits to fuel your
                active lifestyle.
              </p>
            </div>
            <div className="flex justify-center items-center space-x-5 pr-4 lg:pr-20 ">
              <PrevArrow />
              <NextArrow />
            </div>
          </div>

          <Slider ref={sliderRef} {...settings} className="ml-4 ">
            {items.map((item, index) => (
              <div key={item.id}>
                <motion.article
                  role="listitem"
                  className="hover:shadow-lg transition-shadow duration-200 snap-center border-2 border-white rounded-xl   mx-1 bg-black p-2  "
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
    </div>
  );
};

export default ComboProduct;
