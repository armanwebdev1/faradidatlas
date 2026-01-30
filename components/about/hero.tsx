"use client";

import type { Language } from "@/lib/i18n";
import { useEffect, useRef } from "react";

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
    <section className="relative py-32 px-6 bg-gradient-to-b from-white via-white to-gray-50 overflow-hidden">
      {/* Background elements for depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-amber-100/30 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-gray-100/30 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto" ref={containerRef}>
        <div className="mb-16 animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-amber-100/50 rounded-full text-sm font-semibold text-primary mb-6 border border-amber-200/50">
            {lang === "en" ? "Our Journey" : "مسیر ما"}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 leading-tight tracking-tight">
            {lang === "en" ? "Our Story" : "داستان ما"}
          </h1>
        </div>

        <div className="divider-premium mb-16" />

        <div className="space-y-8">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in-up font-light">
            {lang === "en"
              ? "Founded in 1998, Faradi Atlas emerged from a simple belief: the world's finest food products deserve trustworthy partners. For over 25 years, we've built relationships with top producers across Iran and beyond, ensuring only the best reaches your table."
              : "تأسیس‌ شده در سال ۱۳۷۷، فارادی اطلس از یک باور ساده نشأت گرفت: بهترین محصولات غذایی جهان شایسته شرکای قابل‌اعتماد هستند. در طول ۲۵ سال، ما روابط قوی با تولیدکنندگان برتر در سراسر ایران و فراتر از آن ایجاد کرده‌ایم."}
          </p>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in-up font-light">
            {lang === "en"
              ? "Today, we serve importers and retailers in 40+ countries, maintaining the same commitment to quality, transparency, and ethical sourcing that defines our identity. Every product that leaves our hands carries our promise of excellence."
              : "امروز، ما خدمات رسانی به واردکنندگان و فروشندگان در بیش از ۴۰ کشور را ادامه می‌دهیم و همان تعهد به کیفیت، شفافیت و منابع اخلاقی را حفظ می‌کنیم. هر محصولی که از دستان ما خارج می‌شود، حامل وعده ما برای تعالی است."}
          </p>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-gray-200/50">
          {[
            {
              number: "25+",
              label: lang === "en" ? "Years of Excellence" : "سال تجربه",
            },
            {
              number: "40+",
              label: lang === "en" ? "Countries Served" : "کشور سرویس شده",
            },
            {
              number: "100%",
              label: lang === "en" ? "Quality Commitment" : "تعهد کیفیت",
            },
          ].map((stat, idx) => (
            <div key={idx} className="text-center animate-fade-in-up">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3">
                {stat.number}
              </div>
              <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
