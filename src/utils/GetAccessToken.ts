import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAccessToken() {
  const cookieStore = await cookies();
  const raw =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!raw) return undefined;

  const decoded = await decode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: raw,
  });

  return decoded?.token;
}
