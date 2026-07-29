"use client";

import type { Language } from "@/lib/i18n";
import type { translations } from "@/lib/i18n";

export type ProductSortValue = "relevance" | "newest" | "brand";

interface SortingProps {
  lang: Language;
  t: (typeof translations)[Language];
  value: ProductSortValue;
  onChange: (value: ProductSortValue) => void;
}

export function Sorting({ lang, t, value, onChange }: SortingProps) {
  const options = [
    { value: "relevance" as const, label: t.pages.products.sort.relevance },
    { value: "newest" as const, label: t.pages.products.sort.newest },
    { value: "brand" as const, label: t.pages.products.sort.brand },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <label className="text-sm font-medium text-foreground whitespace-nowrap">
        {t.pages.products.sort.label}
      </label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as ProductSortValue)}
        className="min-w-0 px-3 py-2 border border-border rounded bg-white text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
