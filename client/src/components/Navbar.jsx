import React, { useState } from "react";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useCartStore } from "../store/useCartStore";
import { useLocation, useNavigate } from "react-router-dom";
import PromoHeader from "./PromoHeader";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useProductStore();
  const { cart } = useCartStore();

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    // The nav element itself is the container for all parts
    <nav className="sticky top-0 z-50 w-full border-b border-black/10 md:bg-white/70 md:shadow-lg md:backdrop-blur-xl">
      {location.pathname === "/" && <PromoHeader />}
      {/* Main Navbar Content */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div
          className="flex cursor-pointer items-center space-x-2"
          onClick={() => navigate("/")}
        >
          <h1 className="text-2xl font-bold text-gray-900">nexora</h1>
        </div>

        {/* Left navbar section (Desktop) */}
        <div className="flex items-center">
          <div className="hidden gap-4 font-medium text-gray-800 md:flex">
            <a href="#" className="hover:text-gray-950">
              Men
            </a>
            <a href="#" className="hover:text-gray-950">
              Women
            </a>
            <a href="#" className="hover:text-gray-950">
              Accessories
            </a>
            <a href="#" className="hover:text-gray-950">
              Blogs
            </a>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="mx-6 hidden flex-1 items-center md:flex">
            <div className="flex w-md">
              <input
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-l-lg border border-gray-300 px-3 py-2 focus:border-[#fcb900] focus:outline-none"
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
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#fcb900] text-xs font-semibold text-gray-900">
                  {cartCount}
                </span>
              )}
            </div>
            <User size={22} className="cursor-pointer" />

            {/* Mobile Menu Hamburger Button */}
            <div
              className="cursor-pointer md:hidden"
              onClick={() => setMenuOpen(true)} // Changed to only open
            >
              <Menu size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu & Overlay --- */}

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ease-in-out md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Mobile Menu Panel (Sliding) */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 transform bg-white p-4 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Menu Header with Close Button */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="rounded-md p-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Bar (Mobile) */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.targe.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 pl-10 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
          />
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Navigation Links (Mobile) */}
        <nav className="flex flex-col space-y-2 font-medium text-gray-800">
          <a
            href="#"
            className="block rounded-lg px-3 py-2 text-base hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Men
          </a>
          <a
            href="#"
            className="block rounded-lg px-3 py-2 text-base hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Women
          </a>
          <a
            href="#"
            className="block rounded-lg px-3 py-2 text-base hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Accessories
          </a>
          <a
            href="#"
            className="block rounded-lg px-3 py-2 text-base hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            Blogs
          </a>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
