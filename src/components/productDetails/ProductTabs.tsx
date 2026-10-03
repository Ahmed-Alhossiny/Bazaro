"use client";

import { useState } from "react";
import {
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";

interface Review {
  _id: string;
  review: string;
  rating: number;
  user: { _id: string; name: string };
  createdAt: string;
}

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(rating)
              ? "fill-[#E8571F] text-[#E8571F]"
              : "text-[#D9D9D9]"
          }
        />
      ))}
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProductTabs({
  description,
  reviews,
  ratingsAverage,
  ratingsQuantity,
}: {
  description: string;
  reviews: Review[];
  ratingsAverage: number;
  ratingsQuantity: number;
}) {
  const [tab, setTab] = useState<"description" | "reviews" | "shipping">(
    "description",
  );

  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    return {
      star,
      count,
      pct: reviews.length ? (count / reviews.length) * 100 : 0,
    };
  });

  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: `Reviews (${ratingsQuantity})` },
    { id: "shipping", label: "Shipping & Returns" },
  ] as const;

  return (
    <div className="mt-16">
      <div className="flex gap-1 overflow-x-auto border-b border-black/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`shrink-0 whitespace-nowrap cursor-pointer border-b-2 px-5 py-3.5 text-sm font-semibold transition-colors ${
              tab === t.id
                ? "border-[#E8571F] text-[#1F2937]"
                : "border-transparent text-[#8E93A0] hover:text-[#1F2937]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "description" && (
        <div className="max-w-3xl py-8">
          {description.split("\n").map((line, i) => {
            const [key, value] = line.split("\t");
            if (value) {
              return (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-black/5 py-3 text-sm sm:text-base"
                >
                  <span className="text-[#7A7A7A]">{key}</span>
                  <span className="font-medium text-[#1F2937]">{value}</span>
                </div>
              );
            }
            return (
              <p
                key={i}
                className="text-sm leading-7 text-[#4B4B4B] sm:text-base"
              >
                {line}
              </p>
            );
          })}
        </div>
      )}

      {tab === "reviews" && (
        <div className="grid grid-cols-1 gap-10 py-8 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-black/10 bg-white p-6 lg:sticky lg:top-24">
            <div>
              <p
                className="text-5xl font-bold text-[#1F2937]"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {ratingsAverage.toFixed(1)}
              </p>
              <StarRow rating={ratingsAverage} size={16} />
              <p className="mt-1 text-xs text-[#7A7A7A] sm:text-sm">
                Based on {ratingsQuantity} reviews
              </p>
            </div>

            <div className="flex w-full flex-col gap-2">
              {breakdown.map((b) => (
                <div
                  key={b.star}
                  className="flex items-center gap-2 text-xs text-[#7A7A7A]"
                >
                  <span className="w-8 shrink-0">{b.star}★</span>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F0EEEA]">
                    <div
                      className="h-full rounded-full bg-[#E8571F]"
                      style={{ width: `${b.pct}%` }}
                    />
                  </div>
                  <span className="w-6 shrink-0 text-right">{b.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col divide-y divide-black/5">
            {reviews.map((r) => (
              <div key={r._id} className="flex gap-4 py-5 first:pt-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1F2937] text-xs font-semibold text-white">
                  {initials(r.user.name)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#1F2937]">
                      {r.user.name}
                    </p>
                    <span className="text-xs text-[#8E93A0]">
                      {formatDate(r.createdAt)}
                    </span>
                  </div>
                  <StarRow rating={r.rating} />
                  <p className="mt-2 text-sm leading-6 text-[#4B4B4B]">
                    {r.review}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "shipping" && (
        <div className="grid grid-cols-1 gap-5 py-8 sm:grid-cols-2">
          {[
            {
              icon: Truck,
              title: "Fast Delivery",
              description:
                "Orders are processed within 24 hours and delivered in 2–5 business days depending on your location.",
            },
            {
              icon: PackageCheck,
              title: "Free Shipping",
              description:
                "Enjoy free standard shipping on all orders over 1,000 EGP. Express shipping available at checkout.",
            },
            {
              icon: RotateCcw,
              title: "14-Day Returns",
              description:
                "Not the right fit? Return any unused item within 14 days of delivery for a full refund.",
            },
            {
              icon: ShieldCheck,
              title: "Buyer Protection",
              description:
                "Every order is covered — if it doesn't arrive as described, we'll make it right.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0EA5A0]/10">
                  <Icon size={20} className="text-[#0EA5A0]" />
                </div>
                <div>
                  <h4 className="mb-1 text-base font-bold text-[#1F2937]">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-6 text-[#7A7A7A]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
