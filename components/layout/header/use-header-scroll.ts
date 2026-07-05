"use client";

import { useEffect, useRef, useState } from "react";
import type { HeaderMode } from "./header-data";

export function useHeaderScroll(): HeaderMode {
  const [headerMode, setHeaderMode] = useState<HeaderMode>("full");
  const lastScrollYRef = useRef(0);
  const downScrollStartYRef = useRef(0);

  useEffect(() => {
    const topThreshold = 8;
    const directionThreshold = 3;
    const hideScrollDistance = 100;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      if (currentScrollY <= topThreshold) {
        setHeaderMode("full");
        lastScrollYRef.current = currentScrollY;
        downScrollStartYRef.current = currentScrollY;
        return;
      }

      if (Math.abs(scrollDelta) < directionThreshold) return;

      if (scrollDelta < 0) {
        setHeaderMode("compact");
        downScrollStartYRef.current = currentScrollY;
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (currentScrollY - downScrollStartYRef.current >= hideScrollDistance) {
        setHeaderMode("hidden");
      }

      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    downScrollStartYRef.current = window.scrollY;
    setHeaderMode(lastScrollYRef.current <= topThreshold ? "full" : "hidden");
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return headerMode;
}
