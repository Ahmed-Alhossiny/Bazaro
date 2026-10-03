import { CartResponseType, Product, Product2 } from "@/types/CartType";

const STORAGE_KEY = "bazaro_guest_cart";

export function readGuestCart(): Product[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Product[];
  } catch {
    return [];
  }
}

export function writeGuestCart(items: Product[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    return;
  }
}

export function clearGuestCart() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}

export function buildGuestCartResponse(): CartResponseType {
  const items = readGuestCart();

  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].count;
  }

  return {
    status: "success",
    message: "guest",
    numOfCartItems: items.length,
    cartId: "guest",
    data: {
      _id: "guest",
      cartOwner: "guest",
      products: items,
      createdAt: "",
      updatedAt: "",
      __v: 0,
      totalCartPrice: total,
    },
  };
}

export function updateGuestCount(productId: string, count: number) {
  const items = readGuestCart();

  for (let i = 0; i < items.length; i++) {
    if (items[i].product._id === productId) {
      items[i].count = count;
    }
  }

  writeGuestCart(items);
}

export function removeGuestItem(productId: string) {
  const items = readGuestCart();
  const kept: Product[] = [];

  for (let i = 0; i < items.length; i++) {
    if (items[i].product._id !== productId) {
      kept.push(items[i]);
    }
  }

  writeGuestCart(kept);
}

export async function addToGuestCart(productId: string, amount: number) {
  const items = readGuestCart();

  for (let i = 0; i < items.length; i++) {
    if (items[i].product._id === productId) {
      items[i].count = items[i].count + amount;
      writeGuestCart(items);
      return true;
    }
  }

  try {
    const response = await fetch("/api/product-info/" + productId);
    if (!response.ok) return false;

    const payload = await response.json();
    const product = payload?.data;
    if (!product) return false;

    let unitPrice = product.price;
    if (
      typeof product.priceAfterDiscount === "number" &&
      product.priceAfterDiscount < product.price
    ) {
      unitPrice = product.priceAfterDiscount;
    }

    const slimProduct: Product2 = {
      _id: product._id,
      id: product.id ?? product._id,
      title: product.title,
      slug: product.slug,
      quantity: product.quantity,
      imageCover: product.imageCover,
      ratingsAverage: product.ratingsAverage,
      subcategory: product.subcategory ?? [],
      category: product.category,
      brand: product.brand,
    };

    items.push({
      _id: "guest-" + productId,
      count: amount,
      price: unitPrice,
      product: slimProduct,
    });

    writeGuestCart(items);
    return true;
  } catch {
    return false;
  }
}
