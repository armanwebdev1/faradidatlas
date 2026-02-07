"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

interface StaggeredFadeProps {
  className?: string;
  delayStep?: number;
  selector?: string;
}

export function StaggeredFade({
  children,
  className = "",
  delayStep = 0.12,
  selector = ".animate-fade-in-up",
}: PropsWithChildren<StaggeredFadeProps>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll(selector);
    elements?.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * delayStep}s`;
    });
  }, [delayStep, selector]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
