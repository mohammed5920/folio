"use client";

import { MiniButton } from "@/components/mbm/miniui";
import { useState } from "react";

export function MiniCounter() {
  const [count, setCount] = useState(0);
  return (
    <MiniButton onClick={() => setCount((count) => count + 1)}>
      <p className="text-balance w-fit">
        This button has been <span className="sm:hidden">tapped</span>
        <span className="not-sm:hidden">clicked</span> {count} time
        {count !== 1 ? "s" : ""}.
      </p>
    </MiniButton>
  );
}
