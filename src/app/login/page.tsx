import LogInForm from "@/components/auth/LogInForm";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import Link from "next/link";

const perks = [
  "Shop from independent sellers",
  "Track your orders every step of the way",
  "Message sellers directly",
];

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F5F2] px-6 py-16">
      <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-4xl bg-white shadow-[0_30px_60px_-30px_rgba(31,41,55,0.35)] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#1F2937] px-10 py-12 lg:flex">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,160,0.25)_0%,rgba(31,41,55,0)_55%),radial-gradient(circle_at_80%_85%,rgba(232,87,31,0.2)_0%,rgba(31,41,55,0)_55%)]" />

          <div className="relative">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8571F]">
                <ShoppingBag size={18} className="text-white" />
              </div>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                bazaro
              </span>
            </div>

            <h1
              className="mt-10 text-3xl font-bold leading-tight tracking-tight text-white xl:text-4xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Good to see you again.
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#B8BDC6] sm:text-base">
              Log in to pick up right where you left off.
            </p>
          </div>

          <div className="relative flex flex-col gap-4 py-5">
            <div className="rounded-2xl bg-white/5 p-5 backdrop-blur-sm ring-1 ring-white/10">
              <p className="text-sm leading-6 text-[#D8DBE0]">
                “I found handmade pieces I couldn't get anywhere else, and they
                showed up right on time.”
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0EA5A0]/20 text-xs font-semibold text-[#0EA5A0]">
                  MN
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-semibold text-white">Mona N.</p>
                  <p className="text-[11px] text-[#8E93A0]">Verified Buyer</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-lg font-bold text-white">10k+</p>
                <p className="text-[11px] text-[#8E93A0]">Active sellers</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <p className="text-lg font-bold text-white">50k+</p>
                <p className="text-[11px] text-[#8E93A0]">Products listed</p>
              </div>
            </div>
          </div>

          <ul className="relative flex flex-col gap-3.5">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-3 text-sm text-white sm:text-base"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0EA5A0]/15">
                  <CheckCircle2 size={14} className="text-[#0EA5A0]" />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <div className="mb-8 text-center">
            <h2
              className="text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Log in to your account
            </h2>
            <p className="mt-2 text-sm text-[#7A7A7A] sm:text-base">
              Welcome back to Bazaro.
            </p>
          </div>

          <LogInForm />

          <p className="mt-6 text-center text-sm text-[#7A7A7A]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold underline text-[#E8571F] hover:text-[#D14A16]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
