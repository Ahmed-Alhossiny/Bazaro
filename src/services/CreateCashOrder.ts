"use server";

export async function createCashOrder(
  cartId: string,
  token: any,
  shippingAddress: any,
) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
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
