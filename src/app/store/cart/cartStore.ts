import { create } from "zustand";
import Cookies from "js-cookie";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const initialCart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")!) : [];

export const useCartStore = create<CartState>((set) => ({
  cart: initialCart,

  addToCart: (newItem: CartItem) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === newItem.id);

      if (existingItem) {
        const updatedCart = state.cart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        Cookies.set("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      } else {
        const updatedCart = [...state.cart, { ...newItem, quantity: 1 }];
        Cookies.set("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }
    });
  },

  removeFromCart: (id: string) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id);
      Cookies.set("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  clearCart: () => {
    set(() => {
      Cookies.remove("cart");
      return { cart: [] };
    });
  },
}));
