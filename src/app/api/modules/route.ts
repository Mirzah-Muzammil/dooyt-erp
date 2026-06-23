import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey, unauthorizedResponse } from "@/lib/auth";
import { moduleSchema } from "@/lib/validation";
import { getErrorMessage } from "@/lib/errors";
import type { Prisma } from "@/generated/prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const where: Prisma.ModuleWhereInput = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const modules = await prisma.module.findMany({
      where,
    });

    return NextResponse.json(modules);
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const result = moduleSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.format() },
        { status: 400 }
      );
    }

    const { id, name, category, icon, description } = result.data;

    // Check if module already exists
    const existing = await prisma.module.findUnique({ where: { id } });
    if (existing) {
      return NextResponse.json(
        { error: "Module with this ID already exists" },
        { status: 409 }
      );
    }

    const newModule = await prisma.module.create({
      data: { id, name, category, icon, description },
    });

    return NextResponse.json(newModule, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
