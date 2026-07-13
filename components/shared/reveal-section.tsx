"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";

interface RevealSectionProps {
  className?: string;
  id?: string;
  threshold?: number;
}

export function RevealSection({
  children,
  className = "",
  id,
  threshold = 0.2,
}: PropsWithChildren<RevealSectionProps>) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      section.classList.remove("opacity-0", "translate-y-6");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          section.classList.add("animate-fade-in-up");
          section.classList.remove("opacity-0", "translate-y-6");
          observer.unobserve(section);
        }
      },
      { threshold },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <section ref={sectionRef} id={id} className={className}>
      {children}
    </section>
  );
}
