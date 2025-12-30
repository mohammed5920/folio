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
      <div className="grid grid-rows-[1fr_auto] min-h-screen">
        <div>{children}</div>
        <Footer />
      </div>
      <Toaster position="bottom-center" />
    </>
  );
}

function Footer() {
  return (
    <footer className="z-1">
      <Link href={"/"} className="block w-fit mx-auto h-fit">
        <MiniButton className="font-serif tracking-tighter text-md cursor-help my-6 text-white/50 hover:shadow-xl hover:text-white opacity-75 hover:opacity-100">
          mbm.
        </MiniButton>
      </Link>
    </footer>
  );
}
