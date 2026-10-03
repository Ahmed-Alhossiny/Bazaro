"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  cover,
  title,
}: {
  images: string[];
  cover: string;
  title: string;
}) {
  const allImages = [cover, ...images.filter((img) => img !== cover)];
  const [active, setActive] = useState(allImages[0]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="scrollbar-hide flex gap-3 overflow-x-auto sm:h-135 sm:w-20 sm:flex-col sm:overflow-x-visible sm:overflow-y-auto">
        {allImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(img)}
            className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 sm:w-full ${
              active === img
                ? "border-[#E8571F]"
                : "border-black/10 opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`${title} ${i + 1}`}
              fill
              sizes="80px"
              className="object-cover cursor-pointer"
            />
          </button>
        ))}
      </div>

      <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-2xl bg-white border border-black/10">
        <Image
          src={active}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-6 transition-opacity duration-300"
          priority
        />
      </div>
    </div>
  );
}
