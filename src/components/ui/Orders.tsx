"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Banknote,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  MapPin,
  PackageSearch,
  Phone,
} from "lucide-react";
import { formatPrice } from "@/hooks/useCart";
import { Order } from "@/types/OrderType";
import { getUserOrders } from "@/services/GetUserOrders";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function byNewest(a: Order, b: Order) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

function countUnits(order: Order) {
  let units = 0;
  for (let i = 0; i < order.cartItems.length; i++) {
    units += order.cartItems[i].count;
  }
  return units;
}

function itemsSubtotal(order: Order) {
  let subtotal = 0;
  for (let i = 0; i < order.cartItems.length; i++) {
    subtotal += order.cartItems[i].price * order.cartItems[i].count;
  }
  return subtotal;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="h-3 w-12 rounded bg-[#F7F5F2]" />
          <div className="h-6 w-24 rounded bg-[#F7F5F2]" />
          <div className="h-4 w-36 rounded bg-[#F7F5F2]" />
        </div>
        <div className="h-8 w-28 rounded-full bg-[#F7F5F2]" />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="h-16 w-16 rounded-xl bg-[#F7F5F2]" />
          <div className="h-16 w-16 rounded-xl bg-[#F7F5F2]" />
        </div>
        <div className="h-8 w-24 rounded bg-[#F7F5F2]" />
      </div>
    </div>
  );
}

