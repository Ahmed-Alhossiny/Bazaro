export async function addProductToWishlist(token: any, prodId: string) {
  const response = await fetch(`${process.env.API_BASE_URL}/wishlist`, {
    method: "POST",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: prodId,
    }),
  });

  const payload = await response.json();

  return payload;
}
