"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Filters } from "@/components/products/filters"
import { Sorting } from "@/components/products/sorting"
import { ProductCard } from "@/components/products/product-card"
import { products } from "@/components/products/product-data"
import type { Language } from "@/lib/i18n"
import { useParams } from "next/navigation"

export default function ProductsPage() {
  const params = useParams()
  const lang = (params.lang as Language) || "en"
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [sortedProducts, setSortedProducts] = useState(products)

  const handleFilter = (filtered: typeof products) => {
    setFilteredProducts(filtered)
    setSortedProducts(filtered)
  }

  const handleSort = (sorted: typeof products) => {
    setSortedProducts(sorted)
  }

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      <Header lang={lang} />
      <main>
        {/* Hero - responsive layout */}
        <section className="relative space-responsive px-4 sm:px-6 bg-gradient-to-b from-white via-white to-gray-50 overflow-hidden">
          {/* Decorative elements - responsive sizing */}
          <div className="absolute top-5 sm:top-10 right-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gradient-to-bl from-amber-100/20 to-transparent rounded-full blur-3xl -z-10" />
          
          <div className="container-wide">
            <div className="mb-4 sm:mb-6 inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-100/50 rounded-full border border-amber-200/50">
              <span className="text-xs sm:text-sm font-semibold text-primary">
                {lang === "en" ? "Premium Selection" : "انتخاب برتر"}
              </span>
            </div>
            <h1 className="text-responsive-hero text-primary mb-4 sm:mb-6 tracking-tight">
              {lang === "en" ? "Our Products" : "محصولات ما"}
            </h1>
            <div className="divider-premium w-16 sm:w-20 md:w-24 h-1 mb-6 sm:mb-8" />
            <p className="text-responsive-body text-gray-700 max-w-2xl leading-relaxed">
              {lang === "en"
                ? "Browse our complete catalog of premium food products, all certified for international export with exceptional quality standards."
                : "کاتالوگ کامل محصولات غذایی برتر ما را مرور کنید، همه‌ی آنها برای صادرات بین‌المللی معتبر و با استانداردهای کیفیتی استثنایی هستند."}
            </p>
          </div>
        </section>

        {/* Products - responsive grid layout */}
        <section className="space-responsive px-4 sm:px-6 bg-white">
          <div className="container-wide">
            {/* Controls - responsive flex direction */}
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 mb-10 md:mb-16">
              {/* Filters sidebar - responsive */}
              <div className="lg:w-64 xl:w-72 flex-shrink-0">
                <div className="lg:sticky lg:top-32">
                  <h3 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-6">
                    {lang === "en" ? "Filters" : "فیلترها"}
                  </h3>
                  <Filters lang={lang} products={products} onFilter={handleFilter} />
                </div>
              </div>

              {/* Main content - responsive */}
              <div className="flex-1 min-w-0">
                {/* Sorting - responsive stacking */}
                <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-4 md:gap-6">
                  <div>
                    <h2 className="text-responsive-section text-primary mb-2 sm:mb-3">
                      {sortedProducts.length} {lang === "en" ? "Products" : "محصول"}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {lang === "en"
                        ? "All products are certified and ready for export"
                        : "تمام محصولات معتبر و آماده صادرات هستند"}
                    </p>
                  </div>
                  <Sorting lang={lang} products={filteredProducts} onSort={handleSort} />
                </div>

                {/* Grid - responsive columns */}
                {sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {sortedProducts.map((product, idx) => (
                      <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <ProductCard product={product} lang={lang} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 md:py-20">
                    <p className="text-sm sm:text-base md:text-lg text-gray-600">{lang === "en" ? "No products found" : "محصولی پیدا نشد"}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  )
}
