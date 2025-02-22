import { create } from "zustand";
import { Product } from "@/types";
import { createJSONStorage, persist } from "zustand/middleware";
import toast from "react-hot-toast";

interface CartStore {
  items: (Product & { quantity: number })[]; // Add quantity to the Product type
  addItem: (data: Product) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
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
          toast("Item already in cart", { icon: "🫠" });
          return;
        }

        set({ items: [...currentItems, { ...data, quantity: 1 }] }); // Initialize with quantity 1
        toast.success("Item added to cart", { icon: "👏" });
      },
      incrementItem: (id: string) => {
        set((state) => {
          const item = state.items.find((item) => item.id === id);
          if (item && item.quantity < 5) {
            const updatedItems = state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
            toast.success("Item quantity incremented", { icon: "👍" });
            return { items: updatedItems };
          }
          return state; // No change if item not found or quantity is max
        });
      },
      decrementItem: (id: string) => {
        set((state) => {
          const item = state.items.find((item) => item.id === id);
          if (item && item.quantity > 1) {
            const updatedItems = state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
            toast.success("Item quantity decremented", { icon: "😴" });
            return { items: updatedItems };
          }
          return state; // No change if item not found or quantity is min
        });
      },
      removeItem: (id: string) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== id);
          toast.success("Item removed from cart", { icon: "😜" });
          return { items: updatedItems };
        });
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