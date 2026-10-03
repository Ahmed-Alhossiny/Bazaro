import ProductsCards from "@/components/allProducts/ProductsCards";
import GetAllProducts from "@/services/GetAllProds";
import GetAllCat from "@/services/GetAllCat";
import GetAllBrands from "@/services/GetAllBrands";
import { getWishlistIds } from "@/services/GetWishlistIds";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    sort?: string;
    keyword?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const page = params.page ? Number(params.page) : 1;
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;

  const wishlistIds = await getWishlistIds();

  const [{ products, totalPages, currentPage }, categories, brands] =
    await Promise.all([
      GetAllProducts({
        category: params.category,
        brand: params.brand,
        sort: params.sort,
        keyword: params.keyword,
        minPrice,
        maxPrice,
        page,
      }),
      GetAllCat(),
      GetAllBrands(),
    ]);

  return (
    <ProductsCards
      products={products}
      categories={categories}
      brands={brands}
      currentPage={currentPage}
      totalPages={totalPages}
      wishlistIds={wishlistIds}
    />
  );
}
