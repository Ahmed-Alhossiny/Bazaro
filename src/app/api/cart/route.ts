import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req: req });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    headers: {
      token: token.token,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) {
    return NextResponse.json({
      status: "success",
      numOfCartItems: 0,
      data: { products: [], totalCartPrice: 0 },
    });
  }

  if (!response.ok) {
    return NextResponse.json(
      { message: "Failed to fetch cart" },
      { status: response.status },
    );
  }

  const payload = await response.json();

  return NextResponse.json(payload);
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req: req });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
    method: "DELETE",
    headers: {
      token: token.token,
    },
  });

  const payload = await response.json();

  return NextResponse.json(payload, { status: response.status });
}
