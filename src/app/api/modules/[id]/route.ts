import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey, unauthorizedResponse } from "@/lib/auth";
import { moduleSchema } from "@/lib/validation";
import { getErrorMessage } from "@/lib/errors";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const result = moduleSchema.safeParse({ ...body, id });

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.format() },
        { status: 400 }
      );
    }

    const existing = await prisma.module.findUnique({ where: { id } });
    if (existing) {
      return NextResponse.json(
        { error: "Module with this ID already exists" },
        { status: 409 }
      );
    }

    const { name, category, icon, description } = result.data;
    const newModule = await prisma.module.create({
      data: { id, name, category, icon, description },
    });

    return NextResponse.json(newModule, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const result = moduleSchema.safeParse({ ...body, id });

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, category, icon, description } = result.data;

    const existing = await prisma.module.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    const updatedModule = await prisma.module.update({
      where: { id },
      data: { name, category, icon, description },
    });

    return NextResponse.json(updatedModule);
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await params;

    const existing = await prisma.module.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }

    await prisma.module.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Module deleted successfully" });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
