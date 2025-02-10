"use client";
import { MouseEventHandler, useState } from "react";
import { Product } from "@/types";
import { ShoppingCart, WalletCards, Plus, Minus } from "lucide-react";
import Currency from "./ui/currency";
import { Button } from "./ui/Button";
import toast from "react-hot-toast";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const cart = useCart(); 
  const route = useRouter();// Initialize quantity state

  const onIncrement = () => {
    if (quantity < 5) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error("Maximum quantity reached!");
    }
  };

  const onDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      toast.error("Minimum quantity reached!");
    }
  };
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };
  const onPurchased: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
    route.push("/cart")
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <p className="rounded-full bg-green-900 text-white px-4 py-1 w-fit">Save 80%</p>

      <div className="mt-3 flex items-end justify-between">
        <p className="text-xl text-gray-900 flex flex-row-reverse gap-2">
          <div className="flex text-lg font-extralight">
            <span>MRP:</span>
            <span className="text-red-700 stroke-current">
              <del><Currency value={1200} /></del>
            </span>
          </div>
          <div className="flex">
            <span>Offer Price:</span>
            <span className="text-green-800">
              <Currency value={data?.price} />
              <span className="text-sm">(incl. of all taxes)</span>
            </span>
          </div>
        </p>
      </div>

      <hr className="my-4" />

      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.name}</div>
        </div>

        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>

        <div className="flex items-center gap-x-4">{data.description}</div>
      </div>

      {/* Quantity Selector */}
      <div className="mt-4 flex items-center space-x-4 n">
        <h3 className="font-semibold text-black">Quantity:</h3>
        <div className="flex items-center space-x-2 border p-1 rounded-full bg-[#3D1D1D] text-white w-24 justify-between">
          <button
            onClick={onDecrement}
            className="bg-gray-200 p-2 rounded-full text-sm hover:bg-gray-300 text-black"
          >
            <Minus size={12} />
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={onIncrement}
            className="bg-gray-200 p-2 rounded-full text-sm hover:bg-gray-300 text-black"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex items-center gap-x-2"  onClick={onAddToCart}>
          Add to Cart <ShoppingCart />
        </Button>
        <Button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 razorpay-affordability-widget" onClick={onPurchased}>
          Buy It Now <WalletCards />
        </Button>
      </div>
    </div>
  );
};

export default Info;
