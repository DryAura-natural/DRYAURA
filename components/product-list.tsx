"use client";
import { Product } from "@/types";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import { Inter } from "next/font/google";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import cn from "classnames";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface ProductListProps {
  title: string;
  items: Product[];
  enableCategoryFilter?: boolean;
  categories?: string[];
  limit?: number;
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items,
  enableCategoryFilter = false,
  categories = [],
  limit = 6,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);

  // Extract unique categories from items
  const availableCategories = useMemo(() => {
    return Array.from(new Set(
      items.flatMap((item) => 
        item.categories.map(cat => cat.category?.name).filter(Boolean)
      )
    ));
  }, [items]);

  // Filter logic
  const filteredItems = useMemo(() => {
    let result = items;

    // Category filtering
    if (selectedCategories.length > 0) {
      result = result.filter(item => 
        item.categories.some(cat => 
          selectedCategories.includes(cat.category?.name || '')
        )
      );
    }

    // Apply limit
    return result.slice(0, limit);
  }, [items, selectedCategories, limit]);

  // Toggle category selection
  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };




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
    const shouldShowCarousel = filteredItems.length > 6;
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
  }, [filteredItems.length]);

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

      {/* {renderCategoryFilter()} */}

      {filteredItems.length === 0 && <NoResult />}

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
            {filteredItems.map((item, index) => (
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
