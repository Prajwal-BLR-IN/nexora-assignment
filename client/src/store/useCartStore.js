import { create } from "zustand";

export const useCartStore = create((set, get) => ({
    cart: [],

    // Add item (if exists, increase qty)
    addToCart: (product) => {
        const existing = get().cart.find((item) => item._id === product._id);
        if (existing) {
            set({
                cart: get().cart.map((item) =>
                    item._id === product._id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                ),
            });
        } else {
            set({ cart: [...get().cart, { ...product, qty: 1 }] });
        }
    },

    // Remove item
    removeFromCart: (id) => {
        set({ cart: get().cart.filter((item) => item._id !== id) });
    },

    // Update item quantity
    updateQuantity: (id, qty) => {
        if (qty <= 0) return;
        set({
            cart: get().cart.map((item) =>
                item._id === id ? { ...item, qty } : item
            ),
        });
    },

    // Clear entire cart (useful after checkout)
    clearCart: () => set({ cart: [] }),

    // Compute total dynamically
    get total() {
        return get()
            .cart.reduce((acc, item) => acc + item.price * item.qty, 0)
            .toFixed(2);
    },
}));
