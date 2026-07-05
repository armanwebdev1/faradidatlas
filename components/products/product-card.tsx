import Image from "next/image";
import Link from "next/link";
import type { Language } from "@/lib/i18n";
import { translations } from "@/lib/i18n";
import { categoryLabels, type Product } from "./product-data";
import { ProductPlaceholder } from "./product-placeholder";

interface ProductCardProps {
  product: Product;
  lang: Language;
}

export function ProductCard({ product, lang }: ProductCardProps) {
  const t = translations[lang];
  const name = lang === "en" ? product.nameEn : lang === "fa" ? product.nameFa : product.nameAr;
  const desc = lang === "en" ? product.descriptionEn : lang === "fa" ? product.descriptionFa : product.descriptionAr;
  const alias = lang === "en" ? product.aliasEn : lang === "fa" ? product.aliasFa : product.aliasAr;
  const category =
    lang === "en"
      ? categoryLabels[product.category].en
      : lang === "fa"
        ? categoryLabels[product.category].fa
        : categoryLabels[product.category].ar;
  const isRTL = lang === "fa" || lang === "ar";

  return (
    <Link href={`/${lang}/products/${product.slug}`}>
      <div className="group relative h-full bg-white rounded-2xl overflow-hidden border border-border transition-all duration-500 md:hover:border-accent-warm-gold/60 md:hover:shadow-lg md:hover:-translate-y-1 cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-warm-gold/3 to-transparent opacity-0 transition-opacity duration-500 md:group-hover:opacity-100 -z-10" />

        <div className="relative aspect-square bg-gradient-to-br from-secondary/40 to-secondary/60 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={name}
              fill
              sizes="(min-width: 1280px) 360px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
              quality={78}
              className="object-cover transition-transform duration-700 ease-out motion-safe:md:group-hover:scale-110"
            />
          ) : (
            <ProductPlaceholder
              product={product}
              lang={lang}
              className="transition-transform duration-700 ease-out motion-safe:md:group-hover:scale-105"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 md:group-hover:opacity-100" />

          <div
            className={`absolute top-3 sm:top-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/90 text-primary text-xs sm:text-sm font-semibold rounded-lg shadow-md transition-all duration-300 md:group-hover:shadow-lg ${isRTL ? "left-3 sm:left-4" : "right-3 sm:right-4"}`}
          >
            {category}
          </div>
        </div>

        <div className="p-4 sm:p-5 space-y-2 sm:space-y-2.5 flex flex-col">
          <p className="text-xs text-accent-warm-gold uppercase tracking-widest font-semibold">
            {category}
          </p>

          <h3 className="text-sm sm:text-base text-primary font-bold transition-colors duration-300 leading-tight line-clamp-2 md:group-hover:text-accent-warm-gold">
            {name}
          </h3>

          {alias && (
            <p className="text-xs text-foreground/55 leading-snug line-clamp-1">
              {alias}
            </p>
          )}

          <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
            {desc}
          </p>

          <div className="my-1.5 sm:my-2 h-px bg-border transition-colors duration-300 md:group-hover:bg-accent-warm-gold/30" />

          <div className="flex items-center justify-between gap-3">
            <span className="min-w-0 text-xs text-muted-foreground font-medium line-clamp-1">
              {t.pages.products.productProfile}
            </span>
            <span
              className={`shrink-0 text-xs font-semibold text-accent-warm-gold transition-colors duration-300 flex items-center gap-1 md:group-hover:text-accent-warm-gold/80 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <span>{t.pages.products.view}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ${isRTL ? "-scale-x-100 md:group-hover:-translate-x-1" : "md:group-hover:translate-x-1"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
