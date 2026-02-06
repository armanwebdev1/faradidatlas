import Image from "next/image";
import Link from "next/link";
import type { Language } from "@/lib/i18n";
import type { Product } from "./product-data";

interface ProductCardProps {
  product: Product;
  lang: Language;
}

export function ProductCard({ product, lang }: ProductCardProps) {
  const name = lang === "en" ? product.nameEn : product.nameFa;
  const desc = lang === "en" ? product.descriptionEn : product.descriptionFa;
  const isRTL = lang === "fa";

  return (
    <Link href={`/${lang}/products/${product.id}`}>
      <div className="group relative h-full bg-white rounded-2xl overflow-hidden border border-border hover:border-accent-warm-gold/60 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-warm-gold/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-secondary/40 to-secondary/60 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Premium overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badge - Top Corner */}
          <div
            className={`absolute top-3 sm:top-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-accent-warm-gold text-primary text-xs sm:text-sm font-semibold rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 ${isRTL ? "left-3 sm:left-4" : "right-3 sm:right-4"}`}
          >
            {product.grade}
          </div>

          {/* Availability overlay */}
          {!product.available && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
              <span className="text-primary font-semibold text-sm sm:text-base">
                {lang === "en" ? "Unavailable" : "موجود نیست"}
              </span>
            </div>
          )}
        </div>

        {/* Content Section - Compact */}
        <div className="p-4 sm:p-5 space-y-2 sm:space-y-2.5 flex flex-col">
          {/* Category/Origin */}
          <p className="text-xs text-accent-warm-gold uppercase tracking-widest font-semibold">
            {product.origin}
          </p>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base text-primary font-bold group-hover:text-accent-warm-gold transition-colors duration-300 leading-tight line-clamp-2">
            {name}
          </h3>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
            {desc}
          </p>

          {/* Certifications - Small badges */}
          {product.certifications.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1 sm:pt-1.5">
              {product.certifications.slice(0, 2).map((cert) => (
                <span
                  key={cert}
                  className="inline-block text-xs px-2 py-0.5 bg-accent-warm-gold/15 text-accent-warm-gold rounded-full font-medium border border-accent-warm-gold/30 group-hover:bg-accent-warm-gold/25 transition-all duration-300"
                >
                  {cert}
                </span>
              ))}
              {product.certifications.length > 2 && (
                <span className="inline-block text-xs px-2 py-0.5 bg-secondary/40 text-muted-foreground rounded-full font-medium group-hover:bg-secondary/60 transition-colors">
                  +{product.certifications.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="my-1.5 sm:my-2 h-px bg-border group-hover:bg-accent-warm-gold/30 transition-colors duration-300" />

          {/* Bottom Info */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground font-medium">
              {product.minOrder}
            </span>
            <span
              className={`text-xs font-semibold text-accent-warm-gold group-hover:text-accent-warm-gold/80 transition-colors duration-300 flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <span>{lang === "en" ? "View" : "مشاهده"}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ${isRTL ? "-scale-x-100 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
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
