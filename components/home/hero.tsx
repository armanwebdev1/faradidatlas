"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

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
      ar: "تزوين الغذاء الموثوق",
    },
    subtitle: {
      en: "Food Security in Practice",
      fa: "تأمین پایدار، فراتر از شعار",
      ar: "أمن غذائي عملي",
    },
    description: {
      en: "Since 2009, Faradid Atlas has been a wholesale food supplier sourcing, importing, and distributing rice, legumes, nuts, seeds, spices, and sugar to B2B buyers across Iran, UAE, and Oman — with ISO 22000-aligned quality standards and dependable regional distribution.",
      fa: "فرادید اطلس از سال ۱۳۸۸ به عنوان تأمین‌کننده عمده مواد غذایی، برنج، حبوبات، مغزها، دانه‌ها، ادویه‌ها و شکر را برای خریداران B2B در ایران، امارات و عمان تأمین، واردات و توزیع می‌کند؛ با استانداردهای کیفی ISO 22000 و عملیات توزیع منطقه‌ای قابل اتکا.",
      ar: "منذ عام ٢٠٠٩، يعمل فراديد أطلس كمزود غذائي بالجملة يتوريد ويستورد ويوزع الأرز والبقوليات والمكسرات والبذور والتوابل والسكر للمشترين B2B في إيران والإمارات وعمان — بمعايير جودة متوافقة مع ISO 22000 وعمليات توزيع إقليمية موثوقة.",
    },
  },
  {
    id: 2,
    image: heroImage("home-hero-2.webp"),
    title: {
      en: "Direct Sourcing Network",
      fa: "ارتباط نزدیک با مبدا تامین",
      ar: "شبكة التوريد المباشر",
    },
    subtitle: {
      en: "From Origin to Market",
      fa: "از مبدأ معتبر تا بازار مصرف",
      ar: "من المصدر إلى السوق",
    },
    description: {
      en: "Direct B2B sourcing relationships across India, Pakistan, and key food-producing markets keep wholesale supplies of rice, legumes, nuts, seeds, spices, and sugar moving through clear, practical distribution channels to the Middle East.",
      fa: "ارتباط مستقیم تأمین B2B با تأمین‌کنندگان معتبر در هند، پاکستان و بازارهای اصلی تولید غذا، تأمین عمده برنج، حبوبات، مغزها، دانه‌ها، ادویه‌ها و شکر را به خاورمیانه از مسیرهای شفاف و عملی توزیع تضمین می‌کند.",
      ar: "علاقات التوريد المباشرة B2B مع الموردين في الهند وباكستان وأسواق الإنتاج الغذائي الرئيسية تضمن تدفق إمدادات بالجملة من الأرز والبقوليات والمكسرات والبذور والتوابل والسكر إلى الشرق الأوسط عبر قنوات توزيع واضحة وعملية.",
    },
  },
  {
    id: 3,
    image: heroImage("home-hero-3.webp"),
    title: {
      en: "Steady Regional Reach",
      fa: "پشتیبانی مطمئن",
      ar: "تغطية إقليمية موثوقة",
    },
    subtitle: {
      en: "Built for B2B Continuity",
      fa: "برای تأمین مستمر خریداران عمده و سازمانی",
      ar: "مصمم لاستمرارية الأعمال",
    },
    description: {
      en: "Warehouses, branches, and offices in Tehran, Isfahan, Dubai, and Oman give wholesale buyers, B2B distributors, and foodservice partners a steadier path from product sourcing to reliable delivery across the region.",
      fa: "دفاتر، شعب و انبارهای عملیاتی در تهران، اصفهان، دبی و عمان، به خریداران عمده، توزیع‌کنندگان B2B و فعالان خدمات غذایی کمک می‌کند از مرحله تأمین محصول تا تحویل مطمئن در سراسر منطقه، مسیر مطمئن‌تری را تجربه کنند.",
      ar: "المكاتب والفرع والمستودعات في طهران وأصفهان ودبي وعمان توفر للمشترين بالجملة والموزعين B2B ومشغلي خدمات الطعام مساراً أكثر استقراراً من توريد المنتجات إلى التسليم الموثوق عبر المنطقة.",
    },
  },
];

export function Hero({ lang }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isRTL = lang === "fa" || lang === "ar";
  const t = translations[lang];
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
          const isLoaded = index <= activeIndex || isActive;

          if (!isLoaded) return null;

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
                alt={`${slide.title[lang]} – ${slide.subtitle[lang]}`}
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
            <button
              type="button"
              onClick={goToPrevious}
              className="mx-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/12 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-brand-navy/70 hover:bg-brand-navy/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/50 sm:hidden"
              aria-label={t.pages.home.prevSlide}
            >
              {isRTL ? (
                <ChevronRight className="h-[18px] w-[18px]" strokeWidth={1.8} />
              ) : (
                <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={1.8} />
              )}
            </button>
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
                <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={1.8} />
              ) : (
                <ChevronRight className="h-[18px] w-[18px]" strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
