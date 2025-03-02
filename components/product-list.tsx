"use client";
import { Product } from "@/types";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import { Inter } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface ProductListProps {
  title: string;
  items: Product[];
  isLoading?: boolean;
  error?: Error | null;
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items,
  isLoading,
  error,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollAmount = 300;

  const checkScrollPosition = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      // Add small buffer to account for floating-point precision
      const buffer = 1;
      setCanScrollLeft(scrollLeft > buffer);
      setCanScrollRight(scrollLeft + clientWidth + buffer < scrollWidth);
    }
  };

  useEffect(() => {
    const shouldShowCarousel = items.length > 4;
    setShowControls(shouldShowCarousel);

    if (shouldShowCarousel && containerRef.current) {
      // Initial check after render
      const checkInitialScroll = () => {
        if (containerRef.current) {
          const { scrollWidth, clientWidth } = containerRef.current;
          setCanScrollRight(scrollWidth > clientWidth);
          setCanScrollLeft(false); // Initially at start
        }
      };

      checkInitialScroll();

      const container = containerRef.current;
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, [items.length]);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: index * 0.1, duration: 0.5 },
    }),
  };

  return (
    <section
      aria-labelledby="product-list-heading"
      className="space-y-6 relative"
    >
      <h3
        id="product-list-heading"
        className={`${inter.className} text-xl md:text-3xl text-center font-bold tracking-tight text-gray-900`}
      >
        {title}
      </h3>

      {items.length === 0 && <NoResult />}

      <div className="relative ">
        {/* {showControls && (
          <>
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 transition-all ${
                canScrollLeft
                  ? "opacity-100 hover:bg-gray-100"
                  : "opacity-50 cursor-not-allowed"
              }`}
              aria-label="Scroll left"
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={scrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 transition-all ${
                canScrollRight
                  ? "opacity-100 hover:bg-gray-100"
                  : "opacity-50 cursor-not-allowed"
              }`}
              aria-label="Scroll right"
              disabled={!canScrollRight}
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )} */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            ref={containerRef}
            role="list"
            className={`flex gap-2 p-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory ${
              showControls
                ? "flex-nowrap"
                : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-wrap"
            }`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {items.map((item, index) => (
              <motion.article
                key={item.id}
                role="listitem"
                className={`hover:shadow-lg transition-shadow duration-200 snap-start ${
                  showControls
                    ? "min-w-[80%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[23%]"
                    : "w-full"
                }`}
                variants={cardVariants}
                custom={index}
              >
                <ProductCard data={item} />
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductList;
