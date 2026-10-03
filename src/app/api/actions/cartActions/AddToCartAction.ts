"use server";

import { addToCart } from "@/services/AddToCart";
import { getAccessToken } from "@/utils/GetAccessToken";

export async function addToCartAction(prodId: string) {
  const token = await getAccessToken();

  const payload = await addToCart(prodId, token);

  return payload;
}
