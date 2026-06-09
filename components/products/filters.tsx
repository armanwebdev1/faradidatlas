"use client";

import { useState } from "react";
import type { Language } from "@/lib/i18n";
import type { Product } from "./product-data";

interface FiltersProps {
  lang: Language;
  products: Product[];
  onFilter: (filtered: Product[]) => void;
}

const filterOptions = {
  en: {
    category: {
      label: "Category",
      options: [
        "Rice",
        "Legumes & Pulses",
        "Seeds & Kernels",
        "Nuts",
        "Spices & Seasonings",
        "Sweeteners",
      ],
    },
  },
  fa: {
    category: {
      label: "دسته‌بندی",
      options: [
        "برنج",
        "حبوبات",
        "دانه‌ها و مغزها",
        "آجیل",
        "ادویه‌جات و چاشنی‌ها",
        "شیرین‌کننده‌ها",
      ],
    },
  },
};

const categoryMap: Record<string, Product["category"]> = {
  Rice: "rice",
  "Legumes & Pulses": "legumes",
  "Seeds & Kernels": "seeds",
  Nuts: "nuts",
  "Spices & Seasonings": "spices",
  Sweeteners: "sugar",
  برنج: "rice",
  حبوبات: "legumes",
  "دانه‌ها و مغزها": "seeds",
  آجیل: "nuts",
  "ادویه‌جات و چاشنی‌ها": "spices",
  "شیرین‌کننده‌ها": "sugar",
};

export function Filters({ lang, products, onFilter }: FiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const options = lang === "en" ? filterOptions.en : filterOptions.fa;

  const applyFilters = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === categoryMap[selectedCategory],
      );
    }

    onFilter(filtered);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-border sticky top-24">
      <h3 className="text-lg font-semibold text-primary mb-6">
        {lang === "en" ? "Filters" : "فیلترها"}
      </h3>

      <div className="mb-6">
        <label className="text-sm font-medium text-foreground block mb-3">
          {options.category.label}
        </label>
        <select
          value={selectedCategory || ""}
          onChange={(event) => setSelectedCategory(event.target.value || null)}
          className="w-full px-3 py-2 border border-border rounded bg-white text-sm"
        >
          <option value="">
            {lang === "en" ? "All Categories" : "همه دسته‌بندی‌ها"}
          </option>
          {options.category.options.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="w-full px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors text-sm"
      >
        {lang === "en" ? "Apply Filters" : "اعمال فیلترها"}
      </button>

      <button
        onClick={() => {
          setSelectedCategory(null);
          onFilter(products);
        }}
        className="w-full mt-2 px-4 py-2 border border-border text-foreground font-medium rounded hover:bg-muted transition-colors text-sm"
      >
        {lang === "en" ? "Reset" : "بازنشانی"}
      </button>
    </div>
  );
}
