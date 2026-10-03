"use server";

import { SignUpFormValues } from "@/Schemas/SignUpSchema";

export async function SignUp(data: SignUpFormValues) {
  const response = await fetch(`${process.env.API_BASE_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.ok;
}
