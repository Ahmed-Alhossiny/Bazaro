"use server";

export async function addToCart(prodId: string, token: any) {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "POST",
    body: JSON.stringify({
      productId: prodId,
    }),
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  const payload = await response.json();

  return payload;
}
