import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShoppingBag } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";
import toast from "react-hot-toast";
import api from "../api/axios";
import { assets } from "../assets/assets";

const fetchProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

const ProductGrid = () => {
  const { products, setProducts, searchQuery } = useProductStore();
  const { addToCart } = useCartStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (data) setProducts(data);
  }, [data, setProducts]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading)
    return (
      <p className="mt-8 text-center text-gray-600">Loading products...</p>
    );
  if (isError)
    return (
      <p className="mt-8 text-center text-red-600">Failed to load products</p>
    );

  return (
    <section>
      <div className="-mt-3 md:-mt-6">
        <img
          src={assets.hero}
          alt="hero image"
          className="relative scale-x-107 object-center"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Trending Products
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="group relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <img
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.name}
                className="h-56 w-full rounded-xl object-contain"
              />

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#fcb900]">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {product.category || "Category"}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center gap-1 rounded-lg bg-[#fcb900] px-3 py-2 text-sm font-medium text-gray-900 hover:bg-[#f0a500]"
                  >
                    <ShoppingBag size={16} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center text-gray-600">No products found.</p>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
