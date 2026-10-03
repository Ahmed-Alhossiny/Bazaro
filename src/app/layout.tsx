import type { Metadata } from "next";
import { Poppins, Inter, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toast";
import GetAllCat from "@/services/GetAllCat";
import { cn } from "@/lib/utils";
import MyProvider from "@/components/myProvider/MyProvider";
import Providers from "@/components/tanStackProvider/TanStackProvider";
import GuestCartMerge from "@/components/cart/GuestCartMerge";
import GuestWishlistMerger from "@/components/ui/GuestWishlistMerger";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bazaro",
  description: "Your Everyday Everything Store",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const categories = await GetAllCat();

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        poppins.variable,
        inter.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <MyProvider>
            <GuestCartMerge />
            <GuestWishlistMerger />
            <Navbar categories={categories} />
            {children}
            <Toaster />
            <Footer />
          </MyProvider>
        </Providers>
      </body>
    </html>
  );
}
