"use client";
import { Product } from "@/types";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import { Inter } from "next/font/google";
import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

interface ProductListProps {
  title: string;
  items: Product[];
  enableCategoryFilter?: boolean;
  categories?: string[];
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items,
  enableCategoryFilter = false,
  categories = [],
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const availableCategories = useMemo(() => {
    // If categories are passed, use only those
    if (categories.length > 0) {
      return categories;
    }
    
    // Otherwise, extract from items
    return Array.from(new Set(
      items.flatMap((item) =>
        item.categories.map((cat) => cat.name)
      )
    ));
  }, [items, categories]);

  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const filteredItems = useMemo(() => {
    // If categories are explicitly passed, filter strictly to those categories
    if (categories.length > 0) {
      return items.filter(item => 
        item.categories.some(cat => 
          cat.name && categories.some(passedCat => 
            passedCat && 
            cat.name.toLowerCase().trim() === passedCat.toLowerCase().trim()
          )
        )
      );
    }

    // If no categories passed and filtering is enabled, use selected categories
    if (enableCategoryFilter && selectedCategories.length > 0) {
      return items.filter(item => 
        item.categories.some(cat => 
          cat.name && selectedCategories.includes(cat.name)
        )
      );
    }

    // If no filtering conditions, show all items
    return items;
  }, [items, categories, selectedCategories, enableCategoryFilter]);

  const renderCategoryFilter = () => {
    // Only show filter if enableCategoryFilter is true and there are categories
    if (!enableCategoryFilter || availableCategories.length === 0)
      return null;

    return (
      <div className="mb-6 space-y-4">
        <h4 className="text-lg font-semibold text-center text-gray-700">
          {categories.length > 0 
            ? `${categories.join(', ')} Products` 
            : 'Filter Products by Category'}
        </h4>
        <div className="flex flex-wrap justify-center gap-2">
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategoryFilter(category)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedCategories.includes(category)
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Clear Filters Button */}
        {selectedCategories.length > 0 && (
          <div className="text-center mt-4">
            <button
              onClick={() => setSelectedCategories([])}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Filter Summary */}
        {selectedCategories.length > 0 && (
          <div className="text-center text-sm text-gray-600 mt-2">
            Showing {filteredItems.length} of {items.length} products
          </div>
        )}
      </div>
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
    const shouldShowCarousel = filteredItems.length > 4;
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

      {renderCategoryFilter()}

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
