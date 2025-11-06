import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
    products: [],
    cart: [],
    searchQuery: "",

    // Fetch mock products
    fetchProducts: async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            set({ products: res.data });
        } catch (err) {
            console.error("Error fetching products:", err);
            toast.error("Failed to load products!");
        }
    },

    // Search state
    setSearchQuery: (query) => set({ searchQuery: query }),

    // Cart logic
    addToCart: (product) => {
        const { cart } = get();
        const existing = cart.find((item) => item._id === product._id);
        if (existing) {
            const updatedCart = cart.map((item) =>
                item._id === product._id ? { ...item, qty: item.qty + 1 } : item
            );
            set({ cart: updatedCart });
        } else {
            set({ cart: [...cart, { ...product, qty: 1 }] });
        }
        toast.success(`${product.name} added to cart!`);
    },

    removeFromCart: (id) => {
        const { cart } = get();
        const updatedCart = cart.filter((item) => item._id !== id);
        set({ cart: updatedCart });
        toast.success("Item removed from cart!");
    },

    updateQty: (id, qty) => {
        const { cart } = get();
        const updatedCart = cart.map((item) =>
            item._id === id ? { ...item, qty: Math.max(qty, 1) } : item
        );
        set({ cart: updatedCart });
    },

    clearCart: () => set({ cart: [] }),

    getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    },
}));
