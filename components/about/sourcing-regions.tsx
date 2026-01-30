"use client";

import type { Language } from "@/lib/i18n";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface SourcingRegionsProps {
  lang: Language;
}

const regions = {
  en: [
    {
      name: "Khorasan",
      specialty: "Saffron, Premium Nuts",
      description:
        "High-altitude farming with ideal climate for world's finest saffron cultivation",
    },
    {
      name: "Yazd",
      specialty: "Dates, Dried Fruits",
      description: "Desert oasis with centuries of unmatched date cultivation expertise",
    },
    {
      name: "Rafsanjan",
      specialty: "Pistachios, Tree Nuts",
      description: "World-renowned pistachio region delivering superior quality",
    },
    {
      name: "Various Regions",
      specialty: "Herbs, Spices",
      description: "Diverse network ensuring exceptional product variety and consistency",
    },
  ],
  fa: [
    {
      name: "خراسان",
      specialty: "زعفران، آجیل‌های پرمیوم",
      description:
        "کشاورزی در ارتفاع‌های بالا با آب‌وهوای بی‌نظیر برای کشت زعفران",
    },
    {
      name: "یزد",
      specialty: "خرما، میوه‌های خشک",
      description: "واحه صحرایی با تجربه بی‌نظیر در کشت خرما",
    },
    {
      name: "رفسنجان",
      specialty: "فستق، آجیل‌های درختی",
      description: "منطقه جهان‌شهری فستق با کیفیت برتر",
    },
    {
      name: "منطقه‌های مختلف",
      specialty: "گیاهان، ادویه‌جات",
      description:
        "شبکه متنوع تضمین کننده تنوع و کیفیت استثنایی محصول",
    },
  ],
};

export function SourcingRegions({ lang }: SourcingRegionsProps) {
  const regionList = lang === "en" ? regions.en : regions.fa;
  const isRTL = lang === "fa";
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
    <>
      {/* Values Section with Hero Image */}
      <section className="relative py-0 bg-white overflow-hidden">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch ${isRTL ? "lg:flex-row-reverse" : ""}`}>
          {/* Image Side */}
          <div className={`relative h-96 md:h-screen ${isRTL ? "lg:order-2" : ""}`}>
            <Image
              src="/about-values.jpg"
              alt="Artisanal food craftsmanship"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          </div>

          {/* Content Side */}
          <div className={`relative flex flex-col justify-center py-16 md:py-24 px-8 sm:px-12 md:px-16 bg-white ${isRTL ? "lg:order-1" : ""}`}>
            <div className="max-w-2xl animate-fade-in-up">
              <span className="inline-block px-4 py-2 bg-accent-warm-gold/10 rounded-full text-xs font-semibold text-accent-warm-gold mb-6 uppercase tracking-wider">
                {lang === "en" ? "Our Core Values" : "ارزش‌های اصلی ما"}
              </span>

              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight tracking-tight font-hero" style={{ textAlign: isRTL ? "right" : "left" }}>
                {lang === "en" ? "Built on Trust & Quality" : "بنا بر اعتماد و کیفیت"}
              </h2>

              <div className="divider-premium w-16 h-1 mb-10" style={{ marginLeft: isRTL ? "auto" : "0", marginRight: isRTL ? "0" : "auto" }} />

              <div className="space-y-8">
                {[
                  {
                    title: lang === "en" ? "Artisanal Excellence" : "برتری صنعتی",
                    desc: lang === "en" 
                      ? "We celebrate traditional methods combined with modern standards, preserving heritage while ensuring quality."
                      : "ما روش‌های سنتی را با استانداردهای نوین ترکیب می‌کنیم و میراث را حفظ می‌کنیم.",
                  },
                  {
                    title: lang === "en" ? "Transparent Partnerships" : "شرکات شفاف",
                    desc: lang === "en"
                      ? "Direct relationships with producers, ensuring full traceability and ethical sourcing every step of the way."
                      : "روابط مستقیم با تولیدکنندگان برای پیگیری کامل و منابع اخلاقی.",
                  },
                  {
                    title: lang === "en" ? "Global Standards" : "استانداردهای جهانی",
                    desc: lang === "en"
                      ? "International certifications and rigorous testing ensure products meet the highest quality benchmarks worldwide."
                      : "تصدیق‌های بین‌المللی برای برآورده کردن بالاترین استانداردها.",
                  },
                ].map((value, idx) => (
                  <div key={idx} className="flex gap-4 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="flex-shrink-0 w-1 bg-gradient-to-b from-accent-warm-gold to-transparent rounded-full" />
                    <div>
                      <h3 className="text-lg font-semibold text-primary mb-2">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Regions Section */}
      <section className="relative py-20 md:py-28 px-4 sm:px-6 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-100/5 to-transparent rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-accent-warm-gold/10 rounded-full text-xs font-semibold text-accent-warm-gold mb-4 uppercase tracking-wider">
              {lang === "en" ? "Premium Sourcing" : "تأمین پرمیوم"}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight font-hero">
              {lang === "en" ? "Strategic Sourcing Regions" : "مناطق تأمین استراتژیک"}
            </h2>
            <div className="divider-premium w-16 h-1 mx-auto mb-8" />
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {lang === "en"
                ? "Direct partnerships with Iran's most renowned agricultural regions, ensuring access to the world's finest ingredients"
                : "شرکات مستقیم با معروف‌ترین مناطق کشاورزی ایران برای دسترسی به بهترین مواد اولیه جهان"}
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            ref={containerRef}
          >
            {regionList.map((region, idx) => (
              <div
                key={idx}
                className="card-animate group relative p-8 bg-white rounded-xl border border-gray-200 hover:border-accent-warm-gold hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-warm-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <div className="relative space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-1 group-hover:text-accent-warm-gold transition-colors">
                      {region.name}
                    </h3>
                    <p className="text-sm font-semibold text-accent-warm-gold">
                      {region.specialty}
                    </p>
                  </div>
                  
                  <div className="divider-premium opacity-40" />

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {region.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-warm-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
