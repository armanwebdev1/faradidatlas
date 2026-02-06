"use client";

import { useEffect, useRef } from "react";
import type { Language } from "@/lib/i18n";

interface ContactHeroProps {
  lang: Language;
}

export function ContactHero({ lang }: ContactHeroProps) {
  const isRTL = lang === "fa";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll(
      ".animate-fade-in-up",
    );
    elements?.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.12}s`;
    });
  }, []);

  const badges = [
    {
      en: "24-48h response",
      fa: "پاسخ ۲۴ تا ۴۸ ساعته",
    },
    {
      en: "WhatsApp available",
      fa: "پشتیبانی واتساپ",
    },
    {
      en: "Tehran & Alborz offices",
      fa: "دفاتر تهران و البرز",
    },
  ];

  return (
    <section
      className="relative w-full overflow-hidden bg-background"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="absolute -top-16 right-[-10%] w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-accent/25 via-white to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-[-5%] w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-secondary/40 via-white to-transparent blur-3xl" />

      <div className="w-full px-4 sm:px-6 pt-16 md:pt-20 pb-12">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
          <div ref={containerRef} className="text-center">
            <p className="mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-accent-warm-gold animate-fade-in-up">
              {lang === "en" ? "Get in Touch" : "تماس بگیرید"}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight font-hero mb-5 animate-fade-in-up">
              {lang === "en"
                ? "Let’s Talk About Your Next Order"
                : "برای سفارش بعدی‌تان با ما گفتگو کنید"}
            </h1>
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
              {lang === "en"
                ? "Have questions about sourcing, certifications, or logistics? Our B2B team is ready to help."
                : "درباره تامین، تاییدیه‌ها یا لجستیک سوال دارید؟ تیم B2B ما آماده راهنمایی است."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 animate-fade-in-up">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm sm:text-base font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {lang === "en" ? "Start an Inquiry" : "شروع درخواست"}
              </a>
              <a
                href="#contact-offices"
                className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-7 py-3 text-sm sm:text-base font-semibold text-foreground transition-all duration-300 hover:border-foreground/40 hover:bg-foreground/5"
              >
                {lang === "en" ? "View Offices" : "مشاهده دفاتر"}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 animate-fade-in-up">
            {badges.map((badge) => (
              <span
                key={badge.en}
                className="rounded-full border border-foreground/10 bg-white/80 px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70 shadow-sm"
              >
                {lang === "en" ? badge.en : badge.fa}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
