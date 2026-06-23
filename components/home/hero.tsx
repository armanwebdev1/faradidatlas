"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Language } from "@/lib/i18n";

interface HeroProps {
  lang: Language;
}

interface HeroImage {
  src: string;
}

interface HeroSlide {
  id: number;
  image: HeroImage;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  description: Record<Language, string>;
}

function heroImage(filename: string): HeroImage {
  return {
    src: `/hero/optimized/${filename}`,
  };
}

const slides: HeroSlide[] = [
  {
    id: 1,
    image: heroImage("home-hero-1.webp"),
    title: {
      en: "Reliable Food Supply",
      fa: "تأمین مواد غذایی",
    },
    subtitle: {
      en: "Food Security in Practice",
      fa: "تأمین پایدار، فراتر از شعار",
    },
    description: {
      en: "Established in 2009, Faradid Atlas sources, imports, and distributes essential food products with disciplined quality standards and dependable regional operations.",
      fa: "فرادید اطلس از سال ۱۳۸۸ در زمینه تأمین، واردات و توزیع مواد غذایی اساسی فعالیت می‌کند؛ با انتخاب دقیق محصولات، پایبندی به استانداردهای کیفی و شبکه‌ای منظم برای پاسخ‌گویی به نیاز بازار.",
    },
  },
  {
    id: 2,
    image: heroImage("home-hero-2.webp"),
    title: {
      en: "Direct Sourcing Network",
      fa: "ارتباط نزدیک با مبدا تامین",
    },
    subtitle: {
      en: "From Origin to Market",
      fa: "از مبدأ معتبر تا بازار مصرف",
    },
    description: {
      en: "Supplier relationships across key food-producing markets help keep rice, legumes, nuts, seeds, spices, and sugar moving through clear, practical channels.",
      fa: "ارتباط مستقیم با تأمین‌کنندگان معتبر در بازارهای اصلی تولید غذا، مسیر تأمین برنج، حبوبات، مغزها، دانه‌ها، ادویه‌ها و شکر را شفاف‌تر، سریع‌تر و قابل اتکاتر می‌کند.",
    },
  },
  {
    id: 3,
    image: heroImage("home-hero-3.webp"),
    title: {
      en: "Steady Regional Reach",
      fa: "پشتیبانی مطمئن",
    },
    subtitle: {
      en: "Built for B2B Continuity",
      fa: "برای تأمین مستمر خریداران عمده و سازمانی",
    },
    description: {
      en: "Offices, branches, and warehouse support across the region give buyers a steadier path from product need to reliable delivery.",
      fa: "دفاتر، شعب و پشتیبانی انبار در ایران و بازارهای منطقه‌ای، به خریداران کمک می‌کند از مرحله نیازسنجی تا تحویل محصول، مسیر مطمئن‌تر و منظم‌تری را تجربه کنند.",
    },
  },
];

export function Hero({ lang }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isRTL = lang === "fa";
  const activeSlide = slides[activeIndex];
  const titleParts = useMemo(
    () => activeSlide.title[lang].split(" "),
    [activeSlide, lang],
  );
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
  }, [activeIndex]);

  const goToSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  const goToPrevious = () => goToSlide(activeIndex - 1);
  const goToNext = () => goToSlide(activeIndex + 1);

  return (
    <div className="relative h-[calc(100svh-5rem)] min-h-[34rem] max-h-[820px] w-full overflow-hidden bg-neutral-950 md:h-[calc(100svh-9rem)]">
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 block transition-opacity duration-1000 ease-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                key={`${slide.id}-${isActive ? "active" : "idle"}`}
                src={slide.image.src}
                alt=""
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                sizes="100vw"
                quality={84}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/45 to-black/90" />
      </div>

      <div className="absolute inset-x-0 top-1/2 z-30 flex -translate-y-1/2 items-center justify-between px-4 sm:px-6 md:px-8 pointer-events-none">
        <button
          type="button"
          onClick={goToPrevious}
          className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-brand-navy/70 hover:bg-brand-navy/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white/20 md:h-12 md:w-12"
          aria-label={lang === "en" ? "Previous hero slide" : "اسلاید قبلی"}
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
          aria-label={lang === "en" ? "Next hero slide" : "اسلاید بعدی"}
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
          key={activeSlide.id}
          className={`max-w-5xl px-8 md:px-12 lg:px-20 pb-16 sm:pb-20 md:pb-24 transform-gpu ${textShiftClass}`}
          dir={isRTL ? "rtl" : "ltr"}
          aria-live="polite"
        >
          <p
            className="eyebrow mb-5 text-accent-warm-gold animate-fade-in-up"
            style={{ animationDelay: "0.05s" }}
          >
            {activeSlide.subtitle[lang]}
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
            {activeSlide.description[lang]}
          </p>

          <div
            className={`flex items-center gap-2 animate-fade-in-up ${
              isRTL ? "justify-start" : ""
            }`}
            dir={isRTL ? "rtl" : "ltr"}
            style={{ animationDelay: "0.28s" }}
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white/20 ${
                  index === activeIndex
                    ? "w-12 bg-brand-navy shadow-[0_0_0_1px_rgba(255,255,255,0.38),0_0_18px_rgba(48,59,112,0.45)]"
                    : "w-6 bg-white/40 hover:bg-white/65"
                }`}
                aria-label={
                  lang === "en"
                    ? `Go to hero slide ${index + 1}`
                    : `رفتن به اسلاید ${index + 1}`
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
