"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { Language } from "@/lib/i18n";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface HeroProps {
  lang: Language;
}

const slides = [
  {
    id: 1,
    image: "/1.jpg",
    title: { en: "Premium Global Foods", fa: "غذاهای اول درجه جهانی" },
    subtitle: { en: "Exceptional Quality", fa: "کیفیت برتر" },
    description: {
      en: "Trusted global food exporter with premium sourcing, certified quality, and private labeling solutions for discerning partners worldwide.",
      fa: "تامین‌کننده معتبر محصولات غذایی صادراتی با استانداردهای بین‌المللی، گواهی‌های کیفیت و تعهد به برتری",
    },
  },
  {
    id: 2,
    image: "/2.jpg",
    title: { en: "Certified Excellence", fa: "برتری معتمد" },
    subtitle: { en: "International Standards", fa: "استانداردهای بین‌المللی" },
    description: {
      en: "Meeting and exceeding international quality standards with rigorous testing and compliance procedures across all product categories.",
      fa: "رعایت و تجاوز از استانداردهای کیفی بین‌المللی با آزمایش‌های سخت‌گیرانه و رویه‌های انطباق در تمام دسته‌های محصول",
    },
  },
  {
    id: 3,
    image: "/3.jpg",
    title: { en: "Global Distribution", fa: "توزیع جهانی" },
    subtitle: { en: "Worldwide Reach", fa: "دسترسی جهانی" },
    description: {
      en: "Delivering premium products to partners across continents with reliable logistics and uncompromising quality standards.",
      fa: "تحویل محصولات نخبه به شركاء در سراسر قاره‌ها با لجستیک قابل‌اعتماد و استانداردهای کیفی سازش‌ناپذیر",
    },
  },
];

export function Hero({ lang }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const isRTL = lang === "fa";

  const goToSlide = (index: number) => {
    setCurrentSlide((index + slides.length) % slides.length);
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  useEffect(() => {
    const timeline = gsap.timeline();

    gsap.set(
      [
        subtitleRef.current,
        titleLine1Ref.current,
        titleLine2Ref.current,
        descriptionRef.current,
      ],
      { opacity: 0, y: 60 },
    );

    timeline.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    });

    timeline.to(
      titleLine1Ref.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      0.2,
    );

    timeline.to(
      titleLine2Ref.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      0.4,
    );

    timeline.to(
      descriptionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      0.6,
    );

    return () => {
      timeline.kill();
    };
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div
      ref={containerRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="relative h-screen w-full overflow-hidden bg-neutral-900"
    >
      <div className="relative h-full w-full">
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${s.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/90" />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className={`absolute top-1/2 -translate-y-1/2 z-20 ${
          isRTL ? "right-8" : "left-8"
        }`}
      >
        <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition">
          <MdChevronLeft size={28} className="text-white" />
        </div>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className={`absolute top-1/2 -translate-y-1/2 z-20 ${
          isRTL ? "left-8" : "right-8"
        }`}
      >
        <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition">
          <MdChevronRight size={28} className="text-white" />
        </div>
      </button>

      <div className="absolute bottom-0 inset-x-0 z-10">
        <div
          className={`max-w-5xl px-8 md:px-32 pb-20 md:pb-28 ${
            isRTL ? "mr-auto text-right" : "ml-auto text-left"
          }`}
        >
          <p
            ref={subtitleRef}
            className="mb-6 font-label font-medium tracking-[0.2em] uppercase text-accent-warm-gold"
            style={{ fontSize: "clamp(14px, 2.5vw, 20px)" }}
          >
            {slide.subtitle[lang]}
          </p>

          <h1
            className="mb-8 font-hero text-white"
            style={{
              fontFamily:
                lang === "en"
                  ? "var(--font-hero)"
                  : "Estedad, var(--font-hero)",
            }}
          >
            <span ref={titleLine1Ref} className="block">
              {slide.title[lang].split(" ")[0]}
            </span>
            <span ref={titleLine2Ref} className="block">
              {slide.title[lang].split(" ").slice(1).join(" ")}
            </span>
          </h1>

          <p
            ref={descriptionRef}
            className="mb-10 max-w-2xl leading-[1.6] text-white/85"
            style={{
              fontSize: "clamp(16px, 2vw, 18px)",
              fontFamily:
                lang === "en"
                  ? "var(--font-body)"
                  : "Shabnam, var(--font-body)",
            }}
          >
            {slide.description[lang]}
          </p>

          <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
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
