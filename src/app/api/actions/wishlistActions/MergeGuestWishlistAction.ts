"use server";

import { addProductToWishlist } from "@/services/AddProductToWishlist";
import { getAccessToken } from "@/utils/GetAccessToken";

export async function mergeGuestWishlistAction(ids: string[]) {
  const failedIds: string[] = [];
  let mergedCount = 0;

  if (!Array.isArray(ids)) {
    return { mergedCount, failedIds };
  }

  const token = await getAccessToken();

  if (!token) {
    return { mergedCount, failedIds: ids };
  }

  const limit = ids.length > 100 ? 100 : ids.length;

  for (let i = 0; i < limit; i++) {
    const id = ids[i];

    if (typeof id !== "string") continue;

    try {
      const payload = await addProductToWishlist(token, id);

      if (payload && payload.status === "success") {
        mergedCount++;
      } else {
        failedIds.push(id);
      }
    } catch (error) {
      failedIds.push(id);
    }
  }

  return { mergedCount, failedIds };
}
