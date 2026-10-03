"use client";

import { Loader2Icon, PackageSearch, Search, Tag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../../../public/logo.png";
import useLiveSearch from "@/hooks/useLiveSearch";

const categoryLinks = [
  {
    label: "Women's fashion",
    href: "/products?category=6439d58a0049ad0b52b9003f",
  },
  {
    label: "Men's fashion",
    href: "/products?category=6439d5b90049ad0b52b90048",
  },
  { label: "Electronics", href: "/products?category=6439d2d167d9aa4ca970649f" },
];

interface MobileSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSearchOverlay({
  isOpen,
  onClose,
}: MobileSearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const { search, isLoaded } = useLiveSearch();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  const { products: matchedProducts, brands: matchedBrands } = search(
    searchQuery,
    5,
    3,
  );
  const hasQuery = searchQuery.trim().length > 0;
  const hasResults = matchedProducts.length > 0 || matchedBrands.length > 0;

  function closeAndReset() {
    setSearchQuery("");
    onClose();
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    router.push(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    closeAndReset();
  }

  return (
    <>
      {isOpen && (
        <div
          onClick={closeAndReset}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <div
        className={`fixed inset-x-0 top-0 z-50 max-h-screen overflow-y-auto bg-[#1F2937] px-5 py-5 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={closeAndReset}
            className="flex items-center gap-2"
          >
            <Image
              src={logo}
              alt="Bazaro logo"
              width={28}
              height={28}
              className="h-8 w-8 object-contain"
            />
            <span
              className="text-xl font-bold text-white"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Bazaro
            </span>
          </Link>

          <button
            type="button"
            onClick={closeAndReset}
            aria-label="Close search"
            className="text-white transition-colors hover:text-[#0EA5A0] cursor-pointer"
          >
            <X size={25} />
          </button>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative mt-6">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7A7A]"
          />
          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            placeholder="Search for products , brands and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-[#F7F5F2] py-2 pl-10 pr-4 text-sm text-[#1A1A1A] placeholder:text-[#7A7A7A] focus:outline-none focus:ring-2 focus:ring-[#E8571F]"
          />
        </form>

        {!hasQuery ? (
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[#8E93A0]">
              Popular
            </p>
            <ul className="flex flex-col gap-2">
              {categoryLinks.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    onClick={closeAndReset}
                    className="block rounded-lg px-3 py-2.5 text-md text-white transition-colors hover:bg-white/5 hover:text-[#0EA5A0]"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : !isLoaded ? (
          <div className="mt-6 flex items-center justify-center gap-2 py-8 text-sm text-[#8E93A0]">
            <Loader2Icon size={16} className="animate-spin" />
            Loading results...
          </div>
        ) : !hasResults ? (
          <div className="mt-6 flex flex-col items-center gap-2 py-8 text-center">
            <PackageSearch size={28} className="text-[#4B5563]" />
            <p className="text-sm text-[#8E93A0]">
              No matches for &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        ) : (
          <div className="mt-6">
            {matchedProducts.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[#8E93A0]">
                  Products
                </p>
                <ul className="flex flex-col gap-1">
                  {matchedProducts.map((product) => (
                    <li key={product._id}>
                      <Link
                        href={`/products/${product._id}`}
                        onClick={closeAndReset}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/5"
                      >
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/5">
                          <Image
                            src={product.imageCover}
                            alt={product.title}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white">
                            {product.title}
                          </p>
                          <p className="text-xs text-[#8E93A0]">
                            {product.priceAfterDiscount ?? product.price} EGP
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {matchedBrands.length > 0 && (
              <div className={matchedProducts.length > 0 ? "mt-5" : ""}>
                <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[#8E93A0]">
                  Brands
                </p>
                <ul className="flex flex-col gap-1">
                  {matchedBrands.map((brand) => (
                    <li key={brand._id}>
                      <Link
                        href={`/products?brand=${brand._id}`}
                        onClick={closeAndReset}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/5"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0EA5A0]/15 text-[#0EA5A0]">
                          <Tag size={14} />
                        </span>
                        <p className="text-sm font-medium text-white">
                          {brand.name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
