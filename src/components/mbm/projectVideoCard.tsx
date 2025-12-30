"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { ComponentProps, useRef, useEffect } from "react";
import { ProjectCard } from "./projectCard";

export function ProjectVideoCard({
  href,
  desc,
  title,
  img,
  video,
  ...props
}: ComponentProps<"div"> & {
  href: string;
  desc: string;
  title: string;
  img: string;
  video: string;
}) {
  const isMobile = useIsMobile(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const resetTimeout = useRef<NodeJS.Timeout | null>(null);

  const playVideo = async () => {
    if (resetTimeout.current) {
      clearTimeout(resetTimeout.current);
      resetTimeout.current = null;
    }
    videoRef.current
      ?.play()
      .catch((e) => console.warn("ignoring play because", e));
  };

  const pauseVideo = async () => {
    if (!videoRef.current || isMobile) return;
    videoRef.current.pause();
    resetTimeout.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    }, 500);
  };

  useEffect(() => {
    isMobile ? playVideo() : pauseVideo();
  }, [isMobile]);

  return (
    <ProjectCard
      href={href}
      title={title}
      desc={desc}
      onMouseEnter={playVideo}
      onMouseLeave={pauseVideo}
      {...props}
    >
      <div className="relative w-full h-full bg-black/50">
        <img
          className="absolute w-full h-full object-cover not-sm:opacity-0 group-hover:opacity-0 transition-opacity duration-500"
          src={img}
        />
        <video
          ref={videoRef}
          className="absolute w-full h-full object-cover sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          src={video}
          muted
          loop
          playsInline
        />
      </div>
    </ProjectCard>
  );
}
