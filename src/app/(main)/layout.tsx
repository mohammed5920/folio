import { MiniButton } from "@/components/mbm/miniui";
import Link from "next/link";
import { Toaster } from "sonner";

export default function MBMLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* do NOT remove grid-cols-1 because it affects layouts that are 4 ancestors deep in the chain */}
      <div className="grid grid-rows-[1fr_auto] grid-cols-1 min-h-screen">
        <div>{children}</div>
        <Footer />
      </div>
      <Toaster position="bottom-center" />
    </>
  );
}

function Footer() {
  return (
    <footer className="z-1 my-6">
      <Link href={"/"} className="block w-fit mx-auto">
        <MiniButton className="font-serif tracking-tighter text-md cursor-help text-white/50 hover:shadow-xl hover:text-white opacity-75 hover:opacity-100">
          mbm.
        </MiniButton>
      </Link>
    </footer>
  );
}
