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
      <section className="relative min-h-screen w-full overflow-hidden bg-white">
        <div className="relative w-full px-4 sm:px-6 pt-20 pb-16 md:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Content */}
              <div
                ref={containerRef}
                className={`space-y-8 animate-fade-in-up ${
                  isRTL ? "lg:order-2" : ""
                }`}
              >
                <div>
                  <span className="inline-block px-4 py-2 bg-accent-warm-gold/15 rounded-full text-xs font-bold text-accent-warm-gold mb-6 uppercase tracking-widest">
                    {lang === "en" ? "About Faradid" : "درباره فارادید"}
                  </span>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight tracking-tight font-hero mb-6">
                    {lang === "en"
                      ? "We focuses on the development of retail-oriented properties that strategically position retailers and reward investors."
                      : "ما بر توسعه ملک‌های تجاری متمرکز هستیم که استراتژیک‌الانه خرده‌فروشان را قرار می‌دهند و سرمایه‌گذاران را پاداش می‌دهند."}
                  </h1>
                </div>

                <button className="px-8 py-4 bg-accent-warm-gold text-primary font-bold hover:bg-accent-warm-gold/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent-warm-gold/30 rounded-lg inline-block">
                  {lang === "en" ? "Get in Touch" : "تماس بگیرید"}
                </button>
              </div>

              {/* Right Image */}
              <div className={`animate-fade-in-up ${isRTL ? "lg:order-1" : ""}`}>
                <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                    alt="Modern retail property"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get to Know Us Section */}
      <section className="relative py-24 md:py-32 px-4 sm:px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left - Text Content */}
            <div className={`animate-fade-in-up ${isRTL ? "lg:order-2" : ""}`}>
              <h2 className="text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tight font-hero mb-8">
                {lang === "en"
                  ? "Get to know us more"
                  : "بیشتر درباره ما بدانید"}
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {lang === "en"
                  ? "Owned and run by a group of extremely accomplished property experts, we provide property consultancy services for retailers, investors, developers and financial advisors of property and associated assets."
                  : "صاحب و اداره‌شده توسط گروهی از متخصصین ملک بسیار توانمند، ما خدمات مشاوره‌ای املاک را برای خرده‌فروشان، سرمایه‌گذاران، توسعه‌دهندگان و مشاوران مالی ملک و دارایی‌های مرتبط ارائه می‌دهیم."}
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {lang === "en"
                  ? "Headquartered in Pakistan and having presence in 14+ countries, we serve a diverse range of institutional and private clients. We execute our duties with utmost honesty and integrity in all matters."
                  : "مستقر در پاکستان و حضور در ۱۴+ کشور، ما طیف متنوعی از کلاینت‌های نهادی و خصوصی را خدمت می‌رسانیم. ما وظایف خود را با راستی و صداقت کامل در تمام مسائل انجام می‌دهیم."}
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                {lang === "en"
                  ? "We are one of the most rapidly growing internationally styled professional and consultancy practices within South Asia and GCC region with an ever-growing team of respected property and financial professionals."
                  : "ما یکی از سریع‌ترین رشد‌کننده‌های بین‌المللی در منطقه جنوب آسیا و خلیج فارس هستیم با تیمی رو به رشد از متخصصان ملک و مالی معتبر."}
              </p>
            </div>

            {/* Right - Team Member Card & Stats */}
            <div
              className={`space-y-8 animate-fade-in-up ${
                isRTL ? "lg:order-1" : ""
              }`}
            >
              {/* Team Member Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
                <div className="flex gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&q=80"
                      alt="Team member"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg">
                      {lang === "en" ? "Founder & CEO" : "بنیانگذار و مدیرعامل"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lang === "en"
                        ? "25+ Years in Property"
                        : "۲۵+ سال تجربه"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {lang === "en"
                    ? '"Our goal is to provide house for the people who live in tight budget could to places. We tries to cut off that travel expenses and increase the budget."'
                    : '"هدف ما فراهم کردن خانه برای افرادی است که تو بودجه محدود می‌توانند به جاهای مختلف رفتند. ما سعی می‌کنیم هزینه‌های سفر را کاهش دهیم و بودجه را افزایش دهیم."'}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-accent-warm-gold mb-2">
                    8.93%
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    {lang === "en"
                      ? "Growth Rate"
                      : "نرخ رشد"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-accent-warm-gold mb-2">
                    12.6K
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    {lang === "en"
                      ? "Happy Clients"
                      : "مشتریان راضی"}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-accent-warm-gold mb-2">
                    16+
                  </p>
                  <p className="text-xs md:text-sm text-gray-600">
                    {lang === "en"
                      ? "Countries"
                      : "کشورها"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
