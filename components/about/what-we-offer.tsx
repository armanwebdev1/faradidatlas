import type { Language } from "@/lib/i18n";
import Image from "next/image";
import { AnimatedSection } from "./animated-section";

interface WhatWeOfferProps {
  lang: Language;
}

const offerings = {
  en: [
    {
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
      title: "Global Sourcing Network",
      description:
        "Direct partnerships with vetted farms and processors for consistent supply",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
      title: "Quality & Compliance",
      description:
        "Multi-stage QA, lab testing, and export documentation aligned to international standards",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486525891917-3b627cbf3d3c?w=400&q=80",
      title: "Private Label & Packaging",
      description:
        "Flexible MOQs, custom packaging, and brand-ready labeling for retailers",
    },
  ],
  fa: [
    {
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
      title: "شبکه تأمین جهانی",
      description:
        "مشارکت مستقیم با مزارع و فرآوری‌کنندگان ارزیابی‌شده برای تأمین پایدار",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
      title: "کیفیت و انطباق",
      description:
        "کنترل کیفیت چندمرحله‌ای، آزمایش‌های آزمایشگاهی و مستندسازی صادرات مطابق استانداردهای بین‌المللی",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486525891917-3b627cbf3d3c?w=400&q=80",
      title: "برچسب خصوصی و بسته‌بندی",
      description:
        "حداقل سفارش انعطاف‌پذیر، بسته‌بندی سفارشی و لیبل آماده برند برای خرده‌فروشان",
    },
  ],
};

export function WhatWeOffer({ lang }: WhatWeOfferProps) {
  const offers = lang === "en" ? offerings.en : offerings.fa;

  return (
    <AnimatedSection className="relative py-24 md:py-32 px-4 sm:px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tight font-hero mb-8"
            style={{ fontFamily: "var(--font-hero)" }}
          >
            {lang === "en" ? "What we offer" : "چه چیزی ارائه می‌دهیم"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {lang === "en"
              ? "End-to-end B2B food export services designed for reliable growth"
              : "خدمات سرتاسری صادرات غذای B2B که برای رشد قابل‌اعتماد طراحی شده‌اند"}
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
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-border hover:border-accent-warm-gold h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-secondary/40 to-secondary/60">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent-warm-gold transition-colors">
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

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-foreground/10 rounded-lg inline-block">
            {lang === "en" ? "Explore Services" : "خدمات را کاوش کنید"}
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}
