"use server";

import { createCashOrder } from "@/services/CreateCashOrder";
import { getAccessToken } from "@/utils/GetAccessToken";

export async function payCash(cartId: string, shippingAddress: any) {
  const token = await getAccessToken();

  const payload = await createCashOrder(cartId, token, shippingAddress);

  return payload;
}
