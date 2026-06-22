"use client";

import type { Language } from "@/lib/i18n";

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
  const sortOptions: Record<
    Language,
    { value: ProductSortValue; label: string }[]
  > = {
    en: [
      { value: "relevance", label: "Relevance" },
      { value: "newest", label: "Newest" },
      { value: "name-asc", label: "Name (A-Z)" },
      { value: "name-desc", label: "Name (Z-A)" },
    ],
    fa: [
      { value: "relevance", label: "مرتبط‌ترین" },
      { value: "newest", label: "جدیدترین" },
      { value: "name-asc", label: "نام (الف تا ی)" },
      { value: "name-desc", label: "نام (ی تا الف)" },
    ],
  };

  const options = lang === "en" ? sortOptions.en : sortOptions.fa;

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <label className="text-sm font-medium text-foreground whitespace-nowrap">
        {lang === "en" ? "Sort by:" : "مرتب‌سازی:"}
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
