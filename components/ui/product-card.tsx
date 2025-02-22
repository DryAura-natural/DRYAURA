"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart, Loader2 } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState, useEffect, memo } from "react";
import usePreviewModal from "@/hooks/use-preview-model";
import useCart from "@/hooks/use-cart";
import { Badge } from "@/components/ui/badge"
import getProduct from "@/actions/get-product";
import GifLoader from "./one-loder";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ data }) => {
  const router = useRouter();
  const cart = useCart();
  const previewModal = usePreviewModal();
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [imageIndex]);

  const handleClick = async () => {
    setIsNavigating(true);
    try {
      router.prefetch(`/product/${data?.id}`);
      const productPromise = getProduct(data.id);
      await router.push(`/product/${data?.id}`);
      await productPromise;
    } finally {
      setIsNavigating(false);
    }
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    setIsAddingToCart(true);
    try {
      await cart.addItem(data);
    } finally {
      setIsAddingToCart(false);
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
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl p-2 border hover:shadow-lg aspect-auto relative"
      aria-label={`Product: ${data.name}`}
      role="article"
    >
      <div className="flex justify-between">
        <Badge variant="outline" className="bg-green-900 text-white z-20">80% off</Badge>
        <Badge variant="outline" className="bg-red-500 text-white z-20">sale</Badge>
      </div>
      <div
        className={`aspect-square rounded-xl bg-gray-100 relative overflow-hidden transition-transform duration-500 ease-in-out ${
          isHovered ? "scale-105" : "scale-100"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Product image"
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
        )}

        <Image
          alt={data.name}
          src={imageError ? "/placeholder.png" : (data?.images?.length ? data.images[imageIndex].url : "/placeholder.png")}
          fill
          onClick={handleClick}
          className="aspect-square object-cover rounded-md transition-transform duration-700 ease-in-out"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
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

      <div className="flex flex-col">
        <div className="flex justify-between">
          <h3 className="font-semibold  py-2 truncate text-base md:text-lg">{data.name}...</h3>
        </div>
        <div className="font-light text-sm md:text-lg ">{data.description?.slice(0,50) || 'No description available'}...</div>
        <div className="flex items-center space-x-5 flex-wrap text-sm md:text-lg mb-2">
          MRP: <del className="text-red-500 font-semibold">1200</del>
          <span className="text-green-900"><Currency value={data?.price} /></span>
          <span className="text-sm">(incl. of all taxes)</span>
        </div>
        <div className="bg-[#3D1D1D] text-white p-2 rounded-lg text-center hover:bg-opacity-90 transition-colors">
          Add To Cart
        </div>
      </div>
    </article>
  );
});

export default ProductCard;