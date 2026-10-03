"use server";

import { createOnlineOrder } from "@/services/CreateOnlineOrder";
import { getAccessToken } from "@/utils/GetAccessToken";

export async function payOnline(cartId: string, shippingAddress: any) {
  const token = await getAccessToken();

  const payload = await createOnlineOrder(cartId, token, shippingAddress);

  return payload;
}
