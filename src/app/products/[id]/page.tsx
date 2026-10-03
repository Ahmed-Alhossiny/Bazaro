import ProductActions from "@/components/productDetails/ProductActions";
import ProductGallery from "@/components/productDetails/ProductGallery";
import ProductTabs from "@/components/productDetails/ProductTabs";
import GetProdDetails from "@/services/GetProdDetails";
import { CheckCircle2, ChevronRight, ShoppingBag, Star } from "lucide-react";
import Link from "next/link";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await GetProdDetails(id);

  const inStock = product.quantity > 0;

  return (
    <section className="bg-[#F7F5F2] px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center gap-1.5 text-xs text-[#7A7A7A] sm:text-sm">
          <Link href="/" className="hover:text-[#1F2937]">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            href={`/products?category=${product.category._id}`}
            className="hover:text-[#1F2937]"
          >
            {product.category.name}
          </Link>
          <ChevronRight size={14} />
          <span className="line-clamp-1 text-[#1F2937]">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ProductGallery
            images={product.images}
            cover={product.imageCover}
            title={product.title}
          />

          <div className="flex flex-col">
            <div className="mb-3 flex items-center gap-3">
              <span className="inline-flex w-fit items-center rounded-full bg-[#0EA5A0]/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#0EA5A0]">
                {product.brand.name}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-[#8E93A0]">
                <ShoppingBag size={13} />
                {product.sold} sold
              </span>
            </div>

            <h1
              className="text-2xl font-bold leading-tight tracking-tight text-[#1F2937] sm:text-3xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {product.title}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i <= Math.round(product.ratingsAverage)
                        ? "fill-[#E8571F] text-[#E8571F]"
                        : "text-[#D9D9D9]"
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#1F2937]">
                {product.ratingsAverage.toFixed(1)}
              </span>
              <span className="text-sm text-[#8E93A0]">
                ({product.ratingsQuantity} reviews)
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span
                className="text-3xl font-bold text-[#1F2937] sm:text-4xl"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {product.price} EGP
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <CheckCircle2
                size={16}
                className={inStock ? "text-[#0EA5A0]" : "text-[#E8571F]"}
              />
              <span
                className={
                  inStock
                    ? "font-medium text-[#0EA5A0]"
                    : "font-medium text-[#E8571F]"
                }
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </span>
              {inStock && (
                <span className="text-[#8E93A0]">
                  &bull; {product.quantity} units available
                </span>
              )}
            </div>

            <div className="my-7 h-px w-full bg-black/10" />

            <ProductActions prodId={`${id}`} maxQuantity={product.quantity} />
          </div>
        </div>

        <ProductTabs
          description={product.description}
          reviews={product.reviews}
          ratingsAverage={product.ratingsAverage}
          ratingsQuantity={product.ratingsQuantity}
        />
      </div>
    </section>
  );
}
