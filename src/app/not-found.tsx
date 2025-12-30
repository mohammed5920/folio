import Link from "next/link";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Link
        href={"/"}
        className="p-8 pt-5 border border-white/10 rounded-2xl hover:bg-white/10 hover:shadow-sm shadow-white/10 transition-colors text-4xl sm:text-5xl font-serif italic tracking-tighter leading-[0.85]"
      >
        <span className="block text-white/33 text-shadow-[0px_0px_0px] group-hover:text-shadow-black/20 group-hover:text-shadow-[4px_4px_4px] transition-all duration-1000">
          page
        </span>
        <span className="block text-white/66 text-shadow-[0px_0px_0px] group-hover:text-shadow-black/20 group-hover:text-shadow-[4px_4px_4px] transition-all duration-1000">
          not
        </span>
        <span className="block text-white/99 text-shadow-[0px_0px_0px] group-hover:text-shadow-black/20 group-hover:text-shadow-[4px_4px_4px] transition-all duration-1000">
          found
        </span>
      </Link>
    </div>
  );
}
