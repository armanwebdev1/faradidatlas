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
      <div className="group relative h-full bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-amber-300 hover:shadow-2xl transition-all duration-500 cursor-pointer">
        {/* Hover background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

        {/* Image Container */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden border-b border-gray-200 group-hover:border-amber-200">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Grade Badge */}
          <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold rounded-lg shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
            {product.grade}
          </div>
          
          {/* Availability overlay */}
          {!product.available && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {lang === "en" ? "Unavailable" : "موجود نیست"}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-full">
          <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
            {name}
          </h3>
          
          <p className="text-sm font-semibold text-amber-700 mb-4">
            {product.origin}
          </p>
          
          <p className="text-sm text-gray-700 leading-relaxed mb-5 line-clamp-3 flex-grow">
            {lang === "en" ? product.descriptionEn : product.descriptionFa}
          </p>

          {/* Certifications badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {product.certifications.slice(0, 2).map((cert) => (
              <span
                key={cert}
                className="inline-block text-xs px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full font-semibold hover:bg-amber-200 transition-colors"
              >
                {cert}
              </span>
            ))}
            {product.certifications.length > 2 && (
              <span className="inline-block text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full font-semibold">
                +{product.certifications.length - 2}
              </span>
            )}
          </div>

          {/* Bottom section */}
          <div className="pt-4 border-t border-gray-200 group-hover:border-amber-200 transition-colors flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-600 group-hover:text-amber-700 transition-colors">
              {product.minOrder}
            </span>
            <span className="text-xs font-bold text-amber-700 group-hover:text-amber-900 transition-colors flex items-center gap-1">
              {lang === "en" ? "View" : "مشاهده"}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
