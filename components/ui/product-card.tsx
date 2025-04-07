"use client";

import { Product, ProductVariant, Category, Badge, Image } from "@/types";
import NextImage from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart, Loader2, Tag, Check } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState, useMemo, memo } from "react";
import usePreviewModal from "@/hooks/use-preview-model";
import useCart from "@/hooks/use-cart";
import { Badge as BadgeComponent } from "@/components/ui/badge";
import getProduct from "@/actions/get-product";
import GifLoader from "./one-loder";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import cn from "classnames";

interface ProductCardProps {
  data: Product;
  variants?: ProductVariant[];
  categories?: Category[];
  badges?: Badge[];
  productBanner?: Image[];
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({
    data,
    variants = [],
    categories = [],
    badges = [],
    productBanner = [],
  }) => {
    const router = useRouter();
    const cart = useCart();
    const previewModal = usePreviewModal();
    const [imageIndex, setImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Memoize image URL to prevent unnecessary re-renders
    const imageUrl = useMemo(() => {
      if (imageError) return "/placeholder.png";
      return data?.images?.length
        ? data.images[imageIndex].url
        : "/placeholder.png";
    }, [data?.images, imageIndex, imageError]);

    // Calculate least price from variants
    const leastPrice = useMemo(() => {
      if (variants.length === 0) return data?.price || 0;
      return Math.min(...variants.map((variant) => variant.price || 0));
    }, [variants, data?.price]);

    // Calculate least MRP from variants
    const leastMrp = useMemo(() => {
      if (variants.length === 0) return data?.mrp || 0;
      return Math.min(...variants.map((variant) => variant.mrp || 0));
    }, [variants, data?.mrp]);

    // Calculate discount percentage based on least price
    const discountPercentage = useMemo(() => {
      if (!leastPrice || !leastMrp) return 0;
      return Math.round(((leastMrp - leastPrice) / leastMrp) * 100);
    }, [leastPrice, leastMrp]);

    // Memoize price calculation
    const discountedPrice = useMemo(() => {
      return leastPrice;
    }, [leastPrice]);

    const handleClick = async () => {
      setIsNavigating(true);
      try {
        router.prefetch(`/product/${data?.id}`);
        const productPromise = getProduct(data.id);
        await router.push(`/product/${data?.id}`);
        await productPromise;
      } catch (error) {
        console.error("Navigation error:", error);
      } finally {
        setIsNavigating(false);
      }
    };

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
      event.stopPropagation();
      previewModal.onOpen(data);
    };

    const onAddToCart = () => {
      // Determine the variant to use
      const selectedVariant = variants.length > 0 ? variants[0] : null;

      // Prepare product data for cart
      const cartProduct = {
        ...data,
        ...(selectedVariant && {
          price: selectedVariant.price,
          mrp: selectedVariant.mrp,
          selectedVariant: {
            ...selectedVariant,
            colorId: selectedVariant.colorId,
            sizeId: selectedVariant.sizeId,
          },
        }),
        quantity: 1,
      };

      // Validate before adding to cart
      if (!isAddingToCart) {
        setIsAddingToCart(true);

        // Simulate async operation (optional)
        setTimeout(() => {
          try {
            cart.addItem(cartProduct);
            // toast.success('Product added to cart', {
            //   icon: '🛒',
            //   style: {
            //     borderRadius: '10px',
            //     background: '#333',
            //     color: '#fff',
            //   }
            // });
          } catch (error) {
            // toast.error('Failed to add product to cart', {
            //   icon: '❌',
            //   style: {
            //     borderRadius: '10px',
            //     background: '#ff4444',
            //     color: '#fff',
            //   }
            // });
          } finally {
            setIsAddingToCart(false);
          }
        }, 500);
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (data?.images?.length > 1) {
        setTimeout(() => {
          setImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
        }, 1200);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTimeout(() => {
        setImageIndex(0);
      }, 500);
    };

    return (
      <article
        className={cn(
          "bg-white group cursor-pointer rounded-xl p-1 border border-black/10 aspect-auto relative flex flex-col h-full",
          
        )}
        aria-label={`Product: ${data.name}`}
        role="article"
      >
        {/* Out of Stock Overlay */}
        {data.isOutOfStock && (
          <div className="absolute inset-0 bg-black/10 rounded-xl z-10 flex items-center justify-center">
            <div className="bg-white/80 px-4 py-2 rounded-md shadow-md">
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">
                Out of Stock
              </span>
            </div>
          </div>
        )}

        <div className="hidden sm:flex justify-between absolute top-3 left-2 z-10 bg-green-900 text-white px-2 py-1 rounded-full text-xs font-bold">
          <span className="">
            {(() => {
              // Debugging: log the full badges object
              // console.log("Full badges object:", JSON.stringify(badges, null, 2));

              // Check if badges is an array and has length
              if (Array.isArray(badges) && badges.length > 0) {
                // Extract badge label from nested object
                const firstBadge = badges[0];
                
                // Check if badge object exists and has a label
                if (firstBadge.badge && firstBadge.badge.label) {
                  return firstBadge.badge.label;
                }
              }
              
              // If no badges found, return empty string
              return "";
            })()}
          </span>
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 right-2 z-10 bg-red-900 text-white px-2 py-1 rounded-full text-xs font-bold">
            {discountPercentage}% OFF
          </div>
        )}

        <div
          onClick={handleClick}
          className="aspect-square rounded-xl bg-gray-100 relative overflow-hidden transition-transform duration-500 ease-in-out hover:scale-100 truncate flex-shrink-0"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Product image"
        >
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
          )}

