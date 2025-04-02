"use client";
import { Product } from "@/types";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import { Inter } from "next/font/google";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Package, Sparkles, Star } from "lucide-react";
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
  items = [],
  isLoading,
  error,
}) => {
  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : [];

  // Filter items to only include combo category
  const comboItems = safeItems.filter(item => 
    item.categories.some(category => 
      category.name === 'combo'
    )
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(comboItems.length > 4);
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
        {comboItems.length === 0 && (
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
              <div className="text-white py-5 text-left px-5 lg:px-10">
                <h1 className="text-xl md:text-3xl font-bold w-full flex items-center">
                  <Sparkles className="mr-3 text-yellow-300" size={32} />
                  Coming Soon: DRYAURA Combo Products
                </h1>
                <p className="text-xs lg:text-base mt-3">
                  Get ready for a nutritional revolution! We're crafting unique 
                  combo packages that will transform your health and wellness journey.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center py-10 space-x-8">
              <div className="bg-white/20 rounded-lg p-6 text-center transform transition duration-500 hover:scale-105">
                <Package className="mx-auto text-white mb-3" size={48} />
                <h3 className="text-white font-semibold">Curated Selections</h3>
                <p className="text-white/70 text-sm">Expertly combined nutrition</p>
              </div>
              <div className="bg-white/20 rounded-lg p-6 text-center transform transition duration-500 hover:scale-105">
                <Star className="mx-auto text-white mb-3" size={48} />
                <h3 className="text-white font-semibold">Premium Quality</h3>
                <p className="text-white/70 text-sm">Handpicked ingredients</p>
              </div>
            </div>
            <div className="text-center pb-10">
              <button className="bg-white/30 text-white px-6 py-3 rounded-full hover:bg-white/40 transition duration-300 flex items-center mx-auto">
                <Sparkles className="mr-2" size={20} />
                Notify Me When Available
              </button>
            </div>
          </div>
        )}

        {comboItems.length > 0 && (
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
              {comboItems.map((item, index) => (
                <div key={item.id}>
                  <motion.article
                    role="listitem"
                    className="hover:shadow-lg transition-shadow duration-200 snap-center border-2 border-white rounded-xl   mx-1 bg-black p-2  "
                    variants={cardVariants}
                    custom={index}
                  >
                    <ProductCard data={item} variants={item.variants} categories={item.categories} badges={item.badges} productBanner={item.productBanner}/>
                  </motion.article>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </section>
    </div>
  );
};

export default ComboProduct;
