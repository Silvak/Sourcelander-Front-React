import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Freelancer {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  hourlyRate: number;
  rating: number;
  skills: string[];
  experience: string;
  location: string;
  description: string;
}

export interface CartItem {
  freelancer: Freelancer;
  hours: number;
  totalCost: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartActions {
  addToCart: (freelancer: Freelancer, hours: number) => void;
  removeFromCart: (freelancerId: string) => void;
  updateHours: (freelancerId: string, hours: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalCost: () => number;
  getTotalHours: () => number;
  getItemCount: () => number;
  getManagementFee: () => number;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addToCart: (freelancer: Freelancer, hours: number) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.freelancer.id === freelancer.id
        );

        if (existingItem) {
          // Update existing item
          set({
            items: items.map((item) =>
              item.freelancer.id === freelancer.id
                ? {
                    ...item,
                    hours: item.hours + hours,
                    totalCost:
                      (item.hours + hours) * item.freelancer.hourlyRate,
                  }
                : item
            ),
          });
        } else {
          // Add new item
          set({
            items: [
              ...items,
              {
                freelancer,
                hours,
                totalCost: hours * freelancer.hourlyRate,
              },
            ],
          });
        }
      },

      removeFromCart: (freelancerId: string) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.freelancer.id !== freelancerId),
        });
      },

      updateHours: (freelancerId: string, hours: number) => {
        const { items } = get();
        set({
          items: items.map((item) =>
            item.freelancer.id === freelancerId
              ? {
                  ...item,
                  hours,
                  totalCost: hours * item.freelancer.hourlyRate,
                }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        const { isOpen } = get();
        set({ isOpen: !isOpen });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalCost: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.totalCost, 0);
      },

      getTotalHours: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.hours, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.length;
      },

      getManagementFee: () => {
        const { items } = get();
        const laborCost = items.reduce(
          (total, item) => total + item.totalCost,
          0
        );
        const standardFee = laborCost * 0.2; // 20% standard fee

        // Minimum personnel management fee of $1,500
        const minimumFee = 1500;

        return Math.max(standardFee, minimumFee);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
