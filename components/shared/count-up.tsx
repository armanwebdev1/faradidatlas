"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  target: number;
  suffix?: string;
  className?: string;
}

export function CountUp({ target, suffix = "", className = "" }: CountUpProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [target]);

  return (
    <div ref={containerRef} className={className}>
      {count}
      {suffix}
    </div>
  );
}
