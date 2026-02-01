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
      title: "A leading SME property finding industry",
      description:
        "Get the latest update on the current property market and value your asset with it.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
      title: "An approachable alternative in the market",
      description:
        "Our strategy is simple: attract the customer with the right price and authenticity.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
      title: "Provide different verity of properties",
      description:
        "Our verity is beyond anyone's thinking. Check out our property listing to get an idea.",
    },
  ],
  fa: [
    {
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
      title: "یک صنعت پیشرو در یافتن املاک SME",
      description:
        "آخرین به‌روزرسانی‌ها درباره بازار فعلی املاک را دریافت کنید و دارایی خود را ارزیابی کنید.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
      title: "جایگزینی قابل دسترس در بازار",
      description:
        "استراتژی ما ساده است: جذب مشتری با قیمت مناسب و اصالت.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
      title: "ارائه تنوع مختلف از املاک",
      description:
        "تنوع ما فراتر از تصور هر کسی است. لیست املاک ما را بررسی کنید.",
    },
  ],
};

export function WhatWeOffer({ lang }: WhatWeOfferProps) {
  const offers = lang === "en" ? offerings.en : offerings.fa;

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Row layout with title left, button right */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12">
          <div className="max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-3">
              {lang === "en" ? "What we offer" : "چه چیزی ارائه می‌دهیم"}
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {lang === "en"
                ? "For us, getting the right corporate responsibility, accreditations and office network in place"
                : "برای ما، داشتن مسئولیت شرکتی صحیح، اعتبارنامه‌ها و شبکه دفاتر مهم است"}
            </p>
          </div>
          <button className="px-6 py-3 bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors duration-300 rounded-md whitespace-nowrap self-start">
            {lang === "en" ? "Explore Properties" : "کاوش املاک"}
          </button>
        </div>

        {/* Offerings Grid - Descending staggered layout (left highest, right lowest) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 items-start">
          {offers.map((offer, idx) => {
            // Descending offset: first card = 0, second card = mt-12, third card = mt-24
            const offsetClass = idx === 0 ? "" : idx === 1 ? "lg:mt-12" : "lg:mt-24";
            
            return (
              <div 
                key={idx} 
                className={`group ${offsetClass}`}
              >
                {/* Image */}
                <div className="relative h-48 md:h-52 overflow-hidden rounded-2xl mb-5 shadow-lg">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div dir="ltr" className="text-left" style={{ direction: "ltr", textAlign: "left" }}>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 leading-snug text-left" style={{ direction: "ltr", textAlign: "left" }}>
                    {offer.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed text-left" style={{ direction: "ltr", textAlign: "left" }}>
                    {offer.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
