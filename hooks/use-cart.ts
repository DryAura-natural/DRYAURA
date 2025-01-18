import { create } from "zustand";
import { Product } from "@/types";
import { createJSONStorage, persist } from "zustand/middleware";
import toast from "react-hot-toast";

interface CartStore {
  items: (Product & { quantity: number })[]; // Add quantity to the Product type
  addItem: (data: Product) => void;
  incrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("Item already in cart", { icon: "🫠" });
        }

        set({ items: [...currentItems, { ...data, quantity: 1 }] }); // Initialize with quantity 1
        toast.success("Item added to cart", { icon: "👏" });
      },
      incrementItem: (id: string) => {
        set({
          items: get().items.map((item) =>
            item.id === id && item.quantity < 5
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
        toast.success("Item quantity incremented", { icon: "👍" });
      },
      decrementItem: (id: string) => {
        set({
          items: get().items.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        });
        toast.success("Item quantity decremented", { icon: "😴" });
      },
      
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success("Item removed from cart", { icon: "😜" });
      },
      removeAll: () => {
        set({ items: [] });
        toast.success("All items removed from cart", { icon: "🗑️" });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
