"use server";

import z from "zod";
import { Result } from "../types/util";
import { MetricSchema } from "../types/metric";
import { prisma } from "../prisma";
import { headers } from "next/headers";

export async function createMetric(
  data: z.infer<typeof MetricSchema>,
): Promise<Result<true>> {
  const ua = (await headers()).get("user-agent") || "";
  const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(ua);
  if (isBot) return { ok: true, data: true };

  const parsed = MetricSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }

  const country = (await headers()).get("x-country") || null;
  await prisma.metric.create({
    data: { ...parsed.data, country: country, date: new Date() },
  });
  return { ok: true, data: true };
}
