import React, { useState } from "react";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useProductStore();
  const { cart } = useCartStore();

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-gray-900">
            nexora<span className="text-3xl text-[#fcb900]">↑</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mx-6 hidden flex-1 items-center md:flex">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search for products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-l-lg border border-gray-300 px-3 py-2 focus:outline-none"
            />
            <button className="flex items-center gap-1 rounded-r-lg bg-[#fcb900] px-4 py-2 font-medium text-gray-900 hover:bg-[#f0a500]">
              <Search size={18} />
              Search
            </button>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5 text-gray-800">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 rounded-full bg-[#fcb900] px-2 py-[2px] text-xs font-semibold">
                {cartCount}
              </span>
            )}
          </div>
          <User size={22} className="cursor-pointer" />

          <div
            className="cursor-pointer md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-3 md:hidden">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-3 w-full rounded border border-gray-300 px-3 py-2"
          />
          <div className="flex flex-col space-y-2 font-medium text-gray-800">
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">Accessories</a>
            <a href="#">Footwear</a>
            <a href="#">Home Essentials</a>
            <a href="#">Blogs</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
