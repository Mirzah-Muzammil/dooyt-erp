import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey, unauthorizedResponse } from "@/lib/auth";
import { getErrorMessage } from "@/lib/errors";
import type { Prisma } from "@/generated/prisma/client";

export async function GET(request: Request) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse();
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
    const skip = (page - 1) * limit;

    const where: Prisma.DemoRequestWhereInput = {};
    if (status) {
      if (!["new", "contacted", "closed"].includes(status)) {
        return NextResponse.json(
          { error: "Invalid status parameter. Must be new, contacted, or closed." },
          { status: 400 }
        );
      }
      where.status = status;
    }

    const [data, total] = await Promise.all([
      prisma.demoRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.demoRequest.count({ where }),
    ]);

    return NextResponse.json({
      data,
      page,
      limit,
      total,
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
