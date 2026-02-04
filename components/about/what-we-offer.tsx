"use client";

import type { Language } from "@/lib/i18n";
import { useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("animate-fade-in-up");
          el.classList.remove("opacity-0", "translate-y-6");
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 },
    );

    elements?.forEach((el, index) => {
      const element = el as HTMLElement;
      if (!element.style.animationDelay) {
        element.style.animationDelay = `${index * 0.12}s`;
      }
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 px-4 sm:px-6 bg-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className="text-center mb-16 opacity-0 translate-y-6"
          data-animate
        >
          <h2 className="text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tight font-hero mb-8">
            {lang === "en" ? "What we offer" : "چه چیزی ارائه می‌دهیم"}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {lang === "en"
              ? "Comprehensive property solutions designed for success"
              : "راه‌حل‌های ملکی جامع برای موفقیت"}
          </p>
        </div>

        {/* Offerings Grid - Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {offers.map((offer, idx) => {
            // Staggered offset: leftmost (idx=0) highest, rightmost (idx=2) lowest
            const offsetClass =
              idx === 0 ? "lg:mt-0" : idx === 1 ? "lg:mt-12" : "lg:mt-24";
            return (
              <div
                key={idx}
                className={`group ${offsetClass} opacity-0 translate-y-6`}
                data-animate
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200 hover:border-accent-warm-gold h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent-warm-gold transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-grow">
                      {offer.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div
          className="text-center mt-16 opacity-0 translate-y-6"
          data-animate
        >
          <button className="px-8 py-4 bg-accent-warm-gold text-primary font-bold hover:bg-accent-warm-gold/90 transition-all duration-300 hover:shadow-xl hover:shadow-accent-warm-gold/30 rounded-lg inline-block">
            {lang === "en" ? "Explore Services" : "خدمات را کاوش کنید"}
          </button>
        </div>
      </div>
    </section>
  );
}
