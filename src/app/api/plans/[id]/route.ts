import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey, unauthorizedResponse } from "@/lib/auth";
import { planSchema } from "@/lib/validation";
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
    const result = planSchema.safeParse({ ...body, id });

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.format() },
        { status: 400 }
      );
    }

    const existing = await prisma.plan.findUnique({ where: { id } });
    if (existing) {
      return NextResponse.json(
        { error: "Plan with this ID already exists" },
        { status: 409 }
      );
    }

    const { name, tagline, monthlyPrice, currency, isPopular, features } = result.data;
    const newPlan = await prisma.plan.create({
      data: {
        id,
        name,
        tagline,
        monthlyPrice,
        currency,
        isPopular,
        features: JSON.stringify(features),
      },
    });

    return NextResponse.json({ ...newPlan, features }, { status: 201 });
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
    const result = planSchema.safeParse({ ...body, id });

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, tagline, monthlyPrice, currency, isPopular, features } = result.data;

    const existing = await prisma.plan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    const updatedPlan = await prisma.plan.update({
      where: { id },
      data: {
        name,
        tagline,
        monthlyPrice,
        currency,
        isPopular,
        features: JSON.stringify(features),
      },
    });

    return NextResponse.json({
      ...updatedPlan,
      features,
    });
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

    const existing = await prisma.plan.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    await prisma.plan.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Plan deleted successfully" });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
