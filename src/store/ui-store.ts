import { create } from "zustand";
import { MenuItem } from "@/types/menu";

interface UiStore {
  customizingItem: MenuItem | null;
  isCustomizingOpen: boolean;
  openCustomization: (item: MenuItem) => void;
  closeCustomization: () => void;

  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  customizingItem: null,
  isCustomizingOpen: false,
  openCustomization: (item) =>
    set({ customizingItem: item, isCustomizingOpen: true }),
  closeCustomization: () =>
    set({ customizingItem: null, isCustomizingOpen: false }),

  isCheckoutOpen: false,
  openCheckout: () => set({ isCheckoutOpen: true }),
  closeCheckout: () => set({ isCheckoutOpen: false }),
}));

