import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = [
  "/checkout",
  "/profile",
  "/settings",
  "/addresses",
  "/orders",
];
const authPages = ["/signup", "/login"];

function matchesAny(pathName: string, list: string[]) {
  for (let i = 0; i < list.length; i++) {
    if (pathName === list[i] || pathName.startsWith(list[i] + "/")) {
      return true;
    }
  }
  return false;
}

export async function proxy(req: NextRequest) {
  const pathName = req.nextUrl.pathname;

  const myToken = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: req.nextUrl.protocol === "https:",
  });

  const accessToken = myToken?.token;

  if (!accessToken && matchesAny(pathName, protectedPages)) {
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathName);
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken && matchesAny(pathName, authPages)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signup/:path*",
    "/login/:path*",
    "/checkout/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/addresses/:path*",
    "/orders/:path*",
  ],
};
