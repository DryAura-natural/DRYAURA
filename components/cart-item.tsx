"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "./ui/icon-button";
import { Plus, Minus, X } from "lucide-react";
import Currency from "./ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";

interface CartItemProps {
  data: Product & { quantity: number }; // Add quantity field
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const handleRemove = () => {
    cart.removeItem(data.id);
  };

  const handleIncrement = () => {
    if (data.quantity < 5) {
      cart.incrementItem(data.id);
    } else {
      toast.error('Maximum quantity reached!');
    }
  };

  const handleDecrement = () => {
    if (data.quantity > 1) {
      cart.decrementItem(data.id);
    } else {
      toast.error('Minimum quantity reached!');
    }
  };

  return (
    <li className="flex py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
      {/* Product Image */}
      <div className="relative h-24 w-24 rounded-lg overflow-hidden sm:h-32 sm:w-32 border border-gray-200 shadow-sm">
        <Image
          fill
          src={data.images?.[0]?.url ?? '/fallback-image.jpg'}
          alt={data.name}
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
            className="hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
          />
        </div>

        {/* Product Name and Quantity Controls */}
        <div className="relative pr-9 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200">{data.name}</p>
          </div>

          {/* Color and Size Details */}
          <div className="mt-1 flex text-sm text-gray-600 space-x-4">
            <p>{data.color.name}</p>
            <p className="border-l border-gray-200 pl-4">{data.size.name}</p>
          </div>

          {/* Quantity Controls and Price */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-2 border border-gray-200 rounded-lg p-1">
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
              <Currency value={Number(data.price) * Number(data.quantity)} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;