"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, useCart } from "@/hooks/useCart";
import {
  ArrowIcon,
  BagIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/ui/CartIcons";

function SkeletonCard() {
  return (
    <div className="flex animate-pulse gap-4 rounded-3xl bg-white p-4 sm:gap-6 sm:p-5">
      <div className="h-28 w-28 shrink-0 rounded-2xl bg-[#F7F5F2] sm:h-36 sm:w-36" />
      <div className="flex-1 space-y-3 py-2">
        <div className="h-5 w-3/4 rounded bg-[#F7F5F2]" />
        <div className="h-4 w-1/3 rounded bg-[#F7F5F2]" />
        <div className="h-10 w-32 rounded-full bg-[#F7F5F2]" />
      </div>
    </div>
  );
}

export default function Cart() {
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
    clearCart,
    refetch,
  } = useCart();

  const checkoutHref = isGuest
    ? "/login?callbackUrl=%2Fcart"
    : `/cart/${query.data?.cartId}`;

  const rows = [];
  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    const productId = item.product._id;

    rows.push(
      <li
        key={item._id}
        className="flex gap-4 rounded-3xl bg-white p-4 sm:gap-6 sm:p-5"
      >
        <Link
          href={"/products/" + productId}
          className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-[#F7F5F2] p-3 transition-opacity hover:opacity-80 sm:h-36 sm:w-36"
        >
          <Image
            src={item.product.imageCover}
            alt={item.product.title}
            fill
            sizes="(max-width: 640px) 112px, 144px"
            className="object-contain mix-blend-multiply p-3"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="line-clamp-2 text-base font-semibold leading-snug text-[#1F2937] sm:text-lg">
                <Link
                  href={"/products/" + productId}
                  className="transition-colors hover:text-[#E8571F]"
                >
                  {item.product.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-[#1A1A1A]/60">
                {item.product.brand?.name} · {item.product.category?.name}
              </p>
              <p className="mt-1 text-sm text-[#1A1A1A]/60">
                {formatPrice(item.price)} each
              </p>
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

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center rounded-full bg-[#F7F5F2] p-1">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={isBusy || item.count <= 1}
                onClick={function () {
                  updateCount(productId, item.count - 1);
                }}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <MinusIcon />
              </button>
              <span className="min-w-10 text-center text-sm font-semibold text-[#1A1A1A]">
                {item.count}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                disabled={isBusy}
                onClick={function () {
                  updateCount(productId, item.count + 1);
                }}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#1A1A1A] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <PlusIcon />
              </button>
            </div>

            <span className="text-lg font-bold text-[#1A1A1A] sm:text-xl">
              {formatPrice(item.price * item.count)}
            </span>
          </div>
        </div>
      </li>,
    );
  }

  const skeletons = [];
  for (let i = 0; i < 3; i++) {
    skeletons.push(<SkeletonCard key={i} />);
  }

  const hasItems = products.length > 0;

  return (
    <section className="min-h-screen bg-[#F7F5F2]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <header className="mb-8 flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#1F2937] sm:text-4xl">
              Cart
            </h1>
            <p className="mt-1 text-sm text-[#1A1A1A]/60">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F2937] transition-colors hover:text-[#0EA5A0]"
          >
            Continue shopping
            <span className="transition-transform group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </header>

        {isLoading && (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">{skeletons}</div>
            <div className="h-72 animate-pulse rounded-3xl bg-white" />
          </div>
        )}

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

        {!isLoading && !isError && !hasItems && (
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-6 py-20 text-center text-[#1F2937]/40">
            <BagIcon />
            <p className="text-xl font-bold text-[#1F2937]">
              Your cart is empty
            </p>
            <Link
              href="/products"
              className="rounded-full bg-[#E8571F] px-7 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Start shopping
            </Link>
          </div>
        )}

        {hasItems && (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">
            <div>
              <div className="mb-4 flex justify-end">
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={clearCart}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[#1A1A1A]/60 transition-colors hover:text-[#0EA5A0] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <TrashIcon />
                  Clear cart
                </button>
              </div>
              <ul className="space-y-4">{rows}</ul>
            </div>

            <aside className="rounded-3xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-xl font-extrabold text-[#1F2937]">
                Order summary
              </h2>

              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-[#1A1A1A]/70">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </dt>
                  <dd className="font-semibold text-[#1A1A1A]">
                    {formatPrice(total)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#1A1A1A]/70">Shipping</dt>
                  <dd className="font-semibold text-[#1A1A1A]">
                    Calculated at checkout
                  </dd>
                </div>
              </dl>

              <div className="my-6 border-t border-[#1F2937]/10" />

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-[#1A1A1A]/70">Total</p>
                  <span className="mt-1 inline-block rounded-full bg-[#0EA5A0]/10 px-2.5 py-0.5 text-xs font-semibold text-[#0EA5A0]">
                    VAT included
                  </span>
                </div>
                <p className="text-3xl font-extrabold tracking-tight text-[#1F2937]">
                  {total.toLocaleString("en-US")}
                  <span className="ml-1 text-sm font-bold">LE</span>
                </p>
              </div>

              <Link
                href={checkoutHref}
                className="group mt-6 flex h-14 items-center justify-between rounded-full bg-[#E8571F] p-1.5 pl-6 text-white shadow-lg shadow-[#E8571F]/25 transition hover:brightness-95"
              >
                <span className="text-base font-bold">
                  {isGuest ? "Log in to checkout" : "Checkout"}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#E8571F] transition group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
