import { WithActionOnSubmit } from "@/components/mbm/withAction";
import { challengeMe, readMe } from "@/lib/actions/user";
import { prisma } from "@/lib/prisma";
import { MiniButton, MiniDiv } from "@/components/mbm/miniui";
import { startOfDay, subDays, toDate } from "date-fns";
import { UploadButton } from "@/components/mbm/uploadButton";
import { updateCVLink } from "@/lib/actions/file";

export default async function MBMDashWrapper() {
  return (
    <div className="absolute inset-0 flex items-center justify-center animate-in fade-in transform-gpu duration-500">
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

  const [cvDate, metrics] = await Promise.all([
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
        date >= ${sevenDaysAgo} AND
        country IS NOT NULL
      GROUP BY target
      ORDER BY total_views DESC
    `,
  ]);

  metrics.sort((a, b) => Number(b.unique_visitors - a.unique_visitors));

  return (
    <MiniDiv className="space-y-2 mx-4">
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((metric) => {
          const isHome = metric.target === "/";
          return (
            <MiniDiv
              key={metric.target}
              className={`mx-auto ${isHome && "col-span-2"} size-full`}
            >
              <p
                className={`${isHome ? "text-2xl" : "text-xl opacity-75"} font-extrabold text-center`}
              >
                {isHome ? "Home" : metric.target}
              </p>
              <div className="mx-auto w-fit">
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
      <MiniDiv className="text-balance text-center">
        <p className="opacity-50">CV last updated on:</p> <p>{cvDate}</p>
        <UploadButton
          action={updateCVLink}
          text="Update"
          className="my-2 mx-auto"
        />
      </MiniDiv>
    </MiniDiv>
  );
}
