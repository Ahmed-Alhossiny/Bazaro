"use server";

import { getAccessToken } from "@/utils/GetAccessToken";
import { parseApiResult } from "@/utils/ParseApiResult";

export async function changePasswordAction(values: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { ok: false, message: "You need to log in first." };
    }

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify(values),
      },
    );

    const data = await res.json();

    return parseApiResult(res.ok, data, "Could not change your password.");
  } catch (error) {
    return { ok: false, message: "Network error. Please try again." };
  }
}
