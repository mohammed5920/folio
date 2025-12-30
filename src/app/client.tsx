"use client";

import { MiniButton } from "@/components/mbm/miniui";
import { syncMetric } from "@/lib/data/metric";
import { Download } from "lucide-react";

export function CVButton() {
  return (
    <MiniButton
      onClick={() => {
        syncMetric("/cv");
        window.location.assign("/cv");
      }}
      className="relative flex gap-2 text-xs text-white/50 overflow-clip duration-500 group-hover:shadow-md transition-all group-hover:text-white"
    >
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-in-out" />
      CV <Download className="size-4" />
    </MiniButton>
  );
}
