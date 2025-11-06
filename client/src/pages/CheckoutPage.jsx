import React, { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCartStore();
  const [form, setForm] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      toast.error("Please fill all details");
      return;
    }

    const receiptData = {
      name: form.name,
      email: form.email,
      total,
      items: cart,
      timestamp: new Date().toLocaleString(),
    };

    clearCart();
    toast.success("Checkout successful!");
    navigate("/receipt", { state: { receiptData } });
  };

  if (cart.length === 0) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-gray-700">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty cart"
          className="mb-4 h-28 w-28 opacity-80"
        />
        <h2 className="text-lg font-semibold">Your cart is empty</h2>
        <p className="text-sm text-gray-500">Add items to checkout.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-6xl px-4">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">Checkout</h2>

      {/* Checkout Form */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2"
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#fcb900] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#fcb900] focus:outline-none"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
          <h3 className="mb-3 font-semibold text-gray-800">Order Summary</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{(item.price * item.qty).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-gray-200 pt-3 text-right font-semibold text-gray-900">
            Total: ₹{total.toLocaleString()}
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-[#fcb900] py-2 font-medium text-gray-900 hover:bg-[#f0a500]"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
