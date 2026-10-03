"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { addToCartAction } from "@/app/api/actions/cartActions/AddToCartAction";
import { Product } from "@/types/CartType";
import {
  clearGuestCart,
  readGuestCart,
  writeGuestCart,
} from "@/utils/GuestCart";
import { toast } from "../ui/toast";

export default function GuestCartMerge() {
  const { status } = useSession();
  const queryClient = useQueryClient();
  const runningRef = useRef(false);

  useEffect(
    function () {
      if (status !== "authenticated") return;
      if (runningRef.current) return;

      const guestItems = readGuestCart();
      if (guestItems.length === 0) return;

      runningRef.current = true;

      async function merge() {
        let existingItems: Product[] = [];

        try {
          const response = await fetch("/api/cart");
          if (response.ok) {
            const cart = await response.json();
            existingItems = cart?.data?.products ?? [];
          }
        } catch {
          existingItems = [];
        }

        const failed: Product[] = [];

        for (let i = 0; i < guestItems.length; i++) {
          const item = guestItems[i];
          const productId = item.product._id;

          let existing = 0;
          for (let j = 0; j < existingItems.length; j++) {
            if (existingItems[j].product._id === productId) {
              existing = existingItems[j].count;
            }
          }

          let ok = false;

          try {
            const data = await addToCartAction(productId);
            ok = data.status === "success";
          } catch {
            ok = false;
          }

          const target = existing + item.count;

          if (ok && target > 1) {
            try {
              const response = await fetch("/api/cart/" + productId, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ count: target }),
              });
              ok = response.ok;
            } catch {
              ok = false;
            }
          }

          if (!ok) failed.push(item);
        }

        const mergedCount = guestItems.length - failed.length;

        if (failed.length === 0) {
          clearGuestCart();
        } else {
          writeGuestCart(failed);
        }

        if (mergedCount > 0) {
          toast.add({
            type: "success",
            description:
              mergedCount === 1
                ? "Item was added to your cart."
                : "Items were added to your cart.",
          });
        }

        await queryClient.invalidateQueries({ queryKey: ["getCart"] });
        runningRef.current = false;
      }

      merge();
    },
    [status, queryClient],
  );

  return null;
}
