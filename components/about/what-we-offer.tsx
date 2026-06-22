import type { Language } from "@/lib/i18n";
import Image from "next/image";
import { AnimatedSection } from "./animated-section";

interface WhatWeOfferProps {
  lang: Language;
}

const offerings = {
  en: [
    {
      image: "/what-we-offer/optimized/sourcing-import.webp",
      title: "Sourcing & Import",
      description:
        "Direct supplier coordination for rice, legumes, spices, nuts, seeds, sugar, and other essentials.",
    },
    {
      image: "/what-we-offer/optimized/featured2.webp",
      title: "Quality & Documentation",
      description:
        "Quality checks, hygiene standards, import documentation, and ISO-led operating discipline.",
    },
    {
      image: "/what-we-offer/optimized/quality-documentation.webp",
      title: "Distribution & Access",
      description:
        "Regional offices, branches, and warehouses that support retailers, wholesalers, and institutions.",
    },
  ],
  fa: [
    {
      image: "/what-we-offer/optimized/sourcing-import.webp",
      title: "تأمین و واردات",
      description:
        "هماهنگی مستقیم با تأمین‌کنندگان معتبر برای تأمین برنج، حبوبات، ادویه‌ها، مغزها، دانه‌ها، شکر و سایر اقلام غذایی اساسی.",
    },
    {
      image: "/what-we-offer/optimized/featured2.webp",
      title: "کنترل کیفیت و مستندات",
      description:
        "بررسی کیفیت، رعایت معیارهای بهداشتی، آماده‌سازی اسناد واردات و پیشبرد فرایندها بر پایه نظم عملیاتی و استانداردهای معتبر.",
    },
    {
      image: "/what-we-offer/optimized/quality-documentation.webp",
      title: "توزیع و دسترسی",
      description:
        "دفاتر، شعب و پشتیبانی انبار در منطقه، برای پاسخ‌گویی به نیاز خرده‌فروشان، عمده‌فروشان، سازمان‌ها و خریداران تجاری.",
    },
  ],
};

export function WhatWeOffer({ lang }: WhatWeOfferProps) {
  const offers = lang === "en" ? offerings.en : offerings.fa;

  return (
    <AnimatedSection className="relative py-24 md:py-32 px-4 sm:px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tight font-hero mb-8"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            {lang === "en" ? "What we offer" : "خدمات ما"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {lang === "en"
              ? "Practical food supply services designed for continuity, fair pricing, and dependable quality."
              : "خدماتی کاربردی در تأمین مواد غذایی، با تمرکز بر تداوم عرضه، قیمت‌گذاری منطقی و کیفیت قابل اعتماد."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {offers.map((offer, idx) => {
            const offsetClass =
              idx === 0 ? "lg:mt-0" : idx === 1 ? "lg:mt-12" : "lg:mt-24";
            return (
              <div
                key={idx}
                className={`group ${offsetClass} opacity-0 translate-y-6`}
                data-animate
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-500 border border-border h-full flex flex-col md:hover:border-accent-warm-gold md:hover:shadow-xl">
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-secondary/40 to-secondary/60">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      quality={82}
                      className="object-cover transition-transform duration-700 motion-safe:md:group-hover:scale-110"
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-primary mb-3 transition-colors md:group-hover:text-accent-warm-gold">
                      {offer.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow">
                      {offer.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
