"use client";

import type { Language } from "@/lib/i18n";
import Image from "next/image";

interface WhatWeOfferProps {
  lang: Language;
}

const offerings = {
  en: [
    {
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
      title: "A leading RPS Property Traders",
      description:
        "Expert property trading solutions tailored for modern markets",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
      title: "An approx-estate alternative of the market",
      description: "Comprehensive market analysis and pricing strategies",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486525891917-3b627cbf3d3c?w=400&q=80",
      title: "Provide different reality of property",
      description: "Transparent insights into the property market dynamics",
    },
  ],
  fa: [
    {
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
      title: "یک تاجر ملک RPS پیشرو",
      description: "راه‌حل‌های تجارت ملک متخصص برای بازارهای مدرن",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
      title: "جایگزین تقریبی بازار",
      description: "تجزیه و تحلیل جامع بازار و استراتژی‌های قیمت‌گذاری",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486525891917-3b627cbf3d3c?w=400&q=80",
      title: "بواقع‌گرایی مختلف ملک",
      description: "بینش شفاف در دینامیک بازار ملک",
    },
  ],
};

export function WhatWeOffer({ lang }: WhatWeOfferProps) {
  const offers = lang === "en" ? offerings.en : offerings.fa;
  const isRTL = lang === "fa";

  return (
    <section
      className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Accent divider */}
        <div className="flex justify-center mb-12 sm:mb-16 md:mb-20">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-60" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight font-hero mb-4 sm:mb-6 text-balance">
            {lang === "en" ? "What we offer" : "چه چیزی ارائه می‌دهیم"}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {lang === "en"
              ? "Comprehensive property solutions designed for success"
              : "راه‌حل‌های ملکی جامع برای موفقیت"}
          </p>
        </div>

        {/* Offerings Grid - Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {offers.map((offer, idx) => {
            // Staggered offset: leftmost (idx=0) highest, rightmost (idx=2) lowest
            const offsetClass =
              idx === 0 ? "lg:mt-0" : idx === 1 ? "lg:mt-8 md:mt-4" : "lg:mt-16 md:mt-8";
            return (
              <div
                key={idx}
                className={`group animate-fade-in-up ${offsetClass}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-accent-warm-gold h-full flex flex-col hover:scale-105 hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3 group-hover:text-accent-warm-gold transition-colors duration-300">
                      {offer.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed flex-grow">
                      {offer.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Accent divider */}
        <div className="flex justify-center mt-12 sm:mt-16 md:mt-20">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-60" />
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20 animate-fade-in-up">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-accent-warm-gold text-primary font-bold hover:bg-accent-warm-gold/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent-warm-gold/30 rounded-lg hover:scale-105 active:scale-95 text-sm sm:text-base">
            {lang === "en" ? "Explore Services" : "خدمات را کاوش کنید"}
          </button>
        </div>
      </div>
    </section>
  );
}
