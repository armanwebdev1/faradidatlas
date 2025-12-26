"use client"

import type { Language } from "@/lib/i18n"

interface SourcingRegionsProps {
  lang: Language
}

const regions = {
  en: [
    {
      name: "Khorasan",
      specialty: "Saffron, Premium Nuts",
      description: "High-altitude farming with ideal climate for saffron cultivation",
    },
    {
      name: "Yazd",
      specialty: "Dates, Dried Fruits",
      description: "Desert oasis with centuries of date cultivation expertise",
    },
    {
      name: "Rafsanjan",
      specialty: "Pistachios, Tree Nuts",
      description: "World-renowned pistachio region with superior quality",
    },
    {
      name: "Various Regions",
      specialty: "Herbs, Spices",
      description: "Diverse producers ensuring product variety and consistency",
    },
  ],
  fa: [
    {
      name: "خراسان",
      specialty: "زعفران، آجیل‌های پرمیوم",
      description: "کشاورزی در ارتفاع‌های بالا با آب‌وهوای مناسب برای کشت زعفران",
    },
    {
      name: "یزد",
      specialty: "خرما، میوه‌های خشک",
      description: "واحه صحرایی با تجربه چند قرنی در کشت خرما",
    },
    {
      name: "رفسنجان",
      specialty: "فستق، آجیل‌های درختی",
      description: "منطقه جهان‌شهری فستق با کیفیت برتر",
    },
    {
      name: "منطقه‌های مختلف",
      specialty: "گیاهان، ادویه‌جات",
      description: "تولیدکنندگان متنوع که تنوع و پایداری محصول را تضمین می‌کنند",
    },
  ],
}

export function SourcingRegions({ lang }: SourcingRegionsProps) {
  const regionList = lang === "en" ? regions.en : regions.fa

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-primary text-center mb-4">Sourcing Regions</h2>
        <p className="text-xl text-neutral text-center mb-16 max-w-2xl mx-auto">
          {lang === "en"
            ? "Direct partnerships with premium producers in Iran's most renowned agricultural regions"
            : "مشارکت‌های مستقیم با تولیدکنندگان برتر در معروف‌ترین مناطق کشاورزی ایران"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regionList.map((region, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-lg border border-border hover:border-primary transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-2xl font-bold text-primary mb-2">{region.name}</h3>
              <p className="text-sm font-semibold text-accent mb-4">{region.specialty}</p>
              <p className="text-sm text-neutral leading-relaxed">{region.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
