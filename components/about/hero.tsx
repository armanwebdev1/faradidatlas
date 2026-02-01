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
      <section className="relative w-full overflow-hidden bg-white">
        <div className="w-full px-4 sm:px-6 pt-16 md:pt-20 pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Centered Headline and CTA */}
            <div ref={containerRef} className="text-center mb-16 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight font-hero mb-8 max-w-4xl mx-auto">
                {lang === "en"
                  ? "We focuses on the development of retail-oriented properties that strategically position retailers and reward investors."
                  : "ما بر توسعه ملک‌های تجاری متمرکز هستیم که استراتژیک‌الانه خرده‌فروشان را قرار می‌دهند و سرمایه‌گذاران را پاداش می‌دهند."}
              </h1>
              <button className="px-8 py-4 bg-accent-warm-gold text-primary font-bold hover:bg-accent-warm-gold/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent-warm-gold/30 rounded-lg inline-block">
                {lang === "en" ? "Learn More" : "بیشتر بدانید"}
              </button>
            </div>

            {/* Full-Width Image */}
            <div className="animate-fade-in-up mb-20">
              <div className="relative w-full h-64 md:h-96 lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                  alt="Modern retail property architecture"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Get to Know Us Section */}
            <div className="space-y-12">
              {/* Heading and Two-Column Text */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <div className="animate-fade-in-up">
                  <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight tracking-tight font-hero mb-6">
                    {lang === "en"
                      ? "Get to know us more"
                      : "بیشتر درباره ما بدانید"}
                  </h2>
                </div>

                <div className="animate-fade-in-up">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                    {lang === "en"
                      ? "Owned and run by a group of extremely accomplished property experts, we provide property consultancy services for retailers, investors, developers and financial advisors of property and associated assets."
                      : "صاحب و اداره‌شده توسط گروهی از متخصصین ملک بسیار توانمند، ما خدمات مشاوره‌ای املاک را برای خرده‌فروشان، سرمایه‌گذاران، توسعه‌دهندگان و مشاوران مالی ملک و دارایی‌های مرتبط ارائه می‌دهیم."}
                  </p>

                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    {lang === "en"
                      ? "Headquartered in Pakistan and having presence in 14+ countries, we serve a diverse range of institutional and private clients. We execute our duties with utmost honesty and integrity in all matters."
                      : "مستقر در پاکستان و حضور در ۱۴+ کشور، ما طیف متنوعی از کلاینت‌های نهادی و خصوصی را خدمت می‌رسانیم. ما وظایف خود را با راستی و صداقت کامل در تمام مسائل انجام می‌دهیم."}
                  </p>
                </div>
              </div>

              {/* Founder Card and Stats Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Founder Card */}
                <div className="animate-fade-in-up bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
                  <div className="flex gap-4 mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&q=80"
                        alt="Team member"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary text-base">
                        {lang === "en" ? "Founder & CEO" : "بنیانگذار و مدیرعامل"}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        {lang === "en"
                          ? "David Redkoff"
                          : "دیوید ردکف"}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {lang === "en"
                      ? '"Our goal is to provide house for the people who are in a tight budget could to places. We tries to cut off that travel expenses and motivate them to increase the budget."'
                      : '"هدف ما فراهم کردن خانه برای افرادی است که تو بودجه محدود می‌توانند به جاهای مختلف رفتند. ما سعی می‌کنیم هزینه‌های سفر را کاهش دهیم و بودجه را افزایش دهیم."'}
                  </p>
                </div>

                {/* Stats Row */}
                <div className="animate-fade-in-up">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
                        8.93%
                      </p>
                      <p className="text-xs text-gray-600">
                        {lang === "en"
                          ? "Profit return rate"
                          : "نرخ بازده سود"}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
                        12.6K
                      </p>
                      <p className="text-xs text-gray-600">
                        {lang === "en"
                          ? "Listed property"
                          : "ملک موجود"}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
                        16+
                      </p>
                      <p className="text-xs text-gray-600">
                        {lang === "en"
                          ? "Operational area"
                          : "منطقه فعالیت"}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
                        12+
                      </p>
                      <p className="text-xs text-gray-600">
                        {lang === "en"
                          ? "Awards won"
                          : "جوایز کسب شده"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
