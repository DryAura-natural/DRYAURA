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
  items: Product[] | { products?: Product[] };
  isLoading?: boolean;
  error?: Error | null;
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items = [],
  isLoading,
  error,
}) => {
  // Normalize items to always be an array
  const normalizedItems = Array.isArray(items) 
    ? items 
    : (items.products || []);

  if (!Array.isArray(normalizedItems)) {
    console.error('Invalid items prop:', items);
    items = [];
  } else {
    console.log('Product items:', normalizedItems.map((item) => item.name));
  }

  if (error) {
    console.error('Error loading products:', error);
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollAmount = 300;
  const checkScrollPosition = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const buffer = 1;
      setCanScrollLeft(scrollLeft > buffer);
      setCanScrollRight(scrollLeft + clientWidth + buffer < scrollWidth);
    }
  };

  useEffect(() => {
    const shouldShowCarousel = normalizedItems.length > 4;
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
  }, [normalizedItems.length]);


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
  console.log("this is items of product list", normalizedItems.map((item) => item.name));

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

      {normalizedItems.length === 0 && <NoResult />}

      <div className="relative ">
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
            {normalizedItems.map((item, index) => (
              <motion.article
                key={item.id}
                role="listitem"
                className={`hover:shadow-lg transition-shadow duration-200 snap-start ${
                  showControls
                    ? "min-w-[50%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[23%]"
                    : "w-full"
                }`}
              >
                <ProductCard
                  data={item}
                  variants={item.variants}
                  categories={item.categories}
                  badges={item.badges}
                  productBanner={item.productBanner}
                />
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductList;
