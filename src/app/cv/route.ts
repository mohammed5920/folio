import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const linkEntry = await prisma.link.findUnique({ where: { id: "cv" } });
  if (!linkEntry?.link) {
    return new NextResponse("Not configured", { status: 404 });
  }
  const res = await fetch(linkEntry.link);
  if (!res.ok) return new NextResponse("Fetch failed", { status: 500 });
  const pdfBuffer = await res.arrayBuffer();
  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Mohammed Nasr - CV.pdf"',
    },
  });
}
