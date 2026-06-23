import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey, unauthorizedResponse } from "@/lib/auth";
import { planSchema } from "@/lib/validation";
import { getErrorMessage } from "@/lib/errors";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const billing = searchParams.get("billing") || "monthly";

    const dbPlans = await prisma.plan.findMany();

    const plans = dbPlans.map((plan) => {
      let features: string[] = [];
      try {
        features = JSON.parse(plan.features);
      } catch {
        features = [plan.features];
      }

      const baseMonthlyPrice = plan.monthlyPrice;

      if (billing === "annual") {
        // annualPrice = (monthlyPrice * 12) * 0.85
        const annualPrice = Math.round((baseMonthlyPrice * 12) * 0.85);
        return {
          ...plan,
          features,
          billing: "annual",
          price: annualPrice,
          originalPrice: baseMonthlyPrice * 12,
          discountPercent: 15,
          pricePerMonth: Math.round(annualPrice / 12),
        };
      }

      return {
        ...plan,
        features,
        billing: "monthly",
        price: baseMonthlyPrice,
      };
    });

    return NextResponse.json(plans);
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
    const result = planSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.format() },
        { status: 400 }
      );
    }

    const { id, name, tagline, monthlyPrice, currency, isPopular, features } = result.data;

    const existing = await prisma.plan.findUnique({ where: { id } });
    if (existing) {
      return NextResponse.json(
        { error: "Plan with this ID already exists" },
        { status: 409 }
      );
    }

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

    return NextResponse.json({
      ...newPlan,
      features,
    }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
