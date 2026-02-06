"use client";

import { useEffect, useMemo, useState } from "react";
import type { Language } from "@/lib/i18n";
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

  useEffect(() => {
    if (active === "all") {
      onFilter(items);
      return;
    }

    onFilter(items.filter((item) => item.category === active));
  }, [active, items, onFilter]);

  const allLabel = lang === "en" ? "All topics" : "همه موضوعات";

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
          label={lang === "en" ? faqCategories[category].en : faqCategories[category].fa}
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
      className={`px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${
        isActive
          ? "bg-primary text-primary-foreground border-primary shadow-md"
          : "bg-white/80 text-foreground/70 border-foreground/10 hover:text-foreground hover:border-foreground/20 hover:shadow-sm"
      }`}
    >
      {label}
    </button>
  );
}
