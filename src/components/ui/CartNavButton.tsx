"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "@/components/ui/CartDrawer";
import { useCart } from "@/hooks/useCart";

export default function CartNavButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { badgeCount } = useCart();

  useEffect(function () {
    setMounted(true);
  }, []);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open cart"
        onClick={handleOpen}
        className="relative cursor-pointer text-white transition-colors hover:text-[#0EA5A0]"
      >
        <ShoppingCart size={25} />
        {badgeCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E8571F] px-1 text-[11px] font-bold text-white">
            {badgeCount}
          </span>
        )}
      </button>

      {mounted &&
        createPortal(
          <CartDrawer open={open} onClose={handleClose} />,
          document.body,
        )}
    </>
  );
}
