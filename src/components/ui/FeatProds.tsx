import { Plus, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import GetAllProds from "@/services/GetAllProds";
import getRandom from "@/utils/GetRandoms";
import AddToCartButton from "./AddToCartButton";
import AddToWishlistButton from "./AddToWishlistButton";
import { getWishlistIds } from "@/services/GetWishlistIds";

interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  sold: number;
  ratingsAverage: number;
  brand?: {
    name: string;
  };
}

export default async function FeatProds() {
  const { products } = await GetAllProds({ limit: 50 });
  const allProducts: Product[] = products;
  const featProducts = getRandom(allProducts, 10);
  const wishlistIds = await getWishlistIds();

  if (!featProducts || featProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2
            className="text-3xl font-bold text-[#1F2937] sm:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Featured Products
          </h2>
          <p className="mt-3 text-sm text-[#7A7A7A] sm:text-base">
            Hand-picked favorites our customers love most
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {featProducts.map((product: any) => {
            const hasDiscount =
              typeof product.priceAfterDiscount === "number" &&
              product.priceAfterDiscount < product.price;

            const discountPercent = hasDiscount
              ? Math.round(
                  ((product.price - product.priceAfterDiscount!) /
                    product.price) *
                    100,
                )
              : 0;

            return (
              <div
                key={product._id}
                className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-black/5 transition-shadow hover:shadow-md"
              >
                <div className="relative">
                  <Link
                    href={`/products/${product._id}`}
                    className="block aspect-square overflow-hidden bg-[#F7F5F2]"
                  >
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  {hasDiscount && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#E8571F] px-2.5 py-1 text-xs font-semibold text-white">
                      -{discountPercent}%
                    </span>
                  )}

                  <AddToWishlistButton
                    prodId={product._id}
                    body={false}
                    initialWished={wishlistIds.includes(product._id)}
                  />
                </div>

                <div className="flex flex-1 flex-col gap-1.5 p-4">
                  {product.brand?.name && (
                    <span className="text-xs font-medium uppercase tracking-wide text-[#0EA5A0]">
                      {product.brand.name}
                    </span>
                  )}

                  <Link
                    href={`/products/${product._id}`}
                    className="line-clamp-1 text-md font-semibold text-[#1F2937] transition-colors hover:text-[#E8571F]"
                  >
                    {product.title}
                  </Link>

                  <p className="line-clamp-1 text-sm text-[#7A7A7A]">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-[#4B4B4B]">
                    <Star size={14} className="fill-[#E8571F] text-[#E8571F]" />
                    <span>{product.ratingsAverage.toFixed(1)}</span>
                    <span className="text-[#B0B0B0]">
                      &bull; {product.sold} sold
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-baseline gap-2">
                      {hasDiscount ? (
                        <>
                          <span className="text-base font-bold text-[#1F2937]">
                            {product.priceAfterDiscount} EGP
                          </span>
                          <span className="text-xs text-[#B0B0B0] line-through">
                            {product.price} EGP
                          </span>
                        </>
                      ) : (
                        <span className="text-base font-bold text-[#1F2937]">
                          {product.price} EGP
                        </span>
                      )}
                    </div>
                    <AddToCartButton
                      prodId={`${product._id}`}
                      classes="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8571F] text-white transition-colors hover:bg-[#D14A16] cursor-pointer"
                      body={<Plus size={18} />}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
