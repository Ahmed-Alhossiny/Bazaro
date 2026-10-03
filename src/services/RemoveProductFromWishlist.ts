export async function removeProductFromWishlist(token: string, prodId: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/wishlist/${prodId}`, {
    method: "DELETE",
    headers: { token },
  });

  return res.json();
}
