"use client";

import { ChevronDown, CircleUserRound, Heart, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { useSession } from "next-auth/react";

interface AsideProps {
  isOpen: boolean;
  onClose: () => void;
  categories: any;
}

export default function Aside({ isOpen, onClose, categories }: AsideProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const { status, data: sessionData } = useSession();

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-[#1F2937] px-5 py-5 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
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
            onClick={onClose}
            aria-label="Close menu"
            className="text-white transition-colors hover:text-[#0EA5A0] cursor-pointer"
          >
            <X size={25} />
          </button>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-2 overflow-y-auto">
          <Link
            href="/"
            onClick={onClose}
            className="rounded-lg px-3 py-2.5 text-md font-medium text-white transition-colors hover:bg-white/5 hover:text-[#0EA5A0]"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={onClose}
            className="rounded-lg px-3 py-2.5 text-md font-medium text-white transition-colors hover:bg-white/5 hover:text-[#0EA5A0]"
          >
            Shop
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-md font-medium text-white transition-colors hover:bg-white/5 hover:text-[#0EA5A0] cursor-pointer"
            >
              Categories
              <ChevronDown
                size={20}
                className={`transition-transform duration-300 ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isCategoriesOpen && (
              <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-white/10 pl-3">
                <Link
                  href="/categories"
                  onClick={onClose}
                  className="rounded-lg px-3 py-3 text-md text-[#B8BDC6] transition-colors hover:text-[#0EA5A0]"
                >
                  All Categories
                </Link>
                {categories.map((category: any) => (
                  <Link
                    key={category._id}
                    href={`/products?category=${category._id}`}
                    onClick={onClose}
                    className="rounded-lg px-3 py-3 text-md text-[#B8BDC6] transition-colors hover:text-[#0EA5A0]"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/brands"
            onClick={onClose}
            className="rounded-lg px-3 py-2.5 text-md font-medium text-white transition-colors hover:bg-white/5 hover:text-[#0EA5A0]"
          >
            Brands
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="rounded-lg px-3 py-2.5 text-md font-medium text-white transition-colors hover:bg-white/5 hover:text-[#0EA5A0]"
          >
            Contact
          </Link>
          <Link
            href="/about"
            onClick={onClose}
            className="rounded-lg px-3 py-2.5 text-md font-medium text-white transition-colors hover:bg-white/5 hover:text-[#0EA5A0]"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center justify-between border-t border-white/10 pt-5">
          <Link
            href={status == "authenticated" ? "/profile" : "/signup"}
            onClick={onClose}
            className="flex items-center gap-2 text-md font-bold text-white transition-colors hover:text-[#0EA5A0]"
          >
            <CircleUserRound size={22} />
            {status == "authenticated" ? `${sessionData.user.name}` : "Sign Up"}
          </Link>
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex items-center gap-2 text-md font-bold text-white transition-colors hover:text-[#0EA5A0]"
          >
            <Heart size={22} />
            Wishlist
          </Link>
        </div>
      </aside>
    </>
  );
}
