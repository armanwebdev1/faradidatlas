"use client";

import { useEffect, useMemo, useState } from "react";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import type { FAQItem } from "./faq-data";
import { faqCategories } from "./faq-data";

type CategoryKey = keyof typeof faqCategories;
type FilterKey = "all" | CategoryKey;

interface FAQFilterProps {
  items: FAQItem[];
  lang: Language;
  onFilter: (items: FAQItem[]) => void;
}

function getAvailableCategories(items: FAQItem[]) {
  const available = new Set(items.map((item) => item.category));
  return (Object.keys(faqCategories) as CategoryKey[]).filter((key) =>
    available.has(key),
  );
}

export function FAQFilter({ items, lang, onFilter }: FAQFilterProps) {
  const [active, setActive] = useState<FilterKey>("all");
  const categories = useMemo(() => getAvailableCategories(items), [items]);
  const t = translations[lang];

  useEffect(() => {
    if (active === "all") {
      onFilter(items);
      return;
    }

    onFilter(items.filter((item) => item.category === active));
  }, [active, items, onFilter]);

  const allLabel = t.pages.faq.allTopics;

  return (
    <div className="mb-12 flex flex-wrap justify-center gap-3 sm:gap-4 animate-fade-in-up">
      <FilterChip
        label={allLabel}
        isActive={active === "all"}
        onClick={() => setActive("all")}
      />
      {categories.map((category) => (
        <FilterChip
          key={category}
          label={faqCategories[category][lang]}
          isActive={active === category}
          onClick={() => setActive(category)}
        />
      ))}
    </div>
  );
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/25 ${
        isActive
          ? "bg-brand-navy text-white border-brand-navy shadow-md shadow-brand-navy/10"
          : "bg-white/80 text-foreground/70 border-foreground/10 hover:text-foreground hover:border-foreground/20 hover:shadow-sm"
      }`}
    >
      {label}
    </button>
  );
}
