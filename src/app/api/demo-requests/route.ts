import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { demoRequestSchema } from "@/lib/validation";
import { getErrorMessage } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = demoRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.format() },
        { status: 400 }
      );
    }

    const { fullName, email, company, phone, selectedPlan, message } = result.data;

    // Check if the selected plan is valid (exists in database)
    const plan = await prisma.plan.findUnique({
      where: { id: selectedPlan },
    });

    if (!plan) {
      return NextResponse.json(
        { error: `Invalid selectedPlan: Plan '${selectedPlan}' does not exist.` },
        { status: 422 }
      );
    }

    const newDemoRequest = await prisma.demoRequest.create({
      data: {
        fullName,
        email,
        company,
        phone,
        selectedPlan,
        message: message || null,
        status: "new",
      },
    });

    return NextResponse.json(newDemoRequest, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
