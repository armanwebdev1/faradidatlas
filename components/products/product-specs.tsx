import type { Language } from "@/lib/i18n";
import type { ProductSpec } from "./product-data";

interface ProductSpecsProps {
  lang: Language;
  specs: ProductSpec[];
}

export function ProductSpecs({ lang, specs }: ProductSpecsProps) {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-base sm:text-lg font-semibold text-primary mb-3 sm:mb-4">
        {lang === "en" ? "Technical Specifications" : "مشخصات"}
      </h2>
      <div className="rounded-2xl border border-foreground/10 bg-white/85 overflow-hidden">
        <dl className="divide-y divide-foreground/10">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1.5fr] sm:grid-cols-[1fr_2fr] gap-4 px-4 sm:px-6 py-3 sm:py-4"
            >
              <dt className="text-sm font-medium text-muted-foreground">
                {spec.label[lang]}
              </dt>
              <dd className="text-sm sm:text-base text-foreground/80">
                {spec.value[lang]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
