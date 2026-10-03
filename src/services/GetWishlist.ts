export async function getWishlist(token: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/wishlist`, {
    method: "GET",
    headers: { token },
    cache: "no-store",
  });

  return res.json();
}