function OrderCard({
  order,
  open,
  onToggle,
}: {
  order: Order;
  open: boolean;
  onToggle: () => void;
}) {
  const units = countUnits(order);
  const subtotal = itemsSubtotal(order);
  const isCard = order.paymentMethodType === "card";

  const thumbs = [];
  const shown = order.cartItems.length > 4 ? 4 : order.cartItems.length;
  for (let i = 0; i < shown; i++) {
    const item = order.cartItems[i];
    thumbs.push(
      <div
        key={item._id}
        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#F7F5F2] p-1.5 ring-2 ring-white sm:h-16 sm:w-16"
      >
        <Image
          src={item.product.imageCover}
          alt={item.product.title}
          fill
          sizes="(max-width: 640px) 56px, 64px"
          className="object-contain mix-blend-multiply p-1.5"
        />
      </div>,
    );
  }
  if (order.cartItems.length > 4) {
    thumbs.push(
      <div
        key="more"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#1F2937] text-sm font-bold text-white ring-2 ring-white sm:h-16 sm:w-16"
      >
        +{order.cartItems.length - 4}
      </div>,
    );
  }

  const itemRows = [];
  for (let i = 0; i < order.cartItems.length; i++) {
    const item = order.cartItems[i];
    const productId = item.product._id;

    itemRows.push(
      <li key={item._id} className="flex gap-3 sm:gap-4">
        <Link
          href={"/products/" + productId}
          className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#F7F5F2] p-2 transition-opacity hover:opacity-80 sm:h-24 sm:w-24"
        >
          <Image
            src={item.product.imageCover}
            alt={item.product.title}
            fill
            sizes="(max-width: 640px) 80px, 96px"
            className="object-contain mix-blend-multiply p-2"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[#1F2937] sm:text-base">
              <Link
                href={"/products/" + productId}
                className="transition-colors hover:text-[#E8571F]"
              >
                {item.product.title}
              </Link>
            </h3>
            {item.product.brand?.name && (
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#0EA5A0]">
                {item.product.brand.name}
              </p>
            )}
          </div>

          <div className="mt-2 flex items-end justify-between gap-2">
            <p className="text-xs text-[#1A1A1A]/60 sm:text-sm">
              {item.count} × {formatPrice(item.price)}
            </p>
            <p className="text-sm font-bold text-[#1A1A1A] sm:text-base">
              {formatPrice(item.price * item.count)}
            </p>
          </div>
        </div>
      </li>,
    );
  }

  const statusClasses = order.isDelivered
    ? "bg-[#0EA5A0]/10 text-[#0EA5A0]"
    : "bg-[#E8571F]/10 text-[#E8571F]";

  const paidClasses = order.isPaid
    ? "bg-[#0EA5A0]/10 text-[#0EA5A0]"
    : "bg-[#1F2937]/10 text-[#1F2937]";

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer flex-col gap-5 p-5 text-left sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#1A1A1A]/50">
              Order
            </p>
            <h2 className="text-xl font-extrabold tracking-tight text-[#1F2937] sm:text-2xl">
              #{order.id}
            </h2>
            <p className="mt-1 text-sm text-[#1A1A1A]/60">
              {formatDate(order.createdAt)} · {units}{" "}
              {units === 1 ? "item" : "items"}
            </p>
          </div>

          <span
            className={
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm " +
              statusClasses
            }
          >
            {order.isDelivered ? <Check size={14} /> : <Clock size={14} />}
            {order.isDelivered ? "Delivered" : "Processing"}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex -space-x-3">{thumbs}</div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="text-right">
              <p className="text-xs text-[#1A1A1A]/50">Total</p>
              <p className="text-lg font-extrabold tracking-tight text-[#1F2937] sm:text-xl">
                {formatPrice(order.totalOrderPrice)}
              </p>
            </div>
            <span
              className={
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F7F5F2] text-[#1F2937] transition-transform duration-300 " +
                (open ? "rotate-180" : "rotate-0")
              }
            >
              <ChevronDown size={18} />
            </span>
          </div>
        </div>
      </button>

      <div
        aria-hidden={!open}
        className={
          "grid transition-[grid-template-rows] duration-300 ease-out " +
          (open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
        }
      >
        <div className="overflow-hidden">
          <div className="border-t border-[#1F2937]/10 p-5 sm:p-6">
            <ul className="space-y-5">{itemRows}</ul>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[#F7F5F2] p-4 sm:p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-[#1F2937]">
                  <MapPin size={16} className="text-[#E8571F]" />
                  Shipping address
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]">
                  {order.shippingAddress.details}
                </p>
                <p className="text-sm text-[#1A1A1A]/70">
                  {order.shippingAddress.city}
                  {order.shippingAddress.postalCode
                    ? ", " + order.shippingAddress.postalCode
                    : ""}
                </p>
                <p className="mt-3 flex items-center gap-2 text-sm text-[#1A1A1A]/70">
                  <Phone size={14} />
                  {order.shippingAddress.phone}
                </p>
              </div>

              <div className="rounded-2xl bg-[#F7F5F2] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-[#1F2937]">
                    {isCard ? (
                      <CreditCard size={16} className="text-[#E8571F]" />
                    ) : (
                      <Banknote size={16} className="text-[#E8571F]" />
                    )}
                    {isCard ? "Card payment" : "Cash on delivery"}
                  </h3>
                  <span
                    className={
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold " +
                      paidClasses
                    }
                  >
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </span>
                </div>

                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-[#1A1A1A]/70">Items</dt>
                    <dd className="font-semibold text-[#1A1A1A]">
                      {formatPrice(subtotal)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-[#1A1A1A]/70">Shipping</dt>
                    <dd className="font-semibold text-[#1A1A1A]">
                      {order.shippingPrice === 0
                        ? "Free"
                        : formatPrice(order.shippingPrice)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-[#1A1A1A]/70">Tax</dt>
                    <dd className="font-semibold text-[#1A1A1A]">
                      {formatPrice(order.taxPrice)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#1F2937]/10 pt-3">
                    <dt className="font-bold text-[#1F2937]">Total</dt>
                    <dd className="text-base font-extrabold text-[#1F2937]">
                      {formatPrice(order.totalOrderPrice)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Orders() {
  const { status, data: sessionData } = useSession();
  const session: any = sessionData;
  const id = session?.user?.id || "";

  const [openId, setOpenId] = useState<string | null>(null);

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Order[]>({
    queryKey: ["orders", id],
    enabled: id !== "",
    queryFn: function () {
      return getUserOrders(id);
    },
  });

  function handleToggle(orderId: string) {
    setOpenId(openId === orderId ? null : orderId);
  }

  const sorted = orders.slice().sort(byNewest);

  const cards = [];
  for (let i = 0; i < sorted.length; i++) {
    const order = sorted[i];
    cards.push(
      <OrderCard
        key={order._id}
        order={order}
        open={openId === order._id}
        onToggle={function () {
          handleToggle(order._id);
        }}
      />,
    );
  }

  const skeletons = [];
  for (let i = 0; i < 3; i++) {
    skeletons.push(<SkeletonCard key={i} />);
  }

  const showLoading =
    status === "loading" ||
    (status === "authenticated" && id !== "" && isLoading);
  const showLogin = status === "unauthenticated";
  const showError =
    status === "authenticated" && (id === "" || isError) && !showLoading;
  const showEmpty =
    status === "authenticated" &&
    id !== "" &&
    !isLoading &&
    !isError &&
    sorted.length === 0;
  const showList = sorted.length > 0 && !showLoading && !showLogin;

  return (
    <section className="min-h-screen bg-[#F7F5F2]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
        <header className="mb-8 flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#1F2937] sm:text-4xl">
              My Orders
            </h1>
            {showList && (
              <p className="mt-1 text-sm text-[#1A1A1A]/60">
                {sorted.length} {sorted.length === 1 ? "order" : "orders"}
              </p>
            )}
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F2937] transition-colors hover:text-[#0EA5A0]"
          >
            Continue shopping
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </header>

        {showLoading && <div className="space-y-4">{skeletons}</div>}

        {showLogin && (
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-black/5">
            <PackageSearch size={44} className="text-[#1F2937]/30" />
            <p className="text-xl font-bold text-[#1F2937]">
              Log in to see your orders
            </p>
            <Link
              href="/login?callbackUrl=%2Fallorders"
              className="rounded-full bg-[#E8571F] px-7 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Log in
            </Link>
          </div>
        )}

        {showError && (
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-black/5">
            <p className="text-base text-[#1A1A1A]/70">
              We could not load your orders.
            </p>
            <button
              type="button"
              onClick={function () {
                refetch();
              }}
              className="cursor-pointer rounded-full bg-[#1F2937] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E8571F]"
            >
              Try again
            </button>
          </div>
        )}

        {showEmpty && (
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-6 py-20 text-center shadow-sm ring-1 ring-black/5">
            <PackageSearch size={44} className="text-[#1F2937]/30" />
            <p className="text-xl font-bold text-[#1F2937]">No orders yet</p>
            <p className="max-w-xs text-sm text-[#1A1A1A]/60">
              When you place an order, it will show up here.
            </p>
            <Link
              href="/products"
              className="rounded-full bg-[#E8571F] px-7 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Start shopping
            </Link>
          </div>
        )}

        {showList && <div className="space-y-4">{cards}</div>}
      </div>
    </section>
  );
}
