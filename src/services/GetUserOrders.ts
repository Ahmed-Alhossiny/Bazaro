import { Order } from "@/types/OrderType";

export async function getUserOrders(userId: string): Promise<Order[]> {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/orders/user/" + userId,
  );

  if (!response.ok) throw new Error("Failed to fetch orders");

  const json = await response.json();

  if (Array.isArray(json)) return json;

  return json?.data ?? [];
}
