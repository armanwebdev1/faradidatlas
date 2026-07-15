"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

interface AnimatedHeadlineProps {
  className?: string;
}

export function AnimatedHeadline({
  children,
  className = "",
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
          el.classList.add("animate-fade-in-up");
          el.classList.remove("opacity-0", "translate-y-6");
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 },
    );

    const elements = node.querySelectorAll("[data-animate]");
    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.12}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
