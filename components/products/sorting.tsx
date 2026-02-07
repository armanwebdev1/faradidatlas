"use client";

import type { Language } from "@/lib/i18n";
import type { Product } from "./product-data";

interface SortingProps {
  lang: Language;
  products: Product[];
  onSort: (sorted: Product[]) => void;
}

export function Sorting({ lang, products, onSort }: SortingProps) {
  const sortOptions = {
    en: [
      { value: "relevance", label: "Relevance" },
      { value: "newest", label: "Newest" },
      { value: "name-asc", label: "Name (A-Z)" },
      { value: "name-desc", label: "Name (Z-A)" },
    ],
    fa: [
      { value: "relevance", label: "مرتبط بودن" },
      { value: "newest", label: "جدیدترین" },
      { value: "name-asc", label: "نام (الف - ی)" },
      { value: "name-desc", label: "نام (ی - الف)" },
    ],
  };

  const options = lang === "en" ? sortOptions.en : sortOptions.fa;

  const handleSort = (value: string) => {
    let sorted = [...products];

    switch (value) {
      case "name-asc":
        sorted.sort((a, b) => {
          const aName = lang === "en" ? a.nameEn : a.nameFa;
          const bName = lang === "en" ? b.nameEn : b.nameFa;
          return aName.localeCompare(bName);
        });
        break;
      case "name-desc":
        sorted.sort((a, b) => {
          const aName = lang === "en" ? a.nameEn : a.nameFa;
          const bName = lang === "en" ? b.nameEn : b.nameFa;
          return bName.localeCompare(aName);
        });
        break;
      default:
        sorted = products;
    }

    onSort(sorted);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-foreground whitespace-nowrap">
        {lang === "en" ? "Sort by:" : "مرتب‌سازی بر اساس:"}
      </label>
      <select
        onChange={(e) => handleSort(e.target.value)}
        className="px-3 py-2 border border-border rounded bg-white text-sm"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
