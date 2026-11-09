import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, MenuItem, PizzaSize } from "@/types/menu";

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  hasHydrated: boolean;
  addItem: (
    menuItem: MenuItem,
    options?: {
      size?: PizzaSize;
      sizeLabel?: string;
      sizePrice?: number;
      selectedExtras?: { id: string; name: string; price: number }[];
      specialInstructions?: string;
      quantity?: number;
    }
  ) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setHasHydrated: (state: boolean) => void;

  // Selectors
  getItemCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      hasHydrated: false,

      setHasHydrated: (hasHydrated) => set({ hasHydrated }),

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addItem: (menuItem, options) => {
        const size = options?.size;
        const sizeLabel = options?.sizeLabel;
        const selectedExtras = options?.selectedExtras || [];
        const quantity = options?.quantity || 1;
        const specialInstructions = options?.specialInstructions || "";

        // Calculate unit price:
        let basePrice = 0;
        if (size && menuItem.sizePrices) {
          const matchedSize = menuItem.sizePrices.find((s) => s.size === size);
          basePrice = matchedSize ? matchedSize.price : (menuItem.price || 0);
        } else {
          basePrice = menuItem.price || 0;
        }

        const extrasCost = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
        const unitPrice = basePrice + extrasCost;

        // Generate unique cart item ID
        const extrasKey = selectedExtras
          .map((e) => e.id)
          .sort()
          .join("-");
        const cartItemId = `${menuItem.id}_${size || "std"}_${extrasKey}`;

        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.cartItemId === cartItemId
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
            return { items: updatedItems, isCartOpen: true };
          } else {
            return {
              items: [
                ...state.items,
                {
                  cartItemId,
                  menuItem,
                  size,
                  sizeLabel,
                  unitPrice,
                  selectedExtras,
                  quantity,
                  specialInstructions,
                },
              ],
              isCartOpen: true,
            };
          }
        });
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.unitPrice * item.quantity,
          0
        );
      },
    }),
    {
      name: "krispy-cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

