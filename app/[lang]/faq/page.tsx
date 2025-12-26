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
        <section className="py-16 px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4">
              {lang === "en" ? "Frequently Asked Questions" : "سوالات متکرر"}
            </h1>
            <p className="text-xl text-neutral">
              {lang === "en"
                ? "Find answers to common questions about sourcing, certifications, logistics, and private labeling."
                : "پاسخ‌های سوالات متکرر درباره تامین، تصدیق‌ها، لجستیک و علامت‌گذاری خصوصی را بیابید."}
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Filters */}
            <FAQFilter items={faqs} lang={lang} onFilter={setFilteredFaqs} />

            {/* Accordion */}
            {filteredFaqs.length > 0 ? (
              <>
                <p className="text-sm text-neutral mb-8">
                  {lang === "en" ? "Showing" : "نمایش"} {filteredFaqs.length} {lang === "en" ? "questions" : "سوال"}
                </p>
                <FAQAccordion items={filteredFaqs} lang={lang} />
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-neutral">{lang === "en" ? "No questions found" : "سوالی پیدا نشد"}</p>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-background rounded-lg border border-border text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">
                {lang === "en" ? "Didn't find your answer?" : "پاسخ خود را پیدا نکردید؟"}
              </h2>
              <p className="text-neutral mb-6">
                {lang === "en"
                  ? "Contact our team directly. We respond to inquiries within 24 hours."
                  : "مستقیماً با تیم ما تماس بگیرید. ما در عرض ۲۴ ساعت به درخواست‌ها پاسخ می‌دهیم."}
              </p>
              <a
                href={`/${lang}/contact`}
                className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded hover:bg-accent transition-colors"
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
