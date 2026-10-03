"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { addToCartAction } from "@/app/api/actions/cartActions/AddToCartAction";
import { toast } from "@/components/ui/toast";
import { useAddToCartSync } from "@/hooks/useCart";
import { addToGuestCart } from "@/utils/GuestCart";

type Status = "idle" | "loading" | "success";

export default function AddToCartButton({
  classes,
  body,
  prodId,
  quantity = 1,
  onAdded,
}: {
  classes: string;
  body: ReactNode;
  prodId: string;
  quantity?: number;
  onAdded?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { begin, commit, rollback } = useAddToCartSync();
  const { status: sessionStatus } = useSession();

  useEffect(function () {
    return function () {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function getExistingCount() {
    try {
      const response = await fetch("/api/cart");
      if (!response.ok) return 0;
      const cart = await response.json();
      const list = cart?.data?.products ?? [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].product._id === prodId) {
          return list[i].count as number;
        }
      }
      return 0;
    } catch {
      return 0;
    }
  }

  async function setExactCount(count: number) {
    try {
      const response = await fetch("/api/cart/" + prodId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ count: count }),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async function addRemainingOneByOne(remaining: number) {
    for (let i = 0; i < remaining; i++) {
      try {
        const data = await addToCartAction(prodId);
        if (data.status !== "success") return false;
      } catch {
        return false;
      }
    }
    return true;
  }

  async function handleAddToCart() {
    if (status !== "idle") return;
    if (sessionStatus === "loading") return;

    const amount = quantity > 0 ? quantity : 1;
    const isGuest = sessionStatus === "unauthenticated";

    setStatus("loading");

    let existing = 0;
    if (!isGuest && amount > 1) {
      existing = await getExistingCount();
    }

    begin(amount);

    let added = false;
    let quantityOk = true;

    if (isGuest) {
      added = await addToGuestCart(prodId, amount);
    } else {
      try {
        const data = await addToCartAction(prodId);
        added = data.status === "success";
      } catch {
        added = false;
      }

      if (added && amount > 1) {
        quantityOk = await setExactCount(existing + amount);

        if (!quantityOk) {
          quantityOk = await addRemainingOneByOne(amount - 1);
        }
      }
    }

    if (added) {
      setStatus("success");

      if (onAdded) onAdded();

      if (!quantityOk) {
        toast.add({
          type: "error",
          description: "Added to cart, but the quantity could not be updated.",
        });
      }

      commit(amount);

      timerRef.current = setTimeout(function () {
        setStatus("idle");
      }, 1500);
    } else {
      rollback(amount);
      setStatus("idle");
      toast.add({
        type: "error",
        description: "Could not add the item. Please try again.",
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={status !== "idle"}
      aria-busy={status === "loading"}
      aria-label="Add to cart"
      className={classes + " relative disabled:cursor-default"}
    >
      <span
        className={
          "inline-flex items-center justify-center gap-2 transition-opacity duration-200 " +
          (status === "idle" ? "opacity-100" : "opacity-0")
        }
      >
        {body}
      </span>

      <span
        className={
          "absolute inset-0 flex items-center justify-center transition-all duration-200 " +
          (status === "loading"
            ? "scale-100 opacity-100"
            : "scale-50 opacity-0")
        }
      >
        <Loader2 size={18} className="animate-spin" />
      </span>

      <span
        className={
          "absolute inset-0 flex items-center justify-center transition-all duration-300 " +
          (status === "success"
            ? "scale-100 opacity-100"
            : "scale-50 opacity-0")
        }
      >
        <Check size={18} strokeWidth={3} />
      </span>
    </button>
  );
}
