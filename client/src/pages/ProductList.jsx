import React, { useEffect, useState } from "react"; // 1. Import useState
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShoppingBag } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";
import toast from "react-hot-toast";
import api from "../api/axios";
import { assets } from "../assets/assets";

// 2. Put your hero images into an array
const heroImages = [assets.hero1, assets.hero2, assets.hero3, assets.hero4];

const fetchProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

const ProductGrid = () => {
  const { products, setProducts, searchQuery } = useProductStore();
  const { addToCart } = useCartStore();

  // 3. Add state to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (data) setProducts(data);
  }, [data, setProducts]);

  // 4. Use an effect to create the sliding interval
  useEffect(() => {
    const interval = setInterval(() => {
      // Move to the next image, looping back to 0 at the end
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000); // Change image every 3000ms (3 seconds)

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // The empty array [] ensures this effect runs only once

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
      {/* 5. This is the new Hero Carousel section */}
      <div className="relative -mt-3 h-[60vh] w-full md:-mt-6">
        {heroImages.map((imageSrc, index) => (
          <img
            key={index}
            src={imageSrc}
            alt="hero image"
            className={`absolute top-0 left-0 h-full w-full scale-x-107 object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"} `}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Trending Products
          </h2>
          <div className="h-1 w-20 bg-[#f4b680]"></div>
        </div>

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
