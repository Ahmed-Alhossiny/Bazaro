import Image from "next/image";
import Link from "next/link";
import GetAllCat from "@/services/GetAllCat";

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default async function AllCats() {
  const categories: Category[] = await GetAllCat();

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F7F5F2] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2
            className="text-3xl font-bold text-[#1F2937] sm:text-4xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Shop by Category
          </h2>
          <p className="mt-3 text-sm text-[#7A7A7A] sm:text-base">
            Explore our wide range of products across every category
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/products?category=${category._id}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative h-30 w-40 rounded-2xl overflow-hidden border-2 border-transparent shadow-sm ring-1 ring-black/5 transition-all duration-300 group-hover:border-[#0EA5A0] group-hover:shadow-md sm:h-35 sm:w-45">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 640px) 112px, 96px"
                  className="object-center transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-center text-sm font-medium text-[#1F2937] transition-colors group-hover:text-[#E8571F]">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
