"use client";

import type { Language } from "@/lib/i18n";
import { useEffect, useRef } from "react";

interface SourcingRegionsProps {
  lang: Language;
}

const regions = {
  en: [
    {
      name: "Khorasan",
      specialty: "Saffron, Premium Nuts",
      description:
        "High-altitude farming with ideal climate for saffron cultivation",
      icon: "🏔️",
    },
    {
      name: "Yazd",
      specialty: "Dates, Dried Fruits",
      description: "Desert oasis with centuries of date cultivation expertise",
      icon: "🏜️",
    },
    {
      name: "Rafsanjan",
      specialty: "Pistachios, Tree Nuts",
      description: "World-renowned pistachio region with superior quality",
      icon: "🌳",
    },
    {
      name: "Various Regions",
      specialty: "Herbs, Spices",
      description: "Diverse producers ensuring product variety and consistency",
      icon: "🌿",
    },
  ],
  fa: [
    {
      name: "خراسان",
      specialty: "زعفران، آجیل‌های پرمیوم",
      description:
        "کشاورزی در ارتفاع‌های بالا با آب‌وهوای مناسب برای کشت زعفران",
      icon: "🏔️",
    },
    {
      name: "یزد",
      specialty: "خرما، میوه‌های خشک",
      description: "واحه صحرایی با تجربه چند قرنی در کشت خرما",
      icon: "🏜️",
    },
    {
      name: "رفسنجان",
      specialty: "فستق، آجیل‌های درختی",
      description: "منطقه جهان‌شهری فستق با کیفیت برتر",
      icon: "🌳",
    },
    {
      name: "منطقه‌های مختلف",
      specialty: "گیاهان، ادویه‌جات",
      description:
        "تولیدکنندگان متنوع که تنوع و پایداری محصول را تضمین می‌کنند",
      icon: "🌿",
    },
  ],
};

export function SourcingRegions({ lang }: SourcingRegionsProps) {
  const regionList = lang === "en" ? regions.en : regions.fa;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll(".card-animate");

    elements?.forEach((el, index) => {
      const element = el as HTMLElement;
      element.style.animationDelay = `${index * 0.1}s`;
      element.classList.add("animate-fade-in-up");
    });
  }, []);

  return (
    <section className="relative space-responsive px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative gradient - responsive sizing */}
      <div className="absolute top-10 sm:top-20 right-0 sm:right-10 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl -z-10" />

      <div className="container-wide">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-responsive-title text-primary mb-4 sm:mb-6 tracking-tight">
            {lang === "en" ? "Sourcing Regions" : "مناطق تأمین"}
          </h2>
          <div className="divider-premium w-16 sm:w-20 md:w-24 h-1 mx-auto mb-6 sm:mb-8" />
          <p className="text-responsive-body text-gray-700 max-w-3xl mx-auto">
            {lang === "en"
              ? "Direct partnerships with premium producers in Iran's most renowned agricultural regions"
              : "مشارکت‌های مستقیم با تولیدکنندگان برتر در معروف‌ترین مناطق کشاورزی ایران"}
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          ref={containerRef}
        >
          {regionList.map((region, idx) => (
            <div
              key={idx}
              className="card-animate group relative p-5 sm:p-6 md:p-8 bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                {region.icon}
              </div>

              <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary mb-1 sm:mb-2">
                {region.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-amber-700 mb-2 sm:mb-3">
                {region.specialty}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {region.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
