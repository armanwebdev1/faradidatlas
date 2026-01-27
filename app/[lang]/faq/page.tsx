"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FAQAccordion } from "@/components/faq/faq-accordion"
import { FAQFilter } from "@/components/faq/faq-filter"
import { faqs } from "@/components/faq/faq-data"
import type { Language } from "@/lib/i18n"
import { useParams } from "next/navigation"

export default function FAQPage() {
  const params = useParams()
  const lang = (params.lang as Language) || "en"
  const [filteredFaqs, setFilteredFaqs] = useState(faqs)

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        {/* Hero */}
        <section className="relative py-24 px-6 bg-gradient-to-b from-white via-white to-gray-50 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-bl from-amber-100/20 to-transparent rounded-full blur-3xl -z-10" />
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 inline-block px-4 py-2 bg-amber-100/50 rounded-full border border-amber-200/50">
              <span className="text-sm font-semibold text-primary">
                {lang === "en" ? "Help Center" : "مرکز کمک"}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 tracking-tight">
              {lang === "en" ? "Frequently Asked Questions" : "سوالات متکرر"}
            </h1>
            <div className="divider-premium w-24 h-1 mb-8" />
            <p className="text-lg text-gray-700 leading-relaxed">
              {lang === "en"
                ? "Find answers to common questions about sourcing, certifications, logistics, and private labeling."
                : "پاسخ‌های سوالات متکرر درباره تامین، تصدیق‌ها، لجستیک و علامت‌گذاری خصوصی را بیابید."}
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            {/* Filters */}
            <FAQFilter items={faqs} lang={lang} onFilter={setFilteredFaqs} />

            {/* Accordion */}
            {filteredFaqs.length > 0 ? (
              <>
                <p className="text-sm font-semibold text-gray-600 mb-8">
                  {lang === "en" ? "Showing" : "نمایش"} <span className="text-primary">{filteredFaqs.length}</span> {lang === "en" ? "questions" : "سوال"}
                </p>
                <FAQAccordion items={filteredFaqs} lang={lang} />
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-gray-600">{lang === "en" ? "No questions found" : "سوالی پیدا نشد"}</p>
              </div>
            )}

            {/* CTA Section */}
            <div className="relative mt-20 p-12 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-amber-200 text-center overflow-hidden shadow-lg">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-amber-400 to-transparent" />
              
              <h2 className="text-3xl font-bold text-primary mb-4 tracking-tight">
                {lang === "en" ? "Didn't find your answer?" : "پاسخ خود را پیدا نکردید؟"}
              </h2>
              <p className="text-gray-700 mb-8 text-lg">
                {lang === "en"
                  ? "Contact our team directly. We respond to inquiries within 24 hours."
                  : "مستقیماً با تیم ما تماس بگیرید. ما در عرض ۲۴ ساعت به درخواست‌ها پاسخ می‌دهیم."}
              </p>
              <a
                href={`/${lang}/contact`}
                className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-gray-800 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 group"
              >
                {lang === "en" ? "Contact Us" : "تماس با ما"}
              </a>
            </div>
          </div>
        </section>

        {/* Schema Markup for FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: lang === "en" ? faq.questionEn : faq.questionFa,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: lang === "en" ? faq.answerEn : faq.answerFa,
                },
              })),
            }),
          }}
        />
      </main>
      <Footer lang={lang} />
    </div>
  )
}
