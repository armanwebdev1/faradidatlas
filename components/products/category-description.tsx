import type { Language } from "@/lib/i18n";
import {
  categoryDescriptions,
  type ProductCategory,
} from "./product-data";

interface CategoryDescriptionProps {
  lang: Language;
  category: ProductCategory;
}

export function CategoryDescription({
  lang,
  category,
}: CategoryDescriptionProps) {
  const content = categoryDescriptions[category];
  if (!content) return null;

  const h2 = content.h2[lang];
  const description = content.description[lang];

  return (
    <div className="mb-8 p-6 bg-secondary/30 rounded-2xl border border-foreground/10">
      <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-3">
        {h2}
      </h2>
      <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
