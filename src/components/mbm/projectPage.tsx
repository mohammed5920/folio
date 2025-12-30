/* eslint-disable @next/next/no-img-element */

import React, { ComponentProps } from "react";
import { MiniDiv } from "./miniui";
import { SiGithub, SiInternetcomputer } from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils";
import { ArrowBigLeft, ArrowLeft, LucideLink } from "lucide-react";
import Link from "next/link";

export function ProjectHero({
  title,
  description,
  thumbChild,
  git,
  siteLink,
}: {
  title: string;
  description: string;
  thumbChild: React.ReactNode;
  git?: string;
  siteLink?: string;
}) {
  return (
    <header className="relative max-w-screen">
      <div className="mx-auto w-fit">
        <MiniDiv className="grid lg:grid-cols-2 gap-6 lg:gap-12 not-lg:place-items-center relative z-10 mx-4 max-w-6xl p-6 my-6 lg:my-16 lg:p-16 shadow-white/10 shadow-md">
          <div className="text-center lg:text-left space-y-3 lg:space-y-6">
            <Link
              className="flex gap-1 uppercase text-sm text-white/33 items-center hover:text-white/75 transition-colors w-fit"
              href="/"
            >
              <ArrowLeft className="size-4" /> Back
            </Link>
            <h1 className="max-w-2xl text-2xl sm:text-4xl font-bold tracking-tighter text-balance text-white">
              {title}
            </h1>
            <p className="mx-auto max-w-2xl sm:text-2xl text-balance text-white/50 lg:mx-0">
              {description}
            </p>
            {(git || siteLink) && (
              <div className="flex gap-4 w-min mx-auto lg:mx-0 items-center">
                {git && (
                  <a
                    href={git}
                    target="_blank"
                    className="flex items-center gap-2 hover:text-white transition-colors justify-center text text-white/33 uppercase"
                  >
                    <SiGithub className="size-4" />{" "}
                    <p className="mt-1.5">Source</p>
                  </a>
                )}
                {git && siteLink && (
                  <div className="border border-white/33 h-4" />
                )}
                {siteLink && (
                  <a
                    href={siteLink}
                    target="_blank"
                    className="flex items-center gap-2 hover:text-white transition-colors justify-center text text-white/33 uppercase"
                  >
                    <LucideLink className="size-4" />{" "}
                    <p className="mt-1.5">Site</p>
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="shadow-black/20 max-w-md rounded-2xl shadow-2xl mb-6 lg:mb-0 mx-4 self-center">
            {thumbChild}
          </div>
        </MiniDiv>
      </div>
    </header>
  );
}

export function ProjectBody({ className, ...props }: ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "mx-auto px-4 text-sm sm:text-lg max-w-5xl text-white/75 space-y-5 sm:leading-6.25",
        className,
      )}
      {...props}
    />
  );
}

export function ProjectHeader({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "text-md sm:text-xl font-bold mt-8 text-start capitalize",
        className,
      )}
      {...props}
    />
  );
}

export function ProjectCaption({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "italic text-balance opacity-75 text-center text-xs sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function ProjectBullets({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul className={cn("list-disc pl-5 space-y-2", className)} {...props} />
  );
}

export function ProjectSeparator({
  className,
  ...props
}: ComponentProps<"hr">) {
  return <hr className={cn("border-white/33 my-8", className)} {...props} />;
}

export function ProjectReference({
  className,
  href,
  ...props
}: Omit<ComponentProps<"a">, "target"> & { href: string }) {
  return (
    <a
      className={cn("underline hover:text-white transition-colors", className)}
      target="_blank"
      href={href}
      {...props}
    />
  );
}

export function ProjectParentheses({
  className,
  ...props
}: ComponentProps<"i">) {
  return <i className={cn("opacity-50", className)} {...props} />;
}

export function ProjectCode({ className, ...props }: ComponentProps<"code">) {
  return (
    <pre>
      <code
        className={cn(
          "bg-gray-900 p-4 rounded-2xl block text-nowrap overflow-x-auto text-xs sm:text-sm",
          className,
        )}
        {...props}
      />
    </pre>
  );
}

export function ProjectEpilogue({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "opacity-50 text-xs sm:text-sm text-center text-balance uppercase",
        className,
      )}
      {...props}
    />
  );
}
