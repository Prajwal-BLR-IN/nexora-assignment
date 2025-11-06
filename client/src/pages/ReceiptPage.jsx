import { CircleCheck } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const receipt = location.state?.receiptData;

  if (!receipt) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-gray-700">
        <p className="text-lg">No receipt data found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 rounded-lg bg-[#fcb900] px-4 py-2 font-medium text-gray-900 hover:bg-[#f0a500]"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-2 flex flex-col items-center justify-center gap-3 text-2xl font-bold text-gray-900">
        <CircleCheck size={50} color="#00b840" strokeWidth={2} />
        Checkout Successful!
      </h2>
      <p className="mb-6 text-gray-600">
        Thanks for shopping with us,{" "}
        <span className="font-semibold">{receipt.name}</span>!
      </p>

      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm">
        <h3 className="mb-3 text-lg font-semibold text-gray-800">Receipt</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong>Email:</strong> {receipt.email}
          </p>
          <p>
            <strong>Date:</strong> {receipt.timestamp}
          </p>
          <p>
            <strong>Total:</strong> ₹{receipt.total.toLocaleString()}
          </p>
          <div className="my-2 border-t border-gray-200"></div>
          <p className="font-medium text-gray-800">Items:</p>
          <ul className="list-disc pl-5 text-gray-600">
            {receipt.items.map((item) => (
              <li key={item._id}>
                {item.name} × {item.qty} — ₹{item.price * item.qty}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 rounded-lg bg-[#fcb900] px-5 py-2 font-medium text-gray-900 hover:bg-[#f0a500]"
      >
        Back to Shop
      </button>
    </div>
  );
};

export default Receipt;
