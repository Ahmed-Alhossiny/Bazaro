"use client";

import { ChevronDown, Menu, Search } from "lucide-react";
import Link from "next/link";
import Aside from "./Aside";
import { useEffect, useRef, useState } from "react";
import MobileSearchOverlay from "./SearchOverlay";
import { useRouter } from "next/navigation";
import useLiveSearch from "@/hooks/useLiveSearch";
import SearchResultsDropdown from "./SearchResultsDropdown";
import ProfileDropdown from "../ui/ProfileDropDown";
import CartNavButton from "../ui/CartNavButton";

export default function Navbar({ categories }: any) {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { search, isLoaded } = useLiveSearch();

  const { products: matchedProducts, brands: matchedBrands } = search(
    searchQuery,
    5,
    3,
  );
  const showDropdown = isSearchFocused && searchQuery.trim().length > 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    setIsSearchFocused(false);
    router.push(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
  }

  function handleSearchKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setIsSearchFocused(false);
    }
  }

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="hidden sticky top-0 z-50 w-full bg-[#1F2937] px-6 py-4 md:block">
        <div className="mx-auto flex justify-between max-w-7xl items-center">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Bazaro
            </span>
          </Link>

          <div ref={searchContainerRef} className="flex-1 max-w-md">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7A7A]"
              />
              <input
                type="text"
                autoComplete="off"
                placeholder="Search for products , brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={handleSearchKeyDown}
                className="w-full rounded-lg bg-[#F7F5F2] py-2 pl-10 pr-4 text-sm text-[#1A1A1A] placeholder:text-[#7A7A7A] focus:outline-none focus:ring-2 focus:ring-[#E8571F]"
              />
            </form>

            {showDropdown && (
              <SearchResultsDropdown
                products={matchedProducts}
                brands={matchedBrands}
                query={searchQuery}
                isLoading={!isLoaded}
                onSelect={() => setIsSearchFocused(false)}
              />
            )}
          </div>

          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/"
                className="text-sm font-medium text-white transition-colors hover:text-[#0EA5A0]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-sm font-medium text-white transition-colors hover:text-[#0EA5A0]"
              >
                Shop
              </Link>
            </li>
            <li className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-white transition-colors hover:text-[#0EA5A0] cursor-pointer"
              >
                Categories
                <ChevronDown
                  size={16}
                  className="group-hover:rotate-180 transition-all duration-250"
                />
              </button>
              <div className="invisible z-50 absolute left-0 top-full w-56 pt-2 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
                <div className="rounded-lg bg-white py-2 shadow-lg">
                  <Link
                    href="/categories"
                    className="block px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#F7F5F2] hover:text-[#0EA5A0]"
                  >
                    All Categories
                  </Link>
                  {categories.map((category: any) => (
                    <Link
                      key={category._id}
                      href={`/products?category=${category._id}`}
                      className="block px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#F7F5F2] hover:text-[#0EA5A0]"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link
                href="/brands"
                className="text-sm font-medium text-white transition-colors hover:text-[#0EA5A0]"
              >
                Brands
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm font-medium text-white transition-colors hover:text-[#0EA5A0]"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-sm font-medium text-white transition-colors hover:text-[#0EA5A0]"
              >
                About
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <ProfileDropdown />
            <CartNavButton />
          </div>
        </div>
      </nav>
      {/* MOBILE NAVBAR */}
      <nav className="w-full sticky top-0 z-50 md:hidden bg-[#1F2937] px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Open menu"
              className="text-white hover:text-[#0EA5A0] transition-colors cursor-pointer"
            >
              <Menu
                size={25}
                onClick={() => {
                  setIsAsideOpen(true);
                }}
              />
            </button>
            <button
              onClick={() => {
                setIsSearchOpen(true);
              }}
              type="button"
              aria-label="Search"
              className="text-white hover:text-[#0EA5A0] transition-colors cursor-pointer"
            >
              <Search size={25} />
            </button>
          </div>

          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Bazaro
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <ProfileDropdown />
            <CartNavButton />
          </div>
        </div>

        {/* Mobile Aside */}
        <Aside
          categories={categories}
          isOpen={isAsideOpen}
          onClose={() => {
            setIsAsideOpen(false);
          }}
        />

        {/* Mobile Search Overlay */}
        <MobileSearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </nav>
    </>
  );
}
