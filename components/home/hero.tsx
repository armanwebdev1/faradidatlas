"use client";

import { useEffect, useState } from "react";
import type { Language } from "@/lib/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroProps {
  lang: Language;
}

const heroWidths = [640, 1280, 1920] as const;

function heroSrcSet(id: number, format: "avif" | "webp") {
  return heroWidths
    .map((width) => `/hero/${id}-${width}.${format} ${width}w`)
    .join(", ");
}

const slides = [
  {
    id: 1,
    image: {
      avif: heroSrcSet(1, "avif"),
      webp: heroSrcSet(1, "webp"),
      fallback: "/hero/1-1280.webp",
    },
    title: { en: "Reliable Food Supply", fa: "تامین مطمئن مواد غذایی" },
    subtitle: { en: "Food Security in Practice", fa: "امنیت غذایی در عمل" },
    description: {
      en: "Established in 2009, Faradid Atlas sources, imports, and distributes essential food products with disciplined quality standards and dependable regional operations.",
      fa: "فرادید اطلس که در سال ۱۳۸۸ بنیان گذاشته شد، محصولات غذایی اساسی را با انتخاب دقیق، استانداردهای کیفی منظم و عملیات منطقه‌ای قابل اتکا تامین، وارد و توزیع می‌کند.",
    },
  },
  {
    id: 2,
    image: {
      avif: heroSrcSet(2, "avif"),
      webp: heroSrcSet(2, "webp"),
      fallback: "/hero/2-1280.webp",
    },
    title: { en: "Quality-Led Sourcing", fa: "تامین مبتنی بر کیفیت" },
    subtitle: { en: "International Standards", fa: "استانداردهای بین‌المللی" },
    description: {
      en: "Rice, legumes, seeds, nuts, spices, and sugar are selected against strict hygiene and quality requirements before entering the supply chain.",
      fa: "برنج، حبوبات، دانه‌ها، آجیل، ادویه‌جات و شکر پیش از ورود به زنجیره تامین بر اساس الزامات دقیق بهداشتی و کیفی انتخاب می‌شوند.",
    },
  },
  {
    id: 3,
    image: {
      avif: heroSrcSet(3, "avif"),
      webp: heroSrcSet(3, "webp"),
      fallback: "/hero/3-1280.webp",
    },
    title: { en: "Regional Distribution Network", fa: "شبکه توزیع منطقه‌ای" },
    subtitle: { en: "Iran, UAE & Oman", fa: "ایران، امارات و عمان" },
    description: {
      en: "With offices, branches, and warehouses across key markets, we help wholesalers, retailers, and institutions keep essential supply moving.",
      fa: "با دفاتر، شعب و انبارها در بازارهای کلیدی، به عمده‌فروشان، خرده‌فروشان و سازمان‌ها کمک می‌کنیم تامین مواد غذایی اساسی پایدار بماند.",
    },
  },
];

export function Hero({ lang }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const isRTL = lang === "fa";
  const textShiftClass = isRTL
    ? "-translate-x-4 sm:-translate-x-6 md:-translate-x-8"
    : "translate-x-4 sm:translate-x-6 md:translate-x-8";

  const goToSlide = (index: number) => {
    setCurrentSlide((index + slides.length) % slides.length);
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];
  const titleParts = slide.title[lang].split(" ");

  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-900">
      <div className="relative h-full w-full">
        <picture key={slide.id}>
          <source type="image/avif" srcSet={slide.image.avif} sizes="100vw" />
          <source type="image/webp" srcSet={slide.image.webp} sizes="100vw" />
          <img
            src={slide.image.fallback}
            alt=""
            fetchPriority={currentSlide === 0 ? "high" : "auto"}
            loading={currentSlide === 0 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/90" />
      </div>

      <button
        onClick={prevSlide}
        aria-label={lang === "en" ? "Previous slide" : "اسلاید قبلی"}
        className={`absolute top-1/2 -translate-y-1/2 z-30 ${
          isRTL ? "right-8" : "left-8"
        }`}
      >
        <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition">
          {isRTL ? (
            <ChevronRight className="h-7 w-7 text-white" />
          ) : (
            <ChevronLeft className="h-7 w-7 text-white" />
          )}
        </div>
      </button>

      <button
        onClick={nextSlide}
        aria-label={lang === "en" ? "Next slide" : "اسلاید بعدی"}
        className={`absolute top-1/2 -translate-y-1/2 z-30 ${
          isRTL ? "left-8" : "right-8"
        }`}
      >
        <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition">
          {isRTL ? (
            <ChevronLeft className="h-7 w-7 text-white" />
          ) : (
            <ChevronRight className="h-7 w-7 text-white" />
          )}
        </div>
      </button>

      <div className="absolute bottom-0 inset-x-0 z-20">
        <div
          className={`max-w-5xl px-8 md:px-12 lg:px-20 pb-20 md:pb-28 transform-gpu transition-transform duration-700 text-left ${textShiftClass}`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <p
            key={`subtitle-${slide.id}`}
            className="eyebrow mb-6 text-accent-warm-gold"
          >
            {slide.subtitle[lang]}
          </p>

          <h1
            key={`title-${slide.id}`}
            className="mb-8 text-responsive-hero text-white"
          >
            <span className="block">{titleParts[0]}</span>
            <span className="block">
              {titleParts.slice(1).join(" ")}
            </span>
          </h1>

          <p
            key={`description-${slide.id}`}
            className="mb-10 max-w-2xl text-responsive-body text-white/85"
          >
            {slide.description[lang]}
          </p>

          <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={
                  lang === "en"
                    ? `Go to slide ${index + 1}`
                    : `رفتن به اسلاید ${index + 1}`
                }
                className={`h-1 transition-all duration-500 ${
                  index === currentSlide
                    ? "w-12 bg-white"
                    : "w-6 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
