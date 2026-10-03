"use server";

import { parseApiResult } from "@/utils/ParseApiResult";

export async function forgotPasswordAction(email: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      },
    );

    const data = await res.json();

    return parseApiResult(res.ok, data, "Could not send the reset code.");
  } catch (error) {
    return { ok: false, message: "Network error. Please try again." };
  }
}
