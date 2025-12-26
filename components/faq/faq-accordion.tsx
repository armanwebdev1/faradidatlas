"use client"

import { useState } from "react"
import type { Language } from "@/lib/i18n"
import type { FAQItem } from "./faq-data"

interface FAQAccordionProps {
  items: FAQItem[]
  lang: Language
}

export function FAQAccordion({ items, lang }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const question = lang === "en" ? item.questionEn : item.questionFa
        const answer = lang === "en" ? item.answerEn : item.answerFa
        const isOpen = openId === item.id

        return (
          <div key={item.id} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full px-6 py-4 flex justify-between items-start bg-white hover:bg-background transition-colors text-left"
            >
              <h3 className="text-lg font-semibold text-primary pr-4">{question}</h3>
              <svg
                className={`w-5 h-5 text-accent flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {isOpen && (
              <div className="px-6 py-4 bg-background border-t border-border">
                <p className="text-foreground leading-relaxed">{answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
