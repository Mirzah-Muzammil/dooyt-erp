import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey, unauthorizedResponse } from "@/lib/auth";
import { faqSchema } from "@/lib/validation";
import { getErrorMessage } from "@/lib/errors";

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return NextResponse.json(faqs);
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
    const result = faqSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.format() },
        { status: 400 }
      );
    }

    const { id, question, answer, order } = result.data;

    const existing = await prisma.fAQ.findUnique({ where: { id } });
    if (existing) {
      return NextResponse.json(
        { error: "FAQ with this ID already exists" },
        { status: 409 }
      );
    }

    const newFaq = await prisma.fAQ.create({
      data: { id, question, answer, order },
    });

    return NextResponse.json(newFaq, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
