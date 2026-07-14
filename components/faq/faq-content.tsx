"use client";

import { useState } from "react";
import type { Language } from "@/lib/i18n";
import type { translations } from "@/lib/i18n";
import type { FAQItem } from "./faq-data";
import { FAQAccordion } from "./faq-accordion";
import { FAQFilter } from "./faq-filter";

interface FAQContentProps {
  items: FAQItem[];
  lang: Language;
  t: (typeof translations)[Language];
}

export function FAQContent({ items, lang, t }: FAQContentProps) {
  const [filteredFaqs, setFilteredFaqs] = useState(items);

  return (
    <>
      <FAQFilter items={items} lang={lang} t={t} onFilter={setFilteredFaqs} />

      {filteredFaqs.length > 0 ? (
        <FAQAccordion items={filteredFaqs} lang={lang} />
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            {t.pages.faq.noQuestions}
          </p>
        </div>
      )}
    </>
  );
}
