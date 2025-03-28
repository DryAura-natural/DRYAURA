import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';
import toast from 'react-hot-toast';

interface WishlistStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          toast.error('Item already in wishlist');
          return;
        }

        set({ items: [...currentItems, data] });
        toast.success('Item added to wishlist');
      },

      removeItem: (id: string) => {
        const currentItems = get().items;
        const updatedItems = currentItems.filter((item) => item.id !== id);
        
        set({ items: updatedItems });
        toast.success('Item removed from wishlist');
      },

      removeAll: () => {
        set({ items: [] });
        toast.success('Wishlist cleared');
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useWishlist;
