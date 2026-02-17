import { cn } from "@/lib/utils";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";

export function ProjectCard({
  href,
  desc,
  title,
  ...props
}: ComponentProps<"div"> & {
  href: string;
  desc: string;
  title: string;
}) {
  return (
    <div
      {...props}
      className={cn(
        "group relative border border-white/10 grid sm:grid-rows-[1fr_1fr_auto] grid-cols-2 sm:grid-cols-1 bg-white/10 hover:bg-white/20 hover:scale-[1.01] hover:-translate-y-1 transition-all duration-500 rounded-2xl overflow-hidden",
        props.className,
      )}
    >
      <Link href={href} className="h-full w-full overflow-hidden">
        {props.children}
      </Link>

      <Link href={href} className="p-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-bold text-slate-200">{title}</h3>
          <div className="flex gap-1 items-center">
            <span className="uppercase tracking-widest text-transparent group-hover:text-white text-[10px] transition-all duration-500">
              writeup
            </span>
            <ArrowRight className="size-4 -rotate-45 text-white/30 group-hover:text-white group-hover:rotate-0 transition-all duration-500" />
          </div>
        </div>
        <p className="text-xs text-white/50 leading-relaxed text-balance">
          {desc}
        </p>
      </Link>

      <p className="pt-3 border-t px-4 py-3 border-white/5 flex gap-3 text-xs uppercase tracking-wider font-semibold text-white/30">
        <a
          href={"https://github.com/mohammed5920" + href}
          target="_blank"
          className="flex items-baseline gap-1.5 hover:text-white transition-colors"
        >
          <SiGithub className="size-3" />{" "}
          <span className="-translate-y-0.5">Source</span>
        </a>
      </p>
    </div>
  );
}
