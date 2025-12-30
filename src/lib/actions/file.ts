"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { Result } from "../types/util";
import { readMe } from "./user";

export async function updateCVLink(link: string): Promise<Result<true>> {
  if (typeof link !== "string" || !link)
    return { ok: false, error: "Bad link" };
  if (!(await readMe())) return { ok: false, error: "Unauthorised" };
  await prisma.link.upsert({
    where: { id: "cv" },
    create: { link, id: "cv" },
    update: { link },
  });
  revalidatePath("/cv");
  return { ok: true, data: true };
}
