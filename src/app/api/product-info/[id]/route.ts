import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
  );

  const payload = await response.json();

  return NextResponse.json(payload, { status: response.status });
}