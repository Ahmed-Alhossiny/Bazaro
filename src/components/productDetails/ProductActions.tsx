"use client";

import { useState } from "react";
import { Minus, Plus, ShieldCheck, ShoppingCart } from "lucide-react";
import AddToCartButton from "../ui/AddToCartButton";
import AddToWishlistButton from "../ui/AddToWishlistButton";

export default function ProductActions({
  maxQuantity,
  prodId,
  initialWished = false,
}: {
  maxQuantity: number;
  prodId: string;
  initialWished?: boolean;
}) {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center sm:justify-start items-center gap-4">
        <span className="text-sm font-semibold text-[#1F2937]">Quantity</span>
        <div className="flex items-center rounded-lg border border-black/10 bg-white">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-11 w-11 items-center cursor-pointer justify-center text-[#1F2937] transition-colors hover:bg-[#F7F5F2]"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center text-sm font-semibold text-[#1F2937]">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(maxQuantity, q + 1))}
            className="flex h-11 w-11 cursor-pointer items-center justify-center text-[#1F2937] transition-colors hover:bg-[#F7F5F2]"
          >
            <Plus size={16} />
          </button>
        </div>
        <span className="text-xs text-[#7A7A7A]">{maxQuantity} available</span>
      </div>

      <div className="flex justify-between items-center gap-3">
        <AddToCartButton
          prodId={`${prodId}`}
          quantity={qty}
          onAdded={function () {
            setQty(1);
          }}
          classes="flex w-full h-13 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E8571F] text-sm font-semibold text-white transition-colors hover:bg-[#D14A16] active:scale-[0.99]"
          body={
            <>
              <ShoppingCart size={18} />
              Add to Cart
            </>
          }
        />
        <AddToWishlistButton
          prodId={prodId}
          body={true}
          initialWished={initialWished}
        />
      </div>

      <p className="flex items-center gap-1.5 text-xs text-[#7A7A7A] sm:text-sm">
        <ShieldCheck size={14} className="shrink-0 text-[#0EA5A0]" />
        Secure checkout &bull; Buyer protection included
      </p>
    </div>
  );
}
