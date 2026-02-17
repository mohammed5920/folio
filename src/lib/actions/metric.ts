"use server";

import z from "zod";
import { Result } from "../types/util";
import { MetricSchema } from "../types/metric";
import { prisma } from "../prisma";
import { headers } from "next/headers";

const knownIds = [
  "4766be01-4228-44b7-a4eb-4c9c22aecd54", //firefox .app
  "67330832-7ece-4944-8c28-7bde67582375", //firefox .com 1
  "013b0693-1db3-4259-b2f7-4dd687a46f6f", //firefox .com 2
  "f62fb440-8d32-4e47-aff7-2317bf9072fa", //edge .app
  "d240527e-3355-4eda-ac48-6b86271df3ec", //edge .com
  "374fdbce-f254-4e59-b4b5-ccccb1a7e044", //phone .app
  "3fdcd6be-335d-42bf-8199-f4493d83be59", //phone .com
];

export async function createMetric(
  data: z.infer<typeof MetricSchema>,
): Promise<Result<true>> {
  const ua = (await headers()).get("user-agent") || "";
  if (/bot|googlebot|crawler|spider|robot|crawling/i.test(ua))
    return { ok: true, data: true };

  const parsed = MetricSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0].message };
  }

  //ignore my own visits
  if (knownIds.includes(parsed.data.visitorId || "")) {
    return { ok: true, data: true };
  }

  //ignore visits to the dev server
  const country = (await headers()).get("x-country") || null;
  if (!country) {
    return { ok: true, data: true };
  }

  await prisma.metric.create({
    data: { ...parsed.data, country: country, date: new Date() },
  });
  return { ok: true, data: true };
}
