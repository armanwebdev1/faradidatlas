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
    isActive?: boolean | null;
  }>;
  section?: {
    eyebrow?: any;
    title?: any;
    description?: any;
    bannerImage?: any;
  };
}

function resolveMediaUrl(media: any): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  if (typeof media === "object") return media.url ?? media.filename ?? null;
  return null;
}

const defaultBrandLogos: Record<string, string> = {
  Hayat: "/brands/hayat-4k.webp",
  Golbanoo: "/brands/golbanoo-4k.webp",
  "Twenty One": "/brands/twenty-one-4k.webp",
  Mizban: "/brands/mizban-4k.webp",
};

const defaultBannerByLang: Record<string, string> = {
  ar: "/brands/brands-banner/brands-showcase-banner-ar.jpeg",
  en: "/brands/brands-banner/brands-showcase-banner-en.jpeg",
  fa: "/brands/brands-banner/brands-showcase-banner-fa.jpeg",
};

export function BrandShowcase({ lang, t, brands, section }: BrandShowcaseProps) {
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

  const eyebrow = getLocalized(section?.eyebrow, lang) || t.pages.home.brandsEyebrow;
  const title = getLocalized(section?.title, lang) || t.pages.home.brandsTitle;
  const description = getLocalized(section?.description, lang) || t.pages.home.brandsDescription;

  const activeBrands = brands?.filter((b) => b.isActive !== false) ?? [];
  const hasBrands = activeBrands.length > 0;

  const bannerImage = resolveMediaUrl(section?.bannerImage) ?? defaultBannerByLang[lang] ?? defaultBannerByLang.en;

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
          {eyebrow}
        </p>
        <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 lg:gap-16 xl:gap-20 ${isRTL ? "[direction:ltr]" : ""}`}>
          <div
            className={`reveal-side w-full md:w-auto md:flex-1 max-w-lg text-center ${
              isVisible ? "is-visible" : ""
            } ${isRTL ? "md:text-right" : "md:text-left"}`}
            style={{ ["--reveal-x" as string]: isRTL ? "48px" : "-48px" }}
          >
            <h2 className="text-responsive-title text-foreground mb-5 sm:mb-6 text-balance">
              {title}
            </h2>
            <p className="text-responsive-body text-foreground/70 text-pretty">
              {description}
            </p>

            {hasBrands && (
              <div className={`mt-8 grid grid-cols-2 gap-4 ${isRTL ? "text-right" : ""}`}>
                {activeBrands.map((brand, idx) => {
                  const name = getLocalized(brand.brandName, lang);
                  const logoUrl = resolveMediaUrl(brand.logo) ?? defaultBrandLogos[name] ?? null;

                  return (
                    <div
                      key={`${name}-${idx}`}
                      className="flex flex-col items-center gap-2 rounded-xl border border-foreground/8 bg-background/60 p-4 transition-all duration-300 hover:border-brand-navy/20 hover:shadow-sm"
                    >
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={name}
                          width={120}
                          height={60}
                          loading="lazy"
                          className="h-12 w-auto object-contain"
                        />
                      ) : (
                        <span className="text-lg font-semibold text-foreground">{name}</span>
                      )}
                      {brand.description && (
                        <p className="text-xs text-foreground/50 text-center leading-relaxed">
                          {getLocalized(brand.description, lang)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div
            className={`reveal-side shrink-0 ${
              isVisible ? "is-visible" : ""
            }`}
            style={{
              ["--reveal-x" as string]: isRTL ? "-48px" : "48px",
              transitionDelay: "0.12s",
            }}
          >
            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl sm:rounded-3xl border border-border/40 bg-background shadow-lg">
              <Image
                src={bannerImage}
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
