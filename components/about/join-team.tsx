"use client";

import type { Language } from "@/lib/i18n";
import Link from "next/link";
import { Briefcase } from "lucide-react";

interface JoinTeamProps {
  lang: Language;
}

export function JoinTeam({ lang }: JoinTeamProps) {
  const isRTL = lang === "fa";

  return (
    <section
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Accent divider */}
      <div className="flex justify-center mb-12 sm:mb-16 md:mb-20">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-60" />
      </div>

      {/* Top divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-6xl mx-auto px-0 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Left - Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight tracking-tight animate-fade-in-up text-balance">
            {lang === "en" ? "Join our team" : "به تیم ما بپیوندید"}
          </h2>

          {/* Right - Content */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in-up">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
              {lang === "en"
                ? "We believe it takes great people to make a great product. That's why we hire not only perfect professional fits, but people who embody our company values."
                : "ما معتقدیم که برای ساختن یک محصول عالی به افراد عالی نیاز است. به همین دلیل ما نه تنها افراد حرفه‌ای مناسب را استخدام می‌کنیم، بلکه افرادی که ارزش‌های شرکت ما را در خود دارند."}
            </p>

            <Link
              href={`/${lang}/careers`}
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-accent-warm-gold text-primary font-bold rounded-lg hover:shadow-xl hover:shadow-accent-warm-gold/30 transition-all duration-300 hover:scale-105 active:scale-95 group text-sm sm:text-base"
            >
              <Briefcase size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>
                {lang === "en"
                  ? "See All Open Position"
                  : "مشاهده تمام موقعیت‌های شغلی"}
              </span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                {isRTL ? "<" : ">"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
