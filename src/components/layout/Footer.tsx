import {
  Headphones,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/long-logo.png";
import visa from "../../../public/Visa.svg";
import mastercard from "../../../public/Mastercard.svg";
import paypal from "../../../public/PayPal.svg";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.79-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 3H21l-6.55 7.49L22.5 21h-6.7l-5.25-6.87L4.5 21H2.4l7-8.01L1.5 3h6.86l4.74 6.28L18.9 3Zm-1.17 16.17h1.16L7.34 4.75H6.1l11.63 14.42Z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 8.4s-.2-1.5-.8-2.2c-.8-.8-1.7-.8-2.1-.9C16.3 5 12 5 12 5s-4.3 0-7.1.3c-.4 0-1.3.1-2.1.9C2.2 6.9 2 8.4 2 8.4S1.8 10.1 1.8 11.9v1.2c0 1.8.2 3.5.2 3.5s.2 1.5.8 2.2c.8.9 1.9.8 2.4.9 1.7.2 7.2.3 7.2.3s4.3 0 7.1-.3c.4 0 1.3-.1 2.1-.9.6-.7.8-2.2.8-2.2s.2-1.7.2-3.5v-1.2c0-1.8-.2-3.5-.2-3.5ZM9.8 15V8.9l5.4 3.05L9.8 15Z" />
    </svg>
  );
}

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "Electronics", href: "/products?category=6439d2d167d9aa4ca970649f" },
  {
    label: "Men's Fashion",
    href: "/products?category=6439d5b90049ad0b52b90048",
  },
  {
    label: "Women's Fashion",
    href: "/products?category=6439d58a0049ad0b52b9003f",
  },
];

const accountLinks = [
  { label: "My Account", href: "/profile" },
  { label: "Order History", href: "/allorders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Shopping Cart", href: "/cart" },
  { label: "Sign In", href: "/login" },
  { label: "Create Account", href: "/signup" },
];

const highlights = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On orders over 500 EGP",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    subtitle: "14-day return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    subtitle: "100% secure checkout",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    subtitle: "Contact us anytime",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="grid grid-cols-1 gap-6 bg-[#E6F5F3] px-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="flex lg:justify-center items-center gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0EA5A0]/10">
              <item.icon size={20} className="text-[#0EA5A0]" />
            </div>
            <div>
              <p className="text-[18px] font-semibold text-[#1A1A1A]">
                {item.title}
              </p>
              <p className="text-xs text-[#4B4B4B]">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1F2937] px-6 py-12">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-10">
          <div className="mb-10 lg:mb-0">
            <div>
              <Image src={logo} alt="Bazaro" className="w-fit h-25" priority />
            </div>
            <p className="mt-4 max-w-sm text-[18px] leading-relaxed text-[#B8BDC6]">
              Bazaro is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            <div className="mt-5 space-y-2 text-[18px] text-[#B8BDC6]">
              <div className="flex items-center gap-2">
                <Phone size={20} className="text-[#0EA5A0]" />
                <a href="tel:+201001234567">+20 100 123 4567</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-[#0EA5A0]" />
                <a href="mailto:support@bazaro.com">support@bazaro.com</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-[#0EA5A0]" />
                <a
                  href="https://maps.app.goo.gl/TwRDnxwKb8jkA9Er7"
                  target="_blank"
                >
                  Damietta, Egypt
                </a>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href="https://www.facebook.com"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#E8571F]"
              >
                <FacebookIcon size={25} />
              </Link>
              <Link
                href="https://www.x.com"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#E8571F]"
              >
                <TwitterIcon size={25} />
              </Link>
              <Link
                href="https://www.instagram.com"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#E8571F]"
              >
                <InstagramIcon size={25} />
              </Link>
              <Link
                href="https://www.youtube.com"
                aria-label="Youtube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#E8571F]"
              >
                <YoutubeIcon size={25} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 lg:contents">
            <div>
              <h3
                className="mb-4 text-[20px] font-bold text-white"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Shop
              </h3>
              <ul className="space-y-2.5">
                {shopLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[18px] text-[#B8BDC6] transition-colors hover:text-[#0EA5A0]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="mb-4 text-[20px] font-bold text-white"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Account
              </h3>
              <ul className="space-y-2.5">
                {accountLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[18px] text-[#B8BDC6] transition-colors hover:text-[#0EA5A0]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-[18px] text-[#8E93A0]">
            © {year} Bazaro. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[18px] text-[#8E93A0]">
            <Image src={visa} alt="Visa" className="w-20 h-20 cursor-pointer" />
            <Image
              src={mastercard}
              alt="Mastercard"
              className="w-20 h-20 cursor-pointer"
            />
            <Image
              src={paypal}
              alt="Paypal"
              className="w-20 h-20 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
