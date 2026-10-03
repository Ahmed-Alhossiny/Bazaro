"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AddToCartButton from "./AddToCartButton";
import { removeFromWishlistAction } from "@/app/api/actions/wishlistActions/RemoveFromWishlistAction";
import { removeFromGuestWishlist } from "@/utils/GuestWishlist";

export default function WishlistCartButton({ prodId }: { prodId: string }) {
  const router = useRouter();
  const { status } = useSession();

  async function handleAdded() {
    if (status === "unauthenticated") {
      removeFromGuestWishlist(prodId);
      return;
    }

    try {
      await removeFromWishlistAction(prodId);
      router.refresh();
    } catch (error) {
      return;
    }
  }

  return (
    <AddToCartButton
      prodId={prodId}
      onAdded={handleAdded}
      classes="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8571F] text-white transition-colors hover:bg-[#D14A16] cursor-pointer"
      body={<Plus size={18} />}
    />
  );
}
