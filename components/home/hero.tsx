"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

interface HeroProps {
  lang: Language;
  slides: Array<{
    id?: number;
    image?: any;
    title?: any;
    subtitle?: any;
    description?: any;
  }>;
}

function resolveMediaUrl(media: any): string {
  if (!media) return "/hero/optimized/home-hero-1.webp";
  if (typeof media === "string") return media;
  if (typeof media === "object")
    return media.url ?? media.filename ?? "/hero/optimized/home-hero-1.webp";
  return "/hero/optimized/home-hero-1.webp";
}

function getLocalized(value: any, lang: Language): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value[lang]) return value[lang];
  if (typeof value === "object" && value.en) return value.en;
  return "";
}

const defaultSlides = [
  {
    id: 1,
    image: { url: "/hero/optimized/home-hero-1.webp" },
    title: {
      en: "Reliable Food Supply",
      fa: "تأمین مواد غذایی",
      ar: "تزوين الغذاء الموثوق",
    },
    subtitle: {
      en: "Food Security in Practice",
      fa: "تأمین پایدار، فراتر از شعار",
      ar: "أمن غذائي عملي",
    },
    description: {
      en: "Since 2009, Faradid Atlas has been a wholesale food supplier sourcing, importing, and distributing rice, legumes, nuts, seeds, spices, and sugar to B2B buyers across Iran, UAE, and Oman.",
      fa: "فرادید اطلس از سال ۱۳۸۸ به عنوان تأمین‌کننده عمده مواد غذایی فعالیت می‌کند.",
      ar: "منذ عام ٢٠٠٩، يعمل فراديد أطلس كمزود غذائي بالجملة.",
    },
  },
];

export function Hero({ lang, slides: rawSlides }: HeroProps) {
  const slides = rawSlides?.length ? rawSlides : defaultSlides;
  const [activeIndex, setActiveIndex] = useState(0);
  const isRTL = lang === "fa" || lang === "ar";
  const t = translations[lang];
  const activeSlide = slides[activeIndex];
  const titleText = getLocalized(activeSlide?.title, lang);
  const subtitleText = getLocalized(activeSlide?.subtitle, lang);
  const descriptionText = getLocalized(activeSlide?.description, lang);
  const titleParts = useMemo(() => titleText.split(" "), [titleText]);
  const textShiftClass = isRTL
    ? "ml-auto w-full text-right -translate-x-4 sm:-translate-x-6 md:-translate-x-8"
    : "text-left translate-x-4 sm:translate-x-6 md:translate-x-8";

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 6200);

    return () => window.clearInterval(timer);
  }, [activeIndex, slides.length]);

  const goToSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  const goToPrevious = () => goToSlide(activeIndex - 1);
  const goToNext = () => goToSlide(activeIndex + 1);

  return (
    <div className="relative h-[calc(100svh-5rem)] min-h-136 max-h-205 w-full overflow-hidden bg-neutral-950 md:h-[calc(100svh-9rem)]">
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const isLoaded = index <= activeIndex || isActive;

          if (!isLoaded) return null;

          return (
            <div
              key={slide.id ?? index}
              className={`absolute inset-0 block transition-opacity duration-1000 ease-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                key={`${slide.id}-${isActive ? "active" : "idle"}`}
                src={resolveMediaUrl(slide.image)}
                alt={`${getLocalized(slide.title, lang)} – ${getLocalized(slide.subtitle, lang)}`}
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                sizes="100vw"
                unoptimized
                className={`h-full w-full object-cover transform-gpu ${
                  isActive
                    ? "md:scale-[1.03] motion-safe:md:animate-hero-image-zoom"
                    : "md:scale-[1.08]"
                }`}
              />
            </div>
          );
        })}

        <div className="hero-premium-sheen" aria-hidden="true" />
        <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/45 to-black/90" />
      </div>

      <div className="absolute inset-x-0 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-between px-4 sm:flex sm:px-6 md:px-8 pointer-events-none">
        <button
          type="button"
          onClick={goToPrevious}
          className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-brand-navy/70 hover:bg-brand-navy/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white/20 md:h-12 md:w-12"
          aria-label={t.pages.home.prevSlide}
        >
          {isRTL ? (
            <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
          ) : (
            <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
          )}
        </button>

        <button
          type="button"
          onClick={goToNext}
          className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-brand-navy/70 hover:bg-brand-navy/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white/20 md:h-12 md:w-12"
          aria-label={t.pages.home.nextSlide}
        >
          {isRTL ? (
            <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
          ) : (
            <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
          )}
        </button>
      </div>

      <div className="absolute bottom-0 inset-x-0 z-20">
        <div
          key={activeSlide?.id ?? activeIndex}
          className={`max-w-5xl px-8 md:px-12 lg:px-20 pb-16 sm:pb-20 md:pb-24 transform-gpu ${textShiftClass}`}
          dir={isRTL ? "rtl" : "ltr"}
          aria-live="polite"
        >
          <p
            className="eyebrow mb-5 text-accent-warm-gold animate-fade-in-up"
            style={{ animationDelay: "0.05s" }}
          >
            {subtitleText}
          </p>

          <h1
            className="mb-6 text-responsive-hero text-white animate-fade-in-up"
            style={{ animationDelay: "0.12s" }}
          >
            <span className="block">{titleParts[0]}</span>
            <span className="block">{titleParts.slice(1).join(" ")}</span>
          </h1>

          <p
            className={`mb-8 max-w-2xl text-responsive-body text-white/85 animate-fade-in-up ${
              isRTL ? "ml-auto mr-0 text-right" : ""
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            {descriptionText}
          </p>

          <div
            className={`flex items-center gap-2 animate-fade-in-up ${
              isRTL ? "justify-start" : ""
            }`}
            dir={isRTL ? "rtl" : "ltr"}
            style={{ animationDelay: "0.28s" }}
          >
            <button
              type="button"
              onClick={goToPrevious}
              className="mx-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/12 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-brand-navy/70 hover:bg-brand-navy/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/50 sm:hidden"
              aria-label={t.pages.home.prevSlide}
            >
              {isRTL ? (
                <ChevronRight className="h-4.5 w-4.5" strokeWidth={1.8} />
              ) : (
                <ChevronLeft className="h-4.5 w-4.5" strokeWidth={1.8} />
              )}
            </button>
            {slides.map((slide, index) => (
              <button
                key={slide.id ?? index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white/20 ${
                  index === activeIndex
                    ? "w-12 bg-brand-navy shadow-[0_0_0_1px_rgba(255,255,255,0.38),0_0_18px_rgba(48,59,112,0.45)]"
                    : "w-6 bg-white/40 hover:bg-white/65"
                }`}
                aria-label={`${t.pages.home.goToSlide} ${index + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={goToNext}
              className="mx-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/12 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-brand-navy/70 hover:bg-brand-navy/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/50 sm:hidden"
              aria-label={t.pages.home.nextSlide}
            >
              {isRTL ? (
                <ChevronLeft className="h-4.5 w-4/.5" strokeWidth={1.8} />
              ) : (
                <ChevronRight className="h-4.5 w-4.5" strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
