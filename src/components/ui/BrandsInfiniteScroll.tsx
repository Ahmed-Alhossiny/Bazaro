import Image from "next/image";
import GetAllBrands from "@/services/GetAllBrands";

interface Brand {
  _id: string;
  name: string;
  image: string;
}

export default async function BrandsInfiniteScroll() {
  const brands: Brand[] = await GetAllBrands();

  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2
            className="text-3xl font-bold text-[#1F2937] sm:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Trusted Brands
          </h2>
          <p className="mt-3 text-sm text-[#7A7A7A] sm:text-base">
            Shop your favorite brands, all in one place
          </p>
        </div>

        <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent_0,black_48px,black_calc(100%-48px),transparent_100%)] sm:mask-[linear-gradient(to_right,transparent_0,black_96px,black_calc(100%-96px),transparent_100%)] lg:mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)]">
          <div className="group flex w-max flex-nowrap">
            <ul className="flex animate-[infinite-scroll_50s_linear_infinite] items-center [&_li]:mx-4 group-hover:paused">
              {brands.map((brand) => (
                <li key={brand._id} className="py-1">
                  <div className="flex h-20 w-32 items-center justify-center rounded-xl bg-white p-3 ring-1 ring-black/5 transition-shadow hover:shadow-md sm:h-24 sm:w-40">
                    <div className="relative h-full w-full">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        fill
                        sizes="160px"
                        className="object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <ul
              className="flex animate-infinite-scroll items-center [&_li]:mx-4 group-hover:paused"
              aria-hidden="true"
            >
              {brands.map((brand) => (
                <li key={`${brand._id}-duplicate`}>
                  <div className="flex h-20 w-32 items-center justify-center rounded-xl bg-white p-4 ring-1 ring-black/5 transition-shadow hover:shadow-md sm:h-24 sm:w-40">
                    <div className="relative h-full w-full">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        fill
                        sizes="160px"
                        className="object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
