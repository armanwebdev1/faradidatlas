"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Language } from "@/lib/i18n";

interface BrandShowcaseProps {
  lang: Language;
}

export function BrandShowcase({ lang }: BrandShowcaseProps) {
  const isRTL = lang === "fa";
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

  const alt =
    lang === "en"
      ? "Faradid Atlas, a leader in supplying food products, featuring the recognized brands Mizban, 21, Hayat, and Golbanoo."
      : "شرکت فرادید اطلس، پیشرو در عرضه محصولات غذایی، با نام‌های شناخته‌شده میزبان، ۲۱، حیات و گلبانو.";

  const image =
    lang === "en"
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
          className={`reveal-side eyebrow text-brand-navy mb-8 text-center sm:mb-10 ${
            isVisible ? "is-visible" : ""
          }`}
        >
          {lang === "en" ? "Our Brands" : "برندهای ما"}
        </p>
        <div className="grid items-center gap-10 md:gap-12 lg:gap-16 md:grid-cols-2">
          <div
            className={`reveal-side mx-auto max-w-md text-center md:mx-0 ${
              isVisible ? "is-visible" : ""
            } ${isRTL ? "md:order-2 md:text-right" : "md:order-1 md:text-left"}`}
            style={{ ["--reveal-x" as string]: isRTL ? "48px" : "-48px" }}
          >
            <h2 className="text-responsive-title text-foreground mb-5 sm:mb-6 text-balance">
              {lang === "en" ? "Trusted names" : "نام‌های آشنا"}
            </h2>
            <p className="text-responsive-body text-foreground/70 text-pretty">
              {lang === "en"
                ? "Mizban, 21, Hayat, and Golbanoo — recognized brands delivered through Faradid Atlas."
                : "میزبان، ۲۱، حیات و گلبانو؛ برندهای شناخته‌شده که از طریق فرادید اطلس عرضه می‌شوند."}
            </p>
          </div>

          <div
            className={`reveal-side ${isVisible ? "is-visible" : ""} ${
              isRTL ? "md:order-1" : "md:order-2"
            }`}
            style={{
              ["--reveal-x" as string]: isRTL ? "-48px" : "48px",
              transitionDelay: "0.12s",
            }}
          >
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl sm:rounded-3xl border border-border/40 bg-background shadow-[0_40px_90px_-60px_rgba(12,18,24,0.5),0_16px_40px_-30px_rgba(12,18,24,0.2)]">
              <Image
                src={image}
                alt={alt}
                width={1270}
                height={1239}
                loading="lazy"
                quality={88}
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
