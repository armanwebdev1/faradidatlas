import Image from "next/image"
import Link from "next/link"
import type { Language } from "@/lib/i18n"
import type { Product } from "./product-data"

interface ProductCardProps {
  product: Product
  lang: Language
}

export function ProductCard({ product, lang }: ProductCardProps) {
  const name = lang === "en" ? product.nameEn : product.nameFa

  return (
    <Link href={`/${lang}/products/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-xl hover:border-accent-warm-gold transition-all duration-300 cursor-pointer group">
        {/* Image */}
        <div className="relative aspect-square bg-gray-200 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-accent-warm-gold text-white px-3 py-1 rounded text-xs font-semibold">
            {product.grade}
          </div>
          {!product.available && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white font-semibold">Unavailable</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-primary mb-1 group-hover:text-accent-warm-orange transition-colors">
            {name}
          </h3>
          <p className="text-xs text-neutral mb-3">{product.origin}</p>
          <p className="text-sm text-foreground leading-relaxed mb-4 line-clamp-2">
            {lang === "en" ? product.descriptionEn : product.descriptionFa}
          </p>

          {/* Certifications badges */}
          <div className="flex flex-wrap gap-1 mb-4">
            {product.certifications.slice(0, 2).map((cert) => (
              <span
                key={cert}
                className="inline-block text-xs bg-accent-warm-gold/10 text-accent-warm-gold px-2 py-1 rounded font-medium"
              >
                {cert}
              </span>
            ))}
            {product.certifications.length > 2 && (
              <span className="inline-block text-xs bg-background text-accent-warm-red px-2 py-1 rounded font-medium">
                +{product.certifications.length - 2}
              </span>
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border">
            <span className="text-xs font-medium text-neutral">{product.minOrder}</span>
            <span className="text-xs font-semibold text-accent-warm-orange hover:text-accent-warm-red transition-colors">
              {lang === "en" ? "View Details" : "جزئیات"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
