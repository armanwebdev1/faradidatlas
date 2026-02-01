"use client";

import type { Language } from "@/lib/i18n";
import Image from "next/image";

interface GetConnectedProps {
  lang: Language;
}

export function GetConnected({ lang }: GetConnectedProps) {
  const isRTL = lang === "fa";

  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Images Grid */}
          <div className={`animate-fade-in-up ${isRTL ? "lg:order-2" : ""}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80"
                  alt="Property showcase 1"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1486525891917-3b627cbf3d3c?w=400&q=80"
                  alt="Property showcase 2"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80"
                  alt="Property showcase 3"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400&q=80"
                  alt="Property showcase 4"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Right - Text Content */}
          <div
            className={`space-y-8 animate-fade-in-up ${
              isRTL ? "lg:order-1" : ""
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tight font-hero">
              {lang === "en"
                ? "Read our story to get connected"
                : "داستان ما را بخوانید تا متصل شوید"}
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              {lang === "en"
                ? "Owned and run by a group of extremely accomplished property experts, we provide property consultancy services for retailers, investors, developers and financial advisors of property and associated assets."
                : "صاحب و اداره‌شده توسط گروهی از متخصصین ملک بسیار توانمند، ما خدمات مشاوره‌ای املاک را برای خرده‌فروشان، سرمایه‌گذاران، توسعه‌دهندگان و مشاوران مالی ملک ارائه می‌دهیم."}
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              {lang === "en"
                ? "Based on our exposure & experience, extensive research and use of the sophisticated tools & latest technologies & practices, we provide our clients with comprehensive, objective and unbiased recommendations on key areas of property development."
                : "براساس تجربه ما، تحقیقات گسترده و استفاده از ابزارهای پیشرفته و فن‌آوری‌های جدید، ما به مشتریان خود توصیه‌های جامع و بدون طرفداری ارائه می‌دهیم."}
            </p>

            <button className="px-8 py-4 bg-accent-warm-gold text-primary font-bold hover:bg-accent-warm-gold/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent-warm-gold/30 rounded-lg inline-block">
              {lang === "en" ? "Connect With Us" : "با ما متصل شوید"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
