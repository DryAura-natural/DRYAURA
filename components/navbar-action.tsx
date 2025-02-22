"use client";

import { ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/Button"; // Using shadcn/ui for better styling
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import CartItem from "./cart-item";
import Currency from "./ui/currency";

interface NavbarActionProps {
  className?: string;
}

export const NavbarAction: React.FC<NavbarActionProps> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // State to control cart drawer
  const cart = useCart();
  const router = useRouter();
  const items = useCart((state) => state.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const totalPrice = items.reduce((total, item) => {
    const price = Number(parseFloat(item.price)) || 0;
    const quantity = Number(parseInt(item.quantity, 10)) || 0;
    return total + price * quantity;
  }, 0);

  return (
    <div className={`ml-auto flex items-center gap-x-4 `}>
      {/* Cart Button */}
      <Button
        onClick={() => setIsCartOpen(true)} // Open cart drawer on click
        className={`relative flex items-center gap-x-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-md hover:bg-white/20 transition duration-300 ease-in-out ${className}`}
      >
        <ShoppingBag size={22} className="text-white" />
        {/* Badge */}
        <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-sm font-semibold">
          {cart.items.length}
        </span>
      </Button>

      {/* Cart Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 ease-in-out ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)} // Close cart drawer on overlay click
        />

        {/* Cart Content */}
        <div
          className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Cart Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="p-6 overflow-y-auto h-[calc(100%-150px)]">
            {cart.items.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {cart.items.map((item) => (
                  <CartItem data={item} key={item.id} />
                ))}
              </ul>
            )}
          </div>

          {/* Cart Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">
                <Currency value={totalPrice.toString()} /> {/* Ensure totalPrice is passed as a string */}
              </span>
            </div>
            <Button
              onClick={() => {
                router.push("/cart");
                setIsCartOpen(false);
              }}
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white transition duration-300 ease-in-out"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};