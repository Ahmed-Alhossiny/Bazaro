"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, useCart } from "@/hooks/useCart";
import {
  ArrowIcon,
  BagIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/ui/CartIcons";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function SkeletonRow() {
  return (
    <div className="flex animate-pulse gap-4">
      <div className="h-24 w-24 shrink-0 rounded-2xl bg-[#F7F5F2] sm:h-28 sm:w-28" />
      <div className="flex-1 space-y-3 py-1">
        <div className="h-4 w-4/5 rounded bg-[#F7F5F2]" />
        <div className="h-4 w-2/5 rounded bg-[#F7F5F2]" />
        <div className="h-9 w-28 rounded-full bg-[#F7F5F2]" />
      </div>
    </div>
  );
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const {
    query,
    products,
    itemCount,
    total,
    isGuest,
    isLoading,
    isError,
    isBusy,
    updateCount,
    removeItem,
    refetch,
  } = useCart();

  const checkoutHref = isGuest
    ? "/login?callbackUrl=%2Fcart"
    : `/cart/${query.data?.cartId}`;

  useEffect(
    function () {
      if (!open) return;

      function handleKey(event: KeyboardEvent) {
        if (event.key === "Escape") onClose();
      }

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKey);

      return function () {
        document.body.style.overflow = previousOverflow;
        document.removeEventListener("keydown", handleKey);
      };
    },
    [open, onClose],
  );

  const rows = [];
  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    const productId = item.product._id;

    rows.push(
      <li key={item._id} className="flex gap-4">
        <Link
          href={"/products/" + productId}
          onClick={onClose}
          className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#F7F5F2] p-2 transition-opacity hover:opacity-80 sm:h-28 sm:w-28"
        >
          <Image
            src={item.product.imageCover}
            alt={item.product.title}
            fill
            sizes="(max-width: 640px) 96px, 112px"
            className="object-contain mix-blend-multiply p-2"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#1F2937] sm:text-base">
              <Link
                href={"/products/" + productId}
                onClick={onClose}
                className="transition-colors hover:text-[#E8571F]"
              >
                {item.product.title}
              </Link>
            </h3>
            <p className="mt-1 text-xs text-[#1A1A1A]/60">
              {item.product.brand?.name}
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <div className="flex items-center rounded-full bg-[#F7F5F2] p-1">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={isBusy || item.count <= 1}
                  onClick={function () {
                    updateCount(productId, item.count - 1);
                  }}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <MinusIcon />
                </button>
                <span className="min-w-8 text-center text-sm font-semibold text-[#1A1A1A]">
                  {item.count}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={isBusy}
                  onClick={function () {
                    updateCount(productId, item.count + 1);
                  }}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <PlusIcon />
                </button>
              </div>

              <button
                type="button"
                aria-label="Remove item"
                disabled={isBusy}
                onClick={function () {
                  removeItem(productId);
                }}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#1A1A1A]/50 transition hover:bg-[#F7F5F2] hover:text-[#0EA5A0] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <TrashIcon />
              </button>
            </div>

            <span className="text-sm font-bold text-[#1A1A1A] sm:text-base">
              {formatPrice(item.price * item.count)}
            </span>
          </div>
        </div>
      </li>,
    );
  }

  const skeletons = [];
  for (let i = 0; i < 3; i++) {
    skeletons.push(<SkeletonRow key={i} />);
  }

  const panelPosition = open
    ? "translate-y-0 lg:translate-x-0"
    : "translate-y-full lg:translate-y-0 lg:translate-x-full";

  return (
    <div
      className={
        "fixed inset-0 z-60 " +
        (open ? "pointer-events-auto" : "pointer-events-none")
      }
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={
          "absolute inset-0 bg-[#1F2937]/50 backdrop-blur-sm transition-opacity duration-300 " +
          (open ? "opacity-100" : "opacity-0")
        }
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={
          "absolute inset-x-0 bottom-0 flex max-h-[90dvh] flex-col rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 ease-out " +
          "lg:inset-y-0 lg:bottom-auto lg:left-auto lg:right-0 lg:h-dvh lg:max-h-none lg:w-130 lg:rounded-none lg:rounded-l-3xl " +
          panelPosition
        }
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-[#1F2937]/15 lg:hidden" />

        <header className="flex items-start justify-between px-5 pb-4 pt-4 sm:px-7 lg:pt-7">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1F2937]">
              Cart
            </h2>
            <p className="mt-1 text-sm text-[#1A1A1A]/60">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={onClose}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#F7F5F2] text-[#1A1A1A] transition hover:bg-[#1F2937] hover:text-white"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 pb-4 sm:px-7">
          {isLoading && <div className="space-y-6">{skeletons}</div>}

          {isError && (
            <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center">
              <p className="text-sm text-[#1A1A1A]/70">
                We could not load your cart.
              </p>
              <button
                type="button"
                onClick={refetch}
                className="cursor-pointer rounded-full bg-[#1F2937] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#E8571F]"
              >
                Try again
              </button>
            </div>
          )}

          {!isLoading && !isError && products.length === 0 && (
            <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-center text-[#1F2937]/40">
              <BagIcon />
              <p className="text-base font-semibold text-[#1F2937]">
                Your cart is empty
              </p>
              <Link
                href="/products"
                onClick={onClose}
                className="rounded-full bg-[#E8571F] px-7 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Start shopping
              </Link>
            </div>
          )}

          {products.length > 0 && <ul className="space-y-6">{rows}</ul>}
        </div>

        {products.length > 0 && (
          <footer className="px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 sm:px-7 lg:pb-7">
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <Link
                href="/cart"
                onClick={onClose}
                className="flex h-14 items-center justify-center rounded-full border-2 border-[#1F2937] px-6 text-sm font-semibold text-[#1F2937] transition hover:bg-[#1F2937] hover:text-white sm:shrink-0"
              >
                View cart
              </Link>

              <Link
                href={checkoutHref}
                onClick={onClose}
                className="group flex h-14 flex-1 items-center justify-between rounded-full bg-[#E8571F] p-1.5 pl-5 text-white shadow-lg shadow-[#E8571F]/25 transition hover:brightness-95"
              >
                <span className="text-lg font-extrabold tracking-tight sm:text-xl">
                  {total.toLocaleString("en-US")}
                  <span className="ml-1 text-xs font-bold">LE</span>
                </span>
                <span className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white py-1.5 pl-4 pr-1.5 text-sm font-semibold text-[#1A1A1A]">
                  {isGuest ? "Log in to checkout" : "Checkout"}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8571F] text-white transition group-hover:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </span>
              </Link>
            </div>
            <p className="mt-3 text-center text-sm text-[#1A1A1A]/60">
              Subtotal (VAT included)
            </p>
          </footer>
        )}
      </aside>
    </div>
  );
}
