import type { PropsWithChildren } from "react";

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
  void threshold;

  const visibleClassName = className
    .replace(/\bopacity-0\b/g, "")
    .replace(/\btranslate-y-6\b/g, "")
    .trim();

  return (
    <section id={id} className={visibleClassName}>
      {children}
    </section>
  );
}
