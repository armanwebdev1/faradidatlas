'use client'

import type { Language } from "@/lib/i18n"
import { useEffect, useRef } from "react"

interface AboutHeroProps {
  lang: Language
}

export function AboutHero({ lang }: AboutHeroProps) {
  const isRTL = lang === "fa"
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll('.animate-fade-in-up')
    elements?.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.15}s`
    })
  }, [])

  return (
    <section className="relative space-responsive px-4 sm:px-6 bg-gradient-to-b from-white via-white to-gray-50 overflow-hidden">
      {/* Background elements - responsive sizing */}
      <div className="absolute top-0 right-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gradient-to-b from-amber-100/30 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gradient-to-t from-gray-100/30 to-transparent rounded-full blur-3xl -z-10" />

      <div className="container-wide" ref={containerRef}>
        <div className="mb-10 sm:mb-14 md:mb-16 animate-fade-in-up">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-100/50 rounded-full text-xs sm:text-sm font-semibold text-primary mb-4 sm:mb-6 border border-amber-200/50">
            {lang === "en" ? "Our Journey" : "مسیر ما"}
          </span>
          <h1 className="text-responsive-hero text-primary mb-6 sm:mb-8 leading-tight">
            {lang === "en" ? "Our Story" : "داستان ما"}
          </h1>
        </div>

        <div className="divider-premium mb-10 sm:mb-14 md:mb-16" />

        <div className="space-y-6 sm:space-y-8">
          <p className="text-responsive-body text-gray-700 animate-fade-in-up font-light">
            {lang === "en"
              ? "Founded in 1998, Faradi Atlas emerged from a simple belief: the world's finest food products deserve trustworthy partners. For over 25 years, we've built relationships with top producers across Iran and beyond, ensuring only the best reaches your table."
              : "تأسیس‌ شده در سال ۱۳۷۷، فارادی اطلس از یک باور ساده نشأت گرفت: بهترین محصولات غذایی جهان شایسته شرکای قابل‌اعتماد هستند. در طول ۲۵ سال، ما روابط قوی با تولیدکنندگان برتر در سراسر ایران و فراتر از آن ایجاد کرده‌ایم."}
          </p>

          <p className="text-responsive-body text-gray-700 animate-fade-in-up font-light">
            {lang === "en"
              ? "Today, we serve importers and retailers in 40+ countries, maintaining the same commitment to quality, transparency, and ethical sourcing that defines our identity. Every product that leaves our hands carries our promise of excellence."
              : "امروز، ما خدمات رسانی به واردکنندگان و فروشندگان در بیش از ۴۰ کشور را ادامه می‌دهیم و همان تعهد به کیفیت، شفافیت و منابع اخلاقی را حفظ می‌کنیم. هر محصولی که از دستان ما خارج می‌شود، حامل وعده ما برای تعالی است."}
          </p>
        </div>

        {/* Stats section - responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 md:mt-20 pt-10 sm:pt-12 md:pt-16 border-t border-gray-200/50">
          {[
            { number: "25+", label: lang === "en" ? "Years of Excellence" : "سال تجربه" },
            { number: "40+", label: lang === "en" ? "Countries Served" : "کشور سرویس شده" },
            { number: "100%", label: lang === "en" ? "Quality Commitment" : "تعهد کیفیت" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center animate-fade-in-up">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2 sm:mb-3">
                {stat.number}
              </div>
              <p className="text-responsive-caption text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
