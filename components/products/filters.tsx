"use client"

import { useState } from "react"
import type { Language } from "@/lib/i18n"
import type { Product } from "./product-data"

interface FiltersProps {
  lang: Language
  products: Product[]
  onFilter: (filtered: Product[]) => void
}

const filterOptions = {
  en: {
    category: { label: "Category", options: ["Saffron", "Nuts", "Dried Fruits", "Spices"] },
    certification: {
      label: "Certification",
      options: ["ISO 22000", "HACCP", "Organic", "Halal", "FSSC 22000"],
    },
    origin: { label: "Origin", options: ["Khorasan", "Yazd", "Rafsanjan", "Various"] },
  },
  fa: {
    category: {
      label: "دسته‌بندی",
      options: ["زعفران", "آجیل", "میوه‌های خشک", "ادویه‌جات"],
    },
    certification: {
      label: "تصدیق",
      options: ["ISO 22000", "HACCP", "ارگانیک", "حلال", "FSSC 22000"],
    },
    origin: { label: "منشأ", options: ["خراسان", "یزد", "رفسنجان", "مختلف"] },
  },
}

export function Filters({ lang, products, onFilter }: FiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedCerts, setSelectedCerts] = useState<string[]>([])
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null)

  const options = lang === "en" ? filterOptions.en : filterOptions.fa

  const applyFilters = () => {
    let filtered = products

    if (selectedCategory) {
      filtered = filtered.filter((p) => {
        const categoryMap: Record<string, string> = {
          Saffron: "saffron",
          Nuts: "nuts",
          "Dried Fruits": "dried-fruits",
          Spices: "spices",
          زعفران: "saffron",
          آجیل: "nuts",
          "میوه‌های خشک": "dried-fruits",
          ادویه‌جات: "spices",
        }
        return p.category === categoryMap[selectedCategory]
      })
    }

    if (selectedCerts.length > 0) {
      filtered = filtered.filter((p) =>
        selectedCerts.some((cert) => p.certifications.some((c) => c.includes(cert.split(" ")[0]))),
      )
    }

    if (selectedOrigin) {
      filtered = filtered.filter(
        (p) => p.origin === selectedOrigin || (selectedOrigin === "Various" && p.origin === "Various"),
      )
    }

    onFilter(filtered)
  }

  const handleCertToggle = (cert: string) => {
    setSelectedCerts((prev) => (prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]))
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-border sticky top-24">
      <h3 className="text-lg font-semibold text-primary mb-6">{lang === "en" ? "Filters" : "فیلترها"}</h3>

      {/* Category */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground block mb-3">{options.category.label}</label>
        <select
          value={selectedCategory || ""}
          onChange={(e) => {
            setSelectedCategory(e.target.value || null)
          }}
          className="w-full px-3 py-2 border border-border rounded bg-white text-sm"
        >
          <option value="">{lang === "en" ? "All Categories" : "تمام دسته‌بندی‌ها"}</option>
          {options.category.options.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Certification */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground block mb-3">{options.certification.label}</label>
        <div className="space-y-2">
          {options.certification.options.map((cert) => (
            <label key={cert} className="flex items-center gap-2 cursor-pointer">
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

      {/* Origin */}
      <div className="mb-6">
        <label className="text-sm font-medium text-foreground block mb-3">{options.origin.label}</label>
        <select
          value={selectedOrigin || ""}
          onChange={(e) => {
            setSelectedOrigin(e.target.value || null)
          }}
          className="w-full px-3 py-2 border border-border rounded bg-white text-sm"
        >
          <option value="">{lang === "en" ? "All Regions" : "تمام مناطق"}</option>
          {options.origin.options.map((org) => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
      </div>

      {/* Apply */}
      <button
        onClick={applyFilters}
        className="w-full px-4 py-2 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors text-sm"
      >
        {lang === "en" ? "Apply Filters" : "اعمال فیلترها"}
      </button>

      {/* Reset */}
      <button
        onClick={() => {
          setSelectedCategory(null)
          setSelectedCerts([])
          setSelectedOrigin(null)
          onFilter(products)
        }}
        className="w-full mt-2 px-4 py-2 border border-border text-foreground font-medium rounded hover:bg-muted transition-colors text-sm"
      >
        {lang === "en" ? "Reset" : "بازنشانی"}
      </button>
    </div>
  )
}
