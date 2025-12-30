"use client";

import { syncMetric } from "@/lib/data/metric";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    syncMetric(pathname);
  }, [pathname]);

  return <></>;
}
