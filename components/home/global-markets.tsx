"use client"

import type { Language } from "@/lib/i18n"

interface GlobalMarketsProps {
  lang: Language
}

const markets = {
  en: [
    { region: "EU", countries: "France, Germany, Italy, Spain" },
    { region: "Middle East", countries: "Saudi Arabia, UAE, Qatar" },
    { region: "Asia", countries: "Japan, South Korea, China" },
    { region: "Americas", countries: "USA, Canada, Brazil" },
  ],
  fa: [
    { region: "اتحادیه اروپا", countries: "فرانسه، آلمان، ایتالیا، اسپانیا" },
    { region: "خاورمیانه", countries: "عربستان سعودی، امارات، قطر" },
    { region: "آسیا", countries: "ژاپن، کره جنوبی، چین" },
    { region: "آمریکا", countries: "ایالات متحده، کانادا، برزیل" },
  ],
}

export function GlobalMarkets({ lang }: GlobalMarketsProps) {
  const isRTL = lang === "fa"
  const marketList = lang === "en" ? markets.en : markets.fa

  return (
    <section id="markets" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-primary text-center mb-4">Global Presence</h2>
        <p className="text-xl text-neutral text-center mb-16 max-w-2xl mx-auto">
          {lang === "en"
            ? "Serving international importers and retailers across four continents"
            : "خدمات رسانی به واردکنندگان و فروشندگان بین‌المللی در چهار قاره"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {marketList.map((market, idx) => (
            <div
              key={idx}
              className="p-8 bg-background rounded-lg border border-border hover:border-primary transition-colors text-center"
            >
              <h3 className="text-2xl font-bold text-primary mb-3">{market.region}</h3>
              <p className="text-sm text-neutral leading-relaxed">{market.countries}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-16 border-t border-border">
          <h3 className="text-2xl font-semibold text-primary text-center mb-8">Certified Standards</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-warm-gold mb-2">ISO 22000</div>
              <p className="text-sm text-neutral">Food Safety Management</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-warm-red mb-2">HACCP</div>
              <p className="text-sm text-neutral">Hazard Analysis</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-warm-orange mb-2">FSSC 22000</div>
              <p className="text-sm text-neutral">Food Safety Certification</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-warm-red mb-2">Halal</div>
              <p className="text-sm text-neutral">Certified Halal Products</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
