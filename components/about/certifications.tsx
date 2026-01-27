'use client'

import type { Language } from "@/lib/i18n"
import { useEffect, useRef } from "react"

interface CertificationsProps {
  lang: Language
}

const certs = {
  en: [
    { code: "ISO 22000", name: "Food Safety Management System", year: 2015 },
    { code: "HACCP", name: "Hazard Analysis and Critical Control Points", year: 2010 },
    { code: "FSSC 22000", name: "Food Safety System Certification", year: 2018 },
    { code: "Halal", name: "Certified Halal by Islamic Authority", year: 2012 },
  ],
  fa: [
    { code: "ISO 22000", name: "سیستم مدیریت ایمنی غذا", year: 1394 },
    { code: "HACCP", name: "تحلیل خطرات و نقاط کنترل بحرانی", year: 1389 },
    { code: "FSSC 22000", name: "گواهی سیستم ایمنی غذا", year: 1397 },
    { code: "Halal", name: "تصدیق حلال توسط مرجع اسلامی", year: 1391 },
  ],
}

export function Certifications({ lang }: CertificationsProps) {
  const certList = lang === "en" ? certs.en : certs.fa
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll('.cert-card')
    elements?.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.1}s`
      (el as HTMLElement).classList.add('animate-fade-in-up')
    })
  }, [])

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute -right-40 top-40 w-96 h-96 bg-gradient-to-bl from-amber-100/20 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
            {lang === "en" ? "Certifications & Compliance" : "تصدیق‌ها و انطباق"}
          </h2>
          <div className="divider-premium w-24 h-1 mx-auto mb-8" />
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {lang === "en"
              ? "Internationally recognized certifications demonstrating our commitment to quality and safety"
              : "تصدیق‌های بین‌المللی‌ شناخته‌شده که تعهد ما به کیفیت و ایمنی را نشان می‌دهند"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16" ref={containerRef}>
          {certList.map((cert, idx) => (
            <div 
              key={idx} 
              className="cert-card group relative p-8 bg-white rounded-xl border border-gray-200 hover:border-amber-400 hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              
              <div className="relative flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-primary group-hover:text-amber-700 transition-colors">
                  {cert.code}
                </h3>
                <span className="text-sm font-semibold px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                  {cert.year}
                </span>
              </div>
              <p className="text-gray-700 font-medium group-hover:text-gray-800">{cert.name}</p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Audit info with premium styling */}
        <div className="relative p-10 bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-2xl border-2 border-amber-200 overflow-hidden shadow-lg">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-transparent" />
          
          <div className="relative">
            <h3 className="text-2xl font-bold text-primary mb-4">
              {lang === "en" ? "Annual Audits" : "بازرسی‌های سالانه"}
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {lang === "en"
                ? "We undergo comprehensive third-party audits annually to maintain compliance with all international standards."
                : "ما سالانه بازرسی‌های جامع شخص ثالث را تحت نظارت قرار می‌دهیم تا با تمام استانداردهای بین‌المللی سازگار باشیم."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
