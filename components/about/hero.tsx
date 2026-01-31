"use client";

import type { Language } from "@/lib/i18n";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface AboutHeroProps {
  lang: Language;
}

export function AboutHero({ lang }: AboutHeroProps) {
  const isRTL = lang === "fa";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll(
      ".animate-fade-in-up",
    );
    elements?.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.15}s`;
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <Image
            src="/about-hero-bg.jpg"
            alt="Premium food products"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-primary/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <div
          ref={containerRef}
          className="relative h-full w-full flex flex-col justify-center items-start"
        >
          <div
            className={`max-w-6xl px-8 sm:px-12 md:px-16 lg:px-32 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <div className="animate-fade-in-up mb-8">
              <span className="inline-block px-4 py-2 bg-accent-warm-gold/25 backdrop-blur-md rounded-full text-sm font-bold text-accent-warm-gold border border-accent-warm-gold/50 tracking-widest">
                {lang === "en" ? "SINCE 1998" : "از سال ۱۳۷۷"}
              </span>
            </div>

            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-tight tracking-tight font-hero max-w-5xl"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-hero)"
                    : "Estedad, var(--font-hero)",
              }}
            >
              {lang === "en" ? "Faradi Atlas" : "فارادی اطلس"}
            </h1>

            <p
              className="text-2xl md:text-3xl text-white/95 max-w-3xl leading-relaxed font-light mb-12"
              style={{
                fontFamily:
                  lang === "en"
                    ? "var(--font-body)"
                    : "Shabnam, var(--font-body)",
              }}
            >
              {lang === "en"
                ? "Pioneering Excellence in Global Food Trading"
                : "پیشگام برتری در تجارت جهانی غذایی"}
            </p>

            <button className="animate-fade-in-up px-8 py-4 bg-accent-warm-gold text-primary font-bold text-lg hover:bg-accent-warm-gold/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent-warm-gold/30 rounded-lg">
              {lang === "en" ? "Explore Our Story" : "داستان ما را کاوش کنید"}
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className={`animate-fade-in-up ${isRTL ? "lg:order-2" : ""}`}>
              <div className="relative h-96 md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/about-story.jpg"
                  alt="Iranian agricultural heritage"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div
              className={`space-y-8 animate-fade-in-up ${
                isRTL ? "lg:order-1" : ""
              }`}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tight font-hero">
                {lang === "en"
                  ? "Built on Trust & Quality"
                  : "بنا بر اعتماد و کیفیت"}
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                {lang === "en"
                  ? "Founded in 1998 with a simple yet powerful vision: the world's finest food products deserve trustworthy partners who understand quality, heritage, and responsibility."
                  : "تأسیس‌شده در سال ۱۳۷۷ با یک دیدگاه ساده اما قدرتمند: بهترین محصولات غذایی جهان شایسته شرکایی هستند که کیفیت، میراث و مسئولیت را درک کنند."}
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                {lang === "en"
                  ? "For over 25 years, we've cultivated deep relationships with the finest producers across Iran and beyond, building a reputation built on transparency, integrity, and an unwavering commitment to excellence."
                  : "برای بیش از ۲۵ سال، ما روابط عمیق با بهترین تولیدکنندگان در سراسر ایران و فراتر ایجاد کرده‌ایم و شهرتی ساخته‌ایم که بر شفافیت، صداقت و تعهد بی‌تزلزل به برتری استوار است."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
