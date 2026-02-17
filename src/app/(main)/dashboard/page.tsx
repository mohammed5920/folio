import { WithActionOnSubmit } from "@/components/mbm/withAction";
import { challengeMe, readMe } from "@/lib/actions/user";
import { prisma } from "@/lib/prisma";
import { MiniButton, MiniDiv } from "@/components/mbm/miniui";
import { startOfDay, subDays } from "date-fns";
import { UploadButton } from "@/components/mbm/uploadButton";
import { updateCVLink } from "@/lib/actions/file";
import { formatRelativeTime, stringToHSL } from "@/lib/utils";

export default async function MBMDashWrapper() {
  return (
    <div className="sm:absolute sm:inset-0 size-full flex items-center justify-center animate-in fade-in transform-gpu duration-500">
      {!(await readMe()) ? <MBMDashChallenge /> : <MBMDashboard />}
    </div>
  );
}

function MBMDashChallenge() {
  return (
    <MiniDiv className="uppercase tracking-widest text-center">
      <span className="mb-4 block">Enter the master password:</span>
      <WithActionOnSubmit
        action={async (formData) => {
          "use server";
          return challengeMe(formData.get("password") as string);
        }}
      >
        <div className="flex gap-2">
          <input
            name="password"
            type="password"
            className="bg-white/10 rounded-2xl p-2 focus:bg-white focus:text-black transition-colors"
            placeholder="Type..."
          ></input>
          <MiniButton type="submit">Submit</MiniButton>
        </div>
      </WithActionOnSubmit>
    </MiniDiv>
  );
}

async function MBMDashboard() {
  const today = new Date();
  const sevenDaysAgo = subDays(startOfDay(today), 7);

  const [cvDate, metrics, recents] = await Promise.all([
    prisma.link
      .findFirst({ where: { id: "cv" }, select: { updatedAt: true } })
      .then((cv) => cv?.updatedAt.toDateString()),
    prisma.$queryRaw<
      {
        target: string;
        total_views: bigint; // SQL COUNT returns BigInt
        unique_visitors: bigint;
      }[]
    >`
      SELECT 
        target, 
        COUNT(*) as total_views, 
        COUNT(DISTINCT "visitorId") as unique_visitors
      FROM "Metric"
      WHERE 
        date >= ${sevenDaysAgo} 
      GROUP BY target
      ORDER BY total_views DESC
      LIMIT 5
    `,
    prisma.metric.findMany({
      where: {
        visitorId: { not: null },
      },
      take: 8,
      orderBy: { date: "desc" },
    }),
  ]);

  const visitorIds = [...new Set(recents.map((r) => r.visitorId!))];

  const counts = await prisma.metric.groupBy({
    by: ["visitorId"],
    where: {
      visitorId: { in: visitorIds },
    },
    _count: true,
  });

  const uniqueRecentMap: Record<string, number> = Object.fromEntries(
    counts.map((c) => [c.visitorId, c._count]),
  );
  metrics.sort((a, b) => Number(b.unique_visitors - a.unique_visitors));

  return (
    <MiniDiv className="mx-4 mt-4 flex gap-2 flex-col sm:flex-row">
      <div className="flex flex-col gap-2">
        <div className="grow grid grid-cols-2 gap-2">
          {metrics.map((metric) => {
            const isHome = metric.target === "/";
            return (
              <MiniDiv
                key={metric.target}
                className={`flex flex-col items-center justify-center hover:-translate-y-1 hover:shadow-xl transition-all ${isHome && "col-span-2"}`}
              >
                <p
                  className={`${isHome ? "text-lg sm:text-2xl" : "text-md sm:text-xl opacity-75"} font-extrabold text-center`}
                >
                  {isHome ? "Home" : metric.target}
                </p>
                <div className="mx-auto w-fit leading-4.5 not-sm:text-sm">
                  <p className="opacity-66 uppercase">
                    Total: {metric.total_views.toString()}
                  </p>
                  <p className="opacity-33 uppercase">
                    Unique: {metric.unique_visitors.toString()}
                  </p>
                </div>
              </MiniDiv>
            );
          })}
        </div>
        <MiniDiv className="text-balance text-center p-3">
          <p className="opacity-50 leading-4.5">CV last updated on:</p>{" "}
          <p>{cvDate}</p>
          <UploadButton
            action={updateCVLink}
            text="Update"
            className="mt-1 mx-auto"
          />
        </MiniDiv>
      </div>
      <div className="gap-2 not-sm:grid not-sm:grid-cols-2 sm:flex sm:flex-col">
        {recents.map(async (recent) => (
          <MiniDiv
            key={recent.id}
            className="grow flex items-center hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            <div className="w-full px-1">
              <div className="flex flex-col sm:flex-row justify-between items-center sm:gap-4">
                <p className="not-sm:text-sm not-sm:w-full">{recent.target}</p>
                <p className="opacity-75 uppercase text-xs not-sm:text-right not-sm:w-full sm:text-sm">
                  {formatRelativeTime(recent.date)}
                </p>
              </div>
              <div className="flex gap-2 justify-between">
                <p className="opacity-50 text-xs uppercase">{recent.country}</p>
                <p
                  className="opacity-50 text-xs uppercase"
                  style={{ color: stringToHSL(recent.visitorId!) }}
                >
                  {recent.visitorId?.slice(0, 8)} -{" "}
                  {uniqueRecentMap[recent.visitorId!]}
                </p>
              </div>
            </div>
          </MiniDiv>
        ))}
      </div>
    </MiniDiv>
  );
}
