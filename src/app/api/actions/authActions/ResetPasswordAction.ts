"use server";

import { parseApiResult } from "@/utils/ParseApiResult";

export async function resetPasswordAction(email: string, newPassword: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      },
    );

    const data = await res.json();

    return parseApiResult(res.ok, data, "Could not reset your password.");
  } catch (error) {
    return { ok: false, message: "Network error. Please try again." };
  }
}
