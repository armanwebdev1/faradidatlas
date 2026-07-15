"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

interface AnimatedSectionProps {
  className?: string;
  fallbackDelay?: number;
}

export function AnimatedSection({
  children,
  className = "",
  fallbackDelay = 0.12,
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
          el.classList.add("animate-fade-in-up");
          el.classList.remove("opacity-0", "translate-y-6");
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 },
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
  }, [fallbackDelay]);

  return (
    <section ref={containerRef} className={className}>
      {children}
    </section>
  );
}
