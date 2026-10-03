"use server";

import { AddressFormValues } from "@/Schemas/AddressSchema";
import {
  addAddress,
  getAddress,
  getAddresses,
  removeAddress,
} from "@/services/Address";

import { getAccessToken } from "@/utils/GetAccessToken";

export async function fetchAddresses() {
  const token = await getAccessToken();

  return getAddresses(token);
}

export async function fetchAddress(id: string) {
  const token = await getAccessToken();

  return getAddress(id, token);
}

export async function createAddress(values: AddressFormValues) {
  const token = await getAccessToken();

  return addAddress(values, token);
}

export async function deleteAddress(id: string) {
  const token = await getAccessToken();

  return removeAddress(id, token);
}
