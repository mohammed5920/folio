export default function Loading() {
  return (
    <div className="absolute inset-0 w-screen h-screen flex items-center justify-center">
      <div className="animate-in blur-in duration-1000">
        <h1 className="text-4xl sm:text-5xl font-serif italic tracking-tighter leading-[0.85] animate-pulse">
          <span className="block text-white/33 text-shadow-[0px_0px_0px] text-shadow-black/0 group-hover:text-shadow-black/20 group-hover:text-shadow-[4px_4px_4px] transition-all duration-1000">
            made
          </span>
          <span className="block text-white/66 text-shadow-[0px_0px_0px] text-shadow-black/0 group-hover:text-shadow-black/20 group-hover:text-shadow-[4px_4px_4px] transition-all duration-1000">
            by
          </span>
          <span className="block text-white/99 text-shadow-[0px_0px_0px] text-shadow-black/0 group-hover:text-shadow-black/20 group-hover:text-shadow-[4px_4px_4px] transition-all duration-1000">
            mohammed
          </span>
        </h1>
      </div>
    </div>
  );
}
