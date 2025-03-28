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
    <div className="min-h-screen bg-gradient-to-b from-[#3D1D1D]/5 to-[#3D1D1D]/10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#3D1D1D]/5 rounded-full -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3D1D1D]/5 rounded-full translate-x-1/2 translate-y-1/2 z-0"></div>

      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-[#3D1D1D]/10 rounded-full">
              <FiShoppingBag className="w-6 h-6 text-[#3D1D1D]" />
            </div>
            <h1 className="text-3xl font-bold text-[#3D1D1D] tracking-tight">Shopping Cart</h1>
          </div>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-7 bg-transparent  transition-all duration-300 ease-in-out">
              {cart.items.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center py-8 text-sm md:text-base"
                >
                  <FiShoppingBag className="w-6 h-6 mr-2 text-[#3D1D1D]/70" />
                  <p className="text-center text-[#3D1D1D]/70">
                    Your cart is currently empty. Start shopping to add items!
                  </p>
                </motion.div>
              )}
              <ul className="space-y-6 rounded-xl">
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
