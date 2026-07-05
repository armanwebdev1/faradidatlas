"use client";

import { useState } from "react";
import type { Language } from "@/lib/i18n";
import type { FAQItem } from "./faq-data";

interface FAQAccordionProps {
  items: FAQItem[];
  lang: Language;
}

export function FAQAccordion({ items, lang }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  const isRTL = lang === "fa" || lang === "ar";

  return (
    <div className="space-y-4 sm:space-y-5">
      {items.map((item, index) => {
        const question = lang === "en" ? item.questionEn : lang === "fa" ? item.questionFa : item.questionAr;
        const answer = lang === "en" ? item.answerEn : lang === "fa" ? item.answerFa : item.answerAr;
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            id={`faq-${item.id}`}
            className={`group rounded-2xl border overflow-hidden shadow-sm transition-all duration-300 animate-fade-in-up ${
              isOpen
                ? "border-brand-navy/25 bg-brand-navy/5 shadow-md"
                : "border-border bg-white/80 hover:border-brand-navy/25 hover:shadow-lg"
            }`}
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className={`w-full px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-start gap-3 sm:gap-4 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/25 ${
                isRTL ? "text-right" : "text-left"
              }`}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
            >
              <h3 className="text-sm sm:text-base font-semibold text-primary flex-1 leading-snug">
                {question}
              </h3>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-brand-navy flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
              aria-hidden={!isOpen}
            >
              <div className="overflow-hidden">
                <div
                  id={`faq-answer-${item.id}`}
                  className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base leading-relaxed text-foreground/75 border-t border-brand-navy/15"
                >
                  {answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
