"use client";

import {
  ChevronDown,
  Heart,
  MapPin,
  Package,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const accountLinks = [
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/allorders", label: "My Orders", icon: Package },
  { href: "/wishlist", label: "My Wishlist", icon: Heart },
  { href: "/addresses", label: "My Addresses", icon: MapPin },
  { href: "/settings", label: "Settings", icon: Settings },
];

function checkIsActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export default function AccountLinks() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  let activeItem = accountLinks[0];

  for (let i = 0; i < accountLinks.length; i++) {
    if (checkIsActive(pathname, accountLinks[i].href)) {
      activeItem = accountLinks[i];
      break;
    }
  }

  const ActiveIcon = activeItem.icon;

  const activeClasses = "bg-[#E8571F] text-white shadow-sm";
  const inactiveClasses =
    "text-[#1A1A1A] hover:bg-[#F7F5F2] hover:text-[#0EA5A0]";

  const desktopItems = [];
  const mobileItems = [];

  for (let i = 0; i < accountLinks.length; i++) {
    const item = accountLinks[i];
    const Icon = item.icon;
    const isActive = checkIsActive(pathname, item.href);

    desktopItems.push(
      <li key={item.href}>
        <Link
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={
            "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors " +
            (isActive ? activeClasses : inactiveClasses)
          }
        >
          <Icon size={18} />
          {item.label}
        </Link>
      </li>,
    );

    mobileItems.push(
      <li key={item.href} role="none">
        <Link
          href={item.href}
          role="menuitem"
          onClick={closeMenu}
          aria-current={isActive ? "page" : undefined}
          className={
            "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors " +
            (isActive ? activeClasses : inactiveClasses)
          }
        >
          <Icon size={18} />
          {item.label}
        </Link>
      </li>,
    );
  }

  return (
    <>
      <div ref={containerRef} className="relative lg:hidden">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={toggleMenu}
          className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium text-[#1F2937] shadow-sm"
        >
          <span className="flex items-center gap-3">
            <ActiveIcon size={18} className="text-[#E8571F]" />
            {activeItem.label}
          </span>
          <ChevronDown
            size={18}
            className={
              "transition-transform duration-300 " +
              (isOpen ? "rotate-180" : "")
            }
          />
        </button>

        {isOpen && (
          <ul
            role="menu"
            aria-label="Account"
            className="absolute left-0 right-0 top-full z-40 mt-2 flex flex-col gap-1 rounded-lg bg-white p-2 shadow-lg"
          >
            {mobileItems}
          </ul>
        )}
      </div>

      <nav
        aria-label="Account"
        className="hidden rounded-lg bg-white p-3 shadow-sm lg:block"
      >
        <ul className="flex flex-col gap-2">{desktopItems}</ul>
      </nav>
    </>
  );
}
