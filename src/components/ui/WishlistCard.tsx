import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToWishlistButton from "@/components/ui/AddToWishlistButton";
import WishlistCartButton from "@/components/ui/WishlistCartButton";

export default function WishlistCard({ product }: { product: any }) {
  const hasDiscount =
    typeof product.priceAfterDiscount === "number" &&
    product.priceAfterDiscount < product.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) / product.price) * 100,
      )
    : 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-black/5 transition-shadow hover:shadow-md">
      <div className="relative">
        <Link
          href={`/products/${product._id}`}
          className="relative block aspect-square overflow-hidden bg-[#F7F5F2]"
        >
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-[#E8571F] px-2.5 py-1 text-xs font-semibold text-white">
            -{discountPercent}%
          </span>
        )}

        <AddToWishlistButton
          prodId={product._id}
          body={false}
          initialWished={true}
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {product.brand?.name && (
          <span className="text-xs font-medium uppercase tracking-wide text-[#0EA5A0]">
            {product.brand.name}
          </span>
        )}

        <Link
          href={`/products/${product._id}`}
          className="line-clamp-1 text-md font-semibold text-[#1F2937] transition-colors hover:text-[#E8571F]"
        >
          {product.title}
        </Link>

        <div className="flex items-center gap-1 text-xs text-[#4B4B4B]">
          <Star size={14} className="fill-[#E8571F] text-[#E8571F]" />
          <span>{product.ratingsAverage.toFixed(1)}</span>
          <span className="text-[#B0B0B0]">&bull; {product.sold} sold</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-base font-bold text-[#1F2937]">
                  {product.priceAfterDiscount} EGP
                </span>
                <span className="text-xs text-[#B0B0B0] line-through">
                  {product.price} EGP
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-[#1F2937]">
                {product.price} EGP
              </span>
            )}
          </div>
          <WishlistCartButton prodId={`${product._id}`} />
        </div>
      </div>
    </div>
  );
}
