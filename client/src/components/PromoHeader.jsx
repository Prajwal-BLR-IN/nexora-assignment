import { X } from "lucide-react";

function PromoHeader({ setShowPromo }) {
  return (
    <div className="flex w-full items-center justify-between border border-gray-200 bg-[#ffefdf3f] px-4 py-1 text-center text-sm font-medium text-black backdrop-blur-xl md:px-14">
      <p>Get 20% OFF!</p>
      <div className="flex items-center space-x-6">
        <button
          type="button"
          className="rounded-full bg-white px-7 py-2 font-normal text-gray-800"
        >
          Claim Offer
        </button>
        <button
          type="button"
          onClick={() => setShowPromo()}
          className="cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default PromoHeader;
