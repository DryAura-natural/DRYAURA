"use client";
import { Product } from "@/types";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import { Inter } from 'next/font/google';
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });

interface ProductListProps {
  title: string;
  items: Product[];
  isLoading?: boolean;
  error?: Error | null;
}

const ProductList: React.FC<ProductListProps> = ({ title, items, isLoading, error }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(items.length > 4);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (error) {
    return <div className="text-red-500 font-sans text-base">Error loading products: {error.message}</div>;
  }

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>;
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

  return (
    <section aria-labelledby="product-list-heading" className="space-y-4 relative">
      <h3 id="product-list-heading" className={`${inter.className} text-3xl md:text-4xl font-semibold tracking-tight text-gray-900`}>{title}</h3>
      {items.length === 0 && <NoResult />}
      <div className="relative">
        {showScrollButtons && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            ref={containerRef}
            role="list"
            className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-4 md:gap-4 md:p-4 overflow-x-hidden scroll-smooth flex-wrap"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {items.map((item, index) => (
              <motion.article
                key={item.id}
                role="listitem"
                className="hover:shadow-lg transition-shadow duration-200 snap-center"
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
