import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey, unauthorizedResponse } from "@/lib/auth";
import { getErrorMessage } from "@/lib/errors";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!validateApiKey(request)) {
    return unauthorizedResponse();
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["new", "contacted", "closed"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value. Must be new, contacted, or closed." },
        { status: 400 }
      );
    }

    const existing = await prisma.demoRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Demo request not found" }, { status: 404 });
    }

    const updatedRequest = await prisma.demoRequest.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedRequest);
  } catch (error: unknown) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
