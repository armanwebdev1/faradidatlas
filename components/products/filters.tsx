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
      options: ["Rice", "Legumes", "Seeds", "Nuts", "Spices", "Sugar"],
    },
    certification: {
      label: "Certification",
      options: ["ISO 22000", "Quality Checked", "Import Docs"],
    },
    origin: {
      label: "Origin",
      options: ["India", "Pakistan", "Global supply"],
    },
  },
  fa: {
    category: {
      label: "دسته‌بندی",
      options: ["برنج", "حبوبات", "دانه‌ها", "آجیل", "ادویه‌جات", "شکر"],
    },
    certification: {
      label: "گواهی",
      options: ["ISO 22000", "کنترل کیفیت", "اسناد واردات"],
    },
    origin: {
      label: "مبدا",
      options: ["هند", "پاکستان", "تامین جهانی"],
    },
  },
};

const categoryMap: Record<string, Product["category"]> = {
  Rice: "rice",
  Legumes: "legumes",
  Seeds: "seeds",
  Nuts: "nuts",
  Spices: "spices",
  Sugar: "sugar",
  برنج: "rice",
  حبوبات: "legumes",
  "دانه‌ها": "seeds",
  آجیل: "nuts",
  "ادویه‌جات": "spices",
  شکر: "sugar",
};

const certificationMap: Record<string, string> = {
  "کنترل کیفیت": "Quality Checked",
  "اسناد واردات": "Import Docs",
};

export function Filters({ lang, products, onFilter }: FiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);

  const options = lang === "en" ? filterOptions.en : filterOptions.fa;

  const applyFilters = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === categoryMap[selectedCategory],
      );
    }

    if (selectedCerts.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCerts.some((cert) =>
          product.certifications.includes(certificationMap[cert] ?? cert),
        ),
      );
    }

    if (selectedOrigin) {
      filtered = filtered.filter((product) => {
        const originValue = lang === "en" ? product.originEn : product.originFa;
        return originValue === selectedOrigin;
      });
    }

    onFilter(filtered);
  };

  const handleCertToggle = (cert: string) => {
    setSelectedCerts((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert],
    );
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

      <div className="mb-6">
        <label className="text-sm font-medium text-foreground block mb-3">
          {options.certification.label}
        </label>
        <div className="space-y-2">
          {options.certification.options.map((cert) => (
            <label
              key={cert}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCerts.includes(cert)}
                onChange={() => handleCertToggle(cert)}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm text-foreground">{cert}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="text-sm font-medium text-foreground block mb-3">
          {options.origin.label}
        </label>
        <select
          value={selectedOrigin || ""}
          onChange={(event) => setSelectedOrigin(event.target.value || null)}
          className="w-full px-3 py-2 border border-border rounded bg-white text-sm"
        >
          <option value="">
            {lang === "en" ? "All Origins" : "همه مبداها"}
          </option>
          {options.origin.options.map((origin) => (
            <option key={origin} value={origin}>
              {origin}
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
          setSelectedCerts([]);
          setSelectedOrigin(null);
          onFilter(products);
        }}
        className="w-full mt-2 px-4 py-2 border border-border text-foreground font-medium rounded hover:bg-muted transition-colors text-sm"
      >
        {lang === "en" ? "Reset" : "بازنشانی"}
      </button>
    </div>
  );
}
