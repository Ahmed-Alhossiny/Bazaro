import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ productId: string }>;
};

export async function PUT(req: NextRequest, context: RouteContext) {
  const token = await getToken({ req: req });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await context.params;
  const body = await req.json();

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        token: token.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count: Number(body.count) }),
    },
  );

  const payload = await response.json();

  return NextResponse.json(payload, { status: response.status });
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const token = await getToken({ req: req });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await context.params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token.token,
      },
    },
  );

  const payload = await response.json();

  return NextResponse.json(payload, { status: response.status });
}
