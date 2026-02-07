"use client";

import { useState } from "react";
import type { Language } from "@/lib/i18n";
import type { FAQItem } from "./faq-data";
import { FAQAccordion } from "./faq-accordion";
import { FAQFilter } from "./faq-filter";

interface FAQContentProps {
  items: FAQItem[];
  lang: Language;
}

export function FAQContent({ items, lang }: FAQContentProps) {
  const [filteredFaqs, setFilteredFaqs] = useState(items);

  return (
    <>
      <FAQFilter items={items} lang={lang} onFilter={setFilteredFaqs} />

      {filteredFaqs.length > 0 ? (
        <FAQAccordion items={filteredFaqs} lang={lang} />
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            {lang === "en" ? "No questions found" : "Ø³ÙˆØ§Ù„ÛŒ Ù¾ÛŒØ¯Ø§ Ù†Ø´Ø¯"}
          </p>
        </div>
      )}
    </>
  );
}
