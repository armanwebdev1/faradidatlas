"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

interface AnimatedHeadlineProps {
  className?: string;
  type?: "fade-up" | "scale" | "blur";
}

const animationClasses: Record<string, string> = {
  "fade-up": "animate-fade-in-up",
  "scale": "animate-scale-reveal",
  "blur": "animate-blur-reveal",
};

const initialClasses: Record<string, string> = {
  "fade-up": "opacity-0 translate-y-6",
  "scale": "opacity-0",
  "blur": "opacity-0",
};

export function AnimatedHeadline({
  children,
  className = "",
  type = "fade-up",
}: PropsWithChildren<AnimatedHeadlineProps>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add(animationClasses[type]);
          el.classList.remove(...initialClasses[type].split(" "));
          observer.unobserve(el);
        });
      },
      { threshold: 0.15 },
    );

    const elements = node.querySelectorAll("[data-animate]");
    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.12}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [type]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
