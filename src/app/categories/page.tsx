import GetAllCat from "@/services/GetAllCat";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const cats = await GetAllCat();
  console.log(cats);

  return (
    <section className="bg-[#F7F5F2] px-6 py-20">
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#0EA5A0] sm:text-sm">
          Shop by Category
        </p>
        <h2
          className="text-3xl font-bold text-[#1F2937] sm:text-4xl"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Essential Categories
        </h2>
        <p className="mt-3 text-sm text-[#7A7A7A] sm:text-base">
          Explore our wide range of products across every category
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {cats.map((cat: any) => {
          return (
            <Link
              key={cat._id}
              href={`/products?category=${cat._id}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-black/10 bg-white px-6 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#0EA5A0]/30 hover:shadow-[0_16px_40px_-16px_rgba(31,41,55,0.25)]"
            >
              <div className="relative h-20 w-full sm:h-24">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(min-width: 1024px) 20vw, 33vw"
                  className="object-fit transition-transform duration-300 group-hover:scale-95"
                />
              </div>

              <h3 className="mt-5 line-clamp-1 text-sm font-semibold text-[#1F2937] sm:text-base">
                {cat.name}
              </h3>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#1F2937]/0 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-[#1F2937]/90 group-hover:opacity-100 group-hover:backdrop-blur-[2px]">
                <span className="flex translate-y-2 items-center gap-1.5 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  View Products
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>

              <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#0EA5A0]/0 blur-2xl transition-colors duration-300 group-hover:bg-[#0EA5A0]/20" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
