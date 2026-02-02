"use client";

import type { Language } from "@/lib/i18n";
import Link from "next/link";

interface JoinTeamProps {
  lang: Language;
}

export function JoinTeam({ lang }: JoinTeamProps) {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 bg-white overflow-hidden">
      {/* Top divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-200" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left - Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
            {lang === "en" ? "Join our team" : "به تیم ما بپیوندید"}
          </h2>

          {/* Right - Content */}
          <div
            dir="ltr"
            className="text-left"
            style={{ direction: "ltr", textAlign: "left" }}
          >
            <p
              className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 text-left"
              style={{ direction: "ltr", textAlign: "left" }}
            >
              {lang === "en"
                ? "We believe it takes great people to make a great product. That's why we hire not only perfect professional fits, but people who embody our company values."
                : "ما معتقدیم که برای ساختن یک محصول عالی به افراد عالی نیاز است. به همین دلیل ما نه تنها افراد حرفه‌ای مناسب را استخدام می‌کنیم، بلکه افرادی که ارزش‌های شرکت ما را در خود دارند."}
            </p>

            <Link
              href={`/${lang}/careers`}
              className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors text-left"
              style={{ direction: "ltr", textAlign: "left" }}
            >
              {lang === "en"
                ? "See All Open Position"
                : "مشاهده تمام موقعیت‌های شغلی"}
              <span className="ml-1">&gt;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
