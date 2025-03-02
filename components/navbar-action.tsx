"use client";

import { BaggageClaim, ShoppingBag, X,  } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import CartItem from "./cart-item";
import Currency from "./ui/currency";
import emptyCart from "@/public/emptycart.gif";
import Image from "next/image";

interface NavbarActionProps {
  className?: string;
}

export const NavbarAction: React.FC<NavbarActionProps> = ({ className }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useCart();
  const router = useRouter();
  const items = useCart((state) => state.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCartOpen]);

  if (!isMounted) {
    return null;
  }

  const totalPrice = items.reduce((total, item) => {
    const price = Number(parseFloat(item.price)) || 0;
    const quantity = Number(parseInt(item.quantity, 10)) || 0;
    return total + price * quantity;
  }, 0);

  return (
    <div className={`ml-auto flex items-center gap-x-4 ${className}`}>
      <Button
        onClick={() => setIsCartOpen(true)}
        className="relative border-none bg-transparent hover:bg-transparent"
      >
        <BaggageClaim className="text-white h-6 w-6 hover:text-black" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">
          {cart.items.length}
        </span>
      </Button>

      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        />

        <div
          className={`fixed right-0 top-0 h-full w-full md:w-96 sm:w-3/4 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="text-xs bg-black text-white w-full p-2 text-center">
            Free shiping on all order over ₹999
          </div>
          <div className="flex  items-center justify-between p-6 pt-0 border-b">
            <h2 className="text-xl font-semibold text-black">Your Cart</h2>

            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto h-[calc(100%-150px)]">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center gap-x-2">
                <Image src={emptyCart} className="w-40 h-40" alt="empty cart" />
                <p className="text-gray-500">Your cart is empty.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.items.map((item) => (
                  <CartItem data={item} key={item.id} />
                ))}
              </ul>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">
                <Currency value={totalPrice.toString()} />
              </span>
            </div>
            <Button
              onClick={() => {
                router.push("/cart");
                setIsCartOpen(false);
              }}
              className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <ShoppingBag size={24} className="inline-block mr-2" /> Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
