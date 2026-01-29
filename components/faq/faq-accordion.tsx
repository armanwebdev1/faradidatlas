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

  return (
    <div className="space-y-3 sm:space-y-4">
      {items.map((item) => {
        const question = lang === "en" ? item.questionEn : item.questionFa;
        const answer = lang === "en" ? item.answerEn : item.answerFa;
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:border-amber-300 transition-colors"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-start gap-3 sm:gap-4 bg-white hover:bg-gray-50 transition-colors text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
            >
              <h3 className="text-sm sm:text-base font-semibold text-primary flex-1 leading-snug">
                {question}
              </h3>
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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

            {isOpen && (
              <div
                id={`faq-answer-${item.id}`}
                className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
