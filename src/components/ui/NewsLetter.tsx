import {
  ArrowRight,
  Mail,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Truck,
} from "lucide-react";
import Image from "next/image";
import AppStore from "../../../public/app-store.png";
import GooglePlay from "../../../public/google-play.png";

export default function NewsLetter() {
  return (
    <section className="bg-[#F7F5F2] px-6 py-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-4xl bg-linear-to-br from-[#0EA5A0]/15 via-white to-white shadow-[0_0_80px_-20px_rgba(14,165,160,0.35)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-black/10">
          <div className="px-4 py-7 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-14 lg:py-14">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F2937] sm:mb-5 sm:h-12 sm:w-12">
              <Mail size={20} className="text-[#F7F5F2]" />
            </div>

            <p className="mb-2 text-xs font-semibold tracking-wide text-[#0EA5A0] sm:text-sm">
              Newsletter &bull; 50,000+ subscribers
            </p>

            <h2
              className="mb-3 text-2xl font-bold leading-tight tracking-tight text-[#1F2937] sm:text-3xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Get the best deals{" "}
              <span className="text-[#E8571F]">delivered free</span>
            </h2>

            <p className="mb-6 max-w-[50ch] text-sm leading-6 text-[#4B4B4B] sm:mb-7 sm:text-base sm:leading-7">
              Weekly drops, seasonal sales, and member-only perks — plus 10% off
              your first order when you sign up.
            </p>

            <div className="mb-6 flex flex-wrap gap-2 sm:mb-7 sm:gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs text-[#1F2937] sm:px-4 sm:text-sm">
                <Sparkles size={14} className="shrink-0 text-[#0EA5A0]" />
                New arrivals weekly
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs text-[#1F2937] sm:px-4 sm:text-sm">
                <Truck size={14} className="shrink-0 text-[#0EA5A0]" />
                Free delivery codes
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs text-[#1F2937] sm:px-4 sm:text-sm">
                <Tag size={14} className="shrink-0 text-[#0EA5A0]" />
                Members-only deals
              </span>
            </div>

            <form className="flex w-full flex-col gap-2.5 sm:flex-row sm:gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                required
                aria-label="Email address"
                className="h-12 min-w-0 w-full rounded-lg border border-black/10 bg-white px-4 text-sm text-[#1A1A1A] outline-none transition-all duration-150 placeholder:text-[#9BA1AC] focus:border-[#E8571F] focus:ring-2 focus:ring-[#E8571F]/10 sm:h-13 sm:text-[15px]"
              />
              <button
                type="submit"
                className="flex h-12 w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border-0 bg-[#E8571F] px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#D14A16] focus:outline-none focus:ring-2 focus:ring-[#E8571F]/30 active:scale-[0.99] cursor-pointer sm:h-13 sm:w-auto sm:text-[15px]"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>

            <p className="mt-3 flex items-start gap-1.5 text-xs leading-5 text-[#7A7A7A] sm:items-center sm:text-sm">
              <ShieldCheck
                size={14}
                className="mt-0.5 shrink-0 text-[#0EA5A0] sm:mt-0"
              />
              <span>Unsubscribe anytime. No spam, ever.</span>
            </p>
          </div>
          <div className="relative flex flex-col justify-center p-3 lg:p-4">
            <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-[#1F2937] px-4 py-7 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-14 h-full">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,165,160,0.25)_0%,rgba(31,41,55,0)_60%)]" />

              <div className="relative">
                <span className="mb-4 inline-flex w-fit items-center rounded-full border border-[#0EA5A0]/30 bg-[#0EA5A0]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#0EA5A0] sm:mb-5">
                  Mobile App
                </span>

                <h2
                  className="mb-3 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Shop Faster on Our App
                </h2>

                <p className="mb-6 text-sm leading-6 text-[#B8BDC6] sm:mb-7 sm:text-base sm:leading-7">
                  Get app-exclusive deals &amp; 15% off your first order.
                </p>

                <div className="w-full text-center mb-3">
                  <span
                    className="text-[20px] font-semibold uppercase text-white"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Download
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://www.apple.com/eg/app-store"
                    target="_blank"
                    className="rounded-xl border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10"
                  >
                    <Image
                      src={AppStore}
                      alt="Get it on app store"
                      width={200}
                    />
                  </a>
                  <a
                    href="https://play.google.com"
                    target="_blank"
                    className="rounded-xl border border-white/10 bg-white/5 p-2 transition-colors hover:bg-white/10"
                  >
                    <Image
                      src={GooglePlay}
                      alt="Get it on google play"
                      width={195}
                    />
                  </a>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-[#B8BDC6] sm:mt-7">
                  <div className="flex items-center gap-0.5">
                    <Star size={14} className="fill-[#E8571F] text-[#E8571F]" />
                    <Star size={14} className="fill-[#E8571F] text-[#E8571F]" />
                    <Star size={14} className="fill-[#E8571F] text-[#E8571F]" />
                    <Star size={14} className="fill-[#E8571F] text-[#E8571F]" />
                    <Star size={14} className="fill-[#E8571F] text-[#E8571F]" />
                  </div>
                  <span>4.9 &bull; 100K+ downloads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
