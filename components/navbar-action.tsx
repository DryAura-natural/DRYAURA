"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button"; // Using shadcn/ui for better styling
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

export const NavbarAction = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();
  const router = useRouter();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center gap-x-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-md hover:bg-white/20 transition duration-300 ease-in-out"
      >
        <ShoppingBag size={22} className="text-white" />
        <span className="text-base font-semibold text-white">{cart.items.length}</span>
      </Button>
    </div>
  );
};
