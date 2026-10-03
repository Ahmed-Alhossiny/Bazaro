import AllCats from "@/components/ui/AllCats";
import BrandsInfiniteScroll from "@/components/ui/BrandsInfiniteScroll";
import FeatProds from "@/components/ui/FeatProds";
import Hero from "@/components/ui/Hero";
import HotOffers from "@/components/ui/HotOffers";
import NewsLetter from "@/components/ui/NewsLetter";

export default function Home() {
  return (
    <>
      <Hero />
      <AllCats />
      <FeatProds />
      <HotOffers />
      <BrandsInfiniteScroll />
      <NewsLetter />
    </>
  );
}
