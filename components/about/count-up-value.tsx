"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpValueProps {
  target: number;
  suffix?: string;
  decimals?: number;
}

export function CountUpValue({
  target,
  suffix = "",
  decimals = 0,
}: CountUpValueProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1.2;
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          intervalRef.current = setInterval(
            () => {
              current += increment;
              if (current >= target) {
                setCount(target);
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                  intervalRef.current = null;
                }
              } else if (decimals > 0) {
                setCount(Number(current.toFixed(decimals)));
              } else {
                setCount(Math.floor(current));
              }
            },
            (duration * 1000) / steps,
          );
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [target, decimals]);

  const display =
    decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();

  return (
    <p ref={containerRef} className="text-3xl font-bold text-primary">
      {display}
      {suffix}
    </p>
  );
}
