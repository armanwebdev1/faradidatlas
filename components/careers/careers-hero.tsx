"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Language } from "@/lib/i18n";

interface CareersHeroProps {
  lang: Language;
}

export function CareersHero({ lang }: CareersHeroProps) {
  const isRTL = lang === "fa";
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = [
      titleRef.current,
      subtitleRef.current,
      ctaRef.current,
    ].filter(Boolean);

    if (reduceMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      gsap.set(bgRef.current, { scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y: 24 });
      gsap.set(bgRef.current, { scale: 1.04 });

      const timeline = gsap.timeline({
        defaults: { ease: "cubic-bezier(0.22, 1, 0.36, 1)" },
      });

      timeline
        .to(bgRef.current, { scale: 1, duration: 1.4 }, 0)
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.2)
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.9 }, 0.4)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.55);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-neutral-950"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/featured1.jpg')" }}
      />
      <div
        className={`absolute inset-0 ${
          isRTL
            ? "bg-gradient-to-l from-black/80 via-black/60 to-black/10"
            : "bg-gradient-to-r from-black/80 via-black/60 to-black/10"
        }`}
      />

      <div className="relative z-10 flex min-h-screen items-center px-4 sm:px-6">
        <div className="container-full">
          <div
            className={`max-w-2xl ${isRTL ? "text-right" : "text-left"}`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <h1
              ref={titleRef}
              className="mb-8 font-hero text-white"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-hero)"
                    : "Estedad, var(--font-hero)",
                textAlign: isRTL ? "right" : "left",
              }}
            >
              <span className="block">
                {lang === "en" ? "Create" : "فرصت‌های"}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-warm-gold via-accent-warm-orange to-accent-warm-gold">
                {lang === "en" ? "Opportunities" : "جدید"}
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="mb-10 max-w-2xl leading-[1.6] text-white/85"
              style={{
                fontSize: "clamp(16px, 2vw, 18px)",
                fontFamily:
                  lang === "en"
                    ? "var(--font-body)"
                    : "Shabnam, var(--font-body)",
                textAlign: isRTL ? "right" : "left",
              }}
            >
              {lang === "en"
                ? "Join a global team transforming specialty goods sourcing with innovation, integrity, and impact."
                : "به تیم جهانی بپیوندید که با نوآوری، درستکاری و تاثیر، تامین کالاهای تخصصی را متحول می‌کند."}
            </p>

            <div
              ref={ctaRef}
              className={`mt-8 flex flex-col sm:flex-row gap-4 ${
                isRTL ? "sm:flex-row-reverse" : ""
              }`}
            >
              <a
                href="#open-roles"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm sm:text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-2xl hover:shadow-foreground/10 border border-white/10"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                  fontWeight: "600",
                }}
              >
                {lang === "en" ? "View Open Positions" : "موقعیت‌های باز"}
              </a>
              <a
                href="#culture"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-3 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                  fontWeight: "600",
                }}
              >
                {lang === "en" ? "Our Culture" : "فرهنگ ما"}
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
