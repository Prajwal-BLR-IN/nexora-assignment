import React from "react";
import { useCartStore } from "../store/useCartStore";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const { cart, removeFromCart, clearCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-gray-700">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty cart"
          className="mb-4 h-28 w-28 opacity-80"
        />
        <h2 className="text-lg font-semibold">Your cart is empty</h2>
        <p className="text-sm text-gray-500">
          Add some products to continue shopping.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-6xl px-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Shopping Cart</h2>
        <button
          onClick={() => {
            clearCart();
            toast.success("Cart cleared!");
          }}
          className="rounded-lg border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
        >
          Clear All
        </button>
      </div>

      {/* Cart Items */}
      <div className="mt-6 space-y-5">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row"
          >
            <div className="flex items-center gap-4">
              <img
                src={`https://via.placeholder.com/80x80?text=${item.name}`}
                alt={item.name}
                className="h-20 w-20 rounded-md object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">₹{item.price}</p>
                <p className="text-sm text-gray-600">Qty: {item.qty}</p>
              </div>
            </div>
            <button
              onClick={() => {
                removeFromCart(item._id);
                toast.success("Removed from cart");
              }}
              className="mt-3 flex items-center gap-2 rounded-md bg-red-100 px-3 py-1 text-sm text-red-600 hover:bg-red-200 sm:mt-0"
            >
              <Trash2 size={16} /> Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 flex flex-col items-end border-t pt-6">
        <div className="text-lg font-semibold text-gray-800">
          Total:{" "}
          <span className="text-[#fcb900]">₹{total.toLocaleString()}</span>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="mt-3 rounded-lg bg-[#fcb900] px-5 py-2 font-medium text-gray-900 hover:bg-[#f0a500]"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
