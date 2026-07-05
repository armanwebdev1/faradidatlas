"use client";

import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

export type ProductSortValue =
  | "relevance"
  | "newest"
  | "name-asc"
  | "name-desc";

interface SortingProps {
  lang: Language;
  value: ProductSortValue;
  onChange: (value: ProductSortValue) => void;
}

export function Sorting({ lang, value, onChange }: SortingProps) {
  const t = translations[lang];
  const options = [
    { value: "relevance" as const, label: t.pages.products.sort.relevance },
    { value: "newest" as const, label: t.pages.products.sort.newest },
    { value: "name-asc" as const, label: t.pages.products.sort.nameAsc },
    { value: "name-desc" as const, label: t.pages.products.sort.nameDesc },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <label className="text-sm font-medium text-foreground whitespace-nowrap">
        {t.pages.products.sort.label}
      </label>
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value as ProductSortValue)
        }
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
