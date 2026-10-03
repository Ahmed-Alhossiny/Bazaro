"use server";

import { getAccessToken } from "@/utils/GetAccessToken";
import { parseApiResult } from "@/utils/ParseApiResult";

export async function updateProfileAction(changes: {
  name?: string;
  email?: string;
  phone?: string;
}) {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { ok: false, message: "You need to log in first." };
    }

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify(changes),
      },
    );

    const data = await res.json();

    return parseApiResult(res.ok, data, "Could not update your profile.");
  } catch (error) {
    return { ok: false, message: "Network error. Please try again." };
  }
}
