"use client";

import { Heart, LogOut, MapPin, Package, Settings, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "./toast";

const menuLinks = [
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/allorders", label: "My Orders", icon: Package },
  { href: "/wishlist", label: "My Wishlist", icon: Heart },
  { href: "/addresses", label: "My Addresses", icon: MapPin },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { status, data: sessionData } = useSession();

  const isAuthenticated = status === "authenticated";
  const userName = sessionData?.user?.name || "";
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function handleSignOut() {
    closeMenu();
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
    toast.add({
      type: "success",
      description: "Signed out successfully.",
    });
  }

  function renderMenuLinks() {
    const items = [];

    for (let i = 0; i < menuLinks.length; i++) {
      const item = menuLinks[i];
      const Icon = item.icon;

      items.push(
        <Link
          key={item.href}
          href={item.href}
          onClick={closeMenu}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#1A1A1A] transition-colors hover:bg-[#F7F5F2] hover:text-[#0EA5A0]"
        >
          <Icon size={18} />
          {item.label}
        </Link>,
      );
    }

    return items;
  }

  if (!isAuthenticated) {
    return (
      <Link
        href="/signup"
        aria-label="Profile"
        className="text-white transition-colors hover:text-[#0EA5A0] cursor-pointer"
      >
        <User size={25} />
      </Link>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="Profile menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={toggleMenu}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#E8571F] text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        {userInitial}
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute -right-11 top-full z-50 mt-3 w-64 overflow-hidden rounded-lg bg-white shadow-lg"
        >
          <div className="flex items-center gap-3 border-b border-[#E5E5E5] px-4 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8571F] text-base font-semibold text-white">
              {userInitial}
            </div>
            <span className="truncate text-sm font-semibold text-[#1A1A1A]">
              {userName}
            </span>
          </div>

          <div className="py-2">{renderMenuLinks()}</div>

          <div className="border-t border-[#E5E5E5] py-2">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-[#E8571F] transition-colors hover:bg-[#F7F5F2]"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