          <NextImage
            alt={data.name || "Product image"}
            src={imageUrl}
            fill
            onClick={handleClick}
            className={cn(
              "aspect-square object-cover rounded-md transition-transform duration-700 ease-in-out hover:scale-110 overflow-hidden",
              data.isOutOfStock && "opacity-50"
            )}
            onLoadingComplete={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
            quality={75}
          />

          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              <IconButton
                onClick={onPreview}
                icon={<Expand size={20} className="text-gray-600" />}
                aria-label="Expand product details"
              />
              <IconButton
                onClick={onAddToCart}
                icon={
                  isAddingToCart ? (
                    <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                  ) : (
                    <ShoppingCart size={20} className="text-gray-600" />
                  )
                }
                aria-label="Add to cart"
              />
            </div>
          </div>

          {isNavigating && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <GifLoader />
            </div>
          )}
        </div>

        <div className="flex flex-col mt-2 px-1 flex-grow">
          <h3
            onClick={handleClick}
            className={cn(
              "text-sm font-medium capitalize text-balance truncate h-[2.5rem]", // Fixed height for consistent title spacing
              data.isOutOfStock && "text-gray-400 line-through"
            )}
          >
            {data.name?.slice(0, 40) || "Unnamed Product"}...
          </h3>

          <div className="flex items-center justify-between w-full mt-1">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="text-[#3D1D1D] font-bold text-sm">MRP: </span>
              {leastMrp > leastPrice && (
                <del className="flex text-slate-500 text-xs mr-2">
                  <Currency value={leastMrp} />
                </del>
              )}
              <span className="text-[#3D1D1D] font-bold text-sm">
                <Currency value={leastPrice} />
              </span>
            </div>
            <span className="text-xs text-slate-500 ml-2">(₹/100g)</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600 mt-1">
            {variants.length > 0 && (
              <div className="flex items-center space-x-1">
                <span className="font-medium">Size:</span>
                <span className="min-w-[50px] inline-block text-center">
                  {variants[0].size?.value ? variants[0].size.value.toUpperCase() : (variants[0].sizeId || "N/A").toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="py-2 mt-auto">
            <button
              onClick={onAddToCart}
              className={cn(
                "w-full bg-[#3D1D1D] hover:bg-[#6c3d3d] text-white rounded-lg text-center hover:bg-opacity-90 transition-colors font-semibold text-xs py-2",
                data.isOutOfStock && "opacity-50 cursor-not-allowed"
              )}
            >
              {isAddingToCart ? "Adding..." : data.isOutOfStock ? "Out of Stock" : "Add To Cart"}
            </button>
          </div>
        </div>
      </article>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
