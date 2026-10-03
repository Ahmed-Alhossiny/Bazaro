import { ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import deskImg from "../../../public/desktop-hero-bg.jpg";
import mobileImg from "../../../public/mobile-hero-bg.jpg";

export default function Hero() {
  return (
    <section className="relative isolate flex h-screen items-center overflow-hidden">
      <Image
        src={mobileImg}
        alt="Bazaro seasonal collection"
        fill
        priority
        className="object-cover lg:hidden"
      />
      <Image
        src={deskImg}
        alt="Bazaro seasonal collection"
        fill
        priority
        className="hidden object-cover lg:block"
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_65%_at_50%_50%,rgba(247,245,242,0.92),rgba(247,245,242,0))]" />

      <div className="relative mx-auto w-full max-w-3xl px-6 text-center">
        <span className="inline-flex items-center rounded-full bg-[#0EA5A0]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#0EA5A0]">
          New season arrivals
        </span>

        <h1
          className="mt-5 text-4xl font-bold leading-tight text-[#1F2937] sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Shop Smarter,
          <br />
          Live Better
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[#4B4B4B] sm:text-lg">
          Fashion, electronics, and everyday essentials from trusted brands —
          all in one place, at prices that make sense.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/products"
            className="rounded-lg bg-[#E8571F] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#D14A16]"
          >
            Shop Now
          </Link>
          <Link
            href="/categories"
            className="rounded-lg border border-[#1F2937]/20 px-8 py-3.5 text-sm font-semibold text-[#1F2937] transition-colors hover:bg-[#1F2937]/5"
          >
            Browse Categories
          </Link>
        </div>

        <div className="hidden sm:flex mt-10 flex-wrap items-center justify-center gap-x-8 gap-y-3 text-md text-[#4B4B4B]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#0EA5A0]" />
            100% secure checkout
          </div>
          <div className="flex items-center gap-2">
            <Star size={20} className="fill-[#E8571F] text-[#E8571F]" />
            <span>4.8 rated by 12k+ shoppers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
