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
      <div className="group cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden mb-4 sm:mb-5">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Badge - Top Corner */}
          <div className={`absolute top-3 sm:top-4 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-accent-warm-gold/90 text-primary text-xs sm:text-xs font-light rounded-sm transition-all duration-300 ${isRTL ? 'left-3 sm:left-4' : 'right-3 sm:right-4'}`}>
            {product.grade}
          </div>

          {/* Availability overlay */}
          {!product.available && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="text-primary font-light text-sm">
                {lang === "en" ? "Unavailable" : "موجود نیست"}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="space-y-2 sm:space-y-2.5">
          {/* Category/Origin - Light text */}
          <p className="text-xs text-gray-500 uppercase tracking-wide font-light">
            {product.origin}
          </p>

          {/* Product Name - Main heading */}
          <h3 className="text-sm sm:text-base text-primary font-light group-hover:text-gray-700 transition-colors duration-300 leading-tight line-clamp-2">
            {name}
          </h3>

          {/* Rating - if needed */}
          <div className="flex items-center gap-2 pt-1">
            <div className="flex text-accent-warm-gold">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xs">★</span>
              ))}
            </div>
            <span className="text-xs text-gray-600 font-light">(5.0)</span>
          </div>

          {/* Price placeholder - can show price range */}
          <div className="pt-2 sm:pt-3">
            <p className="text-sm sm:text-base text-primary font-light">
              {lang === "en" ? "Premium Grade" : "درجه برتر"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
