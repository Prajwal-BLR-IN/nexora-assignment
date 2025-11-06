import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShoppingBag } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";
import toast from "react-hot-toast";
import api from "../api/axios";
import { assets } from "../assets/assets";

const heroImages = [assets.hero1, assets.hero2, assets.hero3, assets.hero4];

// 1. Create the new array with the cloned first image at the end
const imagesWithClone = [...heroImages, heroImages[0]];
// This array is now [img1, img2, img3, img4, img1_clone]

const transitionDuration = 1000; // Animation duration in ms (matches 'duration-1000')

const fetchProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

const ProductGrid = () => {
  const { products, setProducts, searchQuery } = useProductStore();
  const { addToCart } = useCartStore();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // 2. Add new state to control the CSS transition
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (data) setProducts(data);
  }, [data, setProducts]);

  // 3. This effect now just increments the index
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }, 3000); // 3-second interval
    return () => clearInterval(interval);
  }, []);

  // 4. This NEW effect handles the infinite loop logic
  useEffect(() => {
    // Check if we are on the last slide (the clone)
    if (currentImageIndex === imagesWithClone.length - 1) {
      // Wait for the slide animation to finish (1000ms)
      const timer = setTimeout(() => {
        // 1. Disable the transition animation
        setIsTransitionEnabled(false);
        // 2. Instantly jump back to the REAL first slide (index 0)
        setCurrentImageIndex(0);
      }, transitionDuration);

      return () => clearTimeout(timer);
    }

    // This part re-enables the transition *after* the jump
    if (currentImageIndex === 0 && !isTransitionEnabled) {
      // Use a tiny delay to ensure React renders the jump *before*
      // re-enabling the transition for the next slide.
      const timer = setTimeout(() => {
        setIsTransitionEnabled(true);
      }, 50); // Small 50ms delay

      return () => clearTimeout(timer);
    }
  }, [currentImageIndex, isTransitionEnabled]); // Run when index changes

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
      {/* --- HERO CAROUSEL SECTION --- */}
      <div className="relative w-full overflow-hidden">
        <div
          className={`flex ${
            // 5. Conditionally apply the transition class
            isTransitionEnabled
              ? "transition-transform duration-1000 ease-in-out"
              : ""
          }`}
          style={{
            transform: `translateX(-${currentImageIndex * 100}%)`,
          }}
        >
          {/* 6. Map over the new 'imagesWithClone' array */}
          {imagesWithClone.map((imageSrc, index) => (
            <img
              key={index}
              src={imageSrc}
              alt="hero image"
              className="w-full min-w-full object-contain object-center"
            />
          ))}
        </div>
      </div>
      {/* --- END HERO CAROUSEL SECTION --- */}

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
              className="group relative rounded-2xl border border-gray-200 bg-[#ffefdf3f] p-4 shadow-lg transition-all hover:-translate-y-1.5 hover:shadow-xl"
            >
              <img
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.name}
                className="h-56 w-full rounded-xl object-contain"
              />

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
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
