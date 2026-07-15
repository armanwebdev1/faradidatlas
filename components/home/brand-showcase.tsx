"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/i18n";
import type { translations } from "@/lib/i18n";
import { getLocalized } from "@/lib/localized";

interface BrandShowcaseProps {
  lang: Language;
  t: (typeof translations)[Language];
  brands?: Array<{
    brandName?: any;
    logo?: any;
    description?: any;
  }>;
}

function resolveMediaUrl(media: any): string {
  if (!media) return "/brands/brands-banner/brands-showcase-banner-en.jpeg";
  if (typeof media === "string") return media;
  if (typeof media === "object")
    return (
      media.url ??
      media.filename ??
      "/brands/brands-banner/brands-showcase-banner-en.jpeg"
    );
  return "/brands/brands-banner/brands-showcase-banner-en.jpeg";
}

export function BrandShowcase({ lang, t, brands }: BrandShowcaseProps) {
  const isRTL = lang === "fa" || lang === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const alt = t.pages.home.brandsImageAlt;

  const image =
    lang === "ar"
      ? "/brands/brands-banner/brands-showcase-ar.jpeg"
      : lang === "en"
        ? "/brands/brands-banner/brands-showcase-banner-en.jpeg"
        : "/brands/brands-banner/brands-showcase-banner-fa.jpeg";

  return (
    <section
      ref={sectionRef}
      className="section relative overflow-hidden bg-surface"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-navy/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="relative z-10 container-wide">
        <p
          className={`reveal-side eyebrow text-brand-navy mx-auto mb-8 sm:mb-10 ${
            isVisible ? "is-visible" : ""
          }`}
        >
          {t.pages.home.brandsEyebrow}
        </p>
        <div className="grid items-center gap-10 md:gap-12 lg:gap-16 md:grid-cols-2">
          <div
            className={`reveal-side mx-auto max-w-md text-center md:mx-0 ${
              isVisible ? "is-visible" : ""
            } md:order-1 ${isRTL ? "md:text-right" : "md:text-left"}`}
            style={{ ["--reveal-x" as string]: isRTL ? "48px" : "-48px" }}
          >
            <h2 className="text-responsive-title text-foreground mb-5 sm:mb-6 text-balance">
              {t.pages.home.brandsTitle}
            </h2>
            <p className="text-responsive-body text-foreground/70 text-pretty">
              {t.pages.home.brandsDescription}
            </p>
          </div>

          <div
            className={`reveal-side md:order-2 ${
              isVisible ? "is-visible" : ""
            }`}
            style={{
              ["--reveal-x" as string]: isRTL ? "-48px" : "48px",
              transitionDelay: "0.12s",
            }}
          >
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl sm:rounded-3xl border border-border/40 bg-background shadow-lg">
              <Image
                src={image}
                alt={alt}
                width={1270}
                height={1239}
                loading="lazy"
                sizes="(min-width: 768px) 28rem, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
