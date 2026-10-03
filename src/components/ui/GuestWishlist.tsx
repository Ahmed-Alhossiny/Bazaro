"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import WishlistView from "./WishlistView";
import { GUEST_WISHLIST_EVENT, getGuestWishlist } from "@/utils/GuestWishlist";

export default function GuestWishlist() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const ids = getGuestWishlist();
    const requests: Promise<any>[] = [];

    for (let i = 0; i < ids.length; i++) {
      requests.push(
        fetch(`https://ecommerce.routemisr.com/api/v1/products/${ids[i]}`)
          .then(function (res) {
            if (!res.ok) return null;
            return res.json();
          })
          .catch(function () {
            return null;
          }),
      );
    }

    const results = await Promise.all(requests);
    const found: any[] = [];

    for (let i = 0; i < results.length; i++) {
      if (results[i] && results[i].data) {
        found.push(results[i].data);
      }
    }

    setProducts(found);
    setLoading(false);
  }

  useEffect(function () {
    load();

    window.addEventListener(GUEST_WISHLIST_EVENT, load);

    return function () {
      window.removeEventListener(GUEST_WISHLIST_EVENT, load);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5F2]">
        <Loader2 size={28} className="animate-spin text-[#E8571F]" />
      </div>
    );
  }

  return <WishlistView products={products} />;
}
