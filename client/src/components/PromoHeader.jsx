import { X } from "lucide-react";

export default function PromoHeader() {
  return (
    <div className="flex w-full items-center justify-between bg-[#ffefdf96] px-4 py-1 text-center text-sm font-medium text-black backdrop-blur-xl md:px-14">
      <p>Get 20% OFF on Your First Order!</p>
      <div className="flex items-center space-x-6">
        <button
          type="button"
          className="rounded-full bg-white px-7 py-2 font-normal text-gray-800"
        >
          Claim Offer
        </button>
        <button type="button">
          <X />
        </button>
      </div>
    </div>
  );
}
