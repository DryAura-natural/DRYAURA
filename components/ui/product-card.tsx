"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import usePreviewModal from "@/hooks/use-preview-model";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const cart = useCart();
  const previewModal = usePreviewModal(); 
  const [imageIndex, setImageIndex] = useState(0); // Track current image
  const [isHovered, setIsHovered] = useState(false); // Control zoom effect

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  // Handle hover effect for image zoom and image switch
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (data?.images?.length > 1) {
      setTimeout(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
      }, 1200); // Change image after delay
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => {
      setImageIndex(0); // Reset image after delay
    }, 500);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Image Container with Smooth Zoom Effect */}
      <div
        className={`aspect-square rounded-xl bg-gray-100 relative overflow-hidden transition-transform duration-500 ease-in-out ${
          isHovered ? "scale-105" : "scale-100"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          alt="Product Image"
          src={data?.images?.length ? data.images[imageIndex].url : "/placeholder.png"}
          fill
          className="aspect-square object-cover rounded-md transition-transform duration-700 ease-in-out"
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }} // Always zoom inside the container
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>

      <div className="flex items-center justify-between">
        Price: <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
