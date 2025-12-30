import z from "zod";

export const MetricSchema = z.object({
  target: z.string().nonempty(),
  visitorId: z.string().nullable(),
});

export const HistorySchema = z.array(
  z.object({
    key: z.string().nonempty(),
    lastVisited: z.coerce.date(),
  }),
);
