import { NextResponse } from "next/server";
import { GetAllProductsAcrossPages } from "@/services/GetAllProds";
import GetAllBrands from "@/services/GetAllBrands";

export async function GET() {
  try {
    const [products, brands] = await Promise.all([
      GetAllProductsAcrossPages(),
      GetAllBrands(),
    ]);

    return NextResponse.json({ products, brands });
  } catch (error) {
    console.error("search-data route failed", error);
    return NextResponse.json({ products: [], brands: [] }, { status: 500 });
  }
}
