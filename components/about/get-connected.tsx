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
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Image - Full Width */}
        <div className="animate-fade-in-up">
          <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1486525891917-3b627cbf3d3c?w=1200&q=80"
              alt="Building showcase"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Bottom Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Heading */}
          <div 
            className="flex flex-col justify-start"
            dir="ltr"
            style={{
              direction: "ltr",
              textAlign: "left",
              unicodeBidi: "plaintext"
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight tracking-tight font-hero text-left">
              {lang === "en"
                ? "Read our story to get connected"
                : "داستان ما را بخوانید تا متصل شوید"}
            </h2>
          </div>

          {/* Right - Text Content */}
          <div
            className="space-y-4 animate-fade-in-up"
            dir="ltr"
            style={{
              direction: "ltr",
              textAlign: "left",
              unicodeBidi: "plaintext"
            }}
          >
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {lang === "en"
                ? "Owned and run by a group of commercial property experts, we provide property consultancy services for retailers, investors, developers and financial advisors of property and associated assets."
                : "صاحب و اداره‌شده توسط گروهی از متخصصین ملک تجاری، ما خدمات مشاوره‌ای املاک را برای خرده‌فروشان، سرمایه‌گذاران، توسعه‌دهندگان و مشاوران مالی ملک ارائه می‌دهیم."}
            </p>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {lang === "en"
                ? "Operating from offices in Birmingham, Bristol, Exeter, Leeds, London, Manchester, Newcastle, Teesside and York we combine our knowledge and business more successful. The property industry continues to transform through influences in technology, culture and economy and we're excited to be a part of the journey, making an impact where we can, and adapting when we need to."
                : "بر اساس تجربه ما، تحقیقات گسترده و استفاده از ابزارهای پیشرفته و فن‌آوری‌های جدید، ما به مشتریان خود توصیه‌های جامع و بدون طرفداری ارائه می‌دهیم."}
            </p>

            {/* Quote Section */}
            <div className="border-l-4 border-blue-500 pl-6 py-4 bg-gray-50">
              <p className="text-base italic text-gray-700 leading-relaxed">
                {lang === "en"
                  ? "Some 14 years later, their businesses had survived through the worst, experienced international success and acquired several other businesses, and in 2007 the two emerged to become the name we are today."
                  : "چهارده سال بعد، کسب‌وکارهای آنها از بدترین شرایط سالم بیرون آمدند، موفقیت بین‌المللی را تجربه کردند و چندین کسب‌وکار دیگر را کسب کردند."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
