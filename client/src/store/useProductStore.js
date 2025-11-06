import { create } from "zustand";

export const useProductStore = create((set) => ({
    // All fetched products
    products: [],
    setProducts: (data) => set({ products: data }),

    // Search query (for Navbar search bar)
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
}));
