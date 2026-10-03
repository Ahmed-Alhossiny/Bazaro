"use client";

import {
  SlidersHorizontal,
  X,
  Star,
  Plus,
  ChevronLeft,
  ChevronRight,
  PackageSearch,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import AddToCartButton from "../ui/AddToCartButton";
import AddToWishlistButton from "../ui/AddToWishlistButton";

const SORT_OPTIONS = [
  { label: "Best selling", value: "-sold" },
  { label: "Price: low to high", value: "price" },
  { label: "Price: high to low", value: "-price" },
  { label: "Top rated", value: "-ratingsAverage" },
];

export default function ProductsCards({
  products,
  categories = [],
  brands = [],
  currentPage,
  totalPages,
  wishlistIds = [],
}: {
  products: any;
  categories?: { _id: string; name: string }[];
  brands?: { _id: string; name: string }[];
  currentPage: number;
  totalPages: number;
  wishlistIds?: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || "",
  );

  function selectCategory(id: string) {
    if (selectedCategory === id) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(id);
    }
  }

  function selectBrand(id: string) {
    if (selectedBrand === id) {
      setSelectedBrand("");
    } else {
      setSelectedBrand(id);
    }
  }

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    if (selectedCategory) {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    if (selectedBrand) {
      params.set("brand", selectedBrand);
    } else {
      params.delete("brand");
    }

    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
    setIsFiltersOpen(false);
  }

  function clearFilters() {
    setSort("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("");
    setSelectedBrand("");
    router.push("/products");
    setIsFiltersOpen(false);
  }

  function goToPage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", nextPage.toString());
    router.push(`/products?${params.toString()}`);
  }

  function getPageNumbers() {
    const pages: number[] = [];
    let start = currentPage - 2;
    let end = currentPage + 2;

    if (start < 1) {
      end = end + (1 - start);
      start = 1;
    }
    if (end > totalPages) {
      start = start - (end - totalPages);
      end = totalPages;
    }
    if (start < 1) start = 1;

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <div className="mx-auto flex max-w-8xl flex-col gap-8 px-4 py-8 lg:flex-row lg:px-8">
        {isFiltersOpen ? (
          <div
            onClick={() => setIsFiltersOpen(false)}
            className="fixed inset-0 z-40 bg-[#1F2937]/40 lg:hidden"
          />
        ) : null}

        <aside
          className={
            "fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 transition-transform duration-300 lg:sticky lg:top-18 lg:z-0 lg:w-72 lg:max-h-none lg:shrink-0 lg:translate-y-0 lg:self-start lg:rounded-2xl lg:border lg:border-[#1F2937]/10 " +
            (isFiltersOpen
              ? "translate-y-0"
              : "translate-y-full lg:translate-y-0")
          }
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1F2937]">Filters</h2>
            <button
              type="button"
              onClick={() => setIsFiltersOpen(false)}
              className="rounded-full cursor-pointer p-1.5 text-[#1F2937] hover:bg-[#1F2937]/5 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-[#1F2937]/60">
              Sort by
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-lg border cursor-pointer border-[#1F2937]/15 bg-[#F7F5F2] py-2 px-2 text-sm text-[#1A1A1A] focus:border-[#E8571F] focus:outline-none focus:ring-1 focus:ring-[#E8571F]"
            >
              <option value="">Default</option>
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 border-t border-[#1F2937]/10 pt-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#1F2937]/60">
              Price range (EGP)
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 rounded-lg border border-[#1F2937]/15 bg-[#F7F5F2] py-2 px-3 text-sm text-[#1A1A1A] focus:border-[#E8571F] focus:outline-none focus:ring-1 focus:ring-[#E8571F]"
              />
              <span className="text-[#1F2937]/40">–</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 rounded-lg border border-[#1F2937]/15 bg-[#F7F5F2] py-2 px-3 text-sm text-[#1A1A1A] focus:border-[#E8571F] focus:outline-none focus:ring-1 focus:ring-[#E8571F]"
              />
            </div>
          </div>

          <details className="mb-6 border-t border-[#1F2937]/10 pt-5">
            <summary className="cursor-pointer text-xs font-medium uppercase tracking-wide text-[#1F2937]/60">
              Category
            </summary>
            <div className="mt-3">
              {categories.map((category) => (
                <label
                  key={category._id}
                  className="flex items-center gap-2 py-1.5 my-2 text-sm text-[#1A1A1A] cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category._id}
                    onChange={() => selectCategory(category._id)}
                    className="h-4 w-4 cursor-pointer border-[#1F2937]/30 text-[#E8571F] focus:ring-[#E8571F]"
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </details>

          <details className="mb-6 border-t border-[#1F2937]/10 pt-5">
            <summary className="cursor-pointer text-xs font-medium uppercase tracking-wide text-[#1F2937]/60">
              Brand
            </summary>
            <div className="mt-3 max-h-48 overflow-y-auto pr-1">
              {brands.map((brand) => (
                <label
                  key={brand._id}
                  className="flex items-center gap-2 py-1.5 my-2 text-sm text-[#1A1A1A] cursor-pointer"
                >
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === brand._id}
                    onChange={() => selectBrand(brand._id)}
                    className="h-4 w-4 border-[#1F2937]/30 cursor-pointer text-[#E8571F] focus:ring-[#E8571F]"
                  />
                  {brand.name}
                </label>
              ))}
            </div>
          </details>

          <button
            type="button"
            onClick={applyFilters}
            className="mb-3 w-full cursor-pointer rounded-lg bg-[#E8571F] py-2.5 text-sm font-medium text-white transition hover:bg-[#D14A16]"
          >
            Apply filters
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="w-full rounded-lg cursor-pointer border border-[#1F2937]/20 py-2.5 text-sm font-medium text-[#1F2937] transition hover:border-[#E8571F] hover:text-[#E8571F]"
          >
            Clear all filters
          </button>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between">
            <div className="lg:flex lg:justify-between lg:items-center lg:w-full">
              <h1 className="text-2xl font-bold text-[#1F2937]">
                All Products
              </h1>
              <p className="text-sm text-[#1F2937]/50">
                {products.length} results found
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsFiltersOpen(true)}
              className="flex items-center gap-2 rounded-lg cursor-pointer border border-[#1F2937]/15 bg-white px-4 py-2 text-sm font-medium text-[#1F2937] lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5 sm:p-6">
            {products.length == 0 ? (
              <>
                <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                  <PackageSearch size={28} className="text-[#B0B0B0]" />
                  <p className="text-sm text-[#7A7A7A]">No products found</p>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                  {products.map((product: any) => {
                    const hasDiscount =
                      typeof product.priceAfterDiscount === "number" &&
                      product.priceAfterDiscount < product.price;

                    const discountPercent = hasDiscount
                      ? Math.round(
                          ((product.price - product.priceAfterDiscount!) /
                            product.price) *
                            100,
                        )
                      : 0;

                    return (
                      <div
                        key={product._id}
                        className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-black/5 transition-shadow hover:shadow-md"
                      >
                        <div className="relative">
                          <Link
                            href={`/products/${product._id}`}
                            className="block aspect-square overflow-hidden bg-[#F7F5F2]"
                          >
                            <Image
                              src={product.imageCover}
                              alt={product.title}
                              fill
                              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
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
                            initialWished={wishlistIds.includes(product._id)}
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

                          <p className="line-clamp-1 text-sm text-[#7A7A7A]">
                            {product.description}
                          </p>

                          <div className="flex items-center gap-1 text-xs text-[#4B4B4B]">
                            <Star
                              size={14}
                              className="fill-[#E8571F] text-[#E8571F]"
                            />
                            <span>{product.ratingsAverage.toFixed(1)}</span>
                            <span className="text-[#B0B0B0]">
                              &bull; {product.sold} sold
                            </span>
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
                            <AddToCartButton
                              prodId={`${product._id}`}
                              classes="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8571F] text-white transition-colors hover:bg-[#D14A16] cursor-pointer"
                              body={<Plus size={18} />}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {totalPages > 1 && (
              <nav className="mt-8 flex items-center justify-center gap-2 border-t border-[#1F2937]/10 pt-6">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => goToPage(currentPage - 1)}
                  className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-lg text-[#1F2937] transition hover:bg-[#F7F5F2] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {getPageNumbers().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => goToPage(pageNumber)}
                    className={
                      "flex h-9 w-9 items-center cursor-pointer justify-center rounded-lg text-sm font-medium transition " +
                      (pageNumber === currentPage
                        ? "bg-[#E8571F] text-white"
                        : "text-[#1F2937] hover:bg-[#F7F5F2]")
                    }
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                  className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-lg text-[#1F2937] transition hover:bg-[#F7F5F2] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
