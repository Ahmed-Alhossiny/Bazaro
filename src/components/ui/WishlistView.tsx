import { Heart } from "lucide-react";
import Link from "next/link";
import WishlistCard from "./WishlistCard";

export default function WishlistView({ products }: { products: any[] }) {
  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h1
            className="text-2xl font-bold text-[#1F2937]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            My Wishlist
          </h1>
          <p className="text-sm text-[#1F2937]/50">{products.length} items</p>
        </div>

        <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5 sm:p-6">
          {products.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
              <Heart size={28} className="text-[#B0B0B0]" />
              <p className="text-sm text-[#7A7A7A]">Your wishlist is empty</p>
              <Link
                href="/products"
                className="rounded-lg bg-[#E8571F] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#D14A16]"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {products.map(function (product: any) {
                return <WishlistCard key={product._id} product={product} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
