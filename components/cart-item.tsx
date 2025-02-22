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

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onIncrement = () => {
    if (data.quantity < 5) {
      cart.incrementItem(data.id); // Increment item quantity
    } else {
      toast.error("Maximum quantity reached!"); // Notify user
    }
  };

  const onDecrement = () => {
    if (data.quantity > 1) {
      cart.decrementItem(data.id); // Decrement item quantity
    } else {
      toast.error("Minimum quantity reached!"); // Notify user
    }
  };

  return (
    <li className="flex py-6 border-b flex-wrap">
      {/* Product Image */}
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-32 sm:w-32">
        <Image
          fill
          src={data.images?.[0]?.url ?? "/fallback-image.jpg"} // Safe check + fallback image
          alt={data.name}
          className="object-cover object-center"
        />
      </div>

      {/* Product Details */}
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6 flex-wrap">
        {/* Remove Button */}
        <div className="absolute z-10 right-0 top-10">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>

        {/* Product Name and Quantity Controls */}
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0  ">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>

          {/* Quantity Controls and Price */}
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between flex-wrap">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={onDecrement}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                aria-label="Decrease quantity"
              >
                <Minus size={14} className="text-gray-700" />
              </button>
              <span className="text-lg font-semibold w-6 text-center text-gray-800">
                {data.quantity}
              </span>
              <button
                onClick={onIncrement}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                aria-label="Increase quantity"
              >
                <Plus size={14} className="text-gray-700" />
              </button>
            </div>
            <div className="mt-2 sm:mt-0 overflow-scroll">
              <Currency value={Number(data.price) * Number(data.quantity)} />
            </div>
          </div>

          {/* Color and Size Details */}
          <div className="mt-2 flex text-sm text-gray-500">
            <p>{data.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4">{data.size.name}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;