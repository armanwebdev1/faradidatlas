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
  const isRTL = lang === "fa";

  return (
    <Link href={`/${lang}/products/${product.id}`}>
      <div className="group relative h-full bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 hover:border-accent-warm-gold/60 hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-105 hover:-translate-y-2">
        {/* Premium overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-warm-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Premium overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Grade Badge - Premium styling */}
          <div className={`absolute top-3 sm:top-4 md:top-5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-accent-warm-gold to-accent-warm-gold/80 text-primary text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-accent-warm-gold/40 ${isRTL ? 'left-3 sm:left-4 md:left-5' : 'right-3 sm:right-4 md:right-5'}`}>
            {product.grade}
          </div>

          {/* Availability overlay */}
          {!product.available && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-bold text-base sm:text-lg">
                {lang === "en" ? "Unavailable" : "موجود نیست"}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
          {/* Product Name */}
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary mb-1 sm:mb-2 group-hover:text-accent-warm-gold transition-colors duration-300 line-clamp-2">
            {name}
          </h3>

          {/* Origin */}
          <p className="text-xs sm:text-sm font-semibold text-accent-warm-gold mb-3 sm:mb-4 uppercase tracking-wide">
            {product.origin}
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 sm:mb-5 line-clamp-3 flex-grow">
            {lang === "en" ? product.descriptionEn : product.descriptionFa}
          </p>

          {/* Certifications - Premium badges */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
            {product.certifications.slice(0, 2).map((cert) => (
              <span
                key={cert}
                className="inline-block text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 bg-accent-warm-gold/15 text-accent-warm-gold rounded-full font-semibold hover:bg-accent-warm-gold/25 transition-all duration-300 border border-accent-warm-gold/30"
              >
                {cert}
              </span>
            ))}
            {product.certifications.length > 2 && (
              <span className="inline-block text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                +{product.certifications.length - 2}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="my-3 sm:my-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-accent-warm-gold/40 transition-colors" />

          {/* Bottom Section */}
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm font-semibold text-gray-600 group-hover:text-accent-warm-gold transition-colors duration-300">
              {product.minOrder}
            </span>
            <span className={`text-xs sm:text-sm font-bold text-accent-warm-gold group-hover:text-accent-warm-gold/80 transition-colors duration-300 flex items-center gap-1.5 sm:gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span>{lang === "en" ? "View" : "مشاهده"}</span>
              <svg
                className={`w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform duration-300 ${isRTL ? '-scale-x-100 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
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
