import { getAccessToken } from "@/utils/GetAccessToken";
import { getWishlist } from "./GetWishlist";

export async function getWishlistIds(): Promise<string[]> {
  try {
    const token = await getAccessToken();

    if (!token) return [];

    const payload = await getWishlist(token);
    const items = payload?.data || [];
    const ids: string[] = [];

    for (let i = 0; i < items.length; i++) {
      ids.push(items[i]._id);
    }

    return ids;
  } catch (error) {
    return [];
  }
}
