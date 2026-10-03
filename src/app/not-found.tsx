import Image from "next/image";
import Link from "next/link";
import desktopImg from "../../public/desktop-404.jpg";
import mobileImg from "../../public/mobile-404.jpg";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <div className="w-full max-w-md sm:max-w-5xl">
        <Image
          src={mobileImg}
          alt="Confused character leaning on a large 404"
          className="h-auto w-full sm:hidden"
          priority
        />
        <Image
          src={desktopImg}
          alt="Confused character leaning on a large 404"
          className="hidden h-auto w-full sm:block"
          priority
        />
      </div>

      <div className="mt-5 max-w-md">
        <h1
          className="text-3xl font-bold text-[#1F2937] sm:text-4xl"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Page not found
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[#4B4B4B] sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back to shopping.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-[#E8571F] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#D14A16]"
          >
            Back to home
          </Link>
          <Link
            href="/products"
            className="rounded-lg border border-[#1F2937]/20 px-8 py-3.5 text-sm font-semibold text-[#1F2937] transition-colors hover:bg-[#1F2937]/5"
          >
            Browse shop
          </Link>
        </div>
      </div>
    </section>
  );
}
