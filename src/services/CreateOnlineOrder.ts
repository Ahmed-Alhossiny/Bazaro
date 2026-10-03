"use server";

export async function createOnlineOrder(
  cartId: string,
  token: any,
  shippingAddress: any,
) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
    {
      method: "POST",
      body: JSON.stringify({
        shippingAddress: shippingAddress,
      }),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    },
  );

  const payload = await response.json();

  return payload;
}
