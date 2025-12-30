import { files } from "@/lib/files";
import {
  SiFacebook,
  SiGithub,
  SiNextdotjs,
  SiNodedotjs,
  SiNumba,
  SiNumpy,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiX,
} from "@icons-pack/react-simple-icons";
import { Linkedin, Mail, TwitterIcon } from "lucide-react";
import { CVButton } from "./client";
import { MiniButton, MiniDiv } from "@/components/mbm/miniui";
import { ProjectCard } from "@/components/mbm/projectCard";
import { ProjectVideoCard } from "@/components/mbm/projectVideoCard";

export default function Home() {
  return (
    <div className="text-slate-100 flex flex-col gap-4 justify-center items-center min-h-screen w-screen">
      <div className="max-w-4xl m-4 space-y-2">
        <HomeGrid />
        <ProjectGrid />
      </div>
    </div>
  );
}

function HomeGrid() {
  return (
    <div className="grid grid-cols-[auto_1fr_14rem] gap-2">
      {/* sidebar */}
      <MiniDiv className="row-span-2 flex flex-col gap-2 justify-center">
        <img
          src={files.homePic}
          className="aspect-[0.735] w-30 sm:w-40 rounded-2xl bg-white/10 mx-auto"
        />
        <MiniDiv className="flex gap-2 sm:gap-1 justify-center items-center flex-wrap sm:flex-nowrap w-min sm:w-full mx-auto">
          <div className="flex gap-2 sm:gap-1">
            <a href="https://github.com/mohammed5920" target="_blank">
              <SiGithub className="opacity-50 hover:opacity-100 transition-opacity" />
            </a>
            <a href="mailto:mohammednasrelsayed@gmail.com" target="_blank">
              <Mail className="rounded-full bg-white text-[#6b6c6f] p-1 opacity-50 hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://linkedin.com/in/mohammed-nasr-elsayed"
              target="_blank"
            >
              <div className="rounded-full bg-white text-[#6b6c6f] p-1 opacity-50 hover:opacity-100 transition-opacity">
                <Linkedin className="size-4" />
              </div>
            </a>
          </div>
          <div className="flex gap-2 sm:gap-1">
            <a href="https://x.com/mbmohammedn" target="_blank">
              <div className="relative">
                <SiX className="rounded-full bg-white text-[#6b6c6f] p-1 opacity-50" />
                <div className="absolute inset-0 rounded-full bg-white text-[#6b6c6f] p-1 opacity-0 hover:opacity-100 transition-opacity">
                  <TwitterIcon className="size-4" />
                </div>
              </div>
            </a>
            <a href="https://facebook.com/mbmohammedn" target="_blank">
              <SiFacebook className="opacity-50 hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </MiniDiv>
      </MiniDiv>

      {/* MBM text */}
      <div className="relative overflow-hidden group col-span-2 sm:col-span-1 sm:row-span-2 bg-white/10 border border-white/10 hover:bg-white/20 rounded-2xl p-3 flex items-center w-full shadow-white/10 hover:shadow-lg duration-1000 ease-in-out bg-linear-to-r from-transparent to-black/20">
        <img
          src={files.homeBg}
          className="absolute right-0 mix-blend-screen invert w-full h-full rounded-2xl inset-0"
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-in-out" />
        <h1 className="text-4xl sm:text-5xl font-serif italic tracking-tighter leading-[0.85]">
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

      {/* 2 bio cards */}
      <MiniDiv className="text-white/33 col-span-3 sm:col-span-1 grid grid-cols-8 sm:grid-cols-4 place-items-center order-1 sm:order-0">
        <SiPython className="hover:text-blue-400 transition-colors" />
        <SiNumba className="hover:text-blue-400 transition-colors" />
        <SiNumpy className="hover:text-blue-400 transition-colors" />
        <SiNextdotjs className="hover:text-white transition-colors" />
        <SiReact className="hover:text-cyan-400 transition-colors" />
        <SiTailwindcss className="hover:text-cyan-300 transition-colors" />
        <SiNodedotjs className="hover:text-green-500 transition-colors" />
        <SiTypescript className="hover:text-blue-400 transition-colors" />
      </MiniDiv>

      <MiniDiv className="group flex flex-col gap-2 justify-between p-4 transition-colors col-span-2 sm:col-span-1">
        <div className="text-sm text-white/80 leading-tight text-balance text-center">
          Full stack web engineer with a knack for software rendering.
        </div>

        <span className="border-t border-white/33" />

        <div className="flex items-center justify-between border-white/10 gap-2">
          <div className="flex items-center gap-1.5 p-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 saturate-75">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-200 uppercase tracking-wide">
              Open
            </span>
          </div>
          <CVButton />
        </div>
      </MiniDiv>
    </div>
  );
}

function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      <ProjectVideoCard
        href="/pysaic"
        title="PySaic"
        desc="Real-time renderer for generating huge video mosaics."
        img={files.pmCover}
        video={files.pmDemo}
      />

      <ProjectCard
        href="/miniui"
        title="MiniUI"
        desc="A UI framework in Python built for customisability."
      >
        <div className="w-full h-full flex items-center justify-center">
          <MiniButton className="not-sm:shadow-lg group-hover:shadow-lg transition-all duration-500 text-white/50 group-hover:text-white">
            <span className="sm:hidden">Tap</span>
            <span className="not-sm:hidden">Click</span> me!
          </MiniButton>
        </div>
      </ProjectCard>

      <ProjectCard
        href="/alsun"
        title="Alsun"
        desc="Full-stack CMS for language schools using Next.js."
      >
        <div className="w-full h-full bg-linear-to-r from-slate-800 to-teal-600 group-hover:from-teal-600 group-hover:to-slate-800 flex items-center justify-center gap-2 duration-500 transition-colors">
          <img src={files.paLogo} width={30} alt="Alsun Logo" />
          <h1 className="font-alsun text-2xl text-white">الألسن</h1>
        </div>
      </ProjectCard>
    </div>
  );
}
