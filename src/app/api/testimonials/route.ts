import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey, unauthorizedResponse } from "@/lib/auth";
import { testimonialSchema } from "@/lib/validation";
import { getErrorMessage } from "@/lib/errors";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.testimonial.findMany({
        skip,
        take: limit,
      }),
      prisma.testimonial.count(),
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

export async function POST(request: Request) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const result = testimonialSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.format() },
        { status: 400 }
      );
    }

    const { id, name, role, rating, quote } = result.data;

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (existing) {
      return NextResponse.json(
        { error: "Testimonial with this ID already exists" },
        { status: 409 }
      );
    }

    const newTestimonial = await prisma.testimonial.create({
      data: { id, name, role, rating, quote },
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
