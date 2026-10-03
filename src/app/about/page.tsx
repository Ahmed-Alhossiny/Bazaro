import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Handshake,
  Heart,
  Package,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Active sellers", value: "12K+" },
  { label: "Products listed", value: "500K+" },
  { label: "Happy customers", value: "1.2M+" },
  { label: "Countries served", value: "40+" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    description:
      "Every seller is verified and every order is protected, so you can shop with confidence every time.",
  },
  {
    icon: Sparkles,
    title: "Curated Quality",
    description:
      "We hand-review listings and surface only the products worth your time — no clutter, no noise.",
  },
  {
    icon: Handshake,
    title: "Fair for Everyone",
    description:
      "Low fees and transparent pricing mean sellers keep more, and buyers always get honest value.",
  },
  {
    icon: Globe2,
    title: "Built to Scale",
    description:
      "From your first sale to your millionth, our platform grows with you — locally and globally.",
  },
];

const timeline = [
  {
    year: "2021",
    title: "Bazaro is founded",
    description:
      "Started by a small team who believed online marketplaces could be simpler and fairer.",
  },
  {
    year: "2023",
    title: "Crossed 100K sellers",
    description:
      "Expanded into new categories and launched seller tools that cut listing time in half.",
  },
  {
    year: "2025",
    title: "Went global",
    description:
      "Opened cross-border shipping and localized checkout in over 40 countries.",
  },
  {
    year: "2026",
    title: "Today",
    description:
      "Over a million shoppers trust Bazaro every month to find what they need, from who they trust.",
  },
];

export default function About() {
  return (
    <main className="bg-[#F7F5F2]">
      <section className="relative overflow-hidden bg-[#1F2937] px-6 py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,160,0.25)_0%,rgba(31,41,55,0)_55%),radial-gradient(circle_at_85%_80%,rgba(232,87,31,0.18)_0%,rgba(31,41,55,0)_55%)]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#0EA5A0]/30 bg-[#0EA5A0]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#0EA5A0]">
            <Sparkles size={14} />
            About Bazaro
          </span>

          <h1
            className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            A marketplace built{" "}
            <span className="text-[#E8571F]">around trust</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#B8BDC6] sm:text-lg">
            Bazaro connects independent sellers with millions of shoppers
            worldwide — making it easy to discover great products, and easy to
            sell them, without the friction of traditional marketplaces.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={"/products"}
              className="group inline-flex w-fit items-center gap-2 rounded-lg bg-[#E8571F] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#D14A16]"
            >
              Start Shopping
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href={"/sell"}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Become a Seller
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center"
            >
              <p
                className="text-2xl font-bold text-white sm:text-3xl"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-[#8E93A0] sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0EA5A0] sm:text-sm">
              Our Story
            </p>
            <h2
              className="mb-5 text-3xl font-bold leading-tight tracking-tight text-[#1F2937] sm:text-4xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              We started Bazaro because shopping online{" "}
              <span className="text-[#E8571F]">shouldn't feel risky</span>
            </h2>
            <p className="mb-4 text-sm leading-7 text-[#4B4B4B] sm:text-base">
              Too many marketplaces bury great sellers under noise, charge
              hidden fees, and leave buyers guessing whether a deal is real. We
              set out to build something different: a platform where quality is
              verified, pricing is transparent, and every transaction is
              protected.
            </p>
            <p className="mb-8 text-sm leading-7 text-[#4B4B4B] sm:text-base">
              Today, Bazaro is home to thousands of independent sellers and
              millions of shoppers — but the goal hasn't changed. We're still
              building the marketplace we'd want to use ourselves.
            </p>

            <ul className="space-y-3">
              {[
                "Verified sellers, every time",
                "Buyer protection on every order",
                "No hidden fees, ever",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#1F2937] sm:text-base"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-[#0EA5A0]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-[#1F2937]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(14,165,160,0.35)_0%,rgba(31,41,55,0)_55%),radial-gradient(circle_at_25%_80%,rgba(232,87,31,0.3)_0%,rgba(31,41,55,0)_55%)]" />
            <div className="relative flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <Package size={28} className="text-white" />
              </div>
              <p
                className="text-xl font-bold text-white sm:text-2xl"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                500,000+ products
              </p>
              <p className="max-w-xs text-sm text-[#B8BDC6]">
                Curated from sellers across 40+ countries, updated every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0EA5A0] sm:text-sm">
              What We Stand For
            </p>
            <h2
              className="text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              The values behind every order
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-black/10 bg-[#F7F5F2] p-6 transition-colors hover:border-[#0EA5A0]/30 hover:bg-white"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F2937] transition-colors group-hover:bg-[#E8571F]">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3
                    className="mb-2 text-lg font-bold text-[#1F2937]"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-sm leading-6 text-[#7A7A7A]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0EA5A0] sm:text-sm">
              Our Journey
            </p>
            <h2
              className="text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              From idea to global marketplace
            </h2>
          </div>

          <div className="relative space-y-8 border-l border-black/10 pl-8">
            {timeline.map((item) => (
              <div key={item.year} className="relative">
                <span className="absolute left-[-38.5px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-4 border-[#F7F5F2] bg-[#E8571F]" />
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#0EA5A0]">
                  {item.year}
                </p>
                <h3
                  className="mb-1.5 text-lg font-bold text-[#1F2937] sm:text-xl"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-[#7A7A7A] sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-4xl bg-linear-to-br from-[#0EA5A0]/15 via-white to-white shadow-[0_0_80px_-20px_rgba(14,165,160,0.35)]">
          <div className="grid grid-cols-1 items-center gap-8 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#0EA5A0]/30 bg-[#0EA5A0]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#0EA5A0]">
                <Heart size={14} />
                Join the community
              </span>
              <h2
                className="mb-3 text-2xl font-bold leading-tight tracking-tight text-[#1F2937] sm:text-3xl"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Whether you're buying or selling,{" "}
                <span className="text-[#E8571F]">Bazaro has your back</span>
              </h2>
              <p className="max-w-lg text-sm leading-6 text-[#4B4B4B] sm:text-base">
                Join thousands of sellers and over a million shoppers who trust
                Bazaro to make online commerce simple, fair, and safe.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href={"/products"}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#E8571F] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#D14A16]"
              >
                Start Shopping
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href={"/sell"}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-7 py-3.5 text-sm font-semibold text-[#1F2937] transition-colors hover:bg-[#F7F5F2]"
              >
                <Users size={16} />
                Become a Seller
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 border-t border-black/5 bg-white/60 px-6 py-5 sm:gap-10">
            <div className="flex items-center gap-2 text-sm text-[#4B4B4B]">
              <div className="flex items-center gap-0.5">
                <Star size={14} className="fill-[#E8571F] text-[#E8571F]" />
                <Star size={14} className="fill-[#E8571F] text-[#E8571F]" />
                <Star size={14} className="fill-[#E8571F] text-[#E8571F]" />
                <Star size={14} className="fill-[#E8571F] text-[#E8571F]" />
                <Star size={14} className="fill-[#E8571F] text-[#E8571F]" />
              </div>
              4.9 average rating
            </div>
            <div className="flex items-center gap-2 text-sm text-[#4B4B4B]">
              <ShieldCheck size={16} className="text-[#0EA5A0]" />
              Buyer protection included
            </div>
            <div className="flex items-center gap-2 text-sm text-[#4B4B4B]">
              <Target size={16} className="text-[#0EA5A0]" />
              40+ countries served
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
