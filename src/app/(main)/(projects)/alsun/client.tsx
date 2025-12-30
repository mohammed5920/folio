"use client";

import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";

export function EasterForm({ children }: { children: ReactNode }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("You've got mail!");
      }}
    >
      {children}
    </form>
  );
}

export function EasterCSR() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  //stages: 0=spinner, 1=shell, 2=card, 3=inputs, 4=interactive
  const [animStage, setAnimStage] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const easterRef = useRef(null);

  useEffect(() => {
    const el = easterRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isIntersecting) {
      setAnimStage(0);
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const run = async () => {
      for (let i = 0; i < 5; i++) {
        if (cancelled) return;
        await new Promise<void>((resolve) => {
          timeoutId = setTimeout(() => {
            setAnimStage(i);
            resolve();
          }, 750);
        });
      }
    };

    run();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isIntersecting, trigger]);

  const Skeleton = ({ className }: { className?: string }) => (
    <div className={cn("animate-pulse bg-slate-200 rounded", className)} />
  );

  return (
    <div
      ref={easterRef}
      className="w-full md:aspect-[3] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm relative font-sans text-xs md:text-sm select-none"
    >
      {animStage === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
          <div className="flex flex-col items-center gap-2">
            <div className="size-8 border-4 border-slate-200 border-t-teal-600 rounded-full animate-spin" />
            <span className="text-slate-400 text-xs font-mono">
              loading chunk 2.8.js...
            </span>
          </div>
        </div>
      )}

      <div className="flex h-full">
        <div className="flex-1 flex flex-col bg-slate-50/50">
          <div className="p-4 sm:p-8 flex items-center justify-center h-full">
            {animStage >= 2 ? (
              <form
                className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg border border-slate-100 space-y-4 transform transition-all duration-500 ease-out translate-y-0 opacity-100"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "Your free trial has ended. Please upgrade to our premium tier to log in.",
                  );
                }}
              >
                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-500 text-xs mb-1">
                      Email
                    </label>
                    {animStage >= 3 ? (
                      <input
                        disabled={animStage === 3}
                        type="email"
                        required
                        placeholder={
                          animStage >= 4 ? "user@example.com" : undefined
                        }
                        className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50 text-black"
                      />
                    ) : (
                      <Skeleton className="h-9 w-full" />
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-500 text-xs mb-1">
                      Password
                    </label>
                    {animStage >= 3 ? (
                      <input
                        disabled={animStage === 3}
                        type="password"
                        required
                        placeholder={animStage >= 4 ? "••••••••" : undefined}
                        className="w-full border border-slate-300 rounded-lg p-2 bg-slate-50 text-black"
                      />
                    ) : (
                      <Skeleton className="h-9 w-full" />
                    )}
                  </div>
                </div>
                <div className="pt-2">
                  {animStage >= 4 ? (
                    <button className="w-full bg-teal-600 text-white font-medium py-2 rounded-lg shadow-md hover:bg-teal-700 transition-all cursor-pointer">
                      Sign In
                    </button>
                  ) : (
                    <Skeleton className="h-9 w-24 ml-auto" />
                  )}
                </div>
              </form>
            ) : (
              <div className="w-full max-w-sm h-64 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center">
                <span className="text-slate-400 italic">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {animStage === 4 && (
        <div
          className="text-black md:absolute bottom-1 right-1 flex md:flex-col gap-1 text-xs opacity-33 justify-center items-center px-4 md:py-3 not-md:pb-3 cursor-pointer"
          onClick={() => {
            setTrigger((trigger) => !trigger);
          }}
        >
          <Play className="size-5 md:size-6" />
          <p className="uppercase">replay</p>
        </div>
      )}
    </div>
  );
}
