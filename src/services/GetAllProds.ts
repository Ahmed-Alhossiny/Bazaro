type ProductParams = {
  limit?: number;
  page?: number;
  sort?: string;
  fields?: string;
  keyword?: string;
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

export default async function GetAllProducts({
  limit = 24,
  page = 1,
  sort,
  fields,
  keyword,
  brand,
  category,
  minPrice,
  maxPrice,
}: ProductParams = {}) {
  const params = new URLSearchParams();

  params.set("limit", limit.toString());
  params.set("page", page.toString());

  if (sort) params.set("sort", sort);
  if (fields) params.set("fields", fields);
  if (keyword) params.set("keyword", keyword);
  if (brand) params.set("brand", brand);
  if (category) params.set("category", category);
  if (minPrice !== undefined) params.set("price[gte]", minPrice.toString());
  if (maxPrice !== undefined) params.set("price[lte]", maxPrice.toString());

  const response = await fetch(
    `${process.env.API_BASE_URL}/products?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return {
    products: data.data,
    totalPages: data.metadata ? data.metadata.numberOfPages : 1,
    currentPage: page,
  };
}

export async function GetAllProductsAcrossPages(params: ProductParams = {}) {
  const firstPageResult = await GetAllProducts({
    ...params,
    page: 1,
    limit: 40,
  });

  let allProducts = firstPageResult.products;
  const totalPages = firstPageResult.totalPages;

  if (totalPages > 1) {
    const remainingPageRequests = [];
    for (let i = 2; i <= totalPages; i++) {
      remainingPageRequests.push(
        GetAllProducts({ ...params, page: i, limit: 40 }),
      );
    }

    const remainingResults = await Promise.all(remainingPageRequests);

    for (let i = 0; i < remainingResults.length; i++) {
      allProducts = allProducts.concat(remainingResults[i].products);
    }
  }

  return allProducts;
}
