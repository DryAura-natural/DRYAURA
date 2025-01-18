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
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt={data.name}
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
     <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
    <p className="text-lg font-semibold text-black">{data.name}</p>
    <div className="flex items-center justify-center space-x-2 mt-2 sm:mt-0 sm:ml-4 border p-1 rounded-full bg-gray-700 text-white w-24">
      <button
        onClick={onDecrement}
        className="bg-gray-200 p-2 rounded-full text-sm hover:bg-gray-300 text-black"
      >
        <Minus size={12} />
      </button>
      <span className="text-lg font-semibold">{data.quantity}</span>
      <button
        onClick={onIncrement}
        className="bg-gray-200 p-2 rounded-full text-sm hover:bg-gray-300 text-black"
      >
        <Plus size={12} />
      </button>
    </div>
  </div>
  <div className="mt-1 flex text-sm">
    <p className="text-gray-500">{data.color.name}</p>
    <p className="text-gray-500 ml-4 border-1 border-gray-200 pl-4">{data.size.name}</p>
  </div>
  <Currency value={data.price * data.quantity} />
</div>

      </div>
    </li>
  );
};

export default CartItem;
