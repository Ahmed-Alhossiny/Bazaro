"use server";

import { removeProductFromWishlist } from "@/services/RemoveProductFromWishlist";
import { getAccessToken } from "@/utils/GetAccessToken";

export async function removeFromWishlistAction(prodId: string) {
  const token = await getAccessToken();

  if (!token) {
    return { status: "error", message: "unauthorized" };
  }

  const payload = await removeProductFromWishlist(token, prodId);

  return payload;
}
