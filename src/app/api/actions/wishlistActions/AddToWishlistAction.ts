"use server";

import { addProductToWishlist } from "@/services/AddProductToWishlist";
import { getAccessToken } from "@/utils/GetAccessToken";

export async function addToWishlistAction(prodId: string) {
  const token = await getAccessToken();

  if (!token) {
    return { status: "error", message: "unauthorized" };
  }

  const payload = await addProductToWishlist(token, prodId);

  return payload;
}
