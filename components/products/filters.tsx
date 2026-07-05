"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { Language } from "@/lib/i18n";
import {
  categoryLabels,
  productBrandLabels,
  productTypeLabels,
  type ProductBrand,
  type ProductCategory,
  type ProductType,
} from "./product-data";

export type ProductFilterSelection = {
  category: ProductCategory | null;
  brand: ProductBrand | null;
  type: ProductType | null;
};

interface FiltersProps {
  lang: Language;
  selectedCategory: ProductCategory | null;
  selectedBrand: ProductBrand | null;
  selectedType: ProductType | null;
  categoryOptions: ProductCategory[];
  brandOptions: ProductBrand[];
  typeOptions: ProductType[];
  onFiltersChange: (filters: ProductFilterSelection) => void;
}

export function Filters({
  lang,
  selectedCategory,
  selectedBrand,
  selectedType,
  categoryOptions,
  brandOptions,
  typeOptions,
  onFiltersChange,
}: FiltersProps) {
  const [pendingFilters, setPendingFilters] = useState<ProductFilterSelection>({
    category: selectedCategory,
    brand: selectedBrand,
    type: selectedType,
  });
  const isRTL = lang === "fa" || lang === "ar";

  const updatePendingFilter = <Key extends keyof ProductFilterSelection>(
    key: Key,
    value: ProductFilterSelection[Key],
  ) => {
    setPendingFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    const resetSelection = { category: null, brand: null, type: null };
    setPendingFilters(resetSelection);
    onFiltersChange(resetSelection);
  };

  return (
    <div
      className="rounded-lg border border-border bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h3 className="mb-6 text-lg font-semibold text-primary">
        {lang === "en" ? "Filters" : "فیلتر محصولات"}
      </h3>

      <div className="space-y-5">
        <FilterSelect
          label={lang === "en" ? "Category" : "دسته محصول"}
          value={pendingFilters.category ?? ""}
          onChange={(value) =>
            updatePendingFilter(
              "category",
              value ? (value as ProductCategory) : null,
            )
          }
        >
          <option value="">
            {lang === "en" ? "All categories" : "همه دسته‌ها"}
          </option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {categoryLabels[category][lang]}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          label={lang === "en" ? "Brand" : "برند"}
          value={pendingFilters.brand ?? ""}
          onChange={(value) =>
            updatePendingFilter("brand", value ? (value as ProductBrand) : null)
          }
        >
          <option value="">
            {lang === "en" ? "All brands" : "همه برندها"}
          </option>
          {brandOptions.map((brand) => (
            <option key={brand} value={brand}>
              {productBrandLabels[brand][lang]}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          label={lang === "en" ? "Product type" : "نوع محصول"}
          value={pendingFilters.type ?? ""}
          onChange={(value) =>
            updatePendingFilter("type", value ? (value as ProductType) : null)
          }
        >
          <option value="">
            {lang === "en" ? "All product types" : "همه نوع‌ها"}
          </option>
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {productTypeLabels[type][lang]}
            </option>
          ))}
        </FilterSelect>
      </div>

      <button
        onClick={() => onFiltersChange(pendingFilters)}
        className="mt-6 w-full rounded bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {lang === "en" ? "Apply Filters" : "نمایش نتایج"}
      </button>

      <button
        onClick={resetFilters}
        className="mt-2 w-full rounded border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        {lang === "en" ? "Reset" : "حذف فیلترها"}
      </button>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded border border-border bg-white px-3 py-2.5 text-sm text-foreground transition-colors focus:border-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-navy/15"
      >
        {children}
      </select>
    </label>
  );
}
