import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function MiniDiv({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-white/10 rounded-2xl p-2 border border-white/10",
        className,
      )}
      {...props}
    />
  );
}

export function MiniButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "bg-white/10 cursor-pointer active:bg-white active:text-primary hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-sm border border-white/15",
        className,
      )}
      {...props}
    />
  );
}
