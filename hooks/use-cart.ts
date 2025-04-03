import { create } from "zustand";
import { Product, ProductVariant } from "@/types";
import { createJSONStorage, persist } from "zustand/middleware";
import toast from "react-hot-toast";

// Utility function to clean up old local storage items
const cleanupLocalStorage = () => {
  // Check if localStorage is available
  if (typeof window !== 'undefined' && window.localStorage) {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    try {
      // Get all keys in local storage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        
        // Check if the key is related to our cart or other app-specific storage
        if (key && key.startsWith('ecommerce-')) {
          const itemStr = localStorage.getItem(key);
          
          if (itemStr) {
            try {
              const item = JSON.parse(itemStr);
              
              // Check if the item has a timestamp and is older than 10 days
              if (item.timestamp && new Date(item.timestamp) < tenDaysAgo) {
                localStorage.removeItem(key);
                console.log(`Removed old item: ${key}`);
              }
            } catch (parseError) {
              // If parsing fails, remove the item
              localStorage.removeItem(key);
              console.error(`Failed to parse item ${key}:`, parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error during local storage cleanup:', error);
    }
  }
};

// Run cleanup only on client side
if (typeof window !== 'undefined') {
  cleanupLocalStorage();

  // Periodic cleanup (every 24 hours)
  const cleanupInterval = setInterval(cleanupLocalStorage, 24 * 60 * 60 * 1000);

  // Clear interval on window unload to prevent memory leaks
  window.addEventListener('beforeunload', () => clearInterval(cleanupInterval));
}

interface CartItem extends Product {
  quantity: number;
  selectedVariant?: ProductVariant;
  uniqueCartId?: string;
}

interface CartStore {
  items: CartItem[];
  storeId: string;
  setStoreId: (id: string) => void;
  addItem: (data: Product) => void;
  incrementItem: (uniqueCartId: string) => void;
  decrementItem: (uniqueCartId: string) => void;
  removeItem: (uniqueCartId: string) => void;
  removeAll: () => void;
}

const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      storeId: '', // Default empty string, will be set when store is known
      setStoreId: (id: string) => set({ storeId: id }),
      addItem: (data: Product) => {
        const currentItems = get().items;
        
        // Generate a unique cart ID for this specific variant
        const uniqueCartId = data.selectedVariant 
          ? `${data.id}-${data.selectedVariant.sizeId}`
          : data.id;

        // Check if an item with the same unique ID already exists
        const existingItem = currentItems.find(
          (item) => 
            item.uniqueCartId === uniqueCartId
        );

        if (existingItem) {
          // Update existing item's quantity
          const updatedItems = currentItems.map((item) =>
            item.uniqueCartId === uniqueCartId
              ? { 
                  ...item, 
                  quantity: Math.min((item.quantity || 0) + (data.quantity || 1), 5)
                }
              : item
          );
          
          set({ items: updatedItems });
          toast.success("Item quantity updated in cart", { icon: "👏" });
          return;
        }

        // Add new item to cart
        set({ 
          items: [
            ...currentItems, 
            { 
              ...data, 
              quantity: data.quantity || 1,
              uniqueCartId,
            }
          ] 
        }); 
        toast.success("Item added to cart", { icon: "👏" });
      },
      incrementItem: (uniqueCartId: string) => {
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.uniqueCartId === uniqueCartId) {
              // Ensure quantity doesn't exceed 5
              const newQuantity = Math.min(item.quantity + 1, 5);
              return { ...item, quantity: newQuantity };
            }
            return item;
          });

          // Only show toast if quantity actually changed
          const itemToUpdate = updatedItems.find(
            (item) => item.uniqueCartId === uniqueCartId
          );

          if (itemToUpdate && itemToUpdate.quantity < 5) {
            toast.success("Item quantity incremented", { icon: "👍" });
          } else if (itemToUpdate && itemToUpdate.quantity === 5) {
            toast.error("Maximum quantity reached", { icon: "⚠️" });
          }

          return { items: updatedItems };
        });
      },
      decrementItem: (uniqueCartId: string) => {
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.uniqueCartId === uniqueCartId) {
              // Ensure quantity doesn't go below 1
              const newQuantity = Math.max(item.quantity - 1, 1);
              return { ...item, quantity: newQuantity };
            }
            return item;
          });

          // Only show toast if quantity actually changed
          const itemToUpdate = updatedItems.find(
            (item) => item.uniqueCartId === uniqueCartId
          );

          if (itemToUpdate && itemToUpdate.quantity > 1) {
            toast.success("Item quantity decremented", { icon: "😴" });
          }

          return { items: updatedItems };
        });
      },
      removeItem: (uniqueCartId: string) => {
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item.uniqueCartId !== uniqueCartId
          );

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