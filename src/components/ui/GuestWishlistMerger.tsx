"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/toast";
import { mergeGuestWishlistAction } from "@/app/api/actions/wishlistActions/MergeGuestWishlistAction";
import { getGuestWishlist, setGuestWishlist } from "@/utils/GuestWishlist";

export default function GuestWishlistMerger() {
  const { status } = useSession();
  const router = useRouter();
  const running = useRef(false);

  useEffect(
    function () {
      if (status !== "authenticated") return;
      if (running.current) return;

      const ids = getGuestWishlist();

      if (ids.length === 0) return;

      running.current = true;

      async function merge() {
        try {
          const result = await mergeGuestWishlistAction(ids);

          setGuestWishlist(result.failedIds);

          if (result.mergedCount > 0) {
            toast.add({
              type: "success",
              description: "Your saved items were added to your wishlist.",
            });
            router.refresh();
          }
        } catch (error) {
          running.current = false;
          return;
        }

        running.current = false;
      }

      merge();
    },
    [status, router],
  );

  return null;
}
