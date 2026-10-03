"use client";

import { addToWishlistAction } from "@/app/api/actions/wishlistActions/AddToWishlistAction";
import { removeFromWishlistAction } from "@/app/api/actions/wishlistActions/RemoveFromWishlistAction";
import { Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { isInGuestWishlist, toggleGuestWishlist } from "@/utils/GuestWishlist";

export default function AddToWishlistButton({
  prodId,
  body,
  initialWished = false,
}: {
  prodId: string;
  body: boolean;
  initialWished?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();
  const [wished, setWished] = useState(initialWished);
  const [pending, setPending] = useState(false);

  useEffect(
    function () {
      if (status === "authenticated") {
        setWished(initialWished);
      } else if (status === "unauthenticated") {
        setWished(isInGuestWishlist(prodId));
      }
    },
    [status, initialWished, prodId],
  );

  async function handleClick() {
    if (pending || status === "loading") return;

    if (status === "unauthenticated") {
      const nowWished = toggleGuestWishlist(prodId);
      setWished(nowWished);
      return;
    }

    const previous = wished;

    setPending(true);
    setWished(!previous);

    try {
      let payload;

      if (previous) {
        payload = await removeFromWishlistAction(prodId);
      } else {
        payload = await addToWishlistAction(prodId);
      }

      if (!payload || payload.status !== "success") {
        setWished(previous);
      } else if (previous && pathname === "/wishlist") {
        router.refresh();
      }
    } catch (error) {
      setWished(previous);
    }

    setPending(false);
  }

  const heartClasses = wished
    ? "fill-red-500 text-red-500"
    : "hover:fill-red-500 hover:text-red-500";

  return (
    <>
      {body ? (
        <button
          type="button"
          onClick={handleClick}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="flex h-13 w-13 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-black/10 bg-white text-[#1F2937] transition-colors"
        >
          <Heart size={18} className={"transition-colors " + heartClasses} />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#1F2937] shadow-sm transition-colors"
        >
          <Heart size={16} className={"transition-colors " + heartClasses} />
        </button>
      )}
    </>
  );
}
