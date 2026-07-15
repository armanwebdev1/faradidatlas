"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

interface AnimatedSectionProps {
  className?: string;
  fallbackDelay?: number;
  type?: "fade-up" | "scale" | "slide-left" | "slide-right" | "blur";
}

const animationClasses: Record<string, string> = {
  "fade-up": "animate-fade-in-up",
  "scale": "animate-scale-reveal",
  "slide-left": "animate-slide-left",
  "slide-right": "animate-slide-right",
  "blur": "animate-blur-reveal",
};

const initialClasses: Record<string, string> = {
  "fade-up": "opacity-0 translate-y-6",
  "scale": "opacity-0",
  "slide-left": "opacity-0",
  "slide-right": "opacity-0",
  "blur": "opacity-0",
};

export function AnimatedSection({
  children,
  className = "",
  fallbackDelay = 0.12,
  type = "fade-up",
}: PropsWithChildren<AnimatedSectionProps>) {
  const containerRef = useRef<HTMLElement>(null);

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
      const element = el as HTMLElement;
      if (!element.style.animationDelay) {
        element.style.animationDelay = `${index * fallbackDelay}s`;
      }
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [fallbackDelay, type]);

  return (
    <section ref={containerRef} className={className}>
      {children}
    </section>
  );
}
