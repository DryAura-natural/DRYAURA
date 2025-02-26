"use client"
import CartItem from "@/components/cart-item";
import { Container } from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import Summary from "./components/summary";
import { FiShoppingBag } from "react-icons/fi";
import { motion } from "framer-motion";

const CartPage = () => {
  const cart = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Ensure that the component is rendered only on the client side.

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-7 bg-white rounded-lg shadow-sm p-6">
              {cart.items.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center py-8 text-sm md:text-base"
                >
                  <FiShoppingBag className="w-6 h-6 mr-2 text-gray-500" />
                  <p className="text-center text-gray-500">
                    Your cart is currently empty.
                  </p>
                </motion.div>
              )}
              <ul className="space-y-6">
                {cart.items.map((item) => (
                  <CartItem data={item} key={item.id} />
                ))}
              </ul>
            </div>

            <div className="mt-8 lg:mt-0 lg:col-span-5 w-full">
              <Summary />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
