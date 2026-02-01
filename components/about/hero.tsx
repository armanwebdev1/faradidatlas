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
    <section
      className="relative w-full overflow-hidden bg-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full px-4 sm:px-6 pt-16 md:pt-20 pb-16">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Headline */}
          <div ref={containerRef} className="text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight font-hero mb-8 max-w-4xl mx-auto">
              {lang === "en"
                ? "We focuses on the development of retail-oriented properties that strategically position retailers and reward investors."
                : "ما بر توسعه ملک‌های تجاری متمرکز هستیم که استراتژیک‌الانه خرده‌فروشان را قرار می‌دهند و سرمایه‌گذاران را پاداش می‌دهند."}
            </h1>
            <button className="px-8 py-4 bg-accent-warm-gold text-primary font-bold rounded-lg hover:shadow-xl transition">
              {lang === "en" ? "Contact Us" : "تماس با ما"}
            </button>
          </div>

          {/* Image */}
          <div className="animate-fade-in-up">
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                alt="Retail property"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <h2 className="text-4xl md:text-5xl font-bold font-hero max-w-2/3 text-primary animate-fade-in-up">
              {lang === "en" ? "Get to know us more" : "بیشتر درباره ما بدانید"}
            </h2>

            {/* FORCE LTR FOR ENGLISH */}
            <div
              dir="ltr"
              className="space-y-6 animate-fade-in-up text-left"
              style={{ unicodeBidi: "plaintext" }}
            >
              <p className="text-base md:text-lg font-semibold text-gray-900 leading-relaxed max-w-xl">
                {lang === "en"
                  ? "Owned and run by a group of commercial property experts, we provide property consultancy services for owners, occupiers, investors, developers and financial advisors of property and associated assets."
                  : "صاحب و اداره‌شده توسط گروهی از متخصصان املاک تجاری، ما خدمات مشاوره املاک را برای مالکان، بهره‌برداران، سرمایه‌گذاران، توسعه‌دهندگان و مشاوران مالی ارائه می‌دهیم."}
              </p>

              <p className="text-sm md:text-base text-gray-700 leading-relaxed max-w-xl">
                {lang === "en"
                  ? "Operating from offices in Birmingham, Bristol, Exeter, Leeds, London, Manchester, Newcastle, Teesside and York we combine our knowledge and skills to provide complete property advice, ultimately making you and your business more successful. The property industry continues to transform through influences in technology, culture and economy and we are excited to be a part of the journey, making an impact where we can, and adapting where needed."
                  : "ما با فعالیت از دفاتر خود در شهرهای مختلف، دانش و مهارت‌های خود را برای ارائه مشاوره جامع ملکی ترکیب می‌کنیم و به موفقیت بیشتر شما و کسب‌وکارتان کمک می‌کنیم."}
              </p>
            </div>
          </div>

          {/* Founder */}
          <div className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* CEO */}
            <div className="flex gap-4 items-center">
              <div className="relative w-14 h-14 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80"
                  alt="CEO"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {lang === "en" ? "Founder & CEO" : "بنیانگذار و مدیرعامل"}
                </p>
                <p className="text-sm text-gray-600">
                  {lang === "en" ? "Daniel Redcliff" : "دنیل ردکلیف"}
                </p>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl font-bold text-primary leading-tight max-w-xl">
              {lang === "en"
                ? "“Our goal is to provide house for the people who are in a tight budget could not afford to check houses from places to places. We tries to cut off that travel expenses and motivate them to increase the budget.”"
                : "«هدف ما فراهم کردن خانه برای افرادی است که بودجه محدودی دارند و نمی‌توانند برای بازدید از خانه‌ها سفر کنند.»"}
            </blockquote>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <Stat
              value="8.93%"
              labelEn="Profit return rate"
              labelFa="نرخ بازده سود"
              lang={lang}
            />
            <Stat
              value="12.6K"
              labelEn="Listed property"
              labelFa="ملک موجود"
              lang={lang}
            />
            <Stat
              value="16+"
              labelEn="Operational area"
              labelFa="منطقه فعالیت"
              lang={lang}
            />
            <Stat
              value="12+"
              labelEn="Awards won"
              labelFa="جوایز کسب شده"
              lang={lang}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  labelEn,
  labelFa,
  lang,
}: {
  value: string;
  labelEn: string;
  labelFa: string;
  lang: Language;
}) {
  return (
    <div>
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="text-xs text-gray-600">
        {lang === "en" ? labelEn : labelFa}
      </p>
    </div>
  );
}
