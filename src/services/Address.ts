import { AddressFormValues } from "@/Schemas/AddressSchema";
import { AddressListResponse, AddressResponse } from "@/types/AddressType";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/addresses";

export async function getAddresses(token: any): Promise<AddressListResponse> {
  const response = await fetch(BASE_URL, {
    headers: { token: token },
    cache: "no-store",
  });

  return response.json();
}

export async function getAddress(
  id: string,
  token: any,
): Promise<AddressResponse> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    headers: { token: token },
    cache: "no-store",
  });

  return response.json();
}

export async function addAddress(
  values: AddressFormValues,
  token: any,
): Promise<AddressListResponse> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function removeAddress(
  id: string,
  token: any,
): Promise<AddressListResponse> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { token: token },
  });

  return response.json();
}
