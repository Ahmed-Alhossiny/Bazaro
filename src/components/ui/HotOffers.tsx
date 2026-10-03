import GetDiscountProds from "@/utils/GetDiscountProds";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CountdownTimer from "./CountdownTimer";

export default async function HotOffers() {
  const allDiscountedProds = await GetDiscountProds();

  return (
    <section className="bg-[#F7F5F2] px-6 py-20">
      <div className="mb-10 text-center">
        <h2
          className="text-3xl font-bold text-[#1F2937] sm:text-4xl"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Hot Offers
        </h2>
        <p className="mt-3 text-sm text-[#7A7A7A] sm:text-base">
          Unbeatable prices on products you’ll love
        </p>
      </div>
      <div className="mx-auto max-w-6xl">
        <Carousel className="w-full">
          <CarouselContent className="items-start">
            {allDiscountedProds.map((offer) => {
              return (
                <CarouselItem key={offer.id}>
                  <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-[#1F2937] lg:grid-cols-2">
                    <div className="relative aspect-square md:aspect-auto">
                      <Image
                        src={offer.imageCover}
                        alt="EOS M50 Mark II Mirrorless Digital Camera"
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-[#E8571F] px-3 py-1 text-xs font-semibold text-white">
                        {`-${Math.round(
                          ((offer.price - offer.priceAfterDiscount!) /
                            offer.price) *
                            100,
                        )}%`}
                      </span>
                    </div>

                    <div className="flex flex-col justify-center px-6 py-5 sm:px-8 sm:py-8">
                      <span className="inline-flex w-fit items-center rounded-full bg-[#0EA5A0]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0EA5A0]">
                        Hot Offer
                      </span>

                      <h2
                        className="mt-2 md:mt-3 text-xl font-bold line-clamp-1 md:line-clamp-none text-white sm:text-2xl"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {offer.title}
                      </h2>

                      <p className="mt-1 md:mt-2 max-w-md text-sm line-clamp-1 md:line-clamp-none leading-relaxed text-[#B8BDC6]">
                        {offer.description}
                      </p>

                      <div className="mt-3 md:mt-4 flex items-baseline gap-3">
                        <span className="text-2xl font-bold text-white">
                          {offer.priceAfterDiscount} EGP
                        </span>
                        <span className="text-sm text-[#8E93A0] line-through">
                          {offer.price} EGP
                        </span>
                      </div>

                      <CountdownTimer />

                      <div className="mt-4 md:mt-5">
                        <div className="mb-2 flex items-center justify-between text-xs text-[#8E93A0]">
                          <span>Claimed: 68%</span>
                          <span>Only 32 left</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                          <div className="h-full w-[68%] rounded-full bg-[#E8571F]" />
                        </div>
                      </div>

                      <Link
                        href={`/products/${offer.id}`}
                        className="mt-5 md:mt-6 group inline-flex w-fit items-center gap-2 rounded-lg bg-[#E8571F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#D14A16]"
                      >
                        Shop This Deal
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-2 transition-all duration-300"
                        />
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
