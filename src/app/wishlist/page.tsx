import { getAccessToken } from "@/utils/GetAccessToken";
import { getWishlist } from "@/services/GetWishlist";
import GuestWishlist from "@/components/ui/GuestWishlist";
import WishlistView from "@/components/ui/WishlistView";

export default async function WishlistPage() {
  const token = await getAccessToken();

  if (!token) {
    return <GuestWishlist />;
  }

  const payload = await getWishlist(token);
  const products = payload?.data || [];

  return <WishlistView products={products} />;
}
