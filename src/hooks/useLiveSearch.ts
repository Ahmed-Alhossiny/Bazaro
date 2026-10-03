"use client";

import { useEffect, useRef, useState } from "react";

export interface SearchProduct {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
}

export interface SearchBrand {
  _id: string;
  name: string;
}

export default function useLiveSearch() {
  const [allProducts, setAllProducts] = useState<SearchProduct[]>([]);
  const [allBrands, setAllBrands] = useState<SearchBrand[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function loadData() {
      try {
        const response = await fetch("/api/search-data");

        if (!response.ok) {
          throw new Error(`search-data route returned ${response.status}`);
        }

        const data = await response.json();

        setAllProducts(data.products || []);
        setAllBrands(data.brands || []);
      } catch (error) {
        console.error("useLiveSearch: failed to load data", error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadData();
  }, []);

  function search(query: string, maxProducts = 5, maxBrands = 3) {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) {
      return { products: [] as SearchProduct[], brands: [] as SearchBrand[] };
    }

    const matchedProducts: SearchProduct[] = [];
    for (let i = 0; i < allProducts.length; i++) {
      if (matchedProducts.length >= maxProducts) break;
      if (allProducts[i].title.toLowerCase().includes(trimmed)) {
        matchedProducts.push(allProducts[i]);
      }
    }

    const matchedBrands: SearchBrand[] = [];
    for (let i = 0; i < allBrands.length; i++) {
      if (matchedBrands.length >= maxBrands) break;
      if (allBrands[i].name.toLowerCase().includes(trimmed)) {
        matchedBrands.push(allBrands[i]);
      }
    }

    return { products: matchedProducts, brands: matchedBrands };
  }

  return { search, isLoaded };
}
