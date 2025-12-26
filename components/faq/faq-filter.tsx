"use client"

import type { Language } from "@/lib/i18n"
import { faqCategories } from "./faq-data"
import type { FAQItem } from "./faq-data"

interface FAQFilterProps {
  items: FAQItem[]
  lang: Language
  onFilter: (filtered: FAQItem[]) => void
}

type CategoryKey = keyof typeof faqCategories

export function FAQFilter({ items, lang, onFilter }: FAQFilterProps) {
  const categories: CategoryKey[] = ["sourcing", "moq", "lead-time", "certifications", "logistics", "private-label"]

  const handleFilter = (category: CategoryKey | null) => {
    if (!category) {
      onFilter(items)
    } else {
      onFilter(items.filter((item) => item.category === category))
    }
  }

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => handleFilter(null)}
        className="px-4 py-2 bg-primary text-white rounded text-sm font-medium hover:bg-accent transition-colors"
      >
        {lang === "en" ? "All" : "همه"}
      </button>
      {categories.map((cat) => {
        const label = faqCategories[cat][lang]
        return (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className="px-4 py-2 bg-background border border-border text-foreground rounded text-sm font-medium hover:border-primary transition-colors"
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
