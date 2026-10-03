"use server";

import { parseApiResult } from "@/utils/ParseApiResult";

export async function verifyResetCodeAction(resetCode: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode }),
      },
    );

    const data = await res.json();

    return parseApiResult(res.ok, data, "Invalid or expired code.");
  } catch (error) {
    return { ok: false, message: "Network error. Please try again." };
  }
}
