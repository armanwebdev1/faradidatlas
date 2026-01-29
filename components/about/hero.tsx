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
      {/* Premium Image Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-neutral-950">
        <div className="absolute inset-0">
          <Image
            src="/about-hero-bg.jpg"
            alt="Premium food products"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        <div
          className="relative h-full w-full flex flex-col justify-end"
          ref={containerRef}
        >
          <div
            className={`max-w-5xl px-8 sm:px-12 md:px-16 lg:pl-32 lg:pr-8 pb-20 md:pb-28 ${isRTL ? "text-right" : "text-left"}`}
          >
            <div className="animate-fade-in-up">
              <span className="inline-block px-4 py-2 bg-accent-warm-gold/20 backdrop-blur-sm rounded-full text-sm font-semibold text-accent-warm-gold mb-6 border border-accent-warm-gold/30">
                {lang === "en" ? "Since 1998" : "از سال ۱۳۷۷"}
              </span>
              <h1
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight font-hero"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-hero)"
                      : "Estedad, var(--font-hero)",
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {lang === "en" ? "Faradi Atlas" : "فارادی اطلس"}
              </h1>
              <p
                className="text-lg md:text-2xl text-white/90 max-w-2xl leading-relaxed font-light"
                style={{
                  fontFamily:
                    lang === "en"
                      ? "var(--font-body)"
                      : "Shabnam, var(--font-body)",
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                {lang === "en"
                  ? "Pioneering Excellence in Global Food Trading"
                  : "پیشگام برتری در تجارت جهانی غذایی"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section with Image and Text */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-100/10 to-transparent rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isRTL ? "lg:flex-row-reverse" : ""}`}
          >
            {/* Image */}
            <div className={`animate-fade-in-up ${isRTL ? "lg:order-2" : ""}`}>
              <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/about-story.jpg"
                  alt="Iranian agricultural heritage"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Text Content */}
            <div
              className={`space-y-8 animate-fade-in-up ${isRTL ? "lg:order-1" : ""}`}
            >
              <div>
                <h2
                  className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight font-hero"
                  style={{ textAlign: isRTL ? "right" : "left" }}
                >
                  {lang === "en" ? "Our Legacy" : "میراث ما"}
                </h2>
                <div
                  className="divider-premium w-16 h-1 mb-8"
                  style={{
                    marginLeft: isRTL ? "auto" : "0",
                    marginRight: isRTL ? "0" : "auto",
                  }}
                />
              </div>

              <div className="space-y-6">
                <p
                  className="text-lg text-gray-700 leading-relaxed font-light"
                  style={{ textAlign: isRTL ? "right" : "left" }}
                >
                  {lang === "en"
                    ? "Founded in 1998 with a simple yet powerful vision: the world's finest food products deserve trustworthy partners who understand quality, heritage, and responsibility."
                    : "تأسیس‌شده در سال ۱۳۷۷ با یک دیدگاه ساده اما قدرتمند: بهترین محصولات غذایی جهان شایسته شرکایی هستند که کیفیت، میراث و مسئولیت را درک کنند."}
                </p>

                <p
                  className="text-lg text-gray-700 leading-relaxed font-light"
                  style={{ textAlign: isRTL ? "right" : "left" }}
                >
                  {lang === "en"
                    ? "For over 25 years, we've cultivated deep relationships with the finest producers across Iran and beyond, building a reputation built on transparency, integrity, and an unwavering commitment to excellence."
                    : "برای بیش از ۲۵ سال، ما روابط عمیق با بهترین تولیدکنندگان در سراسر ایران و فراتر ایجاد کرده‌ایم و شهرتی ساخته‌ایم که بر شفافیت، صداقت و تعهد بی‌تزلزل به برتری استوار است."}
                </p>

                <div className="pt-4">
                  <div className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors">
                    {lang === "en" ? "Learn More" : "بیشتر بخوانید"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Premium Grid */}
      <section className="relative py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-100/10 to-transparent rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                number: "25+",
                label: lang === "en" ? "Years of Excellence" : "سال برتری",
                description:
                  lang === "en"
                    ? "Trusted partnerships since 1998"
                    : "شرکای قابل اعتماد از سال ۱۳۷۷",
              },
              {
                number: "40+",
                label: lang === "en" ? "Countries Served" : "کشور سرویس‌شده",
                description:
                  lang === "en"
                    ? "Global reach with local expertise"
                    : "دسترسی جهانی با تخصص محلی",
              },
              {
                number: "100%",
                label: lang === "en" ? "Quality Commitment" : "تعهد کیفیت",
                description:
                  lang === "en"
                    ? "Zero compromise on standards"
                    : "بدون سازش در استانداردها",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group text-center animate-fade-in-up p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-500 cursor-pointer"
              >
                <div className="text-5xl md:text-6xl font-bold text-accent-warm-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
