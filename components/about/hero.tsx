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
      <div className="w-full px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto space-y-14 sm:space-y-16 md:space-y-20">
          {/* Headline */}
          <div ref={containerRef} className="text-center animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight font-hero mb-6 sm:mb-8 max-w-4xl mx-auto text-balance">
              {lang === "en"
                ? "We focuses on the development of retail-oriented properties that strategically position retailers and reward investors."
                : "ما بر توسعه ملک‌های تجاری متمرکز هستیم که استراتژیک‌الانه خرده‌فروشان را قرار می‌دهند و سرمایه‌گذاران را پاداش می‌دهند."}
            </h1>
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-accent-warm-gold text-primary font-bold rounded-lg hover:shadow-xl hover:shadow-accent-warm-gold/30 transition-all duration-300 hover:scale-105 active:scale-95">
              {lang === "en" ? "Contact Us" : "تماس با ما"}
            </button>
          </div>

          {/* Image */}
          <div className="animate-fade-in-up">
            <div className="relative w-full h-52 sm:h-64 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                alt="Retail property"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Accent divider */}
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-60" />
          </div>

          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-hero text-primary animate-fade-in-up text-balance">
              {lang === "en" ? "Get to know us more" : "بیشتر درباره ما بدانید"}
            </h2>

            <div className="space-y-4 sm:space-y-6 animate-fade-in-up">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 leading-relaxed">
                {lang === "en"
                  ? "Owned and run by a group of commercial property experts, we provide property consultancy services for owners, occupiers, investors, developers and financial advisors of property and associated assets."
                  : "صاحب و اداره‌شده توسط گروهی از متخصصان املاک تجاری، ما خدمات مشاوره املاک را برای مالکان، بهره‌برداران، سرمایه‌گذاران، توسعه‌دهندگان و مشاوران مالی ارائه می‌دهیم."}
              </p>

              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                {lang === "en"
                  ? "Operating from offices in Birmingham, Bristol, Exeter, Leeds, London, Manchester, Newcastle, Teesside and York we combine our knowledge and skills to provide complete property advice, ultimately making you and your business more successful. The property industry continues to transform through influences in technology, culture and economy and we are excited to be a part of the journey, making an impact where we can, and adapting where needed."
                  : "ما با فعالیت از دفاتر خود در شهرهای مختلف، دانش و مهارت‌های خود را برای ارائه مشاوره جامع ملکی ترکیب می‌کنیم و به موفقیت بیشتر شما و کسب‌وکارتان کمک می‌کنیم."}
              </p>
            </div>
          </div>

          {/* Accent divider */}
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-60" />
          </div>

          {/* Founder */}
          <div className="animate-fade-in-up grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
            {/* CEO */}
            <div className="flex gap-4 items-center group hover:scale-105 transition-transform duration-300">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80"
                  alt="CEO"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs sm:text-xs font-semibold text-primary uppercase tracking-widest">
                  {lang === "en" ? "Founder & CEO" : "بنیانگذار و مدیرعامل"}
                </p>
                <p className="text-sm sm:text-base text-gray-600 font-medium">
                  {lang === "en" ? "Daniel Redcliff" : "دنیل ردکلیف"}
                </p>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold text-primary leading-snug sm:leading-tight border-l-4 sm:border-l-4 border-accent-warm-gold pl-4 sm:pl-6 py-2 hover:border-accent-warm-gold/70 transition-all duration-300">
              {lang === "en"
                ? ""Our goal is to provide house for the people who are in a tight budget could not afford to check houses from places to places. We tries to cut off that travel expenses and motivate them to increase the budget.""
                : "«هدف ما فراهم کردن خانه برای افرادی است که بودجه محدودی دارند و نمی‌توانند برای بازدید از خانه‌ها سفر کنند.»"}
            </blockquote>
          </div>

          {/* Accent divider */}
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-60" />
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
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
              className="space-y-6 animate-fade-in-up"
              style={{
                unicodeBidi: "plaintext",
                direction: "ltr",
                textAlign: "left",
              }}
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
    <div className="group p-4 sm:p-6 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md">
      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary group-hover:text-accent-warm-gold transition-colors duration-300">
        {value}
      </p>
      <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium uppercase tracking-wide">
        {lang === "en" ? labelEn : labelFa}
      </p>
    </div>
  );
}
