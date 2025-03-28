"use client";

import { Product, ProductVariant } from "@/types";
import Image from "next/image";
import IconButton from "./ui/icon-button";
import { Plus, Minus, X } from "lucide-react";
import Currency from "./ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import { useMemo } from "react";

interface ExtendedProduct extends Product {
  colorId?: string | null;
  sizeId?: string | null;
  color?: { value?: string; name?: string } | null;
}

interface CartItemProps {
  data: ExtendedProduct & {
    quantity: number | null;
    selectedVariant?: ProductVariant & {
      colorId?: string | null;
      sizeId?: string | null;
      color?: { value?: string; name?: string } | null;
      size?: { value?: string; name?: string } | null;
    } | null;
  };
}

const truncateText = (text: string, maxLength: number = 40): string => {
  if (!text) return '';
  const trimmedText = text.trim();
  return trimmedText.length > maxLength 
    ? trimmedText.slice(0, maxLength).split(' ').slice(0, -1).join(' ') + '...'
    : trimmedText;
};

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const handleRemove = () => {
    const uniqueCartId = data.selectedVariant?.sizeId 
      ? `${data.id}-${data.selectedVariant.sizeId}`
      : data.id;
    cart.removeItem(uniqueCartId);
  };

  const handleDecrement = () => {
    const uniqueCartId = data.selectedVariant?.sizeId 
      ? `${data.id}-${data.selectedVariant.sizeId}`
      : data.id;

    if (data.quantity && data.quantity > 1) {
      cart.decrementItem(uniqueCartId);
    } else {
      toast.error('Minimum quantity reached!');
    }
  };

  const handleIncrement = () => {
    const uniqueCartId = data.selectedVariant?.sizeId 
      ? `${data.id}-${data.selectedVariant.sizeId}`
      : data.id;

    if (data.quantity && data.quantity < 5) {
      cart.incrementItem(uniqueCartId);
    } else {
      toast.error('Maximum quantity reached!');
    }
  };

  // Calculate price with robust fallback
  const itemPrice = useMemo(() => {
    const basePrice = 
      data.selectedVariant?.price || 
      data.price || 
      data.selectedVariant?.mrp || 
      0;
    return Number(basePrice);
  }, [data]);

  // Calculate discount percentage
  const discountPercentage = useMemo(() => {
    const mrp = data.selectedVariant?.mrp || data.mrp;
    const price = data.selectedVariant?.price || data.price;
    
    if (mrp && price && mrp > price) {
      return Math.round(((mrp - price) / mrp) * 100);
    }
    return 0;
  }, [data]);

  return (
    <li className="flex py-4 border-b rounded-xl px-2 border-gray-200 bg-gray-50 hover:bg-gray-50 transition-colors duration-200">
      {/* Product Image */}
      <div className="relative h-24 w-24 rounded-lg overflow-hidden sm:h-32 sm:w-32 border border-gray-200 shadow-sm">
        <Image
          fill
          src={data.images?.[0]?.url ?? '/fallback-image.jpg'}
          alt={data.name || 'Product'}
          className="object-cover object-center"
        />
      </div>


      {/* Product Details */}
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        {/* Remove Button */}
        <div className="absolute z-10 right-0 -top-1">
          <IconButton 
            onClick={handleRemove} 
            icon={<X size={18} />} 
            className="hover:bg-red-50 hover:text-red-600 text-black transition-colors duration-200"
          />
        </div>

        {/* Product Name and Quantity Controls */}
        <div className="relative pr-9 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200">
              {truncateText(data.name || 'Unnamed Product')}
            </p>
          </div>

          {/* Color and Size Details */}
          <div className="mt-1 flex text-sm text-gray-600 space-x-4">
            {(data.selectedVariant || data) && (
              <>
                {(data.selectedVariant?.sizeId || data.sizeId) && (
                  <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
                    <span className="font-medium">Size:</span>
                    <span>
                      {data.selectedVariant?.size?.value || 
                       data.selectedVariant?.size?.name || 
                       data.selectedVariant?.sizeId || 
                       data.sizeId || 
                       'N/A'}
                    </span>
                  </div>
                )}
                {(data.selectedVariant?.colorId || data.colorId) && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Color:</span>
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300" 
                      style={{ 
                        backgroundColor: data.selectedVariant?.color?.value || 
                                        data.color?.value || 
                                        'transparent' 
                      }}
                    />
                    <span>
                      {data.selectedVariant?.color?.value || 
                       data.selectedVariant?.color?.name || 
                       data.selectedVariant?.colorId || 
                       data.colorId || 
                       'N/A'}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Quantity Controls and Price */}
          <div className="mt-4 flex sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex w-fit items-center space-x-2 border border-gray-200 rounded-lg p-1">
              <button
                onClick={handleDecrement}
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 w-8 h-8 flex items-center justify-center"
                aria-label="Decrease quantity"
              >
                <Minus size={14} className="text-gray-700" />
              </button>
              <span className="text-base font-medium text-gray-800 w-8 text-center">
                {data.quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 w-8 h-8 flex items-center justify-center"
                aria-label="Increase quantity"
              >
                <Plus size={14} className="text-gray-700" />
              </button>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              <Currency 
                value={itemPrice * Number(data.quantity || 1)} 
              />
              {discountPercentage > 0 && (
                <span className="ml-2 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
              