"use client";

import Image from "next/image";
import { categoryLabels, type Product } from "@/components/products/product-data";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

export function SearchResultsPopover({
  lang,
  query,
  results,
  onClose,
  compact = false,
}: {
  lang: Language;
  query: string;
  results: Product[];
  onClose: () => void;
  compact?: boolean;
}) {
  const isRTL = lang === "fa" || lang === "ar";
  const dir = isRTL ? "rtl" : "ltr";
  const t = translations[lang];

  return (
    <div
      dir={dir}
      className={`absolute left-0 right-0 top-full z-100 mt-2 overflow-hidden rounded-lg border border-border/70 bg-background/98 shadow-2xl ${
        compact ? "max-h-88" : "max-h-112"
      }`}
      role="dialog"
      aria-modal="false"
      aria-label={t.header.searchResults}
    >
      <div
        className={`border-b border-border/60 px-3 py-2.5 ${
          isRTL ? "text-right" : ""
        }`}
      >
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t.header.searchResults}
          </p>
          <p className="mt-0.5 truncate text-xs text-foreground/65">
            {results.length} {t.header.searchMatchCount} "{query}"
          </p>
        </div>
      </div>

      <div className="max-h-84 overflow-y-auto p-2">
        {results.length > 0 ? (
          <div className="space-y-1.5">
            {results.map((product) => (
              <SearchResult
                key={product.id}
                product={product}
                lang={lang}
                onSelect={onClose}
              />
            ))}
          </div>
        ) : (
          <div className="px-3 py-8 text-center text-sm text-muted-foreground">
            {t.header.noMatchingProducts}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchResult({
  product,
  lang,
  onSelect,
}: {
  product: Product;
  lang: Language;
  onSelect: () => void;
}) {
  const isRTL = lang === "fa" || lang === "ar";
  const name = lang === "en" ? product.nameEn : lang === "fa" ? product.nameFa : product.nameAr;
  const alias = lang === "en" ? product.aliasEn : lang === "fa" ? product.aliasFa : product.aliasAr;
  const description =
    lang === "en" ? product.descriptionEn : lang === "fa" ? product.descriptionFa : product.descriptionAr;
  const category =
    lang === "en"
      ? categoryLabels[product.category].en
      : lang === "fa"
        ? categoryLabels[product.category].fa
        : categoryLabels[product.category].ar;

  return (
    <a
      href={`/${lang}/products/${product.slug}`}
      onClick={onSelect}
      className={`flex gap-3 rounded-md border border-transparent p-2.5 transition-colors hover:border-border/70 hover:bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 ${
        isRTL ? "flex-row-reverse text-right" : ""
      }`}
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
        {product.image ? (
          <Image
            src={product.image}
            alt={name}
            fill
            sizes="64px"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-secondary" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div
          className={`mb-1 flex items-center gap-2 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <span className="truncate text-sm font-semibold text-foreground">
            {name}
          </span>
          <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            {category}
          </span>
        </div>
        {alias && (
          <p className="truncate text-xs text-foreground/55">{alias}</p>
        )}
        <p
          dir={isRTL ? "rtl" : "ltr"}
          className={`mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground ${
            isRTL ? "text-right" : ""
          }`}
        >
          {description}
        </p>
      </div>
    </a>
  );
}
