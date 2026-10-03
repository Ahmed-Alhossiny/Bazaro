"use client";

import Image from "next/image";
import Link from "next/link";
import { Loader2Icon, PackageSearch, Tag } from "lucide-react";
import { SearchProduct, SearchBrand } from "@/hooks/useLiveSearch";

export default function SearchResultsDropdown({
  products,
  brands,
  query,
  isLoading,
  onSelect,
}: {
  products: SearchProduct[];
  brands: SearchBrand[];
  query: string;
  isLoading: boolean;
  onSelect: () => void;
}) {
  const hasResults = products.length > 0 || brands.length > 0;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl bg-white shadow-[0_20px_40px_-20px_rgba(31,41,55,0.35)] ring-1 ring-black/5">
      {isLoading ? (
        <div className="flex items-center justify-center gap-2 px-4 py-8 text-sm text-[#7A7A7A]">
          <Loader2Icon size={16} className="animate-spin" />
          Loading results...
        </div>
      ) : !hasResults ? (
        <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
          <PackageSearch size={28} className="text-[#B0B0B0]" />
          <p className="text-sm text-[#7A7A7A]">
            No matches for &ldquo;{query}&rdquo;
          </p>
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto py-2">
          {products.length > 0 && (
            <div>
              <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-[#7A7A7A]">
                Products
              </p>
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  onClick={onSelect}
                  className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-[#F7F5F2]"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#F7F5F2]">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#1F2937]">
                      {product.title}
                    </p>
                    <p className="text-xs text-[#7A7A7A]">
                      {product.priceAfterDiscount ?? product.price} EGP
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {brands.length > 0 && (
            <div
              className={
                products.length > 0
                  ? "mt-2 border-t border-[#1F2937]/10 pt-2"
                  : ""
              }
            >
              <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-[#7A7A7A]">
                Brands
              </p>
              {brands.map((brand) => (
                <Link
                  key={brand._id}
                  href={`/products?brand=${brand._id}`}
                  onClick={onSelect}
                  className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-[#F7F5F2]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0EA5A0]/10 text-[#0EA5A0]">
                    <Tag size={14} />
                  </span>
                  <p className="text-sm font-medium text-[#1F2937]">
                    {brand.name}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
