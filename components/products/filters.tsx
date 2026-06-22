"use client";

import { useState } from "react";
import type { Language } from "@/lib/i18n";
import { categoryLabels, type ProductCategory } from "./product-data";

interface FiltersProps {
  lang: Language;
  selectedCategory: ProductCategory | null;
  onCategoryChange: (category: ProductCategory | null) => void;
}

const categoryOptions: ProductCategory[] = [
  "rice",
  "legumes",
  "seeds",
  "nuts",
  "spices",
  "sugar",
];

export function Filters({
  lang,
  selectedCategory,
  onCategoryChange,
}: FiltersProps) {
  const [pendingCategory, setPendingCategory] =
    useState<ProductCategory | null>(selectedCategory);
  const label = lang === "en" ? "Category" : "دسته محصول";

  return (
    <div className="bg-white p-6 rounded-lg border border-border lg:sticky lg:top-24">
      <h3 className="text-lg font-semibold text-primary mb-6">
        {lang === "en" ? "Filters" : "فیلتر محصولات"}
      </h3>

      <div className="mb-6">
        <label className="text-sm font-medium text-foreground block mb-3">
          {label}
        </label>
        <select
          value={pendingCategory ?? ""}
          onChange={(event) =>
            setPendingCategory(
              event.target.value
                ? (event.target.value as ProductCategory)
                : null,
            )
          }
          className="w-full px-3 py-2 border border-border rounded bg-white text-sm"
        >
          <option value="">
            {lang === "en" ? "All Categories" : "همه محصولات"}
          </option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {lang === "en"
                ? categoryLabels[category].en
                : categoryLabels[category].fa}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => onCategoryChange(pendingCategory)}
        className="w-full px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors text-sm"
      >
        {lang === "en" ? "Apply Filters" : "نمایش نتایج"}
      </button>

      <button
        onClick={() => {
          setPendingCategory(null);
          onCategoryChange(null);
        }}
        className="w-full mt-2 px-4 py-2 border border-border text-foreground font-medium rounded hover:bg-muted transition-colors text-sm"
      >
        {lang === "en" ? "Reset" : "حذف فیلترها"}
      </button>
    </div>
  );
}
